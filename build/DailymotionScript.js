'use strict';

const BASE_URL = "https://www.dailymotion.com";
const BASE_URL_API = "https://graphql.api.dailymotion.com";
const BASE_URL_COMMENTS = "https://api-2-0.spot.im/v1.0.0/conversation/read";
const BASE_URL_COMMENTS_AUTH = "https://api-2-0.spot.im/v1.0.0/authenticate";
const BASE_URL_COMMENTS_THUMBNAILS = "https://images.spot.im/image/upload";
const BASE_URL_API_AUTH = `${BASE_URL_API}/oauth/token`;
const BASE_URL_VIDEO = `${BASE_URL}/video`;
const BASE_URL_PLAYLIST = `${BASE_URL}/playlist`;
const BASE_URL_METADATA = `${BASE_URL}/player/metadata/video`;
const USER_AGENT = 'Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.230 Mobile Safari/537.36';
// Those are used even for not logged users to make requests on the graphql api.
//TODO: check how to get them dynamically
const CLIENT_ID = 'f1a362d288c1b98099c7';
const CLIENT_SECRET = 'eea605b96e01c796ff369935357eca920c5da4c5';
const X_DM_AppInfo_Id = "com.dailymotion.neon";
const X_DM_AppInfo_Type = "website";
const X_DM_AppInfo_Version = "v2024-07-02T13:55:47.186Z"; //TODO check how to get this dynamically
const X_DM_Neon_SSR = "0";
const PLATFORM = "Dailymotion";
const PLATFORM_CLAIMTYPE = 27;
// search capabilities - upload date
const LESS_THAN_MINUTE = "LESS_THAN_MINUTE";
const ONE_TO_FIVE_MINUTES = "ONE_TO_FIVE_MINUTES";
const FIVE_TO_THIRTY_MINUTES = "FIVE_TO_THIRTY_MINUTES";
const THIRTY_TO_ONE_HOUR = "THIRTY_TO_ONE_HOUR";
const MORE_THAN_ONE_HOUR = "MORE_THAN_ONE_HOUR";
const DURATION_THRESHOLDS = {};
DURATION_THRESHOLDS[LESS_THAN_MINUTE] = { min: 0, max: 60 };
DURATION_THRESHOLDS[ONE_TO_FIVE_MINUTES] = { min: 60, max: 300 };
DURATION_THRESHOLDS[FIVE_TO_THIRTY_MINUTES] = { min: 300, max: 1800 };
DURATION_THRESHOLDS[THIRTY_TO_ONE_HOUR] = { min: 1800, max: 3600 };
DURATION_THRESHOLDS[MORE_THAN_ONE_HOUR] = { min: 3600, max: null };
/** The possible values which liked media connections can be sorted by. */
const LikedMediaSort = {
    /** Sort liked medias by most recent. */
    Recent: 'recent',
    /** Sort liked medias by most viewed. */
    Visited: 'visited'
};
// This platform uses a scale system for rating the videos.
// Ratings are grouped into positive and negative to calculate likes and dislikes.
const POSITIVE_RATINGS_LABELS = [
    "STAR_STRUCK", // amazing
    "SMILING_FACE_WITH_SUNGLASSES", // cool
    "WINKING_FACE" // interesting
];
const NEGATIVE_RATINGS_LABELS = [
    "SLEEPING_FACE", // boring
    "FISHING_POLE" // waste of time
];
const ERROR_TYPES = {
    "DM001": "No video has been specified, you need to specify one.",
    "DM002": "Content has been deleted.",
    "DM003": "Live content is not available, i.e. it may not have started yet.",
    "DM004": "Copyrighted content, access forbidden.",
    "DM005": "Content rejected (this video may have been removed due to a breach of the terms of use, a copyright claim or an infringement upon third party rights).",
    "DM006": "Publishing in progress…",
    "DM007": "Video geo-restricted by its owner.",
    "DM008": "Explicit content. Explicit content can be enabled using the plugin settings",
    "DM009": "Explicit content (offsite embed)",
    "DM010": "Private content",
    "DM011": "An encoding error occurred",
    "DM012": "Encoding in progress",
    "DM013": "This video has no preset (no video stream)",
    "DM014": "This video has not been made available on your device by its owner",
    "DM015": "Kids host error",
    "DM016": "Content not available on this website, it can only be watched on Dailymotion",
    "DM019": "This content has been uploaded by an inactive channel and its access is limited"
};
const SEARCH_CAPABILITIES = {
    types: [
        Type.Feed.Mixed
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

const AUTOCOMPLETE_QUERY = `
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
}
`;
const CHANNEL_QUERY_DESKTOP = `
query CHANNEL_QUERY_DESKTOP(
	$channel_name: String!
	$avatar_size: AvatarHeight!
) {
	channel(name: $channel_name) {
		id
		xid
		name
		displayName
		description
		avatar(height:$avatar_size) {
			url
		}
		banner(width:LANDSCAPE_1920) {
			url
		}
		tagline
		metrics {
			engagement {
				followers {
					edges {
						node {
							total
						}
					}
				}
				followings {
					edges {
						node {
							total
						}
					}
				}
			}
		}
		stats {
			id
			views {
				id
				total
			}
			videos {
				id
				total
			}
		}
		externalLinks {
			facebookURL
			twitterURL
			websiteURL
			instagramURL
			pinterestURL
		}
	}
}
`;
const SEACH_DISCOVERY_QUERY = `	
fragment SEARCH_DISCOVERY_VIDEO_FRAGMENT on Video {
	id
	xid
	title
	isPublished
	thumbnail(height:$thumbnail_resolution) {
		url
	}
	createdAt
	creator {
		id
		xid
		name
		displayName
		avatar(height:$avatar_size) {
			url
		}
	}
	duration
	viewCount
	stats {
		views {
			total
		}
	}
}

query SEACH_DISCOVERY_QUERY($avatar_size: AvatarHeight!, $thumbnail_resolution: ThumbnailHeight!) {
	home: views {
		id
		neon {
			id
			sections(space: "home") {
				edges {
					node {
						id
						name
						title
						description
						components {
							pageInfo {
								hasNextPage
							}
							edges {
								node {
									... on Media {
										...SEARCH_DISCOVERY_VIDEO_FRAGMENT
									}
								}
							}
						}
					}
				}
			}
		}
	}
}`;
const CHANNEL_VIDEOS_QUERY = `
query CHANNEL_VIDEOS_QUERY(
  $channel_name: String!
  $first: Int!
  $sort: String
  $page: Int!
  $allowExplicit: Boolean
  $avatar_size: AvatarHeight!
  $thumbnail_resolution: ThumbnailHeight!
  $shouldLoadLives: Boolean!
  $shouldLoadVideos: Boolean!
) {
  channel(name: $channel_name) {
    id
    xid
    lives(
      page: $page
      first: $first
      allowExplicit: $allowExplicit
    ) @include(if: $shouldLoadLives) {
      pageInfo {
        hasNextPage
        nextPage
      }
      totalCount
      edges {
        node {
          id
          xid
          title
          thumbnail(height: $thumbnail_resolution) {
            url
          }
          description
          metrics {
            engagement {
              audience {
                totalCount
              }
            }
          }
          audienceCount
          isOnAir
          stats {
            views {
              total
            }
          }
          creator {
            id
            xid
            name
            displayName
            avatar(height: $avatar_size) {
              url
            }
          }
        }
      }
    }
    videos(
      page: $page
      first: $first
      allowExplicit: $allowExplicit
      sort: $sort
    ) @include(if: $shouldLoadVideos) {
      pageInfo {
        hasNextPage
        nextPage
      }
      edges {
        node {
          id
          xid
          title
          thumbnail(height: $thumbnail_resolution) {
            url
          }
          bestAvailableQuality
          duration
          createdAt
          creator {
            id
            name
            displayName
            avatar(height: $avatar_size) {
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
          viewCount
          stats {
            views {
              total
            }
          }
        }
      }
    }
  }
}`;
const SEARCH_QUERY = ` 
fragment VIDEO_BASE_FRAGMENT on Video {
	id
	xid
	title
	createdAt
	metrics {
		engagement {
			likes {
				edges {
					node {
						rating
						total
					}
				}
			}
		}
	}
	stats {
		id
		views {
			id
			total
		}
	}
	creator {
		id
		xid
		name
		displayName
		description
		avatar(height:$avatar_size) {
			url
		}
	}
	duration
	thumbnail(height:$thumbnail_resolution) {
		url
	}
	
}

fragment VIDEO_FAVORITES_FRAGMENT on Media {
	... on Video {
		id
		viewerEngagement {
			id
			favorited
		}
	}
	... on Live {
		id
		viewerEngagement {
			id
			favorited
		}
	}
}

fragment CHANNEL_BASE_FRAG on Channel {
	id
	xid
	name
	displayName
	description
	avatar(height:$avatar_size) {
		url
	}
}

fragment PLAYLIST_BASE_FRAG on Collection {
	id
	xid
	name
	description
	thumbnail(height:$thumbnail_resolution) {
		url
	}
	creator {
		id
		xid
		name
		displayName
		avatar(height:$avatar_size) {
			url
		}
	}
	description
	stats {
		id
		videos {
			id
			total
		}
	}
	metrics {
		engagement {
			videos {
				edges {
					node {
						total
					}
				}
			}
		}
	}
}

query SEARCH_QUERY(
	$query: String!
	$shouldIncludeVideos: Boolean!
	$shouldIncludeChannels: Boolean!
	$shouldIncludePlaylists: Boolean!
	$shouldIncludeLives: Boolean!
	$page: Int
	$limit: Int
	$sortByVideos: SearchVideoSort
	$durationMinVideos: Int
	$durationMaxVideos: Int
	$createdAfterVideos: DateTime
	$avatar_size: AvatarHeight!
	$thumbnail_resolution: ThumbnailHeight!
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
			pageInfo {
				hasNextPage
				nextPage
			}
			totalCount
			edges {
				node {
					id
					...VIDEO_BASE_FRAGMENT
					...VIDEO_FAVORITES_FRAGMENT
				}
			}
		}
		lives(query: $query, first: $limit, page: $page)
			@include(if: $shouldIncludeLives) {
			pageInfo {
				hasNextPage
				nextPage
			}
			totalCount
			edges {
				node {
					id
					xid
					title
					thumbnail(height:$thumbnail_resolution) {
						url
					}
					description
					metrics {
						engagement {
							audience {
								totalCount
							}
						}
					}
					audienceCount
					isOnAir
					creator {
						id
						xid
						name
						displayName
						avatar(height:$avatar_size){
							url
						}
					}
				}
			}
		}
		channels(query: $query, first: $limit, page: $page)
			@include(if: $shouldIncludeChannels) {
			pageInfo {
				hasNextPage
				nextPage
			}
			totalCount
			edges {
				node {
					id
					...CHANNEL_BASE_FRAG
				}
			}
		}
		playlists: collections(query: $query, first: $limit, page: $page)
			@include(if: $shouldIncludePlaylists) {
			pageInfo {
				hasNextPage
				nextPage
			}
			totalCount
			edges {
				node {
					id
					...PLAYLIST_BASE_FRAG
				}
			}
		}
	}
}`;
const WATCHING_VIDEO = `
fragment VIDEO_FRAGMENT on Video {
	id
	xid
	isPublished
	duration
	title
	description
	thumbnail(height:$thumbnail_resolution) {
		url
	}
	bestAvailableQuality
	createdAt
	isPrivate
	isCreatedForKids
	isExplicit
	videoWidth: width
	videoHeight: height
	status
	metrics {
		engagement {
			likes {
				totalCount
				edges {
					node {
						rating
						total
					}
				}
			}
		}
	}
	stats {
		id
		views {
			id
			total
		}
	}
	creator {
		id
		xid
		name
		displayName
		avatar(height:$avatar_size) {
			url
			height
			width
		}
		metrics {
			engagement {
				followers {
					totalCount
					edges {
						node {
							total
						}
					}
				}
			}
		}
		stats {
			id
			views {
				id
				total
			}
			followers {
				id
				total
			}
			videos {
				id
				total
			}
		}
	}
}

fragment LIVE_FRAGMENT on Live {
	id
	xid
	startAt
	endAt
	isPublished
	title
	description
	audienceCount
	isOnAir
	thumbnail(height:$thumbnail_resolution){
		url
		height
		width
	}
	category
	createdAt
	isPrivate
	isExplicit
	isCreatedForKids
	bestAvailableQuality
	canDisplayAds
	videoWidth: width
	videoHeight: height
	metrics {
		engagement {
			likes {
				edges {
					node {
						rating
						total
					}
				}
			}
		}
	}
	stats {
		id
		views {
			id
			total
		}
	}
	creator {
		id
		xid
		name
		displayName
		avatar(height:$avatar_size) {
			url
			height
			width
		}
		coverURLx375: coverURL(size: "x375")
		stats {
			id
			views {
				id
				total
			}
			followers {
				id
				total
			}
			videos {
				id
				total
			}
		}
		country {
			id
			codeAlpha2
		}
	}
	language {
		id
		codeAlpha2
	}
	tags {
		edges {
			node {
				id
				label
			}
		}
	}
	geoblockedCountries {
		id
		allowed
		denied
	}
}

query WATCHING_VIDEO(
	$xid: String!
	$avatar_size: AvatarHeight!
	$thumbnail_resolution: ThumbnailHeight!
) {
	video: media(xid: $xid) {
		... on Video {
			id
			...VIDEO_FRAGMENT
		}
		... on Live {
			id
			...LIVE_FRAGMENT
		}
	}
}`;
const SEARCH_CHANNEL = `		
query SEARCH_QUERY($query: String!, $page: Int, $limit: Int, $avatar_size: AvatarHeight!) {
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
					id
					xid
					name
					displayName
					description
					avatar(height:$avatar_size) {
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
}`;
const PLAYLIST_DETAILS_QUERY = `
query PLAYLIST_VIDEO_QUERY($xid: String!, $numberOfVideos: Int = 100, $avatar_size: AvatarHeight!, $thumbnail_resolution: ThumbnailHeight!) {
	collection(xid: $xid) {
		id
		id
		xid
		updatedAt
		name
		thumbnail(height:$thumbnail_resolution) {
			url
		}
		creator {
			id
			name
			displayName
			xid
			avatar(height:$avatar_size) {
				url
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
		metrics {
			engagement {
				videos {
					edges {
						node {
							total
						}
					}
				}
			}
		}
		videos(first: $numberOfVideos) {
			edges {
				node {
					id
					xid
					duration
					title
					description
					url
					createdAt
					thumbnail(height:$thumbnail_resolution) {
						url
					}
					creator {
						id
						name
						displayName
						xid
						avatar(height:$avatar_size) {
							url
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
}`;
const GET_USER_SUBSCRIPTIONS = `
query SUBSCRIPTIONS_QUERY($first: Int, $page: Int) {
	me {
		channel {
			followings(first: $first, page: $page) {
				totalCount
				edges {
					node {
						creator {
							name
						}
					}
				}
			}
		}
	}
}`;
const GET_CHANNEL_PLAYLISTS_XID = `
query CHANNEL_PLAYLISTS_QUERY(
	$channel_name: String!
	$sort: String
	$page: Int!
	$first: Int!
) {
	channel(name: $channel_name) {
		collections(
			sort: $sort
			page: $page
			first: $first
		) {
			pageInfo {
				hasNextPage
				nextPage
			}
			edges {
				node {
					xid
						}
					}
				}
			}
}`;
const SUBSCRIPTIONS_QUERY = `
query SUBSCRIPTIONS_QUERY {
	me {
		xid
		channel {
			name
		}
	}
}
`;
const CHANNEL_PLAYLISTS_QUERY = `
query CHANNEL_PLAYLISTS_QUERY(
	$channel_name: String!
	$sort: String
	$page: Int!
	$first: Int!
	$avatar_size: AvatarHeight!, 
	$thumbnail_resolution: ThumbnailHeight!
) {
	channel(name: $channel_name) {
		id
		xid
		collections(sort: $sort, page: $page, first: $first) {
			pageInfo {
				hasNextPage
				nextPage
			}
			edges {
				node {
					id
					xid
					updatedAt
					createdAt
					name
					description
					metrics {
						engagement {
							videos {
								edges {
									node {
										total
									}
								}
								totalCount
							}
						}
					}
					thumbnail(height:$thumbnail_resolution) {
						url
					}
					stats {
						id
						videos {
							id
							total
						}
					}
					videos {
						edges {
							node {
								createdAt
								creator {
									id
									name
									xid
									avatar(height:$avatar_size) {
										url
									}
									displayName
								}
							}
						}
					}
				}
			}
		}
	}
}

`;
const USER_LIKED_VIDEOS_QUERY = `
query USER_LIKED_VIDEOS_QUERY($page: Int!, $thumbnail_resolution: ThumbnailHeight!) {
	me {
		id
		likedMedias(first: 100, page: $page) {
			edges {
				node {
					... on Video {
						id
						xid
						title
						duration
						thumbnail(height:$thumbnail_resolution) {
							url
						}
						aspectRatio
						viewerEngagement {
							id
							liked
						}
						channel {
							id
							logoURLx25: logoURL(size: "x25")
							displayName
							accountType	
						}
					}
					... on Live {
						
						id
						xid
						title
						isOnAir
						thumbnail(height:$thumbnail_resolution) {
							url
						}
						viewerEngagement {
							id
							liked
						}
						channel {
							id
							logoURLx25: logoURL(size: "x25")
							displayName
							accountType
						}
					}
				}
			}
			pageInfo {
				hasNextPage
				nextPage
			}
		}
	}
}`;
const USER_WATCH_LATER_VIDEOS_QUERY = `
	query USER_WATCH_LATER_VIDEOS_QUERY($page: Int!, $thumbnail_resolution: ThumbnailHeight!) {
	me {
		id
		watchLaterMedias(first: 100, page: $page) {
			edges {
				node {
					... on Video {
						id
						xid
						title
						duration
						thumbnail(height:$thumbnail_resolution) {
							url
						}
						aspectRatio
						channel {
							id
							logoURLx25: logoURL(size: "x25")
							displayName
							accountType
						}
						viewerEngagement {
							id
							favorited
						}
					}
					... on Live {
						id
						xid
						title
						isOnAir
						thumbnail(height:$thumbnail_resolution) {
							url
						}
						channel {
							id
							logoURLx25: logoURL(size: "x25")
							displayName
							accountType
						}
						viewerEngagement {
							id
							favorited
						}
					}
				}
			}
			pageInfo {
				hasNextPage
				nextPage
			}
		}
	}
}`;
const USER_WATCHED_VIDEOS_QUERY = `
	query USER_WATCHED_VIDEOS_QUERY($page: Int!, $thumbnail_resolution: ThumbnailHeight!) {
	me {
		id
		watchedVideos(first: 100, page: $page) {
			edges {
				node {
					id
					xid
					title
					duration
					thumbnail(height:$thumbnail_resolution) {
						url
					}
					aspectRatio
					channel {
						id
						logoURLx25: logoURL(size: "x25")
						displayName
						accountType
					}
				}
			}
			pageInfo {
				hasNextPage
				nextPage
			}
		}
	}
}`;

const objectToUrlEncodedString = (obj) => {
    const encodedParams = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(obj[key]);
            encodedParams.push(`${encodedKey}=${encodedValue}`);
        }
    }
    return encodedParams.join('&');
};
function getChannelNameFromUrl(url) {
    const channel_name = url.split('/').pop();
    return channel_name;
}
function isUsernameUrl(url) {
    const regex = new RegExp('^' + BASE_URL.replace(/\./g, '\\.') + '/[^/]+$');
    return regex.test(url);
}
const parseUploadDateFilter = (filter) => {
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
};
const parseSort = (order) => {
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
    return sort;
};
const getQuery = (context) => {
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
    }
    else {
        context.filters.durationMinVideos = null;
        context.filters.durationMaxVideos = null;
    }
    if (context.filters.uploaddate) {
        context.filters.createdAfterVideos = parseUploadDateFilter(context.filters.uploaddate[0]);
    }
    return context;
};
function generateUUIDv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

