var config: Config;
var _settings: DailymotionPluginSettings;


import {
	creatorAvatarHeight,
	thumbnailHeight,
	BASE_URL,
	LESS_THAN_MINUTE,
	ONE_TO_FIVE_MINUTES,
	FIVE_TO_THIRTY_MINUTES,
	THIRTY_TO_ONE_HOUR,
	MORE_THAN_ONE_HOUR,
	PLATFORM,
	PLATFORM_CLAIMTYPE,
	ITEMS_PER_PAGE,
	BASE_URL_VIDEO,
	BASE_URL_PLAYLIST,
	USER_AGENT,
	X_DM_AppInfo_Id,
	X_DM_AppInfo_Type,
	X_DM_AppInfo_Version,
	X_DM_Neon_SSR,
	DURATION_THRESHOLDS,
	BASE_URL_API,
	BASE_URL_METADATA,
	errorTypes,
} from './constants';

import {
	SEARCH_SUGGESTIONS_QUERY,
	CHANNEL_BY_URL_QUERY,
	PLAYLIST_DETAILS_QUERY,
	GET_USER_SUBSCRIPTIONS,
	MAIN_SEARCH_QUERY,
	HOME_QUERY,
	GET_VIDEO_EXTRA_DETAILS,
	CHANNEL_VIDEOS_BY_CHANNEL_NAME,
	VIDEO_DETAILS_QUERY,
	SEARCH_CHANNEL,
	GET_CHANNEL_PLAYLISTS
} from './gqlQueries';

import {
	getChannelNameFromUrl,
	isUsernameUrl,
	executeGqlQuery,
	getPreferredCountry,
	getAnonymousUserTokenSingleton
} from './util';

import {
	Channel,
	Collection,
	CollectionConnection,
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
	SearchPlaylistPager
} from './Pagers';


let httpClientAnonymous: IHttp = http.newClient(false);


// Will be used to store playlists that require authentication
const authenticatedPlaylistCollection: string[] = [];

source.setSettings = function (settings) {
	_settings = settings;
	http.GET(BASE_URL, {}, true);
}

//Source Methods
source.enable = function (conf, settings, saveStateStr) {

	config = conf ?? {};
	_settings = settings ?? {};

	if (IS_TESTING) {
		_settings.hideSensitiveContent = false;
		_settings.avatarSize = 8;
		_settings.thumbnailResolution = 7;

		if (!config) {
			config = {
				id: "9c87e8db-e75d-48f4-afe5-2d203d4b95c5"
			}
		}
	}
}


source.getHome = function () {

	getAnonymousUserTokenSingleton();

	return getVideoPager({}, 0);
};

source.searchSuggestions = function (query): string[] {

	const variables = {
		"query": query
	}

	try {

		const jsonResponse = executeGqlQuery(
			getHttpContext({ usePlatformAuth: false }),
			{
				operationName: 'AUTOCOMPLETE_QUERY',
				variables: variables,
				query: SEARCH_SUGGESTIONS_QUERY
			});

		return (jsonResponse?.data?.search?.suggestedVideos as SuggestionConnection)?.edges?.map(edge => edge?.node?.name ?? "") ?? [];
	} catch (error) {
		log('Failed to get search suggestions:' + error?.message);
		return [];
	}
};


