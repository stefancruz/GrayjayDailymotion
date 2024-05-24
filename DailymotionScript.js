const BASE_URL = "https://www.dailymotion.com";
const BASE_URL_API = "https://graphql.api.dailymotion.com";
const BASE_URL_API_AUTH = `${BASE_URL_API}/oauth/token?`;
const BASE_URL_VIDEO = `${BASE_URL}/video`;
const BASE_URL_METADATA = `${BASE_URL}/player/metadata/video`;

const USER_AGENT = '"Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36"'

// Those are used even for not logged users to make requests on the graphql api.
//TODO: check how to get them dynamically
const CLIENT_ID = 'f1a362d288c1b98099c7';
const CLIENT_SECRET = 'eea605b96e01c796ff369935357eca920c5da4c5';

var config = {};
var _settings = {};

const X_DM_AppInfo_Id = "com.dailymotion.neon"
const X_DM_AppInfo_Type = "website"
const X_DM_AppInfo_Version = "v2024-05-16T12:17:57.363Z" //TODO check how to get this dynamically
const X_DM_Neon_SSR = "0"
const X_DM_Preferred_Country = "";//TODO check how to get this from Grayjay

// const Accept_Language = "en-GB,en;q=0.5"

const PLATFORM = "Dailymotion";
const PLATFORM_CLAIMTYPE = 3;

let AUTHORIZATION_TOKEN;



source.setSettings = function (settings) {
	_settings = settings;
}

//Source Methods
source.enable = function (conf, settings, saveStateStr) {

	config = conf ?? {};
	_settings = settings ?? {};

	http.GET(BASE_URL, {}, true);

	AUTHORIZATION_TOKEN = getToken();

	//log(config);
}


source.getHome = function () {

	return getVideoPager({
		sort: "best"
	}, 0);
};

source.searchSuggestions = function (query) {
	const gqlQuery = `
	query AUTOCOMPLETE_QUERY($query: String!) {
		search {
		  id
		  suggestedVideos: autosuggestions(
			query: {eq: $query}
			filter: {story: {eq: VIDEO}}
		  ) {
			edges {
			  node {
				name
			  }
			}
		  }
		}
	  }`;

	const variables = {
		"query": query
	}

	try {
		const jsonResponse = executeGqlQuery({
			operationName: 'AUTOCOMPLETE_QUERY',
			variables: variables,
			query: gqlQuery
		}, true);

		return jsonResponse?.data?.search?.suggestedVideos?.edges?.map(edge => edge?.node?.name);
	} catch (error) {
		log('Failed to get search suggestions', error);
		return [];
	}
};


source.getSearchCapabilities = () => {
	return { types: [Type.Feed.Mixed], sorts: [], filters: [] }
}


source.search = function (query, type, order, filters) {
	return getSearchPagerAll({ q: query, page: 1 });
}

source.getSearchChannelContentsCapabilities = function () {

};
source.searchChannelContents = function (channelUrl, query, type, order, filters) {

};

source.searchChannels = function (query) {
	return getSearchChannelPager({ q: query, page: 1 })
}

//Channel
source.isChannelUrl = function (url) {
	return isUsernameUrl(url);
};

source.getChannel = function (url) {

	const channel_name = getChannelNameFromUrl(url);

	const query = `
	fragment CHANNEL_MAIN_FRAGMENT on Channel {
		id
		xid
		name
		displayName
		description
		accountType
		isArtist
		avatar(height: SQUARE_120) {
		  id
		  url
		  __typename
		}
		coverURL1024x: coverURL(size: "1024x")
		coverURL1920x: coverURL(size: "1920x")
		isFollowed
		tagline
		country {
		  id
		  codeAlpha2
		  __typename
		}
		metrics {
		  engagement {
			followers {
			  edges {
				node {
				  total
				  __typename
				}
				__typename
			  }
			  __typename
			}
			followings {
			  edges {
				node {
				  total
				  __typename
				}
				__typename
			  }
			  __typename
			}
			__typename
		  }
		  __typename
		}
		stats {
		  id
		  views {
			id
			total
			__typename
		  }
		  videos {
			id
			total
			__typename
		  }
		  __typename
		}
		externalLinks {
		  id
		  facebookURL
		  twitterURL
		  websiteURL
		  instagramURL
		  pinterestURL
		  __typename
		}
		__typename
	  }
	  
	  query CHANNEL_QUERY_DESKTOP($channel_name: String!) {
		channel(name: $channel_name) {
		  id
		  ...CHANNEL_MAIN_FRAGMENT
		  __typename
		}
	  }
	  
	`


	const channelDetails = executeGqlQuery(
		{
			operationName: 'CHANNEL_QUERY_DESKTOP',
			variables: { "channel_name": channel_name },
			query
		}
		, true);

	const user = channelDetails.data.channel;

	const banner = user?.coverURL1024x ?? user?.coverURL1920x;

	return new PlatformChannel({
		id: new PlatformID(PLATFORM, user?.id, config?.id, PLATFORM_CLAIMTYPE),
		name: user?.displayName,
		thumbnail: user?.avatar?.url,
		banner,

		subscribers: user?.metrics?.engagement?.followers?.edges[0]?.node?.total,
		description: user?.description,
		url,
		links: [],
	})

};

