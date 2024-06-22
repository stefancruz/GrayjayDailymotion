let config: Config;
let _settings: IDailymotionPluginSettings;

const LIKE_PLAYLIST_ID = "LIKE_PLAYLIST_ID";
const FAVORITES_PLAYLIST_ID = "FAVORITES_PLAYLIST_ID";
const RECENTLY_WATCHED_PLAYLIST_ID = "RECENTLY_WATCHED_PLAYLIST_ID";


import {
	CREATOR_AVATAR_HEIGHT,
	THUMBNAIL_HEIGHT,
	BASE_URL,
	SEARCH_CAPABILITIES,
	BASE_URL_VIDEO,
	BASE_URL_PLAYLIST,
	USER_AGENT,
	X_DM_AppInfo_Id,
	X_DM_AppInfo_Type,
	X_DM_AppInfo_Version,
	X_DM_Neon_SSR,
	BASE_URL_API,
	BASE_URL_METADATA,
	ERROR_TYPES,
	LikedMediaSort,
	VIDEOS_PER_PAGE_OPTIONS,
	PLAYLISTS_PER_PAGE_OPTIONS
} from './constants';

import {
	AUTOCOMPLETE_QUERY,
	CHANNEL_QUERY_DESKTOP,
	PLAYLIST_DETAILS_QUERY,
	GET_USER_SUBSCRIPTIONS,
	SEARCH_QUERY,
	SEACH_DISCOVERY_QUERY,
	CHANNEL_VIDEOS_QUERY,
	WATCHING_VIDEO,
	SEARCH_CHANNEL,
	CHANNEL_PLAYLISTS_QUERY,
	SUBSCRIPTIONS_QUERY,
	GET_CHANNEL_PLAYLISTS_XID
} from './gqlQueries';

import {
	getChannelNameFromUrl,
	isUsernameUrl,
	executeGqlQuery,
	getPreferredCountry,
	getAnonymousUserTokenSingleton,
	getQuery,
	getLikePlaylist,
	getFavoritesPlaylist,
	getRecentlyWatchedPlaylist
} from './util';

import {
	Channel,
	Collection,
	CollectionConnection,
	Live,
	LiveConnection,
	LiveEdge,
	SuggestionConnection,
	Video,
	VideoConnection,
	VideoEdge
} from '../types/CodeGenDailymotion';

import {
	SearchPagerAll,
	SearchChannelPager,
	ChannelVideoPager,
	SearchPlaylistPager,
	ChannelPlaylistPager
} from './Pagers';


import {
	SourceChannelToGrayjayChannel,
	SourceCollectionToGrayjayPlaylist,
	SourceCollectionToGrayjayPlaylistDetails,
	SourceVideoToGrayjayVideo,
	SourceVideoToPlatformVideoDetailsDef
} from './Mappers';


if (IS_TESTING) {


	if (!_settings) {
		_settings = {}
	}

	_settings.hideSensitiveContent = false;
	_settings.avatarSizeOptionIndex = 8;
	_settings.thumbnailResolutionOptionIndex = 7;
	_settings.preferredCountryOptionIndex = 0;
	_settings.videosPerPageOptionIndex = 4;
	_settings.playlistsPerPageOptionIndex = 0;

	if (!config) {
		config = {
			id: "9c87e8db-e75d-48f4-afe5-2d203d4b95c5"
		}
	}
}

let httpClientAnonymous: IHttp = http.newClient(false);


// Will be used to store private playlists that require authentication
const authenticatedPlaylistCollection: string[] = [];

source.setSettings = function (settings) {
	_settings = settings;
	http.GET(BASE_URL, {}, true);
}

//Source Methods
source.enable = function (conf, settings, saveStateStr) {

	config = conf ?? {};
	_settings = settings ?? {};

}


source.getHome = function () {

	getAnonymousUserTokenSingleton();

	return getVideoPager({}, 0);
};

source.searchSuggestions = function (query): string[] {

	try {

		const jsonResponse = executeGqlQuery(
			getHttpContext({ usePlatformAuth: false }),
			{
				operationName: 'AUTOCOMPLETE_QUERY',
				variables: {
					query
				},
				query: AUTOCOMPLETE_QUERY
			});

		return (jsonResponse?.data?.search?.suggestedVideos as SuggestionConnection)?.edges?.map(edge => edge?.node?.name ?? "") ?? [];
	} catch (error: any) {
		log('Failed to get search suggestions:' + error?.message);
		return [];
	}
};


