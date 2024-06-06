'use strict';

const BASE_URL = "https://www.dailymotion.com";
const BASE_URL_API = "https://graphql.api.dailymotion.com";
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
const X_DM_AppInfo_Version = "v2024-05-16T12:17:57.363Z"; //TODO check how to get this dynamically
const X_DM_Neon_SSR = "0";
const X_DM_Preferred_Country = ""; //TODO check how to get this from Grayjay
const PLATFORM = "Dailymotion";
const PLATFORM_CLAIMTYPE = 3;
const ITEMS_PER_PAGE = 5;
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
const countryNames = Object.keys(countryNamesToCode);
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
		banner(width:LANDSCAPE_1920) {
			url
		}
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
const VIDEO_DETAILS_QUERY = `
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
}
`;
const GET_CHANNEL_PLAYLISTS = `
query CHANNEL_PLAYLISTS_QUERY(
	$channel_name: String!
	$sort: String
	$page: Int!
	$first: Int!
) {
	channel(name: $channel_name) {
		id
		xid
		channel_playlist_collections: collections(
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
					id
					xid
					updatedAt
					createdAt
					name
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
						}
					}
				}
			}
		}
	}
}
`;

let AUTHORIZATION_TOKEN_ANONYMOUS_USER = "";
let AUTHORIZATION_TOKEN_ANONYMOUS_USER_EXPIRATION_DATE;
let httpClientRequestToken = http.newClient(false);
function getPreferredCountry(preferredCountryIndex) {
    const countryName = countryNames[preferredCountryIndex];
    const code = countryNamesToCode[countryName];
    const preferredCountry = (code || X_DM_Preferred_Country || '').toLowerCase();
    return preferredCountry;
}
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
    var regex = new RegExp('^' + BASE_URL.replace(/\./g, '\\.') + '/[^/]+$');
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
    const body = objectToUrlEncodedString({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials'
    });
    // Make the HTTP POST request to the authorization API
    const res = httpClientRequestToken.POST(`${BASE_URL_API_AUTH}`, body, {
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
        headersToAdd.Authorization = getAnonymousUserTokenSingleton();
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

class SearchPagerAll extends VideoPager {
    /**
     * @param {import("./types.d.ts").SearchContext} context the query params
     * @param {(PlatformVideo | PlatformChannel)[]} results the initial results
    */
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
    /**
     * @param {import("./types.d.ts").URLContext} context the context
     * @param {PlatformVideo[]} results the initial results
     * @param {boolean} hasNextPage if there is a next page
     */
    cb;
    constructor(context, results, hasNextPage, cb) {
        super(results, hasNextPage, context);
        this.cb = cb;
    }
    nextPage() {
        return this.cb(this.context);
    }
}
class SearchPlaylistPager extends VideoPager {
    /**
     * @param {import("./types.d.ts").SearchContext} context the query params
     * @param {(PlatformVideo | PlatformChannel)[]} results the initial results
    */
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
        // return searchPlaylists(opts);
        return this.cb(opts);
    }
}

var config;
var _settings;
let httpClientAnonymous = http.newClient(false);
// Will be used to store playlists that require authentication
const authenticatedPlaylistCollection = [];
source.setSettings = function (settings) {
    _settings = settings;
    http.GET(BASE_URL, {}, true);
};
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
            };
        }
    }
};
source.getHome = function () {
    getAnonymousUserTokenSingleton();
    return getVideoPager({}, 0);
};
source.searchSuggestions = function (query) {
    const variables = {
        "query": query
    };
    try {
        const jsonResponse = executeGqlQuery(getHttpContext({ usePlatformAuth: false }), {
            operationName: 'AUTOCOMPLETE_QUERY',
            variables: variables,
            query: SEARCH_SUGGESTIONS_QUERY
        });
        return jsonResponse?.data?.search?.suggestedVideos?.edges?.map(edge => edge?.node?.name ?? "") ?? [];
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
source.searchChannels = function (query) {
    return getSearchChannelPager({ q: query, page: 1 });
};
//Channel
source.isChannelUrl = function (url) {
    return isUsernameUrl(url);
};
source.getChannel = function (url) {
    const channel_name = getChannelNameFromUrl(url);
    const channelDetails = executeGqlQuery(getHttpContext({ usePlatformAuth: false }), {
        operationName: 'CHANNEL_QUERY_DESKTOP',
        variables: {
            channel_name: channel_name,
            avatar_size: creatorAvatarHeight[_settings?.avatarSize]
        },
        query: CHANNEL_BY_URL_QUERY
    });
    const channel = channelDetails.data.channel;
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
    return getSavedVideo(url, false);
};
//Playlist
source.isPlaylistUrl = (url) => {
    return url.startsWith(BASE_URL_PLAYLIST);
};
source.searchPlaylists = (query, type, order, filters) => {
    return searchPlaylists({ q: query, type, order, filters });
};
source.getPlaylist = (url) => {
    const xid = url.split('/').pop();
    const variables = {
        xid,
        avatar_size: creatorAvatarHeight[_settings.avatarSize],
        thumbnail_resolution: thumbnailHeight[_settings.thumbnailResolution],
    };
    const usePlatformAuth = authenticatedPlaylistCollection.includes(url);
    let jsonResponse = executeGqlQuery(getHttpContext({ usePlatformAuth }), {
        operationName: 'PLAYLIST_VIDEO_QUERY',
        variables,
        query: PLAYLIST_DETAILS_QUERY,
        usePlatformAuth
    });
    const videos = jsonResponse?.data?.collection?.videos?.edges.map(edge => {
        const resource = edge.node;
        const opts = {
            id: new PlatformID(PLATFORM, resource.id, config.id, PLATFORM_CLAIMTYPE),
            name: resource.title ?? "",
            thumbnails: new Thumbnails([
                new Thumbnail(resource?.thumbnail?.url ?? "", 0)
            ]),
            author: new PlatformAuthorLink(new PlatformID(PLATFORM, resource?.creator?.id ?? "", config.id, PLATFORM_CLAIMTYPE), resource?.creator?.displayName ?? "", `${BASE_URL}/${resource?.creator?.name}`, resource?.creator?.avatar?.url ?? "", 0),
            uploadDate: parseInt(new Date(resource.createdAt).getTime() / 1000),
            datetime: parseInt(new Date(resource.createdAt).getTime() / 1000),
            url: resource.url ?? "",
            duration: resource.duration ?? 0,
            viewCount: resource?.viewCount ?? 0,
            isLive: false
        };
        return opts;
    });
    const playlist = jsonResponse?.data?.collection;
    return new PlatformPlaylistDetails({
        url: `${BASE_URL_PLAYLIST}/${playlist?.xid}`,
        id: new PlatformID(PLATFORM, playlist?.xid, config.id, PLATFORM_CLAIMTYPE),
        author: new PlatformAuthorLink(new PlatformID(PLATFORM, playlist?.creator?.id ?? "", config.id, PLATFORM_CLAIMTYPE), playlist?.creator?.displayName ?? "", `${BASE_URL}/${playlist?.creator?.name}`, playlist?.creator?.avatar?.url ?? "", 0),
        name: playlist.name,
        thumbnail: playlist?.thumbnail?.url,
        videoCount: playlist?.metrics?.engagement?.videos?.edges[0]?.node?.total,
        contents: new VideoPager(videos)
    });
};
source.getUserSubscriptions = () => {
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
    };
    const usePlatformAuth = true;
    const fetchSubscriptions = (page, first) => {
        const jsonResponse = executeGqlQuery(getHttpContext({ usePlatformAuth }), {
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
    };
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
    const jsonResponse = executeGqlQuery(getHttpContext({ usePlatformAuth: true }), {
        operationName: 'SUBSCRIPTIONS_QUERY',
        headers,
        query: userInfoQuery,
        usePlatformAuth: true
    });
    const userName = jsonResponse?.data?.me?.channel?.name;
    return getPlaylistsByUsername(userName, headers, true);
};
function getPlaylistsByUsername(userName, headers, usePlatformAuth = false) {
    const jsonResponse1 = executeGqlQuery(getHttpContext({ usePlatformAuth }), {
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
    });
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
        "thumbnail_resolution": thumbnailHeight[_settings?.thumbnailResolution],
        "avatar_size": creatorAvatarHeight[_settings?.avatarSize],
    };
    const jsonResponse = executeGqlQuery(getHttpContext({ usePlatformAuth: false }), {
        operationName: 'SEARCH_QUERY',
        variables: variables,
        query: MAIN_SEARCH_QUERY,
        headers: undefined
    });
    const playlistConnection = jsonResponse?.data?.search?.playlists;
    var searchResults = playlistConnection?.edges?.map(edge => {
        const playlist = edge?.node;
        return new PlatformPlaylist({
            url: `${BASE_URL_PLAYLIST}/${playlist?.xid}`,
            id: new PlatformID(PLATFORM, playlist?.xid ?? "", config.id, PLATFORM_CLAIMTYPE),
            author: new PlatformAuthorLink(new PlatformID(PLATFORM, playlist?.creator?.id ?? "", config.id, PLATFORM_CLAIMTYPE), playlist?.creator?.displayName ?? "", `${BASE_URL}/${playlist?.creator?.name}`, playlist?.creator?.avatar?.url ?? "", 0),
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
    };
    return new SearchPlaylistPager(searchResults, hasMore, params, context.page, searchPlaylists);
}
//Internals
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
        obj = executeGqlQuery(getHttpContext({ usePlatformAuth: false }), {
            operationName: 'SEACH_DISCOVERY_QUERY',
            variables: {
                shouldQueryPromotedHashtag: false,
                avatar_size: creatorAvatarHeight[_settings?.avatarSize],
                thumbnail_resolution: thumbnailHeight[_settings?.thumbnailResolution],
            },
            query: HOME_QUERY,
            headers: headersToAdd,
        });
    }
    catch (error) {
        return new VideoPager([], false, { params });
    }
    var results = obj?.data?.home?.neon?.sections?.edges[0]?.node?.components?.edges
        // ?.filter(edge => edge?.node?.__typename === 'Video')
        ?.filter(edge => edge?.node?.id)
        ?.map(edge => {
        const v = edge.node;
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
    });
    const hasMore = obj?.data?.home?.neon?.sections?.edges[0]?.node?.components?.pageInfo?.hasNextPage ?? false;
    return new SearchPagerAll(results, hasMore, params, page, getVideoPager);
}
function GetVideoExtraDetails(xid) {
    const json = executeGqlQuery(getHttpContext({ usePlatformAuth: false }), {
        operationName: 'WATCHING_VIDEO',
        variables: { xid },
        query: GET_VIDEO_EXTRA_DETAILS
    });
    return {
        views: json?.data?.video?.stats?.views?.total
    };
}
function getChannelPager(context) {
    const url = context.url;
    const channel_name = getChannelNameFromUrl(url);
    const json = executeGqlQuery(getHttpContext({ usePlatformAuth: false }), {
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
        const video = edge.node;
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
    });
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
        author: new PlatformAuthorLink(new PlatformID(PLATFORM, resource.creatorId, config.id, PLATFORM_CLAIMTYPE), resource.creatorDisplayName, resource.creatorUrl, resource.creatorAvatar ?? "", 0),
        uploadDate: parseInt(new Date(resource.createdAt).getTime() / 1000),
        url: resource.url,
        duration: resource.duration,
        viewCount: resource.viewCount,
        isLive: resource.isLive
    });
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
        "avatar_size": creatorAvatarHeight[_settings?.avatarSize],
        "thumbnail_resolution": thumbnailHeight[_settings?.thumbnailResolution]
    };
    const jsonResponse = executeGqlQuery(getHttpContext({ usePlatformAuth: false }), {
        operationName: 'SEARCH_QUERY',
        variables: variables,
        query: MAIN_SEARCH_QUERY,
        headers: undefined
    });
    const results = [];
    const videoConnection = jsonResponse?.data?.search?.videos;
    const liveConnection = jsonResponse?.data?.search?.videos;
    const all = [
        ...(videoConnection?.edges ?? []),
        ...(liveConnection?.edges ?? [])
    ];
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
        results.push(video);
    }
    //results, hasMore, path, params, page
    var params = {
        query: context.q,
        sort: context.sort,
        filters: context.filters,
    };
    return new SearchPagerAll(results, videoConnection?.pageInfo?.hasNextPage, params, context.page, getSearchPagerAll);
}
function checkHLS(url, headersToAdd, usePlatformAuth = false) {
    // const resp = http.GET(url, headersToAdd, true);
    var resp = getHttpContext({ usePlatformAuth }).GET(url, headersToAdd, usePlatformAuth);
    if (!resp.isOk) {
        throw new UnavailableException('This content is not available');
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
    };
    if (_settings.hideSensitiveContent) {
        headers1["Cookie"] = "ff=on";
    }
    else {
        headers1["Cookie"] = "ff=off";
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
    const videoDetailsRequestBody = JSON.stringify({
        operationName: "WATCHING_VIDEO",
        variables,
        query: VIDEO_DETAILS_QUERY
    });
    const video_details_response = getHttpContext({ usePlatformAuth }).POST(BASE_URL_API, videoDetailsRequestBody, videoDetailsRequestHeaders, usePlatformAuth);
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
        const ratingName = edge?.node?.rating;
        const ratingTotal = edge?.node?.total;
        if (positiveRatings.includes(ratingName)) {
            positiveRatingCount += ratingTotal;
        }
        else if (negativeRatings.includes(ratingName)) {
            negativeRatingCount += ratingTotal;
        }
    }
    var platformVideoDetails = {
        id: new PlatformID(PLATFORM, id, config.id, PLATFORM_CLAIMTYPE),
        name: video.title,
        thumbnails: new Thumbnails([new Thumbnail(video.thumbnail.url, 0)]),
        author: new PlatformAuthorLink(new PlatformID(PLATFORM, video?.creator?.id, config.id, PLATFORM_CLAIMTYPE), video?.creator?.displayName, `${BASE_URL}/${video?.creator?.name}`, `${video?.creator?.avatar?.url}`, 0 //subscribers
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
    };
    return new PlatformVideoDetails(platformVideoDetails);
}
function getSearchChannelPager(context) {
    const variables = {
        query: context.q,
        page: context.page ?? 1,
        limit: ITEMS_PER_PAGE,
        avatar_size: creatorAvatarHeight[_settings?.avatarSize]
    };
    const json = executeGqlQuery(getHttpContext({ usePlatformAuth: false }), {
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
    };
    return new SearchChannelPager(results, json?.data?.search?.channels?.pageInfo?.hasNextPage, params, context.page, getSearchChannelPager);
}
function getHttpContext(opts = { usePlatformAuth: false }) {
    return opts.usePlatformAuth ? http : httpClientAnonymous;
}
log("LOADED");
