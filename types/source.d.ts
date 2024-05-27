declare const bridge: any;

interface Type {
    Source: {
        Dash: "DASH";
        HLS: "HLS";
        STATIC: "Static";
    };
    Feed: {
        Videos: "VIDEOS";
        Streams: "STREAMS";
        Mixed: "MIXED";
        Live: "LIVE";
        Subscriptions: "SUBSCRIPTIONS";
    };
    Order: {
        Chronological: "CHRONOLOGICAL";
    };
    Date: {
        LastHour: "LAST_HOUR";
        Today: "TODAY";
        LastWeek: "LAST_WEEK";
        LastMonth: "LAST_MONTH";
        LastYear: "LAST_YEAR";
    };
    Duration: {
        Short: "SHORT";
        Medium: "MEDIUM";
        Long: "LONG";
    };
    Text: {
        RAW: 0;
        HTML: 1;
        MARKUP: 2;
    };
    Chapter: {
        NORMAL: 0;
        SKIPPABLE: 5;
        SKIP: 6;
        SKIPONCE: 7;
    };
}

interface Language {
    UNKNOWN: "Unknown";
    ARABIC: "ar";
    SPANISH: "es";
    FRENCH: "fr";
    HINDI: "hi";
    INDONESIAN: "id";
    KOREAN: "ko";
    PORTUGUESE: "pt";
    PORTBRAZIL: "pt";
    RUSSIAN: "ru";
    THAI: "th";
    TURKISH: "tr";
    VIETNAMESE: "vi";
    ENGLISH: "en";
}

declare class ScriptException extends Error {
    plugin_type: string;
    message: string;

    constructor(type: string, msg?: string);
}

declare class ScriptLoginRequiredException extends ScriptException {
    constructor(msg: string);
}

declare class LoginRequiredException extends ScriptException {
    constructor(msg: string);
}

declare class CaptchaRequiredException extends Error {
    plugin_type: string;
    url: string;
    body: any;

    constructor(url: string, body: any);
}

declare class CriticalException extends ScriptException {
    constructor(msg: string);
}

declare class UnavailableException extends ScriptException {
    constructor(msg: string);
}

declare class AgeException extends ScriptException {
    constructor(msg: string);
}

declare class TimeoutException extends ScriptException {
    plugin_type: string;

    constructor(msg: string);
}

declare class ScriptImplementationException extends ScriptException {
    plugin_type: string;

    constructor(msg: string);
}

declare class ResultCapabilities {
    types: string[];
    sorts: string[];
    filters: FilterGroup[];

    constructor(types?: string[], sorts?: string[], filters?: FilterGroup[]);
}

declare class FilterGroup {
    name: string;
    filters: any[];
    isMultiSelect: boolean;
    id: any;

    constructor(name: string, filters: any[], isMultiSelect: boolean, id: any);
}

declare class FilterCapability {
    name: string;
    value: any;
    id: any;

    constructor(name: string, value: any, id: any);
}

declare class PlatformAuthorLink {
    id: PlatformID;
    name: string;
    url: string;
    thumbnail: string;
    subscribers?: any;
    membershipUrl?: string | null;

    constructor(id: PlatformID, name: string, url: string, thumbnail: string, subscribers?: any, membershipUrl?: string | null);
}

declare class PlatformAuthorMembershipLink {
    id: PlatformID;
    name: string;
    url: string;
    thumbnail: string;
    subscribers?: any;
    membershipUrl?: string | null;

    constructor(id: PlatformID, name: string, url: string, thumbnail: string, subscribers?: any, membershipUrl?: string | null);
}

declare class PlatformContent {
    contentType: number;
    id: PlatformID;
    name: string;
    thumbnails: Thumbnail[];
    author: PlatformAuthorLink;
    datetime: number;
    url: string;

    constructor(obj: any, type: number);
}

declare class PlatformContentDetails {
    contentType: number;

    constructor(type: number);
}

declare class PlatformNestedMediaContent extends PlatformContent {
    contentUrl: string;
    contentName: any;
    contentDescription: any;
    contentProvider: any;
    contentThumbnails: Thumbnails;

    constructor(obj: any);
}

declare class PlatformLockedContent extends PlatformContent {
    contentName: any;
    contentThumbnails: Thumbnails;
    unlockUrl: string;
    lockDescription: any;

    constructor(obj: any);
}

declare class PlatformVideo extends PlatformContent {
    plugin_type: string;
    shareUrl: any;
    duration: number;
    viewCount: number;
    isLive: boolean;

    constructor(obj: any);
}

declare class PlatformVideoDetails extends PlatformVideo {
    plugin_type: string;
    description: string;
    video: VideoSourceDescriptor;
    dash: any;
    hls: any;
    live: any;
    rating: any;
    subtitles: any[];

