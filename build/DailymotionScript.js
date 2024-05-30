'use strict';

const errorTypes = {
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
};
const creatorAvatarHeight = [
    "SQUARE_25",
    "SQUARE_60",
    "SQUARE_80",
    "SQUARE_120",
    "SQUARE_190",
    "SQUARE_240",
    "SQUARE_360",
    "SQUARE_480",
    "SQUARE_720"
];
const thumbnailHeight = [
    "PORTRAIT_60",
    "PORTRAIT_120",
    "PORTRAIT_180",
    "PORTRAIT_240",
    "PORTRAIT_360",
    "PORTRAIT_480",
    "PORTRAIT_720",
    "PORTRAIT_1080"
];
const constants = {
    creatorAvatarHeight,
    thumbnailHeight,
    countryNamesToCode,
    countryNames: Object.keys(countryNamesToCode)
};

const SEARCH_SUGGESTIONS_QUERY = `
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
const CHANNEL_BY_URL_QUERY = `
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
		coverURL1024x: coverURL(size: "1024x")
		coverURL1920x: coverURL(size: "1920x")
		tagline
		country {
			id
			codeAlpha2
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
const HOME_QUERY = `	
fragment SEARCH_DISCOVERY_VIDEO_FRAGMENT on Video {
	id
	xid
	title
	isPublished
	embedURL
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
	
}

query SEACH_DISCOVERY_QUERY($shouldQueryPromotedHashtag: Boolean!, $avatar_size: AvatarHeight!, $thumbnail_resolution: ThumbnailHeight!) {
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
									__typename
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
	featuredContent {
		id
		channels(first: 10) {
			edges {
				node {
					id
					xid
					displayName
					name
					logoURL(size: "x120")
					stats {
						id
						followers {
							id
							total
						}
					}
				}
			}
		}
	}
	conversations(
		filter: { story: { eq: HASHTAG }, algorithm: { eq: SPONSORED } }
		first: 1
	) @include(if: $shouldQueryPromotedHashtag) {
		edges {
			node {
				id
				story {
					... on Hashtag {
						id
						name
					}
				}
			}
		}
	}
}


`;
const CHANNEL_VIDEOS_BY_CHANNEL_NAME = `
query CHANNEL_VIDEOS_QUERY(
	$channel_name: String!
	$first: Int!
	$sort: String
	$page: Int!
	$allowExplicit: Boolean
	$avatar_size: AvatarHeight!
	$thumbnail_resolution: ThumbnailHeight!
) {
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
			}
			edges {
				node {
					id
					xid
					title
					thumbnail(height:$thumbnail_resolution) {
						url
					}
					bestAvailableQuality
					duration
					createdAt
					creator {
						id
						name
						displayName
						avatar(height:$avatar_size) {
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

				}
			}
		}
	}
}
		
	  
	`;
const MAIN_SEARCH_QUERY = ` 
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
	
	fragment TOPIC_BASE_FRAG on Topic {
		id
		xid
		name
		videos(sort: "recent", first: 5) {
			pageInfo {
				hasNextPage
				nextPage
			}
			edges {
				node {
					id
					...VIDEO_BASE_FRAGMENT
					...VIDEO_FAVORITES_FRAGMENT
				}
			}
		}
		stats {
			id
			videos {
				id
				total
			}
		}
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
			topics(query: $query, first: $limit, page: $page)
				@include(if: $shouldIncludeTopics) {
				pageInfo {
					hasNextPage
					nextPage
				}
				totalCount
				edges {
					node {
						id
						...TOPIC_BASE_FRAG
					}
				}
			}
		}
	}		
	`;
const VIDE_DETAILS_QUERY = `
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
		canDisplayAds
		videoWidth: width
		videoHeight: height
		status
		hashtags {
			edges {
				node {
					id
					name
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
			organization @skip(if: $isSEO) {
				id
				xid
				owner {
					id
					xid
				}
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
		moderation {
			id
			reviewedAt
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
								}
							}
						}
					}
				}
			}
		}
		geoblockedCountries {
			id
			allowed
			denied
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
			organization @skip(if: $isSEO) {
				id
				xid
				owner {
					id
					xid
				}
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
		moderation {
			id
			reviewedAt
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
								}
							}
						}
					}
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
		$isSEO: Boolean!
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
	}		
	`;
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
}

	
		`;
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
}
`;
const GET_VIDEO_EXTRA_DETAILS = `
query WATCHING_VIDEO($xid: String!) {
	video: media(xid: $xid)  {
		... on Video {
			stats {
				views {
					total
				}
			}
		}
	}
}	
	`;
