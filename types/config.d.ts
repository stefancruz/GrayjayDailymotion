interface IPluginConfig {
    name?: string;
    platformUrl?: string;
    description?: string;
    author?: string;
    authorUrl?: string;
    sourceUrl?: string;
    scriptUrl?: string;
    repositoryUrl?: string;
    version?: number;
    iconUrl?: string;
    id?: string;
    scriptSignature?: string;
    scriptPublicKey?: string;
    packages?: string[];
    allowEval?: boolean;
    allowUrls?: string[];
    settings?: Setting[];
  }
  
  interface Setting {
    variable?: string;
    name?: string;
    description?: string;
    type?: string;
    default?: string;
    options?: string[];
  }

  interface DailymotionPluginSettings {
    hideSensitiveContent?: boolean;
    preferredCountry?: number;
  }