source.getSearchCapabilities = () => {
	//TODO: refact this to use more constants
	return {
		types: [
			Type.Feed.Videos,
			Type.Feed.Live
		],
		sorts: [
			"Most Recent",
			"Most Viewed",
			"Most Relevant"
		],
		filters: [
			{
				id: "uploaddate",
				name: "Upload Date",
				isMultiSelect: false,
				filters: [
					{ name: "Today", value: "today" },
					{ name: "Past week", value: "thisweek" },
					{ name: "Past month", value: "thismonth" },
					{ name: "Past year", value: "thisyear" }
				]
			},
			{
				id: "duration",
				name: "Duration",
				isMultiSelect: false,
				filters: [
					{ name: "< 1 min", value: LESS_THAN_MINUTE },
					{ name: "1 - 5 min", value: ONE_TO_FIVE_MINUTES },
					{ name: "5 - 30 min", value: FIVE_TO_THIRTY_MINUTES },
					{ name: "30 min - 1 hour", value: THIRTY_TO_ONE_HOUR },
					{ name: "> 1 hour", value: MORE_THAN_ONE_HOUR }
				]
			}
		]
	};

}


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
				channel_name: channel_name,
				avatar_size: creatorAvatarHeight[_settings?.avatarSize]
			},
			query: CHANNEL_BY_URL_QUERY
		});

	const channel: Channel = channelDetails.data.channel;

	const externalLinks = channel?.externalLinks ?? {};

	const links = {};

	Object
		.keys(externalLinks)
		.forEach(key => {
			if (externalLinks[key]) {
				links[key.replace('URL', '')] = externalLinks[key];
			}
		});

	return new PlatformChannel({
		id: new PlatformID(PLATFORM, channel?.id, config.id, PLATFORM_CLAIMTYPE),
		name: channel?.displayName ?? "",
		thumbnail: channel?.avatar?.url ?? "",
		banner: channel.banner?.url ?? "",
		subscribers: channel?.metrics?.engagement?.followers?.edges[0]?.node?.total ?? 0,
		description: channel?.description ?? "",
		url,
		links,
	})

};

source.getChannelContents = function (url) {
	return getChannelPager({ url, page_size: ITEMS_PER_PAGE, page: 1 })
}


//Video
source.isContentDetailsUrl = function (url) {
	return url.startsWith(BASE_URL_VIDEO);
};

source.getContentDetails = function (url) {
	return getSavedVideo(url, false);
};

//Playlist
source.isPlaylistUrl = (url): boolean => {
	return url.startsWith(BASE_URL_PLAYLIST);
};

source.searchPlaylists = (query, type, order, filters) => {
	return searchPlaylists({ q: query, type, order, filters });
};

source.getPlaylist = (url: string): PlatformPlaylistDetails => {

	const xid = url.split('/').pop();

	const variables = {
		xid,
		avatar_size: creatorAvatarHeight[_settings.avatarSize],
		thumbnail_resolution: thumbnailHeight[_settings.thumbnailResolution],
	}

	const usePlatformAuth = authenticatedPlaylistCollection.includes(url);

	let jsonResponse = executeGqlQuery(
		getHttpContext({ usePlatformAuth }),
		{
			operationName: 'PLAYLIST_VIDEO_QUERY',
			variables,
			query: PLAYLIST_DETAILS_QUERY,
			usePlatformAuth
		});

	const videos = jsonResponse?.data?.collection?.videos?.edges.map(edge => {
		const resource = edge.node as Video;
		const opts: PlatformVideoDef = {
			id: new PlatformID(PLATFORM, resource.id, config.id, PLATFORM_CLAIMTYPE),
			name: resource.title ?? "",
			thumbnails: new Thumbnails([
				new Thumbnail(resource?.thumbnail?.url ?? "", 0)
			]),
			author: new PlatformAuthorLink(
				new PlatformID(PLATFORM, resource?.creator?.id ?? "", config.id, PLATFORM_CLAIMTYPE),
				resource?.creator?.displayName ?? "",
				`${BASE_URL}/${resource?.creator?.name}`,
				resource?.creator?.avatar?.url ?? "",
				0
			),
			uploadDate: parseInt(new Date(resource.createdAt).getTime() / 1000),
			datetime: parseInt(new Date(resource.createdAt).getTime() / 1000),
			url: resource.url ?? "",
			duration: resource.duration ?? 0,
			viewCount: resource?.viewCount ?? 0,
			isLive: false
		};

		return opts;
	});

	const playlist = jsonResponse?.data?.collection as Collection;

	return new PlatformPlaylistDetails({
		url: `${BASE_URL_PLAYLIST}/${playlist?.xid}`,
		id: new PlatformID(PLATFORM, playlist?.xid, config.id, PLATFORM_CLAIMTYPE),
		author: new PlatformAuthorLink(
			new PlatformID(PLATFORM, playlist?.creator?.id ?? "", config.id, PLATFORM_CLAIMTYPE),
			playlist?.creator?.displayName ?? "",
			`${BASE_URL}/${playlist?.creator?.name}`,
			playlist?.creator?.avatar?.url ?? "",
			0
		),
		name: playlist.name,
		thumbnail: playlist?.thumbnail?.url,
		videoCount: playlist?.metrics?.engagement?.videos?.edges[0]?.node?.total,
		contents: new VideoPager(videos)
	});

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
		'X-DM-Preferred-Country': getPreferredCountry(_settings?.preferredCountry),
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
					avatar_size: creatorAvatarHeight[_settings?.avatarSize],
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
		'X-DM-Preferred-Country': getPreferredCountry(_settings?.preferredCountry),
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

	const userInfoQuery = `
	query SUBSCRIPTIONS_QUERY {
		me {
			xid
			channel {
				name
			}
		}
	}	
	`;


	const jsonResponse = executeGqlQuery(
		getHttpContext({ usePlatformAuth: true }),
		{
			operationName: 'SUBSCRIPTIONS_QUERY',
			headers,
			query: userInfoQuery,
			usePlatformAuth: true
		});

	const userName = (jsonResponse?.data?.me?.channel as Channel)?.name;

	return getPlaylistsByUsername(userName, headers, true);

}