source.getChannelContents = function (url) {
	return getChannelPager({ url, page_size: 20, page: 1 })
}


//Video
source.isContentDetailsUrl = function (url) {
	return url.startsWith(BASE_URL_VIDEO);
};

source.getContentDetails = function (url) {
	return getSavedVideo(url);
};


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


function objectToUrlEncodedString(obj) {
	// Create an array to hold the encoded key-value pairs
	const encodedParams = [];

	// Iterate over the object's keys
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			// Encode the key and the value, and join them with '='
			const encodedKey = encodeURIComponent(key);
			const encodedValue = encodeURIComponent(obj[key]);
			encodedParams.push(`${encodedKey}=${encodedValue}`);
		}
	}

	// Join all the encoded key-value pairs with '&' and return the result
	return encodedParams.join('&');
}

function getToken() {

	var body = objectToUrlEncodedString({
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		grant_type: 'client_credentials'
	})

	const res = http.POST(`${BASE_URL_API_AUTH}?`, body, {
		'User-Agent': USER_AGENT,
		// 'Accept-Language': Accept_Language,
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
	}, true)

	if (res.code != 200) {
		console.error('Failed to get token', res);
		throw new ScriptException("Failed to get token", res);
	}

	const json = JSON.parse(res.body);

	return `${json.token_type} ${json.access_token}`;
}

function getPreferredCountry() {
	log('preferred country: ' + _settings?.preferredCountry)
	const countryName = countryNames[_settings?.preferredCountry];
	log('countryName: ' + countryName)
	const code = countryNamesToCode[countryName];
	log('code:' + code)
	const preferredCountry = (code || X_DM_Preferred_Country || '').toLowerCase();
	return preferredCountry;
}

function getVideoPager(params, page) {

	const count = 20;
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

	const gqlQuery = "fragment SEARCH_DISCOVERY_VIDEO_FRAGMENT on Video {\n  id\n  xid\n  title\n  isPublished\n  embedURL\n  thumbnailx240: thumbnailURL(size: \"x240\")\n  createdAt\n  channel {\n    id\n    xid\n    name\n    displayName\n    logoURLx25: logoURL(size: \"x25\")\n    accountType\n    isFollowed\n    __typename\n  }\n  duration\n  aspectRatio\n  __typename\n}\n\nquery SEACH_DISCOVERY_QUERY($shouldQueryPromotedHashtag: Boolean!) {\n  home: views {\n    id\n    neon {\n      id\n      sections(space: \"home\") {\n        edges {\n          node {\n            id\n            name\n            title\n            description\n            components {\n              edges {\n                node {\n                  __typename\n                  ... on Media {\n                    __typename\n                    ...SEARCH_DISCOVERY_VIDEO_FRAGMENT\n                  }\n                }\n                __typename\n              }\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  featuredContent {\n    id\n    channels(first: 10) {\n      edges {\n        node {\n          id\n          xid\n          displayName\n          name\n          accountType\n          logoURL(size: \"x120\")\n          isFollowed\n          stats {\n            id\n            followers {\n              id\n              total\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  conversations(\n    filter: {story: {eq: HASHTAG}, algorithm: {eq: SPONSORED}}\n    first: 1\n  ) @include(if: $shouldQueryPromotedHashtag) {\n    edges {\n      node {\n        id\n        story {\n          ... on Hashtag {\n            id\n            name\n            __typename\n          }\n          __typename\n        }\n        dailymotionAd {\n          id\n          channel {\n            id\n            name\n            avatar(height: SQUARE_120) {\n              id\n              url\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n";

	let obj;

	try {
		obj = executeGqlQuery(
			{
				operationName: 'SEACH_DISCOVERY_QUERY',
				variables: { "shouldQueryPromotedHashtag": false },
				query: gqlQuery,
				headers: headersToAdd
			}, true);

	} catch (error) {
		return new VideoPager([], false);
	}

	var results = obj?.data?.home?.neon?.sections?.edges[0]?.node?.components?.edges
		?.filter(edge => edge?.node?.__typename === 'Video')
		?.map(edge => {

			const v = edge.node;

			return ToPlatformVideo({
				id: v.id,
				name: v.title ?? "",
				thumbnail: v.thumbnailx240,
				createdAt: v.createdAt,
				creatorId: v?.channel?.id,
				creatorName: v?.channel?.name,
				creatorDisplayName: v.channel?.displayName,
				creatorAvatar: v?.channel?.logoURLx25,
				creatorUrl: `${BASE_URL}/${v.channel?.name}`,
				duration: v.duration,
				viewCount: 0,
				url: `${BASE_URL_VIDEO}/${v.xid}`,
				isLive: false,
				description: v?.description ?? '',
			});

		})


	return new SearchPagerAll(results, obj.total > (start + count), params, page);
}