class SearchPagerAll extends VideoPager {
    cb;
    constructor(results, hasMore, params, page, cb) {
        super(results, hasMore, { params, page });
        this.cb = cb;
    }
    nextPage() {
        this.context.page += 1;
        const opts = {
            q: this.context.params.query,
            sort: this.context.params.sort,
            page: this.context.page,
            filters: this.context.params.filters
        };
        return this.cb(opts);
    }
}
class SearchChannelPager extends ChannelPager {
    cb;
    constructor(results, hasNextPage, params, page, cb) {
        super(results, hasNextPage, { params, page });
        this.cb = cb;
    }
    nextPage() {
        const opts = { q: this.context.params.query, page: this.context.page += 1 };
        return this.cb(opts);
    }
}
class ChannelVideoPager extends VideoPager {
    cb;
    constructor(results, hasNextPage, params, cb) {
        super(results, hasNextPage, { ...params });
        this.cb = cb;
    }
    nextPage() {
        this.context.page += 1;
        return this.cb(this.context.url, this.context.page, this.context.type, this.context.order);
    }
}
class ChannelPlaylistPager extends PlaylistPager {
    cb;
    constructor(results, hasMore, params, page, cb) {
        super(results, hasMore, { params, page });
        this.cb = cb;
    }
    nextPage() {
        this.context.page += 1;
        return this.cb(this.context.params.url, this.context.page);
    }
}
class SearchPlaylistPager extends PlaylistPager {
    cb;
    constructor(results, hasMore, params, page, cb) {
        super(results, hasMore, { params, page });
        this.cb = cb;
    }
    nextPage() {
        this.context.page = this.context.page + 1;
        const opts = {
            q: this.context.params.query,
            sort: this.context.params.sort,
            page: this.context.page,
            filters: this.context.params.filters
        };
        return this.cb(opts);
    }
}