source.getSearchCapabilities = (): ResultCapabilities => SEARCH_CAPABILITIES;


source.search = function (query: string, type: string, order: string, filters) {
	return getSearchPagerAll({ q: query, page: 1, type, order, filters });
}

source.searchChannels = function (query) {
	return getSearchChannelPager({ q: query, page: 1 })
}

//Channel
source.isChannelUrl = function (url) {
	return isUsernameUrl(url);
};

source.getChannel = function (url) {

	const channel_name = getChannelNameFromUrl(url);

	const channelDetails = executeGqlQuery(
		getHttpContext({ usePlatformAuth: false }),
		{
			operationName: 'CHANNEL_QUERY_DESKTOP',
			variables: {
				channel_name,
				avatar_size: CREATOR_AVATAR_HEIGHT[_settings?.avatarSizeOptionIndex]
			},
			query: CHANNEL_QUERY_DESKTOP
		});

	return SourceChannelToGrayjayChannel(config.id, url, channelDetails.data.channel as Channel);

};

source.getChannelContents = function (url, type, order, filters) {

	const page = 1;
	return getChannelContentsPager(
		url,
		page,
		type,
		order,
		filters
	)
}

source.getChannelPlaylists = (url): SearchPlaylistPager => {
	try {
		return getChannelPlaylists(url, 1);
	} catch (error) {
		log('Failed to get channel playlists:' + error?.message);
		return new ChannelPlaylistPager([]);
	}
}

source.getChannelCapabilities = (): ResultCapabilities => {
	return {
		types: [Type.Feed.Mixed],
		sorts: [Type.Order.Chronological, "Popular"],
		filters: []
	};
};

//Video
source.isContentDetailsUrl = function (url) {
	return url.startsWith(BASE_URL_VIDEO);
};

source.getContentDetails = function (url) {
	return getSavedVideo(url, false);
};

//Playlist
source.isPlaylistUrl = (url): boolean => {
	return url.startsWith(BASE_URL_PLAYLIST) ||
		url === LIKE_PLAYLIST_ID ||
		url === FAVORITES_PLAYLIST_ID ||
		url === RECENTLY_WATCHED_PLAYLIST_ID;
};

source.searchPlaylists = (query, type, order, filters) => {
	return searchPlaylists({ q: query, type, order, filters });
};

source.getPlaylist = (url: string): PlatformPlaylistDetails => {

	const usePlatformAuth = authenticatedPlaylistCollection.includes(url);

	const httpClient = getHttpContext({ usePlatformAuth });

	const thumbnailResolutionIndex = _settings.thumbnailResolutionOptionIndex;

	if (url === LIKE_PLAYLIST_ID) {
		return getLikePlaylist(config.id, httpClient, usePlatformAuth, thumbnailResolutionIndex);
	}

	if (url === FAVORITES_PLAYLIST_ID) {
		return getFavoritesPlaylist(config.id, httpClient, usePlatformAuth, thumbnailResolutionIndex);
	}

	if (url === RECENTLY_WATCHED_PLAYLIST_ID) {
		return getRecentlyWatchedPlaylist(config.id, httpClient, usePlatformAuth, thumbnailResolutionIndex);
	}

	const xid = url.split('/').pop();

	const variables = {
		xid,
		avatar_size: CREATOR_AVATAR_HEIGHT[_settings.avatarSizeOptionIndex],
		thumbnail_resolution: THUMBNAIL_HEIGHT[thumbnailResolutionIndex],
	}

	let jsonResponse = executeGqlQuery(
		httpClient,
		{
			operationName: 'PLAYLIST_VIDEO_QUERY',
			variables,
			query: PLAYLIST_DETAILS_QUERY,
			usePlatformAuth
		});

	const videos: PlatformVideo[] = jsonResponse?.data?.collection?.videos?.edges.map(edge => {
		return SourceVideoToGrayjayVideo(config.id, edge.node as Video);
	});

	return SourceCollectionToGrayjayPlaylistDetails(config.id, jsonResponse?.data?.collection as Collection, videos);

}