function getChannelPager(context) {

	const url = context.url;

	const channel_name = getChannelNameFromUrl(url);

	const query = `
	query CHANNEL_VIDEOS_QUERY($channel_name: String!, $first: Int!, $sort: String, $page: Int!, $allowExplicit: Boolean) {
		channel(name: $channel_name) {
		  id
		  xid
		  channel_videos_all_videos: videos(
			sort: $sort
			page: $page
			first: $first
			allowExplicit: $allowExplicit
		  ) {
			pageInfo {
			  hasNextPage
			  nextPage
			  __typename
			}
			edges {
			  node {
				id
				xid
				title
				thumbnailx60: thumbnailURL(size: "x60")
				thumbnailx120: thumbnailURL(size: "x120")
				thumbnailx240: thumbnailURL(size: "x240")
				thumbnailx720: thumbnailURL(size: "x720")
				bestAvailableQuality
				duration
				createdAt
				creator {
					id
					name
					displayName
					avatar(height:SQUARE_480) {
						url
					}
					
				}
				metrics {
					engagement {
						likes {
							totalCount
						}
					}
				}
						  
				__typename
			  }
			  __typename
			}
			__typename
		  }
		  __typename
		}
	  }
		
	  
	`

	const json = executeGqlQuery(
		{
			operationName: 'CHANNEL_VIDEOS_QUERY',
			variables: {
				"channel_name": channel_name,
				"sort": "recent",
				"page": context.page ?? 1,
				"allowExplicit": true,
				"first": context.page_size ?? 30
			},
			query
		}, true);

	const edges = json?.data?.channel?.channel_videos_all_videos?.edges ?? [];

	let videos = edges.map((edge) => {

		const thumbnail =
			edge?.node?.thumbnailx720 ??
			edge?.node?.thumbnailx240 ??
			edge?.node?.thumbnailx120 ??
			edge?.node?.thumbnailx60;

		return ToPlatformVideo({
			id: edge.node.id,
			name: edge.node.title,
			thumbnail: thumbnail,
			createdAt: edge.node.createdAt,
			creatorId: edge?.node?.creator?.id,
			creatorDisplayName: edge?.node?.creator?.displayName,
			creatorName: edge.node.creator.name,
			creatorAvatar: edge?.node?.creator?.avatar?.url,
			creatorUrl: `${BASE_URL_VIDEO}/${edge.node.xid}`,
			duration: edge.node.duration,
			url: `${BASE_URL_VIDEO}/${edge.node.xid}`,
			viewCount: edge.node.metrics.engagement.likes.totalCount,
			isLive: false
		});

	})

	// if (context.cursor === null) {
	// 	// get the currently live stream
	// 	try {
	// 		const current_stream = getLiveVideo(BASE_URL + login, false)
	// 		// remove first video
	// 		videos = videos.slice(1)
	// 		videos.unshift(current_stream)
	// 	} catch (e) {
	// 		log(e)
	// 	}
	// }

	if (edges.length > 0) {
		context.page++;
	}

	return new ChannelVideoPager(context, videos, json?.data?.channel?.channel_videos_all_videos?.pageInfo?.hasNextPage);
}

function ToPlatformVideo(resource) {

	const opts = {
		id: new PlatformID(PLATFORM, resource.id, config.id),
		name: resource.name,
		thumbnails: new Thumbnails([new Thumbnail(resource.thumbnail, 0)]),
		author: new PlatformAuthorLink(
			new PlatformID(PLATFORM, resource.creatorId, config.id, PLATFORM_CLAIMTYPE),
			resource.creatorDisplayName,
			resource.creatorUrl,
			resource.creatorAvatar ?? "",
		),
		uploadDate: parseInt(new Date(resource.createdAt).getTime() / 1000),
		url: resource.url,
		duration: resource.duration,
		viewCount: resource.viewCount,
		isLive: resource.isLive,
		description: resource.description || '',
		// video: resource.video || null,
	};

	if (resource.video) {
		opts.video = resource.video;
	}

	return new PlatformVideo(opts)

}