const SourceChannelToGrayjayChannel = (pluginId, sourceChannel) => {
    const externalLinks = sourceChannel?.externalLinks ?? {};
    const links = Object.keys(externalLinks).reduce((acc, key) => {
        if (externalLinks[key]) {
            acc[key.replace('URL', '')] = externalLinks[key];
        }
        return acc;
    }, {});
    return new PlatformChannel({
        id: new PlatformID(PLATFORM, sourceChannel?.id ?? "", pluginId, PLATFORM_CLAIMTYPE),
        name: sourceChannel?.displayName ?? "",
        thumbnail: sourceChannel?.avatar?.url ?? "",
        banner: sourceChannel.banner?.url ?? "",
        subscribers: sourceChannel?.metrics?.engagement?.followers?.edges[0]?.node?.total ?? 0,
        description: sourceChannel?.description ?? "",
        url: `${BASE_URL}/${sourceChannel.name}`,
        links
    });
};
const SourceAuthorToGrayjayPlatformAuthorLink = (pluginId, creator) => {
    return new PlatformAuthorLink(new PlatformID(PLATFORM, creator?.id ?? "", pluginId, PLATFORM_CLAIMTYPE), creator?.displayName ?? "", creator?.name ? `${BASE_URL}/${creator?.name}` : "", creator?.avatar?.url ?? "", creator?.followers?.totalCount ?? creator?.stats?.followers?.total ?? creator?.metrics?.engagement?.followers?.edges[0]?.node?.total ?? 0);
};
const SourceVideoToGrayjayVideo = (pluginId, sourceVideo) => {
    const isLive = getIsLive(sourceVideo);
    const viewCount = getViewCount(sourceVideo);
    const video = {
        id: new PlatformID(PLATFORM, sourceVideo?.id ?? "", pluginId, PLATFORM_CLAIMTYPE),
        description: sourceVideo?.description ?? '',
        name: sourceVideo?.title ?? "",
        thumbnails: new Thumbnails([
            new Thumbnail(sourceVideo?.thumbnail?.url ?? "", 0)
        ]),
        author: SourceAuthorToGrayjayPlatformAuthorLink(pluginId, sourceVideo?.creator),
        uploadDate: Math.floor(new Date(sourceVideo?.createdAt).getTime() / 1000),
        datetime: Math.floor(new Date(sourceVideo?.createdAt).getTime() / 1000),
        url: `${BASE_URL_VIDEO}/${sourceVideo?.xid}`,
        duration: sourceVideo?.duration ?? 0,
        viewCount,
        isLive
    };
    return new PlatformVideo(video);
};
const SourceCollectionToGrayjayPlaylistDetails = (pluginId, sourceCollection, videos = []) => {
    return new PlatformPlaylistDetails({
        url: sourceCollection?.xid ? `${BASE_URL_PLAYLIST}/${sourceCollection?.xid}` : "",
        id: new PlatformID(PLATFORM, sourceCollection?.xid ?? "", pluginId, PLATFORM_CLAIMTYPE),
        author: sourceCollection?.creator ? SourceAuthorToGrayjayPlatformAuthorLink(pluginId, sourceCollection?.creator) : {},
        name: sourceCollection.name,
        thumbnail: sourceCollection?.thumbnail?.url,
        videoCount: videos.length ?? 0,
        contents: new VideoPager(videos)
    });
};
const SourceCollectionToGrayjayPlaylist = (pluginId, sourceCollection) => {
    return new PlatformPlaylist({
        url: `${BASE_URL_PLAYLIST}/${sourceCollection?.xid}`,
        id: new PlatformID(PLATFORM, sourceCollection?.xid ?? "", pluginId, PLATFORM_CLAIMTYPE),
        author: SourceAuthorToGrayjayPlatformAuthorLink(pluginId, sourceCollection?.creator),
        name: sourceCollection?.name,
        thumbnail: sourceCollection?.thumbnail?.url,
        videoCount: sourceCollection?.metrics?.engagement?.videos?.edges[0]?.node?.total,
    });
};
const getIsLive = (sourceVideo) => {
    return sourceVideo?.isOnAir === true || sourceVideo?.duration == undefined;
};
const getViewCount = (sourceVideo) => {
    let viewCount = 0;
    if (getIsLive(sourceVideo)) {
        viewCount = sourceVideo?.audienceCount ?? sourceVideo?.viewCount ?? sourceVideo?.stats?.views?.total ?? 0;
    }
    else {
        viewCount = sourceVideo?.viewCount ?? sourceVideo?.stats?.views?.total ?? 0;
    }
    return viewCount;
};
const SourceVideoToPlatformVideoDetailsDef = (pluginId, sourceVideo, player_metadata) => {
    let positiveRatingCount = 0;
    let negativeRatingCount = 0;
    const ratings = sourceVideo?.metrics?.engagement?.likes?.edges ?? [];
    for (const edge of ratings) {
        const ratingName = edge?.node?.rating;
        const ratingTotal = edge?.node?.total;
        if (POSITIVE_RATINGS_LABELS.includes(ratingName)) {
            positiveRatingCount += ratingTotal;
        }
        else if (NEGATIVE_RATINGS_LABELS.includes(ratingName)) {
            negativeRatingCount += ratingTotal;
        }
    }
    const isLive = getIsLive(sourceVideo);
    const viewCount = getViewCount(sourceVideo);
    const duration = isLive ? 0 : sourceVideo?.duration ?? 0;
    const source = new HLSSource({
        name: isLive ? 'live' : 'source',
        duration,
        url: player_metadata?.qualities?.auto[0]?.url,
    });
    const sources = [
        source
    ];
    const platformVideoDetails = {
        id: new PlatformID(PLATFORM, sourceVideo?.id ?? "", pluginId, PLATFORM_CLAIMTYPE),
        name: sourceVideo?.title ?? "",
        thumbnails: new Thumbnails([new Thumbnail(sourceVideo?.thumbnail?.url ?? "", 0)]),
        author: SourceAuthorToGrayjayPlatformAuthorLink(pluginId, sourceVideo?.creator),
        uploadDate: Math.floor(new Date(sourceVideo?.createdAt).getTime() / 1000),
        datetime: Math.floor(new Date(sourceVideo?.createdAt).getTime() / 1000),
        duration,
        viewCount,
        url: sourceVideo?.xid ? `${BASE_URL_VIDEO}/${sourceVideo.xid}` : "",
        isLive,
        description: sourceVideo?.description ?? "",
        video: new VideoSourceDescriptor(sources),
        rating: new RatingLikesDislikes(positiveRatingCount, negativeRatingCount),
        dash: null,
        live: null,
        hls: null,
        subtitles: []
    };
    const sourceSubtitle = player_metadata?.subtitles;
    if (sourceSubtitle?.enable && sourceSubtitle?.data) {
        Object.keys(sourceSubtitle.data).forEach(key => {
            const subtitleData = sourceSubtitle.data[key];
            if (subtitleData) {
                const subtitleUrl = subtitleData.urls[0];
                platformVideoDetails.subtitles.push({
                    name: subtitleData.label,
                    url: subtitleUrl,
                    format: "text/vtt",
                    getSubtitles() {
                        try {
                            const subResp = http.GET(subtitleUrl, {});
                            if (!subResp.isOk) {
                                if (IS_TESTING) {
                                    bridge.log(`Failed to fetch subtitles from ${subtitleUrl}`);
                                }
                                return "";
                            }
                            return convertSRTtoVTT(subResp.body);
                        }
                        catch (error) {
                            if (IS_TESTING) {
                                bridge.log(`Error fetching subtitles: ${error?.message}`);
                            }
                            return "";
                        }
                    }
                });
            }
        });
    }
    return platformVideoDetails;
};
/**
 * Converts SRT subtitle format to VTT format.
 *
 * @param {string} srt - The SRT subtitle string.
 * @returns {string} - The converted VTT subtitle string.
 */