function getPlaylistsByUsername(userName, headers, usePlatformAuth = false) {


	const jsonResponse1 = executeGqlQuery(
		getHttpContext({ usePlatformAuth }),
		{
			operationName: 'CHANNEL_PLAYLISTS_QUERY',
			variables: {
				channel_name: userName,
				sort: "recent",
				page: 1,
				first: 99
			},
			headers,
			query: GET_CHANNEL_PLAYLISTS,
			usePlatformAuth
		}
	);

	const playlists = jsonResponse1.data.channel.channel_playlist_collections.edges.map(edge => {
		const playlistUrl = `${BASE_URL_PLAYLIST}/${edge.node.xid}`;
		if (!authenticatedPlaylistCollection.includes(playlistUrl)) {
			authenticatedPlaylistCollection.push(playlistUrl);
		}
		return playlistUrl;
	});


	return playlists;

}

function getQuery(context) {
	context.sort = parseSort(context.order);

	if (!context.filters) {
		context.filters = {};
	}

	if (!context.page) {
		context.page = 1;
	}

	if (context?.filters.duration) {
		context.filters.durationMinVideos = DURATION_THRESHOLDS[context.filters.duration].min;
		context.filters.durationMaxVideos = DURATION_THRESHOLDS[context.filters.duration].max;
	} else {
		context.filters.durationMinVideos = null;
		context.filters.durationMaxVideos = null;
	}

	if (context.filters.uploaddate) {
		context.filters.createdAfterVideos = parseUploadDateFilter(context.filters.uploaddate[0]);
	}

	return context;
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
		"shouldIncludeTopics": false,
		"shouldIncludeVideos": false,
		"shouldIncludeLives": false,
		"page": context.page,
		"limit": ITEMS_PER_PAGE,
		"thumbnail_resolution": thumbnailHeight[_settings?.thumbnailResolution],
		"avatar_size": creatorAvatarHeight[_settings?.avatarSize],
	}


	const jsonResponse = executeGqlQuery(
		getHttpContext({ usePlatformAuth: false }),
		{
			operationName: 'SEARCH_QUERY',
			variables: variables,
			query: MAIN_SEARCH_QUERY,
			headers: undefined
		});

	const playlistConnection = jsonResponse?.data?.search?.playlists as CollectionConnection;

	var searchResults = playlistConnection?.edges?.map(edge => {

		const playlist = edge?.node;

		return new PlatformPlaylist({
			url: `${BASE_URL_PLAYLIST}/${playlist?.xid}`,
			id: new PlatformID(PLATFORM, playlist?.xid ?? "", config.id, PLATFORM_CLAIMTYPE),
			author: new PlatformAuthorLink(
				new PlatformID(PLATFORM, playlist?.creator?.id ?? "", config.id, PLATFORM_CLAIMTYPE),
				playlist?.creator?.displayName ?? "",
				`${BASE_URL}/${playlist?.creator?.name}`,
				playlist?.creator?.avatar?.url ?? "",
				0
			),
			name: playlist?.name,
			thumbnail: playlist?.thumbnail?.url,
			videoCount: playlist?.metrics?.engagement?.videos?.edges[0]?.node?.total,
		});
	});

	const hasMore = playlistConnection?.pageInfo?.hasNextPage;

	if (!searchResults || !searchResults?.length) {
		return new PlaylistPager([]);
	}

	var params = {
		query: context.q,
		sort: context.sort,
		filters: context.filters,
	}

	return new SearchPlaylistPager(searchResults, hasMore, params, context.page, searchPlaylists);
}