function getSearchPagerAll(context) {

	const gqlQuery = `
	fragment VIDEO_BASE_FRAGMENT on Video {
		id
		xid
		title
		createdAt
		stats {
			id
			views {
				id
				total
				__typename
			}
			__typename
		}
		channel {
			id
			xid
			name
			displayName
			accountType
			description
			avatar (height:SQUARE_480) {
				url
			}
			__typename
			
		}
		duration
		thumbnailx60: thumbnailURL(size: "x60")
		thumbnailx120: thumbnailURL(size: "x120")
		thumbnailx240: thumbnailURL(size: "x240")
		thumbnailx720: thumbnailURL(size: "x720")
		aspectRatio
		__typename
	}
	
	fragment VIDEO_FAVORITES_FRAGMENT on Media {
		__typename
		... on Video {
			id
			viewerEngagement {
				id
				favorited
				__typename
			}
			__typename
		}
		... on Live {
			id
			viewerEngagement {
				id
				favorited
				__typename
			}
			__typename
		}
	}
	
	fragment CHANNEL_BASE_FRAG on Channel {
		accountType
		id
		xid
		name
		displayName
		isFollowed
		description
		thumbnailx60: logoURL(size: "x60")
		thumbnailx120: logoURL(size: "x120")
		thumbnailx240: logoURL(size: "x240")
		thumbnailx720: logoURL(size: "x720")
		__typename
	}
	
	fragment PLAYLIST_BASE_FRAG on Collection {
		id
		xid
		name
		channel {
			id
			xid
			name
			displayName
			accountType
			__typename
		}
		description
		thumbnailx60: thumbnailURL(size: "x60")
		thumbnailx120: thumbnailURL(size: "x120")
		thumbnailx240: thumbnailURL(size: "x240")
		thumbnailx720: thumbnailURL(size: "x720")
		stats {
			id
			videos {
				id
				total
				__typename
			}
			__typename
		}
		__typename
	}
	
	fragment TOPIC_BASE_FRAG on Topic {
		id
		xid
		name
		videos(sort: "recent", first: 5) {
			pageInfo {
				hasNextPage
				nextPage
				__typename
			}
			edges {
				node {
					id
					...VIDEO_BASE_FRAGMENT
					...VIDEO_FAVORITES_FRAGMENT
					__typename
				}
				__typename
			}
			__typename
		}
		stats {
			id
			videos {
				id
				total
				__typename
			}
			__typename
		}
		__typename
	}
	
	query SEARCH_QUERY(
		$query: String!
		$shouldIncludeVideos: Boolean!
		$shouldIncludeChannels: Boolean!
		$shouldIncludePlaylists: Boolean!
		$shouldIncludeTopics: Boolean!
		$shouldIncludeLives: Boolean!
		$page: Int
		$limit: Int
		$sortByVideos: SearchVideoSort
		$durationMinVideos: Int
		$durationMaxVideos: Int
		$createdAfterVideos: DateTime
	) {
		search {
			id
			videos(
				query: $query
				first: $limit
				page: $page
				sort: $sortByVideos
				durationMin: $durationMinVideos
				durationMax: $durationMaxVideos
				createdAfter: $createdAfterVideos
			) @include(if: $shouldIncludeVideos) {
				metadata {
					id
					algorithm {
						uuid
						__typename
					}
					__typename
				}
				pageInfo {
					hasNextPage
					nextPage
					__typename
				}
				totalCount
				edges {
					node {
						id
						...VIDEO_BASE_FRAGMENT
						...VIDEO_FAVORITES_FRAGMENT
						__typename
					}
					__typename
				}
				__typename
			}
			lives(query: $query, first: $limit, page: $page)
				@include(if: $shouldIncludeLives) {
				metadata {
					id
					algorithm {
						uuid
						__typename
					}
					__typename
				}
				pageInfo {
					hasNextPage
					nextPage
					__typename
				}
				totalCount
				edges {
					node {
						id
						xid
						title
						thumbnail: thumbnailURL(size: "x240")
						thumbnailx60: thumbnailURL(size: "x60")
						thumbnailx120: thumbnailURL(size: "x120")
						thumbnailx240: thumbnailURL(size: "x240")
						thumbnailx720: thumbnailURL(size: "x720")
						audienceCount
						aspectRatio
						isOnAir
						channel {
							id
							xid
							name
							displayName
							accountType
							__typename
						}
						__typename
					}
					__typename
				}
				__typename
			}
			channels(query: $query, first: $limit, page: $page)
				@include(if: $shouldIncludeChannels) {
				metadata {
					id
					algorithm {
						uuid
						__typename
					}
					__typename
				}
				pageInfo {
					hasNextPage
					nextPage
					__typename
				}
				totalCount
				edges {
					node {
						id
						...CHANNEL_BASE_FRAG
						__typename
					}
					__typename
				}
				__typename
			}
			playlists: collections(query: $query, first: $limit, page: $page)
				@include(if: $shouldIncludePlaylists) {
				metadata {
					id
					algorithm {
						uuid
						__typename
					}
					__typename
				}
				pageInfo {
					hasNextPage
					nextPage
					__typename
				}
				totalCount
				edges {
					node {
						id
						...PLAYLIST_BASE_FRAG
						__typename
					}
					__typename
				}
				__typename
			}
			topics(query: $query, first: $limit, page: $page)
				@include(if: $shouldIncludeTopics) {
				metadata {
					id
					algorithm {
						uuid
						__typename
					}
					__typename
				}
				pageInfo {
					hasNextPage
					nextPage
					__typename
				}
				totalCount
				edges {
					node {
						id
						...TOPIC_BASE_FRAG
						__typename
					}
					__typename
				}
				__typename
			}
			__typename
		}
	}
	`;

	const variables = {
		"query": context.q,
		// "sortByVideos": "RECENT",
		"shouldIncludeChannels": false,
		"shouldIncludePlaylists": false,
		"shouldIncludeTopics": false,
		"shouldIncludeVideos": true,
		"shouldIncludeLives": false,
		"page": context.page ?? 1,
		"limit": 20
	}

	const jsonResponse = executeGqlQuery({
		operationName: 'SEARCH_QUERY',
		variables: variables,
		query: gqlQuery,
		headers: undefined
	}, true);

	const results = []

	for (const edge of jsonResponse.data.search.videos.edges) {

		const sv = edge.node;

		const thumbnail =
			sv.thumbnailx720 ??
			sv.thumbnailx240 ??
			sv.thumbnailx120 ??
			sv.thumbnailx60 ??
			sv.thumbnail ?? "";


		var video = ToPlatformVideo({
			id: sv.id,
			name: sv.title,
			thumbnail: thumbnail,
			createdAt: sv.createdAt,
			creatorId: sv.channel.id,
			creatorName: sv.channel.name,
			creatorDisplayName: sv.channel.displayName,
			creatorUrl: `${BASE_URL}/${sv.channel.name}`,
			creatorAvatar: sv.channel?.avatar?.url ?? "",
			duration: sv.duration,
			viewCount: sv.stats.views.total,
			url: `${BASE_URL_VIDEO}/${sv.xid}`,
			isLive: false,
			description: sv?.description ?? '',
		});

		results.push(video)
	}

	//results, hasMore, path, params, page
	var params = {
		query: context.q,
	}
	return new SearchPagerAll(results, jsonResponse.data.search.videos.pageInfo.hasNextPage, params, context.page);
}