const convertSRTtoVTT = (srt) => {
    // Initialize the VTT output with the required header
    const vtt = ['WEBVTT\n\n'];
    // Split the SRT input into blocks based on double newlines
    const srtBlocks = srt.split('\n\n');
    // Process each block individually
    srtBlocks.forEach((block) => {
        // Split each block into lines
        const lines = block.split('\n');
        if (lines.length >= 3) {
            // Extract and convert the timestamp line
            const timestamp = lines[1].replace(/,/g, '.');
            // Extract the subtitle text lines
            const subtitleText = lines.slice(2).join('\n');
            // Add the converted block to the VTT output
            vtt.push(`${timestamp}\n${subtitleText}\n\n`);
        }
    });
    // Join the VTT array into a single string and return it
    return vtt.join('');
};

let config;
let _settings;
const state = {
    anonymousUserAuthorizationToken: "",
    anonymousUserAuthorizationTokenExpirationDate: 0,
    messageServiceToken: ""
};
const LIKE_PLAYLIST_ID = "LIKE_PLAYLIST";
const FAVORITES_PLAYLIST_ID = "FAVORITES_PLAYLIST";
const RECENTLY_WATCHED_PLAYLIST_ID = "RECENTLY_WATCHED_PLAYLIST";
// Will be used to store private playlists that require authentication
const authenticatedPlaylistCollection = [];
source.setSettings = function (settings) {
    _settings = settings;
};
let COUNTRY_NAMES_TO_CODE = [];
let VIDEOS_PER_PAGE_OPTIONS = [];
let PLAYLISTS_PER_PAGE_OPTIONS = [];
let CREATOR_AVATAR_HEIGHT = [];
let THUMBNAIL_HEIGHT = [];
//Source Methods
source.enable = function (conf, settings, saveStateStr) {
    config = conf ?? {};
    COUNTRY_NAMES_TO_CODE = config?.settings?.find(s => s.variable == "preferredCountryOptionIndex")?.options ?? [];
    VIDEOS_PER_PAGE_OPTIONS = config?.settings?.find(s => s.variable == "videosPerPageOptionIndex")?.options?.map(s => parseInt(s)) ?? [];
    PLAYLISTS_PER_PAGE_OPTIONS = config?.settings?.find(s => s.variable == "playlistsPerPageOptionIndex")?.options?.map(s => parseInt(s)) ?? [];
    CREATOR_AVATAR_HEIGHT = config?.settings?.find(s => s.variable == "avatarSizeOptionIndex")?.options?.map(s => `SQUARE_${s.replace("px", "")}`) ?? [];
    THUMBNAIL_HEIGHT = config?.settings?.find(s => s.variable == "thumbnailResolutionOptionIndex")?.options?.map(s => `PORTRAIT_${s.replace("px", "")}`) ?? [];
    const DEFAULT_SETTINGS = {
        hideSensitiveContent: true,
        avatarSizeOptionIndex: 8, // 720px
        thumbnailResolutionOptionIndex: 7, // 1080px
        preferredCountryOptionIndex: 0, // empty
        videosPerPageOptionIndex: 3, // 20
        playlistsPerPageOptionIndex: 0 // 5
    };
    _settings = { ...DEFAULT_SETTINGS, ...settings };
    if (IS_TESTING) {
        config.id = "9c87e8db-e75d-48f4-afe5-2d203d4b95c5";
    }
    let didSaveState = false;
    try {
        if (saveStateStr) {
            const saveState = JSON.parse(saveStateStr);
            if (saveState) {
                state.anonymousUserAuthorizationToken = saveState.anonymousUserAuthorizationToken;
                state.anonymousUserAuthorizationTokenExpirationDate = saveState.anonymousUserAuthorizationTokenExpirationDate;
                state.messageServiceToken = saveState.messageServiceToken;
                if (!isTokenValid()) {
                    log("Token expired. Fetching a new one.");
                }
                else {
                    didSaveState = true;
                    log("Using save state");
                }
            }
        }
    }
    catch (ex) {
        log("Failed to parse saveState:" + ex);
        didSaveState = false;
    }
    if (!didSaveState) {
        log("Getting a new tokens");
        const body = objectToUrlEncodedString({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'client_credentials'
        });
        let batchRequests = http.batch()
            .POST(BASE_URL_API_AUTH, body, {
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
        }, false);
        if (config.allowAllHttpHeaderAccess) {
            batchRequests = batchRequests.POST(BASE_URL_COMMENTS_AUTH, "", {
                'User-Agent': USER_AGENT,
                Accept: '*/*',
                'Accept-Language': 'en-US,en;q=0.5',
                'x-spot-id': 'sp_vWPN1lBu',
                'x-post-id': 'no$post',
                'Content-Type': 'application/json',
                'Origin': BASE_URL,
                Connection: 'keep-alive',
                Referer: BASE_URL,
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
                Priority: 'u=6',
                'Content-Length': '0'
            }, false);
        }
        const responses = batchRequests.execute();
        const res = responses[0];
        if (res.code !== 200) {
            console.error('Failed to get token', res);
            throw new ScriptException("", "Failed to get token: " + res.code + " - " + res.body);
        }
        const json = JSON.parse(res.body);
        if (!json.token_type || !json.access_token) {
            console.error('Invalid token response', res);
            throw new ScriptException("", 'Invalid token response: ' + res.body);
        }
        state.anonymousUserAuthorizationToken = `${json.token_type} ${json.access_token}`;
        state.anonymousUserAuthorizationTokenExpirationDate = Date.now() + (json.expires_in * 1000);
        if (config.allowAllHttpHeaderAccess) {
            const authenticateIm = responses[1];
            if (!authenticateIm.isOk) {
                // throw new UnavailableException('Failed to authenticate to comments service');
                log('Failed to authenticate to comments service');
            }
            state.messageServiceToken = authenticateIm.headers["x-access-token"][0];
        }
    }
};
source.getHome = function () {
    return getVideoPager({}, 0);
};
source.searchSuggestions = function (query) {
    try {
        const jsonResponse = executeGqlQuery(http, {
            operationName: 'AUTOCOMPLETE_QUERY',
            variables: {
                query
            },
            query: AUTOCOMPLETE_QUERY
        });
        return jsonResponse?.data?.search?.suggestedVideos?.edges?.map(edge => edge?.node?.name ?? "") ?? [];
    }
    catch (error) {
        log('Failed to get search suggestions:' + error?.message);
        return [];
    }
};
source.getSearchCapabilities = () => SEARCH_CAPABILITIES;
source.search = function (query, type, order, filters) {
    return getSearchPagerAll({ q: query, page: 1, type, order, filters });
};
source.searchChannels = function (query) {
    return getSearchChannelPager({ q: query, page: 1 });
};
//Channel
source.isChannelUrl = function (url) {
    return isUsernameUrl(url);
};
source.getChannel = function (url) {
    const channel_name = getChannelNameFromUrl(url);
    const channelDetails = executeGqlQuery(http, {
        operationName: 'CHANNEL_QUERY_DESKTOP',
        variables: {
            channel_name,
            avatar_size: CREATOR_AVATAR_HEIGHT[_settings?.avatarSizeOptionIndex]
        },
        query: CHANNEL_QUERY_DESKTOP
    });
    return SourceChannelToGrayjayChannel(config.id, channelDetails.data.channel);
};
source.getChannelContents = function (url, type, order, filters) {
    const page = 1;
    return getChannelContentsPager(url, page, type, order, filters);
};
source.getChannelPlaylists = (url) => {
    try {
        return getChannelPlaylists(url, 1);
    }
    catch (error) {
        log('Failed to get channel playlists:' + error?.message);
        return new ChannelPlaylistPager([]);
    }
};
source.getChannelCapabilities = () => {
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
source.saveState = () => {
    return JSON.stringify(state);
};
source.getSubComments = (comment) => {
    const params = { "count": 5, "offset": 0, "parent_id": comment.context.id, "sort_by": "best", "child_count": comment.replyCount };
    return getCommentPager(comment.contextUrl, params, 0);
};
source.getComments = (url) => {
    if (!config.allowAllHttpHeaderAccess) {
        return new PlatformCommentPager([], false, url, {}, 0);
    }
    const params = { "sort_by": "best", "offset": 0, "count": 10, "message_id": null, "depth": 2, "child_count": 2 };
    return getCommentPager(url, params, 0);
};
function getCommentPager(url, params, page) {
    try {
        const xid = url.split('/').pop();
        const commentsHeaders = {
            'User-Agent': USER_AGENT,
            Accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.5',
            'x-access-token': state.messageServiceToken,
            'Content-Type': 'application/json',
            'x-spot-id': 'sp_vWPN1lBu',
            'x-post-id': xid,
            'Origin': BASE_URL,
            Connection: 'keep-alive',
            Referer: BASE_URL,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
            Priority: 'u=6',
            TE: 'trailers'
        };
        const commentRequest = http.POST(BASE_URL_COMMENTS, JSON.stringify(params), commentsHeaders, false);
        if (!commentRequest.isOk) {
            throw new UnavailableException('Failed to authenticate to comments service');
        }
        const comments = JSON.parse(commentRequest.body);
        const users = comments.conversation.users;
        const results = comments.conversation.comments.map(v => {
            const user = users[v.user_id];
            return new Comment({
                contextUrl: url,
                author: new PlatformAuthorLink(new PlatformID(PLATFORM, user.id ?? "", config.id), user.display_name ?? "", "", `${BASE_URL_COMMENTS_THUMBNAILS}/${user.image_id}`),
                message: v.content[0].text,
                rating: new RatingLikes(v.stars),
                date: v.written_at,
                replyCount: v.total_replies_count ?? 0,
                context: { id: v.id }
            });
        });
        return new PlatformCommentPager(results, comments.conversation.has_next, url, params, ++page);
    }
    catch (error) {
        bridge.log('Failed to get comments:' + error?.message);
        return new PlatformCommentPager([], false, url, params, 0);
    }
}
class PlatformCommentPager extends CommentPager {
    constructor(results, hasMore, path, params, page) {
        super(results, hasMore, { path, params, page });
    }
    nextPage() {
        return getCommentPager(this.context.path, this.context.params, (this.context.page ?? 0) + 1);
    }
}
//Playlist
source.isPlaylistUrl = (url) => {
    return url.startsWith(BASE_URL_PLAYLIST) ||
        url === LIKE_PLAYLIST_ID ||
        url === FAVORITES_PLAYLIST_ID ||
        url === RECENTLY_WATCHED_PLAYLIST_ID;
};
source.searchPlaylists = (query, type, order, filters) => {
    return searchPlaylists({ q: query, type, order, filters });
};
source.getPlaylist = (url) => {
    const usePlatformAuth = authenticatedPlaylistCollection.includes(url);
    const thumbnailResolutionIndex = _settings.thumbnailResolutionOptionIndex;
    if (url === LIKE_PLAYLIST_ID) {
        return getLikePlaylist(config.id, http, usePlatformAuth, thumbnailResolutionIndex);
    }
    if (url === FAVORITES_PLAYLIST_ID) {
        return getFavoritesPlaylist(config.id, http, usePlatformAuth, thumbnailResolutionIndex);
    }
    if (url === RECENTLY_WATCHED_PLAYLIST_ID) {
        return getRecentlyWatchedPlaylist(config.id, http, usePlatformAuth, thumbnailResolutionIndex);
    }
    const xid = url.split('/').pop();
    const variables = {
        xid,
        avatar_size: CREATOR_AVATAR_HEIGHT[_settings.avatarSizeOptionIndex],
        thumbnail_resolution: THUMBNAIL_HEIGHT[thumbnailResolutionIndex],
    };
    let jsonResponse = executeGqlQuery(http, {
        operationName: 'PLAYLIST_VIDEO_QUERY',
        variables,
        query: PLAYLIST_DETAILS_QUERY,
        usePlatformAuth
    });
    const videos = jsonResponse?.data?.collection?.videos?.edges.map(edge => {
        return SourceVideoToGrayjayVideo(config.id, edge.node);
    });
    return SourceCollectionToGrayjayPlaylistDetails(config.id, jsonResponse?.data?.collection, videos);
};
source.getUserSubscriptions = () => {
    if (!bridge.isLoggedIn()) {
        log("Failed to retrieve subscriptions page because not logged in.");
        throw new ScriptException("Not logged in");
    }
    const headers = {
        'Content-Type': 'application/json',
        'User-Agent': USER_AGENT,
        // Accept: '*/*, */*',
        'Accept-Language': 'en-GB',
        Referer: `${BASE_URL}/library/subscriptions`,
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
    const usePlatformAuth = true;
    const fetchSubscriptions = (page, first) => {
        const jsonResponse = executeGqlQuery(http, {
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
        return jsonResponse?.data?.me?.channel?.followings?.edges?.map(edge => edge?.node?.creator?.name ?? "") ?? [];
    };
    const first = 100; // Number of records to fetch per page
    let page = 1;
    let subscriptions = [];
    // There is a totalCount ($.data.me.channel.followings.totalCount) property but it's not reliable. 
    // For example, it may return 0 even if there are subscriptions, or it may return a number that is not the actual number of subscriptions.
    // For now, it's better to fetch until no more results are returned
    let items = [];
    do {
        const response = fetchSubscriptions(page, first);
        items = response.map(creatorName => `${BASE_URL}/${creatorName}`);
        subscriptions.push(...items);
        page++;
    } while (items.length);
    return subscriptions;
};
source.getUserPlaylists = () => {
    if (!bridge.isLoggedIn()) {
        log("Failed to retrieve subscriptions page because not logged in.");
        throw new ScriptException("Not logged in");
    }
    const headers = {
        'Content-Type': 'application/json',
        'User-Agent': USER_AGENT,
        'Accept-Language': 'en-GB',
        Referer: 'https://www.dailymotion.com/',
        'Sec-GPC': '1',
        'X-DM-Preferred-Country': getPreferredCountry(_settings?.preferredCountryOptionIndex),
        Origin: BASE_URL,
        DNT: '1',
        Connection: 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        Priority: 'u=1',
        Pragma: 'no-cache',
        'Cache-Control': 'no-cache',
    };
    const jsonResponse = executeGqlQuery(http, {
        operationName: 'SUBSCRIPTIONS_QUERY',
        headers,
        query: SUBSCRIPTIONS_QUERY,
        usePlatformAuth: true
    });
    const userName = jsonResponse?.data?.me?.channel?.name;
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
};
source.getChannelTemplateByClaimMap = () => {
    return {
        //Dailymotion claim type
        27: {
            0: BASE_URL + "/{{CLAIMVALUE}}",
        }
    };
};
function getPlaylistsByUsername(userName, headers, usePlatformAuth = false) {
    const collections = executeGqlQuery(http, {
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
    });
    const playlists = collections.data.channel.collections.edges.map(edge => {
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
    };
    const jsonResponse = executeGqlQuery(http, {
        operationName: 'SEARCH_QUERY',
        variables: variables,
        query: SEARCH_QUERY,
        headers: undefined
    });
    const playlistConnection = jsonResponse?.data?.search?.playlists;
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
    };
    return new SearchPlaylistPager(searchResults, hasMore, params, context.page, searchPlaylists);
}
//Internals
function getVideoPager(params, page) {
    const count = VIDEOS_PER_PAGE_OPTIONS[_settings.videosPerPageOptionIndex];
    if (!params) {
        params = {};
    }
    params = { ...params, count };
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
    try {
        obj = executeGqlQuery(http, {
            operationName: 'SEACH_DISCOVERY_QUERY',
            variables: {
                avatar_size: CREATOR_AVATAR_HEIGHT[_settings?.avatarSizeOptionIndex],
                thumbnail_resolution: THUMBNAIL_HEIGHT[_settings?.thumbnailResolutionOptionIndex],
            },
            query: SEACH_DISCOVERY_QUERY,
            headers: headersToAdd,
        });
    }
    catch (error) {
        return new VideoPager([], false, { params });
    }
    const results = obj?.data?.home?.neon?.sections?.edges[0]?.node?.components?.edges
        ?.filter(edge => edge?.node?.id)
        ?.map(edge => {
        return SourceVideoToGrayjayVideo(config.id, edge.node);
    });
    const hasMore = obj?.data?.home?.neon?.sections?.edges[0]?.node?.components?.pageInfo?.hasNextPage ?? false;
    return new SearchPagerAll(results, hasMore, params, page, getVideoPager);
}
function getChannelContentsPager(url, page, type, order, filters) {
    const channel_name = getChannelNameFromUrl(url);
    const shouldLoadVideos = type === Type.Feed.Mixed || type === Type.Feed.Videos;
    const shouldLoadLives = type === Type.Feed.Mixed || type === Type.Feed.Streams || type === Type.Feed.Live;
    if (IS_TESTING) {
        log(`Getting channel contents for ${url}, page: ${page}, type: ${type}, order: ${order}, shouldLoadVideos: ${shouldLoadVideos}, shouldLoadLives: ${shouldLoadLives}, filters: ${JSON.stringify(filters)}`);
    }
    /**
        Recent = Sort liked medias by most recent.
        Visited - Sort liked medias by most viewed
    */
    let sort;
    if (order == Type.Order.Chronological) {
        sort = LikedMediaSort.Recent;
    }
    else if (order == "Popular") {
        sort = LikedMediaSort.Visited;
    }
    else {
        sort = LikedMediaSort.Recent;
    }
    const jsonResponse = executeGqlQuery(http, {
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
    const channel = jsonResponse?.data?.channel;
    const all = [
        ...(channel?.lives?.edges?.filter(e => e?.node?.isOnAir)?.map(e => e?.node) ?? []),
        ...(channel?.videos?.edges?.map(e => e?.node) ?? [])
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
    };
    return new ChannelVideoPager(videos, hasNext, params, getChannelContentsPager);
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
        "shouldIncludeVideos": true,
        "shouldIncludeLives": true,
        "page": context.page ?? 1,
        "limit": VIDEOS_PER_PAGE_OPTIONS[_settings.videosPerPageOptionIndex],
        "avatar_size": CREATOR_AVATAR_HEIGHT[_settings?.avatarSizeOptionIndex],
        "thumbnail_resolution": THUMBNAIL_HEIGHT[_settings?.thumbnailResolutionOptionIndex]
    };
    const jsonResponse = executeGqlQuery(http, {
        operationName: 'SEARCH_QUERY',
        variables: variables,
        query: SEARCH_QUERY,
        headers: undefined
    });
    const videoConnection = jsonResponse?.data?.search?.videos;
    const liveConnection = jsonResponse?.data?.search?.lives;
    const all = [
        ...(videoConnection?.edges ?? []),
        ...(liveConnection?.edges ?? [])
    ];
    const results = all.map(edge => SourceVideoToGrayjayVideo(config.id, edge?.node));
    const params = {
        query: context.q,
        sort: context.sort,
        filters: context.filters,
    };
    return new SearchPagerAll(results, videoConnection?.pageInfo?.hasNextPage, params, context.page, getSearchPagerAll);
}
function getSavedVideo(url, usePlatformAuth = false) {
    const id = url.split('/').pop();
    const player_metadata_url = `${BASE_URL_METADATA}/${id}?embedder=https%3A%2F%2Fwww.dailymotion.com%2Fvideo%2Fx8yb2e8&geo=1&player-id=xjnde&locale=en-GB&dmV1st=ce2035cd-bdca-4d7b-baa4-127a17490ca5&dmTs=747022&is_native_app=0&app=com.dailymotion.neon&client_type=webapp&section_type=player&component_style=_`;
    const headers1 = {
        "User-Agent": USER_AGENT,
        "Accept": "*/*",
        "Referer": "https://geo.dailymotion.com/",
        "Origin": "https://geo.dailymotion.com",
        "DNT": "1",
        "Connection": "keep-alive",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
    };
    if (_settings.hideSensitiveContent) {
        headers1["Cookie"] = "ff=on";
    }
    else {
        headers1["Cookie"] = "ff=off";
    }
    const videoDetailsRequestBody = JSON.stringify({
        operationName: "WATCHING_VIDEO",
        variables: {
            "xid": id,
            "avatar_size": CREATOR_AVATAR_HEIGHT[_settings?.avatarSizeOptionIndex],
            "thumbnail_resolution": THUMBNAIL_HEIGHT[_settings?.thumbnailResolutionOptionIndex]
        },
        query: WATCHING_VIDEO
    });
    const videoDetailsRequestHeaders = {
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
        videoDetailsRequestHeaders.Authorization = state.anonymousUserAuthorizationToken;
    }
    const responses = http.batch()
        .GET(player_metadata_url, headers1, usePlatformAuth)
        .POST(BASE_URL_API, videoDetailsRequestBody, videoDetailsRequestHeaders, usePlatformAuth)
        .execute();
    const player_metadataResponse = responses[0];
    const video_details_response = responses[1];
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
    if (video_details_response.code != 200) {
        throw new UnavailableException('Failed to get video details');
    }
    const video_details = JSON.parse(video_details_response.body);
    const video = video_details?.data?.video;
    const platformVideoDetails = SourceVideoToPlatformVideoDetailsDef(config.id, video, player_metadata);
    return new PlatformVideoDetails(platformVideoDetails);
}
function getSearchChannelPager(context) {
    const searchResponse = executeGqlQuery(http, {
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
        const channel = edge.node;
        return SourceChannelToGrayjayChannel(config.id, channel);
    });
    const params = {
        query: context.q,
    };
    return new SearchChannelPager(results, searchResponse?.data?.search?.channels?.pageInfo?.hasNextPage, params, context.page, getSearchChannelPager);
}
function getChannelPlaylists(url, page = 1) {
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
    const jsonResponse1 = executeGqlQuery(http, {
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
    });
    const channel = jsonResponse1.data.channel;
    const content = (channel?.collections?.edges ?? []).map(edge => {
        return SourceCollectionToGrayjayPlaylist(config.id, edge?.node);
    });
    if (content?.length === 0) {
        return new ChannelPlaylistPager([]);
    }
    const params = {
        url
    };
    const hasMore = channel?.collections?.pageInfo?.hasNextPage ?? false;
    return new ChannelPlaylistPager(content, hasMore, params, page, getChannelPlaylists);
}
function isTokenValid() {
    const currentTime = Date.now();
    return state.anonymousUserAuthorizationTokenExpirationDate > currentTime;
}
function executeGqlQuery(httpClient, requestOptions) {
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
    };
    const gql = JSON.stringify({
        operationName: requestOptions.operationName,
        variables: requestOptions.variables,
        query: requestOptions.query,
    });
    const usePlatformAuth = requestOptions.usePlatformAuth == undefined ? false : requestOptions.usePlatformAuth;
    const throwOnError = requestOptions.throwOnError == undefined ? true : requestOptions.throwOnError;
    if (!usePlatformAuth) {
        headersToAdd.Authorization = state.anonymousUserAuthorizationToken;
    }
    const res = httpClient.POST(BASE_URL_API, gql, headersToAdd, usePlatformAuth);
    if (!res.isOk) {
        console.error('Failed to get token', res);
        if (throwOnError) {
            throw new ScriptException("Failed to get token", res);
        }
    }
    const body = JSON.parse(res.body);
    // some errors may be returned in the body with a status code 200
    if (body.errors) {
        const message = body.errors.map(e => e.message).join(', ');
        if (throwOnError) {
            throw new UnavailableException(message);
        }
    }
    return body;
}
function getPages(httpClient, query, operationName, variables, usePlatformAuth, setRoot, hasNextCallback, getNextPage, map) {
    let all = [];
    if (!hasNextCallback) {
        hasNextCallback = () => false;
    }
    let hasNext = true;
    let nextPage = 1;
    do {
        variables = { ...variables, page: nextPage };
        const jsonResponse = executeGqlQuery(httpClient, {
            operationName,
            variables,
            query,
            usePlatformAuth
        });
        const root = setRoot(jsonResponse);
        nextPage = getNextPage(root, nextPage);
        const items = map(root);
        hasNext = hasNextCallback(root);
        all = all.concat(items);
    } while (hasNext);
    return all;
}
function getLikePlaylist(pluginId, httpClient, usePlatformAuth = false, thumbnailResolutionIndex = 0) {
    return getPlatformSystemPlaylist({
        pluginId,
        httpClient,
        query: USER_LIKED_VIDEOS_QUERY,
        operationName: 'USER_LIKED_VIDEOS_QUERY',
        rootObject: 'likedMedias',
        playlistName: 'Liked Videos',
        usePlatformAuth,
        thumbnailResolutionIndex
    });
}
function getFavoritesPlaylist(pluginId, httpClient, usePlatformAuth = false, thumbnailResolutionIndex = 0) {
    return getPlatformSystemPlaylist({
        pluginId,
        httpClient,
        query: USER_WATCH_LATER_VIDEOS_QUERY,
        operationName: 'USER_WATCH_LATER_VIDEOS_QUERY',
        rootObject: 'watchLaterMedias',
        playlistName: 'Favorites',
        usePlatformAuth,
        thumbnailResolutionIndex
    });
}
function getRecentlyWatchedPlaylist(pluginId, httpClient, usePlatformAuth = false, thumbnailResolutionIndex = 0) {
    return getPlatformSystemPlaylist({
        pluginId,
        httpClient,
        query: USER_WATCHED_VIDEOS_QUERY,
        operationName: 'USER_WATCHED_VIDEOS_QUERY',
        rootObject: 'watchedVideos',
        playlistName: 'Recently Watched',
        usePlatformAuth,
        thumbnailResolutionIndex
    });
}
function getPlatformSystemPlaylist(opts) {
    const videos = getPages(opts.httpClient, opts.query, opts.operationName, {
        page: 1,
        thumbnail_resolution: THUMBNAIL_HEIGHT[opts.thumbnailResolutionIndex]
    }, opts.usePlatformAuth, (jsonResponse) => jsonResponse?.data?.me, //set root
    (me) => (me?.[opts.rootObject]?.edges.length ?? 0) > 0 ?? false, //hasNextCallback
    (me, currentPage) => ++currentPage, //getNextPage
    (me) => me?.[opts.rootObject]?.edges.map(edge => {
        return SourceVideoToGrayjayVideo(opts.pluginId, edge.node);
    }));
    const collection = {
        "id": generateUUIDv4(),
        "name": opts.playlistName,
        "creator": {}
    };
    return SourceCollectionToGrayjayPlaylistDetails(opts.pluginId, collection, videos);
}
function getPreferredCountry(preferredCountryIndex) {
    const country = COUNTRY_NAMES_TO_CODE[preferredCountryIndex];
    const parts = country.split('-');
    const code = parts[0] ?? "";
    return (code || '').toLowerCase();
}
log("LOADED");