//Internals


function getVideoPager(params, page) {

	const count = ITEMS_PER_PAGE;
	const start = (page ?? 0) * count;

	if (!params) {
		params = {};
	}

	params = { ...params, count }


	const headersToAdd = {
		"User-Agent": USER_AGENT,
		// "Accept-Language": Accept_Language,
		"Referer": BASE_URL,
		"Content-Type": "application/json",
		"X-DM-AppInfo-Id": X_DM_AppInfo_Id,
		"X-DM-AppInfo-Type": X_DM_AppInfo_Type,
		"X-DM-AppInfo-Version": X_DM_AppInfo_Version,
		"X-DM-Neon-SSR": X_DM_Neon_SSR,
		"X-DM-Preferred-Country": getPreferredCountry(_settings?.preferredCountry),
		"Origin": BASE_URL,
		"DNT": "1",
		"Sec-Fetch-Site": "same-site",
		"Priority": "u=4",
		"Pragma": "no-cache",
		"Cache-Control": "no-cache"
	};


	let obj;

	try {
		obj = executeGqlQuery(
			getHttpContext({ usePlatformAuth: false }),
			{
				operationName: 'SEACH_DISCOVERY_QUERY',
				variables: {
					shouldQueryPromotedHashtag: false,
					avatar_size: creatorAvatarHeight[_settings?.avatarSize],
					thumbnail_resolution: thumbnailHeight[_settings?.thumbnailResolution],
				},
				query: HOME_QUERY,
				headers: headersToAdd,
			});

	} catch (error) {
		return new VideoPager([], false, { params });
	}

	var results = obj?.data?.home?.neon?.sections?.edges[0]?.node?.components?.edges
		// ?.filter(edge => edge?.node?.__typename === 'Video')
		?.filter(edge => edge?.node?.id)
		?.map(edge => {

			const v = edge.node as Video;

			const metadata = GetVideoExtraDetails(v.xid);

			return ToPlatformVideo({
				id: v.id,
				name: v.title ?? "",
				thumbnail: v.thumbnail?.url ?? "",
				createdAt: v.createdAt,
				creatorId: v?.creator?.id,
				creatorName: v?.creator?.name,
				creatorDisplayName: v.creator?.displayName,
				creatorAvatar: v?.creator?.avatar?.url ?? "",
				creatorUrl: `${BASE_URL}/${v.creator?.name}`,
				duration: v.duration,
				viewCount: metadata.views ?? 0,
				url: `${BASE_URL_VIDEO}/${v.xid}`,
				isLive: false,
				description: v?.description ?? '',
			});

		})

	const hasMore = obj?.data?.home?.neon?.sections?.edges[0]?.node?.components?.pageInfo?.hasNextPage ?? false;
	return new SearchPagerAll(results, hasMore, params, page, getVideoPager);
}

function GetVideoExtraDetails(xid) {


	const json = executeGqlQuery(
		getHttpContext({ usePlatformAuth: false }), {
		operationName: 'WATCHING_VIDEO',
		variables: { xid },
		query: GET_VIDEO_EXTRA_DETAILS
	});


	return {
		views: json?.data?.video?.stats?.views?.total
	}
}


