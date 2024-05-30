const BASE_URL = "https://www.dailymotion.com";
const BASE_URL_API = "https://graphql.api.dailymotion.com";
const BASE_URL_API_AUTH = `${BASE_URL_API}/oauth/token?`;
const BASE_URL_VIDEO = `${BASE_URL}/video`;
const BASE_URL_PLAYLIST = `${BASE_URL}/playlist`;
const BASE_URL_METADATA = `${BASE_URL}/player/metadata/video`;

const USER_AGENT = '"Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36"'

// Those are used even for not logged users to make requests on the graphql api.
//TODO: check how to get them dynamically
const CLIENT_ID = 'f1a362d288c1b98099c7';
const CLIENT_SECRET = 'eea605b96e01c796ff369935357eca920c5da4c5';

var config: IPluginConfig = {};
var _settings: DailymotionPluginSettings = {};

const X_DM_AppInfo_Id = "com.dailymotion.neon"
const X_DM_AppInfo_Type = "website"
const X_DM_AppInfo_Version = "v2024-05-16T12:17:57.363Z" //TODO check how to get this dynamically
const X_DM_Neon_SSR = "0"
const X_DM_Preferred_Country = "";//TODO check how to get this from Grayjay

const PLATFORM = "Dailymotion";
const PLATFORM_CLAIMTYPE = 3;

const ITEMS_PER_PAGE = 5;

let AUTHORIZATION_TOKEN_ANONYMOUS_USER = null;
let AUTHORIZATION_TOKEN_ANONYMOUS_USER_EXPIRATION_DATE = null;

// search capabilities - upload date
const LESS_THAN_MINUTE = "LESS_THAN_MINUTE"
const ONE_TO_FIVE_MINUTES = "ONE_TO_FIVE_MINUTES"
const FIVE_TO_THIRTY_MINUTES = "FIVE_TO_THIRTY_MINUTES"
const THIRTY_TO_ONE_HOUR = "THIRTY_TO_ONE_HOUR"
const MORE_THAN_ONE_HOUR = "MORE_THAN_ONE_HOUR"


const DURATION_THRESHOLDS = {}
DURATION_THRESHOLDS[LESS_THAN_MINUTE] = { min: 0, max: 60 };
DURATION_THRESHOLDS[ONE_TO_FIVE_MINUTES] = { min: 60, max: 300 };
DURATION_THRESHOLDS[FIVE_TO_THIRTY_MINUTES] = { min: 300, max: 1800 };
DURATION_THRESHOLDS[THIRTY_TO_ONE_HOUR] = { min: 1800, max: 3600 };
DURATION_THRESHOLDS[MORE_THAN_ONE_HOUR] = { min: 3600, max: null };

import errorTypes from './errorTypes';
import constants from './constants';
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
	SEARCH_CHANNEL
} from './gqlQueries';

import util from './util';

type authOptions = {
	useAnonymousToken?: boolean,
	usePlatformAuth?: boolean
}

source.setSettings = function (settings) {
	_settings = settings;
}

//Source Methods
source.enable = function (conf, settings, saveStateStr) {

	config = conf ?? {};
	_settings = settings ?? {};

	if (IS_TESTING) {
		_settings.hideSensitiveContent = false;
		_settings.avatarSize = 8;
		_settings.thumbnailResolution = 7;
	}

	http.GET(BASE_URL, {}, true);


}


source.getHome = function () {
	return getVideoPager({}, 0);
};

