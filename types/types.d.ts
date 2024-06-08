
interface IDailymotionPluginSettings {
    hideSensitiveContent?: boolean;
    preferredCountry?: number;
    avatarSize?: number;
    thumbnailResolution?: number;
}


interface IDailymotionSubtitle {
    data: Map<string, string, { urls: string[], label: string }>,
    enable: boolean
}