source.getUserSubscriptions = (): string[] => {

	if (!bridge.isLoggedIn()) {
		bridge.log("Failed to retrieve subscriptions page because not logged in.");
		throw new ScriptException("Not logged in");
	}

	const headers = {
		'Content-Type': 'application/json',
		'User-Agent': USER_AGENT,
		// Accept: '*/*, */*',
		'Accept-Language': 'en-GB',
		Referer: `${BASE_URL}/library/subscriptions`,
		'X-DM-AppInfo-Id': X_DM_AppInfo_Id,
		'X-DM-AppInfo-Type': X_DM_AppInfo_Type,
		'X-DM-AppInfo-Version': X_DM_AppInfo_Version,
		'X-DM-Neon-SSR': '0',
		'X-DM-Preferred-Country': getPreferredCountry(_settings?.preferredCountryOptionIndex),
		Origin: BASE_URL,
		DNT: '1',
		Connection: 'keep-alive',
		'Sec-Fetch-Dest': 'empty',
		'Sec-Fetch-Mode': 'cors',
		'Sec-Fetch-Site': 'same-site',
		Priority: 'u=4',
		Pragma: 'no-cache',
		'Cache-Control': 'no-cache',
	}

	const usePlatformAuth = true;

	const fetchSubscriptions = (page, first): string[] => {
		const jsonResponse = executeGqlQuery(
			getHttpContext({ usePlatformAuth }),
			{
				operationName: 'SUBSCRIPTIONS_QUERY',
				variables: {
					first: first,
					page: page,
					avatar_size: CREATOR_AVATAR_HEIGHT[_settings?.avatarSizeOptionIndex],
				},
				headers,
				query: GET_USER_SUBSCRIPTIONS,
				usePlatformAuth
			});

		return (jsonResponse?.data?.me?.channel as Channel)?.followings?.edges?.map(edge => edge?.node?.creator?.name ?? "") ?? [];
	};

	const first = 100;  // Number of records to fetch per page
	let page = 1;
	let subscriptions: string[] = [];

	// There is a totalCount ($.data.me.channel.followings.totalCount) property but it's not reliable. 
	// For example, it may return 0 even if there are subscriptions, or it may return a number that is not the actual number of subscriptions.
	// For now, it's better to fetch until no more results are returned

	let items: string[] = [];

	do {
		const response = fetchSubscriptions(page, first);

		items = response.map(creatorName => `${BASE_URL}/${creatorName}`);

		subscriptions.push(...items);
		page++;
	} while (items.length);

	return subscriptions;
};


source.getUserPlaylists = (): string[] => {

	if (!bridge.isLoggedIn()) {
		bridge.log("Failed to retrieve subscriptions page because not logged in.");
		throw new ScriptException("Not logged in");
	}

	const headers = {
		'Content-Type': 'application/json',
		'User-Agent': USER_AGENT,
		// Accept: '*/*, */*',
		'Accept-Language': 'en-GB',
		Referer: `${BASE_URL}/library/subscriptions`,
		'X-DM-AppInfo-Id': X_DM_AppInfo_Id,
		'X-DM-AppInfo-Type': X_DM_AppInfo_Type,
		'X-DM-AppInfo-Version': X_DM_AppInfo_Version,
		'X-DM-Neon-SSR': '0',
		'X-DM-Preferred-Country': getPreferredCountry(_settings?.preferredCountryOptionIndex),
		Origin: BASE_URL,
		DNT: '1',
		Connection: 'keep-alive',
		'Sec-Fetch-Dest': 'empty',
		'Sec-Fetch-Mode': 'cors',
		'Sec-Fetch-Site': 'same-site',
		Priority: 'u=4',
		Pragma: 'no-cache',
		'Cache-Control': 'no-cache',
	}

	const jsonResponse = executeGqlQuery(
		getHttpContext({ usePlatformAuth: true }),
		{
			operationName: 'SUBSCRIPTIONS_QUERY',
			headers,
			query: SUBSCRIPTIONS_QUERY,
			usePlatformAuth: true
		});

	const userName = (jsonResponse?.data?.me?.channel as Channel)?.name;

	const playlists = getPlaylistsByUsername(userName, headers, true);

	[
		LIKE_PLAYLIST_ID,
		FAVORITES_PLAYLIST_ID,
		RECENTLY_WATCHED_PLAYLIST_ID
	].forEach(playlistId => {

		if (!authenticatedPlaylistCollection.includes(playlistId)) {
			authenticatedPlaylistCollection.push(playlistId);
		}

		if (!playlists.includes(playlistId)) {
			playlists.push(playlistId);
		}
	});

	return playlists;

}