const queries = {
    SEARCH_SUGGESTIONS_QUERY,
    CHANNEL_BY_URL_QUERY,
    HOME_QUERY,
    CHANNEL_VIDEOS_BY_CHANNEL_NAME,
    MAIN_SEARCH_QUERY,
    VIDE_DETAILS_QUERY,
    SEARCH_CHANNEL,
    PLAYLIST_DETAILS_QUERY,
    GET_VIDEO_EXTRA_DETAILS
};

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
var util = {
    objectToUrlEncodedString,
};

const BASE_URL = "https://www.dailymotion.com";
const BASE_URL_API = "https://graphql.api.dailymotion.com";
const BASE_URL_API_AUTH = `${BASE_URL_API}/oauth/token?`;
const BASE_URL_VIDEO = `${BASE_URL}/video`;
const BASE_URL_PLAYLIST = `${BASE_URL}/playlist`;
const BASE_URL_METADATA = `${BASE_URL}/player/metadata/video`;
const USER_AGENT = '"Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36"';
// Those are used even for not logged users to make requests on the graphql api.
//TODO: check how to get them dynamically
const CLIENT_ID = 'f1a362d288c1b98099c7';
const CLIENT_SECRET = 'eea605b96e01c796ff369935357eca920c5da4c5';
var config = {};
var _settings = {};
const X_DM_AppInfo_Id = "com.dailymotion.neon";
const X_DM_AppInfo_Type = "website";
const X_DM_AppInfo_Version = "v2024-05-16T12:17:57.363Z"; //TODO check how to get this dynamically
const X_DM_Neon_SSR = "0";
const X_DM_Preferred_Country = ""; //TODO check how to get this from Grayjay
const PLATFORM = "Dailymotion";
const PLATFORM_CLAIMTYPE = 3;
const ITEMS_PER_PAGE = 5;
let AUTHORIZATION_TOKEN_ANONYMOUS_USER = null;
let AUTHORIZATION_TOKEN_ANONYMOUS_USER_EXPIRATION_DATE = null;
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
source.setSettings = function (settings) {
    _settings = settings;
};
//Source Methods
source.enable = function (conf, settings, saveStateStr) {
    config = conf ?? {};
    _settings = settings ?? {};
    http.GET(BASE_URL, {}, true);
};
source.getHome = function () {
    return getVideoPager({}, 0);
};
source.searchSuggestions = function (query) {
    const variables = {
        "query": query
    };
    try {
        const jsonResponse = executeGqlQuery({
            operationName: 'AUTOCOMPLETE_QUERY',
            variables: variables,
            query: queries.SEARCH_SUGGESTIONS_QUERY
        }, { useAnonymousToken: true });
        return jsonResponse?.data?.search?.suggestedVideos?.edges?.map(edge => edge?.node?.name);
    }
    catch (error) {
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
};
source.search = function (query, type, order, filters) {
    return getSearchPagerAll({ q: query, page: 1, type, order, filters });
};
// source.getSearchChannelContentsCapabilities = function () {
// };
// source.searchChannelContents = function (channelUrl, query, type, order, filters) {
// };
source.searchChannels = function (query) {
    return getSearchChannelPager({ q: query, page: 1 });
};
//Channel
source.isChannelUrl = function (url) {
    return isUsernameUrl(url);
};
source.getChannel = function (url) {
    const channel_name = getChannelNameFromUrl(url);
    const channelDetails = executeGqlQuery({
        operationName: 'CHANNEL_QUERY_DESKTOP',
        variables: {
            channel_name: channel_name,
            avatar_size: constants.creatorAvatarHeight[_settings?.avatarSize]
        },
        query: queries.CHANNEL_BY_URL_QUERY
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
    });
};
source.getChannelContents = function (url) {
    return getChannelPager({ url, page_size: ITEMS_PER_PAGE, page: 1 });
};
//Video
source.isContentDetailsUrl = function (url) {
    return url.startsWith(BASE_URL_VIDEO);
};
source.getContentDetails = function (url) {
    return getSavedVideo(url);
};
//Playlist
source.isPlaylistUrl = (url) => {
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
    };
    const jsonResponse = executeGqlQuery({
        operationName: 'PLAYLIST_VIDEO_QUERY',
        variables,
        query: queries.PLAYLIST_DETAILS_QUERY
    }, { useAnonymousToken: true });
    const videos = jsonResponse?.data?.collection?.videos?.edges.map(edge => {
        const resource = edge.node;
        const opts = {
            id: new PlatformID(PLATFORM, resource.id, config.id, PLATFORM_CLAIMTYPE),
            name: resource.title,
            thumbnails: new Thumbnails([
                new Thumbnail(resource?.thumbnail?.url, 0)
            ]),
            author: new PlatformAuthorLink(new PlatformID(PLATFORM, resource.creator.id, config.id, PLATFORM_CLAIMTYPE), resource.creator.displayName, `${BASE_URL}/${resource.creator.name}`, resource.creator.avatar.url ?? "", 0),
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
        author: new PlatformAuthorLink(new PlatformID(PLATFORM, playlist?.creator?.id, config.id, PLATFORM_CLAIMTYPE), playlist?.creator?.displayName, `${BASE_URL}/${playlist?.creator?.name}`, playlist?.creator?.avatar?.url ?? "", 0),
        name: playlist.name,
        thumbnail: playlist?.thumbnail?.url,
        videoCount: playlist?.metrics?.engagement?.videos?.edges[0]?.node?.total,
        contents: new VideoPager(videos)
    });
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
    }
    else {
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
    };
    const jsonResponse = executeGqlQuery({
        operationName: 'SEARCH_QUERY',
        variables: variables,
        query: queries.MAIN_SEARCH_QUERY,
        headers: undefined
    }, { useAnonymousToken: true });
    var searchResults = jsonResponse?.data?.search?.playlists?.edges?.map(edge => {
        const playlist = edge.node;
        return new PlatformPlaylist({
            url: `${BASE_URL_PLAYLIST}/${playlist?.xid}`,
            id: new PlatformID(PLATFORM, playlist?.xid, config.id),
            author: new PlatformAuthorLink(new PlatformID(PLATFORM, playlist.creator.id, config.id, PLATFORM_CLAIMTYPE), playlist.creator.displayName, `${BASE_URL}/${playlist.creator.name}`, playlist.creator.avatar.url ?? "", 0),
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
    };
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
    if (!params) {
        params = {};
    }
    params = { ...params, count };
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
        obj = executeGqlQuery({
            operationName: 'SEACH_DISCOVERY_QUERY',
            variables: {
                shouldQueryPromotedHashtag: false,
                avatar_size: constants.creatorAvatarHeight[_settings?.avatarSize],
                thumbnail_resolution: constants.thumbnailHeight[_settings?.thumbnailResolution],
            },
            query: queries.HOME_QUERY,
            headers: headersToAdd,
        }, { useAnonymousToken: true });
    }
    catch (error) {
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
    });
    const hasMore = obj?.data?.home?.neon?.sections?.edges[0]?.node?.components?.pageInfo?.hasNextPage ?? false;
    return new SearchPagerAll(results, hasMore, params, page);
}
function GetVideoExtraDEtails(xid) {
    const json = executeGqlQuery({
        operationName: 'WATCHING_VIDEO',
        variables: { xid },
        query: queries.GET_VIDEO_EXTRA_DETAILS
    }, { useAnonymousToken: true });
    return {
        views: json?.data?.video?.stats?.views?.total
    };
}
function getChannelPager(context) {
    const url = context.url;
    const channel_name = getChannelNameFromUrl(url);
    const json = executeGqlQuery({
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
        query: queries.CHANNEL_VIDEOS_BY_CHANNEL_NAME
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
    });
    if (edges.length > 0) {
        context.page++;
    }
    return new ChannelVideoPager(context, videos, json?.data?.channel?.channel_videos_all_videos?.pageInfo?.hasNextPage);
}
function ToPlatformVideo(resource) {
    const opts = {
        id: new PlatformID(PLATFORM, resource.id, config.id, PLATFORM_CLAIMTYPE),
        name: resource.name,
        thumbnails: new Thumbnails([new Thumbnail(resource.thumbnail, 0)]),
        author: new PlatformAuthorLink(new PlatformID(PLATFORM, resource.creatorId, config.id, PLATFORM_CLAIMTYPE), resource.creatorDisplayName, resource.creatorUrl, resource.creatorAvatar ?? "", 0),
        uploadDate: parseInt(new Date(resource.createdAt).getTime() / 1000),
        url: resource.url,
        duration: resource.duration,
        viewCount: resource.viewCount,
        isLive: resource.isLive
    };
    return new PlatformVideo(opts);
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
    return sort;
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
    };
    const jsonResponse = executeGqlQuery({
        operationName: 'SEARCH_QUERY',
        variables: variables,
        query: queries.MAIN_SEARCH_QUERY,
        headers: undefined
    }, { useAnonymousToken: true });
    const results = [];
    const all = [
        ...(jsonResponse?.data?.search?.videos?.edges ?? []),
        ...(jsonResponse?.data?.search?.lives?.edges ?? [])
    ];
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
        results.push(video);
    }
    //results, hasMore, path, params, page
    var params = {
        query: context.q,
        sort: context.sort,
        filters: context.filters,
    };
    return new SearchPagerAll(results, jsonResponse?.data?.search?.videos?.pageInfo?.hasNextPage, params, context.page);
}
function executeGqlQuery(requestOptions, authOptions = {}) {
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
        throw new UnavailableException('This content is not available');
    }
}
function getSavedVideo(url, authOptions = {}) {
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
    };
    if (_settings.hideSensitiveContent) {
        headers1["Cookie"] = "ff=on";
    }
    else {
        headers1["Cookie"] = "ff=off";
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
        "Cache-Control": "no-cache",
        "Authorization": getAnonymousUserTokenSingleton()
    };
    if (authOptions.useAnonymousToken) {
        videoDetailsRequestHeaders.Authorization = getAnonymousUserTokenSingleton();
    }
    const videoDetailsRequestBody = JSON.stringify({
        "operationName": "WATCHING_VIDEO",
        "variables": {
            "xid": id,
            "isSEO": false,
            "avatar_size": constants.creatorAvatarHeight[_settings?.avatarSize],
            "thumbnail_resolution": constants.thumbnailHeight[_settings?.thumbnailResolution]
        },
        "query": queries.VIDE_DETAILS_QUERY
    });
    const video_details_response = http.POST(BASE_URL_API, videoDetailsRequestBody, videoDetailsRequestHeaders, authOptions.usePlatformAuth);
    if (video_details_response.code != 200) {
        throw new UnavailableException('Failed to get video details');
    }
    const video_details = JSON.parse(video_details_response.body);
    const sources = [
        new HLSSource({
            name: 'source',
            duration: player_metadata?.duration,
            url: hls_url,
            // priority: true,
        })
    ];
    const thumbnail = player_metadata.thumbnailx720
        ?? player_metadata.thumbnailx240
        ?? player_metadata.thumbnailx120
        ?? player_metadata.thumbnailx60;
    const video = video_details?.data?.video;
    var test = {
        id: new PlatformID(PLATFORM, id, config.id, PLATFORM_CLAIMTYPE),
        name: player_metadata.title,
        thumbnails: new Thumbnails([new Thumbnail(thumbnail, 0)]),
        author: new PlatformAuthorLink(new PlatformID(PLATFORM, player_metadata?.owner?.id, config.id, PLATFORM_CLAIMTYPE), player_metadata?.owner?.screenname, player_metadata?.owner?.url, video?.creator?.avatar?.url ?? '', 0 //dsubscribers
        ),
        // datetime: new Date(video?.createdAt).getTime(),
        uploadDate: parseInt(new Date(video.createdAt).getTime() / 1000),
        duration: player_metadata?.duration,
        viewCount: video?.stats?.views?.total, //TODO: get view count
        url: player_metadata.url,
        isLive: false,
        description: video?.description, //TODO: get description
        video: new VideoSourceDescriptor(sources),
        dash: null,
        live: null,
        hls: null,
    };
    return new PlatformVideoDetails(test);
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
        query: queries.SEARCH_CHANNEL
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
    };
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
        this.context.page = this.context.page + 1;
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
    constructor(results, hasNextPage, params, page) {
        super(results, hasNextPage, { params, page });
    }
    nextPage() {
        const opts = { q: this.context.params.query, page: this.context.page += 1 };
        return getSearchChannelPager(opts);
    }
}
class ChannelVideoPager extends VideoPager {
    /**
     * @param {import("./types.d.ts").URLContext} context the context
     * @param {PlatformVideo[]} results the initial results
     * @param {boolean} hasNextPage if there is a next page
     */
    constructor(context, results, hasNextPage) {
        super(results, hasNextPage, context);
    }
    nextPage() {
        return getChannelPager(this.context);
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
        this.context.page = this.context.page + 1;
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