function executeGqlQuery(opts, addAuthorization) {

	const headersToAdd = opts.headers || {
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

	if (addAuthorization) {
		headersToAdd.Authorization = getToken();
	}

	const gql = JSON.stringify({
		operationName: opts.operationName,
		variables: opts.variables,
		query: opts.query,
	});

	const res = http.POST(BASE_URL_API, gql, headersToAdd);

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
		throw new UnavailableException('This content is restricted to subscribers')
	}
}

function getSavedVideo(url) {

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

	var player_metadataResponse = http.GET(player_metadata_url, headers1);

	if (!player_metadataResponse.isOk) {
		throw new UnavailableException('Unable to get player metadata');
	}

	var player_metadata = JSON.parse(player_metadataResponse.body);

	const hls_url = player_metadata.qualities.auto[0].url;

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
		"Cache-Control": "no-cache",
		"Authorization": AUTHORIZATION_TOKEN
	};

	const videoDetailsGqlQuery = `
	fragment VIDEO_FRAGMENT on Video {
		id
		xid
		isPublished
		duration
		title
		description
		thumbnailx60: thumbnailURL(size: "x60")
		thumbnailx120: thumbnailURL(size: "x120")
		thumbnailx240: thumbnailURL(size: "x240")
		thumbnailx360: thumbnailURL(size: "x360")
		thumbnailx480: thumbnailURL(size: "x480")
		thumbnailx720: thumbnailURL(size: "x720")
		thumbnailx1080: thumbnailURL(size: "x1080")
		category
		bestAvailableQuality
		createdAt
		viewerEngagement {
			id
			liked
			favorited
			__typename
		}
		isPrivate
		isWatched
		isCreatedForKids
		isExplicit
		canDisplayAds
		videoWidth: width
		videoHeight: height
		status
		hashtags {
			edges {
				node {
					id
					name
					__typename
				}
				__typename
			}
			__typename
		}
		stats {
			id
			views {
				id
				total
				__typename
			}
			__typename
		}
		channel {
			__typename
			id
			xid
			name
			displayName
			isArtist
			logoURLx25: logoURL(size: "x25")
			logoURL(size: "x60")
			isFollowed
			accountType
			coverURLx375: coverURL(size: "x375")
			stats {
				id
				views {
					id
					total
					__typename
				}
				followers {
					id
					total
					__typename
				}
				videos {
					id
					total
					__typename
				}
				__typename
			}
			country {
				id
				codeAlpha2
				__typename
			}
			organization @skip(if: $isSEO) {
				id
				xid
				owner {
					id
					xid
					__typename
				}
				__typename
			}
		}
		language {
			id
			codeAlpha2
			__typename
		}
		tags {
			edges {
				node {
					id
					label
					__typename
				}
				__typename
			}
			__typename
		}
		moderation {
			id
			reviewedAt
			__typename
		}
		topics(whitelistedOnly: true, first: 3, page: 1) {
			edges {
				node {
					id
					xid
					name
					names {
						edges {
							node {
								id
								name
								language {
									id
									codeAlpha2
									__typename
								}
								__typename
							}
							__typename
						}
						__typename
					}
					__typename
				}
				__typename
			}
			__typename
		}
		geoblockedCountries {
			id
			allowed
			denied
			__typename
		}
		__typename
	}
	
	fragment LIVE_FRAGMENT on Live {
		id
		xid
		startAt
		endAt
		isPublished
		title
		description
		thumbnailx60: thumbnailURL(size: "x60")
		thumbnailx120: thumbnailURL(size: "x120")
		thumbnailx240: thumbnailURL(size: "x240")
		thumbnailx360: thumbnailURL(size: "x360")
		thumbnailx480: thumbnailURL(size: "x480")
		thumbnailx720: thumbnailURL(size: "x720")
		thumbnailx1080: thumbnailURL(size: "x1080")
		category
		createdAt
		viewerEngagement {
			id
			liked
			favorited
			__typename
		}
		isPrivate
		isExplicit
		isCreatedForKids
		bestAvailableQuality
		canDisplayAds
		videoWidth: width
		videoHeight: height
		stats {
			id
			views {
				id
				total
				__typename
			}
			__typename
		}
		channel {
			__typename
			id
			xid
			name
			displayName
			isArtist
			logoURLx25: logoURL(size: "x25")
			logoURL(size: "x60")
			isFollowed
			accountType
			coverURLx375: coverURL(size: "x375")
			stats {
				id
				views {
					id
					total
					__typename
				}
				followers {
					id
					total
					__typename
				}
				videos {
					id
					total
					__typename
				}
				__typename
			}
			country {
				id
				codeAlpha2
				__typename
			}
			organization @skip(if: $isSEO) {
				id
				xid
				owner {
					id
					xid
					__typename
				}
				__typename
			}
		}
		language {
			id
			codeAlpha2
			__typename
		}
		tags {
			edges {
				node {
					id
					label
					__typename
				}
				__typename
			}
			__typename
		}
		moderation {
			id
			reviewedAt
			__typename
		}
		topics(whitelistedOnly: true, first: 3, page: 1) {
			edges {
				node {
					id
					xid
					name
					names {
						edges {
							node {
								id
								name
								language {
									id
									codeAlpha2
									__typename
								}
								__typename
							}
							__typename
						}
						__typename
					}
					__typename
				}
				__typename
			}
			__typename
		}
		geoblockedCountries {
			id
			allowed
			denied
			__typename
		}
		__typename
	}
	
	query WATCHING_VIDEO($xid: String!, $isSEO: Boolean!) {
		video: media(xid: $xid) {
			__typename
			... on Video {
				id
				...VIDEO_FRAGMENT
				__typename
			}
			... on Live {
				id
				...LIVE_FRAGMENT
				__typename
			}
		}
	}	
	`

	const videoDetailsRequestBody = JSON.stringify(
		{
			"operationName": "WATCHING_VIDEO",
			"variables": {
				"xid": id,
				"isSEO": false
			},
			"query": videoDetailsGqlQuery
		});


	const video_details_response = http.POST(BASE_URL_API, videoDetailsRequestBody, videoDetailsRequestHeaders)

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

	const thumbnail = player_metadata.thumbnailx720 ?? player_metadata.thumbnailx240 ?? player_metadata.thumbnailx120 ?? player_metadata.thumbnailx60;

	return new PlatformVideoDetails({
		id: new PlatformID(PLATFORM, id, config.id),
		name: player_metadata.title,
		thumbnails: new Thumbnails([new Thumbnail(thumbnail, 0)]),
		author: new PlatformAuthorLink(
			new PlatformID(PLATFORM, player_metadata?.owner?.id, config.id, PLATFORM_CLAIMTYPE),
			player_metadata?.owner?.screenname,
			player_metadata?.owner?.url,
			video_details?.data?.video?.channel?.logoURL ?? '',
		),
		uploadDate: player_metadata?.created_time,
		duration: player_metadata?.duration,
		viewCount: video_details?.data?.video?.stats?.views?.total,//TODO: get view count
		url: player_metadata.url,
		isLive: false,
		description: video_details?.data?.video?.description,//TODO: get description
		video: new VideoSourceDescriptor(sources),
	})
}