function getPlaylistsByUsername(userName, headers, usePlatformAuth = false): string[] {


	const collections = executeGqlQuery(
		getHttpContext({ usePlatformAuth }),
		{
			operationName: 'CHANNEL_PLAYLISTS_QUERY',
			variables: {
				channel_name: userName,
				sort: "recent",
				page: 1,
				first: 99,
				avatar_size: CREATOR_AVATAR_HEIGHT[_settings.avatarSizeOptionIndex],
				thumbnail_resolution: THUMBNAIL_HEIGHT[_settings.thumbnailResolutionOptionIndex],
			},
			headers,
			query: GET_CHANNEL_PLAYLISTS_XID,
			usePlatformAuth
		}
	);

	const playlists: string[] = collections.data.channel.collections.edges.map(edge => {
		const playlistUrl = `${BASE_URL_PLAYLIST}/${edge.node.xid}`;
		if (!authenticatedPlaylistCollection.includes(playlistUrl)) {
			authenticatedPlaylistCollection.push(playlistUrl);
		}
		return playlistUrl;
	});

	return playlists;

}

function searchPlaylists(contextQuery) {

	const context = getQuery(contextQuery);

	const variables = {
		"query": context.q,
		"sortByVideos": context.sort,
		"durationMaxVideos": context.filters?.durationMaxVideos,
		"durationMinVideos": context.filters?.durationMinVideos,
		"createdAfterVideos": context.filters?.createdAfterVideos, //Represents a DateTime value as specified by iso8601
		"shouldIncludeChannels": false,
		"shouldIncludePlaylists": true,
		"shouldIncludeVideos": false,
		"shouldIncludeLives": false,
		"page": context.page,
		"limit": VIDEOS_PER_PAGE_OPTIONS[_settings.videosPerPageOptionIndex],
		"thumbnail_resolution": THUMBNAIL_HEIGHT[_settings?.thumbnailResolutionOptionIndex],
		"avatar_size": CREATOR_AVATAR_HEIGHT[_settings?.avatarSizeOptionIndex],
	}


	const jsonResponse = executeGqlQuery(
		getHttpContext({ usePlatformAuth: false }),
		{
			operationName: 'SEARCH_QUERY',
			variables: variables,
			query: SEARCH_QUERY,
			headers: undefined
		});

	const playlistConnection = jsonResponse?.data?.search?.playlists as CollectionConnection;

	const searchResults = playlistConnection?.edges?.map(edge => {
		return SourceCollectionToGrayjayPlaylist(config.id, edge?.node);
	});

	const hasMore = playlistConnection?.pageInfo?.hasNextPage;

	if (!searchResults || searchResults.length === 0) {
		return new PlaylistPager([]);
	}

	const params = {
		query: context.q,
		sort: context.sort,
		filters: context.filters,
	}

	return new SearchPlaylistPager(searchResults, hasMore, params, context.page, searchPlaylists);
}


//Internals


function getVideoPager(params, page) {

	const count = VIDEOS_PER_PAGE_OPTIONS[_settings.videosPerPageOptionIndex];

	if (!params) {
		params = {};
	}

	params = { ...params, count }


	const headersToAdd = {
		"User-Agent": USER_AGENT,
		"Referer": BASE_URL,
		"Content-Type": "application/json",
		"X-DM-AppInfo-Id": X_DM_AppInfo_Id,
		"X-DM-AppInfo-Type": X_DM_AppInfo_Type,
		"X-DM-AppInfo-Version": X_DM_AppInfo_Version,
		"X-DM-Neon-SSR": X_DM_Neon_SSR,
		"X-DM-Preferred-Country": getPreferredCountry(_settings?.preferredCountryOptionIndex),
		"Origin": BASE_URL,
		"DNT": "1",
		"Sec-Fetch-Site": "same-site",
		"Priority": "u=4",
		"Pragma": "no-cache",
		"Cache-Control": "no-cache"
	};


	let obj;

	const anonymousHttpClient = getHttpContext({ usePlatformAuth: false });

	try {
		obj = executeGqlQuery(
			anonymousHttpClient,
			{
				operationName: 'SEACH_DISCOVERY_QUERY',
				variables: {
					avatar_size: CREATOR_AVATAR_HEIGHT[_settings?.avatarSizeOptionIndex],
					thumbnail_resolution: THUMBNAIL_HEIGHT[_settings?.thumbnailResolutionOptionIndex],
				},
				query: SEACH_DISCOVERY_QUERY,
				headers: headersToAdd,
			});

	} catch (error) {
		return new VideoPager([], false, { params });
	}

	const results = obj?.data?.home?.neon?.sections?.edges[0]?.node?.components?.edges
		?.filter(edge => edge?.node?.id)
		?.map(edge => {

			return SourceVideoToGrayjayVideo(config.id, edge.node as Video);

		})

	const hasMore = obj?.data?.home?.neon?.sections?.edges[0]?.node?.components?.pageInfo?.hasNextPage ?? false;
	return new SearchPagerAll(results, hasMore, params, page, getVideoPager);
}

