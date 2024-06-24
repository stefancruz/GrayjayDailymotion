import { Channel, Collection, Live, Maybe, Video } from "../types/CodeGenDailymotion";
import { BASE_URL, BASE_URL_PLAYLIST, BASE_URL_VIDEO, NEGATIVE_RATINGS_LABELS, PLATFORM, PLATFORM_CLAIMTYPE, POSITIVE_RATINGS_LABELS } from "./constants";

export const SourceChannelToGrayjayChannel = (pluginId: string, url: string, sourceChannel: Channel): PlatformChannel => {
    const externalLinks = sourceChannel?.externalLinks ?? {};

    const links = Object.keys(externalLinks).reduce((acc, key) => {
        if (externalLinks[key]) {
            acc[key.replace('URL', '')] = externalLinks[key];
        }
        return acc;
    }, {} as Record<string, string>);

    return new PlatformChannel({
        id: new PlatformID(PLATFORM, sourceChannel?.id ?? "", pluginId, PLATFORM_CLAIMTYPE),
        name: sourceChannel?.displayName ?? "",
        thumbnail: sourceChannel?.avatar?.url ?? "",
        banner: sourceChannel.banner?.url ?? "",
        subscribers: sourceChannel?.metrics?.engagement?.followers?.edges[0]?.node?.total ?? 0,
        description: sourceChannel?.description ?? "",
        url,
        links
    });
}

export const SourceAuthorToGrayjayPlatformAuthorLink = (pluginId: string, creator?: Maybe<Channel>): PlatformAuthorLink => {
    return new PlatformAuthorLink(
        new PlatformID(PLATFORM, creator?.id ?? "", pluginId, PLATFORM_CLAIMTYPE),
        creator?.displayName ?? "",
        creator?.name ? `${BASE_URL}/${creator?.name}` : "",
        creator?.avatar?.url ?? "",
        creator?.followers?.totalCount ?? creator?.stats?.followers?.total ?? creator?.metrics?.engagement?.followers?.edges[0]?.node?.total ?? 0
    );
}

export const SourceVideoToGrayjayVideo = (pluginId: string, sourceVideo?: Video | Live): PlatformVideo => {


    const isLive = getIsLive(sourceVideo);
    const viewCount = getViewCount(sourceVideo);

    const video: PlatformVideoDef = {
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
        duration: (sourceVideo as Video)?.duration ?? 0,
        viewCount,
        isLive
    };

    return new PlatformVideo(video);
}

export const SourceCollectionToGrayjayPlaylistDetails = (pluginId: string, sourceCollection: Collection, videos: PlatformVideo[] = []): PlatformPlaylistDetails => {  
    return new PlatformPlaylistDetails({
        url: sourceCollection?.xid ? `${BASE_URL_PLAYLIST}/${sourceCollection?.xid}` : "",
        id: new PlatformID(PLATFORM, sourceCollection?.xid ?? "", pluginId, PLATFORM_CLAIMTYPE),
        author: sourceCollection?.creator ? SourceAuthorToGrayjayPlatformAuthorLink(pluginId, sourceCollection?.creator) : {},
        name: sourceCollection.name,
        thumbnail: sourceCollection?.thumbnail?.url,
        videoCount: videos.length ?? 0,
        contents: new VideoPager(videos)
    });
}

export const SourceCollectionToGrayjayPlaylist = (pluginId: string, sourceCollection?: Maybe<Collection>): PlatformPlaylist => {
    return new PlatformPlaylist({
        url: `${BASE_URL_PLAYLIST}/${sourceCollection?.xid}`,
        id: new PlatformID(PLATFORM, sourceCollection?.xid ?? "", pluginId, PLATFORM_CLAIMTYPE),
        author: SourceAuthorToGrayjayPlatformAuthorLink(pluginId, sourceCollection?.creator),
        name: sourceCollection?.name,
        thumbnail: sourceCollection?.thumbnail?.url,
        videoCount: sourceCollection?.metrics?.engagement?.videos?.edges[0]?.node?.total,
    });
}

const getIsLive = (sourceVideo?: Video | Live): boolean => {
    return (sourceVideo as Live)?.isOnAir === true || (sourceVideo as Video)?.duration == undefined;
}

const getViewCount = (sourceVideo: Video | Live): number => {

    let viewCount = 0;

    if (getIsLive(sourceVideo)) {
        viewCount = sourceVideo?.audienceCount ?? sourceVideo?.viewCount ?? sourceVideo?.stats?.views?.total ?? 0;
    } else {
        viewCount = sourceVideo?.viewCount ?? sourceVideo?.stats?.views?.total ?? 0;
    }

    return viewCount;
}

export const SourceVideoToPlatformVideoDetailsDef = (
    pluginId: string,
    sourceVideo: Video | Live,
    sources: HLSSource[],
    sourceSubtitle: IDailymotionSubtitle
): PlatformVideoDetailsDef => {

    let positiveRatingCount = 0;
    let negativeRatingCount = 0;

    const ratings = sourceVideo?.metrics?.engagement?.likes?.edges ?? [];

    for (const edge of ratings) {
        const ratingName = edge?.node?.rating as string;
        const ratingTotal = edge?.node?.total as number;

        if (POSITIVE_RATINGS_LABELS.includes(ratingName)) {
            positiveRatingCount += ratingTotal;
        } else if (NEGATIVE_RATINGS_LABELS.includes(ratingName)) {
            negativeRatingCount += ratingTotal;
        }
    }

    const isLive = getIsLive(sourceVideo);
    const viewCount = getViewCount(sourceVideo);
    const duration = isLive ? 0 : (sourceVideo as Video)?.duration ?? 0;

    const platformVideoDetails: PlatformVideoDetailsDef = {
        id: new PlatformID(PLATFORM, sourceVideo?.id ?? "", pluginId, PLATFORM_CLAIMTYPE),
        name: sourceVideo?.title ?? "",
        thumbnails: new Thumbnails([new Thumbnail(sourceVideo?.thumbnail?.url ?? "", 0)]),
        author: SourceAuthorToGrayjayPlatformAuthorLink(pluginId, sourceVideo?.creator),
        uploadDate: Math.floor(new Date(sourceVideo?.createdAt).getTime() / 1000),
        datetime: Math.floor(new Date(sourceVideo?.createdAt).getTime() / 1000),
        duration,
        // viewCount,
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
                        } catch (error: any) {
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
}

/**
 * Converts SRT subtitle format to VTT format.
 * 
 * @param {string} srt - The SRT subtitle string.
 * @returns {string} - The converted VTT subtitle string.
 */
export const convertSRTtoVTT = (srt) => {
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
}