function getSearchChannelPager(context) {

	const gqlQuery = `		
	query SEARCH_QUERY($query: String!, $page: Int, $limit: Int) {
		search {
			id
			channels(query: $query, first: $limit, page: $page) {
				pageInfo {
					hasNextPage
					nextPage
				}
				totalCount
				edges {
					node {
						id
						accountType
						id
						xid
						name
						displayName
						isFollowed
						description
						avatar(height: SQUARE_720) {
							url
							height
							width
						}
						metrics {
							engagement {
								followers {
									edges {
										node {
											total
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	
		`

	const variables = {
		query: context.q,
		page: context.page ?? 1,
		limit: 20
	};

	const json = executeGqlQuery({
		operationName: "SEARCH_QUERY",
		variables,
		query: gqlQuery
	}, true);

	const results = json?.data?.search?.channels?.edges.map(edge => {
		const c = edge.node;
		return new PlatformChannel({
			id: new PlatformID(PLATFORM, c.id, config.id, PLATFORM_CLAIMTYPE),
			name: c.displayName,
			thumbnail: c?.avatar?.url,
			subscribers: c?.metrics?.engagement?.followers?.edges[0]?.node?.total ?? 0,
			url: `${BASE_URL}/${c.name}`,
			links: [],
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
		const opts = { q: this.context.params.query, page: this.context.page };
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


const countryNamesToCode = {
	"": "",
	"Afghanistan": "AF",
	"Aland Islands": "AX",
	"Albania": "AL",
	"Algeria": "DZ",
	"American Samoa": "AS",
	"Andorra": "AD",
	"Angola": "AO",
	"Anguilla": "AI",
	"Antarctica": "AQ",
	"Antigua and Barbuda": "AG",
	"Argentina": "AR",
	"Armenia": "AM",
	"Aruba": "AW",
	"Australia": "AU",
	"Austria": "AT",
	"Azerbaijan": "AZ",
	"Bahamas": "BS",
	"Bahrain": "BH",
	"Bangladesh": "BD",
	"Barbados": "BB",
	"Belarus": "BY",
	"Belgium": "BE",
	"Belize": "BZ",
	"Benin": "BJ",
	"Bermuda": "BM",
	"Bhutan": "BT",
	"Bolivia": "BO",
	"Bonaire, Sint Eustatius and Saba": "BQ",
	"Bosnia and Herzegovina": "BA",
	"Botswana": "BW",
	"Bouvet Island": "BV",
	"Brazil": "BR",
	"British Indian Ocean Territory": "IO",
	"Brunei Darussalam": "BN",
	"Bulgaria": "BG",
	"Burkina Faso": "BF",
	"Burundi": "BI",
	"Cambodia": "KH",
	"Cameroon": "CM",
	"Canada": "CA",
	"Cabo Verde": "CV",
	"Cayman Islands": "KY",
	"Central African Republic": "CF",
	"Chad": "TD",
	"Chile": "CL",
	"China": "CN",
	"Christmas Island": "CX",
	"Cocos (Keeling) Islands": "CC",
	"Colombia": "CO",
	"Comoros": "KM",
	"Congo": "CG",
	"Congo, Democratic Republic of the": "CD",
	"Cook Islands": "CK",
	"Costa Rica": "CR",
	"Cote d'Ivoire": "CI",
	"Croatia": "HR",
	"Cuba": "CU",
	"Curacao": "CW",
	"Cyprus": "CY",
	"Czech Republic": "CZ",
	"Denmark": "DK",
	"Djibouti": "DJ",
	"Dominica": "DM",
	"Dominican Republic": "DO",
	"Ecuador": "EC",
	"Egypt": "EG",
	"El Salvador": "SV",
	"Equatorial Guinea": "GQ",
	"Eritrea": "ER",
	"Estonia": "EE",
	"Eswatini": "SZ",
	"Ethiopia": "ET",
	"Falkland Islands (Malvinas)": "FK",
	"Faroe Islands": "FO",
	"Fiji": "FJ",
	"Finland": "FI",
	"France": "FR",
	"French Guiana": "GF",
	"French Polynesia": "PF",
	"French Southern Territories": "TF",
	"Gabon": "GA",
	"Gambia": "GM",
	"Georgia": "GE",
	"Germany": "DE",
	"Ghana": "GH",
	"Gibraltar": "GI",
	"Greece": "GR",
	"Greenland": "GL",
	"Grenada": "GD",
	"Guadeloupe": "GP",
	"Guam": "GU",
	"Guatemala": "GT",
	"Guernsey": "GG",
	"Guinea": "GN",
	"Guinea-Bissau": "GW",
	"Guyana": "GY",
	"Haiti": "HT",
	"Heard Island and McDonald Islands": "HM",
	"Holy See": "VA",
	"Honduras": "HN",
	"Hong Kong": "HK",
	"Hungary": "HU",
	"Iceland": "IS",
	"India": "IN",
	"Indonesia": "ID",
	"Iran": "IR",
	"Iraq": "IQ",
	"Ireland": "IE",
	"Isle of Man": "IM",
	"Israel": "IL",
	"Italy": "IT",
	"Jamaica": "JM",
	"Japan": "JP",
	"Jersey": "JE",
	"Jordan": "JO",
	"Kazakhstan": "KZ",
	"Kenya": "KE",
	"Kiribati": "KI",
	"Korea, Democratic People's Republic of": "KP",
	"Korea, Republic of": "KR",
	"Kuwait": "KW",
	"Kyrgyzstan": "KG",
	"Lao People's Democratic Republic": "LA",
	"Latvia": "LV",
	"Lebanon": "LB",
	"Lesotho": "LS",
	"Liberia": "LR",
	"Libya": "LY",
	"Liechtenstein": "LI",
	"Lithuania": "LT",
	"Luxembourg": "LU",
	"Macao": "MO",
	"North Macedonia": "MK",
	"Madagascar": "MG",
	"Malawi": "MW",
	"Malaysia": "MY",
	"Maldives": "MV",
	"Mali": "ML",
	"Malta": "MT",
	"Marshall Islands": "MH",
	"Martinique": "MQ",
	"Mauritania": "MR",
	"Mauritius": "MU",
	"Mayotte": "YT",
	"Mexico": "MX",
	"Micronesia, Federated States of": "FM",
	"Moldova, Republic of": "MD",
	"Monaco": "MC",
	"Mongolia": "MN",
	"Montenegro": "ME",
	"Montserrat": "MS",
	"Morocco": "MA",
	"Mozambique": "MZ",
	"Myanmar": "MM",
	"Namibia": "NA",
	"Nauru": "NR",
	"Nepal": "NP",
	"Netherlands": "NL",
	"New Caledonia": "NC",
	"New Zealand": "NZ",
	"Nicaragua": "NI",
	"Niger": "NE",
	"Nigeria": "NG",
	"Niue": "NU",
	"Norfolk Island": "NF",
	"Northern Mariana Islands": "MP",
	"Norway": "NO",
	"Oman": "OM",
	"Pakistan": "PK",
	"Palau": "PW",
	"Palestine, State of": "PS",
	"Panama": "PA",
	"Papua New Guinea": "PG",
	"Paraguay": "PY",
	"Peru": "PE",
	"Philippines": "PH",
	"Pitcairn": "PN",
	"Poland": "PL",
	"Portugal": "PT",
	"Puerto Rico": "PR",
	"Qatar": "QA",
	"Reunion": "RE",
	"Romania": "RO",
	"Russian Federation": "RU",
	"Rwanda": "RW",
	"Saint Barthelemy": "BL",
	"Saint Helena, Ascension and Tristan da Cunha": "SH",
	"Saint Kitts and Nevis": "KN",
	"Saint Lucia": "LC",
	"Saint Martin (French part)": "MF",
	"Saint Pierre and Miquelon": "PM",
	"Saint Vincent and the Grenadines": "VC",
	"Samoa": "WS",
	"San Marino": "SM",
	"Sao Tome and Principe": "ST",
	"Saudi Arabia": "SA",
	"Senegal": "SN",
	"Serbia": "RS",
	"Seychelles": "SC",
	"Sierra Leone": "SL",
	"Singapore": "SG",
	"Sint Maarten (Dutch part)": "SX",
	"Slovakia": "SK",
	"Slovenia": "SI",
	"Solomon Islands": "SB",
	"Somalia": "SO",
	"South Africa": "ZA",
	"South Georgia and the South Sandwich Islands": "GS",
	"South Sudan": "SS",
	"Spain": "ES",
	"Sri Lanka": "LK",
	"Sudan": "SD",
	"Suriname": "SR",
	"Svalbard and Jan Mayen": "SJ",
	"Sweden": "SE",
	"Switzerland": "CH",
	"Syrian Arab Republic": "SY",
	"Taiwan, Province of China": "TW",
	"Tajikistan": "TJ",
	"Tanzania, United Republic of": "TZ",
	"Thailand": "TH",
	"Timor-Leste": "TL",
	"Togo": "TG",
	"Tokelau": "TK",
	"Tonga": "TO",
	"Trinidad and Tobago": "TT",
	"Tunisia": "TN",
	"Turkey": "TR",
	"Turkmenistan": "TM",
	"Turks and Caicos Islands": "TC",
	"Tuvalu": "TV",
	"Uganda": "UG",
	"Ukraine": "UA",
	"United Arab Emirates": "AE",
	"United Kingdom of Great Britain and Northern Ireland": "GB",
	"United States of America": "US",
	"United States Minor Outlying Islands": "UM",
	"Uruguay": "UY",
	"Uzbekistan": "UZ",
	"Vanuatu": "VU",
	"Venezuela, Bolivarian Republic of": "VE",
	"Vietnam": "VN",
	"Virgin Islands, British": "VG",
	"Virgin Islands, U.S.": "VI",
	"Wallis and Futuna": "WF",
	"Western Sahara": "EH",
	"Yemen": "YE",
	"Zambia": "ZM",
	"Zimbabwe": "ZW"
}

const countryNames = Object
	.keys(countryNamesToCode)


log("LOADED");