function getChannelContentsPager(url, page, type, order, filters) {

	const channel_name = getChannelNameFromUrl(url);

	const shouldLoadVideos = type === Type.Feed.Mixed || type === Type.Feed.Videos;
	const shouldLoadLives = type === Type.Feed.Mixed || type === Type.Feed.Streams || type === Type.Feed.Live;

	if (IS_TESTING) {
		bridge.log(`Getting channel contents for ${url}, page: ${page}, type: ${type}, order: ${order}, shouldLoadVideos: ${shouldLoadVideos}, shouldLoadLives: ${shouldLoadLives}, filters: ${JSON.stringify(filters)}`);
	}

	/** 
		Recent = Sort liked medias by most recent.
		Visited - Sort liked medias by most viewed
	*/
	let sort: string;

	if (order == Type.Order.Chronological) {
		sort = LikedMediaSort.Recent;
	} else if (order == "Popular") {
		sort = LikedMediaSort.Visited;
	} else {
		sort = LikedMediaSort.Recent;
	}

	const anonymousHttpClient = getHttpContext({ usePlatformAuth: false });
	const jsonResponse = executeGqlQuery(
		anonymousHttpClient,
		{
			operationName: 'CHANNEL_VIDEOS_QUERY',
			variables: {
				channel_name,
				sort,
				page: page ?? 1,
				allowExplicit: !_settings.hideSensitiveContent,
				first: VIDEOS_PER_PAGE_OPTIONS[_settings.videosPerPageOptionIndex],
				avatar_size: CREATOR_AVATAR_HEIGHT[_settings?.avatarSizeOptionIndex],
				thumbnail_resolution: THUMBNAIL_HEIGHT[_settings?.thumbnailResolutionOptionIndex],
				shouldLoadLives,
				shouldLoadVideos
			},
			query: CHANNEL_VIDEOS_QUERY
		});

	const channel = jsonResponse?.data?.channel as Channel;

	const all: (Live | Video)[] = [
		...(channel?.lives?.edges?.map(e => e?.node as Live) ?? []),
		...(channel?.videos?.edges?.map(e => e?.node as Video) ?? [])
	];

	let videos = all
		.map((node => SourceVideoToGrayjayVideo(config.id, node)));


	const videosHasNext = channel?.videos?.pageInfo?.hasNextPage;
	const livesHasNext = channel?.lives?.pageInfo?.hasNextPage;
	const hasNext = videosHasNext || livesHasNext || false;

	const params = {
		url,
		type,
		order,
		page,
		filters
	}

	return new ChannelVideoPager(videos, hasNext, params, getChannelContentsPager);
}

function getSearchPagerAll(contextQuery): VideoPager {

	const context = getQuery(contextQuery);

	const variables = {
		"query": context.q,
		"sortByVideos": context.sort,
		"durationMaxVideos": context.filters?.durationMaxVideos,
		"durationMinVideos": context.filters?.durationMinVideos,
		"createdAfterVideos": context.filters?.createdAfterVideos, //Represents a DateTime value as specified by iso8601
		"shouldIncludeChannels": false,
		"shouldIncludePlaylists": false,
		"shouldIncludeVideos": true,
		"shouldIncludeLives": true,
		"page": context.page ?? 1,
		"limit": VIDEOS_PER_PAGE_OPTIONS[_settings.videosPerPageOptionIndex],
		"avatar_size": CREATOR_AVATAR_HEIGHT[_settings?.avatarSizeOptionIndex],
		"thumbnail_resolution": THUMBNAIL_HEIGHT[_settings?.thumbnailResolutionOptionIndex]
	}


	const jsonResponse = executeGqlQuery(
		getHttpContext({ usePlatformAuth: false }),
		{
			operationName: 'SEARCH_QUERY',
			variables: variables,
			query: SEARCH_QUERY,
			headers: undefined
		});


	const videoConnection = jsonResponse?.data?.search?.videos as VideoConnection;
	const liveConnection = jsonResponse?.data?.search?.lives as LiveConnection;

	const all: (VideoEdge | LiveEdge | null)[] = [
		...(videoConnection?.edges ?? []),
		...(liveConnection?.edges ?? [])
	]

	const results: PlatformVideo[] = all.map(edge => SourceVideoToGrayjayVideo(config.id, edge?.node));

	const params = {
		query: context.q,
		sort: context.sort,
		filters: context.filters,
	}
	return new SearchPagerAll(results, videoConnection?.pageInfo?.hasNextPage, params, context.page, getSearchPagerAll);
}