    constructor(obj: any);
}

declare class PlatformPost extends PlatformContent {
    plugin_type: string;
    thumbnails: any[];
    images: any[];
    description: string;

    constructor(obj: any);
}

declare class PlatformPostDetails extends PlatformPost {
    plugin_type: string;
    rating: any;
    textType: number;
    content: string;

    constructor(obj: any);
}

declare class VideoSourceDescriptor {
    plugin_type: string;
    isUnMuxed: boolean;
    videoSources: any[];

    constructor(obj: any);
}

declare class UnMuxVideoSourceDescriptor {
    plugin_type: string;
    isUnMuxed: boolean;
    videoSources: any[];
    audioSources: any[];

    constructor(videoSourcesOrObj: any, audioSources?: any);
}

declare class VideoUrlSource {
    plugin_type: string;
    width: number;
    height: number;
    container: string;
    codec: string;
    name: string;
    bitrate: number;
    duration: number;
    url: string;
    requestModifier?: any;

    constructor(obj: any);
}

declare class VideoUrlRangeSource extends VideoUrlSource {
    plugin_type: string;
    itagId: any;
    initStart: any;
    initEnd: any;
    indexStart: any;
    indexEnd: any;

    constructor(obj: any);
}

declare class AudioUrlSource {
    plugin_type: string;
    name: string;
    bitrate: number;
    container: string;
    codec: string;
    duration: number;
    url: string;
    language: Language;
    requestModifier?: any;

    constructor(obj: any);
}

declare class AudioUrlWidevineSource extends AudioUrlSource {
    plugin_type: string;
    bearerToken: any;
    licenseUri: any;

    constructor(obj: any);
}

declare class AudioUrlRangeSource extends AudioUrlSource {
    plugin_type: string;
    itagId: any;
    initStart: any;
    initEnd: any;
    indexStart: any;
    indexEnd: any;
    audioChannels: number;

    constructor(obj: any);
}

declare class HLSSource {
    plugin_type: string;
    name: string;
    duration: number;
    url: string;
    priority: boolean;
    language?: any;
    requestModifier?: any;

    constructor(obj: any);
}

declare class DashSource {
    plugin_type: string;
    name: string;
    duration: number;
    url: string;
    language?: any;
    requestModifier?: any;

    constructor(obj: any);
}

declare class RequestModifier {
    allowByteSkip: any;

    constructor(obj: any);
}

declare class PlatformChannel {
    plugin_type: string;
    id: string;
    name: string;
    thumbnail: string;
    banner: string;
    subscribers: number;
    description: string;
    url: string;
    urlAlternatives: string[];
    links: { [key: string]: string };

    constructor(obj: any);
}

declare class PlatformPlaylist extends PlatformContent {
    plugin_type: string;
    videoCount: number;
    thumbnail: any;

    constructor(obj: any);
}

declare class PlatformPlaylistDetails extends PlatformPlaylist {
    plugin_type: string;
    contents: any;

    constructor(obj: any);
}

declare class RatingLikes {
    type: number;
    likes: number;

    constructor(likes: number);
}

declare class RatingLikesDislikes {
    type: number;
    likes: number;
    dislikes: number;

    constructor(likes: number, dislikes: number);
}

declare class RatingScaler {
    type: number;
    value: any;

    constructor(value: any);
}

declare class PlatformComment {
    plugin_type: string;
    contextUrl: string;
    author: PlatformAuthorLink;
    message: string;
    rating: any;
    date: number;
    replyCount: number;
    context: any;

    constructor(obj: any);
}

declare class Comment extends PlatformComment {
    constructor(obj: any);
}

declare class PlaybackTracker {
    nextRequest: number;

    constructor(interval: number);

    setProgress(seconds: number): void;
}

declare class LiveEventPager {
    plugin_type: string;
    _entries: { [key: string]: any };

    constructor();

    delete(name: string): void;
    get(name: string): any;
    getAll(name: string): any[];
    has(name: string): boolean;
    set(name: string, value: any): void;
    forEach(callback: (value: any, name: string, pager: LiveEventPager) => void): void;
    keys(): IterableIterator<string>;
    values(): IterableIterator<any>;
    entries(): IterableIterator<[string, any]>;
    clear(): void;
}

declare class LiveEvent {
    plugin_type: string;
    id: string;
    name: string;
    description: string;
    startDate: number;
    endDate: number;
    thumbnail: string;
    state: number;
    upcomingText: string;
    viewCount: number;
    tracker: PlaybackTracker;
    rating: any;

    constructor(obj: any);
}
declare function throwException(type: string, message: string): void;