function getChannelPager(context) {

	const url = context.url;

	const channel_name = getChannelNameFromUrl(url);

	const json = executeGqlQuery(
		getHttpContext({ usePlatformAuth: false }),
		{
			operationName: 'CHANNEL_VIDEOS_QUERY',
			variables: {
				"channel_name": channel_name,
				"sort": "recent",
				"page": context.page ?? 1,
				"allowExplicit": !_settings.hideSensitiveContent,
				"first": context.page_size ?? ITEMS_PER_PAGE,
				"avatar_size": creatorAvatarHeight[_settings?.avatarSize],
				"thumbnail_resolution": thumbnailHeight[_settings?.thumbnailResolution],
			},
			query: CHANNEL_VIDEOS_BY_CHANNEL_NAME
		});

	const edges = json?.data?.channel?.channel_videos_all_videos?.edges ?? [];

	let videos = edges.map((edge) => {

		const video: Video = edge.node;

		const metadata = GetVideoExtraDetails(video.xid);


		return ToPlatformVideo({
			id: video.id,
			name: video.title,
			thumbnail: video?.thumbnail?.url ?? "",
			createdAt: video?.createdAt,
			creatorId: video?.creator?.id,
			creatorDisplayName: video?.creator?.displayName,
			creatorName: video?.creator?.name,
			creatorAvatar: video?.creator?.avatar?.url,
			creatorUrl: `${BASE_URL}/${video?.creator?.name}`,
			duration: video.duration,
			url: `${BASE_URL_VIDEO}/${video?.xid}`,
			viewCount: metadata.views ?? 0,
			isLive: false
		});

	})

	if (edges.length > 0) {
		context.page++;
	}

	return new ChannelVideoPager(context, videos, json?.data?.channel?.channel_videos_all_videos?.pageInfo?.hasNextPage, getChannelPager);
}

function ToPlatformVideo(resource) {

	return new PlatformVideo({
		id: new PlatformID(PLATFORM, resource.id, config.id, PLATFORM_CLAIMTYPE),
		name: resource.name,
		thumbnails: new Thumbnails([new Thumbnail(resource.thumbnail, 0)]),
		author: new PlatformAuthorLink(
			new PlatformID(PLATFORM, resource.creatorId, config.id, PLATFORM_CLAIMTYPE),
			resource.creatorDisplayName,
			resource.creatorUrl,
			resource.creatorAvatar ?? "",
			0
		),
		uploadDate: parseInt(new Date(resource.createdAt).getTime() / 1000),
		url: resource.url,
		duration: resource.duration,
		viewCount: resource.viewCount,
		isLive: resource.isLive
	})

}

function parseSort(order) {
	let sort;
	switch (order) {
		//TODO: refact this to use constants
		case "Most Recent":
			sort = "RECENT";
			break;
		case "Most Viewed":
			sort = "VIEW_COUNT";
			break;
		case "Most Relevant":
			sort = "RELEVANCE";
			break;
		default:
			sort = order; // Default to the original order if no match
	}
	return sort
}

function parseUploadDateFilter(filter) {
	let createdAfterVideos;

	const now = new Date();

	switch (filter) {
		case "today":
			// Last 24 hours from now
			const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
			createdAfterVideos = yesterday.toISOString();
			break;
		case "thisweek":
			// Adjusts to the start of the current week (assuming week starts on Sunday)
			const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
			createdAfterVideos = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate()).toISOString();
			break;
		case "thismonth":
			// Adjusts to the start of the month
			createdAfterVideos = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
			break;
		case "thisyear":
			// Adjusts to the start of the year
			createdAfterVideos = new Date(now.getFullYear(), 0, 1).toISOString();
			break;
		default:
			createdAfterVideos = null;
	}
	return createdAfterVideos;
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
		"shouldIncludeTopics": false,
		"shouldIncludeVideos": true,
		"shouldIncludeLives": true,
		"page": context.page ?? 1,
		"limit": ITEMS_PER_PAGE,
		"avatar_size": creatorAvatarHeight[_settings?.avatarSize],
		"thumbnail_resolution": thumbnailHeight[_settings?.thumbnailResolution]
	}


	const jsonResponse = executeGqlQuery(
		getHttpContext({ usePlatformAuth: false }),
		{
			operationName: 'SEARCH_QUERY',
			variables: variables,
			query: MAIN_SEARCH_QUERY,
			headers: undefined
		});

	const results: PlatformVideo[] = []

	const videoConnection = jsonResponse?.data?.search?.videos as VideoConnection;
	const liveConnection = jsonResponse?.data?.search?.videos as LiveConnection;

	const all: (VideoEdge | LiveEdge | null)[] = [
		...(videoConnection?.edges ?? []),
		...(liveConnection?.edges ?? [])
	]

	for (const edge of all) {

		const sv = edge?.node;

		const isLive = sv?.isOnAir == true;
		const viewCount = isLive ? sv?.audienceCount : sv?.stats?.views?.total;

		var video = ToPlatformVideo({
			id: sv?.id,
			name: sv?.title,
			thumbnail: sv?.thumbnail?.url,
			createdAt: sv?.createdAt,
			creatorId: sv?.creator?.id,
			creatorName: sv?.creator?.name,
			creatorDisplayName: sv?.creator?.displayName,
			creatorUrl: `${BASE_URL}/${sv?.creator?.name}`,
			creatorAvatar: sv?.creator?.avatar?.url ?? "",
			duration: sv?.duration,
			viewCount,
			url: `${BASE_URL_VIDEO}/${sv?.xid}`,
			isLive,
			description: sv?.description ?? '',
		});

		results.push(video)
	}

	//results, hasMore, path, params, page
	var params = {
		query: context.q,
		sort: context.sort,
		filters: context.filters,
	}
	return new SearchPagerAll(results, videoConnection?.pageInfo?.hasNextPage, params, context.page, getSearchPagerAll);
}

