interface IDailymotionPluginSettings {
  hideSensitiveContent: boolean;
  preferredCountryOptionIndex: number;
  avatarSizeOptionIndex: number;
  thumbnailResolutionOptionIndex: number;
  videosPerPageOptionIndex: number;
  playlistsPerPageOptionIndex: number;
}

interface IDailymotionSubtitle {
  data: Map<string, string, { urls: string[]; label: string }>;
  enable: boolean;
}

interface IDictionary<T> {
  [key: string]: T;
}

interface IPlatformSystemPlaylist {
  pluginId: string;
  httpClient: IHttp;
  query: string;
  operationName: string;
  rootObject: string;
  playlistName: string;
  usePlatformAuth: boolean;
  thumbnailResolutionIndex: number;
}