function getSavedVideo(url, usePlatformAuth = false) {

	const id = url.split('/').pop();

	const player_metadata_url = `${BASE_URL_METADATA}/${id}?embedder=https%3A%2F%2Fwww.dailymotion.com%2Fvideo%2Fx8yb2e8&geo=1&player-id=xjnde&locale=en-GB&dmV1st=ce2035cd-bdca-4d7b-baa4-127a17490ca5&dmTs=747022&is_native_app=0&app=com.dailymotion.neon&client_type=webapp&section_type=player&component_style=_`;

	const headers1 = {
		"User-Agent": USER_AGENT,
		"Accept": "*/*",
		// "Accept-Encoding": "gzip, deflate, br, zstd",
		"Referer": "https://geo.dailymotion.com/",
		"Origin": "https://geo.dailymotion.com",
		"DNT": "1",
		"Connection": "keep-alive",
		"Sec-Fetch-Dest": "empty",
		"Sec-Fetch-Mode": "cors",
		"Sec-Fetch-Site": "same-site",
		"Pragma": "no-cache",
		"Cache-Control": "no-cache"
	}

	if (_settings.hideSensitiveContent) {
		headers1["Cookie"] = "ff=on"
	} else {
		headers1["Cookie"] = "ff=off"
	}

	const player_metadataResponse = getHttpContext({ usePlatformAuth }).GET(player_metadata_url, headers1, usePlatformAuth);

	if (!player_metadataResponse.isOk) {
		throw new UnavailableException('Unable to get player metadata');
	}

	const player_metadata = JSON.parse(player_metadataResponse.body);

	if (player_metadata.error) {

		if (player_metadata.error.code && ERROR_TYPES[player_metadata.error.code] !== undefined) {
			throw new UnavailableException(ERROR_TYPES[player_metadata.error.code]);
		}

		throw new UnavailableException('This content is not available');
	}

	const videoDetailsRequestHeaders: IDictionary<string> = {
		"Content-Type": "application/json",
		"User-Agent": USER_AGENT,
		"Accept": "*/*, */*",
		"Referer": `${BASE_URL_VIDEO}/${id}`,
		"X-DM-AppInfo-Id": X_DM_AppInfo_Id,
		"X-DM-AppInfo-Type": X_DM_AppInfo_Type,
		"X-DM-AppInfo-Version": X_DM_AppInfo_Version,
		"X-DM-Neon-SSR": X_DM_Neon_SSR,
		"X-DM-Preferred-Country": getPreferredCountry(_settings?.preferredCountryOptionIndex),
		"Origin": BASE_URL,
		"DNT": "1",
		"Connection": "keep-alive",
		"Sec-Fetch-Dest": "empty",
		"Sec-Fetch-Mode": "cors",
		"Sec-Fetch-Site": "same-site",
		"Priority": "u=4",
		"Pragma": "no-cache",
		"Cache-Control": "no-cache"
	};

	if (!usePlatformAuth) {
		videoDetailsRequestHeaders.Authorization = getAnonymousUserTokenSingleton();
	}

	const variables = {
		"xid": id,
		"avatar_size": CREATOR_AVATAR_HEIGHT[_settings?.avatarSizeOptionIndex],
		"thumbnail_resolution": THUMBNAIL_HEIGHT[_settings?.thumbnailResolutionOptionIndex]
	};

	const videoDetailsRequestBody = JSON.stringify(
		{
			operationName: "WATCHING_VIDEO",
			variables,
			query: WATCHING_VIDEO
		});

	const video_details_response = getHttpContext({ usePlatformAuth }).POST(BASE_URL_API, videoDetailsRequestBody, videoDetailsRequestHeaders, usePlatformAuth)

	if (video_details_response.code != 200) {
		throw new UnavailableException('Failed to get video details');
	}

	const video_details = JSON.parse(video_details_response.body);

	const sources: HLSSource[] = [
		new HLSSource(
			{
				name: 'source',
				duration: player_metadata?.duration,
				url: player_metadata?.qualities?.auto[0]?.url,
			}
		)
	]

	const video = video_details?.data?.video as Video;

	const subtitles = player_metadata?.subtitles as IDailymotionSubtitle;

	const platformVideoDetails: PlatformVideoDetailsDef = SourceVideoToPlatformVideoDetailsDef(config.id, video, sources, subtitles);

	return new PlatformVideoDetails(platformVideoDetails)
}

