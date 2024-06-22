export const SEARCH_SUGGESTIONS_QUERY = `
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
    `
export const CHANNEL_BY_URL_QUERY = `
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
`
export const HOME_QUERY = `	
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
}



`


export const CHANNEL_VIDEOS_BY_CHANNEL_NAME = `
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
		lives(page: $page, first: $first, allowExplicit: $allowExplicit) @include(if: $shouldLoadLives) {
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
}
	`

export const MAIN_SEARCH_QUERY = ` 
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
	}		
	`;


export const VIDEO_DETAILS_QUERY = `
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
	`


export const SEARCH_CHANNEL = `		
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

	
		`


export const PLAYLIST_DETAILS_QUERY = `
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
`

export const GET_USER_SUBSCRIPTIONS = `
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


export const GET_CHANNEL_PLAYLISTS_XID = `
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
		}
`

export const SUBSCRIPTIONS_QUERY = `
query SUBSCRIPTIONS_QUERY {
	me {
		xid
		channel {
			name
		}
	}
}
`;


export const GET_CHANNEL_PLAYLISTS = `
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

`


export const GET_LIKED_VIDEOS_GQL_QUERY = `
		query USER_LIKED_VIDEOS_QUERY($page: Int!) {
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
						thumbnail(height: PORTRAIT_1080) {
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
						thumbnail(height: PORTRAIT_1080) {
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
}

		`


export const GET_FAVORITES_GQL_QUERY = `
	query USER_WATCH_LATER_VIDEOS_QUERY($page: Int!) {
	me {
		id
		stats {
			id
			watchLater {
				id
				total
				__typename
			}
			__typename
		}
		watchLaterMedias(first: 100, page: $page) {
			edges {
				node {
					... on Video {
						__typename
						id
						xid
						title
						duration
						thumbnail(height: PORTRAIT_1080) {
							url
						}
						aspectRatio
						channel {
							id
							logoURLx25: logoURL(size: "x25")
							displayName
							accountType
							__typename
						}
						viewerEngagement {
							id
							favorited
							__typename
						}
					}
					... on Live {
						__typename
						id
						xid
						title
						isOnAir
						thumbnail(height: PORTRAIT_1080) {
							url
						}
						channel {
							id
							logoURLx25: logoURL(size: "x25")
							displayName
							accountType
							__typename
						}
						viewerEngagement {
							id
							favorited
							__typename
						}
					}
					__typename
				}
				__typename
			}
			pageInfo {
				hasNextPage
				nextPage
				__typename
			}
			__typename
		}
		__typename
	}
}

	
	`


	export const GET_RECENTLY_WATCHED_GQL_QUERY = `
	query USER_WATCH_LATER_VIDEOS_QUERY($page: Int!) {
	me {
		id
		stats {
			id
			watchedVideos {
				id
				total
				__typename
			}
			__typename
		}
		watchedVideos(first: 100, page: $page) {
			edges {
				node {
					id
					xid
					title
					duration
					thumbnail(height: PORTRAIT_1080) {
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
}

	`