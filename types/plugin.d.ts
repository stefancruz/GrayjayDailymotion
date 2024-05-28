declare class Thumbnails {
    constructor(thumbnails: Thumbnail[])
}
declare class Thumbnail {
    constructor(url: string, quality: number)
}

declare class ResultCapabilities {
    constructor(types: string[], sorts: string[], filters: FilterGroup[])
}
declare class FilterGroup {
    constructor(name: string, filters: string[], isMultiSelect: boolean, id: string);
}
declare class FilterCapability {
    constructor(name: string, value: string, id: string);
}

declare class PlatformAuthorLink {
    constructor(id: PlatformID, name: string, url: string, thumbnail: string, subscribers?: number);
}

declare interface PlatformVideoDef {
    id: PlatformID,
    name: string,
    thumbnails: Thumbnails,
    author: PlatformAuthorLink,
    uploadDate: number,
    url: string,
    duration: number,
    viewCount: number,
    isLive: boolean
}
declare class PlatformVideo {
    constructor(obj: PlatformVideoDef);
}

declare interface PlatformVideoDetailsDef extends PlatformVideoDef {
    description: string,
    video: VideoSourceDescriptor,
    dash?: DashSource,
    hls?: HLSSource,
    live: SubtitleSource[]
}
declare class PlatformVideoDetails extends PlatformVideo {
    constructor(obj: PlatformVideoDetailsDef);
}

// Sources
declare interface IVideoSourceDescriptor {}

declare interface MuxVideoSourceDescriptorDef {
    isUnMuxed: boolean,
    videoSources: VideoSource[]
}
declare class MuxVideoSourceDescriptor implements IVideoSourceDescriptor {
    constructor(obj: MuxVideoSourceDescriptorDef);
}

declare interface UnMuxVideoSourceDescriptorDef {
    isUnMuxed: boolean,
    videoSources: VideoSource[]
}
declare class UnMuxVideoSourceDescriptor implements IVideoSourceDescriptor {
    constructor(videoSourcesOrObj: VideoSource[] | UnMuxVideoSourceDescriptorDef, audioSources?: AudioSource[]);
}

declare interface IVideoSource {}

declare interface IAudioSource {}

declare interface VideoUrlSourceDef extends IVideoSource {
    width: number,
    height: number,
    container: string,
    codec: string,
    name: string,
    bitrate: number,
    duration: number,
    url: string
}
declare class VideoUrlSource {
    constructor(obj: VideoUrlSourceDef);
}

declare interface YTVideoSourceDef extends VideoUrlSourceDef {
    itagId: number,
    initStart: number,
    initEnd: number,
    indexStart: number,
    indexEnd: number,
}
declare class YTVideoSource extends VideoUrlSource {
    constructor(obj: YTVideoSourceDef);
}

declare interface AudioUrlSourceDef extends IAudioSource {
    name: string,
    bitrate: number,
    container: string,
    codecs: string,
    duration: number,
    url: string,
    language: string
}
declare class AudioUrlSource {
    constructor(obj: AudioUrlSourceDef);
}

declare interface YTAudioSourceDef extends AudioUrlSourceDef {
    itagId: number,
    initStart: number,
    initEnd: number,
    indexStart: number,
    indexEnd: number,
    audioChannels: number
}
declare class YTAudioSource extends AudioUrlSource {
    constructor(obj: YTAudioSourceDef);
}

declare interface HLSSourceDef {
    name: string,
    duration: number,
    url: string
}
declare class HLSSource implements IVideoSource {
    constructor(obj: HLSSourceDef);
}

declare interface DashSourceDef {
    name: string,
    duration: number,
    url: string
}
declare class DashSource implements IVideoSource {
    constructor(obj: DashSourceDef);
}

// Channel
declare interface PlatformChannelDef {
    id: PlatformID,
    name: string,
    thumbnail: string,
    banner: string,
    subscribers: number,
    description: string,
    url: string,
    links?: Map<string>
}
declare class PlatformChannel {
    constructor(obj: PlatformChannelDef);
}

// Ratings
declare interface IRating {
    type: number
}
declare class RatingLikes implements IRating {
    constructor(likes: number);
}
declare class RatingLikesDislikes implements IRating {
    constructor(likes: number, dislikes: number);
}
declare class RatingScaler implements IRating {
    constructor(value: number);
}

