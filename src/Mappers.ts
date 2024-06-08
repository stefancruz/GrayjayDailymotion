import { Channel, Collection, Video } from "../types/CodeGenDailymotion";
import { BASE_URL, BASE_URL_PLAYLIST, BASE_URL_VIDEO, PLATFORM, PLATFORM_CLAIMTYPE } from "./constants";

export const SourceChannelToGrayjayChannel = (pluginId: string, url: string, sourceChannel: Channel): PlatformChannel => {

    const externalLinks = sourceChannel?.externalLinks ?? {};

    const links = {};

    Object
        .keys(externalLinks)
        .forEach(key => {
            if (externalLinks[key]) {
                links[key.replace('URL', '')] = externalLinks[key];
            }
        });

    return new PlatformChannel({
        id: new PlatformID(PLATFORM, sourceChannel?.id, pluginId, PLATFORM_CLAIMTYPE),
        name: sourceChannel?.displayName ?? "",
        thumbnail: sourceChannel?.avatar?.url ?? "",
        banner: sourceChannel.banner?.url ?? "",
        subscribers: sourceChannel?.metrics?.engagement?.followers?.edges[0]?.node?.total ?? 0,
        description: sourceChannel?.description ?? "",
        url,
        links
    })
}

export const SourceVideoToGrayjayVideo = (pluginId: string, sourceVideo: Video): PlatformVideo => {

    // const metadata = GetVideoExtraDetails(anonymousHttpClient, sv.xid);
    // const viewCount = metadata.views ?? 0;

    const isLive = sourceVideo?.isOnAir == true;
    const viewCount = isLive ? (sourceVideo?.audienceCount ?? 0) : (sourceVideo?.viewCount ?? sourceVideo?.stats?.views?.total ?? 0);
    // const url = sourceVideo?.url ?? `${BASE_URL_VIDEO}/${sourceVideo?.xid}`;
    const video: PlatformVideoDef = {
        id: new PlatformID(PLATFORM, sourceVideo.id, pluginId, PLATFORM_CLAIMTYPE),
        description: sourceVideo?.description ?? '',
        name: sourceVideo?.title ?? "",
        thumbnails: new Thumbnails([
            new Thumbnail(sourceVideo?.thumbnail?.url ?? "", 0)
        ]),
        author: new PlatformAuthorLink(
            new PlatformID(PLATFORM, sourceVideo?.creator?.id ?? "", pluginId, PLATFORM_CLAIMTYPE),
            sourceVideo?.creator?.displayName ?? "",
            `${BASE_URL}/${sourceVideo?.creator?.name}`,
            sourceVideo?.creator?.avatar?.url ?? "",
            0
        ),
        uploadDate: parseInt(new Date(sourceVideo.createdAt).getTime() / 1000),
        datetime: parseInt(new Date(sourceVideo.createdAt).getTime() / 1000),
        url: `${BASE_URL_VIDEO}/${sourceVideo?.xid}`,
        duration: sourceVideo?.duration ?? 0,
        viewCount,
        isLive
    };

    return new PlatformVideo(video);
}

export const SourceCollectionToGrayjayPlaylistDetails = (pluginId: string, sourceCollection: Collection, videos: PlatformVideo[] = []): PlatformPlaylistDetails => {

    return new PlatformPlaylistDetails({
        url: `${BASE_URL_PLAYLIST}/${sourceCollection?.xid}`,
        id: new PlatformID(PLATFORM, sourceCollection?.xid, pluginId, PLATFORM_CLAIMTYPE),
        author: new PlatformAuthorLink(
            new PlatformID(PLATFORM, sourceCollection?.creator?.id ?? "", pluginId, PLATFORM_CLAIMTYPE),
            sourceCollection?.creator?.displayName ?? "",
            `${BASE_URL}/${sourceCollection?.creator?.name}`,
            sourceCollection?.creator?.avatar?.url ?? "",
            0
        ),
        name: sourceCollection.name,
        thumbnail: sourceCollection?.thumbnail?.url,
        videoCount: sourceCollection?.metrics?.engagement?.videos?.edges[0]?.node?.total,
        contents: new VideoPager(videos)
    });

}

export const SourceCollectionToGrayjayPlaylist = (pluginId: string, sourceCollection: Collection): PlatformPlaylist => {
    return new PlatformPlaylist({
        url: `${BASE_URL_PLAYLIST}/${sourceCollection?.xid}`,
        id: new PlatformID(PLATFORM, sourceCollection?.xid ?? "", pluginId, PLATFORM_CLAIMTYPE),
        author: new PlatformAuthorLink(
            new PlatformID(PLATFORM, sourceCollection?.creator?.id ?? "", pluginId, PLATFORM_CLAIMTYPE),
            sourceCollection?.creator?.displayName ?? "",
            `${BASE_URL}/${sourceCollection?.creator?.name}`,
            sourceCollection?.creator?.avatar?.url ?? "",
            0
        ),
        name: sourceCollection?.name,
        thumbnail: sourceCollection?.thumbnail?.url,
        videoCount: sourceCollection?.metrics?.engagement?.videos?.edges[0]?.node?.total,
    });
}