function getSearchChannelPager(context) {

	const searchResponse = executeGqlQuery(
		getHttpContext({ usePlatformAuth: false }), {
		operationName: "SEARCH_QUERY",
		variables: {
			query: context.q,
			page: context.page ?? 1,
			limit: VIDEOS_PER_PAGE_OPTIONS[_settings.videosPerPageOptionIndex],
			avatar_size: CREATOR_AVATAR_HEIGHT[_settings?.avatarSizeOptionIndex]
		},
		query: SEARCH_CHANNEL
	});

	const results = searchResponse?.data?.search?.channels?.edges.map(edge => {
		const channel = edge.node as Channel;
		return SourceChannelToGrayjayChannel(config.id, `${BASE_URL}/${channel.name}`, channel);
	});

	const params = {
		query: context.q,
	}

	return new SearchChannelPager(results, searchResponse?.data?.search?.channels?.pageInfo?.hasNextPage, params, context.page, getSearchChannelPager);

}

function getChannelPlaylists(url: string, page: number = 1): SearchPlaylistPager {

	const headers = {
		'Content-Type': 'application/json',
		'User-Agent': USER_AGENT,
		'Accept-Language': 'en-GB',
		Referer: `${BASE_URL}/library/subscriptions`,
		'X-DM-AppInfo-Id': X_DM_AppInfo_Id,
		'X-DM-AppInfo-Type': X_DM_AppInfo_Type,
		'X-DM-AppInfo-Version': X_DM_AppInfo_Version,
		'X-DM-Neon-SSR': '0',
		'X-DM-Preferred-Country': getPreferredCountry(_settings?.preferredCountryOptionIndex),
		Origin: BASE_URL,
		DNT: '1',
		Connection: 'keep-alive',
		'Sec-Fetch-Dest': 'empty',
		'Sec-Fetch-Mode': 'cors',
		'Sec-Fetch-Site': 'same-site',
		Priority: 'u=4',
		Pragma: 'no-cache',
		'Cache-Control': 'no-cache',
	};

	const usePlatformAuth = false;
	const channel_name = getChannelNameFromUrl(url);

	const jsonResponse1 = executeGqlQuery(
		http,
		{
			operationName: 'CHANNEL_PLAYLISTS_QUERY',
			variables: {
				channel_name,
				sort: "recent",
				page,
				first: PLAYLISTS_PER_PAGE_OPTIONS[_settings.playlistsPerPageOptionIndex],
				avatar_size: CREATOR_AVATAR_HEIGHT[_settings.avatarSizeOptionIndex],
				thumbnail_resolution: THUMBNAIL_HEIGHT[_settings.thumbnailResolutionOptionIndex],
			},
			headers,
			query: CHANNEL_PLAYLISTS_QUERY,
			usePlatformAuth
		}
	)

	const channel = (jsonResponse1.data.channel as Channel);

	const content: PlatformPlaylist[] = (channel?.collections?.edges ?? []).map(edge => {
		return SourceCollectionToGrayjayPlaylist(config.id, edge?.node);
	});

	if (content?.length === 0) {
		return new ChannelPlaylistPager([]);
	}

	const params = {
		url
	}

	const hasMore = channel?.collections?.pageInfo?.hasNextPage ?? false;

	return new ChannelPlaylistPager(content, hasMore, params, page, getChannelPlaylists);
}

function getHttpContext(opts: { usePlatformAuth: boolean } = { usePlatformAuth: false }): IHttp {
	return opts.usePlatformAuth ? http : httpClientAnonymous;
}

log("LOADED");