declare interface CommentDef {
    contextUrl: string,
    author: PlatformAuthorLink,
    message: string,
    rating: IRating,
    date: number,
    replyCount: number,
    context: any
}
declare class Comment {
    constructor(obj: CommentDef);
}

declare class LiveEventPager {
    constructor(results: LiveEvent[], hasMore: boolean, context: any);

    hasMorePagers(): boolean
    nextPage(): LiveEventPager; //Could be self
}

declare class LiveEvent {
    constructor(type: string)
}
declare class LiveEventComment extends LiveEvent {
    constructor(name: string, message: string, thumbnail?: string);
}
declare class LiveEventDonation extends LiveEvent {
    constructor(amount: number, name: string, message: string, thumbnail?: string);
}
declare class LiveEventViewCount extends LiveEvent {
    constructor(viewCount: number);
}
declare class LiveEventRaid extends LiveEvent {
    constructor(targetUrl: string, targetName: string, targetThumbnail: string);
}

//Pagers
declare class VideoPager {
    constructor(results: PlatformVideo[], hasMore: boolean, context: any);
    context: any
    hasMorePagers(): boolean
    nextPage(): VideoPager; //Could be self
}
declare class ChannelPager {
    constructor(results: PlatformVideo[], hasMore: boolean, context: any);
    context: any
    hasMorePagers(): boolean;
    nextPage(): ChannelPager; //Could be self
}
declare class CommentPager {
    constructor(results: PlatformVideo[], hasMore: boolean, context: any);
    context: any
    hasMorePagers(): boolean
    nextPage(): CommentPager; //Could be self
}

declare interface Map<T> {
    [Key: string]: T;
}

// Plugin configuration
export interface Source {
    getHome(): VideoPager;

    enable(conf: PluginConfig, settings: any, saveStateStr: any): void;

    setSettings(settings: any): void;

    disable(): void;

    searchSuggestions(query: string): string[];
    search(query: string, type: string, order: string, filters: FilterGroup[]): VideoPager;
    getSearchCapabilities(): ResultCapabilities;

    // Optional
    searchChannelVideos?(channelUrl: string, query: string, type: string, order: string, filters: FilterGroup[]): VideoPager;
    getSearchChannelVideoCapabilities?(): ResultCapabilities;

    isChannelUrl(url: string): boolean;
    getChannel(url: string): PlatformChannel | null;

    getChannelVideos(url: string, type: string, order: string, filters: FilterGroup[]): VideoPager;
    getChannelCapabilities(): ResultCapabilities;

    isVideoDetailsUrl(url: string): boolean;
    getVideoDetails(url: string): PlatformVideoDetails;

    // Optional
    getComments?(url: string): CommentPager;
    getSubComments?(comment: Comment): CommentPager;

    // Optional
    getUserSubscriptions?(): string[];
    getUserPlaylists?(): string[];

    // Optional
    isPlaylistUrl?(url: string): boolean;

    searchPlaylists(query, type, order, filters);
    
    getPlaylist?(url: string): string[];

    isContentDetailsUrl(url: string): boolean;

    getChannelContents(url: string): VideoPager;

    searchChannels(query: string): ChannelPager;

    getContentDetails(url: string): PlatformVideoDetails;
}

declare const source: Source;

declare var IS_TESTING: boolean;

declare enum Type {
    Source = "DASH" | "HLS" | "Static",
    Feed = "VIDEOS" | "STREAMS" | "MIXED" | "LIVE",
    Order = "CHRONOLOGICAL",
    Date = "LAST_HOUR" | "TODAY" | "LAST_WEEK" | "LAST_MONTH" | "LAST_YEAR",
    Duration = "SHORT" | "MEDIUM" | "LONG",
}

declare enum Language {
    UNKNOWN = "Unknown",
    ARABIC = "Arabic",
    SPANISH = "Spanish",
    FRENCH = "French",
    HINDI = "Hindi",
    INDONESIAN = "Indonesian",
    KOREAN = "Korean",
    PORTBRAZIL = "Portuguese Brazilian",
    RUSSIAN = "Russian",
    THAI = "Thai",
    TURKISH = "Turkish",
    VIETNAMESE = "Vietnamese",
    ENGLISH = "English",
}