source.searchSuggestions = function (query) {

	const variables = {
		"query": query
	}

	try {
		const jsonResponse = executeGqlQuery({
			operationName: 'AUTOCOMPLETE_QUERY',
			variables: variables,
			query: SEARCH_SUGGESTIONS_QUERY
		}, { useAnonymousToken: true });

		return jsonResponse?.data?.search?.suggestedVideos?.edges?.map(edge => edge?.node?.name);
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

// source.getSearchChannelContentsCapabilities = function () {

// };
// source.searchChannelContents = function (channelUrl, query, type, order, filters) {

// };

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
		{
			operationName: 'CHANNEL_QUERY_DESKTOP',
			variables: {
				channel_name: channel_name,
				avatar_size: constants.creatorAvatarHeight[_settings?.avatarSize]
			},
			query: CHANNEL_BY_URL_QUERY
		}, { useAnonymousToken: true });

	const user = channelDetails.data.channel;

	const banner = user?.coverURL1024x ?? user?.coverURL1920x;

	const externalLinks = user?.externalLinks ?? {};

	const links = {};

	Object
		.keys(externalLinks)
		.forEach(key => {
			if (externalLinks[key]) {
				links[key.replace('URL', '')] = externalLinks[key];
			}
		});

	return new PlatformChannel({
		id: new PlatformID(PLATFORM, user?.id, config?.id, PLATFORM_CLAIMTYPE),
		name: user?.displayName,
		thumbnail: user?.avatar?.url,
		banner,
		subscribers: user?.metrics?.engagement?.followers?.edges[0]?.node?.total,
		description: user?.description,
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
	return getSavedVideo(url, { useAnonymousToken: true, usePlatformAuth: false });
};

//Playlist
source.isPlaylistUrl = (url): boolean => {
	var isPlaylist = url.startsWith(BASE_URL_PLAYLIST);
	return isPlaylist;
};

source.searchPlaylists = (query, type, order, filters) => {
	return searchPlaylists({ q: query, type, order, filters });
};

source.getPlaylist = (url) => {

	const xid = url.split('/').pop();

	const variables = {
		xid,
		avatar_size: constants.creatorAvatarHeight[_settings?.avatarSize],
		thumbnail_resolution: constants.thumbnailHeight[_settings?.thumbnailResolution],
	}

	const jsonResponse = executeGqlQuery({
		operationName: 'PLAYLIST_VIDEO_QUERY',
		variables,
		query: PLAYLIST_DETAILS_QUERY
	}, { useAnonymousToken: true });

	const videos = jsonResponse?.data?.collection?.videos?.edges.map(edge => {
		const resource = edge.node;
		const opts: PlatformVideoDef = {
			id: new PlatformID(PLATFORM, resource.id, config.id, PLATFORM_CLAIMTYPE),
			name: resource.title,
			thumbnails: new Thumbnails([
				new Thumbnail(resource?.thumbnail?.url, 0)
			]),
			author: new PlatformAuthorLink(
				new PlatformID(PLATFORM, resource.creator.id, config.id, PLATFORM_CLAIMTYPE),
				resource.creator.displayName,
				`${BASE_URL}/${resource.creator.name}`,
				resource.creator.avatar.url ?? "",
				0
			),
			uploadDate: parseInt(new Date(resource.createdAt).getTime() / 1000),
			datetime: parseInt(new Date(resource.createdAt).getTime() / 1000),
			url: resource.url,
			duration: resource.duration,
			viewCount: resource?.viewCount ?? 0,
			isLive: false
		};

		return opts;
	});

	const playlist = jsonResponse?.data?.collection;

	return new PlatformPlaylistDetails({
		url: `${BASE_URL_PLAYLIST}/${playlist?.xid}`,
		id: new PlatformID(PLATFORM, playlist?.xid, config.id),
		author: new PlatformAuthorLink(
			new PlatformID(PLATFORM, playlist?.creator?.id, config.id, PLATFORM_CLAIMTYPE),
			playlist?.creator?.displayName,
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

source.getUserSubscriptions = () => {

	if (!bridge.isLoggedIn()) {
		bridge.log("Failed to retrieve subscriptions page because not logged in.");
		throw new ScriptException("Not logged in");
	}

	const fetchSubscriptions = (page, first) => {
		const jsonResponse = executeGqlQuery({
			operationName: 'SUBSCRIPTIONS_QUERY',
			variables: {
				first: first,
				page: page,
				avatar_size: constants.creatorAvatarHeight[_settings?.avatarSize],
			},
			query: GET_USER_SUBSCRIPTIONS
		}, { usePlatformAuth: true });

		return jsonResponse?.data?.me?.followingChannels;
	};

	const first = 100;  // Number of records to fetch per page
	let page = 1;
	let subscriptions: string[] = [];
	let totalCount = 0;
	let fetchedCount = 0;

	do {
		const response = fetchSubscriptions(page, first);
		totalCount = response.totalCount;
		subscriptions.push(...response.edges.map(edge => `${BASE_URL}/${edge.node.name}`));
		fetchedCount += response.edges.length;
		page++;
	} while (fetchedCount < totalCount);

	return subscriptions;
};


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
		"thumbnail_resolution": constants.thumbnailHeight[_settings?.thumbnailResolution],
		"avatar_size": constants.creatorAvatarHeight[_settings?.avatarSize],
	}

	const jsonResponse = executeGqlQuery({
		operationName: 'SEARCH_QUERY',
		variables: variables,
		query: MAIN_SEARCH_QUERY,
		headers: undefined
	}, { useAnonymousToken: true });

	var searchResults = jsonResponse?.data?.search?.playlists?.edges?.map(edge => {

		const playlist = edge.node;

		return new PlatformPlaylist({
			url: `${BASE_URL_PLAYLIST}/${playlist?.xid}`,
			id: new PlatformID(PLATFORM, playlist?.xid, config.id),
			author: new PlatformAuthorLink(
				new PlatformID(PLATFORM, playlist.creator.id, config.id, PLATFORM_CLAIMTYPE),
				playlist.creator.displayName,
				`${BASE_URL}/${playlist.creator.name}`,
				playlist.creator.avatar.url ?? "",
				0
			),
			name: playlist.name,
			thumbnail: playlist?.thumbnail?.url,
			videoCount: playlist?.metrics?.engagement?.videos?.edges[0]?.node?.total,
		});
	});

	const hasMore = jsonResponse?.data?.search?.playlists?.pageInfo?.hasNextPage;

	if (!searchResults || !searchResults?.length) {
		return new PlaylistPager([]);
	}

	var params = {
		query: context.q,
		sort: context.sort,
		filters: context.filters,
	}

	return new SearchPlaylistPager(searchResults, hasMore, params, context.page);
}


//Internals

function getChannelNameFromUrl(url) {
	const channel_name = url.split('/').pop();
	return channel_name;
}

function isUsernameUrl(url) {

	// Define the regex pattern to match the username URL
	var regex = new RegExp('^' + BASE_URL.replace(/\./g, '\\.') + '/[^/]+$');

	// Test the URL against the regex pattern
	return regex.test(url);
}



function getAnonymousUserTokenSingleton() {
	// Check if the anonymous user token is available and not expired
	if (AUTHORIZATION_TOKEN_ANONYMOUS_USER) {

		const isTokenValid = AUTHORIZATION_TOKEN_ANONYMOUS_USER_EXPIRATION_DATE && new Date().getTime() < AUTHORIZATION_TOKEN_ANONYMOUS_USER_EXPIRATION_DATE;

		if (isTokenValid) {
			return AUTHORIZATION_TOKEN_ANONYMOUS_USER;
		}
	}

	// Prepare the request body for obtaining a new token
	const body = util.objectToUrlEncodedString({
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		grant_type: 'client_credentials'
	});

	// Make the HTTP POST request to the authorization API
	const res = http.POST(`${BASE_URL_API_AUTH}`, body, {
		'User-Agent': USER_AGENT,
		'Content-Type': 'application/x-www-form-urlencoded',
		'Origin': BASE_URL,
		'DNT': '1',
		'Sec-GPC': '1',
		'Connection': 'keep-alive',
		'Sec-Fetch-Dest': 'empty',
		'Sec-Fetch-Mode': 'cors',
		'Sec-Fetch-Site': 'same-site',
		'Priority': 'u=4',
		'Pragma': 'no-cache',
		'Cache-Control': 'no-cache'
	}, true);

	// Check if the response code indicates success
	if (res.code !== 200) {
		console.error('Failed to get token', res);
		throw new ScriptException("", "Failed to get token: " + res.code + " - " + res.body);
	}

	// Parse the response JSON to extract the token information
	const json = JSON.parse(res.body);

	// Ensure the response contains the necessary token information
	if (!json.token_type || !json.access_token) {
		console.error('Invalid token response', res);
		throw new ScriptException("", 'Invalid token response: ' + res.body);
	}

	// Store the token and its expiration date
	AUTHORIZATION_TOKEN_ANONYMOUS_USER = `${json.token_type} ${json.access_token}`;
	AUTHORIZATION_TOKEN_ANONYMOUS_USER_EXPIRATION_DATE = new Date().getTime() + (json.expires_in * 1000);

	return AUTHORIZATION_TOKEN_ANONYMOUS_USER;
}

function getPreferredCountry() {
	const countryName = constants.countryNames[_settings?.preferredCountry];
	const code = constants.countryNamesToCode[countryName];
	const preferredCountry = (code || X_DM_Preferred_Country || '').toLowerCase();
	return preferredCountry;
}

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
		"X-DM-Preferred-Country": getPreferredCountry(),
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
			{
				operationName: 'SEACH_DISCOVERY_QUERY',
				variables: {
					shouldQueryPromotedHashtag: false,
					avatar_size: constants.creatorAvatarHeight[_settings?.avatarSize],
					thumbnail_resolution: constants.thumbnailHeight[_settings?.thumbnailResolution],
				},
				query: HOME_QUERY,
				headers: headersToAdd,
			}, { useAnonymousToken: true });

	} catch (error) {
		return new VideoPager([], false, { params });
	}

	var results = obj?.data?.home?.neon?.sections?.edges[0]?.node?.components?.edges
		// ?.filter(edge => edge?.node?.__typename === 'Video')
		?.filter(edge => edge?.node?.id)
		?.map(edge => {

			const v = edge.node;

			const metadata = GetVideoExtraDEtails(v.xid);

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
	return new SearchPagerAll(results, hasMore, params, page);
}

function GetVideoExtraDEtails(xid) {

	const json = executeGqlQuery({
		operationName: 'WATCHING_VIDEO',
		variables: { xid },
		query: GET_VIDEO_EXTRA_DETAILS
	}, { useAnonymousToken: true });


	return {
		views: json?.data?.video?.stats?.views?.total
	}
}


function getChannelPager(context) {

	const url = context.url;

	const channel_name = getChannelNameFromUrl(url);

	const json = executeGqlQuery(
		{
			operationName: 'CHANNEL_VIDEOS_QUERY',
			variables: {
				"channel_name": channel_name,
				"sort": "recent",
				"page": context.page ?? 1,
				"allowExplicit": !_settings.hideSensitiveContent,
				"first": context.page_size ?? ITEMS_PER_PAGE,
				"avatar_size": constants.creatorAvatarHeight[_settings?.avatarSize],
				"thumbnail_resolution": constants.thumbnailHeight[_settings?.thumbnailResolution],
			},
			query: CHANNEL_VIDEOS_BY_CHANNEL_NAME
		}, { useAnonymousToken: true });

	const edges = json?.data?.channel?.channel_videos_all_videos?.edges ?? [];

	let videos = edges.map((edge) => {

		const metadata = GetVideoExtraDEtails(edge.node.xid);

		return ToPlatformVideo({
			id: edge.node.id,
			name: edge.node.title,
			thumbnail: edge?.node?.thumbnail.url ?? "",
			createdAt: edge?.node?.createdAt,
			creatorId: edge?.node?.creator?.id,
			creatorDisplayName: edge?.node?.creator?.displayName,
			creatorName: edge.node.creator.name,
			creatorAvatar: edge?.node?.creator?.avatar?.url,
			creatorUrl: `${BASE_URL}/${edge?.node?.creator?.name}`,
			duration: edge.node.duration,
			url: `${BASE_URL_VIDEO}/${edge?.node?.xid}`,
			viewCount: metadata.views ?? 0,
			isLive: false
		});

	})

	if (edges.length > 0) {
		context.page++;
	}

	return new ChannelVideoPager(context, videos, json?.data?.channel?.channel_videos_all_videos?.pageInfo?.hasNextPage);
}

function ToPlatformVideo(resource) {

	const opts: PlatformVideoDef = {
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
	};

	return new PlatformVideo(opts)

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

function getSearchPagerAll(contextQuery) {

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
		"avatar_size": constants.creatorAvatarHeight[_settings?.avatarSize],
		"thumbnail_resolution": constants.thumbnailHeight[_settings?.thumbnailResolution]
	}

	const jsonResponse = executeGqlQuery({
		operationName: 'SEARCH_QUERY',
		variables: variables,
		query: MAIN_SEARCH_QUERY,
		headers: undefined
	}, { useAnonymousToken: true });

	const results = []

	const all = [
		...(jsonResponse?.data?.search?.videos?.edges ?? []),
		...(jsonResponse?.data?.search?.lives?.edges ?? [])
	]

	for (const edge of all) {

		const sv = edge.node;

		const isLive = sv.isOnAir == true;
		const viewCount = isLive ? sv.audienceCount : sv?.stats?.views?.total;

		var video = ToPlatformVideo({
			id: sv.id,
			name: sv.title,
			thumbnail: sv?.thumbnail?.url,
			createdAt: sv.createdAt,
			creatorId: sv.creator?.id,
			creatorName: sv.creator?.name,
			creatorDisplayName: sv.creator?.displayName,
			creatorUrl: `${BASE_URL}/${sv?.creator?.name}`,
			creatorAvatar: sv.creator?.avatar?.url ?? "",
			duration: sv.duration,
			viewCount,
			url: `${BASE_URL_VIDEO}/${sv.xid}`,
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
	return new SearchPagerAll(results, jsonResponse?.data?.search?.videos?.pageInfo?.hasNextPage, params, context.page);
}

function executeGqlQuery(requestOptions, authOptions: authOptions = {}) {

	const headersToAdd = requestOptions.headers || {
		"User-Agent": USER_AGENT,
		"Accept": "*/*",
		// "Accept-Language": Accept_Language,
		"Referer": BASE_URL,
		"Origin": BASE_URL,
		"DNT": "1",
		"Connection": "keep-alive",
		"Sec-Fetch-Dest": "empty",
		"Sec-Fetch-Mode": "cors",
		"Sec-Fetch-Site": "same-site",
		"Pragma": "no-cache",
		"Cache-Control": "no-cache"
	}

	if (authOptions.useAnonymousToken) {
		headersToAdd.Authorization = getAnonymousUserTokenSingleton();
	}

	const gql = JSON.stringify({
		operationName: requestOptions.operationName,
		variables: requestOptions.variables,
		query: requestOptions.query,
	});

	const res = http.POST(BASE_URL_API, gql, headersToAdd, authOptions.usePlatformAuth);

	if (!res.isOk) {
		console.error('Failed to get token', res);
		throw new ScriptException("Failed to get token", res);
	}

	return JSON.parse(res.body);
}



function checkHLS(url, headersToAdd, use_authenticated = false) {
	// const resp = http.GET(url, headersToAdd, true);
	var resp = http.GET(url, headersToAdd, use_authenticated);

	if (!resp.isOk) {
		throw new UnavailableException('This content is not available')
	}
}

function getSavedVideo(url, authOptions: authOptions = { useAnonymousToken: false, usePlatformAuth: false }) {

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

	var player_metadataResponse = http.GET(player_metadata_url, headers1);

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
		"X-DM-Preferred-Country": getPreferredCountry(),
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

	if (authOptions.useAnonymousToken) {
		videoDetailsRequestHeaders.Authorization = getAnonymousUserTokenSingleton();
	}

	const variables = {
		"xid": id,
		"isSEO": false,
		"avatar_size": constants.creatorAvatarHeight[_settings?.avatarSize],
		"thumbnail_resolution": constants.thumbnailHeight[_settings?.thumbnailResolution]
	};

	const videoDetailsRequestBody = JSON.stringify(
		{
			operationName: "WATCHING_VIDEO",
			variables,
			query: VIDEO_DETAILS_QUERY
		});

	const video_details_response = http.POST(BASE_URL_API, videoDetailsRequestBody, videoDetailsRequestHeaders, authOptions.usePlatformAuth)

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
		avatar_size: constants.creatorAvatarHeight[_settings?.avatarSize]
	};

	const json = executeGqlQuery({
		operationName: "SEARCH_QUERY",
		variables,
		query: SEARCH_CHANNEL
	}, { useAnonymousToken: true });

	const results = json?.data?.search?.channels?.edges.map(edge => {
		const c = edge.node;
		return new PlatformChannel({
			id: new PlatformID(PLATFORM, c.id, config.id, PLATFORM_CLAIMTYPE),
			name: c.displayName,
			thumbnail: c?.avatar?.url,
			subscribers: c?.metrics?.engagement?.followers?.edges[0]?.node?.total ?? 0,
			url: `${BASE_URL}/${c.name}`,
			links: [],
			banner: null,
			description: c.description,
		});
	});

	var params = {
		query: context.q,
	}

	return new SearchChannelPager(results, json?.data?.search?.channels?.pageInfo?.hasNextPage, params, context.page);

}

//Pagers

class SearchPagerAll extends VideoPager {
	/**
	 * @param {import("./types.d.ts").SearchContext} context the query params
	 * @param {(PlatformVideo | PlatformChannel)[]} results the initial results
	*/
	constructor(results, hasMore, params, page) {
		super(results, hasMore, { params, page });
	}

	nextPage() {

		this.context.page = this.context.page + 1

		const opts = {
			q: this.context.params.query,
			sort: this.context.params.sort,
			page: this.context.page,
			filters: this.context.params.filters
		};

		return getSearchPagerAll(opts);
	}
}

class SearchChannelPager extends ChannelPager {
	constructor(results, hasNextPage, params, page,) {
		super(results, hasNextPage, { params, page })
	}

	nextPage() {
		const opts = { q: this.context.params.query, page: this.context.page += 1 };
		return getSearchChannelPager(opts)
	}
}



class ChannelVideoPager extends VideoPager {
	/**
	 * @param {import("./types.d.ts").URLContext} context the context
	 * @param {PlatformVideo[]} results the initial results
	 * @param {boolean} hasNextPage if there is a next page
	 */
	constructor(context, results, hasNextPage) {
		super(results, hasNextPage, context)
	}

	nextPage() {
		return getChannelPager(this.context)
	}
}


class SearchPlaylistPager extends VideoPager {
	/**
	 * @param {import("./types.d.ts").SearchContext} context the query params
	 * @param {(PlatformVideo | PlatformChannel)[]} results the initial results
	*/
	constructor(results, hasMore, params, page) {
		super(results, hasMore, { params, page });
	}

	nextPage() {

		this.context.page = this.context.page + 1

		const opts = {
			q: this.context.params.query,
			sort: this.context.params.sort,
			page: this.context.page,
			filters: this.context.params.filters
		};

		return searchPlaylists(opts);
	}
}






log("LOADED");