function checkHLS(url, headersToAdd, usePlatformAuth = false) {
	// const resp = http.GET(url, headersToAdd, true);
	var resp = getHttpContext({ usePlatformAuth }).GET(url, headersToAdd, usePlatformAuth);

	if (!resp.isOk) {
		throw new UnavailableException('This content is not available')
	}
}

function getSavedVideo(url, usePlatformAuth = false) {

	const id = url.split('/').pop();

	const player_metadata_url = `${BASE_URL_METADATA}/${id}?embedder=https%3A%2F%2Fwww.dailymotion.com%2Fvideo%2Fx8yb2e8&geo=1&player-id=xjnde&locale=en-GB&dmV1st=ce2035cd-bdca-4d7b-baa4-127a17490ca5&dmTs=747022&is_native_app=0&app=com.dailymotion.neon&client_type=webapp&section_type=player&component_style=_`;

	var headers1 = {
		"User-Agent": USER_AGENT,
		"Accept": "*/*",
		// "Accept-Language": Accept_Language,
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

	var player_metadataResponse = getHttpContext({ usePlatformAuth }).GET(player_metadata_url, headers1, usePlatformAuth);

	if (!player_metadataResponse.isOk) {
		throw new UnavailableException('Unable to get player metadata');
	}

	var player_metadata = JSON.parse(player_metadataResponse.body);

	if (player_metadata.error) {

		if (player_metadata.error.code && errorTypes[player_metadata.error.code] !== undefined) {
			throw new UnavailableException(errorTypes[player_metadata.error.code]);
		}

		throw new UnavailableException('This content is not available');
	}

	const hls_url = player_metadata?.qualities?.auto[0]?.url;

	checkHLS(hls_url, headers1);

	const videoDetailsRequestHeaders = {
		"Content-Type": "application/json",
		"User-Agent": USER_AGENT,
		"Accept": "*/*, */*",
		// "Accept-Language": Accept_Language,
		"Referer": `${BASE_URL_VIDEO}/${id}`,
		"X-DM-AppInfo-Id": X_DM_AppInfo_Id,
		"X-DM-AppInfo-Type": X_DM_AppInfo_Type,
		"X-DM-AppInfo-Version": X_DM_AppInfo_Version,
		"X-DM-Neon-SSR": X_DM_Neon_SSR,
		"X-DM-Preferred-Country": getPreferredCountry(_settings?.preferredCountry),
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
		"isSEO": false,
		"avatar_size": creatorAvatarHeight[_settings?.avatarSize],
		"thumbnail_resolution": thumbnailHeight[_settings?.thumbnailResolution]
	};

	const videoDetailsRequestBody = JSON.stringify(
		{
			operationName: "WATCHING_VIDEO",
			variables,
			query: VIDEO_DETAILS_QUERY
		});

	const video_details_response = getHttpContext({ usePlatformAuth }).POST(BASE_URL_API, videoDetailsRequestBody, videoDetailsRequestHeaders, usePlatformAuth)

	if (video_details_response.code != 200) {
		throw new UnavailableException('Failed to get video details');
	}

	const video_details = JSON.parse(video_details_response.body);

	const sources = [
		new HLSSource(
			{
				name: 'source',
				duration: player_metadata?.duration,
				url: hls_url,
				// priority: true,
			}
		)
	]

	const video = video_details?.data?.video;


	// This platform uses a scale system for rating the videos.
	// Ratings are grouped into positive and negative to calculate likes and dislikes.

	const positiveRatings = [
		"STAR_STRUCK", // amazing
		"SMILING_FACE_WITH_SUNGLASSES", // cool
		"WINKING_FACE" // interesting
	];

	const negativeRatings = [
		"SLEEPING_FACE", // boring
		"FISHING_POLE" // waste of time
	];

	let positiveRatingCount = 0;
	let negativeRatingCount = 0;

	const ratings = video?.metrics?.engagement?.likes?.edges ?? [];

	for (const edge of ratings) {
		const ratingName = edge?.node?.rating as string;
		const ratingTotal = edge?.node?.total as number;

		if (positiveRatings.includes(ratingName)) {
			positiveRatingCount += ratingTotal;
		} else if (negativeRatings.includes(ratingName)) {
			negativeRatingCount += ratingTotal;
		}
	}

	var platformVideoDetails: PlatformVideoDetailsDef = {
		id: new PlatformID(PLATFORM, id, config.id, PLATFORM_CLAIMTYPE),
		name: video.title,
		thumbnails: new Thumbnails([new Thumbnail(video.thumbnail.url, 0)]),
		author: new PlatformAuthorLink(
			new PlatformID(PLATFORM, video?.creator?.id, config.id, PLATFORM_CLAIMTYPE),
			video?.creator?.displayName,
			`${BASE_URL}/${video?.creator?.name}`,
			`${video?.creator?.avatar?.url}`,
			0 //subscribers
		),
		// datetime: new Date(video?.createdAt).getTime(),
		uploadDate: parseInt(new Date(video.createdAt).getTime() / 1000),
		duration: video?.duration,
		viewCount: video?.stats?.views?.total,
		url: `${BASE_URL_VIDEO}/${id}`,
		isLive: video?.duration == undefined,
		description: video?.description,
		video: new VideoSourceDescriptor(sources),
		rating: new RatingLikesDislikes(positiveRatingCount, negativeRatingCount),
		dash: null,
		live: null,
		hls: null,
	}

	return new PlatformVideoDetails(platformVideoDetails)
}

function getSearchChannelPager(context) {

	const variables = {
		query: context.q,
		page: context.page ?? 1,
		limit: ITEMS_PER_PAGE,
		avatar_size: creatorAvatarHeight[_settings?.avatarSize]
	};

	const json = executeGqlQuery(
		getHttpContext({ usePlatformAuth: false }),{
		operationName: "SEARCH_QUERY",
		variables,
		query: SEARCH_CHANNEL
	});

	const results = json?.data?.search?.channels?.edges.map(edge => {
		const c = edge.node;
		return new PlatformChannel({
			id: new PlatformID(PLATFORM, c.id, config.id, PLATFORM_CLAIMTYPE),
			name: c.displayName,
			thumbnail: c?.avatar?.url,
			subscribers: c?.metrics?.engagement?.followers?.edges[0]?.node?.total ?? 0,
			url: `${BASE_URL}/${c.name}`,
			links: [],
			banner: "",
			description: c.description,
		});
	});

	var params = {
		query: context.q,
	}

	return new SearchChannelPager(results, json?.data?.search?.channels?.pageInfo?.hasNextPage, params, context.page, getSearchChannelPager);

}

function getHttpContext(opts: { usePlatformAuth: Boolean } = { usePlatformAuth: false }): IHttp {
	return opts.usePlatformAuth ? http : httpClientAnonymous;
}

log("LOADED");