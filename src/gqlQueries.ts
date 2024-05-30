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
`
export const HOME_QUERY = `	
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
`

export const GET_VIDEO_EXTRA_DETAILS = `
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
	`

export const GET_USER_SUBSCRIPTIONS = `
query SUBSCRIPTIONS_QUERY($first: Int, $page: Int, $avatar_size: AvatarHeight!) {
	me {
		followingChannels(first: $first, page: $page) {
			totalCount
			edges {
				node {
					id
					xid
					name
					displayName
					avatar(height: $avatar_size) {
						url
						width
					}
					coverURLx375: coverURL(size: "x375")
					logoURLx60: logoURL(size: "x60")
				}
			}
		}
	}
}`;
