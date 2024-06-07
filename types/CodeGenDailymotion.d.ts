import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Any: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Time: { input: any; output: any; }
};

/** The possible account types for a channel. */
export enum AccountType {
  /** A partner account type. */
  Partner = 'PARTNER',
  /** A verified partner account type. */
  VerifiedPartner = 'VERIFIED_PARTNER'
}

/** The input fields to activate a user. */
export type ActivateUserInput = {
  /** The activation key received in the email. */
  activationKey: Scalars['String']['input'];
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The email of the user to activate. */
  email: Scalars['String']['input'];
};

/** The return fields from activating a user. */
export type ActivateUserPayload = {
  __typename?: 'ActivateUserPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to add a video to a collection. */
export type AddCollectionVideoInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion ID of the collection. */
  collectionXid: Scalars['String']['input'];
  /** The Dailymotion ID of the video. */
  videoXid: Scalars['String']['input'];
};

/** The return fields from adding a video to a collection. */
export type AddCollectionVideoPayload = {
  __typename?: 'AddCollectionVideoPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to add a video to the `WatchLater` list of the connected user. */
export type AddWatchLaterVideoInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion ID of the video. */
  videoXid: Scalars['String']['input'];
};

/** The return fields from adding a video to the `WatchLater` list of the connected user. */
export type AddWatchLaterVideoPayload = {
  __typename?: 'AddWatchLaterVideoPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** Information about the algorithm used to retrieve data. */
export type Algorithm = {
  __typename?: 'Algorithm';
  /** Name of the algorithm. */
  name?: Maybe<Scalars['String']['output']>;
  /** Unique ID of the algorithm. */
  uuid?: Maybe<Scalars['String']['output']>;
  /** Version of the algorithm. */
  version?: Maybe<Scalars['String']['output']>;
};

/** The possible values for the name of algorithm. */
export enum AlgorithmName {
  /** An algorithm that considers what content to feature. */
  Featured = 'FEATURED',
  /** A sponsored algorithm. */
  Sponsored = 'SPONSORED'
}

/** The available input fields of a post operator. */
export type AlgorithmNameOperator = {
  /** Short for equal, must match the given data exactly. */
  eq?: InputMaybe<AlgorithmName>;
};

/** Represents the various forms of analytics. */
export type Analytics = Node & {
  __typename?: 'Analytics';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Analytics for a key performance indicator metric. */
  kpi: AnalyticsFlatPayload;
  /** A selection of analytics aggregated over time. */
  timeSeries: AnalyticsPayload;
  /** A selection of top values of analytics aggregated over some dimensions. */
  topValues: AnalyticsPayload;
};


/** Represents the various forms of analytics. */
export type AnalyticsKpiArgs = {
  cumulative?: InputMaybe<Scalars['Boolean']['input']>;
  filter: AnalyticsFilter;
  metric: AnalyticsMetric;
  percentageChange?: InputMaybe<Scalars['Boolean']['input']>;
  timePeriod: AnalyticsTimePeriod;
};


/** Represents the various forms of analytics. */
export type AnalyticsTimeSeriesArgs = {
  cumulative?: InputMaybe<Scalars['Boolean']['input']>;
  dimension?: InputMaybe<Scalars['String']['input']>;
  filter: AnalyticsFilter;
  limit?: InputMaybe<Scalars['Int']['input']>;
  metrics: Array<AnalyticsMetric>;
  previousTimePeriod?: InputMaybe<Scalars['Boolean']['input']>;
  timePeriod: AnalyticsTimePeriod;
};


/** Represents the various forms of analytics. */
export type AnalyticsTopValuesArgs = {
  cumulative?: InputMaybe<Scalars['Boolean']['input']>;
  dimensions: Array<Scalars['String']['input']>;
  filter: AnalyticsFilter;
  limit: Scalars['Int']['input'];
  metrics: Array<AnalyticsMetric>;
  orderBy?: InputMaybe<AnalyticsOrderBy>;
  timePeriod: AnalyticsTimePeriod;
};

/** The input fields of an analytics filter. */
export type AnalyticsFilter = {
  /** Filter analytics by the name of the field. */
  field?: InputMaybe<Scalars['String']['input']>;
  /** Filter analytics by the logical operator. */
  operator: AnalyticsFilterOperator;
  /** Filter analytics by the value of the field. */
  value?: InputMaybe<Scalars['String']['input']>;
  /** Filter analtyics by a combination of OR/AND operators. */
  values?: InputMaybe<Array<AnalyticsFilter>>;
};

/** The possible filter operators for analytics. */
export enum AnalyticsFilterOperator {
  /** Identify values that meet all criteria for a set of filters. */
  And = 'AND',
  /** Identify values that meet at least one criteria for a set of filters. */
  Or = 'OR',
  /** Identify values equal to the value provided in a filter. */
  Selector = 'SELECTOR'
}

/** Analytics not grouped by a dimension. */
export type AnalyticsFlatPayload = AnalyticsPayload & {
  __typename?: 'AnalyticsFlatPayload';
  /** The names of the analytics fields. */
  fields: Array<Scalars['String']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The values associated with each analytic field. */
  values: Array<Maybe<Array<Maybe<Scalars['Any']['output']>>>>;
};

/** Analytics grouped by a dimension. */
export type AnalyticsGroupedPayload = AnalyticsPayload & {
  __typename?: 'AnalyticsGroupedPayload';
  /** The names of the analytics fields. */
  fields: Array<Scalars['String']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Analytics for each dimension value. */
  values: Array<AnalyticsGroupedPayloadItem>;
};

/** Analytics for a single dimension value. */
export type AnalyticsGroupedPayloadItem = Node & {
  __typename?: 'AnalyticsGroupedPayloadItem';
  /** The value of the selected dimension. */
  field: Scalars['String']['output'];
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The values associated with the given dimension value. */
  values: Array<Maybe<Array<Maybe<Scalars['Any']['output']>>>>;
};

/** The input fields of an analytics metric. */
export type AnalyticsMetric = {
  /** The field selection for the metric. */
  field: Scalars['String']['input'];
  /** The aggregate function for the metric. */
  function: AnalyticsMetricFunction;
};

/** The possible functions available to aggregate a metric. */
export enum AnalyticsMetricFunction {
  /** Calculates the average value of a field. */
  Avg = 'AVG',
  /** Calculates the maximum value of a field. */
  Max = 'MAX',
  /** Calculates the minimum value of a field. */
  Min = 'MIN',
  /** Calculates the total value of a field. */
  Sum = 'SUM'
}

/** The input fields of an analytics order by. */
export type AnalyticsOrderBy = {
  /** Order by ascending or descending direction. Defaults to desc. */
  direction?: InputMaybe<OrderDirection>;
  /** Order analytics by a given metric. */
  field: Scalars['String']['input'];
};

/** Represents a generic analytics payload. */
export type AnalyticsPayload = {
  /** The names of the analytic fields. */
  fields: Array<Scalars['String']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

/** An analytics report of a channel or an organization. */
export type AnalyticsReport = Node & {
  __typename?: 'AnalyticsReport';
  /** The Dailymotion ID of the channel in the report. */
  channelXid?: Maybe<Scalars['String']['output']>;
  /** The creation date of the report. */
  createdAt?: Maybe<Scalars['Date']['output']>;
  /** The Dailymotion user who created the report. */
  creator?: Maybe<User>;
  /** The download links of the report. */
  downloadLinks?: Maybe<ReportFileDownloadLinkConnection>;
  /** The end date of the data analyzed in the report. */
  endDate?: Maybe<Scalars['Date']['output']>;
  /** Indicates whether the report has revenue info. */
  hasRevenueInfo?: Maybe<Scalars['Boolean']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The name of the report. */
  name?: Maybe<Scalars['String']['output']>;
  /** The Dailymotion ID of the organization in the report. */
  organizationXid?: Maybe<Scalars['String']['output']>;
  /** The token identifying the report. */
  reportToken?: Maybe<Scalars['String']['output']>;
  /** The start date of the data to be analyzed in the report. */
  startDate?: Maybe<Scalars['Date']['output']>;
  /** The status of the report. */
  status?: Maybe<AnalyticsReportStatus>;
};


/** An analytics report of a channel or an organization. */
export type AnalyticsReportDownloadLinksArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** The connection type for an Analytics Report. */
export type AnalyticsReportConnection = {
  __typename?: 'AnalyticsReportConnection';
  /** A list of edges. */
  edges: Array<Maybe<AnalyticsReportEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** The input fields of creating an analytics report. */
export type AnalyticsReportCreateInput = {
  /** The Dailymotion ID of the channel for the report. */
  channelXid: Scalars['String']['input'];
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /**
   * The dimensions used to aggregate data.
   *   Each row in the report will be unique based on combination of these dimensions.
   */
  dimensions: Array<InputMaybe<PartnerReportDimension>>;
  /** The end date of the data to be analyzed for the report. */
  endDate: Scalars['Date']['input'];
  /** The filters to create the report. */
  filters?: InputMaybe<AnalyticsReportFilters>;
  /** The measurements to aggregate the data based on the selected dimensions. */
  metrics: Array<InputMaybe<PartnerReportMetric>>;
  /** The name of the report. */
  name: Scalars['String']['input'];
  /** Indicate whether or not to notify when a report has been created. */
  notify?: InputMaybe<Scalars['Boolean']['input']>;
  /** Order the result of the report. Defaults to desc. */
  orderBy?: InputMaybe<AnalyticsReportOrderBy>;
  /** The Dailymotion ID of the organization for the report. */
  organizationXid: Scalars['String']['input'];
  /** The Dailymotion product that the data is collected and attributed against. */
  product?: InputMaybe<PartnerReportProduct>;
  /** The start date of the data to be analyzed for the report. */
  startDate: Scalars['Date']['input'];
};

/** The return fields from creating a custom report. */
export type AnalyticsReportCreatePayload = {
  __typename?: 'AnalyticsReportCreatePayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The analytics report that is being created. */
  report?: Maybe<AnalyticsReport>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** An edge in a connection. */
export type AnalyticsReportEdge = {
  __typename?: 'AnalyticsReportEdge';
  /** The item at the end of the edge. */
  node?: Maybe<AnalyticsReport>;
};

/** The input fields of an analytics report filter. */
export type AnalyticsReportFilters = {
  /** Filter analytics reports by a channel slug. */
  channelSlug?: InputMaybe<Scalars['String']['input']>;
  /** Filter analytics reports by a media type. */
  mediaType?: InputMaybe<MediaType>;
  /** Filter analytics reports by a monetization type. */
  monetizationType?: InputMaybe<PartnerReportFilterMonetizationType>;
  /** Filter analytics reports by a video owner channel slug. */
  videoOwnerChannelSlug?: InputMaybe<Scalars['String']['input']>;
  /** Filter analytics reports by a visitor domain group. */
  visitorDomainGroup?: InputMaybe<Scalars['String']['input']>;
};

/** The input fields of an analytics report order by. */
export type AnalyticsReportOrderBy = {
  /** Order by ascending or descending direction. Defaults to desc. */
  direction?: InputMaybe<OrderDirection>;
  /** Order analytics report by a given metric. */
  field: PartnerReportMetric;
};

/** The possible values for the status of generating a report. */
export enum AnalyticsReportStatus {
  /** The report link is no longer available. */
  Expired = 'EXPIRED',
  /** The report generation has failed. */
  Failed = 'FAILED',
  /** The report generation is finished. */
  Finished = 'FINISHED',
  /** The report generation is in progress. */
  Processing = 'PROCESSING'
}

/** The input fields of an analytics time period. */
export type AnalyticsTimePeriod = {
  /** The end time of the data to be selected. */
  endTime: Scalars['DateTime']['input'];
  /** The time frequency of the data to be selected. This is either an ISO 8601 duration or one of (`MINUTE`, `HOUR`, `DAY`, `MONTH`). */
  frequency: Scalars['String']['input'];
  /** The start time of the data to be selected. */
  startTime: Scalars['DateTime']['input'];
};

/**
 *
 * Informations used to submit an appeal
 *
 */
export type AppealApplication = {
  __typename?: 'AppealApplication';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Target moderation action for the appeal */
  moderationAction: ModerationAction;
  /** List of available appeal reasons related to the action */
  reasons: Array<AppealReason>;
};

/**
 *
 * The possible values for an appeal reason, based on requester's information
 *
 */
export enum AppealReason {
  /** Available if requester is content owner and related content is channel. */
  ReinstateAccount = 'REINSTATE_ACCOUNT',
  /** Available if requester is content owner and related content is media. */
  ReinstateContent = 'REINSTATE_CONTENT',
  /** Available if requester is an reporter and related content is media. */
  RemoveContent = 'REMOVE_CONTENT',
  /** Available if requester is content owner and related content is media. */
  RestoreMonetization = 'RESTORE_MONETIZATION',
  /** Available if requester is an reporter and related content is media. */
  RestrictContent = 'RESTRICT_CONTENT',
  /** Available if requester is content owner and related content is media. */
  UnrestrictContent = 'UNRESTRICT_CONTENT'
}

/** The input fields to ask a partner report file. */
export type AskPartnerReportFileInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /**
   * The dimensions used to aggregate data.
   *   Each row in the report will be unique based on combination of these dimensions.
   */
  dimensions: Array<InputMaybe<PartnerReportDimension>>;
  /** The end date of the data to be analyzed for the report. */
  endDate: Scalars['DateTime']['input'];
  /** The filters to create the report. */
  filters?: InputMaybe<PartnerReportFilters>;
  /** The measurements to aggregate the data based on the selected dimensions. */
  metrics: Array<InputMaybe<PartnerReportMetric>>;
  /** The Dailymotion product that the data is collected and attributed against. */
  product?: InputMaybe<PartnerReportProduct>;
  /** The start date of the data to be analyzed for the report. */
  startDate: Scalars['DateTime']['input'];
};

/** The return fields from asking a partner report file. */
export type AskPartnerReportFilePayload = {
  __typename?: 'AskPartnerReportFilePayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Custom report in progress of generation. */
  reportFile?: Maybe<PartnerReportFile>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** Information about an attribute of a metadata. */
export type Attribute = Node & {
  __typename?: 'Attribute';
  /** The content of the attribute. */
  content?: Maybe<Scalars['String']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The name of the attribute. */
  name?: Maybe<Scalars['String']['output']>;
};

/** The connection type for Attribute. */
export type AttributeConnection = {
  __typename?: 'AttributeConnection';
  /** A list of edges. */
  edges: Array<Maybe<AttributeEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type AttributeEdge = {
  __typename?: 'AttributeEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Attribute>;
};

/** The available input fields of an AutoSuggestion filter. */
export type AutoSuggestionFilter = {
  /** Filter suggestions by story type, allowed values = `VIDEO`. */
  story?: InputMaybe<StoryOperator>;
};

/** The available height sizes for an Avatar. */
export enum AvatarHeight {
  /** A square image of 25px. */
  Square_25 = 'SQUARE_25',
  /** A square image of 60px. */
  Square_60 = 'SQUARE_60',
  /** A square image of 80px. */
  Square_80 = 'SQUARE_80',
  /** A square image of 120px. */
  Square_120 = 'SQUARE_120',
  /** A square image of 190px. */
  Square_190 = 'SQUARE_190',
  /** A square image of 240px. */
  Square_240 = 'SQUARE_240',
  /** A square image of 360px. */
  Square_360 = 'SQUARE_360',
  /** A square image of 480px. */
  Square_480 = 'SQUARE_480',
  /** A square image of 720px. */
  Square_720 = 'SQUARE_720'
}

/** The available height for an Banner. */
export enum BannerHeight {
  /** A portrait image with 100px */
  Portrait_100 = 'PORTRAIT_100',
  /** A portrait image with 150px */
  Portrait_150 = 'PORTRAIT_150',
  /** A portrait image with 200px */
  Portrait_200 = 'PORTRAIT_200',
  /** A portrait image with 210px */
  Portrait_210 = 'PORTRAIT_210',
  /** A portrait image with 250px */
  Portrait_250 = 'PORTRAIT_250',
  /** A portrait image with 375px */
  Portrait_375 = 'PORTRAIT_375'
}

/** The available width for an Banner. */
export enum BannerWidth {
  /** A landscape image with 375px */
  Landscape_375 = 'LANDSCAPE_375',
  /** A landscape image with 720px */
  Landscape_720 = 'LANDSCAPE_720',
  /** A landscape image with 1024px */
  Landscape_1024 = 'LANDSCAPE_1024',
  /** A landscape image with 1920px */
  Landscape_1920 = 'LANDSCAPE_1920'
}

/** Represents the interface to Flipper. */
export type Behavior = Node & {
  __typename?: 'Behavior';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The experiments (A/B testing) that are matched/enabled for the connected client. */
  matchedExperiments?: Maybe<ExperimentMatchConnection>;
  /** The features that are matched/enabled for the connected client. */
  matchedFeatures?: Maybe<FeatureMatchConnection>;
  /** The available rules. */
  rules?: Maybe<RuleConnection>;
};


/** Represents the interface to Flipper. */
export type BehaviorMatchedExperimentsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Represents the interface to Flipper. */
export type BehaviorMatchedFeaturesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Represents the interface to Flipper. */
export type BehaviorRulesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  names?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Represents a tag added to a media. */
export type BehaviorRuleTag = Node & {
  __typename?: 'BehaviorRuleTag';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The label of the tag. */
  label?: Maybe<Scalars['String']['output']>;
};

/** The connection type for BehaviorRuleTag. */
export type BehaviorRuleTagConnection = {
  __typename?: 'BehaviorRuleTagConnection';
  /** A list of edges. */
  edges: Array<Maybe<BehaviorRuleTagEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type BehaviorRuleTagEdge = {
  __typename?: 'BehaviorRuleTagEdge';
  /** The item at the end of the edge. */
  node?: Maybe<BehaviorRuleTag>;
};

/** The available input fields of a Bookmark filter. */
export type BookmarkFilter = {
  /** Filter bookmarks by bookmark. */
  bookmark: BookmarkOperator;
  /** Filter bookmarks by post. */
  post?: InputMaybe<PostOperator>;
};

/** The node at the end of a BookmarksMetricEdge. */
export type BookmarkMetric = Metric & {
  __typename?: 'BookmarkMetric';
  /** The bookmark metric being measured. */
  bookmark: BookmarkTypename;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total count of the bookmark metric. A null value indicates that it is hidden or not available. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The connection type for a BookmarkMetric. */
export type BookmarkMetricConnection = {
  __typename?: 'BookmarkMetricConnection';
  /** A list of edges. */
  edges: Array<Maybe<BookmarkMetricEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type BookmarkMetricEdge = {
  __typename?: 'BookmarkMetricEdge';
  /** The item at the end of the edge. */
  node?: Maybe<BookmarkMetric>;
};

/** The available input fields of a bookmark operator. */
export type BookmarkOperator = {
  /** Short for equal, must match the given data exactly. */
  eq?: InputMaybe<BookmarkTypename>;
};

/** The available typenames for a Bookmark. */
export enum BookmarkTypename {
  /** A bookmark that represents a `favorite`. */
  Favorite = 'FAVORITE',
  /** A bookmark that represents a `like`. */
  Like = 'LIKE',
  /** A bookmark that represents a `save`. */
  Save = 'SAVE'
}

/** The available input fields of for a Boolean operator. */
export type BooleanOperator = {
  /** Short for equal, must match the given data exactly. */
  eq: Scalars['Boolean']['input'];
};

/** Information about a category. */
export type Category = {
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The name of the category. */
  name: Scalars['String']['output'];
};

/** The connection type for Category. */
export type CategoryConnection = {
  __typename?: 'CategoryConnection';
  /** A list of edges. */
  edges: Array<Maybe<CategoryEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type CategoryEdge = {
  __typename?: 'CategoryEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Category>;
};

/** The available input fields of a Category filter. */
export type CategoryFilter = {
  category: CategoryOperator;
};

/** The available input fields of a Category operator. */
export type CategoryOperator = {
  /** Short for equal, must match the given data exactly. */
  eq?: InputMaybe<CategoryTypename>;
};

/** The available types of categories. */
export enum CategoryTypename {
  /** A content category. */
  ContentCategory = 'CONTENT_CATEGORY',
  /** A curated category. */
  CuratedCategory = 'CURATED_CATEGORY',
  /** An interest category. */
  InterestCategory = 'INTEREST_CATEGORY'
}

/** A channel manages medias and collections. */
export type Channel = Node & {
  __typename?: 'Channel';
  /** The account type of the channel. Its value is one of the following: verified-partner, partner or viewer. */
  accountType?: Maybe<Scalars['String']['output']>;
  /** The URL of the avatar image. */
  avatar?: Maybe<Image>;
  /** The URL of the banner image. */
  banner?: Maybe<Image>;
  /** The bookmarked posts of the channel. */
  bookmarks?: Maybe<LikeConnection>;
  /** Indicates whether the channel name can be changed. */
  canChangeName?: Maybe<Scalars['Boolean']['output']>;
  /** The collections of the channel. */
  collections?: Maybe<CollectionConnection>;
  /** The country of the channel. */
  country?: Maybe<Country>;
  /**
   * The URL of the cover image.
   * @deprecated Use `banner` field.
   */
  coverURL?: Maybe<Scalars['String']['output']>;
  /** The description of the channel. */
  description?: Maybe<Scalars['String']['output']>;
  /** The display name of the channel. */
  displayName?: Maybe<Scalars['String']['output']>;
  /** The external links of the channel. */
  externalLinks?: Maybe<ChannelExternalLinks>;
  /** The follower engagement information of the channel. */
  followerEngagement?: Maybe<FollowerEngagement>;
  /** The users that are following the channel. */
  followers?: Maybe<FollowerConnection>;
  /** The users the channel is following. */
  followings?: Maybe<FollowingConnection>;
  /** The history of the posts interacted by the channel. */
  history?: Maybe<HistoryConnection>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates whether the channel is associated to an artist. */
  isArtist?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the channel is available. */
  isAvailable?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates whether the channel is followed by the user connected. Returns `False` if no user is connected.
   * @deprecated Use `channel.followerEngagement` field.
   */
  isFollowed?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates whether the channel's notification is enabled the user connected. Returns `False` if no user is connected.
   * @deprecated Use `followerEngagement.notifications` field.
   */
  isNotificationEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** The language of the channel. */
  language?: Maybe<Language>;
  /** The lives of the channel. */
  lives?: Maybe<LiveConnection>;
  /**
   * The URL of the logo image.
   * @deprecated Use `avatar` field.
   */
  logoURL?: Maybe<Scalars['String']['output']>;
  /** The medias of the channel. */
  medias?: Maybe<MediaConnection>;
  /**
   * The metabase iframe url of the non-verified channel.
   * @deprecated No longer supported.
   */
  metabaseIframeURL?: Maybe<Scalars['String']['output']>;
  /** The metrics of the channel. */
  metrics?: Maybe<ChannelMetrics>;
  /** The name of the channel. */
  name?: Maybe<Scalars['String']['output']>;
  /** The network channels of the channel. */
  networkChannels?: Maybe<ChannelConnection>;
  /** The organization the channel belongs to. */
  organization?: Maybe<Organization>;
  /** The reactions created by the channel. */
  reactions?: Maybe<ReactionConnection>;
  /** The share urls of the channel. */
  shareUrls?: Maybe<ChannelShareUrls>;
  /**
   * The stats of the channel.
   * @deprecated Use `metrics` field.
   */
  stats?: Maybe<ChannelStats>;
  /** The tagline of the channel. */
  tagline?: Maybe<Scalars['String']['output']>;
  /**
   * The thumbnails associated to the channel.
   * @deprecated Use `logolURL` field.
   */
  thumbnails?: Maybe<Thumbnails>;
  /** The videos of the channel. */
  videos?: Maybe<VideoConnection>;
  /**
   * The total number of views of the channel.
   * @deprecated Use `stats.views.total` field.
   */
  viewCount?: Maybe<Scalars['BigInt']['output']>;
  /** The Dailymotion ID of the channel. */
  xid: Scalars['String']['output'];
};


/** A channel manages medias and collections. */
export type ChannelAvatarArgs = {
  height: AvatarHeight;
};


/** A channel manages medias and collections. */
export type ChannelBannerArgs = {
  height?: InputMaybe<BannerHeight>;
  width?: InputMaybe<BannerWidth>;
};


/** A channel manages medias and collections. */
export type ChannelBookmarksArgs = {
  filter?: InputMaybe<BookmarkFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** A channel manages medias and collections. */
export type ChannelCollectionsArgs = {
  createdAfter?: InputMaybe<Scalars['Date']['input']>;
  createdBefore?: InputMaybe<Scalars['Date']['input']>;
  filter?: InputMaybe<CollectionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hasPublicVideos?: InputMaybe<Scalars['Boolean']['input']>;
  isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** A channel manages medias and collections. */
export type ChannelCoverUrlArgs = {
  size: Scalars['String']['input'];
};


/** A channel manages medias and collections. */
export type ChannelFollowersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** A channel manages medias and collections. */
export type ChannelFollowingsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** A channel manages medias and collections. */
export type ChannelHistoryArgs = {
  filter: HistoryFilter;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** A channel manages medias and collections. */
export type ChannelLivesArgs = {
  allowExplicit?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<LiveFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  isOnAir?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  startIn?: InputMaybe<Scalars['Int']['input']>;
};


/** A channel manages medias and collections. */
export type ChannelLogoUrlArgs = {
  size: Scalars['String']['input'];
};


/** A channel manages medias and collections. */
export type ChannelMediasArgs = {
  allowExplicit?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  isOnAir?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ChannelMediasSort>;
  startIn?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  topicXids?: InputMaybe<Array<Scalars['String']['input']>>;
  types?: InputMaybe<Array<InputMaybe<MediaType>>>;
};


/** A channel manages medias and collections. */
export type ChannelMetabaseIframeUrlArgs = {
  dashboardId: Scalars['Int']['input'];
};


/** A channel manages medias and collections. */
export type ChannelNetworkChannelsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  hasPublicVideos?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<NetworkChannelsSort>;
};


/** A channel manages medias and collections. */
export type ChannelReactionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** A channel manages medias and collections. */
export type ChannelVideosArgs = {
  allowExplicit?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<VideoFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  topicXids?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** The connection type for Channel. */
export type ChannelConnection = {
  __typename?: 'ChannelConnection';
  /** A list of edges. */
  edges: Array<Maybe<ChannelEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** The input fields to create a channel. */
export type ChannelCreateInput = {
  /** The URL of the avatar of the channel. @deprecated(reason: "Use input field `avatarUrl`.") */
  avatarURL?: InputMaybe<Scalars['String']['input']>;
  /** The url of the avatar of the channel. */
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  /** The URL of the banner image of the channel. */
  bannerURL?: InputMaybe<Scalars['String']['input']>;
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The country of the channel. */
  country: Scalars['String']['input'];
  /** The URL of the cover image of the channel. */
  coverURL?: InputMaybe<Scalars['String']['input']>;
  /** The display name of the channel. */
  displayName: Scalars['String']['input'];
  /** The language of the channel. */
  language: Scalars['String']['input'];
  /** The URL of the logo image of the channel. */
  logoURL?: InputMaybe<Scalars['String']['input']>;
  /** The name of the channel. */
  name: Scalars['String']['input'];
  /** The Dailymotion ID of the organization creating the channel. */
  organizationXid: Scalars['String']['input'];
};

/** The return fields from creating a channel. */
export type ChannelCreatePayload = {
  __typename?: 'ChannelCreatePayload';
  /** The new channel. */
  channel?: Maybe<Channel>;
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** An edge in a connection. */
export type ChannelEdge = {
  __typename?: 'ChannelEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Channel>;
  /** Information about the permission for the user connected to the channel. */
  permission?: Maybe<ChannelPermission>;
};

/** The engagement metrics of a Channel. */
export type ChannelEngagementMetrics = Node & {
  __typename?: 'ChannelEngagementMetrics';
  /** The bookmark metrics of the channel. */
  bookmarks?: Maybe<BookmarkMetricConnection>;
  /** The collection metrics of the channel. */
  collections?: Maybe<CollectionMetricConnection>;
  /** The follower metrics of the channel. */
  followers?: Maybe<ChannelMetricConnection>;
  /** The following metrics of the channel. */
  followings?: Maybe<ChannelMetricConnection>;
  /** The history metrics of the channel. */
  history?: Maybe<PostMetricConnection>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The live metrics of the channel. */
  lives?: Maybe<LiveMetricConnection>;
  /** The reaction metrics of the channel. */
  reactions?: Maybe<ReactionMetricConnection>;
  /** The video metrics of the channel. */
  videos?: Maybe<VideoMetricConnection>;
};


/** The engagement metrics of a Channel. */
export type ChannelEngagementMetricsBookmarksArgs = {
  filter?: InputMaybe<BookmarkFilter>;
};


/** The engagement metrics of a Channel. */
export type ChannelEngagementMetricsCollectionsArgs = {
  filter?: InputMaybe<CollectionFilter>;
};


/** The engagement metrics of a Channel. */
export type ChannelEngagementMetricsHistoryArgs = {
  filter: HistoryFilter;
};


/** The engagement metrics of a Channel. */
export type ChannelEngagementMetricsLivesArgs = {
  filter?: InputMaybe<LiveFilter>;
};


/** The engagement metrics of a Channel. */
export type ChannelEngagementMetricsVideosArgs = {
  filter?: InputMaybe<VideoFilter>;
};

/** The external links of the channel. */
export type ChannelExternalLinks = Node & {
  __typename?: 'ChannelExternalLinks';
  /** The Facebook profile URL of the channel. */
  facebookURL?: Maybe<Scalars['String']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The Instagram profile URL of the channel. */
  instagramURL?: Maybe<Scalars['String']['output']>;
  /** The Pinterest profile URL of the channel. */
  pinterestURL?: Maybe<Scalars['String']['output']>;
  /** The Twitter profile URL of the channel. */
  twitterURL?: Maybe<Scalars['String']['output']>;
  /** The website URL of the channel. */
  websiteURL?: Maybe<Scalars['String']['output']>;
};

/** The input fields to update the external links of a channel. */
export type ChannelExternalLinksInput = {
  /** The Facebook profile URL of the channel. */
  facebookURL?: InputMaybe<Scalars['String']['input']>;
  /** The Instagram profile URL of the channel. */
  instagramURL?: InputMaybe<Scalars['String']['input']>;
  /** The Pinterest profile URL of the channel. */
  pinterestURL?: InputMaybe<Scalars['String']['input']>;
  /** The Twitter profile URL of the channel. */
  twitterURL?: InputMaybe<Scalars['String']['input']>;
  /** The website URL of the channel. */
  websiteURL?: InputMaybe<Scalars['String']['input']>;
};

/** The possible values which channel media connections can be sorted by. */
export enum ChannelMediasSort {
  /** Sort channel medias by most recent. */
  Recent = 'RECENT',
  /** Sort channel medias by most viewed. */
  Visited = 'VISITED'
}

/** The node at the end of a ChannelMetricEdge. */
export type ChannelMetric = Metric & {
  __typename?: 'ChannelMetric';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total count of the channel metric. A null value indicates that it is hidden or not available. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The connection type for a ChannelMetric. */
export type ChannelMetricConnection = {
  __typename?: 'ChannelMetricConnection';
  /** A list of edges. */
  edges: Array<Maybe<ChannelMetricEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type ChannelMetricEdge = {
  __typename?: 'ChannelMetricEdge';
  /** The item at the end of the edge. */
  node?: Maybe<ChannelMetric>;
};

/** The metrics of a Channel. */
export type ChannelMetrics = Node & {
  __typename?: 'ChannelMetrics';
  /** The engagement metrics of a channel. */
  engagement?: Maybe<ChannelEngagementMetrics>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

/** Information about the permission of the connected user to the channel. */
export type ChannelPermission = {
  __typename?: 'ChannelPermission';
  /** The permission level of connected user to the channel. */
  level?: Maybe<ChannelPermissionLevel>;
};

/** The possible permissions for a user connected to a channel in an organization. */
export enum ChannelPermissionLevel {
  /** The user is owner of the channel. */
  Owner = 'OWNER',
  /** The user is a reader of the channel. */
  Reader = 'READER'
}

/** Information about the share urls of a Channel. */
export type ChannelShareUrls = Node & ShareUrls & {
  __typename?: 'ChannelShareUrls';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The permalink share url of the channel. */
  permalink: Scalars['String']['output'];
};

/** Information about the stats of a channel. */
export type ChannelStats = Node & {
  __typename?: 'ChannelStats';
  /** The follower stats of the channel. */
  followers?: Maybe<ChannelStatsFollowers>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The reaction stats of the channel. */
  reactions?: Maybe<ChannelStatsReactions>;
  /** The video stats of the channel. */
  videos?: Maybe<ChannelStatsVideos>;
  /** The view stats of the channel. */
  views?: Maybe<ChannelStatsViews>;
};

/** The follower stats of the channel. */
export type ChannelStatsFollowers = Node & {
  __typename?: 'ChannelStatsFollowers';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of followers of the channel. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The reaction stats of the channel. */
export type ChannelStatsReactions = Node & {
  __typename?: 'ChannelStatsReactions';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of reactions of the channel. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The video stats of the channel. */
export type ChannelStatsVideos = Node & {
  __typename?: 'ChannelStatsVideos';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of videos of the channel. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The view stats of the channel. */
export type ChannelStatsViews = Node & {
  __typename?: 'ChannelStatsViews';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of views of the channel. */
  total?: Maybe<Scalars['BigInt']['output']>;
};

/** The possible sort options for channels. */
export enum ChannelsSort {
  /** Sort by popular. */
  Popular = 'POPULAR',
  /** Sort by recent. */
  Recent = 'RECENT'
}

/** The input fields to clear the medias of a collection. */
export type ClearCollectionMediasInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion ID of the collection. */
  collectionXid: Scalars['String']['input'];
};

/** The return fields from clearing all medias from a collection. */
export type ClearCollectionMediasPayload = {
  __typename?: 'ClearCollectionMediasPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to clear the liked videos of the connected user. */
export type ClearLikedVideosInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The return fields from clearing the liked videos of the connected user. */
export type ClearLikedVideosPayload = {
  __typename?: 'ClearLikedVideosPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to clear the `WatchLater` list of the connected user. */
export type ClearWatchLaterVideosInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The return fields from clearing the `WatchLater` list of the connected user. */
export type ClearWatchLaterVideosPayload = {
  __typename?: 'ClearWatchLaterVideosPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to clear the `Watched` list of the connected user. */
export type ClearWatchedVideosInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The return fields from clearing the `Watched` list of the connected user. */
export type ClearWatchedVideosPayload = {
  __typename?: 'ClearWatchedVideosPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** A collection manages medias. */
export type Collection = Content & Node & {
  __typename?: 'Collection';
  /**
   * The channel that created the collection.
   * @deprecated Use `creator` field.
   */
  channel?: Maybe<Channel>;
  /** The creation date (DateTime ISO8601) of the collection. */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** The creator that created the Collection. */
  creator?: Maybe<Channel>;
  /** The description of the collection. */
  description?: Maybe<Scalars['String']['output']>;
  /** The hashtags of the collection. */
  hashtags?: Maybe<HashtagConnection>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates whether this collection is featured in `daily_picks`. */
  isFeatured?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the collection is private. */
  isPrivate?: Maybe<Scalars['Boolean']['output']>;
  /** The medias of the collection. */
  medias?: Maybe<MediaConnection>;
  /** The metrics of the collection. */
  metrics?: Maybe<CollectionMetrics>;
  /** The name of the collection. */
  name?: Maybe<Scalars['String']['output']>;
  /**
   * The stats of the collection.
   * @deprecated Use `metrics` field.
   */
  stats?: Maybe<CollectionStats>;
  /** The URL of the thumbnail image. */
  thumbnail?: Maybe<Image>;
  /**
   * The URL of the thumbnail image.
   * @deprecated Use `thumbnail` field.
   */
  thumbnailURL?: Maybe<Scalars['String']['output']>;
  /**
   * The thumbnails of the collection.
   * @deprecated Use `thumbnailURL` field.
   */
  thumbnails?: Maybe<Thumbnails>;
  /** The updated date (DateTime ISO8601) of the collection. */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** The videos of the collection. */
  videos?: Maybe<VideoConnection>;
  /** The Dailymotion ID of the collection. */
  xid: Scalars['String']['output'];
};


/** A collection manages medias. */
export type CollectionHashtagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** A collection manages medias. */
export type CollectionMediasArgs = {
  allowExplicit?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  types?: InputMaybe<Array<InputMaybe<MediaType>>>;
};


/** A collection manages medias. */
export type CollectionThumbnailArgs = {
  height: ThumbnailHeight;
};


/** A collection manages medias. */
export type CollectionThumbnailUrlArgs = {
  size: Scalars['String']['input'];
};


/** A collection manages medias. */
export type CollectionVideosArgs = {
  allowExplicit?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<VideoFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** The connection type for Collection. */
export type CollectionConnection = {
  __typename?: 'CollectionConnection';
  /** A list of edges. */
  edges: Array<Maybe<CollectionEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type CollectionEdge = {
  __typename?: 'CollectionEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Collection>;
};

/** The engagement metrics of a Collection. */
export type CollectionEngagementMetrics = Node & {
  __typename?: 'CollectionEngagementMetrics';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The video metrics of the collection. */
  videos?: Maybe<VideoMetricConnection>;
};


/** The engagement metrics of a Collection. */
export type CollectionEngagementMetricsVideosArgs = {
  filter?: InputMaybe<VideoFilter>;
};

/** The available input fields of a Collection filter. */
export type CollectionFilter = {
  /** Filter collections by visibility. */
  visibility?: InputMaybe<VisibilityOperator>;
};

/** The node at the end of a CollectionMetricEdge. */
export type CollectionMetric = Metric & {
  __typename?: 'CollectionMetric';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total count of the collection metric. A null value indicates that it is hidden or not available. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The connection type for a CollectionMetric. */
export type CollectionMetricConnection = {
  __typename?: 'CollectionMetricConnection';
  /** A list of edges. */
  edges: Array<Maybe<CollectionMetricEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type CollectionMetricEdge = {
  __typename?: 'CollectionMetricEdge';
  /** The item at the end of the edge. */
  node?: Maybe<CollectionMetric>;
};

/** The metrics of a Collection. */
export type CollectionMetrics = Node & {
  __typename?: 'CollectionMetrics';
  /** The engagement metrics of the collection. */
  engagement?: Maybe<CollectionEngagementMetrics>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

/** Represents the stats of a collection. */
export type CollectionStats = Node & {
  __typename?: 'CollectionStats';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The video stats of the collection. */
  videos?: Maybe<CollectionStatsVideos>;
};

/** The video stats of the collection. */
export type CollectionStatsVideos = Node & {
  __typename?: 'CollectionStatsVideos';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of videos of the collection. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** Information about a comment. */
export type Comment = Node & {
  __typename?: 'Comment';
  /** The creation date (DateTime ISO8601) of the comment. */
  createDate: Scalars['DateTime']['output'];
  /** The creator of the comment. */
  creator: Channel;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The metrics of the comment. */
  metrics?: Maybe<CommentMetrics>;
  /** The commented post. */
  post: Post;
  /** The content of the comment. */
  text: Scalars['String']['output'];
  /** The last update date (DateTime ISO8601) of the comment. */
  updateDate: Scalars['DateTime']['output'];
  /** The viewer engagement information of the comment. */
  viewerEngagement?: Maybe<CommentViewerEngagement>;
};

/** The connection type for Comment. */
export type CommentConnection = {
  __typename?: 'CommentConnection';
  /** A list of edges. */
  edges: Array<Maybe<CommentEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type CommentEdge = {
  __typename?: 'CommentEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Comment>;
};

/** The engagement metrics of a Comment. */
export type CommentEngagementMetrics = Node & {
  __typename?: 'CommentEngagementMetrics';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The like metrics of the comment. */
  likes?: Maybe<LikeMetricConnection>;
};

/** The node at the end of a CommentMetricEdge. */
export type CommentMetric = Metric & {
  __typename?: 'CommentMetric';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total count of the comment metric. A null value indicates that it is hidden or not available. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The connection type for a CommentMetric. */
export type CommentMetricConnection = {
  __typename?: 'CommentMetricConnection';
  /** A list of edges. */
  edges: Array<Maybe<CommentMetricEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type CommentMetricEdge = {
  __typename?: 'CommentMetricEdge';
  /** The item at the end of the edge. */
  node?: Maybe<CommentMetric>;
};

/** The metrics of a Comment. */
export type CommentMetrics = Node & {
  __typename?: 'CommentMetrics';
  /** The engagement metrics of the comment. */
  engagement?: Maybe<CommentEngagementMetrics>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

/** The possible sort options for comment. */
export type CommentSort = {
  /** Sort by when the comment was created. */
  createDate?: InputMaybe<OrderDirection>;
};

/** Information about the viewer engagement of a Comment. */
export type CommentViewerEngagement = Node & ViewerEngagement & {
  __typename?: 'CommentViewerEngagement';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates the like rating of the comment from the viewer. */
  likeRating?: Maybe<LikeRating>;
  /** Indicates whether the viewer has liked the comment. Returns False if the viewer is not connected. */
  liked: Scalars['Boolean']['output'];
};

/** Types that can be a Component. */
export type Component = Channel | Collection | Live | Poll | Reaction | ReactionVideo | Topic | Video;

/** The connection type for Component. */
export type ComponentConnection = {
  __typename?: 'ComponentConnection';
  /** A list of edges. */
  edges: Array<Maybe<ComponentEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type ComponentEdge = {
  __typename?: 'ComponentEdge';
  /** The metadata of the edge. */
  metadata?: Maybe<Metadata>;
  /** The item at the end of the edge. */
  node?: Maybe<Component>;
};

/** Represents a Content. */
export type Content = {
  /** The channel that created the content. */
  creator?: Maybe<Channel>;
};

/** Information about a category. */
export type ContentCategory = Category & Node & {
  __typename?: 'ContentCategory';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The name of the content category. */
  name: Scalars['String']['output'];
};

/** Information about a conversation. */
export type Conversation = Node & {
  __typename?: 'Conversation';
  /** The algorithm that used to fetch conversation. */
  algorithm?: Maybe<AlgorithmName>;
  /** Information about the conversation DailymotionAd. */
  dailymotionAd?: Maybe<DailymotionAd>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The Story. */
  story?: Maybe<Story>;
};

/** The connection type for Conversation. */
export type ConversationConnection = {
  __typename?: 'ConversationConnection';
  /** A list of edges. */
  edges: Array<Maybe<ConversationEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type ConversationEdge = {
  __typename?: 'ConversationEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Conversation>;
};

/** The available input fields of a Poll filter. */
export type ConversationFilter = {
  /** Filter conversations by algorithm name. */
  algorithm?: InputMaybe<AlgorithmNameOperator>;
  /** Filter conversations by story. */
  story?: InputMaybe<StoryOperator>;
};

/** Information about a country. */
export type Country = Node & {
  __typename?: 'Country';
  /**
   * The ISO-3166-1 country code.
   * @deprecated Use `codeAlpha2` field.
   */
  code?: Maybe<Scalars['String']['output']>;
  /** The ISO 3166-2 country code. */
  codeAlpha2?: Maybe<Scalars['String']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The name of the country. */
  name?: Maybe<Scalars['String']['output']>;
};

/** The connection type for Country. */
export type CountryConnection = {
  __typename?: 'CountryConnection';
  /** A list of edges. */
  edges: Array<Maybe<CountryEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type CountryEdge = {
  __typename?: 'CountryEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Country>;
};

/** The input fields to create a behavior rule. */
export type CreateBehaviorRuleInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Condition to apply the feature or experiment segmentation (contains JSON). */
  condition: Scalars['String']['input'];
  /** Description of the new rule. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Indicates whether the rule is enabled. */
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** The end date and time (DateTime ISO8601) of the rule if enabled. */
  endAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Experiment configuration. If set, the rule will be an experiment (contains JSON). */
  experiment?: InputMaybe<Scalars['String']['input']>;
  /** The name of the new rule. */
  name: Scalars['String']['input'];
  /** Start date and time (DateTime ISO8601) of the rule if enabled. */
  startAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** The tags associated with the rule. Useful for filtering. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** The return fields from creating a rule for feature flipping or AB experiments. */
export type CreateBehaviorRulePayload = {
  __typename?: 'CreateBehaviorRulePayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The new rule. */
  rule?: Maybe<Rule>;
};

/** The input fields to create a collection. */
export type CreateCollectionInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the collection. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the new collection. */
  name: Scalars['String']['input'];
  /** Indicate whether the collection is private. */
  private?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The return fields from creating a collection. */
export type CreateCollectionPayload = {
  __typename?: 'CreateCollectionPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The new collection. */
  collection?: Maybe<Collection>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to create a reaction. */
export type CreateReactionInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the opener that the reaction is created for. */
  openerId: Scalars['ID']['input'];
  /** The URL of the thumbnail image. */
  thumbnailURL?: InputMaybe<Scalars['String']['input']>;
  /** The title of the reaction. */
  title: Scalars['String']['input'];
  /** The URL of the reaction to get the upload file from. */
  url: Scalars['String']['input'];
};

/** The input fields to create a user. */
export type CreateUserInput = {
  /** The URL of the avatar image of the user. */
  avatarURL?: InputMaybe<Scalars['String']['input']>;
  /** The birthday (DateTime ISO8601) of the user. */
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Indicate whether or not to test the creation workflow without actually creating the user. */
  dryRun?: InputMaybe<Scalars['Boolean']['input']>;
  /** The email address of the user. */
  email: Scalars['String']['input'];
  /** The first name of the user. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The gender of the user. */
  gender?: InputMaybe<Gender>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** The name of the user. @deprecated(reason: Use `firstName` and `lastName` respectively). */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The nickname of the user. */
  nickname?: InputMaybe<Scalars['String']['input']>;
  /** The organization activation key to validate the user creation. */
  organizationActivationKey?: InputMaybe<Scalars['String']['input']>;
  /** The password for the user. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** The user response token provided by reCAPTCHA. */
  recaptchaToken?: InputMaybe<Scalars['String']['input']>;
  /** The mutation version. */
  version?: InputMaybe<Scalars['Int']['input']>;
};

/** The return fields from creating a user. */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
  /** The new Dailymotion user. */
  user?: Maybe<User>;
};

/** The input fields to create a video. */
export type CreateVideoInput = {
  /** The category of the video. */
  category?: InputMaybe<MediaCategory>;
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the video. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** the hashtags of the video */
  hashtags?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Indicates whether the video is created for kids. */
  isCreatedForKids?: InputMaybe<Scalars['Boolean']['input']>;
  /** The language of the video. */
  language?: InputMaybe<Scalars['String']['input']>;
  /** The password of the video. When setting a value on this field, the video visibility changes to `password protected`. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Indicates whether the video is private. */
  private?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicates whether the video is published. */
  published?: InputMaybe<Scalars['Boolean']['input']>;
  /** The list of tags to associate to the video. */
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The URL of the thumbnail image. */
  thumbnailURL?: InputMaybe<Scalars['String']['input']>;
  /** The title of the video. */
  title?: InputMaybe<Scalars['String']['input']>;
  /** The URL of the video. */
  url?: InputMaybe<Scalars['String']['input']>;
};

/** The return fields from creating a new Video. */
export type CreateVideoPayload = {
  __typename?: 'CreateVideoPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
  /** The new video. */
  video?: Maybe<Video>;
};

/** The violation reasons to report the `Creator`. */
export enum CreatorViolation {
  /** Content that violates the community guidelines. */
  InappropriateContent = 'INAPPROPRIATE_CONTENT'
}

/** Information of a curated category. */
export type CuratedCategory = Category & Node & {
  __typename?: 'CuratedCategory';
  /** The ID of the category. */
  categoryId: Scalars['Int']['output'];
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The name of the category. */
  name: Scalars['String']['output'];
};

/** The connection type for CuratedCategory. */
export type CuratedCategoryConnection = {
  __typename?: 'CuratedCategoryConnection';
  /** A list of edges. */
  edges: Array<Maybe<CuratedCategoryEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type CuratedCategoryEdge = {
  __typename?: 'CuratedCategoryEdge';
  /** The item at the end of the edge. */
  node?: Maybe<CuratedCategory>;
};

/** Information about a DailymotionAd. */
export type DailymotionAd = Node & {
  __typename?: 'DailymotionAd';
  /** The channel associated to the DailymotionAd. */
  channel?: Maybe<Channel>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The promotion of the DailymotionAd. */
  promotion: Promotion;
};

/** The input fields to delete a behavior rule. */
export type DeleteBehaviorRuleInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The name of the rule to delete. */
  name: Scalars['String']['input'];
};

/** The return fields from deleting a rule used for feature flipping or AB experiments. */
export type DeleteBehaviorRulePayload = {
  __typename?: 'DeleteBehaviorRulePayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the mutation was successful. */
  success?: Maybe<Scalars['Boolean']['output']>;
};

/** The input fields to delete a reaction. */
export type DeleteReactionInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the reaction to delete. */
  id: Scalars['ID']['input'];
};

/** The return fields from deleting a reaction. */
export type DeleteReactionPayload = {
  __typename?: 'DeleteReactionPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to delete a user. */
export type DeleteUserInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The password of the user. */
  password?: InputMaybe<Scalars['String']['input']>;
};

/** The return fields from deleting a user. */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to delete a video. */
export type DeleteVideoInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion of the video. */
  xid: Scalars['String']['input'];
};

/** The return fields from deleting a video. */
export type DeleteVideoPayload = {
  __typename?: 'DeleteVideoPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** Information about the email change request of the user. */
export type EmailChangeRequest = Node & {
  __typename?: 'EmailChangeRequest';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The new email the user has requested to change to. */
  newEmail: Scalars['String']['output'];
};

/** The different types of embeds. */
export enum EmbedType {
  /** A contextual embed. */
  Contextual = 'CONTEXTUAL',
  /** A recording embed. */
  Recording = 'RECORDING'
}

/** Represents an experiment (A/B testing) matched/enabled for a client. */
export type ExperimentMatch = Node & {
  __typename?: 'ExperimentMatch';
  /** The end date and time (DateTime ISO8601) of the experiment if enabled. */
  endingAt?: Maybe<Scalars['DateTime']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates whether the condition is matched. */
  matched?: Maybe<Scalars['Boolean']['output']>;
  /** A unique name for the experiment. */
  name?: Maybe<Scalars['String']['output']>;
  /** The tags associated to the experiment. Useful for filtering. */
  tags?: Maybe<BehaviorRuleTagConnection>;
  /** A unique uuid for the experiment. */
  uuid?: Maybe<Scalars['String']['output']>;
  /** Variation assigned. */
  variation?: Maybe<Scalars['String']['output']>;
};


/** Represents an experiment (A/B testing) matched/enabled for a client. */
export type ExperimentMatchTagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** The connection type for Experiment Match. */
export type ExperimentMatchConnection = {
  __typename?: 'ExperimentMatchConnection';
  /** A list of edges. */
  edges: Array<Maybe<ExperimentMatchEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type ExperimentMatchEdge = {
  __typename?: 'ExperimentMatchEdge';
  /** The item at the end of the edge. */
  node?: Maybe<ExperimentMatch>;
};

/** Information about a fallback country. */
export type FallbackCountry = Node & {
  __typename?: 'FallbackCountry';
  /** The country to fallback from. */
  country?: Maybe<Country>;
  /** The country to fallback to. */
  fallbackCountry?: Maybe<Country>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

/** The connection type for Fallback Country. */
export type FallbackCountryConnection = {
  __typename?: 'FallbackCountryConnection';
  /** A list of edges. */
  edges: Array<Maybe<FallbackCountryEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type FallbackCountryEdge = {
  __typename?: 'FallbackCountryEdge';
  /** The item at the end of the edge. */
  node?: Maybe<FallbackCountry>;
};

/** Represents a Favorite (an interaction). */
export type Favorite = History & Node & {
  __typename?: 'Favorite';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The post favorited by the channel. */
  post: Post;
};

/** Represents a feature object matched/enabled for a client. */
export type FeatureMatch = Node & {
  __typename?: 'FeatureMatch';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates whether the feature is matched. */
  matched?: Maybe<Scalars['Boolean']['output']>;
  /** A unique name for the feature. */
  name?: Maybe<Scalars['String']['output']>;
  /** The tags associated with the rule. Useful for filtering. */
  tags?: Maybe<BehaviorRuleTagConnection>;
};


/** Represents a feature object matched/enabled for a client. */
export type FeatureMatchTagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** The connection type for FeatureMatch. */
export type FeatureMatchConnection = {
  __typename?: 'FeatureMatchConnection';
  /** A list of edges. */
  edges: Array<Maybe<FeatureMatchEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type FeatureMatchEdge = {
  __typename?: 'FeatureMatchEdge';
  /** The item at the end of the edge. */
  node?: Maybe<FeatureMatch>;
};

/** Content featured by Dailymotion. */
export type FeaturedContent = Node & {
  __typename?: 'FeaturedContent';
  /** The featured channels. */
  channels?: Maybe<ChannelConnection>;
  /** The featured collections. */
  collections?: Maybe<CollectionConnection>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The featured medias. */
  medias?: Maybe<MediaConnection>;
};


/** Content featured by Dailymotion. */
export type FeaturedContentChannelsArgs = {
  category?: InputMaybe<FeaturedContentCategory>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Content featured by Dailymotion. */
export type FeaturedContentCollectionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Content featured by Dailymotion. */
export type FeaturedContentMediasArgs = {
  allowExplicit?: InputMaybe<Scalars['Boolean']['input']>;
  category?: InputMaybe<FeaturedContentCategory>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** The possible categories for a featured content. */
export enum FeaturedContentCategory {
  /** The music category. */
  Music = 'MUSIC',
  /** The news category. */
  News = 'NEWS',
  /** The sport category. */
  Sport = 'SPORT'
}

/** The available input fields of a Feed filter. */
export type FeedFilter = {
  /** The ID of the feed. */
  id?: InputMaybe<IdOperator>;
  /** The unique name of the feed. */
  name?: InputMaybe<StringOperator>;
  /** The post of the feed. */
  post?: InputMaybe<PostOperator>;
  /** The post ID of the feed. */
  postId?: InputMaybe<IdOperator>;
  /** The post status of the feed. */
  postStatus?: InputMaybe<PostStatusOperator>;
};

/** The possible values for feed name */
export enum FeedName {
  /** Hashtag. */
  Hashtag = 'HASHTAG',
  /** Perspective posts. */
  Perspective = 'PERSPECTIVE'
}

/** A feed post. */
export type FeedPost = {
  __typename?: 'FeedPost';
  /** Indicates whether the post is featured. */
  featured?: Maybe<Scalars['Boolean']['output']>;
  /** Information about the post. */
  post?: Maybe<Post>;
};

/** The connection type for FeedPost. */
export type FeedPostConnection = {
  __typename?: 'FeedPostConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<FeedPostEdge>>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type FeedPostEdge = {
  __typename?: 'FeedPostEdge';
  /** The item at the end of the edge. */
  node?: Maybe<FeedPost>;
};

/** The available sort options for feeds. */
export type FeedSort = {
  /** Sort by when the post was created. */
  create?: InputMaybe<OrderDirection>;
  /** Sort by post popularity based on number of views. */
  popular?: InputMaybe<OrderDirection>;
};

/** Information about the URLs of a file upload. */
export type FileUpload = Node & {
  __typename?: 'FileUpload';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The URL to use in order to get info about the file upload progress. */
  progressURL?: Maybe<Scalars['String']['output']>;
  /** The URL to upload the file to. */
  uploadURL?: Maybe<Scalars['String']['output']>;
};

/** The input fields to follow a channel for the connected user. */
export type FollowChannelInput = {
  /** The Dailymotion ID of the channel. */
  channelXid: Scalars['String']['input'];
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The return fields from following a channel for the connected user. */
export type FollowChannelPayload = {
  __typename?: 'FollowChannelPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to follow channels for the connected user. */
export type FollowChannelsInput = {
  /** The Dailymotion IDs of the channels to follow. */
  channelXids: Array<Scalars['String']['input']>;
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The return fields from following channels for the connected user. */
export type FollowChannelsPayload = {
  __typename?: 'FollowChannelsPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to follow a channel for the connected user. */
export type FollowTopicInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion ID of the topic to follow. */
  topicXid: Scalars['String']['input'];
};

/** The return fields from following a topic for the connected user. */
export type FollowTopicPayload = {
  __typename?: 'FollowTopicPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to follow topics for the connected user. */
export type FollowTopicsInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion IDs of the topics to follow. */
  topicXids: Array<Scalars['String']['input']>;
};

/** The return fields from follow topics for the connected user. */
export type FollowTopicsPayload = {
  __typename?: 'FollowTopicsPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to follow a user for the connected user. */
export type FollowUserInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion ID of the user. */
  xid: Scalars['String']['input'];
};

/** The return fields from following a user for the connected user. */
export type FollowUserPayload = {
  __typename?: 'FollowUserPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** Information about a channel that is being followed by a user. */
export type FollowedChannel = Node & {
  __typename?: 'FollowedChannel';
  /** The channel that is being followed. */
  channel?: Maybe<Channel>;
  /** The date and time (DateTime ISO8601) the channel was followed at. */
  followedAt?: Maybe<Scalars['DateTime']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates whether the push notification settings is enabled. */
  isNotificationEnabled?: Maybe<Scalars['Boolean']['output']>;
};

/** The connection type for FollowedChannel. */
export type FollowedChannelConnection = {
  __typename?: 'FollowedChannelConnection';
  /** A list of edges. */
  edges: Array<Maybe<FollowedChannelEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type FollowedChannelEdge = {
  __typename?: 'FollowedChannelEdge';
  /** The item at the end of the edge. */
  node?: Maybe<FollowedChannel>;
};

/** The possible sort values to order the channels followed by a user. */
export enum FollowedChannelsSort {
  /** Sort followed channels by last video uploaded. */
  Activity = 'ACTIVITY',
  /** Sort followed channels by display name ascending. */
  Alphaaz = 'ALPHAAZ',
  /** Sort followed channels by recently followed. */
  Recent = 'RECENT'
}

/** Information about a topic that is being followed by a user. */
export type FollowedTopic = Node & {
  __typename?: 'FollowedTopic';
  /** The date and time (Date ISO8601) the topic was followed at. */
  followedAt?: Maybe<Scalars['DateTime']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The topic that is being followed. */
  topic?: Maybe<Topic>;
};

/** The connection type for FollowedTopic. */
export type FollowedTopicConnection = {
  __typename?: 'FollowedTopicConnection';
  /** A list of edges. */
  edges: Array<Maybe<FollowedTopicEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type FollowedTopicEdge = {
  __typename?: 'FollowedTopicEdge';
  /** The item at the end of the edge. */
  node?: Maybe<FollowedTopic>;
};

/** The possible sort values to order the topics followed by a user. */
export enum FollowedTopicsSort {
  /** Sort followed topics by last video uploaded. */
  Activity = 'ACTIVITY',
  /** Sort followed topics by name ascending. */
  Alphaaz = 'ALPHAAZ',
  /** Sort followed topics by recently followed. */
  Recent = 'RECENT'
}

/** Information about a user that is following the requested user */
export type Follower = Node & {
  __typename?: 'Follower';
  /** The Channel information about the follower. */
  creator?: Maybe<Channel>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /**
   * The User information about the follower.
   * @deprecated Use `creator` field.
   */
  user?: Maybe<User>;
};

/** The connection type for Follower. */
export type FollowerConnection = {
  __typename?: 'FollowerConnection';
  /** A list of edges. */
  edges: Array<Maybe<FollowerEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type FollowerEdge = {
  __typename?: 'FollowerEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Follower>;
};

/** Information about the follower engagement on a Channel. */
export type FollowerEngagement = Node & {
  __typename?: 'FollowerEngagement';
  /** The datetime the follower started following the Channel. */
  followDate?: Maybe<Scalars['DateTime']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates the notifications the follower wants to receive about the Channel. */
  notifications?: Maybe<FollowerEngagementNotifications>;
};

/** Information about the follower engagement notifications on a Channel. */
export type FollowerEngagementNotifications = {
  __typename?: 'FollowerEngagementNotifications';
  /** Indicates whether the follower wants to received notifications when the channel uploads content. */
  uploads: Scalars['Boolean']['output'];
};

/** Information about a user, who the requested user is following. */
export type Following = Node & {
  __typename?: 'Following';
  /** The Channel information of the user the requested user follows. */
  creator?: Maybe<Channel>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /**
   * The information of the user the requested user follows.
   * @deprecated Use `creator` field.
   */
  user?: Maybe<User>;
};

/** Following channel starts live notification settings. */
export type FollowingChannelStartsLive = Node & {
  __typename?: 'FollowingChannelStartsLive';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates whether the email notification setting is enabled. */
  isEmailEnabled?: Maybe<Scalars['Boolean']['output']>;
};

/** Following channel uploads video notification settings. */
export type FollowingChannelUploadsVideo = Node & {
  __typename?: 'FollowingChannelUploadsVideo';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates whether the email notification setting is enabled. */
  isEmailEnabled?: Maybe<Scalars['Boolean']['output']>;
};

/** The connection type for Following. */
export type FollowingConnection = {
  __typename?: 'FollowingConnection';
  /** A list of edges. */
  edges: Array<Maybe<FollowingEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type FollowingEdge = {
  __typename?: 'FollowingEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Following>;
};

/** Following channel or topic starts live notification settings. */
export type FollowingStartsLive = Node & {
  __typename?: 'FollowingStartsLive';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates whether the push notification setting is enabled. */
  isPushEnabled?: Maybe<Scalars['Boolean']['output']>;
};

/** The possible genders for a user. */
export enum Gender {
  /** A gender identifying as a female. */
  Female = 'female',
  /** A gender identifying as a male. */
  Male = 'male',
  /** A gender identifying as other. */
  Other = 'other',
  /** A value the user prefers not to answer. */
  PreferNotToAnswer = 'prefer_not_to_answer'
}

/** The input fields to generate a file upload url. */
export type GenerateFileUploadUrlInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The return fields from generating a file url upload. */
export type GenerateFileUploadUrlPayload = {
  __typename?: 'GenerateFileUploadUrlPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Information about the file upload. */
  fileUpload?: Maybe<FileUpload>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The geoblocked countries of a media. */
export type GeoblockedCountries = Node & {
  __typename?: 'GeoblockedCountries';
  /** The list of allowed countries. */
  allowed?: Maybe<Array<Scalars['String']['output']>>;
  /** The list of denied countries. */
  denied?: Maybe<Array<Scalars['String']['output']>>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

/** The geoblocking information. */
export type Geoblocking = Node & {
  __typename?: 'Geoblocking';
  /** The country code (ISO 3166-1 alpha-2) of the geoblocking. */
  country?: Maybe<Country>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates whether the geoblocking is allowed. */
  isAllowed?: Maybe<Scalars['Boolean']['output']>;
};

/** The connection type for Geoblocking. */
export type GeoblockingConnection = {
  __typename?: 'GeoblockingConnection';
  /** A list of edges. */
  edges: Array<Maybe<GeoblockingEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type GeoblockingEdge = {
  __typename?: 'GeoblockingEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Geoblocking>;
};

/** Information of a Hashtag. */
export type Hashtag = Node & {
  __typename?: 'Hashtag';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The metrics of the hashtag. */
  metrics?: Maybe<HashtagMetrics>;
  /** The name of the hashtag. */
  name: Scalars['String']['output'];
  /** The Dailymotion ID of the hashtag. */
  xid: Scalars['String']['output'];
};

/** The connection type for Hashtag. */
export type HashtagConnection = {
  __typename?: 'HashtagConnection';
  /** A list of edges. */
  edges: Array<Maybe<HashtagEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type HashtagEdge = {
  __typename?: 'HashtagEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Hashtag>;
};

/** The engagement metrics of a Hashtag. */
export type HashtagEngagementMetrics = Node & {
  __typename?: 'HashtagEngagementMetrics';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The video metrics of the hashtag. */
  videos?: Maybe<VideoMetricConnection>;
};


/** The engagement metrics of a Hashtag. */
export type HashtagEngagementMetricsVideosArgs = {
  filter?: InputMaybe<VideoFilter>;
};

/** The metrics of a Hashtag. */
export type HashtagMetrics = Node & {
  __typename?: 'HashtagMetrics';
  /** The engagement metrics of a hashtag. */
  engagement?: Maybe<HashtagEngagementMetrics>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

/** Represents a History. */
export type History = {
  /** The post interacted by the channel. */
  post: Post;
};

/** The connection type for a History. */
export type HistoryConnection = {
  __typename?: 'HistoryConnection';
  /** A list of edges. */
  edges: Array<Maybe<HistoryEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type HistoryEdge = {
  __typename?: 'HistoryEdge';
  /** The item at the end of the edge. */
  node?: Maybe<History>;
};

/** The available input fields of a History filter. */
export type HistoryFilter = {
  /** Filter history by the activity. */
  activity: InteractionOperator;
  /** Filter history by the post. */
  post: PostOperator;
};

/** The available input fields of a HtmlPage. */
export type HtmlPage = {
  /** The content of the html page. */
  content?: InputMaybe<Scalars['String']['input']>;
  /** The language of the html page. */
  language?: InputMaybe<Scalars['String']['input']>;
  /** The title of the html page. */
  title?: InputMaybe<Scalars['String']['input']>;
  /** The url of the html page. */
  url?: InputMaybe<Scalars['String']['input']>;
};

/** The available input fields of an ID operator. */
export type IdOperator = {
  /** Short for equal, must match the given data exactly. */
  eq?: InputMaybe<Scalars['ID']['input']>;
  /** Short for in array, must NOT be an element of the array. */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Short for not equal, must be different from the given data. */
  ne?: InputMaybe<Scalars['ID']['input']>;
  /** Short for not in array, must be an element of the array. */
  nin?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

/** Information of an Image. */
export type Image = Node & {
  __typename?: 'Image';
  /** The height of the image in pixels. If null, the value is unknown. */
  height?: Maybe<Scalars['Int']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The url of the image. */
  url?: Maybe<Scalars['String']['output']>;
  /** The width of the image in pixels. If null, the value is unknown. */
  width?: Maybe<Scalars['Int']['output']>;
};

/** The possible values for an Interaction. */
export enum Interaction {
  /** An interaction that is `favorited`. */
  Favorited = 'FAVORITED',
  /** An interaction that is `liked`. */
  Liked = 'LIKED',
  /** An interaction that is `saved`. */
  Saved = 'SAVED',
  /** An interaction that is `watched`. */
  Watched = 'WATCHED'
}

/** The available input fields of an Interaction operator. */
export type InteractionOperator = {
  /** Short for equal, must match the given data exactly. */
  eq?: InputMaybe<Interaction>;
};

/** Information of an interest. */
export type Interest = Node & {
  __typename?: 'Interest';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The ID of the interest. */
  interestId: Scalars['Int']['output'];
  /** Indicates whether the interest is enabled. */
  isEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** The name of the interest. */
  name: Scalars['String']['output'];
};

/** The connection type for Interest. */
export type InterestConnection = {
  __typename?: 'InterestConnection';
  /** A list of edges. */
  edges: Array<Maybe<InterestEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type InterestEdge = {
  __typename?: 'InterestEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Interest>;
};

/** Information about a language. */
export type Language = Node & {
  __typename?: 'Language';
  /** The ISO 639-1 language code. */
  codeAlpha2?: Maybe<Scalars['String']['output']>;
  /** The ISO 639-2 language code. */
  codeAlpha3?: Maybe<Scalars['String']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The name of the language. */
  name?: Maybe<Scalars['String']['output']>;
};

/** The possible sources of a language. */
export enum LanguageSource {
  /** Automatic language detection. */
  Auto = 'AUTO',
  /** The declared language. */
  Custom = 'CUSTOM'
}

/** The connection type for Like. */
export type LikeConnection = {
  __typename?: 'LikeConnection';
  /** A list of edges. */
  edges: Array<Maybe<LikeEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type LikeEdge = {
  __typename?: 'LikeEdge';
  /** The item at the end of the edge. */
  node?: Maybe<LikeNode>;
};

/** The node at the end of a LikesMetricEdge. */
export type LikeMetric = Metric & {
  __typename?: 'LikeMetric';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The like rating metric being measured. */
  rating: LikeRating;
  /** The total count of the like metric. A null value indicates that it is hidden or not available. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The connection type for a LikesMetric. */
export type LikeMetricConnection = {
  __typename?: 'LikeMetricConnection';
  /** A list of edges. */
  edges: Array<Maybe<LikeMetricEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type LikeMetricEdge = {
  __typename?: 'LikeMetricEdge';
  /** The item at the end of the edge. */
  node?: Maybe<LikeMetric>;
};

/** The available input fields for the Likes engagement metrics filter. */
export type LikeMetricFilter = {
  /** The Likes engagement metrics filter to filter by like. */
  rating?: InputMaybe<LikeRatingOperator>;
};

/** The node at the end of a LikeEdge. */
export type LikeNode = {
  __typename?: 'LikeNode';
  /** The post liked by the channel. */
  post?: Maybe<Post>;
  /** Indicates the like rating of the liked post from the channel. */
  rating?: Maybe<LikeRating>;
};

/** The return fields from adding/removing a like to/from the likes list of the connected user. */
export type LikePayload = {
  __typename?: 'LikePayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The possible values for a LikeRating. */
export enum LikeRating {
  /** A like rating that represents the emoji 🎣. */
  FishingPole = 'FISHING_POLE',
  /** A like rating that represents the emoji 😴. */
  SleepingFace = 'SLEEPING_FACE',
  /** A like rating that represents the emoji 😎. */
  SmilingFaceWithSunglasses = 'SMILING_FACE_WITH_SUNGLASSES',
  /** A like rating that represents the emoji 🤩. */
  StarStruck = 'STAR_STRUCK',
  /** A like rating that represents the emoji 😉. */
  WinkingFace = 'WINKING_FACE'
}

/** The available input fields of a like rating operator. */
export type LikeRatingOperator = {
  /** Short for equal, must match the given data exactly. */
  eq?: InputMaybe<LikeRating>;
};

/** The input fields to like a video for the connected user. */
export type LikeVideoInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion ID of the video to like. */
  videoXid: Scalars['String']['input'];
};

/** The return fields from liking a video for the connected user. */
export type LikeVideoPayload = {
  __typename?: 'LikeVideoPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The possible values which liked media connections can be sorted by. */
export enum LikedMediaSort {
  /** Sort liked medias by most recent. */
  Recent = 'RECENT',
  /** Sort liked medias by most viewed. */
  Visited = 'VISITED'
}

/** A live represents a media that is streamed. */
export type Live = Content & Node & Recording & {
  __typename?: 'Live';
  /** Indicates whether the live can be embedded outside of Dailymotion. */
  allowEmbed?: Maybe<Scalars['Boolean']['output']>;
  /** The aspect ratio of the media (e.g. 1.33333 for 4/3, 1.77777 for 16/9). */
  aspectRatio?: Maybe<Scalars['Float']['output']>;
  /**
   * The total number of users currently viewing the live. A null value indicates that it is hidden.
   * @deprecated Use `metrics.engagement.audience` field.
   */
  audienceCount?: Maybe<Scalars['Int']['output']>;
  /** The best available quality of the live. */
  bestAvailableQuality?: Maybe<MediaQuality>;
  /** Indicates whether advertisements are allowed on the live. */
  canDisplayAds?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates whether the total number of viewers can be displayed.
   * @deprecated Use `metrics.engagement.audience` field.
   */
  canDisplayAudience?: Maybe<Scalars['Boolean']['output']>;
  /** The category of the live. */
  category?: Maybe<MediaCategory>;
  /**
   * The channel that created the live.
   * @deprecated Use `creator` field.
   */
  channel?: Maybe<Channel>;
  /** The channel claiming revenue sharing on the live. */
  claimer?: Maybe<Channel>;
  /** The last aired date (DateTime ISO8601), if never aired, then the creation date (DateTime ISO8601) of the live. */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** The creator that created the Live. */
  creator?: Maybe<Channel>;
  /**
   * The curated categories associated to the live.
   * @deprecated Use `interests` field.
   */
  curatedCategories?: Maybe<CuratedCategoryConnection>;
  /**
   * The description of the media in utf8.
   *   Clients are expected to handle '<br/>' tags and detect 'http(s)://' links.
   *   No other HTML tag should be present.
   */
  description?: Maybe<Scalars['String']['output']>;
  /** The HTML embedding code to embed the live outside of Dailymotion. */
  embedHtml?: Maybe<Scalars['String']['output']>;
  /** The URL to embed the live outside of Dailymotion. */
  embedURL?: Maybe<Scalars['String']['output']>;
  /** The date (DateTime ISO8601) the live ends. */
  endAt?: Maybe<Scalars['DateTime']['output']>;
  /** The geoblocked countries of the live. */
  geoblockedCountries?: Maybe<GeoblockedCountries>;
  /** The country codes (ISO 3166-1 alpha-2) that are allowed or denied by the live. */
  geoblocking?: Maybe<GeoblockingConnection>;
  /** The height of the live (px). */
  height?: Maybe<Scalars['Int']['output']>;
  /**
   * The URL of the adaptative bitrate manifest using the Apple HTTP Live Streaming
   *   protocol. Without an access token this field contains null, the Dailymotion
   *   user associated with the access token must be the owner of the video. This
   *   field is rate limited. The returned url is secured: it can only be consumed by
   *   the user who made the query and it expires after a certain time.
   */
  hlsURL?: Maybe<Scalars['String']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The interests associated to the live. */
  interests?: Maybe<InterestConnection>;
  /**
   * Indicates whether the live is bookmarked by the connected user.
   *   Returns False if the user is not connected.
   * @deprecated Use `viewerEngagement.bookmarked` field.
   */
  isBookmarked?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the live is "Created for Kids" (intends to target an audience of age 16 and under). */
  isCreatedForKids?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the live is explicit. */
  isExplicit?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the live is in the specified collection. */
  isInCollection?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates whether the live is in the watch later list of the connected user.
   *   Returns False if the user is not connected.
   * @deprecated Use `viewerEngagement.favorited` field.
   */
  isInWatchLater?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates whether the connected user has liked the live.
   * @deprecated Use `viewerEngagement.liked` field.
   */
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the live is on air. */
  isOnAir?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the live is password-protected. */
  isPasswordProtected?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the live is private. */
  isPrivate?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the live is published. */
  isPublished?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates whether the connected user has reacted to the live.
   *   Returns False if the user is not connected.
   * @deprecated Use `viewerEngagement.reacted` field.
   */
  isReacted?: Maybe<Scalars['Boolean']['output']>;
  /** The language of the live. */
  language?: Maybe<Language>;
  /** The metrics of the live. */
  metrics?: Maybe<LiveMetrics>;
  /** The moderation information of the live. */
  moderation?: Maybe<MediaModeration>;
  /** The reactions created on the live. */
  reactions?: Maybe<ReactionConnection>;
  /** The restriction information of the live. */
  restriction?: Maybe<Restriction>;
  /** The share urls of the live. */
  shareUrls?: Maybe<LiveShareUrls>;
  /**
   * The sharing URLs of the live.
   * @deprecated Use `shareUrls` field.
   */
  sharingURLs?: Maybe<SharingUrlConnection>;
  /** The date (DateTime ISO8601) the live started. */
  startAt?: Maybe<Scalars['DateTime']['output']>;
  /**
   * The stats of the live.
   * @deprecated Use `metrics` field.
   */
  stats?: Maybe<LiveStats>;
  /** The subtitles of the live. */
  subtitles?: Maybe<SubtitleConnection>;
  /** The tags of the live. */
  tags?: Maybe<MediaTagConnection>;
  /** The URL of the thumbnail image. */
  thumbnail?: Maybe<Image>;
  /**
   * The URL of the thumbnail image.
   * @deprecated Use `thumbnail` field.
   */
  thumbnailURL?: Maybe<Scalars['String']['output']>;
  /**
   * The thumbnails of the live.
   * @deprecated Use `thumbnailURL` field.
   */
  thumbnails?: Maybe<Thumbnails>;
  /** The title of the live. */
  title?: Maybe<Scalars['String']['output']>;
  /** The topics associated to the live. */
  topics?: Maybe<TopicConnection>;
  /** The updated date (DateTime ISO8601) of the live. */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /**
   * The URL of the live.
   * @deprecated Use `shareUrls.permalink` field.
   */
  url?: Maybe<Scalars['String']['output']>;
  /** The viewer engagement information of the live. */
  viewerEngagement?: Maybe<LiveViewerEngagement>;
  /** The width of the live (px). */
  width?: Maybe<Scalars['Int']['output']>;
  /** The Dailymotion ID of the live. */
  xid: Scalars['String']['output'];
};


/** A live represents a media that is streamed. */
export type LiveCuratedCategoriesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** A live represents a media that is streamed. */
export type LiveGeoblockingArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  isAllowed?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** A live represents a media that is streamed. */
export type LiveInterestsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** A live represents a media that is streamed. */
export type LiveIsInCollectionArgs = {
  collectionXid: Scalars['String']['input'];
};


/** A live represents a media that is streamed. */
export type LiveReactionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** A live represents a media that is streamed. */
export type LiveSharingUrLsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** A live represents a media that is streamed. */
export type LiveSubtitlesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** A live represents a media that is streamed. */
export type LiveTagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** A live represents a media that is streamed. */
export type LiveThumbnailArgs = {
  height: ThumbnailHeight;
};


/** A live represents a media that is streamed. */
export type LiveThumbnailUrlArgs = {
  size: Scalars['String']['input'];
};


/** A live represents a media that is streamed. */
export type LiveTopicsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  whitelistedOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The connection type for Live. */
export type LiveConnection = {
  __typename?: 'LiveConnection';
  /** A list of edges. */
  edges: Array<Maybe<LiveEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type LiveEdge = {
  __typename?: 'LiveEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Live>;
};

/** The engagement metrics of a Live. */
export type LiveEngagementMetrics = Node & PostEngagementMetrics & {
  __typename?: 'LiveEngagementMetrics';
  /** The audience metrics of the live. */
  audience?: Maybe<ChannelMetricConnection>;
  /** The bookmark metrics of the live. */
  bookmarks?: Maybe<BookmarkMetricConnection>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The like metrics of the live. */
  likes?: Maybe<LikeMetricConnection>;
  /** The reaction metrics of the live. */
  reactions?: Maybe<ReactionMetricConnection>;
};


/** The engagement metrics of a Live. */
export type LiveEngagementMetricsBookmarksArgs = {
  filter?: InputMaybe<BookmarkFilter>;
};


/** The engagement metrics of a Live. */
export type LiveEngagementMetricsLikesArgs = {
  filter?: InputMaybe<LikeMetricFilter>;
};

/** The available input fields of a Live filter. */
export type LiveFilter = {
  /** Filter lives by onair. */
  onair?: InputMaybe<BooleanOperator>;
};

/** The node at the end of a LiveMetricEdge. */
export type LiveMetric = Metric & {
  __typename?: 'LiveMetric';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total count of the live metric. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The connection type for a LiveMetric. */
export type LiveMetricConnection = {
  __typename?: 'LiveMetricConnection';
  /** A list of edges. */
  edges: Array<Maybe<LiveMetricEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type LiveMetricEdge = {
  __typename?: 'LiveMetricEdge';
  /** The item at the end of the edge. */
  node?: Maybe<LiveMetric>;
};

/** The metrics of a Live. */
export type LiveMetrics = Node & PostMetrics & {
  __typename?: 'LiveMetrics';
  /** The engagement metrics of the live. */
  engagement?: Maybe<LiveEngagementMetrics>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

/** Information about the share urls of a Live. */
export type LiveShareUrls = Node & ShareUrls & {
  __typename?: 'LiveShareUrls';
  /** The facebook share url of the live. */
  facebook?: Maybe<Scalars['String']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The permalink share url of the live. */
  permalink: Scalars['String']['output'];
  /** The twitter share url of the live. */
  twitter?: Maybe<Scalars['String']['output']>;
};

/** Information about the live stats. */
export type LiveStats = Node & {
  __typename?: 'LiveStats';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The view stats of the live. */
  views?: Maybe<LiveStatsViews>;
};

/** The view stats of the video. */
export type LiveStatsViews = Node & {
  __typename?: 'LiveStatsViews';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of views of the live. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The stream urls of a live. */
export type LiveStreams = Node & {
  __typename?: 'LiveStreams';
  /** The chromecast URL of the live stream. */
  chromecastURL?: Maybe<Scalars['String']['output']>;
  /**
   * The URL of the live stream source using the HTTP Live Streaming protocol. Without
   *   an access token this field contains null. The Dailymotion user associated with
   *   the access token must be the owner of the video. This field is rate limited.
   *   The returned url is secured: it can only be consumed by the user who made the
   *   query and it expires after a certain time.
   */
  hlsSourceURL?: Maybe<Scalars['String']['output']>;
  /**
   * The URL of the adaptative bitrate manifest using the Apple HTTP Live Streaming
   *   protocol. Without an access token this field contains null, the Dailymotion
   *   user associated with the access token must be the owner of the video. This
   *   field is rate limited. The returned url is secured: it can only be consumed by
   *   the user who made the query and it expires after a certain time.
   */
  hlsURL?: Maybe<Scalars['String']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The restriction information of the live stream. */
  restriction?: Maybe<Restriction>;
  /** The Dailymotion ID of a live stream. */
  xid: Scalars['String']['output'];
};

/** The connection type for Live Stream. */
export type LiveStreamsConnection = {
  __typename?: 'LiveStreamsConnection';
  /** A list of edges. */
  edges: Array<Maybe<LiveStreamsEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type LiveStreamsEdge = {
  __typename?: 'LiveStreamsEdge';
  /** The item at the end of the edge. */
  node?: Maybe<LiveStreams>;
};

/** Information about the viewer engagement of a Live. */
export type LiveViewerEngagement = Node & ViewerEngagement & {
  __typename?: 'LiveViewerEngagement';
  /** Indicates whether the live is bookmarked by the viewer. Returns False if the viewer is not connected. */
  bookmarked?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the viewer has the live in its watch later list. Returns False if the viewer is not connected. */
  favorited?: Maybe<Scalars['Boolean']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates the like rating of the live from the viewer. */
  likeRating?: Maybe<LikeRating>;
  /** Indicates whether the viewer has liked the comment. Returns False if the viewer is not connected. */
  liked?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the viewer has reacted to the live. Returns False if the viewer is not connected. */
  reacted?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the viewer has added the live to one of its collections. Returns False if the viewer is not connected. */
  saved?: Maybe<Scalars['Boolean']['output']>;
};

/** Information about the localization. */
export type Localization = Node & {
  __typename?: 'Localization';
  /** The list of countries that have fallback. */
  fallbackCountries?: Maybe<FallbackCountryConnection>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The localization of the connected user. */
  me?: Maybe<LocalizationMe>;
  /** The countries that are supported. */
  supportedCountries?: Maybe<SupportedCountryConnection>;
  /** The languages that are supported. */
  supportedLanguages?: Maybe<SupportedLanguageConnection>;
};


/** Information about the localization. */
export type LocalizationFallbackCountriesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Information about the localization. */
export type LocalizationSupportedCountriesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Information about the localization. */
export type LocalizationSupportedLanguagesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** Information about the localization of the connected user. */
export type LocalizationMe = Node & {
  __typename?: 'LocalizationMe';
  /** The country of the connected user. */
  country?: Maybe<Country>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The subdivision of the connected user. */
  subdivision?: Maybe<Subdivision>;
};

/** Types that can be a Media. */
export type Media = Live | Video;

/** The possible categories for a media. */
export enum MediaCategory {
  /** The animals category. */
  Animals = 'ANIMALS',
  /** The auto category. */
  Auto = 'AUTO',
  /** The creation category. */
  Creation = 'CREATION',
  /** The fun category. */
  Fun = 'FUN',
  /** The kids category. */
  Kids = 'KIDS',
  /** The lifestyle category. */
  Lifestyle = 'LIFESTYLE',
  /** The music category. */
  Music = 'MUSIC',
  /** The news category. */
  News = 'NEWS',
  /** The people category. */
  People = 'PEOPLE',
  /** The school category. */
  School = 'SCHOOL',
  /** The shortfilms category. */
  Shortfilms = 'SHORTFILMS',
  /** The sport category. */
  Sport = 'SPORT',
  /** The tech category. */
  Tech = 'TECH',
  /** The travel category. */
  Travel = 'TRAVEL',
  /** The tv category. */
  Tv = 'TV',
  /** The videogames category. */
  Videogames = 'VIDEOGAMES',
  /** The webcam category. */
  Webcam = 'WEBCAM'
}

/** The connection type for Media. */
export type MediaConnection = {
  __typename?: 'MediaConnection';
  /** A list of edges. */
  edges: Array<Maybe<MediaEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type MediaEdge = {
  __typename?: 'MediaEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Media>;
};

/** The moderation information of a media. */
export type MediaModeration = Node & {
  __typename?: 'MediaModeration';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The reviewed date (DateTime ISO8601) of the media. */
  reviewedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** Information about the media publishing. */
export type MediaPublishingInfo = {
  __typename?: 'MediaPublishingInfo';
  /** The percentage of media publishing progress. */
  percentage?: Maybe<Scalars['Int']['output']>;
};

/** The possible qualities for a media. */
export enum MediaQuality {
  /** HD 720p quality. */
  Hd720P = 'HD720P',
  /** HD 720p60 quality. */
  Hd720P60 = 'HD720P60',
  /** HD 1080p quality. */
  Hd1080P = 'HD1080P',
  /** HD 1080p60 quality. */
  Hd1080P60 = 'HD1080P60',
  /** HQ 480p quality. */
  Hq480P = 'HQ480P',
  /** LD 240p quality. */
  Ld240P = 'LD240P',
  /** SD 384p quality. */
  Sd384P = 'SD384P',
  /** UHD 1440p quality. */
  Uhd1440P = 'UHD1440P',
  /** UHD 1440p60 quality. */
  Uhd1440P60 = 'UHD1440P60',
  /** UHD 2160p quality. */
  Uhd2160P = 'UHD2160P',
  /** UHD 2160p60 quality. */
  Uhd2160P60 = 'UHD2160P60'
}

/** Types that can be a MediaStreams. */
export type MediaStreams = LiveStreams | VideoStreams;

/** The connection type for MediaStreams. */
export type MediaStreamsConnection = {
  __typename?: 'MediaStreamsConnection';
  /** A list of edges. */
  edges: Array<Maybe<MediaStreamsEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type MediaStreamsEdge = {
  __typename?: 'MediaStreamsEdge';
  /** The item at the end of the edge. */
  node?: Maybe<MediaStreams>;
};

/** Information about the tag of a media. */
export type MediaTag = Node & {
  __typename?: 'MediaTag';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The label of the tag. */
  label?: Maybe<Scalars['String']['output']>;
};

/** The connection type for Media Tag. */
export type MediaTagConnection = {
  __typename?: 'MediaTagConnection';
  /** A list of edges. */
  edges: Array<Maybe<MediaTagEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type MediaTagEdge = {
  __typename?: 'MediaTagEdge';
  /** The item at the end of the edge. */
  node?: Maybe<MediaTag>;
};

/** The possible types for a media. */
export enum MediaType {
  /** A media that represents a `Live`. */
  Live = 'LIVE',
  /** A media that represents a `Video`. */
  Video = 'VIDEO'
}

/** Information about the media uploading. */
export type MediaUploadInfo = Node & {
  __typename?: 'MediaUploadInfo';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Information about the media publishing. */
  publishing?: Maybe<MediaPublishingInfo>;
};

/** Information about a metadata. */
export type Metadata = Node & {
  __typename?: 'Metadata';
  /** Information about the algorithm used to retrieve data. */
  algorithm?: Maybe<Algorithm>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

/** Information about a metric. */
export type Metric = {
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total count of the metric being measured. */
  total?: Maybe<Scalars['Int']['output']>;
};

/**
 *
 * Information about an performed moderation action
 *
 */
export type ModerationAction = {
  __typename?: 'ModerationAction';
  /** The date when the moderation action was performed. */
  date: Scalars['Date']['output'];
  /** The reference number of the moderation action. */
  referenceNumber: Scalars['String']['output'];
};

/** Input for < Mutation.moderationActionAppeal > */
export type ModerationActionAppealInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Extra user comments (limited to 1024 chars). */
  comment?: InputMaybe<Scalars['String']['input']>;
  /** Reason of appeal. */
  reason: AppealReason;
  /** Appeal request token came from moderation notification emails */
  token: Scalars['String']['input'];
};

/** Response of < Mutation.moderationActionAppeal > */
export type ModerationActionAppealPayload = {
  __typename?: 'ModerationActionAppealPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status: Status;
};

/** Monetization insights notification settings. */
export type MonetizationInsights = Node & {
  __typename?: 'MonetizationInsights';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates whether the email notification setting is enabled. */
  isEmailEnabled?: Maybe<Scalars['Boolean']['output']>;
};

/** The mutation root of Dailymotion's GraphQL API. */
export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Activate a user by its validation key.
   * @deprecated Use `/oauth/token` endpoint with grant_type `validate_code`.
   */
  activateUser?: Maybe<ActivateUserPayload>;
  /** Add a video to a collection. */
  addCollectionVideo?: Maybe<AddCollectionVideoPayload>;
  /** Add a post with a rating to the likes list of the connected user. If the post is already rated, it updates the rating. */
  addLike?: Maybe<LikePayload>;
  /** Add a video to the `Watch Later` list of the connected user. */
  addWatchLaterVideo?: Maybe<AddWatchLaterVideoPayload>;
  /** Create an analytics report. */
  analyticsReportCreate?: Maybe<AnalyticsReportCreatePayload>;
  /** Ask to generate a custom report. */
  askPartnerReportFile?: Maybe<AskPartnerReportFilePayload>;
  /** Create a channel. */
  channelCreate?: Maybe<ChannelCreatePayload>;
  /** Remove all medias from a collection. */
  clearCollectionMedias?: Maybe<ClearCollectionMediasPayload>;
  /** Removes all the videos the connected user has liked. */
  clearLikedVideos?: Maybe<ClearLikedVideosPayload>;
  /** Removes all the videos from the `WatchLater` list of the connected user. */
  clearWatchLaterVideos?: Maybe<ClearWatchLaterVideosPayload>;
  /** Removes all the videos from the user `Watched`. */
  clearWatchedVideos?: Maybe<ClearWatchedVideosPayload>;
  /** Create a new rule for feature flipping or AB experiments. */
  createBehaviorRule?: Maybe<CreateBehaviorRulePayload>;
  /** Create a collection. */
  createCollection?: Maybe<CreateCollectionPayload>;
  /** Create a reaction in a recording format to respond to a story. */
  createReaction?: Maybe<ReactionPayload>;
  /** Creates a user. */
  createUser?: Maybe<CreateUserPayload>;
  /** Create a video. */
  createVideo?: Maybe<CreateVideoPayload>;
  /** Delete a rule used for feature flipping or AB experiments. */
  deleteBehaviorRule?: Maybe<DeleteBehaviorRulePayload>;
  /** Delete a reaction. */
  deleteReaction?: Maybe<DeleteReactionPayload>;
  /** Delete a user. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Delete a video. */
  deleteVideo?: Maybe<DeleteVideoPayload>;
  /** Follow a channel for the connected user. */
  followChannel?: Maybe<FollowChannelPayload>;
  /** Follow multiple channels for the connected user. */
  followChannels?: Maybe<FollowChannelsPayload>;
  /** The topic the user wants to follow. */
  followTopic?: Maybe<FollowTopicPayload>;
  /** Follow multiple topics for the connected user. */
  followTopics?: Maybe<FollowTopicsPayload>;
  /** Follow a user for the connected user. */
  followedUserAdd?: Maybe<FollowUserPayload>;
  /** Unfollow a user for the connected user. */
  followedUserRemove?: Maybe<UnfollowUserPayload>;
  /** Generate a URL to upload a file. */
  generateFileUploadUrl?: Maybe<GenerateFileUploadUrlPayload>;
  /**
   * Like a video for the connected user.
   * @deprecated Use mutation `addLike`.
   */
  likeVideo?: Maybe<LikeVideoPayload>;
  /**
   *
   *   Submit an appeal.
   *   It may raise following GraphQL errors:
   *   - token is invalid (type=bad_request, reason=invalid_token)
   *   - token is expired (type=bad_reqeust, reason=token_expired)
   *   - appeal already exists (type=bad_reqeust, reason=appeal_already_exists)
   *   - appeal is invalid (type=bad_reqeust, reason=invalid_appeal)
   *   - appeal in review (type=bad_reqeust, reason=appeal_in_review)
   *
   */
  moderationActionAppeal?: Maybe<ModerationActionAppealPayload>;
  /** Update the push notification settings on a followed channel of the connected user. */
  notificationFollowedChannelUpdate?: Maybe<NotificationFollowedChannelUpdatePayload>;
  /** Manage poll answer for the connected user. */
  pollAnswer?: Maybe<PollAnswerPayload>;
  /**
   * Respond to a video by creating a reaction video.
   * @deprecated Use mutation `createReaction`.
   */
  reactionVideoCreate?: Maybe<ReactionVideoPayload>;
  /**
   * Delete a reaction video.
   * @deprecated Use mutation `deleteReaction`.
   */
  reactionVideoDelete?: Maybe<ReactionVideoDeletePayload>;
  /**
   * Update information about a reaction video.
   * @deprecated Use mutation `updateReaction`.
   */
  reactionVideoUpdate?: Maybe<ReactionVideoPayload>;
  /** Request to recover the password of a user. */
  recoverPassword?: Maybe<RecoverPasswordPayload>;
  /** Delete a collection. */
  removeCollection?: Maybe<RemoveCollectionPayload>;
  /** Remove a video from a collection. */
  removeCollectionVideo?: Maybe<RemoveCollectionVideoPayload>;
  /** Remove a post from the likes list of the connected user. */
  removeLike?: Maybe<LikePayload>;
  /** Removes a video from the `WatchLater` list of the connected user. */
  removeWatchLaterVideo?: Maybe<RemoveWatchLaterVideoPayload>;
  /** Removes a video from the `Watched` list of the connected user. */
  removeWatchedVideo?: Maybe<RemoveWatchedVideoPayload>;
  /** Reorder a media in a collection. */
  reorderCollectionMedia?: Maybe<ReorderCollectionMediaPayload>;
  /** Report a creator for violating the community guidelines. */
  reportCreator: ReportCreatorPayload;
  /** Report an inappropriate video. */
  reportVideo?: Maybe<ReportVideoPayload>;
  /** Verify the email of the reporter, if the reporter is not connected. */
  reporterEmailVerify: ReporterEmailVerifyPayload;
  /** Generate an activation code by a validation token. */
  requestActivationCode?: Maybe<RequestActivationCodePayload>;
  /** Change the password of the user after requesting recover password. */
  resetPassword?: Maybe<ResetPasswordPayload>;
  /** Send a transactional email using an email provider. */
  sendTransactionalEmail?: Maybe<SendTransactionalEmailPayload>;
  /**
   * Request a validation email to confirm the account.
   * @deprecated Use mutation `requestActivationCode`.
   */
  sendValidationEmail?: Maybe<SendValidationEmailPayload>;
  /** Unfollow a channel for the connected user. */
  unfollowChannel?: Maybe<UnfollowChannelPayload>;
  /** Unfollow a topic for the connected user. */
  unfollowTopic?: Maybe<UnfollowTopicPayload>;
  /**
   * Unlike a video for the connected user.
   * @deprecated Use mutation `removeLike`.
   */
  unlikeVideo?: Maybe<UnlikeVideoPayload>;
  /** Update a rule used for feature flipping or AB experiments. */
  updateBehaviorRule?: Maybe<UpdateBehaviorRulePayload>;
  /** Update a channel. */
  updateChannel?: Maybe<UpdateChannelPayload>;
  /** Update a collection. */
  updateCollection?: Maybe<UpdateCollectionPayload>;
  /** Update the email notification settings of the connected user. */
  updateNotificationSettingsEmail?: Maybe<UpdateNotificationSettingsEmailPayload>;
  /** Update the push notification settings of the connected user. */
  updateNotificationSettingsPush?: Maybe<UpdateNotificationSettingsPushPayload>;
  /** Update a reaction. */
  updateReaction?: Maybe<ReactionPayload>;
  /** Update information about the current user connected. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Update a video. */
  updateVideo?: Maybe<UpdateVideoPayload>;
  /** Confirm the new email address of the connected user. */
  userEmailChangeConfirm?: Maybe<UserEmailChangeConfirmPayload>;
  /** Request to change the email address of the connected user. */
  userEmailChangeRequest?: Maybe<UserEmailChangeRequestPayload>;
  /** Request a new email confirmation code. */
  userEmailConfirmationCodeReset?: Maybe<UserEmailConfirmationCodeResetPayload>;
  /** Generate an email validation token to request an activation code. */
  userEmailValidationTokenRequest?: Maybe<UserEmailValidationTokenPayload>;
  /** Add an interest to user. */
  userInterestAdd?: Maybe<UserInterestAddPayload>;
  /** Remove an interest from a user. */
  userInterestRemove?: Maybe<UserInterestRemovePayload>;
  /** Replaces the interests of a user with the ids provided. */
  userInterestsUpdate?: Maybe<UserInterestsUpdatePayload>;
  /** Request a code B from OpenWeb. */
  userOpenWebCodeBRequest?: Maybe<UserOpenWebCodeBRequestPayload>;
  /** Add a video to the `Watched` list of the connected user. */
  watchedVideoAdd?: Maybe<WatchedVideoAddPayload>;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationActivateUserArgs = {
  input: ActivateUserInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationAddCollectionVideoArgs = {
  input: AddCollectionVideoInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationAddLikeArgs = {
  input: AddLikeInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationAddWatchLaterVideoArgs = {
  input: AddWatchLaterVideoInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationAnalyticsReportCreateArgs = {
  input: AnalyticsReportCreateInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationAskPartnerReportFileArgs = {
  input: AskPartnerReportFileInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationChannelCreateArgs = {
  input: ChannelCreateInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationClearCollectionMediasArgs = {
  input: ClearCollectionMediasInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationClearLikedVideosArgs = {
  input: ClearLikedVideosInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationClearWatchLaterVideosArgs = {
  input: ClearWatchLaterVideosInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationClearWatchedVideosArgs = {
  input: ClearWatchedVideosInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationCreateBehaviorRuleArgs = {
  input: CreateBehaviorRuleInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationCreateCollectionArgs = {
  input: CreateCollectionInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationCreateReactionArgs = {
  input: CreateReactionInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationCreateVideoArgs = {
  input: CreateVideoInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationDeleteBehaviorRuleArgs = {
  input: DeleteBehaviorRuleInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationDeleteReactionArgs = {
  input: DeleteReactionInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationDeleteVideoArgs = {
  input: DeleteVideoInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationFollowChannelArgs = {
  input: FollowChannelInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationFollowChannelsArgs = {
  input: FollowChannelsInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationFollowTopicArgs = {
  input: FollowTopicInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationFollowTopicsArgs = {
  input: FollowTopicsInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationFollowedUserAddArgs = {
  input: FollowUserInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationFollowedUserRemoveArgs = {
  input: UnfollowUserInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationGenerateFileUploadUrlArgs = {
  input: GenerateFileUploadUrlInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationLikeVideoArgs = {
  input: LikeVideoInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationModerationActionAppealArgs = {
  input: ModerationActionAppealInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationNotificationFollowedChannelUpdateArgs = {
  input: NotificationFollowedChannelUpdateInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationPollAnswerArgs = {
  input: PollAnswerInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationReactionVideoCreateArgs = {
  input: ReactionVideoCreateInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationReactionVideoDeleteArgs = {
  input: ReactionVideoDeleteInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationReactionVideoUpdateArgs = {
  input: ReactionVideoUpdateInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationRecoverPasswordArgs = {
  input: RecoverPasswordInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationRemoveCollectionArgs = {
  input: RemoveCollectionInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationRemoveCollectionVideoArgs = {
  input: RemoveCollectionVideoInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationRemoveLikeArgs = {
  input: RemoveLikeInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationRemoveWatchLaterVideoArgs = {
  input: RemoveWatchLaterVideoInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationRemoveWatchedVideoArgs = {
  input: RemoveWatchedVideoInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationReorderCollectionMediaArgs = {
  input: ReorderCollectionMediaInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationReportCreatorArgs = {
  input: ReportCreatorInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationReportVideoArgs = {
  input: ReportVideoInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationReporterEmailVerifyArgs = {
  input: ReporterEmailVerifyInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationRequestActivationCodeArgs = {
  input: RequestActivationCodeInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationSendTransactionalEmailArgs = {
  input: SendTransactionalEmailInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationSendValidationEmailArgs = {
  input: SendValidationEmailInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationUnfollowChannelArgs = {
  input: UnfollowChannelInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationUnfollowTopicArgs = {
  input: UnfollowTopicInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationUnlikeVideoArgs = {
  input: UnlikeVideoInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationUpdateBehaviorRuleArgs = {
  input: UpdateBehaviorRuleInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationUpdateChannelArgs = {
  input: UpdateChannelInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationUpdateCollectionArgs = {
  input: UpdateCollectionInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationUpdateNotificationSettingsEmailArgs = {
  input: UpdateNotificationSettingsEmailInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationUpdateNotificationSettingsPushArgs = {
  input: UpdateNotificationSettingsPushInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationUpdateReactionArgs = {
  input: UpdateReactionInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationUpdateVideoArgs = {
  input: UpdateVideoInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationUserEmailChangeConfirmArgs = {
  input: UserEmailChangeConfirmInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationUserEmailChangeRequestArgs = {
  input: UserEmailChangeRequestInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationUserEmailConfirmationCodeResetArgs = {
  input: UserEmailConfirmationCodeResetInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationUserEmailValidationTokenRequestArgs = {
  input: UserEmailValidationTokenInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationUserInterestAddArgs = {
  input: UserInterestAddInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationUserInterestRemoveArgs = {
  input: UserInterestRemoveInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationUserInterestsUpdateArgs = {
  input: UserInterestsUpdateInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationUserOpenWebCodeBRequestArgs = {
  input: UserOpenWebCodeBRequestInput;
};


/** The mutation root of Dailymotion's GraphQL API. */
export type MutationWatchedVideoAddArgs = {
  input: WatchedVideoAddInput;
};

/** The neon object represents the view of NEON apps. */
export type Neon = Node & {
  __typename?: 'Neon';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The sections in the neon view. */
  sections?: Maybe<SectionConnection>;
  /** Information about the URI passed as argument. */
  web?: Maybe<Web>;
};


/** The neon object represents the view of NEON apps. */
export type NeonSectionsArgs = {
  context?: InputMaybe<SectionContextArgument>;
  device?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  followingChannelXids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  followingTopicXids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  space: Scalars['String']['input'];
  watchedVideoXids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** The neon object represents the view of NEON apps. */
export type NeonWebArgs = {
  uri: Scalars['String']['input'];
};

/** The possible values which network channel connections can be sorted by. */
export enum NetworkChannelsSort {
  /** Sort network channels by number of followers. */
  Popular = 'POPULAR',
  /** Sort network channels by most recent. */
  Recent = 'RECENT'
}

/** Represents a node with an ID. */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

/** The input fields to update the push notification settings on a followed channel of the connected user. */
export type NotificationFollowedChannelUpdateInput = {
  /** The Dailymotion ID of the channel. */
  channelXid: Scalars['String']['input'];
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Indicate whether to enable the notification of the channel. */
  isEnabled: Scalars['Boolean']['input'];
};

/** The return fields from updating the push notification settings on a followed channel of the connected user. */
export type NotificationFollowedChannelUpdatePayload = {
  __typename?: 'NotificationFollowedChannelUpdatePayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The notification settings of the connected user. */
export type NotificationSettings = Node & {
  __typename?: 'NotificationSettings';
  /** The notification settings to receive when a channel the connected user follows starts a live. */
  followingChannelStartsLive?: Maybe<FollowingChannelStartsLive>;
  /** The notification settings to receive when a channel the connected user follows uploads a new video. */
  followingChannelUploadsVideo?: Maybe<FollowingChannelUploadsVideo>;
  /** The notification settings to receive when a channel or topic the connected user follows starts a live. */
  followingStartsLive?: Maybe<FollowingStartsLive>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicate whether to receive occasionally about monetization insigths. */
  monetizationInsights?: Maybe<MonetizationInsights>;
  /** The notification settings to receive when there are new feature and product updates. */
  productUpdates?: Maybe<ProductUpdates>;
  /** The notification settings to receive when the connected user has unwatched vidoes in the `WatchLater` list. */
  remindUnwatchedVideos?: Maybe<RemindUnwatchedVideos>;
  /** The notification settings to receive occasionally about `tips and tricks`. */
  tips?: Maybe<Tips>;
  /** The notification settings to receive occasionally about `curated videos for you`. */
  videoDigest?: Maybe<VideoDigest>;
};

/** The possible order direction that a `order by` sql can use. */
export enum OrderDirection {
  /** Order ascending. */
  Asc = 'ASC',
  /** Order descending. */
  Desc = 'DESC'
}

/** An organization manages users and channels. */
export type Organization = Node & {
  __typename?: 'Organization';
  /** The analytics of the organization. */
  analysis?: Maybe<OrganizationAnalysis>;
  /** The analytics of the organization. */
  analytics?: Maybe<Analytics>;
  /** The category of the organization. */
  category?: Maybe<OrganizationCategory>;
  /** The channels of the organization. */
  channels?: Maybe<ChannelConnection>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The name of the organization. */
  name?: Maybe<Scalars['String']['output']>;
  /** The owner of this organization. */
  owner?: Maybe<User>;
  /** The stats of the organization. */
  stats?: Maybe<OrganizationStats>;
  /** The maximum number of users allowed to manage the organization (not including the owner). */
  userLimit?: Maybe<Scalars['Int']['output']>;
  /** The Dailymotion ID of an organization. */
  xid: Scalars['String']['output'];
};


/** An organization manages users and channels. */
export type OrganizationChannelsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  xids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** The analytics of the organization. */
export type OrganizationAnalysis = Node & {
  __typename?: 'OrganizationAnalysis';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Retrieve previously created reports. */
  reports: AnalyticsReportConnection;
};


/** The analytics of the organization. */
export type OrganizationAnalysisReportsArgs = {
  channelXid?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** The possible categories for an organization. */
export enum OrganizationCategory {
  /** A family category. */
  Family = 'FAMILY',
  /** An mcn category. */
  Mcn = 'MCN',
  /** A standalone category. */
  Standalone = 'STANDALONE'
}

/** The connection type for Organization. */
export type OrganizationConnection = {
  __typename?: 'OrganizationConnection';
  /** A list of edges. */
  edges: Array<Maybe<OrganizationEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type OrganizationEdge = {
  __typename?: 'OrganizationEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Organization>;
  /** The permission of the user for the organization. */
  permission?: Maybe<OrganizationPermission>;
};

/** The permission of the user for the organization. */
export type OrganizationPermission = {
  __typename?: 'OrganizationPermission';
  /** The permission level of the user for the organization. */
  level?: Maybe<OrganizationRole>;
};

/** The possible values of a role in an Organization. */
export enum OrganizationRole {
  /** The organization role that represents an admin. */
  Admin = 'ADMIN',
  /** The organization role that represents an editor. */
  Editor = 'EDITOR',
  /** The organization role that represents an owner. */
  Owner = 'OWNER'
}

/** Information about the organization stats. */
export type OrganizationStats = Node & {
  __typename?: 'OrganizationStats';
  /** The channel stats of the organization. */
  channels?: Maybe<OrganizationStatsChannels>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

/** The channel stats of the organization. */
export type OrganizationStatsChannels = Node & {
  __typename?: 'OrganizationStatsChannels';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of channels in the organization. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** Information to aid in pagination. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Indicates whether there are more items in the next page. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether there are more items in the previous page. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** The next page number, if hasNextPage is True. */
  nextPage?: Maybe<Scalars['Int']['output']>;
};

/** Information about a partner. */
export type Partner = Node & {
  __typename?: 'Partner';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The organizations of the partner. */
  organizations?: Maybe<OrganizationConnection>;
};


/** Information about a partner. */
export type PartnerOrganizationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** The possible values for a dimension in a partner report. */
export enum PartnerReportDimension {
  /** Aggregate data report by account id dimension. */
  AccountId = 'ACCOUNT_ID',
  /** Aggregate data report by account username dimension. */
  AccountUsername = 'ACCOUNT_USERNAME',
  /** Aggregate data report by action dimension. */
  Action = 'ACTION',
  /** Aggregate data report by ads txt status dimension. */
  AdsTxtStatus = 'ADS_TXT_STATUS',
  /** Aggregate data report by ad error code. */
  AdErrorCode = 'AD_ERROR_CODE',
  /** Aggregate data report by ad error human readable strings. */
  AdErrorReadable = 'AD_ERROR_READABLE',
  /** Aggregate data report by ad format dimension. */
  AdFormat = 'AD_FORMAT',
  /** Aggregate data report by buyers. */
  Buyer = 'BUYER',
  /** Aggregate data report by buyertypes. */
  Buyertype = 'BUYERTYPE',
  /** Aggregate data report by channel slug dimension. */
  ChannelSlug = 'CHANNEL_SLUG',
  /** Aggregate data report by claimer channel dimension. */
  ClaimerChannel = 'CLAIMER_CHANNEL',
  /** Aggregate data report by claimer or parent username dimension. */
  ClaimerOrParentUsername = 'CLAIMER_OR_PARENT_USERNAME',
  /** Aggregate data report by content tag dimension. */
  ContentTag = 'CONTENT_TAG',
  /** Aggregate data report by content tag list dimension. */
  ContentTagList = 'CONTENT_TAG_LIST',
  /** Aggregate data report by content type dimension. */
  ContentType = 'CONTENT_TYPE',
  /** Aggregate data report by day dimension. */
  Day = 'DAY',
  /** Aggregate data report by hour dimension. */
  Hour = 'HOUR',
  /** Aggregate data report by one of these three positions  Pre-roll, Mid-roll, Post-roll. */
  InventoryPosition = 'INVENTORY_POSITION',
  /** Aggregate data report by media type dimension. */
  MediaType = 'MEDIA_TYPE',
  /** Aggregate data report by minute dimension. */
  Minute = 'MINUTE',
  /** Aggregate data report by monetization product dimension. */
  MonetizationProduct = 'MONETIZATION_PRODUCT',
  /** Aggregate data report by monetization type dimension. */
  MonetizationType = 'MONETIZATION_TYPE',
  /** Aggregate data report by month dimension. */
  Month = 'MONTH',
  /** Aggregate data report by no ad reason human readable. */
  NoadReasonReadable = 'NOAD_REASON_READABLE',
  /** Aggregate data report by outcome (ad errors, no fills and timeout). */
  Outcome = 'OUTCOME',
  /** Aggregate data report by owner or parent username dimension. */
  OwnerOrParentUsername = 'OWNER_OR_PARENT_USERNAME',
  /** Aggregate data report by parent account id bucket dimension. */
  ParentAccountId = 'PARENT_ACCOUNT_ID',
  /** Aggregate data report by parent account username dimension. */
  ParentAccountUsername = 'PARENT_ACCOUNT_USERNAME',
  /** Aggregate data report by player id dimension. */
  PlayerId = 'PLAYER_ID',
  /** Aggregate data report by player size dimension. */
  PlayerSize = 'PLAYER_SIZE',
  /** Aggregate data report by player size bucket dimension. */
  PlayerSizeBucket = 'PLAYER_SIZE_BUCKET',
  /** Aggregate data report by player title dimension. */
  PlayerTitle = 'PLAYER_TITLE',
  /** Aggregate data report by playlist id dimension. */
  PlaylistId = 'PLAYLIST_ID',
  /** Aggregate data report by playlist title dimension. */
  PlaylistTitle = 'PLAYLIST_TITLE',
  /** Aggregate data report by playlist type dimension. */
  PlaylistType = 'PLAYLIST_TYPE',
  /** Aggregate data report by publisher channel dimension. */
  PublisherChannel = 'PUBLISHER_CHANNEL',
  /** Aggregate data report by publisher or parent username dimension. */
  PublisherOrParentUsername = 'PUBLISHER_OR_PARENT_USERNAME',
  /** Aggregate data report by video id dimension. */
  VideoId = 'VIDEO_ID',
  /** Aggregate data report by video owner channel slug dimension. */
  VideoOwnerChannelSlug = 'VIDEO_OWNER_CHANNEL_SLUG',
  /** Aggregate data report by video position dimension. */
  VideoPosition = 'VIDEO_POSITION',
  /** Aggregate data report by video title dimension. */
  VideoTitle = 'VIDEO_TITLE',
  /** Aggregate data report by visibility. */
  Visibility = 'VISIBILITY',
  /** Aggregate data report by visitor country dimension. */
  VisitorCountry = 'VISITOR_COUNTRY',
  /** Aggregate data report by visitor device type dimension. */
  VisitorDeviceType = 'VISITOR_DEVICE_TYPE',
  /** Aggregate data report by visitor domain group dimension. */
  VisitorDomainGroup = 'VISITOR_DOMAIN_GROUP',
  /** Aggregate data report by visitor page url dimension. */
  VisitorPageUrl = 'VISITOR_PAGE_URL',
  /** Aggregate data report by visitor subdomain dimension. */
  VisitorSubdomain = 'VISITOR_SUBDOMAIN'
}

/** A partner report file. */
export type PartnerReportFile = Node & {
  __typename?: 'PartnerReportFile';
  /** The creation date of the report. */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** The download links of the report. */
  downloadLinks?: Maybe<ReportFileDownloadLinkConnection>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The token identifying the report. */
  reportToken?: Maybe<Scalars['String']['output']>;
  /** The status of the report generation. */
  status?: Maybe<PartnerReportStatus>;
};


/** A partner report file. */
export type PartnerReportFileDownloadLinksArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** The possible media type filters for a partner report. */
export enum PartnerReportFilterMediaType {
  /** A media that represents a `Live`. */
  Live = 'LIVE',
  /** A media that represents a `Video`. */
  Video = 'VIDEO'
}

/** The possible monetization filter types for a partner report. */
export enum PartnerReportFilterMonetizationType {
  /** Claim. */
  Claim = 'CLAIM',
  /** Video monetization. */
  VideoMonetization = 'VIDEO_MONETIZATION',
  /** Website monetization. */
  WebsiteMonetization = 'WEBSITE_MONETIZATION'
}

/** The input fields of a partner report filter. */
export type PartnerReportFilters = {
  /** Filter analytics reports by a channel slug. */
  channelSlug?: InputMaybe<Scalars['String']['input']>;
  /** Filter analytics reports by a media type. */
  mediaType?: InputMaybe<PartnerReportFilterMediaType>;
  /** Filter analytics reports by a monetization type. */
  monetizationType?: InputMaybe<PartnerReportFilterMonetizationType>;
  /** Filter analytics reports by a video owner channel slug. */
  videoOwnerChannelSlug?: InputMaybe<Scalars['String']['input']>;
  /** Filter analytics reports by a visitor domain group. */
  visitorDomainGroup?: InputMaybe<Scalars['String']['input']>;
};

/** The possible metrics in a partner report. */
export enum PartnerReportMetric {
  /** Use ad errors metric as report measurement. */
  AdErrors = 'AD_ERRORS',
  /** Use ad view completed as report measurement. */
  AdViewCompleted = 'AD_VIEW_COMPLETED',
  /** Use ad view not completed metric as report measurement. */
  AdViewNotCompleted = 'AD_VIEW_NOT_COMPLETED',
  /** Use bandwidth used live bytes metric as report mesurement. */
  BandwidthUsedLiveBytes = 'BANDWIDTH_USED_LIVE_BYTES',
  /** Use bandwidth used live seconds metric as report mesurement. */
  BandwidthUsedLiveSeconds = 'BANDWIDTH_USED_LIVE_SECONDS',
  /** Use bandwidth used media count metric as report measurement. */
  BandwidthUsedMediaCount = 'BANDWIDTH_USED_MEDIA_COUNT',
  /** Use bandwidth used vod bytes metric as report measurement. */
  BandwidthUsedVodBytes = 'BANDWIDTH_USED_VOD_BYTES',
  /** Use bandwidth used vod seconds metric as report measurement. */
  BandwidthUsedVodSeconds = 'BANDWIDTH_USED_VOD_SECONDS',
  /** Use ecpm eur metric as report measurement. */
  EcpmEur = 'ECPM_EUR',
  /** Use ecpm usd metric as report measurement. */
  EcpmUsd = 'ECPM_USD',
  /** Use erpm eur metric as report measurement. */
  ErpmEur = 'ERPM_EUR',
  /** Use erpm usd metric as report measurement. */
  ErpmUsd = 'ERPM_USD',
  /** Use estimated earnings eur metric as report measurement. */
  EstimatedEarningsEur = 'ESTIMATED_EARNINGS_EUR',
  /** Use estimated earnings eur old metric as report measurement. */
  EstimatedEarningsEurOld = 'ESTIMATED_EARNINGS_EUR_OLD',
  /** Use estimated earnings usd metric as report measurement. */
  EstimatedEarningsUsd = 'ESTIMATED_EARNINGS_USD',
  /** Use estimated earnings usd old metric as report measurement. */
  EstimatedEarningsUsdOld = 'ESTIMATED_EARNINGS_USD_OLD',
  /** Use fill rate metric as report measurement. */
  FillRate = 'FILL_RATE',
  /** Use gdpr empty consent inventory metric as report measurement. */
  GdprEmptyConsentInventory = 'GDPR_EMPTY_CONSENT_INVENTORY',
  /** Use gdpr error consent inventory metric as report measurement. */
  GdprErrorConsentInventory = 'GDPR_ERROR_CONSENT_INVENTORY',
  /** Use gdpr full consent inventory metric as report measurement. */
  GdprFullConsentInventory = 'GDPR_FULL_CONSENT_INVENTORY',
  /** Use gdpr full consent score metric as report measurement. */
  GdprFullConsentScore = 'GDPR_FULL_CONSENT_SCORE',
  /** Use gdpr other consent inventory metric as report measurement. */
  GdprOtherConsentInventory = 'GDPR_OTHER_CONSENT_INVENTORY',
  /** Use gdpr refuse consent inventory metric as report measurement. */
  GdprRefuseConsentInventory = 'GDPR_REFUSE_CONSENT_INVENTORY',
  /** Use high viewable impressions as report measurement. */
  HighViewableImpressions = 'HIGH_VIEWABLE_IMPRESSIONS',
  /** Use impressions metric as report measurement. */
  Impressions = 'IMPRESSIONS',
  /** Use invalid traffic inventory metric as report measurement. */
  InvalidTrafficInventory = 'INVALID_TRAFFIC_INVENTORY',
  /** Use IVT score metric as report measurement. */
  IvtScore = 'IVT_SCORE',
  /** Use live time watched (seconds) metric as report measurement. */
  LiveTimeWatchedSeconds = 'LIVE_TIME_WATCHED_SECONDS',
  /** Use live viewers metric as report measurement. */
  LiveViewers = 'LIVE_VIEWERS',
  /** Use low viewable impressions as report measurement. */
  LowViewableImpressions = 'LOW_VIEWABLE_IMPRESSIONS',
  /** Use impressions metric as report measurement. */
  NbImpression = 'NB_IMPRESSION',
  /** Use nb inventory gdpr missing full consent metric as report measurement. */
  NbInventoryGdprMissingFullConsent = 'NB_INVENTORY_GDPR_MISSING_FULL_CONSENT',
  /** Use number of missed impression metric as report measurement. */
  NbMissedImpression = 'NB_MISSED_IMPRESSION',
  /** Use no_ads metric as report measurement. */
  NoAds = 'NO_ADS',
  /** Use no ads txt inventory metric as report measurement. */
  NoAdsTxtInventory = 'NO_ADS_TXT_INVENTORY',
  /** Use no_ad_rate metric as report measurement. */
  NoAdRate = 'NO_AD_RATE',
  /** Use no brand safe inventory metric as report measurement. */
  NoBrandsafeInventory = 'NO_BRANDSAFE_INVENTORY',
  /** Use no_fills metric as report measurement. */
  NoFills = 'NO_FILLS',
  /** Use no monetized inventory metric as report measurement. */
  NoMonetizedInventory = 'NO_MONETIZED_INVENTORY',
  /** Use sellable inventory metric as report measurement. */
  SellableInventory = 'SELLABLE_INVENTORY',
  /** Use storage lifetime used bytes metric as report measurement. */
  StorageLifetimeUsedBytes = 'STORAGE_LIFETIME_USED_BYTES',
  /** Use storage lifetime used media count metric as report measurement. */
  StorageLifetimeUsedMediaCount = 'STORAGE_LIFETIME_USED_MEDIA_COUNT',
  /** Use storage lifetime used rendition count metric as report measurement. */
  StorageLifetimeUsedRenditionCount = 'STORAGE_LIFETIME_USED_RENDITION_COUNT',
  /** Use storage lifetime used seconds metric as report measurement. */
  StorageLifetimeUsedSeconds = 'STORAGE_LIFETIME_USED_SECONDS',
  /** Use storage used bytes metric as report measurement. */
  StorageUsedBytes = 'STORAGE_USED_BYTES',
  /** Use storage used media count metric as report measurement. */
  StorageUsedMediaCount = 'STORAGE_USED_MEDIA_COUNT',
  /** Use storage used rendition count metric as report measurement. */
  StorageUsedRenditionCount = 'STORAGE_USED_RENDITION_COUNT',
  /** Use storage used seconds metric as report measurement. */
  StorageUsedSeconds = 'STORAGE_USED_SECONDS',
  /** Use timeouts metric as report measurement. */
  Timeouts = 'TIMEOUTS',
  /** Use time watched seconds metric as report measurement. */
  TimeWatchedSeconds = 'TIME_WATCHED_SECONDS',
  /** Use total inventory metric as report measurement. */
  TotalInventory = 'TOTAL_INVENTORY',
  /** Use transcoding used live media count metric as report measurement. */
  TranscodingUsedLiveMediaCount = 'TRANSCODING_USED_LIVE_MEDIA_COUNT',
  /** Use transcoding used live seconds metric as report measurement. */
  TranscodingUsedLiveSeconds = 'TRANSCODING_USED_LIVE_SECONDS',
  /** Use transcoding used vod media count metric as report measurement. */
  TranscodingUsedVodMediaCount = 'TRANSCODING_USED_VOD_MEDIA_COUNT',
  /** Use transcoding used vod seconds metric as report measurement. */
  TranscodingUsedVodSeconds = 'TRANSCODING_USED_VOD_SECONDS',
  /** Use uploads metric as report measurement. */
  Uploads = 'UPLOADS',
  /** Use valid traffic inventory metric as report measurement. */
  ValidTrafficInventory = 'VALID_TRAFFIC_INVENTORY',
  /** Use viewability score metric as report measurement. */
  ViewabilityScore = 'VIEWABILITY_SCORE',
  /** Use views metric as report measurement. */
  Views = 'VIEWS',
  /** Use views_through_rate metric as report measurement. */
  ViewThroughRate = 'VIEW_THROUGH_RATE',
  /** Use vtr score metric as report measurement. */
  VtrScore = 'VTR_SCORE'
}

/** The possible values for a product in a partner report. */
export enum PartnerReportProduct {
  /** Every product available. */
  All = 'ALL',
  /** The product claim. */
  Claim = 'CLAIM',
  /** The product content. */
  Content = 'CONTENT',
  /** The product embed. */
  Embed = 'EMBED'
}

/** The possible values of a partner report status. */
export enum PartnerReportStatus {
  /** Report generation has expired. */
  Expired = 'EXPIRED',
  /** Report generation has failed. */
  Failed = 'FAILED',
  /** Report generation is finished. */
  Finished = 'FINISHED',
  /** Report generation is in progress. */
  InProgress = 'IN_PROGRESS'
}

/** Advanced partner features. */
export type PartnerSpace = Node & {
  __typename?: 'PartnerSpace';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** A generated report file of the partner. */
  reportFile?: Maybe<PartnerReportFile>;
};


/** Advanced partner features. */
export type PartnerSpaceReportFileArgs = {
  reportToken: Scalars['String']['input'];
};

/** Information about a player. */
export type Player = Node & {
  __typename?: 'Player';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Information about the player queue. */
  queue?: Maybe<PlayerQueue>;
};


/** Information about a player. */
export type PlayerQueueArgs = {
  algorithm?: InputMaybe<PlayerQueueAlgorithmName>;
  context?: InputMaybe<PlayerQueueContextArgument>;
};

/** The possible values for an algorithm's name. */
export enum PlayerAlgorithmName {
  /** An algorithm based on the creator catalog. */
  Creator = 'CREATOR',
  /** An algorithm based on the organization catalog. */
  Organization = 'ORGANIZATION'
}

/** Information aboot the player queue. */
export type PlayerQueue = Node & {
  __typename?: 'PlayerQueue';
  /** Indicates whether the player queue has auto play next. */
  hasAutoPlayNext?: Maybe<Scalars['Boolean']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The name of the player queue. */
  name?: Maybe<Scalars['String']['output']>;
  /** The recordings of the player queue. */
  recordings?: Maybe<RecommendedRecordingConnection>;
  /**
   * The videos of the player queue.
   * @deprecated Use `recordings` field.
   */
  videos?: Maybe<VideoConnection>;
};


/** Information aboot the player queue. */
export type PlayerQueueRecordingsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Information aboot the player queue. */
export type PlayerQueueVideosArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** The possible values for a algorithm's name. */
export enum PlayerQueueAlgorithmName {
  /** An engagement algorithm. */
  Engagement = 'ENGAGEMENT',
  /** A monetization algorithm. */
  Monetization = 'MONETIZATION',
  /** A views algorithm. */
  Views = 'VIEWS'
}

/** The input fields of a player queue context argument. */
export type PlayerQueueContextArgument = {
  /** The ID of the view. */
  viewId?: InputMaybe<Scalars['String']['input']>;
};

/** A poll objects with its available answer options. */
export type Poll = Node & {
  __typename?: 'Poll';
  /**
   * The component attached to the poll.
   * @deprecated Use `post` field.
   */
  component?: Maybe<Component>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The vote on the poll from the user. */
  me?: Maybe<UserPollAnswer>;
  /** The answer options available for the poll. */
  options: Array<PollOption>;
  /** The post attached to the poll. */
  post?: Maybe<Post>;
  /** The poll question. */
  question: Scalars['String']['output'];
  /** The share urls of the poll. */
  shareUrls?: Maybe<PollShareUrls>;
  /**
   * The URL of the poll.
   * @deprecated Use `shareUrls.permalink` field.
   */
  url: Scalars['String']['output'];
  /** The total number of votes for the poll. */
  voterCount: Scalars['Int']['output'];
};

/** The possible actions to a poll answer. */
export enum PollAnswerAction {
  /** Remove the answer from the poll. */
  Remove = 'REMOVE',
  /** Answer the poll. */
  Select = 'SELECT'
}

/** The input fields to manage poll answer for the connected user. */
export type PollAnswerInput = {
  /** The action to perform on the poll answer. */
  action: PollAnswerAction;
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the poll option. */
  optionId: Scalars['ID']['input'];
  /** The ID of the poll. */
  pollId: Scalars['ID']['input'];
};

/** The return fields from a poll answer. */
export type PollAnswerPayload = {
  __typename?: 'PollAnswerPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The connection type for Poll. */
export type PollConnection = {
  __typename?: 'PollConnection';
  /** A list of edges. */
  edges: Array<Maybe<PollEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type PollEdge = {
  __typename?: 'PollEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Poll>;
};

/** The available input fields of a Poll filter. */
export type PollFilter = {
  id?: InputMaybe<IdOperator>;
};

/** An answer option that can be attached to a poll. */
export type PollOption = Node & {
  __typename?: 'PollOption';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The textual representation of the answer option. */
  text: Scalars['String']['output'];
  /** The total number of votes for the option. */
  voterCount: Scalars['Int']['output'];
};

/** Information about the share urls of a Poll. */
export type PollShareUrls = Node & ShareUrls & {
  __typename?: 'PollShareUrls';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The permalink share url of the poll. */
  permalink: Scalars['String']['output'];
};

/** Types that can be a Post. */
export type Post = Collection | Live | Reaction | ReactionVideo | Video;

/** The connection type for Post. */
export type PostConnection = {
  __typename?: 'PostConnection';
  /** A list of edges. */
  edges: Array<Maybe<PostEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type PostEdge = {
  __typename?: 'PostEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Post>;
};

/** Represents the engagement metrics of a Post. */
export type PostEngagementMetrics = {
  /** The bookmark metrics of the post. */
  bookmarks?: Maybe<BookmarkMetricConnection>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The like metrics of the post. */
  likes?: Maybe<LikeMetricConnection>;
  /** The reaction metrics of the post. */
  reactions?: Maybe<ReactionMetricConnection>;
};


/** Represents the engagement metrics of a Post. */
export type PostEngagementMetricsBookmarksArgs = {
  filter?: InputMaybe<BookmarkFilter>;
};


/** Represents the engagement metrics of a Post. */
export type PostEngagementMetricsLikesArgs = {
  filter?: InputMaybe<LikeMetricFilter>;
};

/** Types that can be a PostMetric. */
export type PostMetric = CollectionMetric | LiveMetric | ReactionMetric | VideoMetric;

/** The connection type for Post. */
export type PostMetricConnection = {
  __typename?: 'PostMetricConnection';
  /** A list of edges. */
  edges: Array<Maybe<PostMetricEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type PostMetricEdge = {
  __typename?: 'PostMetricEdge';
  /** The item at the end of the edge. */
  node?: Maybe<PostMetric>;
};

/** Represents the metrics of a Post. */
export type PostMetrics = {
  /** The engagement metrics of the post. */
  engagement?: Maybe<PostEngagementMetrics>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

/** The available input fields of a post operator. */
export type PostOperator = {
  /** Short for equal, must match the given data exactly. */
  eq?: InputMaybe<PostTypename>;
  /** Short for in array, must be an element of the array. */
  in?: InputMaybe<Array<InputMaybe<PostTypename>>>;
};

/** The possible values for a PostStatus. */
export enum PostStatus {
  /** A pending_review post. */
  PendingReview = 'PENDING_REVIEW',
  /** A published post. */
  Published = 'PUBLISHED'
}

/** The available input fields of a  operator. */
export type PostStatusOperator = {
  /** Short for not equal, must be different from the given data. */
  eq?: InputMaybe<PostStatus>;
};

/** The possible values for a `PostTypename`. */
export enum PostTypename {
  /** The typename of a collection post. */
  Collection = 'COLLECTION',
  /** The typename of a live post. */
  Live = 'LIVE',
  /** The typename of a reaction_video post. */
  Reaction = 'REACTION',
  /**
   * The typename of a reaction_video post.
   * @deprecated Use `REACTION`.
   */
  ReactionVideo = 'REACTION_VIDEO',
  /** The typename of a video post. */
  Video = 'VIDEO'
}

/** Product updates notification settings. */
export type ProductUpdates = Node & {
  __typename?: 'ProductUpdates';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates whether the email notification setting is enabled. */
  isEmailEnabled?: Maybe<Scalars['Boolean']['output']>;
};

/** The possible values for a Promotion. */
export enum Promotion {
  /** A spotlight promotion. */
  Spotlight = 'SPOTLIGHT'
}

/** The query root of Dailymotion's GraphQL API. */
export type Query = {
  __typename?: 'Query';
  /**
   *
   *   Get appeal informations based on token.
   *   Tokens are generated by internaltools-moderation-decisions service
   *   and sent to clients.
   *   It may raise following GraphQL errors:
   *     - token is invalid (type=bad_request, reason=invalid_token)
   *     - token is expired (type=bad_reqeust, reason=token_expired)
   *     - appeal already exists (type=bad_reqeust, reason=appeal_already_exists)
   *     - appeal is invalid (type=bad_reqeust, reason=invalid_appeal)
   *     - appeal in review (type=bad_reqeust, reason=appeal_in_review)
   *
   */
  appealApplication: AppealApplication;
  /** Information about behavior: feature flipping and A/B testing experiments. */
  behavior?: Maybe<Behavior>;
  /** A list of categories. */
  categories?: Maybe<CategoryConnection>;
  /** A channel manages collections and videos. */
  channel?: Maybe<Channel>;
  /** A list of channels. */
  channels?: Maybe<ChannelConnection>;
  /** A collection manages medias. */
  collection?: Maybe<Collection>;
  /** A list of collections. */
  collections?: Maybe<CollectionConnection>;
  /** A content feed manages Posts. */
  contentFeed?: Maybe<FeedPostConnection>;
  /** A list of conversations. */
  conversations?: Maybe<ConversationConnection>;
  /**
   * Content featured by Dailymotion.
   * @deprecated Use `conversations(filter: { algorithm: { eq: FEATURED }})`.
   */
  featuredContent?: Maybe<FeaturedContent>;
  /** A feed manages Posts. */
  feed?: Maybe<PostConnection>;
  /** A hashtag. */
  hashtag?: Maybe<Hashtag>;
  /** A list of interests. */
  interests?: Maybe<InterestConnection>;
  /** A live represents a media that is streamed. */
  live?: Maybe<Live>;
  /**
   * The stream urls of lives.
   * @deprecated Use `mediaStreams`.
   */
  liveStreams?: Maybe<LiveStreamsConnection>;
  /** A list of lives. */
  lives?: Maybe<LiveConnection>;
  /** Allows to access to supported countries and user country location. */
  localization?: Maybe<Localization>;
  /** Information about the connected user. */
  me?: Maybe<User>;
  /** A media represents a video or a live. */
  media?: Maybe<Media>;
  /** A list of media streams. */
  mediaStreams?: Maybe<MediaStreamsConnection>;
  /** Represents a node with an ID. */
  node?: Maybe<Node>;
  /** Access to advanced partner features. */
  partner?: Maybe<PartnerSpace>;
  /** Information about the player. */
  player?: Maybe<Player>;
  /** Retrieve a poll specified by its ID. */
  poll?: Maybe<Poll>;
  /** The list of available polls. */
  polls?: Maybe<PollConnection>;
  /** A reaction to a story in a recording format. */
  reaction?: Maybe<Reaction>;
  /**
   * A reaction to a Dailymotion video in the form of a video.
   * @deprecated Use `reaction`.
   */
  reactionVideo?: Maybe<ReactionVideo>;
  /** Perform a search. */
  search?: Maybe<Search>;
  /**
   * The list of countries that are supported.
   * @deprecated Use `localization.supportedCountries`.
   */
  supportedCountries?: Maybe<Array<Maybe<Country>>>;
  /** A topic represents a keyword that is associated to a video. */
  topic?: Maybe<Topic>;
  /** A list of topics. */
  topics?: Maybe<TopicConnection>;
  /** Information about the user. */
  user?: Maybe<User>;
  /** A video represents a Dailymotion media. */
  video?: Maybe<Video>;
  /**
   * Represents either a Dailymotion video or live.
   * @deprecated Use `media`.
   */
  videoOrLive?: Maybe<VideoOrLive>;
  /**
   * A list of video streams.
   * @deprecated Use `mediaStreams`.
   */
  videoStreams?: Maybe<VideoStreamsConnection>;
  /** A list of videos. */
  videos?: Maybe<VideoConnection>;
  /** The views of NEON. */
  views?: Maybe<Views>;
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryAppealApplicationArgs = {
  token: Scalars['String']['input'];
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryCategoriesArgs = {
  filter?: CategoryFilter;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryChannelArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  xid?: InputMaybe<Scalars['String']['input']>;
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryChannelsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ChannelsSort>;
  xids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryCollectionArgs = {
  xid: Scalars['String']['input'];
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryCollectionsArgs = {
  channelXid?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  verifiedChannelOnly?: InputMaybe<Scalars['Boolean']['input']>;
  videoXid?: InputMaybe<Scalars['String']['input']>;
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryContentFeedArgs = {
  filter?: InputMaybe<FeedFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  name: FeedName;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<FeedSort>;
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryConversationsArgs = {
  filter?: InputMaybe<ConversationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryFeedArgs = {
  filter?: InputMaybe<FeedFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name: FeedName;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<FeedSort>;
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryHashtagArgs = {
  id: Scalars['ID']['input'];
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryInterestsArgs = {
  enabledOnly?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryLiveArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  xid: Scalars['String']['input'];
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryLiveStreamsArgs = {
  allowExplicit?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  liveXids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryLivesArgs = {
  allowExplicit?: InputMaybe<Scalars['Boolean']['input']>;
  channelXids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  isOnAir?: InputMaybe<Scalars['Boolean']['input']>;
  languages?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  startIn?: InputMaybe<Scalars['Int']['input']>;
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryMediaArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  xid: Scalars['String']['input'];
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryMediaStreamsArgs = {
  allowExplicit?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  mediaXids: Array<InputMaybe<Scalars['String']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryPlayerArgs = {
  algorithm?: InputMaybe<PlayerAlgorithmName>;
  creatorXid?: InputMaybe<Scalars['String']['input']>;
  embed?: EmbedType;
  mediaXid?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<HtmlPage>;
  recordingXid?: InputMaybe<Scalars['String']['input']>;
  videoXid?: InputMaybe<Scalars['String']['input']>;
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryPollArgs = {
  id: Scalars['ID']['input'];
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryPollsArgs = {
  filter?: InputMaybe<PollFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryReactionArgs = {
  xid: Scalars['String']['input'];
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryReactionVideoArgs = {
  xid: Scalars['String']['input'];
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryTopicArgs = {
  xid?: InputMaybe<Scalars['String']['input']>;
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryTopicsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  whitelistedOnly?: InputMaybe<Scalars['Boolean']['input']>;
  xids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryUserArgs = {
  xid: Scalars['String']['input'];
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryVideoArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  xid: Scalars['String']['input'];
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryVideoOrLiveArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  xid: Scalars['String']['input'];
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryVideoStreamsArgs = {
  allowExplicit?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  videoXids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** The query root of Dailymotion's GraphQL API. */
export type QueryVideosArgs = {
  allowExplicit?: InputMaybe<Scalars['Boolean']['input']>;
  channelXids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  createdAfter?: InputMaybe<Scalars['DateTime']['input']>;
  createdBefore?: InputMaybe<Scalars['DateTime']['input']>;
  filter?: InputMaybe<VideoFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  languages?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  topicXids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  videoXids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Represents a Reaction in a recording format. */
export type Reaction = Content & Node & Recording & {
  __typename?: 'Reaction';
  /** The creation date (DateTime ISO8601) of the reaction. */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** The channel who created the reaction. */
  creator?: Maybe<Channel>;
  /** The duration of the reaction in seconds. */
  duration?: Maybe<Scalars['Int']['output']>;
  /** The hashtags of the reaction. */
  hashtags?: Maybe<HashtagConnection>;
  /**
   * The URL of the adaptive bitrate manifest using the Apple HTTP Live Streaming
   *   protocol. Without an access token this field contains null, the Dailymotion
   *   user associated with the access token must be the owner of the video. This
   *   field is rate limited. The returned url is secured: it can only be consumed by
   *   the user who made the query and it expires after a certain time.
   */
  hlsURL?: Maybe<Scalars['String']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates whether the reaction allows comments to be posted. */
  isCommentsEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the reaction allows reactions to created. */
  isReactionsEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** The metrics of the reaction. */
  metrics?: Maybe<ReactionMetrics>;
  /** The story that elicited the reaction to be created. */
  opener?: Maybe<Story>;
  /** The reactions created on the reaction. */
  reactions?: Maybe<ReactionConnection>;
  /** The share urls of the reaction. */
  shareUrls?: Maybe<ReactionShareUrls>;
  /** The subtitles of the reaction. */
  subtitles?: Maybe<SubtitleConnection>;
  /** The URL of the thumbnail image. */
  thumbnail?: Maybe<Image>;
  /** The title of the reaction. */
  title?: Maybe<Scalars['String']['output']>;
  /**
   * The URL of the reaction.
   * @deprecated Use `shareUrls.permalink` field.
   */
  url?: Maybe<Scalars['String']['output']>;
  /** The viewer engagement information of the reaction. */
  viewerEngagement?: Maybe<ReactionViewerEngagement>;
  /** The Dailymotion ID of the reaction. */
  xid: Scalars['String']['output'];
};


/** Represents a Reaction in a recording format. */
export type ReactionHashtagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Represents a Reaction in a recording format. */
export type ReactionReactionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Represents a Reaction in a recording format. */
export type ReactionSubtitlesArgs = {
  autoGenerated?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Represents a Reaction in a recording format. */
export type ReactionThumbnailArgs = {
  height: ThumbnailHeight;
};

/** The connection type for ReactionVideo. */
export type ReactionConnection = {
  __typename?: 'ReactionConnection';
  /** A list of edges. */
  edges: Array<Maybe<ReactionEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type ReactionEdge = {
  __typename?: 'ReactionEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Reaction>;
};

/** The engagement metrics of a Reaction. */
export type ReactionEngagementMetrics = Node & PostEngagementMetrics & {
  __typename?: 'ReactionEngagementMetrics';
  /** The bookmark metrics of the reaction. */
  bookmarks?: Maybe<BookmarkMetricConnection>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The like metrics of the reaction. */
  likes?: Maybe<LikeMetricConnection>;
  /** The reaction metrics of the reaction. */
  reactions?: Maybe<ReactionMetricConnection>;
};


/** The engagement metrics of a Reaction. */
export type ReactionEngagementMetricsBookmarksArgs = {
  filter?: InputMaybe<BookmarkFilter>;
};


/** The engagement metrics of a Reaction. */
export type ReactionEngagementMetricsLikesArgs = {
  filter?: InputMaybe<LikeMetricFilter>;
};

/** The node at the end of a ReactionMetricEdge. */
export type ReactionMetric = Metric & {
  __typename?: 'ReactionMetric';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total count of the reaction metric. A null value indicates that it is hidden or not available. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The connection type for a ReactionMetric. */
export type ReactionMetricConnection = {
  __typename?: 'ReactionMetricConnection';
  /** A list of edges. */
  edges: Array<Maybe<ReactionMetricEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type ReactionMetricEdge = {
  __typename?: 'ReactionMetricEdge';
  /** The item at the end of the edge. */
  node?: Maybe<ReactionMetric>;
};

/** The metrics of a Reaction. */
export type ReactionMetrics = Node & PostMetrics & {
  __typename?: 'ReactionMetrics';
  /** The engagement metrics of the reaction. */
  engagement?: Maybe<VideoEngagementMetrics>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

/** The return fields from creating/updating a reaction. */
export type ReactionPayload = {
  __typename?: 'ReactionPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The created/updated reaction. */
  reaction?: Maybe<Reaction>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** Information about the share urls of a Reaction. */
export type ReactionShareUrls = Node & ShareUrls & {
  __typename?: 'ReactionShareUrls';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The permalink share url of the reaction. */
  permalink: Scalars['String']['output'];
};

/** Information about a reaction video. */
export type ReactionVideo = Node & {
  __typename?: 'ReactionVideo';
  /** The creation date (DateTime ISO8601) of the reaction video. */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** The duration of the reaction video in seconds. */
  duration?: Maybe<Scalars['Int']['output']>;
  /** The hashtags of the reaction video. */
  hashtags?: Maybe<HashtagConnection>;
  /**
   * The URL of the adaptive bitrate manifest using the Apple HTTP Live Streaming
   *   protocol. Without an access token this field contains null, the Dailymotion
   *   user associated with the access token must be the owner of the video. This
   *   field is rate limited. The returned url is secured: it can only be consumed by
   *   the user who made the query and it expires after a certain time.
   */
  hlsURL?: Maybe<Scalars['String']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /**
   * Indicates whether the reaction video is bookmarked by the connected user.
   *   Returns False if the user is not connected.
   * @deprecated Use `viewerEngagement.bookmarked` field.
   */
  isBookmarked?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates whether posting comments on this reaction video is allowed.
   *   Returns False if posting comments is not allowed.
   */
  isCommentsEnabled?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates whether the reaction video is in the watch later list of the connected user.
   *   Returns False if the user is not connected.
   * @deprecated Use `viewerEngagement.favorited` field.
   */
  isInWatchLater?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates whether the connected user has liked the reaction video.
   *   Returns False if the user is not connected.
   * @deprecated Use `viewerEngagement.liked` field.
   */
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates whether the connected user has reacted to the reaction video.
   *   Returns False if the user is not connected.
   * @deprecated Use `viewerEngagement.reacted` field.
   */
  isReacted?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether reaction videos are allowed on the reaction video. */
  isReactionVideosEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** The stats of the reaction video. */
  stats?: Maybe<ReactionVideoStats>;
  /** The subtitles of the reaction video. */
  subtitles?: Maybe<SubtitleConnection>;
  /** The URL of the thumbnail image. */
  thumbnail?: Maybe<Image>;
  /**
   * The URL of the thumbnail image.
   * @deprecated Use `thumbnail` field.
   */
  thumbnailURL?: Maybe<Scalars['String']['output']>;
  /** The title of the reaction video. */
  title?: Maybe<Scalars['String']['output']>;
  /** The URL of the reaction video. */
  url?: Maybe<Scalars['String']['output']>;
  /** The user who created the reaction video. */
  user?: Maybe<User>;
  /** The video that the reaction video was created for. */
  video?: Maybe<Video>;
  /** The viewer engagement information of the reaction video. */
  viewerEngagement?: Maybe<ReactionViewerEngagement>;
  /** The Dailymotion ID of the reaction video. */
  xid: Scalars['String']['output'];
};


/** Information about a reaction video. */
export type ReactionVideoHashtagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Information about a reaction video. */
export type ReactionVideoSubtitlesArgs = {
  autoGenerated?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Information about a reaction video. */
export type ReactionVideoThumbnailArgs = {
  height: ThumbnailHeight;
};


/** Information about a reaction video. */
export type ReactionVideoThumbnailUrlArgs = {
  size: Scalars['String']['input'];
};

/** The connection type for ReactionVideo. */
export type ReactionVideoConnection = {
  __typename?: 'ReactionVideoConnection';
  /** A list of edges. */
  edges: Array<Maybe<ReactionVideoEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** The input fields to create a reaction video. */
export type ReactionVideoCreateInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The URL of the thumbnail image. */
  thumbnailURL?: InputMaybe<Scalars['String']['input']>;
  /** The title of the reaction video. */
  title: Scalars['String']['input'];
  /** The URL of the reaction video to get the upload file from. */
  url: Scalars['String']['input'];
  /** The xid of the video that the reaction video is created for. */
  videoXid: Scalars['String']['input'];
};

/** The input fields to delete a reaction video. */
export type ReactionVideoDeleteInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The xid of the reaction video to delete. */
  xid: Scalars['String']['input'];
};

/** The return fields from deleting a reaction video. */
export type ReactionVideoDeletePayload = {
  __typename?: 'ReactionVideoDeletePayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** An edge in a connection. */
export type ReactionVideoEdge = {
  __typename?: 'ReactionVideoEdge';
  /** The item at the end of the edge. */
  node?: Maybe<ReactionVideo>;
};

/** The return fields from creating/updating a reaction video. */
export type ReactionVideoPayload = {
  __typename?: 'ReactionVideoPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The new/updated reaction video. */
  reactionVideo?: Maybe<ReactionVideo>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** Information about the reaction_video stats. */
export type ReactionVideoStats = Node & {
  __typename?: 'ReactionVideoStats';
  /** The bookmark stats of the reaction_video. */
  bookmarks?: Maybe<ReactionVideoStatsBookmarks>;
  /** The favorite stats of the reaction_video. */
  favorites?: Maybe<ReactionVideoStatsFavorites>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The like stats of the reaction_video. */
  likes?: Maybe<ReactionVideoStatsLikes>;
  /** The reaction stats of the reaction_video. */
  reactionVideos?: Maybe<ReactionVideoStatsReactionVideos>;
  /** The saves stats of the reaction_video. */
  saves?: Maybe<ReactionVideoStatsSaves>;
};

/** The bookmark stats of the video. */
export type ReactionVideoStatsBookmarks = Node & {
  __typename?: 'ReactionVideoStatsBookmarks';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of bookmarks of the video. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The favorite stats of the video. */
export type ReactionVideoStatsFavorites = Node & {
  __typename?: 'ReactionVideoStatsFavorites';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of favorites of the video. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The like stats of the reaction_video. */
export type ReactionVideoStatsLikes = Node & {
  __typename?: 'ReactionVideoStatsLikes';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of likes of the reaction_video. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The reaction stats of the reaction_video. */
export type ReactionVideoStatsReactionVideos = Node & {
  __typename?: 'ReactionVideoStatsReactionVideos';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of reaction reaction_videos of the reaction_video. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The saves stats of the reaction_video. */
export type ReactionVideoStatsSaves = Node & {
  __typename?: 'ReactionVideoStatsSaves';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of playlists and watchlater added of the reaction_video. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The input fields to update a reaction video. */
export type ReactionVideoUpdateInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** the hashtags of the reaction video */
  hashtags?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The title of the reaction video. */
  title?: InputMaybe<Scalars['String']['input']>;
  /** The xid of the reaction video to update. */
  xid: Scalars['String']['input'];
};

/** Information about the viewer engagement of a Reaction. */
export type ReactionViewerEngagement = Node & ViewerEngagement & {
  __typename?: 'ReactionViewerEngagement';
  /** Indicates whether the reaction is bookmarked by the viewer. Returns False if the viewer is not connected. */
  bookmarked?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the viewer has the reaction in its watch later list. Returns False if the viewer is not connected. */
  favorited?: Maybe<Scalars['Boolean']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates the like rating of the reaction from the viewer. */
  likeRating?: Maybe<LikeRating>;
  /** Indicates whether the viewer has liked the comment. Returns False if the viewer is not connected. */
  liked?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the viewer has reacted to the reaction. Returns False if the viewer is not connected. */
  reacted?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the viewer has added the reaction to one of its collections. Returns False if the viewer is not connected. */
  saved?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the viewer has completed watching the reaction. Returns False if the viewer is not connected. */
  watchCompleted?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the viewer has started watching the reaction. Returns False if the viewer is not connected. */
  watchStarted?: Maybe<Scalars['Boolean']['output']>;
};

/** Information about a recommended recording. */
export type RecommendedRecording = Node & {
  __typename?: 'RecommendedRecording';
  /** The algorithm. */
  algorithm?: Maybe<Algorithm>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The item at the end of the edge. */
  recording?: Maybe<Recording>;
};

/** The connection type for Recording. */
export type RecommendedRecordingConnection = {
  __typename?: 'RecommendedRecordingConnection';
  /** A list of edges. */
  edges: Array<Maybe<RecommendedRecordingEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type RecommendedRecordingEdge = {
  __typename?: 'RecommendedRecordingEdge';
  /** The item at the end of the edge. */
  node?: Maybe<RecommendedRecording>;
};

/** Represents a node with a Recording. */
export type Recording = {
  /** The creation date (DateTime ISO8601) of the recording. */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** The reactions created on the recording. */
  reactions?: Maybe<ReactionConnection>;
  /** The URL of the recording thumbnail image. */
  thumbnail?: Maybe<Image>;
  /** The title of the recording. */
  title?: Maybe<Scalars['String']['output']>;
  /** The URL of the recording. */
  url?: Maybe<Scalars['String']['output']>;
};


/** Represents a node with a Recording. */
export type RecordingReactionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Represents a node with a Recording. */
export type RecordingThumbnailArgs = {
  height: ThumbnailHeight;
};

/**  possibility to be used for live, reactionVideo, episode */
export enum RecordingPrivacy {
  /** Displays only recordings that are private */
  Private = 'PRIVATE',
  /** Displays only recordings that are public */
  Public = 'PUBLIC'
}

/** The violation reason to report the content. */
export enum RecordingViolation {
  /** Content that contains child abuse. */
  ChildAbuse = 'CHILD_ABUSE',
  /** Content that misrepresents the owner. */
  CopyrightOwner = 'COPYRIGHT_OWNER',
  /** Content that is against humanity, such as genocide. */
  CrimesAgainstHumanity = 'CRIMES_AGAINST_HUMANITY',
  /** Content that contains child sexual abuse material. */
  Csam = 'CSAM',
  /** Content that contains false information or is misleading on purpose. */
  Disinformation = 'DISINFORMATION',
  /** Content that is harmful for children. */
  HarmfulContent = 'HARMFUL_CONTENT',
  /** Content that is hateful. */
  HatefulContent = 'HATEFUL_CONTENT',
  /** Content that contains nudity. */
  SexualContent = 'SEXUAL_CONTENT',
  /** Content that contains spam. */
  Spam = 'SPAM',
  /** Content that contains terrorism. */
  Terrorism = 'TERRORISM',
  /** Content that contains violence. */
  Violence = 'VIOLENCE'
}

/** The input fields to recover a password. */
export type RecoverPasswordInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The email address of the user who wants to recover its password. */
  email: Scalars['String']['input'];
};

/** The return fields from recovering a password. */
export type RecoverPasswordPayload = {
  __typename?: 'RecoverPasswordPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields of a related video context. */
export type RelatedVideoContext = {
  /** The ID of the view. */
  viewId?: InputMaybe<Scalars['String']['input']>;
};

/** Remind unwatched videos notification settings. */
export type RemindUnwatchedVideos = Node & {
  __typename?: 'RemindUnwatchedVideos';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates whether the email notification setting is enabled. */
  isEmailEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the push notification setting is enabled. */
  isPushEnabled?: Maybe<Scalars['Boolean']['output']>;
};

/** The input fields to remove a collection. */
export type RemoveCollectionInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion ID of the collection. */
  collectionXid: Scalars['String']['input'];
};

/** The return fields from deleting a collection. */
export type RemoveCollectionPayload = {
  __typename?: 'RemoveCollectionPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to remove a video from a collection. */
export type RemoveCollectionVideoInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion ID of the collection. */
  collectionXid: Scalars['String']['input'];
  /** The Dailymotion ID of the video. */
  videoXid: Scalars['String']['input'];
};

/** The return fields from removing a video from a collection. */
export type RemoveCollectionVideoPayload = {
  __typename?: 'RemoveCollectionVideoPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to remove a video from the `WatchLater` list of the connected user. */
export type RemoveWatchLaterVideoInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion ID of the video. */
  videoXid: Scalars['String']['input'];
};

/** The return fields from removing a video from the `WatchLater` list of the connected user. */
export type RemoveWatchLaterVideoPayload = {
  __typename?: 'RemoveWatchLaterVideoPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to remove a video from the `Watched` list of the connected user. */
export type RemoveWatchedVideoInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion ID of the video. */
  videoXid: Scalars['String']['input'];
};

/** The return fields from removing a video from the `Watched` list of the connected user. */
export type RemoveWatchedVideoPayload = {
  __typename?: 'RemoveWatchedVideoPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to reorder a media in a collection. */
export type ReorderCollectionMediaInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion ID of the collection. */
  collectionXid: Scalars['String']['input'];
  /** The Dailymotion ID of the media. */
  mediaXid: Scalars['String']['input'];
  /** The Dailymotion ID of the target media to switch order with. */
  targetMediaXid: Scalars['String']['input'];
};

/** The return fields from reordering a media in a collection. */
export type ReorderCollectionMediaPayload = {
  __typename?: 'ReorderCollectionMediaPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The available input fields to report a `Creator`. */
export type ReportCreatorInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion ID of the creator to report. */
  creatorXid: Scalars['String']['input'];
  /** The violation reason to report the creator. */
  violation?: CreatorViolation;
};

/** The return fields from reporting a creator. */
export type ReportCreatorPayload = {
  __typename?: 'ReportCreatorPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The download link of a report file. */
export type ReportFileDownloadLink = Node & {
  __typename?: 'ReportFileDownloadLink';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The link of a report file. */
  link?: Maybe<Scalars['String']['output']>;
};

/** The connection type for ReportFileDownloadLink. */
export type ReportFileDownloadLinkConnection = {
  __typename?: 'ReportFileDownloadLinkConnection';
  /** A list of edges. */
  edges: Array<Maybe<ReportFileDownloadLinkEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type ReportFileDownloadLinkEdge = {
  __typename?: 'ReportFileDownloadLinkEdge';
  /** The item at the end of the edge. */
  node?: Maybe<ReportFileDownloadLink>;
};

/** The input fields to report a video. */
export type ReportVideoInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The email address of the user making the report. Required when the user is not connected. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The first name of the user making the report. Required for notifications. (Temporary optional for retro-compat) */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** Language code used to communicate with the reporter. if null will guess from request header */
  languageCode?: InputMaybe<Scalars['String']['input']>;
  /** The last name of the user making the report. Required for notifications. (Temporary optional for retro-compat) */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** Message body of the report. */
  message?: InputMaybe<Scalars['String']['input']>;
  /**
   * Video specific time position format "hh:mm:ss" or "mm:ss" where abuse happens.
   *   If omitted, indicates whole video is reported.
   */
  timecode?: InputMaybe<Scalars['String']['input']>;
  /** The type of report. Valid types are (child_abuse, copyrightowner, crime_apology, disinformation, harmful_for_children, hateful_content, porn, spam, terrorism, violent). @deprecated(reason: "Use input field `violation`."). */
  type?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion ID of the video to report. */
  videoXid: Scalars['String']['input'];
  /** The type of the reported violation. */
  violation?: InputMaybe<RecordingViolation>;
};

/** The return fields from reporting a video. */
export type ReportVideoPayload = {
  __typename?: 'ReportVideoPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input to verify user report reporter email */
export type ReporterEmailVerifyInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Id of the abuse report */
  reportId: Scalars['ID']['input'];
  /** Email verificaiton token */
  verificationToken: Scalars['String']['input'];
};

/**
 *
 * Payload for mutation verifyUserReportReporterEmail
 *
 */
export type ReporterEmailVerifyPayload = {
  __typename?: 'ReporterEmailVerifyPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /**
   *
   *  The status of the mutation.
   *
   */
  status: Status;
};

/** The input fields to request an activation code. */
export type RequestActivationCodeInput = {
  /** The account type of the user. */
  accountType: UserActivationCodeAccountType;
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The validation token received during the sign in request. */
  validationToken: Scalars['String']['input'];
};

/** The return fields from requesting an activation code. */
export type RequestActivationCodePayload = {
  __typename?: 'RequestActivationCodePayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to reset a password. */
export type ResetPasswordInput = {
  /** The activation key received in the email from a recover password request. */
  activationKey: Scalars['String']['input'];
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The email of the user to reset its password. */
  email: Scalars['String']['input'];
  /** The new password for the user. */
  newPassword: Scalars['String']['input'];
  /** The mutation version. */
  version?: InputMaybe<Scalars['Int']['input']>;
};

/** The return fields from resetting a password. */
export type ResetPasswordPayload = {
  __typename?: 'ResetPasswordPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** Information about the restriction of a recording. */
export type Restriction = Node & {
  __typename?: 'Restriction';
  /** The code indicates the error type that occurred. */
  code: RestrictionCode;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The summary of the restriction. */
  title?: Maybe<Scalars['String']['output']>;
};

/** The possible values for a restriction code. */
export enum RestrictionCode {
  /** The content is geo blocked */
  GeoRestrictedContent = 'GEO_RESTRICTED_CONTENT',
  /** The content is private */
  PrivateContent = 'PRIVATE_CONTENT',
  /** The content is sensitive */
  SensitiveContent = 'SENSITIVE_CONTENT',
  /** The content is unavailable */
  UnavailableContent = 'UNAVAILABLE_CONTENT'
}

/** The possible values for an Authorization Role. */
export enum Role {
  /** An authorization role that represents an admin. */
  Admin = 'ADMIN',
  /** An authorization role that represents an editor. */
  Editor = 'EDITOR',
  /** An authorization role that represents an owner. */
  Owner = 'OWNER'
}

/** The possible values for a permission on a Role. */
export enum RolePermission {
  /** A permission on the role to create creators. */
  CreateCreators = 'CREATE_CREATORS',
  /** A permission on the role to manage partner reports. */
  ManageAnalyticReports = 'MANAGE_ANALYTIC_REPORTS',
  /** A permission on the role to manage behavior rules. */
  ManageBehaviorRules = 'MANAGE_BEHAVIOR_RULES',
  /** An authorization role that represents an owner. */
  SendTransactionalMail = 'SEND_TRANSACTIONAL_MAIL'
}

/** Represents a rule. */
export type Rule = Node & {
  __typename?: 'Rule';
  /** Indicates if the condition is a complex condition, a.k.a custom made. */
  complexCondition?: Maybe<Scalars['Boolean']['output']>;
  /** The detailed logic of the feature. */
  condition?: Maybe<Scalars['String']['output']>;
  /** The creation date and time (DateTime ISO8601) of the feature. */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** The unique id of the user that created the feature. */
  creatorXid?: Maybe<Scalars['String']['output']>;
  /** A human-readable description of the feature. */
  description?: Maybe<Scalars['String']['output']>;
  /** Whether the feature is enabled or not. */
  enabled?: Maybe<Scalars['Boolean']['output']>;
  /** End date and time (DateTime ISO8601) of the feature if enabled. */
  endAt?: Maybe<Scalars['DateTime']['output']>;
  /** The A/B experiment logic and configuration. */
  experiment?: Maybe<Scalars['String']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The name for the feature. */
  name?: Maybe<Scalars['String']['output']>;
  /** Start date and time (DateTime ISO8601) of the feature if enabled. */
  startAt?: Maybe<Scalars['DateTime']['output']>;
  /** The tags associated with the rule. Useful for filtering. */
  tags?: Maybe<BehaviorRuleTagConnection>;
  /** The last update date-time of the feature. */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** A unique immutable uuid for the rule (used by experiment). */
  uuid?: Maybe<Scalars['String']['output']>;
};


/** Represents a rule. */
export type RuleTagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** The connection type for Rule. */
export type RuleConnection = {
  __typename?: 'RuleConnection';
  /** A list of edges. */
  edges: Array<Maybe<RuleEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type RuleEdge = {
  __typename?: 'RuleEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Rule>;
};

/** Perform a search across resources. */
export type Search = Node & {
  __typename?: 'Search';
  /** The suggestions matched against the search query. */
  autosuggestions?: Maybe<SuggestionConnection>;
  /** The channels matched against the search query. */
  channels?: Maybe<ChannelConnection>;
  /** The collections that matched against the search query. */
  collections?: Maybe<CollectionConnection>;
  /** The hashtags that matched against the search query. */
  hashtags?: Maybe<HashtagConnection>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The lives that matched against the search query. */
  lives?: Maybe<LiveConnection>;
  /** The topics that matched against the search query. */
  topics?: Maybe<TopicConnection>;
  /** The videos that matched against the search query. */
  videos?: Maybe<VideoConnection>;
};


/** Perform a search across resources. */
export type SearchAutosuggestionsArgs = {
  filter: AutoSuggestionFilter;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  query: StringOperator;
};


/** Perform a search across resources. */
export type SearchChannelsArgs = {
  accountType?: InputMaybe<AccountType>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};


/** Perform a search across resources. */
export type SearchCollectionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};


/** Perform a search across resources. */
export type SearchHashtagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};


/** Perform a search across resources. */
export type SearchLivesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};


/** Perform a search across resources. */
export type SearchTopicsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};


/** Perform a search across resources. */
export type SearchVideosArgs = {
  createdAfter?: InputMaybe<Scalars['DateTime']['input']>;
  createdBefore?: InputMaybe<Scalars['DateTime']['input']>;
  durationMax?: InputMaybe<Scalars['Int']['input']>;
  durationMin?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
  sort?: InputMaybe<SearchVideoSort>;
};

/** The possible sorts that video search results can be ordered. */
export enum SearchVideoSort {
  /** Sort videos by recently uploaded. */
  Recent = 'RECENT',
  /** Sort videos by relevance. This is the default value. */
  Relevance = 'RELEVANCE',
  /** Sort videos by view count. */
  ViewCount = 'VIEW_COUNT'
}

/** A section is a combination of components. */
export type Section = Node & {
  __typename?: 'Section';
  /** The components associated with the section. */
  components?: Maybe<ComponentConnection>;
  /** The description of the section. */
  description?: Maybe<Scalars['String']['output']>;
  /** The grouping type of the section. */
  groupingType?: Maybe<Scalars['String']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The name of the section. */
  name?: Maybe<Scalars['String']['output']>;
  /** The related component of the section (e.g. a topic, a channel). */
  relatedComponent?: Maybe<Component>;
  /** The title of the section. */
  title?: Maybe<Scalars['String']['output']>;
  /** The type of the section. */
  type?: Maybe<Scalars['String']['output']>;
};


/** A section is a combination of components. */
export type SectionComponentsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** The connection type for Section. */
export type SectionConnection = {
  __typename?: 'SectionConnection';
  /** A list of edges. */
  edges: Array<Maybe<SectionEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** The input fields of a section context argument. */
export type SectionContextArgument = {
  /** The list of category IDs. */
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** The Dailymotion ID of the collection. */
  collectionXid?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion ID of the media. */
  mediaXid?: InputMaybe<Scalars['String']['input']>;
  /** Indicate whether the user wants to opt out of personalized content. Defaults to true. */
  personalizationOptOut?: InputMaybe<Scalars['Boolean']['input']>;
  /** The Dailymotion ID of the topic. */
  topicXid?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the view. */
  viewId?: InputMaybe<Scalars['String']['input']>;
};

/** An edge in a connection. */
export type SectionEdge = {
  __typename?: 'SectionEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Section>;
};

/** The input fields to send a transactional email. */
export type SendTransactionalEmailInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID associated with the given email campaign. */
  emailCampaignId: Scalars['String']['input'];
  /** The email service provider where the campaign is stored. */
  emailServiceProvider: Scalars['String']['input'];
  /** The Dailymotion ID of the user to be emailed. */
  userXid: Scalars['String']['input'];
};

/** The return fields from sending a transactional email. */
export type SendTransactionalEmailPayload = {
  __typename?: 'SendTransactionalEmailPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to send a validation email. */
export type SendValidationEmailInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The URI to redirect the user to in the email. */
  redirectURI?: InputMaybe<Scalars['String']['input']>;
};

/** The return fields from sending a validation email. */
export type SendValidationEmailPayload = {
  __typename?: 'SendValidationEmailPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** Information about the share urls. */
export type ShareUrls = {
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The permalink share url of the Story. */
  permalink: Scalars['String']['output'];
};

/** Information about the sharing URL of a media. */
export type SharingUrl = Node & {
  __typename?: 'SharingURL';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The service name of the sharing URL. */
  serviceName?: Maybe<Scalars['String']['output']>;
  /** URL of the sharing URL. */
  url?: Maybe<Scalars['String']['output']>;
};

/** The connection type for Sharing URL. */
export type SharingUrlConnection = {
  __typename?: 'SharingURLConnection';
  /** A list of edges. */
  edges: Array<Maybe<SharingUrlEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type SharingUrlEdge = {
  __typename?: 'SharingURLEdge';
  /** The item at the end of the edge. */
  node?: Maybe<SharingUrl>;
};

/** The possible values for a mutation status. */
export enum Status {
  /** Returned when the mutation is done, and effective. */
  Success = 'SUCCESS'
}

/** Types that can be a Story. */
export type Story = Channel | Collection | ContentCategory | Hashtag | Live | Poll | Reaction | ReactionVideo | Topic | Video;

/** The available input fields of a story operator. */
export type StoryOperator = {
  /** Short for equal, must match the given data exactly. */
  eq?: InputMaybe<StoryTypename>;
};

/** The possible types for a story. */
export enum StoryTypename {
  /** A story that represents a `channel`. */
  Channel = 'CHANNEL',
  /** A story that represents a `collection`. */
  Collection = 'COLLECTION',
  /** A story that represents a `content_category`. */
  ContentCategory = 'CONTENT_CATEGORY',
  /** A story that represents a `hashtag`. */
  Hashtag = 'HASHTAG',
  /** A story that represents a `live`. */
  Live = 'LIVE',
  /** A story that represents a `poll`. */
  Poll = 'POLL',
  /** A story that represents a `reaction`. */
  Reaction = 'REACTION',
  /**
   * A story that represents a `reaction_video`.
   * @deprecated Use `REACTION`.
   */
  ReactionVideo = 'REACTION_VIDEO',
  /** A story that represents a `topic`. */
  Topic = 'TOPIC',
  /** A story that represents a `video`. */
  Video = 'VIDEO'
}

/** The available input fields of for a String operator. */
export type StringOperator = {
  /** Short for equal, must match the given data exactly. */
  eq?: InputMaybe<Scalars['String']['input']>;
};

/** Information about a Subdivision. */
export type Subdivision = Node & {
  __typename?: 'Subdivision';
  /** The ISO 3166-2 subdivision code. */
  codeAlpha2?: Maybe<Scalars['String']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

/** Information about the subtitle of a media. */
export type Subtitle = Node & {
  __typename?: 'Subtitle';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The language of the subtitle. */
  language?: Maybe<Language>;
  /** The URL of the subtitle. */
  url?: Maybe<Scalars['String']['output']>;
  /** The Dailymotion ID of the subtitle. */
  xid: Scalars['String']['output'];
};

/** The connection type for Subtitle. */
export type SubtitleConnection = {
  __typename?: 'SubtitleConnection';
  /** A list of edges. */
  edges: Array<Maybe<SubtitleEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type SubtitleEdge = {
  __typename?: 'SubtitleEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Subtitle>;
};

/** Information about the suggestion. */
export type Suggestion = Node & {
  __typename?: 'Suggestion';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The name of the suggestion. */
  name: Scalars['String']['output'];
};

/** The connection type for Suggestion. */
export type SuggestionConnection = {
  __typename?: 'SuggestionConnection';
  /** A list of edges. */
  edges: Array<Maybe<SuggestionEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type SuggestionEdge = {
  __typename?: 'SuggestionEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Suggestion>;
};

/** Information about a supported country. */
export type SupportedCountry = Node & {
  __typename?: 'SupportedCountry';
  /** The supported country. */
  country?: Maybe<Country>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The language of the supported country. */
  language?: Maybe<Language>;
};

/** The connection type for SupportedCountry. */
export type SupportedCountryConnection = {
  __typename?: 'SupportedCountryConnection';
  /** A list of edges. */
  edges: Array<Maybe<SupportedCountryEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type SupportedCountryEdge = {
  __typename?: 'SupportedCountryEdge';
  /** The item at the end of the edge. */
  node?: Maybe<SupportedCountry>;
};

/** Information about a supported language. */
export type SupportedLanguage = Node & {
  __typename?: 'SupportedLanguage';
  /** The countries supported by the supported language. */
  countries?: Maybe<CountryConnection>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The supported language. */
  language?: Maybe<Language>;
};


/** Information about a supported language. */
export type SupportedLanguageCountriesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** The connection type for SupportedLanguage. */
export type SupportedLanguageConnection = {
  __typename?: 'SupportedLanguageConnection';
  /** A list of edges. */
  edges: Array<Maybe<SupportedLanguageEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type SupportedLanguageEdge = {
  __typename?: 'SupportedLanguageEdge';
  /** The item at the end of the edge. */
  node?: Maybe<SupportedLanguage>;
};

/** The available height sizes for an Thumbnail. */
export enum ThumbnailHeight {
  /** A portrait image with 60px */
  Portrait_60 = 'PORTRAIT_60',
  /** A portrait image with 120px */
  Portrait_120 = 'PORTRAIT_120',
  /** A portrait image with 180px */
  Portrait_180 = 'PORTRAIT_180',
  /** A portrait image with 240px */
  Portrait_240 = 'PORTRAIT_240',
  /** A portrait image with 360px */
  Portrait_360 = 'PORTRAIT_360',
  /** A portrait image with 480px */
  Portrait_480 = 'PORTRAIT_480',
  /** A portrait image with 720px */
  Portrait_720 = 'PORTRAIT_720',
  /** A portrait image with 1080px */
  Portrait_1080 = 'PORTRAIT_1080'
}

/** The thumbnail image URLs of an object. */
export type Thumbnails = Node & {
  __typename?: 'Thumbnails';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The URL of the thumbnail image in height 60px. */
  x60?: Maybe<Scalars['String']['output']>;
  /** The URL of the thumbnail image in height 240px. */
  x240?: Maybe<Scalars['String']['output']>;
};

/** Tips and Tricks notification settings. */
export type Tips = Node & {
  __typename?: 'Tips';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates whether the email notification setting is enabled. */
  isEmailEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the push notification setting is enabled. */
  isPushEnabled?: Maybe<Scalars['Boolean']['output']>;
};

/** A topic represents a keyword that is associated to a media. */
export type Topic = Node & {
  __typename?: 'Topic';
  /** The collection of the topic. */
  collection?: Maybe<Collection>;
  /** The URL of the cover image. */
  coverURL?: Maybe<Scalars['String']['output']>;
  /** The creation date (DateTime ISO8601) of the topic. */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates whether topic is followed by the connected user. Returns `False` if not connected. */
  isFollowed?: Maybe<Scalars['Boolean']['output']>;
  /** The name of the topic. */
  name?: Maybe<Scalars['String']['output']>;
  /** Other names of the topic. */
  names?: Maybe<TopicLabelConnection>;
  /** The share urls of the topic. */
  shareUrls?: Maybe<TopicShareUrls>;
  /** The stats of the topic. */
  stats?: Maybe<TopicStats>;
  /**
   * The thumbnails associated to the topic.
   * @deprecated Use `coverURL` field.
   */
  thumbnails?: Maybe<Thumbnails>;
  /** The update date (DateTime ISO8601) of the topic. */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /**
   * The URL of the topic.
   * @deprecated Use `shareUrls.permalink` field.
   */
  url?: Maybe<Scalars['String']['output']>;
  /** The videos of the topic. */
  videos?: Maybe<VideoConnection>;
  /** The whitelist status of the topic. */
  whitelistStatus?: Maybe<TopicWhitelistStatus>;
  /** The Dailymotion ID of the topic. */
  xid: Scalars['String']['output'];
};


/** A topic represents a keyword that is associated to a media. */
export type TopicCollectionArgs = {
  country?: InputMaybe<Scalars['String']['input']>;
};


/** A topic represents a keyword that is associated to a media. */
export type TopicCoverUrlArgs = {
  size: Scalars['String']['input'];
};


/** A topic represents a keyword that is associated to a media. */
export type TopicNamesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** A topic represents a keyword that is associated to a media. */
export type TopicVideosArgs = {
  allowExplicit?: InputMaybe<Scalars['Boolean']['input']>;
  createdAfter?: InputMaybe<Scalars['Date']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  isHD?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

/** The connection type for Topic. */
export type TopicConnection = {
  __typename?: 'TopicConnection';
  /** A list of edges. */
  edges: Array<Maybe<TopicEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type TopicEdge = {
  __typename?: 'TopicEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Topic>;
};

/** The label of a topic. */
export type TopicLabel = Node & {
  __typename?: 'TopicLabel';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The language of the topic label. */
  language?: Maybe<Language>;
  /** The name of the topic label. */
  name?: Maybe<Scalars['String']['output']>;
};

/** The connection type for TopicLabel. */
export type TopicLabelConnection = {
  __typename?: 'TopicLabelConnection';
  /** A list of edges. */
  edges: Array<Maybe<TopicLabelEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type TopicLabelEdge = {
  __typename?: 'TopicLabelEdge';
  /** The item at the end of the edge. */
  node?: Maybe<TopicLabel>;
};

/** Information about the share urls of a Topic. */
export type TopicShareUrls = Node & ShareUrls & {
  __typename?: 'TopicShareUrls';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The permalink share url of the topic. */
  permalink: Scalars['String']['output'];
};

/** Information about the topic stats. */
export type TopicStats = Node & {
  __typename?: 'TopicStats';
  /** The follower stats of the topic. */
  followers?: Maybe<TopicStatsFollowers>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The video stats of the video. */
  videos?: Maybe<TopicStatsVideos>;
};

/** The follower stats of the topic. */
export type TopicStatsFollowers = Node & {
  __typename?: 'TopicStatsFollowers';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of users following the topic. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The video stats of the video. */
export type TopicStatsVideos = Node & {
  __typename?: 'TopicStatsVideos';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of videos of the topic. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** Information about the whitelist of a topic. */
export type TopicWhitelistStatus = Node & {
  __typename?: 'TopicWhitelistStatus';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates whether the topic is whitelisted. */
  isWhitelisted?: Maybe<Scalars['Boolean']['output']>;
  /** The mode used to whitelist the topic. */
  mode?: Maybe<TopicWhitelistStatusMode>;
  /** The date (DateTime ISO8601) the topic was whitelisted. */
  whitelistedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** The mode used to whitelist a topic. */
export enum TopicWhitelistStatusMode {
  /** The topic has been whitelisted automatically. */
  Auto = 'AUTO',
  /** The topic has been whitelisted manually. */
  Manual = 'MANUAL'
}

/** The input fields to unfollow a channel for the connected user. */
export type UnfollowChannelInput = {
  /** The Dailymotion ID of the channel to unfollow. */
  channelXid: Scalars['String']['input'];
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The return fields from unfollowing a channel for the connected user. */
export type UnfollowChannelPayload = {
  __typename?: 'UnfollowChannelPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to unfollow a topic for the connected user. */
export type UnfollowTopicInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion ID of the topic to unfollow. */
  topicXid: Scalars['String']['input'];
};

/** The return fields from unfollowing a topic for the connected user. */
export type UnfollowTopicPayload = {
  __typename?: 'UnfollowTopicPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to unfollow a user for the connected user. */
export type UnfollowUserInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion ID of the user. */
  xid: Scalars['String']['input'];
};

/** The return fields from unfollowing a chanusernel for the connected user. */
export type UnfollowUserPayload = {
  __typename?: 'UnfollowUserPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to unlike a video for the connected user. */
export type UnlikeVideoInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion ID of the video to unlike. */
  videoXid: Scalars['String']['input'];
};

/** The return fields from unliking a video for the connected user. */
export type UnlikeVideoPayload = {
  __typename?: 'UnlikeVideoPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to update a behavior rule. */
export type UpdateBehaviorRuleInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Condition when to apply the rule (contains JSON). */
  condition?: InputMaybe<Scalars['String']['input']>;
  /** Description of the rule. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Indicate whether the rule/condition is enabled. */
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** End date and time (DateTime ISO8601) of the rule if enabled. */
  endAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Experiment configuration. If set, this rule will be an experiment (contains JSON). */
  experiment?: InputMaybe<Scalars['String']['input']>;
  /** The name of the selected rule to update. */
  name: Scalars['String']['input'];
  /** Change the rule name. */
  newName?: InputMaybe<Scalars['String']['input']>;
  /** Start date and time (DateTime ISO8601) of the rule if enabled. */
  startAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** The tags associated with the rule. Useful for filtering. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** The return fields from updating a rule used for feature flipping or AB experiments. */
export type UpdateBehaviorRulePayload = {
  __typename?: 'UpdateBehaviorRulePayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The updated rule. */
  rule?: Maybe<Rule>;
};

/** The input fields to update a channel. */
export type UpdateChannelInput = {
  /** The url of the avatar of the channel. Send `null` to remove the avatar url. */
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The country of the channel. */
  country?: InputMaybe<Scalars['String']['input']>;
  /** The description of the channel. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The display name of the channel. */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** The external links of the channel. */
  externalLinks?: InputMaybe<ChannelExternalLinksInput>;
  /** The language of the channel. */
  language?: InputMaybe<Scalars['String']['input']>;
  /** The name of the channel. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion ID of the channel to update. */
  xid: Scalars['String']['input'];
};

/** The return fields from updating a channel. */
export type UpdateChannelPayload = {
  __typename?: 'UpdateChannelPayload';
  /** The updated channel. */
  channel?: Maybe<Channel>;
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to update a collection. */
export type UpdateCollectionInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion ID of the collection to update. */
  collectionXid: Scalars['String']['input'];
  /** The description of the collection. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the collection. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Indicate whether the collection is private. */
  private?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The return fields from updating a collection. */
export type UpdateCollectionPayload = {
  __typename?: 'UpdateCollectionPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The updated collection. */
  collection?: Maybe<Collection>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to update the email notification settings of the connected user. */
export type UpdateNotificationSettingsEmailInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Indicate whether to receive notification when a channel you follow starts a live. */
  followingChannelStartsLive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicate whether to receive when a channel you follow uploads a new video. */
  followingChannelUploadsVideo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicate whether to receive occasionally about monetization insigths. */
  monetizationInsights?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicate whether to receive occasionally about product updates. */
  productUpdates?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicate whether to receive notification occasionally to remind unwatched videos; videos from `WatchLater`. */
  remindUnwatchedVideos?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicate whether to receive `tips & tricks`. */
  tips?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicate whether to receive `curated videos for you` occasionally. */
  videoDigest?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The return fields from updating the email notification settings of the connected user. */
export type UpdateNotificationSettingsEmailPayload = {
  __typename?: 'UpdateNotificationSettingsEmailPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The udpated email notification settngs. */
  notificationSettings?: Maybe<NotificationSettings>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to update the push notification settings of the connected user. */
export type UpdateNotificationSettingsPushInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Indicate whether to receive notification when a channel you follow starts a live. */
  followingStartsLive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicate whether to receive notification occasionally to remind unwatched videos; videos from `WatchLater`. */
  remindUnwatchedVideos?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicate whether to receive `tips & tricks`. */
  tips?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicate whether to receive `curated videos for you` occasionally. */
  videoDigest?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The return fields from updating the email notification settings of the connected user. */
export type UpdateNotificationSettingsPushPayload = {
  __typename?: 'UpdateNotificationSettingsPushPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The updated push notification settings. */
  notificationSettings?: Maybe<NotificationSettings>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to update a reaction. */
export type UpdateReactionInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** the hashtags of the reaction */
  hashtags?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The ID of the reaction to update. */
  id: Scalars['ID']['input'];
  /** The title of the reaction. */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** The input fields to update a user. */
export type UpdateUserInput = {
  /** The Apple ID of the user. */
  appleID?: InputMaybe<Scalars['String']['input']>;
  /** The URL of the avatar image of the user. */
  avatarURL?: InputMaybe<Scalars['String']['input']>;
  /** The birthday (DateTime ISO8601) of the user. */
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The email address of the user. This field is deprecated: Use mutation `emailChangeRequest`. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The Facebook ID of the user. */
  facebookID?: InputMaybe<Scalars['String']['input']>;
  /** The first name of the user. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The gender of the user. */
  gender?: InputMaybe<Gender>;
  /** The Googleplus ID of the user. */
  googleplusID?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** The Microsoft ID of the user. */
  microsoftID?: InputMaybe<Scalars['String']['input']>;
  /** The name of the user. @deprecated(reason: Use `firstName` and `lastName` respectively). */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The new password for the user. */
  newPassword?: InputMaybe<Scalars['String']['input']>;
  /**
   * The nickname of the user. Must be between 3 and 27 characters, can contain any [a-z0-9_.] characters,
   *   and start with alphanumeric.
   */
  nickname?: InputMaybe<Scalars['String']['input']>;
  /** The old password of the user. */
  oldPassword?: InputMaybe<Scalars['String']['input']>;
  /**
   * The username of the user. Must be between 3 and 60 characters, can contain any [a-zA-Z0-9_-] characters,
   *   and have at least one [a-zA-Z_-] character.
   */
  username?: InputMaybe<Scalars['String']['input']>;
  /** The mutation version. */
  version?: InputMaybe<Scalars['Int']['input']>;
};

/** The return fields to updating a user. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
  /** The updated Dailymotion user. */
  user?: Maybe<User>;
};

/** The input fields to update a video. */
export type UpdateVideoInput = {
  /** The category of the video. */
  category?: InputMaybe<MediaCategory>;
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the video. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** the hashtags of the video */
  hashtags?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Indicates whether the video is created for kids. */
  isCreatedForKids?: InputMaybe<Scalars['Boolean']['input']>;
  /** The language of the video. */
  language?: InputMaybe<Scalars['String']['input']>;
  /** The password of the video. When setting a value on this field, the video visibility changes to `password protected`. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Indicates whether the video is private. */
  private?: InputMaybe<Scalars['Boolean']['input']>;
  /** Indicates whether the video is published. */
  published?: InputMaybe<Scalars['Boolean']['input']>;
  /** The list of tags to associate to the video. */
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The title of the video. */
  title?: InputMaybe<Scalars['String']['input']>;
  /** The URL of the video. */
  url?: InputMaybe<Scalars['String']['input']>;
  /** The Dailymotion ID of the video to update. */
  xid: Scalars['String']['input'];
};

/** The return fields from updating a video. */
export type UpdateVideoPayload = {
  __typename?: 'UpdateVideoPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
  /** The updated video. */
  video?: Maybe<Video>;
};

/** The possible values which uploaded video connections can be sorted by. */
export enum UploadedVideoSort {
  /** Sort uploaded video by most recent. */
  Recent = 'RECENT',
  /** Sort uploaded video by most viewed. */
  Visited = 'VISITED'
}

/** A user object contains information about a Dailymotion user. */
export type User = Node & {
  __typename?: 'User';
  /** The account status of the user. */
  accountStatus?: Maybe<Scalars['String']['output']>;
  /**
   * The account type of the user (viewer, partner, partner-verified).
   * @deprecated Use `channel.accountType`.
   */
  accountType?: Maybe<Scalars['String']['output']>;
  /** The Apple ID of the user. */
  appleID?: Maybe<Scalars['String']['output']>;
  /**
   * The URL of the avatar image.
   * @deprecated Use `channel.avatar`.
   */
  avatarURL?: Maybe<Scalars['String']['output']>;
  /** The user's birthday in (DateTime ISO8601). */
  birthday?: Maybe<Scalars['DateTime']['output']>;
  /** Indicates whether the user can access to partner HQ. */
  canAccessPartnerHQ?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates whether the user can change its nickname.
   * @deprecated Use `channel.canChangeName`.
   */
  canChangeNickname?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates whether the user can change its username.
   * @deprecated Use `channel.canChangeName`.
   */
  canChangeUsername?: Maybe<Scalars['Boolean']['output']>;
  /** The channel of the Partner. */
  channel?: Maybe<Channel>;
  /**
   * The collections created by the user.
   * @deprecated Use `channel.collections`.
   */
  collections?: Maybe<CollectionConnection>;
  /** The country of the user. */
  country?: Maybe<Country>;
  /**
   * The URL of the cover image.
   * @deprecated Use `channel.banner`.
   */
  coverURL?: Maybe<Scalars['String']['output']>;
  /** The creation date (DateTime ISO8601) of the user. */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** The email address of the user. */
  email?: Maybe<Scalars['String']['output']>;
  /** Information about the email change request of the user. */
  emailChangeRequest?: Maybe<EmailChangeRequest>;
  /** The Facebook ID of the user. */
  facebookID?: Maybe<Scalars['String']['output']>;
  /** The first name of the user. */
  firstName?: Maybe<Scalars['String']['output']>;
  /**
   * The channels the user is following.
   * @deprecated Use `channel.followings` field.
   */
  followedChannels?: Maybe<FollowedChannelConnection>;
  /** The topics the user is following. */
  followedTopics?: Maybe<FollowedTopicConnection>;
  /**
   * The users that are following the user.
   * @deprecated Use `channel.followers` field.
   */
  followers?: Maybe<FollowerConnection>;
  /**
   * The list of users the requested user is following.
   * @deprecated Use `channel.followings` field.
   */
  following?: Maybe<FollowingConnection>;
  /**
   * The channels the user is following.
   * @deprecated Use `followedChannels` field.
   */
  followingChannels?: Maybe<ChannelConnection>;
  /**
   * The topics the user is following.
   * @deprecated Use `followedTopics` field.
   */
  followingTopics?: Maybe<TopicConnection>;
  /** The first and last name of the user. */
  fullName?: Maybe<Scalars['String']['output']>;
  /** The gender of the user. */
  gender?: Maybe<Gender>;
  /** The Googleplus ID of the user. */
  googleplusID?: Maybe<Scalars['String']['output']>;
  /**
   * Indicates whether the user has a channel.
   * @deprecated Use `channel` field, if not null, then true.
   */
  hasChannel?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the user has any linked social accounts. */
  hasLinkedSocialAccounts?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the user has any (pending or active) organization memberships. */
  hasOrganizationMemberships?: Maybe<Scalars['Boolean']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The interests of the user. */
  interests?: Maybe<UserInterestConnection>;
  /** Indicates whether the user is an admin. */
  isAdmin?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the user is confirmed. */
  isConfirmed?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the user can mass report videos as copyright owner. */
  isCopyrightOwnerMassReport?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates whether the user is followed by the connected user. Returns `False` if no user is connected.
   * @deprecated Use `channel.followerEngagement` field.
   */
  isFollowed?: Maybe<Scalars['Boolean']['output']>;
  /** The language of the user. */
  language?: Maybe<Language>;
  /** The last name of the user. */
  lastName?: Maybe<Scalars['String']['output']>;
  /**
   * The medias the user has liked.
   * @deprecated Use `channel.bookmarks(filter: { bookmark: { eq: LIKE }})`.
   */
  likedMedias?: Maybe<MediaConnection>;
  /**
   * The videos the user has liked.
   * @deprecated Use `likedMedias` field.
   */
  likedVideos?: Maybe<VideoConnection>;
  /** The Microsoft ID of the user. */
  microsoftID?: Maybe<Scalars['String']['output']>;
  /**
   * The name of the user.
   * @deprecated Use `fullname`.
   */
  name?: Maybe<Scalars['String']['output']>;
  /**
   * The nickname of the user.
   * @deprecated Use `channel.name`
   */
  nickname?: Maybe<Scalars['String']['output']>;
  /** The notification settings of the user. */
  notificationSettings?: Maybe<NotificationSettings>;
  /** The organizations created by the user. */
  organizations?: Maybe<OrganizationConnection>;
  /** The advanced data available if the user is a partner. */
  partner?: Maybe<Partner>;
  /**
   * The reaction videos created by the user.
   * @deprecated Use `channel.reactions`.
   */
  reactionVideos?: Maybe<ReactionVideoConnection>;
  /**
   * The sharingURL of the user.
   * @deprecated Use `channel.shareUrls.permalink`.
   */
  sharingURL?: Maybe<Scalars['String']['output']>;
  /**
   * The stats of the user.
   * @deprecated Use `channel.metrics`.
   */
  stats?: Maybe<UserStats>;
  /** The videos from the subscriptions of channels and topics followed by the user. */
  subscriptions?: Maybe<VideoConnection>;
  /**
   * The videos the user has uploaded.
   * @deprecated Use `channel.videos`.
   */
  uploadedVideos?: Maybe<VideoConnection>;
  /**
   * The username of the user. Must be between 3 and 60 characters, can contain any [a-zA-Z0-9_-] characters,
   *   and have at least one [a-zA-Z_-] character.
   * @deprecated Use `channel.name`
   */
  username?: Maybe<Scalars['String']['output']>;
  /**
   * The videos the user has saved to watch later.
   * @deprecated Use `watchLaterMedias` field.
   */
  watchLater?: Maybe<VideoConnection>;
  /** The medias the user has saved to watch later. */
  watchLaterMedias?: Maybe<MediaConnection>;
  /** The medias the user has watched. */
  watchedMedias?: Maybe<MediaConnection>;
  /**
   * The videos the user has watched.
   * @deprecated Use `watchedMedias` field.
   */
  watchedVideos?: Maybe<VideoConnection>;
  /** The Dailymotion ID of the user. */
  xid: Scalars['String']['output'];
};


/** A user object contains information about a Dailymotion user. */
export type UserAvatarUrlArgs = {
  size: Scalars['String']['input'];
};


/** A user object contains information about a Dailymotion user. */
export type UserCollectionsArgs = {
  collectionXids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  createdAfter?: InputMaybe<Scalars['Date']['input']>;
  createdBefore?: InputMaybe<Scalars['Date']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hasPublicVideos?: InputMaybe<Scalars['Boolean']['input']>;
  isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<UserCollectionsSort>;
  videoXid?: InputMaybe<Scalars['String']['input']>;
};


/** A user object contains information about a Dailymotion user. */
export type UserCoverUrlArgs = {
  size: Scalars['String']['input'];
};


/** A user object contains information about a Dailymotion user. */
export type UserFollowedChannelsArgs = {
  channelXids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<FollowedChannelsSort>;
};


/** A user object contains information about a Dailymotion user. */
export type UserFollowedTopicsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<FollowedTopicsSort>;
  topicXids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** A user object contains information about a Dailymotion user. */
export type UserFollowersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** A user object contains information about a Dailymotion user. */
export type UserFollowingArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** A user object contains information about a Dailymotion user. */
export type UserFollowingChannelsArgs = {
  channelXids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<UserFollowingChannelsSort>;
};


/** A user object contains information about a Dailymotion user. */
export type UserFollowingTopicsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<UserFollowingTopicsSort>;
  topicXids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** A user object contains information about a Dailymotion user. */
export type UserInterestsArgs = {
  enabledOnly?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** A user object contains information about a Dailymotion user. */
export type UserLikedMediasArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  mediaXids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<LikedMediaSort>;
  types?: InputMaybe<Array<InputMaybe<MediaType>>>;
};


/** A user object contains information about a Dailymotion user. */
export type UserLikedVideosArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** A user object contains information about a Dailymotion user. */
export type UserOrganizationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  xids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** A user object contains information about a Dailymotion user. */
export type UserReactionVideosArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** A user object contains information about a Dailymotion user. */
export type UserSubscriptionsArgs = {
  createdAfter?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  type: UserSubscriptionsType;
};


/** A user object contains information about a Dailymotion user. */
export type UserUploadedVideosArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  privacy?: InputMaybe<RecordingPrivacy>;
  sort?: InputMaybe<UploadedVideoSort>;
  videoXids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** A user object contains information about a Dailymotion user. */
export type UserWatchLaterArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


/** A user object contains information about a Dailymotion user. */
export type UserWatchLaterMediasArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  mediaXids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  types?: InputMaybe<Array<InputMaybe<MediaType>>>;
};


/** A user object contains information about a Dailymotion user. */
export type UserWatchedMediasArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  mediaXids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  types?: InputMaybe<Array<InputMaybe<MediaType>>>;
};


/** A user object contains information about a Dailymotion user. */
export type UserWatchedVideosArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** The possible values for a user account. */
export enum UserActivationCodeAccountType {
  /** Partner account type. */
  Partner = 'PARTNER',
  /** Viewer account type. */
  Viewer = 'VIEWER'
}

/** The possible sort values to order the collections belonging to a user. */
export enum UserCollectionsSort {
  /** Sort collections alphabetically. */
  Alphaaz = 'ALPHAAZ',
  /** Sort collections by changed date. */
  Changed = 'CHANGED',
  /** Sort collections by most recent. */
  Recent = 'RECENT'
}

/** The input fields to confirm an email change. */
export type UserEmailChangeConfirmInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The confirmation code received from the email change request. */
  code: Scalars['String']['input'];
};

/** The return fields from confirming an email change. */
export type UserEmailChangeConfirmPayload = {
  __typename?: 'UserEmailChangeConfirmPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to request an email change. */
export type UserEmailChangeRequestInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The new email for the connected user. */
  email: Scalars['String']['input'];
  /** The password of the connected user. */
  password: Scalars['String']['input'];
};

/** The return fields from requesting an email change. */
export type UserEmailChangeRequestPayload = {
  __typename?: 'UserEmailChangeRequestPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to request a new email confirmation code. */
export type UserEmailConfirmationCodeResetInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The return fields from requesting a new email confirmation code. */
export type UserEmailConfirmationCodeResetPayload = {
  __typename?: 'UserEmailConfirmationCodeResetPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to generate an email validation token. */
export type UserEmailValidationTokenInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The email address of the user. */
  email: Scalars['String']['input'];
};

/** The return fields from requesting an email validation token. */
export type UserEmailValidationTokenPayload = {
  __typename?: 'UserEmailValidationTokenPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The email validation token to request an activation code. */
  emailValidationToken: Scalars['String']['output'];
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The possible sort values to order the channels followed by a user. */
export enum UserFollowingChannelsSort {
  /** Sort by activity. */
  Activity = 'ACTIVITY',
  /** Sort alphabetically. */
  Alphaaz = 'ALPHAAZ',
  /** Sort by creation date. */
  Recent = 'RECENT'
}

/** The possible sort values to order the topics followed by a user. */
export enum UserFollowingTopicsSort {
  /** Sort by activity. */
  Activity = 'ACTIVITY',
  /** Sort alphabetically. */
  Alphaaz = 'ALPHAAZ',
  /** Sort by creation date. */
  Recent = 'RECENT'
}

/** Information about the user interests. */
export type UserInterest = Node & {
  __typename?: 'UserInterest';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The interest of the user. */
  interest?: Maybe<Interest>;
};

/** The input fields to add an interest to a user. */
export type UserInterestAddInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the interest. */
  interestId: Scalars['Int']['input'];
};

/** The return fields from adding an interest of the user. */
export type UserInterestAddPayload = {
  __typename?: 'UserInterestAddPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The connection type for UserInterest. */
export type UserInterestConnection = {
  __typename?: 'UserInterestConnection';
  /** A list of edges. */
  edges: Array<Maybe<UserInterestEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type UserInterestEdge = {
  __typename?: 'UserInterestEdge';
  /** The item at the end of the edge. */
  node?: Maybe<UserInterest>;
};

/** The input fields to remove an interest from a user. */
export type UserInterestRemoveInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the interest. */
  interestId: Scalars['Int']['input'];
};

/** The return fields from removing an interest from the user. */
export type UserInterestRemovePayload = {
  __typename?: 'UserInterestRemovePayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to replace the interests of a user. */
export type UserInterestsUpdateInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the interest. */
  interestIds: Array<Scalars['Int']['input']>;
};

/** The return fields from replacing the interests of the user. */
export type UserInterestsUpdatePayload = {
  __typename?: 'UserInterestsUpdatePayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** The input fields to request a code B of OpenWeb service. */
export type UserOpenWebCodeBRequestInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The session ID received from client side. */
  codeA: Scalars['String']['input'];
};

/** The return fields from confirming an email change. */
export type UserOpenWebCodeBRequestPayload = {
  __typename?: 'UserOpenWebCodeBRequestPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The code B provided by OpenWeb service. */
  codeB: Scalars['String']['output'];
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** A user's voting information for a poll. */
export type UserPollAnswer = Node & {
  __typename?: 'UserPollAnswer';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The identifier of the answer option selected by the user. */
  optionId: Scalars['ID']['output'];
};

/** Information about the user stats. */
export type UserStats = Node & {
  __typename?: 'UserStats';
  /** The stats of the collections of the user. */
  collections?: Maybe<UserStatsCollections>;
  /** The stats of the followers of the user. */
  followers?: Maybe<UserStatsFollowers>;
  /** The stats of the channel followed by the user. */
  followingChannels?: Maybe<UserStatsFollowingChannels>;
  /** The stats of the topics followed by the user. */
  followingTopics?: Maybe<UserStatsFollowingTopics>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The stats of the liked videos of the user. */
  likedVideos?: Maybe<UserStatsLikedVideos>;
  /** The stats of the reaction videos of the user. */
  reactionVideos?: Maybe<UserStatsReactionVideos>;
  /** The stats of the uploaded videos (not including lives) of the user. */
  uploadedVideos?: Maybe<UserStatsUploadedVideos>;
  /** The stats of the videos of the user. */
  videos?: Maybe<UserStatsVideos>;
  /** The stats of the videos to watch later for the user. */
  watchLater?: Maybe<UserStatsWatchLater>;
  /** The stats of the watched videos of the user. */
  watchedVideos?: Maybe<UserStatsWatchedVideos>;
};

/** The stats of the collections of the user. */
export type UserStatsCollections = Node & {
  __typename?: 'UserStatsCollections';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of collections of the user. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The stats of the followers of the user. */
export type UserStatsFollowers = Node & {
  __typename?: 'UserStatsFollowers';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of followers of the user. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The stats of the channel followed by the user. */
export type UserStatsFollowingChannels = Node & {
  __typename?: 'UserStatsFollowingChannels';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of channels followed by the user. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The stats of the topics followed by the user. */
export type UserStatsFollowingTopics = Node & {
  __typename?: 'UserStatsFollowingTopics';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of followed topics count. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The stats of the liked videos of the user. */
export type UserStatsLikedVideos = Node & {
  __typename?: 'UserStatsLikedVideos';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of videos the user has liked. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The stats of the reaction videos of the user. */
export type UserStatsReactionVideos = Node & {
  __typename?: 'UserStatsReactionVideos';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of reaction videos the user has created. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The stats of the uploaded videos (not including lives) of the user. */
export type UserStatsUploadedVideos = Node & {
  __typename?: 'UserStatsUploadedVideos';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of videos the user has uploaded. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The stats of the videos of the user. */
export type UserStatsVideos = Node & {
  __typename?: 'UserStatsVideos';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of videos of the user. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The stats of the videos to watch later for the user. */
export type UserStatsWatchLater = Node & {
  __typename?: 'UserStatsWatchLater';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of videos the user has saved to watch later. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The stats of the watched videos of the user. */
export type UserStatsWatchedVideos = Node & {
  __typename?: 'UserStatsWatchedVideos';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of videos the user has watched. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The possible subscription types for the user. */
export enum UserSubscriptionsType {
  /** Get subscriptions from followed channels. */
  Channel = 'CHANNEL',
  /** Get subscriptions from followed topics. */
  Topic = 'TOPIC'
}

/** Information about a video. */
export type Video = Content & Node & Recording & {
  __typename?: 'Video';
  /** Indicates whether the video can be embedded outside of Dailymotion. */
  allowEmbed?: Maybe<Scalars['Boolean']['output']>;
  /** The aspect ratio of the video (e.g. 1.33333 for 4/3, 1.77777 for 16/9). */
  aspectRatio?: Maybe<Scalars['Float']['output']>;
  /** The best available quality of the video. */
  bestAvailableQuality?: Maybe<MediaQuality>;
  /** Indicates whether advertisements are allowed on the video. */
  canDisplayAds?: Maybe<Scalars['Boolean']['output']>;
  /** The categories of the video. */
  categories?: Maybe<CategoryConnection>;
  /**
   * The category of the video.
   * @deprecated Use `categories` field.
   */
  category?: Maybe<MediaCategory>;
  /**
   * The channel that created the video.
   * @deprecated Use `creator` field.
   */
  channel?: Maybe<Channel>;
  /** The channel claiming revenue sharing on the video. */
  claimer?: Maybe<Channel>;
  /**
   * The collections where the video is saved.
   * @deprecated Use `me.collections` with argument `videoXid`.
   */
  collections?: Maybe<CollectionConnection>;
  /** The comments of the video. */
  comments?: Maybe<CommentConnection>;
  /** The creation date (DateTime ISO8601) of the video. */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** The creator that created the video. */
  creator?: Maybe<Channel>;
  /**
   * The curated categories associated to the video.
   * @deprecated Use `interests` field.
   */
  curatedCategories?: Maybe<CuratedCategoryConnection>;
  /**
   * The description of the video in utf8.
   *   Clients are expected to handle '<br/>' tags and detect 'http(s)://' links.
   *   No other HTML tag should be present.
   */
  description?: Maybe<Scalars['String']['output']>;
  /** The duration of the video in seconds. */
  duration?: Maybe<Scalars['Int']['output']>;
  /** The HTML embedding code to embed the video outside of Dailymotion. */
  embedHtml?: Maybe<Scalars['String']['output']>;
  /** The URL to embed the video outside of Dailymotion. */
  embedURL?: Maybe<Scalars['String']['output']>;
  /** The geoblocked countries of the video. */
  geoblockedCountries?: Maybe<GeoblockedCountries>;
  /** The country codes (ISO 3166-1 alpha-2) that are allowed or denied by the video. */
  geoblocking?: Maybe<GeoblockingConnection>;
  /** Indicates whether the video has a fingerprint. */
  hasFingerprint?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the video has perspective videos associated with it. */
  hasPerspective?: Maybe<Scalars['Boolean']['output']>;
  /** The hashtags of the video. */
  hashtags?: Maybe<HashtagConnection>;
  /** The height of the video (px). */
  height?: Maybe<Scalars['Int']['output']>;
  /**
   * The URL of the adaptative bitrate manifest using the Apple HTTP Live Streaming
   *   protocol. Without an access token this field contains null, the Dailymotion
   *   user associated with the access token must be the owner of the video. This
   *   field is rate limited. The returned url is secured: it can only be consumed by
   *   the user who made the query and it expires after a certain time.
   */
  hlsURL?: Maybe<Scalars['String']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The interests associated to the video. */
  interests?: Maybe<InterestConnection>;
  /** Indicates whether the video is 360°. */
  is360?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether advertising is blocked on the video. */
  isAdvertisingBlocked?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates whether the video is bookmarked by the connected user.
   *   Returns False if the user is not connected.
   * @deprecated Use `viewerEngagement.bookmarked` field.
   */
  isBookmarked?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether comments is enabled on the video. */
  isCommentsEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the video is "Created for Kids" (intends to target an audience of age 16 and under). */
  isCreatedForKids?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the video can be downloaded. */
  isDownloadable?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the video is explicit. */
  isExplicit?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the video is in the specified collection. */
  isInCollection?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates whether the video is in the watch later list of the connected user.
   *   Returns False if the user is not connected.
   * @deprecated Use `viewerEngagement.favorited` field.
   */
  isInWatchLater?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates whether the connected user has liked the video.
   * @deprecated Use `viewerEngagement.liked` field.
   */
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the video is password-protected. */
  isPasswordProtected?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the video is private. */
  isPrivate?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the video is published. */
  isPublished?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates whether the connected user has reacted to the video.
   *   Returns False if the user is not connected.
   * @deprecated Use `viewerEngagement.reacted` field.
   */
  isReacted?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether reaction videos are allowed on the video. */
  isReactionVideosEnabled?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates whether the current user has started watching the video.
   * @deprecated Use `viewerEngagement.watchStarted` field.
   */
  isWatched?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates whether the current user has completely watched video.
   * @deprecated Use `viewerEngagement.watchCompleted` field.
   */
  isWatchedComplete?: Maybe<Scalars['Boolean']['output']>;
  /** The language of the video. */
  language?: Maybe<Language>;
  /** The metrics of the video. */
  metrics?: Maybe<VideoMetrics>;
  /** The moderation information of the video. */
  moderation?: Maybe<MediaModeration>;
  /** The next set of videos after the video. */
  nextVideos?: Maybe<VideoConnection>;
  /**
   * The reaction videos created on the video.
   * @deprecated Use `reactions` field.
   */
  reactionVideos?: Maybe<ReactionVideoConnection>;
  /** The reactions created on the video. */
  reactions?: Maybe<ReactionConnection>;
  /** The related videos to the video. */
  relatedVideos?: Maybe<VideoConnection>;
  /** The restriction information of the video. */
  restriction?: Maybe<Restriction>;
  /** The share urls of the video. */
  shareUrls?: Maybe<VideoShareUrls>;
  /**
   * The sharing URLs of the video.
   * @deprecated Use `shareUrls` field.
   */
  sharingURLs?: Maybe<SharingUrlConnection>;
  /** The spritesheet details of the video. */
  spritesheet?: Maybe<Image>;
  /** The spritesheet seeker details of the video. */
  spritesheetSeeker?: Maybe<Image>;
  /**
   * The stats of the video.
   * @deprecated Use `metrics` field.
   */
  stats?: Maybe<VideoStats>;
  /** The current status of the video. */
  status?: Maybe<VideoStatus>;
  /** The subtitles of the video. */
  subtitles?: Maybe<SubtitleConnection>;
  /** The tags of the video. */
  tags?: Maybe<MediaTagConnection>;
  /** The URL of the thumbnail image. */
  thumbnail?: Maybe<Image>;
  /**
   * The URL of the thumbnail image.
   * @deprecated Use `thumbnail` field.
   */
  thumbnailURL?: Maybe<Scalars['String']['output']>;
  /**
   * The thumbnails of the video.
   * @deprecated Use `thumbnailURL` field.
   */
  thumbnails?: Maybe<Thumbnails>;
  /** The title of the video. */
  title?: Maybe<Scalars['String']['output']>;
  /** The list of topics related to the media. */
  topics?: Maybe<TopicConnection>;
  /** The last update date (DateTime ISO8601) of the video. */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** The upload info of the video, read-only for the owner of the video. */
  uploadInfo?: Maybe<MediaUploadInfo>;
  /**
   * The URL of the video.
   * @deprecated Use `shareUrls.permalink` field.
   */
  url?: Maybe<Scalars['String']['output']>;
  /**
   * The total number of views of the video.
   * @deprecated Use `stats.views.total` field.
   */
  viewCount?: Maybe<Scalars['Int']['output']>;
  /** The viewer engagement information of the video. */
  viewerEngagement?: Maybe<VideoViewerEngagement>;
  /** The width of the video (px). */
  width?: Maybe<Scalars['Int']['output']>;
  /** The Dailymotion ID of the video. */
  xid: Scalars['String']['output'];
};


/** Information about a video. */
export type VideoCategoriesArgs = {
  filter: CategoryFilter;
};


/** Information about a video. */
export type VideoCollectionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Information about a video. */
export type VideoCommentsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<CommentSort>;
};


/** Information about a video. */
export type VideoCuratedCategoriesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Information about a video. */
export type VideoGeoblockingArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  isAllowed?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Information about a video. */
export type VideoHashtagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Information about a video. */
export type VideoInterestsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Information about a video. */
export type VideoIsInCollectionArgs = {
  collectionXid: Scalars['String']['input'];
};


/** Information about a video. */
export type VideoLanguageArgs = {
  source?: LanguageSource;
};


/** Information about a video. */
export type VideoNextVideosArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Information about a video. */
export type VideoReactionVideosArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Information about a video. */
export type VideoReactionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Information about a video. */
export type VideoRelatedVideosArgs = {
  algorithm?: InputMaybe<VideoRelatedAlgo>;
  context?: InputMaybe<RelatedVideoContext>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Information about a video. */
export type VideoSharingUrLsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Information about a video. */
export type VideoSubtitlesArgs = {
  autoGenerated?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Information about a video. */
export type VideoTagsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Information about a video. */
export type VideoThumbnailArgs = {
  height: ThumbnailHeight;
};


/** Information about a video. */
export type VideoThumbnailUrlArgs = {
  size: Scalars['String']['input'];
};


/** Information about a video. */
export type VideoTopicsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  whitelistedOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The connection type for Video. */
export type VideoConnection = {
  __typename?: 'VideoConnection';
  /** A list of edges. */
  edges: Array<Maybe<VideoEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** Curated videos for you notification settings. */
export type VideoDigest = Node & {
  __typename?: 'VideoDigest';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates whether the email notification setting is enabled. */
  isEmailEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the push notification setting is enabled. */
  isPushEnabled?: Maybe<Scalars['Boolean']['output']>;
};

/** An edge in a connection. */
export type VideoEdge = {
  __typename?: 'VideoEdge';
  /** The item at the end of the edge. */
  node?: Maybe<Video>;
};

/** The engagement metrics of a Video. */
export type VideoEngagementMetrics = Node & PostEngagementMetrics & {
  __typename?: 'VideoEngagementMetrics';
  /** The bookmark metrics of the video. */
  bookmarks?: Maybe<BookmarkMetricConnection>;
  /** The comment metrics of the video. */
  comments?: Maybe<CommentMetricConnection>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The like metrics of the video. */
  likes?: Maybe<LikeMetricConnection>;
  /** The reaction metrics of the video. */
  reactions?: Maybe<ReactionMetricConnection>;
};


/** The engagement metrics of a Video. */
export type VideoEngagementMetricsBookmarksArgs = {
  filter?: InputMaybe<BookmarkFilter>;
};


/** The engagement metrics of a Video. */
export type VideoEngagementMetricsLikesArgs = {
  filter?: InputMaybe<LikeMetricFilter>;
};

/** The available input fields of a Video filter. */
export type VideoFilter = {
  /** Filter videos by categoryId. */
  categoryId?: InputMaybe<IdOperator>;
  /** Filter videos by visibility. */
  visibility?: InputMaybe<VisibilityOperator>;
};

/** The node at the end of a VideoMetricEdge. */
export type VideoMetric = Metric & {
  __typename?: 'VideoMetric';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total count of the video metric.  A null value indicates that it is hidden or not available.. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The connection type for a VideoMetric. */
export type VideoMetricConnection = {
  __typename?: 'VideoMetricConnection';
  /** A list of edges. */
  edges: Array<Maybe<VideoMetricEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type VideoMetricEdge = {
  __typename?: 'VideoMetricEdge';
  /** The item at the end of the edge. */
  node?: Maybe<VideoMetric>;
};

/** The metrics of a Video. */
export type VideoMetrics = Node & PostMetrics & {
  __typename?: 'VideoMetrics';
  /** The engagement metrics of the video. */
  engagement?: Maybe<VideoEngagementMetrics>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

/** Types that can be a VideoOrLive. */
export type VideoOrLive = Live | Video;

/** The possible values for video related algorithms. */
export enum VideoRelatedAlgo {
  /** Only uploader. */
  UploaderOnly = 'UPLOADER_ONLY',
  /** Uploader with children channels. */
  UploaderWithChildren = 'UPLOADER_WITH_CHILDREN',
  /** Uploader with parent channel. */
  UploaderWithParent = 'UPLOADER_WITH_PARENT',
  /** Uploader with siblong channels. */
  UploaderWithSiblings = 'UPLOADER_WITH_SIBLINGS'
}

/** Information about the share urls of a Video. */
export type VideoShareUrls = Node & ShareUrls & {
  __typename?: 'VideoShareUrls';
  /** The facebook share url of the video. */
  facebook?: Maybe<Scalars['String']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The permalink share url of the video. */
  permalink: Scalars['String']['output'];
  /** The twitter share url of the video. */
  twitter?: Maybe<Scalars['String']['output']>;
};

/** Information about the video stats. */
export type VideoStats = Node & {
  __typename?: 'VideoStats';
  /** The bookmark stats of the video. */
  bookmarks?: Maybe<VideoStatsBookmarks>;
  /** The favorite stats of the video. */
  favorites?: Maybe<VideoStatsFavorites>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /**
   * The like stats of the video.
   * @deprecated Use `video.metrics.engagement.likes`.
   */
  likes?: Maybe<VideoStatsLikes>;
  /**
   * The reaction stats of the video.
   * @deprecated Use `video.metrics.engagement.reactions`.
   */
  reactionVideos?: Maybe<VideoStatsReactionVideos>;
  /** The saves stats of the video. */
  saves?: Maybe<VideoStatsSaves>;
  /** The view stats of the video. */
  views?: Maybe<VideoStatsViews>;
};

/** The bookmark stats of the video. */
export type VideoStatsBookmarks = Node & {
  __typename?: 'VideoStatsBookmarks';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of bookmarks of the video. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The favorite stats of the video. */
export type VideoStatsFavorites = Node & {
  __typename?: 'VideoStatsFavorites';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of favorites of the video. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The like stats of the video. */
export type VideoStatsLikes = Node & {
  __typename?: 'VideoStatsLikes';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of likes of the video. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The reaction video stats of the video. */
export type VideoStatsReactionVideos = Node & {
  __typename?: 'VideoStatsReactionVideos';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of reaction videos of the video. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The saves stats of the video. */
export type VideoStatsSaves = Node & {
  __typename?: 'VideoStatsSaves';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of playlists and watchlater added of the video. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The view stats of the video. */
export type VideoStatsViews = Node & {
  __typename?: 'VideoStatsViews';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The total number of views of the video. */
  total?: Maybe<Scalars['Int']['output']>;
};

/** The possible values for a video status. */
export enum VideoStatus {
  /** The video has been deleted. */
  Deleted = 'DELETED',
  /** The video has an encoding error. */
  EncodingError = 'ENCODING_ERROR',
  /** The video is processing. */
  Processing = 'PROCESSING',
  /** The video is published. */
  Published = 'PUBLISHED',
  /** The video is ready. */
  Ready = 'READY',
  /** The video has been rejected. */
  Rejected = 'REJECTED',
  /** The video is unknown. */
  Unknown = 'UNKNOWN'
}

/** Contains the different streams available for a video. */
export type VideoStreams = Node & {
  __typename?: 'VideoStreams';
  /** The audio URL of the video stream. */
  audioURL?: Maybe<Scalars['String']['output']>;
  /** The chromecast URL of the video stream. */
  chromecastURL?: Maybe<Scalars['String']['output']>;
  /** The h264 URL of the video stream. */
  h264URL?: Maybe<Scalars['String']['output']>;
  /**
   * The URL of the adaptative bitrate manifest using the Apple HTTP Live Streaming
   *   protocol. Without an access token this field contains null, the Dailymotion
   *   user associated with the access token must be the owner of the video. This
   *   field is rate limited. The returned url is secured: it can only be consumed by
   *   the user who made the query and it expires after a certain time.
   */
  hlsURL?: Maybe<Scalars['String']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The preview URL of the video stream. */
  previewURL?: Maybe<Scalars['String']['output']>;
  /** The restriction information of the video stream. */
  restriction?: Maybe<Restriction>;
  /** The Dailymotion ID of the video. */
  xid: Scalars['String']['output'];
};


/** Contains the different streams available for a video. */
export type VideoStreamsH264UrlArgs = {
  quality: Scalars['String']['input'];
};


/** Contains the different streams available for a video. */
export type VideoStreamsPreviewUrlArgs = {
  quality: Scalars['String']['input'];
};

/** The connection type for Video Streams. */
export type VideoStreamsConnection = {
  __typename?: 'VideoStreamsConnection';
  /** A list of edges. */
  edges: Array<Maybe<VideoStreamsEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type VideoStreamsEdge = {
  __typename?: 'VideoStreamsEdge';
  /** The item at the end of the edge. */
  node?: Maybe<VideoStreams>;
};

/** Information about the viewer engagement of a Video. */
export type VideoViewerEngagement = Node & ViewerEngagement & {
  __typename?: 'VideoViewerEngagement';
  /** Indicates whether the video is bookmarked by the viewer. Returns False if the viewer is not connected. */
  bookmarked?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the viewer has the video in its watch later list. Returns False if the viewer is not connected. */
  favorited?: Maybe<Scalars['Boolean']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates the like rating of the video from the viewer. */
  likeRating?: Maybe<LikeRating>;
  /** Indicates whether the viewer has liked the comment. Returns False if the viewer is not connected. */
  liked?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the viewer has reacted to the video. Returns False if the viewer is not connected. */
  reacted?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the viewer has added the video to one of its collections. Returns False if the viewer is not connected. */
  saved?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the viewer has completed watching the video. Returns False if the viewer is not connected. */
  watchCompleted?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the viewer has started watching the video. Returns False if the viewer is not connected. */
  watchStarted?: Maybe<Scalars['Boolean']['output']>;
};

/** Information about the viewer engagement of a Post. */
export type ViewerEngagement = {
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates the like rating of the post from the viewer. */
  likeRating?: Maybe<LikeRating>;
  /** Indicates whether the viewer has liked the post. Returns False if the viewer is not connected. */
  liked?: Maybe<Scalars['Boolean']['output']>;
};

/** Information of the views to build efficient UIs. */
export type Views = Node & {
  __typename?: 'Views';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The neon app. */
  neon?: Maybe<Neon>;
};

/** The visibility of a content. */
export enum Visibility {
  /** Content that is private, viewable to the owner only or with a password. */
  Private = 'PRIVATE',
  /** Content that is public, viewable to anyone. */
  Public = 'PUBLIC'
}

/** The available input fields of for a Visibility operator. */
export type VisibilityOperator = {
  /** Short for equal, must match the given data exactly. */
  eq: Visibility;
};

/** Represents a Watch (an interaction). */
export type Watch = History & Node & {
  __typename?: 'Watch';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** The post watched by the channel. */
  post: Post;
};

/** The input fields to add a video to the `Watched` list of the connected user. */
export type WatchedVideoAddInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Indicates whether the video is watched completely. */
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  /** The Dailymotion ID of the video. */
  videoXid: Scalars['String']['input'];
};

/** The return fields from adding a video to the `Watched` list of the connected user. */
export type WatchedVideoAddPayload = {
  __typename?: 'WatchedVideoAddPayload';
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The status of the mutation. */
  status?: Maybe<Status>;
};

/** Information about a dailymotion page. */
export type Web = Node & {
  __typename?: 'Web';
  /** The author of the page. */
  author?: Maybe<Scalars['String']['output']>;
  /** The country of the page. It is only available when detected as a bot. Otherwise, a null value will be returned. */
  country?: Maybe<Country>;
  /** The description of the page. */
  description?: Maybe<Scalars['String']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  /** Indicates whether the description link can be followed. */
  isFollowable?: Maybe<Scalars['Boolean']['output']>;
  /** The language of the page. It is only available when detected as a bot. Otherwise, a null value will be returned. */
  language?: Maybe<Language>;
  /** The metadatas of the page. */
  metadata?: Maybe<WebMetadataConnectionConnection>;
  /**
   * The metadatas of the page.
   * @deprecated Use `metadata` field.
   */
  metadatas?: Maybe<Array<Maybe<WebMetadata>>>;
  /** The title of the page. */
  title?: Maybe<Scalars['String']['output']>;
};


/** Information about a dailymotion page. */
export type WebMetadataArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** The HTML meta tag of the web. */
export type WebMetadata = Node & {
  __typename?: 'WebMetadata';
  /** The attributes of the metadata. */
  attributes?: Maybe<Array<Maybe<Attribute>>>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

/** The connection type for WebMetadata. */
export type WebMetadataConnection = Node & {
  __typename?: 'WebMetadataConnection';
  /** The attributes of the web metadata. */
  attributes?: Maybe<AttributeConnection>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};


/** The connection type for WebMetadata. */
export type WebMetadataConnectionAttributesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** The connection type for WebMetadataConnection. */
export type WebMetadataConnectionConnection = {
  __typename?: 'WebMetadataConnectionConnection';
  /** A list of edges. */
  edges: Array<Maybe<WebMetadataConnectionEdge>>;
  /** The metadata of the connection. */
  metadata: Metadata;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of items. A null value indicates that the information is unavailable for the connection. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** An edge in a connection. */
export type WebMetadataConnectionEdge = {
  __typename?: 'WebMetadataConnectionEdge';
  /** The item at the end of the edge */
  node?: Maybe<WebMetadataConnection>;
};

/** The input fields to add a like for the connected user. */
export type AddLikeInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the post. */
  postId: Scalars['ID']['input'];
  /** The rating to add to the post. If not provided, defaults to STAR_STRUCK */
  rating?: InputMaybe<LikeRating>;
};

/** The input fields to remove a post for the connected user. */
export type RemoveLikeInput = {
  /** The ID generated for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the post. */
  postId: Scalars['ID']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  Component: ( Channel ) | ( Collection ) | ( Live ) | ( Omit<Poll, 'component' | 'post'> & { component?: Maybe<_RefType['Component']>, post?: Maybe<_RefType['Post']> } ) | ( Omit<Reaction, 'opener'> & { opener?: Maybe<_RefType['Story']> } ) | ( ReactionVideo ) | ( Topic ) | ( Video );
  Media: ( Live ) | ( Video );
  MediaStreams: ( LiveStreams ) | ( VideoStreams );
  Post: ( Collection ) | ( Live ) | ( Omit<Reaction, 'opener'> & { opener?: Maybe<_RefType['Story']> } ) | ( ReactionVideo ) | ( Video );
  PostMetric: ( CollectionMetric ) | ( LiveMetric ) | ( ReactionMetric ) | ( VideoMetric );
  Story: ( Channel ) | ( Collection ) | ( ContentCategory ) | ( Hashtag ) | ( Live ) | ( Omit<Poll, 'component' | 'post'> & { component?: Maybe<_RefType['Component']>, post?: Maybe<_RefType['Post']> } ) | ( Omit<Reaction, 'opener'> & { opener?: Maybe<_RefType['Story']> } ) | ( ReactionVideo ) | ( Topic ) | ( Video );
  VideoOrLive: ( Live ) | ( Video );
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  AnalyticsPayload: ( AnalyticsFlatPayload ) | ( AnalyticsGroupedPayload );
  Category: ( ContentCategory ) | ( CuratedCategory );
  Content: ( Collection ) | ( Live ) | ( Omit<Reaction, 'opener'> & { opener?: Maybe<_RefType['Story']> } ) | ( Video );
  History: ( Omit<Favorite, 'post'> & { post: _RefType['Post'] } ) | ( Omit<Watch, 'post'> & { post: _RefType['Post'] } );
  Metric: ( BookmarkMetric ) | ( ChannelMetric ) | ( CollectionMetric ) | ( CommentMetric ) | ( LikeMetric ) | ( LiveMetric ) | ( ReactionMetric ) | ( VideoMetric );
  Node: ( Omit<Analytics, 'timeSeries' | 'topValues'> & { timeSeries: _RefType['AnalyticsPayload'], topValues: _RefType['AnalyticsPayload'] } ) | ( AnalyticsGroupedPayloadItem ) | ( AnalyticsReport ) | ( Attribute ) | ( Behavior ) | ( BehaviorRuleTag ) | ( Channel ) | ( ChannelEngagementMetrics ) | ( ChannelExternalLinks ) | ( ChannelMetrics ) | ( ChannelShareUrls ) | ( ChannelStats ) | ( ChannelStatsFollowers ) | ( ChannelStatsReactions ) | ( ChannelStatsVideos ) | ( ChannelStatsViews ) | ( Collection ) | ( CollectionEngagementMetrics ) | ( CollectionMetrics ) | ( CollectionStats ) | ( CollectionStatsVideos ) | ( Omit<Comment, 'post'> & { post: _RefType['Post'] } ) | ( CommentEngagementMetrics ) | ( CommentMetrics ) | ( CommentViewerEngagement ) | ( ContentCategory ) | ( Omit<Conversation, 'story'> & { story?: Maybe<_RefType['Story']> } ) | ( Country ) | ( CuratedCategory ) | ( DailymotionAd ) | ( EmailChangeRequest ) | ( ExperimentMatch ) | ( FallbackCountry ) | ( Omit<Favorite, 'post'> & { post: _RefType['Post'] } ) | ( FeatureMatch ) | ( FeaturedContent ) | ( FileUpload ) | ( FollowedChannel ) | ( FollowedTopic ) | ( Follower ) | ( FollowerEngagement ) | ( Following ) | ( FollowingChannelStartsLive ) | ( FollowingChannelUploadsVideo ) | ( FollowingStartsLive ) | ( GeoblockedCountries ) | ( Geoblocking ) | ( Hashtag ) | ( HashtagEngagementMetrics ) | ( HashtagMetrics ) | ( Image ) | ( Interest ) | ( Language ) | ( Live ) | ( LiveEngagementMetrics ) | ( LiveMetrics ) | ( LiveShareUrls ) | ( LiveStats ) | ( LiveStatsViews ) | ( LiveStreams ) | ( LiveViewerEngagement ) | ( Localization ) | ( LocalizationMe ) | ( MediaModeration ) | ( MediaTag ) | ( MediaUploadInfo ) | ( Metadata ) | ( MonetizationInsights ) | ( Neon ) | ( NotificationSettings ) | ( Organization ) | ( OrganizationAnalysis ) | ( OrganizationStats ) | ( OrganizationStatsChannels ) | ( Partner ) | ( PartnerReportFile ) | ( PartnerSpace ) | ( Player ) | ( PlayerQueue ) | ( Omit<Poll, 'component' | 'post'> & { component?: Maybe<_RefType['Component']>, post?: Maybe<_RefType['Post']> } ) | ( PollOption ) | ( PollShareUrls ) | ( ProductUpdates ) | ( Omit<Reaction, 'opener'> & { opener?: Maybe<_RefType['Story']> } ) | ( ReactionEngagementMetrics ) | ( ReactionMetrics ) | ( ReactionShareUrls ) | ( ReactionVideo ) | ( ReactionVideoStats ) | ( ReactionVideoStatsBookmarks ) | ( ReactionVideoStatsFavorites ) | ( ReactionVideoStatsLikes ) | ( ReactionVideoStatsReactionVideos ) | ( ReactionVideoStatsSaves ) | ( ReactionViewerEngagement ) | ( Omit<RecommendedRecording, 'recording'> & { recording?: Maybe<_RefType['Recording']> } ) | ( RemindUnwatchedVideos ) | ( ReportFileDownloadLink ) | ( Restriction ) | ( Rule ) | ( Search ) | ( Omit<Section, 'relatedComponent'> & { relatedComponent?: Maybe<_RefType['Component']> } ) | ( SharingUrl ) | ( Subdivision ) | ( Subtitle ) | ( Suggestion ) | ( SupportedCountry ) | ( SupportedLanguage ) | ( Thumbnails ) | ( Tips ) | ( Topic ) | ( TopicLabel ) | ( TopicShareUrls ) | ( TopicStats ) | ( TopicStatsFollowers ) | ( TopicStatsVideos ) | ( TopicWhitelistStatus ) | ( User ) | ( UserInterest ) | ( UserPollAnswer ) | ( UserStats ) | ( UserStatsCollections ) | ( UserStatsFollowers ) | ( UserStatsFollowingChannels ) | ( UserStatsFollowingTopics ) | ( UserStatsLikedVideos ) | ( UserStatsReactionVideos ) | ( UserStatsUploadedVideos ) | ( UserStatsVideos ) | ( UserStatsWatchLater ) | ( UserStatsWatchedVideos ) | ( Video ) | ( VideoDigest ) | ( VideoEngagementMetrics ) | ( VideoMetrics ) | ( VideoShareUrls ) | ( VideoStats ) | ( VideoStatsBookmarks ) | ( VideoStatsFavorites ) | ( VideoStatsLikes ) | ( VideoStatsReactionVideos ) | ( VideoStatsSaves ) | ( VideoStatsViews ) | ( VideoStreams ) | ( VideoViewerEngagement ) | ( Views ) | ( Omit<Watch, 'post'> & { post: _RefType['Post'] } ) | ( Web ) | ( WebMetadata ) | ( WebMetadataConnection );
  PostEngagementMetrics: ( LiveEngagementMetrics ) | ( ReactionEngagementMetrics ) | ( VideoEngagementMetrics );
  PostMetrics: ( LiveMetrics ) | ( ReactionMetrics ) | ( VideoMetrics );
  Recording: ( Live ) | ( Omit<Reaction, 'opener'> & { opener?: Maybe<_RefType['Story']> } ) | ( Video );
  ShareUrls: ( ChannelShareUrls ) | ( LiveShareUrls ) | ( PollShareUrls ) | ( ReactionShareUrls ) | ( TopicShareUrls ) | ( VideoShareUrls );
  ViewerEngagement: ( CommentViewerEngagement ) | ( LiveViewerEngagement ) | ( ReactionViewerEngagement ) | ( VideoViewerEngagement );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AccountType: AccountType;
  ActivateUserInput: ActivateUserInput;
  ActivateUserPayload: ResolverTypeWrapper<ActivateUserPayload>;
  AddCollectionVideoInput: AddCollectionVideoInput;
  AddCollectionVideoPayload: ResolverTypeWrapper<AddCollectionVideoPayload>;
  AddWatchLaterVideoInput: AddWatchLaterVideoInput;
  AddWatchLaterVideoPayload: ResolverTypeWrapper<AddWatchLaterVideoPayload>;
  Algorithm: ResolverTypeWrapper<Algorithm>;
  AlgorithmName: AlgorithmName;
  AlgorithmNameOperator: AlgorithmNameOperator;
  Analytics: ResolverTypeWrapper<Omit<Analytics, 'timeSeries' | 'topValues'> & { timeSeries: ResolversTypes['AnalyticsPayload'], topValues: ResolversTypes['AnalyticsPayload'] }>;
  AnalyticsFilter: AnalyticsFilter;
  AnalyticsFilterOperator: AnalyticsFilterOperator;
  AnalyticsFlatPayload: ResolverTypeWrapper<AnalyticsFlatPayload>;
  AnalyticsGroupedPayload: ResolverTypeWrapper<AnalyticsGroupedPayload>;
  AnalyticsGroupedPayloadItem: ResolverTypeWrapper<AnalyticsGroupedPayloadItem>;
  AnalyticsMetric: AnalyticsMetric;
  AnalyticsMetricFunction: AnalyticsMetricFunction;
  AnalyticsOrderBy: AnalyticsOrderBy;
  AnalyticsPayload: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['AnalyticsPayload']>;
  AnalyticsReport: ResolverTypeWrapper<AnalyticsReport>;
  AnalyticsReportConnection: ResolverTypeWrapper<AnalyticsReportConnection>;
  AnalyticsReportCreateInput: AnalyticsReportCreateInput;
  AnalyticsReportCreatePayload: ResolverTypeWrapper<AnalyticsReportCreatePayload>;
  AnalyticsReportEdge: ResolverTypeWrapper<AnalyticsReportEdge>;
  AnalyticsReportFilters: AnalyticsReportFilters;
  AnalyticsReportOrderBy: AnalyticsReportOrderBy;
  AnalyticsReportStatus: AnalyticsReportStatus;
  AnalyticsTimePeriod: AnalyticsTimePeriod;
  Any: ResolverTypeWrapper<Scalars['Any']['output']>;
  AppealApplication: ResolverTypeWrapper<AppealApplication>;
  AppealReason: AppealReason;
  AskPartnerReportFileInput: AskPartnerReportFileInput;
  AskPartnerReportFilePayload: ResolverTypeWrapper<AskPartnerReportFilePayload>;
  Attribute: ResolverTypeWrapper<Attribute>;
  AttributeConnection: ResolverTypeWrapper<AttributeConnection>;
  AttributeEdge: ResolverTypeWrapper<AttributeEdge>;
  AutoSuggestionFilter: AutoSuggestionFilter;
  AvatarHeight: AvatarHeight;
  BannerHeight: BannerHeight;
  BannerWidth: BannerWidth;
  Behavior: ResolverTypeWrapper<Behavior>;
  BehaviorRuleTag: ResolverTypeWrapper<BehaviorRuleTag>;
  BehaviorRuleTagConnection: ResolverTypeWrapper<BehaviorRuleTagConnection>;
  BehaviorRuleTagEdge: ResolverTypeWrapper<BehaviorRuleTagEdge>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BookmarkFilter: BookmarkFilter;
  BookmarkMetric: ResolverTypeWrapper<BookmarkMetric>;
  BookmarkMetricConnection: ResolverTypeWrapper<BookmarkMetricConnection>;
  BookmarkMetricEdge: ResolverTypeWrapper<BookmarkMetricEdge>;
  BookmarkOperator: BookmarkOperator;
  BookmarkTypename: BookmarkTypename;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  BooleanOperator: BooleanOperator;
  Category: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Category']>;
  CategoryConnection: ResolverTypeWrapper<CategoryConnection>;
  CategoryEdge: ResolverTypeWrapper<Omit<CategoryEdge, 'node'> & { node?: Maybe<ResolversTypes['Category']> }>;
  CategoryFilter: CategoryFilter;
  CategoryOperator: CategoryOperator;
  CategoryTypename: CategoryTypename;
  Channel: ResolverTypeWrapper<Channel>;
  ChannelConnection: ResolverTypeWrapper<ChannelConnection>;
  ChannelCreateInput: ChannelCreateInput;
  ChannelCreatePayload: ResolverTypeWrapper<ChannelCreatePayload>;
  ChannelEdge: ResolverTypeWrapper<ChannelEdge>;
  ChannelEngagementMetrics: ResolverTypeWrapper<ChannelEngagementMetrics>;
  ChannelExternalLinks: ResolverTypeWrapper<ChannelExternalLinks>;
  ChannelExternalLinksInput: ChannelExternalLinksInput;
  ChannelMediasSort: ChannelMediasSort;
  ChannelMetric: ResolverTypeWrapper<ChannelMetric>;
  ChannelMetricConnection: ResolverTypeWrapper<ChannelMetricConnection>;
  ChannelMetricEdge: ResolverTypeWrapper<ChannelMetricEdge>;
  ChannelMetrics: ResolverTypeWrapper<ChannelMetrics>;
  ChannelPermission: ResolverTypeWrapper<ChannelPermission>;
  ChannelPermissionLevel: ChannelPermissionLevel;
  ChannelShareUrls: ResolverTypeWrapper<ChannelShareUrls>;
  ChannelStats: ResolverTypeWrapper<ChannelStats>;
  ChannelStatsFollowers: ResolverTypeWrapper<ChannelStatsFollowers>;
  ChannelStatsReactions: ResolverTypeWrapper<ChannelStatsReactions>;
  ChannelStatsVideos: ResolverTypeWrapper<ChannelStatsVideos>;
  ChannelStatsViews: ResolverTypeWrapper<ChannelStatsViews>;
  ChannelsSort: ChannelsSort;
  ClearCollectionMediasInput: ClearCollectionMediasInput;
  ClearCollectionMediasPayload: ResolverTypeWrapper<ClearCollectionMediasPayload>;
  ClearLikedVideosInput: ClearLikedVideosInput;
  ClearLikedVideosPayload: ResolverTypeWrapper<ClearLikedVideosPayload>;
  ClearWatchLaterVideosInput: ClearWatchLaterVideosInput;
  ClearWatchLaterVideosPayload: ResolverTypeWrapper<ClearWatchLaterVideosPayload>;
  ClearWatchedVideosInput: ClearWatchedVideosInput;
  ClearWatchedVideosPayload: ResolverTypeWrapper<ClearWatchedVideosPayload>;
  Collection: ResolverTypeWrapper<Collection>;
  CollectionConnection: ResolverTypeWrapper<CollectionConnection>;
  CollectionEdge: ResolverTypeWrapper<CollectionEdge>;
  CollectionEngagementMetrics: ResolverTypeWrapper<CollectionEngagementMetrics>;
  CollectionFilter: CollectionFilter;
  CollectionMetric: ResolverTypeWrapper<CollectionMetric>;
  CollectionMetricConnection: ResolverTypeWrapper<CollectionMetricConnection>;
  CollectionMetricEdge: ResolverTypeWrapper<CollectionMetricEdge>;
  CollectionMetrics: ResolverTypeWrapper<CollectionMetrics>;
  CollectionStats: ResolverTypeWrapper<CollectionStats>;
  CollectionStatsVideos: ResolverTypeWrapper<CollectionStatsVideos>;
  Comment: ResolverTypeWrapper<Omit<Comment, 'post'> & { post: ResolversTypes['Post'] }>;
  CommentConnection: ResolverTypeWrapper<CommentConnection>;
  CommentEdge: ResolverTypeWrapper<CommentEdge>;
  CommentEngagementMetrics: ResolverTypeWrapper<CommentEngagementMetrics>;
  CommentMetric: ResolverTypeWrapper<CommentMetric>;
  CommentMetricConnection: ResolverTypeWrapper<CommentMetricConnection>;
  CommentMetricEdge: ResolverTypeWrapper<CommentMetricEdge>;
  CommentMetrics: ResolverTypeWrapper<CommentMetrics>;
  CommentSort: CommentSort;
  CommentViewerEngagement: ResolverTypeWrapper<CommentViewerEngagement>;
  Component: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['Component']>;
  ComponentConnection: ResolverTypeWrapper<ComponentConnection>;
  ComponentEdge: ResolverTypeWrapper<Omit<ComponentEdge, 'node'> & { node?: Maybe<ResolversTypes['Component']> }>;
  Content: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Content']>;
  ContentCategory: ResolverTypeWrapper<ContentCategory>;
  Conversation: ResolverTypeWrapper<Omit<Conversation, 'story'> & { story?: Maybe<ResolversTypes['Story']> }>;
  ConversationConnection: ResolverTypeWrapper<ConversationConnection>;
  ConversationEdge: ResolverTypeWrapper<ConversationEdge>;
  ConversationFilter: ConversationFilter;
  Country: ResolverTypeWrapper<Country>;
  CountryConnection: ResolverTypeWrapper<CountryConnection>;
  CountryEdge: ResolverTypeWrapper<CountryEdge>;
  CreateBehaviorRuleInput: CreateBehaviorRuleInput;
  CreateBehaviorRulePayload: ResolverTypeWrapper<CreateBehaviorRulePayload>;
  CreateCollectionInput: CreateCollectionInput;
  CreateCollectionPayload: ResolverTypeWrapper<CreateCollectionPayload>;
  CreateReactionInput: CreateReactionInput;
  CreateUserInput: CreateUserInput;
  CreateUserPayload: ResolverTypeWrapper<CreateUserPayload>;
  CreateVideoInput: CreateVideoInput;
  CreateVideoPayload: ResolverTypeWrapper<CreateVideoPayload>;
  CreatorViolation: CreatorViolation;
  CuratedCategory: ResolverTypeWrapper<CuratedCategory>;
  CuratedCategoryConnection: ResolverTypeWrapper<CuratedCategoryConnection>;
  CuratedCategoryEdge: ResolverTypeWrapper<CuratedCategoryEdge>;
  DailymotionAd: ResolverTypeWrapper<DailymotionAd>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DeleteBehaviorRuleInput: DeleteBehaviorRuleInput;
  DeleteBehaviorRulePayload: ResolverTypeWrapper<DeleteBehaviorRulePayload>;
  DeleteReactionInput: DeleteReactionInput;
  DeleteReactionPayload: ResolverTypeWrapper<DeleteReactionPayload>;
  DeleteUserInput: DeleteUserInput;
  DeleteUserPayload: ResolverTypeWrapper<DeleteUserPayload>;
  DeleteVideoInput: DeleteVideoInput;
  DeleteVideoPayload: ResolverTypeWrapper<DeleteVideoPayload>;
  EmailChangeRequest: ResolverTypeWrapper<EmailChangeRequest>;
  EmbedType: EmbedType;
  ExperimentMatch: ResolverTypeWrapper<ExperimentMatch>;
  ExperimentMatchConnection: ResolverTypeWrapper<ExperimentMatchConnection>;
  ExperimentMatchEdge: ResolverTypeWrapper<ExperimentMatchEdge>;
  FallbackCountry: ResolverTypeWrapper<FallbackCountry>;
  FallbackCountryConnection: ResolverTypeWrapper<FallbackCountryConnection>;
  FallbackCountryEdge: ResolverTypeWrapper<FallbackCountryEdge>;
  Favorite: ResolverTypeWrapper<Omit<Favorite, 'post'> & { post: ResolversTypes['Post'] }>;
  FeatureMatch: ResolverTypeWrapper<FeatureMatch>;
  FeatureMatchConnection: ResolverTypeWrapper<FeatureMatchConnection>;
  FeatureMatchEdge: ResolverTypeWrapper<FeatureMatchEdge>;
  FeaturedContent: ResolverTypeWrapper<FeaturedContent>;
  FeaturedContentCategory: FeaturedContentCategory;
  FeedFilter: FeedFilter;
  FeedName: FeedName;
  FeedPost: ResolverTypeWrapper<Omit<FeedPost, 'post'> & { post?: Maybe<ResolversTypes['Post']> }>;
  FeedPostConnection: ResolverTypeWrapper<FeedPostConnection>;
  FeedPostEdge: ResolverTypeWrapper<FeedPostEdge>;
  FeedSort: FeedSort;
  FileUpload: ResolverTypeWrapper<FileUpload>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  FollowChannelInput: FollowChannelInput;
  FollowChannelPayload: ResolverTypeWrapper<FollowChannelPayload>;
  FollowChannelsInput: FollowChannelsInput;
  FollowChannelsPayload: ResolverTypeWrapper<FollowChannelsPayload>;
  FollowTopicInput: FollowTopicInput;
  FollowTopicPayload: ResolverTypeWrapper<FollowTopicPayload>;
  FollowTopicsInput: FollowTopicsInput;
  FollowTopicsPayload: ResolverTypeWrapper<FollowTopicsPayload>;
  FollowUserInput: FollowUserInput;
  FollowUserPayload: ResolverTypeWrapper<FollowUserPayload>;
  FollowedChannel: ResolverTypeWrapper<FollowedChannel>;
  FollowedChannelConnection: ResolverTypeWrapper<FollowedChannelConnection>;
  FollowedChannelEdge: ResolverTypeWrapper<FollowedChannelEdge>;
  FollowedChannelsSort: FollowedChannelsSort;
  FollowedTopic: ResolverTypeWrapper<FollowedTopic>;
  FollowedTopicConnection: ResolverTypeWrapper<FollowedTopicConnection>;
  FollowedTopicEdge: ResolverTypeWrapper<FollowedTopicEdge>;
  FollowedTopicsSort: FollowedTopicsSort;
  Follower: ResolverTypeWrapper<Follower>;
  FollowerConnection: ResolverTypeWrapper<FollowerConnection>;
  FollowerEdge: ResolverTypeWrapper<FollowerEdge>;
  FollowerEngagement: ResolverTypeWrapper<FollowerEngagement>;
  FollowerEngagementNotifications: ResolverTypeWrapper<FollowerEngagementNotifications>;
  Following: ResolverTypeWrapper<Following>;
  FollowingChannelStartsLive: ResolverTypeWrapper<FollowingChannelStartsLive>;
  FollowingChannelUploadsVideo: ResolverTypeWrapper<FollowingChannelUploadsVideo>;
  FollowingConnection: ResolverTypeWrapper<FollowingConnection>;
  FollowingEdge: ResolverTypeWrapper<FollowingEdge>;
  FollowingStartsLive: ResolverTypeWrapper<FollowingStartsLive>;
  Gender: Gender;
  GenerateFileUploadUrlInput: GenerateFileUploadUrlInput;
  GenerateFileUploadUrlPayload: ResolverTypeWrapper<GenerateFileUploadUrlPayload>;
  GeoblockedCountries: ResolverTypeWrapper<GeoblockedCountries>;
  Geoblocking: ResolverTypeWrapper<Geoblocking>;
  GeoblockingConnection: ResolverTypeWrapper<GeoblockingConnection>;
  GeoblockingEdge: ResolverTypeWrapper<GeoblockingEdge>;
  Hashtag: ResolverTypeWrapper<Hashtag>;
  HashtagConnection: ResolverTypeWrapper<HashtagConnection>;
  HashtagEdge: ResolverTypeWrapper<HashtagEdge>;
  HashtagEngagementMetrics: ResolverTypeWrapper<HashtagEngagementMetrics>;
  HashtagMetrics: ResolverTypeWrapper<HashtagMetrics>;
  History: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['History']>;
  HistoryConnection: ResolverTypeWrapper<HistoryConnection>;
  HistoryEdge: ResolverTypeWrapper<Omit<HistoryEdge, 'node'> & { node?: Maybe<ResolversTypes['History']> }>;
  HistoryFilter: HistoryFilter;
  HtmlPage: HtmlPage;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  IDOperator: IdOperator;
  Image: ResolverTypeWrapper<Image>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Interaction: Interaction;
  InteractionOperator: InteractionOperator;
  Interest: ResolverTypeWrapper<Interest>;
  InterestConnection: ResolverTypeWrapper<InterestConnection>;
  InterestEdge: ResolverTypeWrapper<InterestEdge>;
  Language: ResolverTypeWrapper<Language>;
  LanguageSource: LanguageSource;
  LikeConnection: ResolverTypeWrapper<LikeConnection>;
  LikeEdge: ResolverTypeWrapper<LikeEdge>;
  LikeMetric: ResolverTypeWrapper<LikeMetric>;
  LikeMetricConnection: ResolverTypeWrapper<LikeMetricConnection>;
  LikeMetricEdge: ResolverTypeWrapper<LikeMetricEdge>;
  LikeMetricFilter: LikeMetricFilter;
  LikeNode: ResolverTypeWrapper<Omit<LikeNode, 'post'> & { post?: Maybe<ResolversTypes['Post']> }>;
  LikePayload: ResolverTypeWrapper<LikePayload>;
  LikeRating: LikeRating;
  LikeRatingOperator: LikeRatingOperator;
  LikeVideoInput: LikeVideoInput;
  LikeVideoPayload: ResolverTypeWrapper<LikeVideoPayload>;
  LikedMediaSort: LikedMediaSort;
  Live: ResolverTypeWrapper<Live>;
  LiveConnection: ResolverTypeWrapper<LiveConnection>;
  LiveEdge: ResolverTypeWrapper<LiveEdge>;
  LiveEngagementMetrics: ResolverTypeWrapper<LiveEngagementMetrics>;
  LiveFilter: LiveFilter;
  LiveMetric: ResolverTypeWrapper<LiveMetric>;
  LiveMetricConnection: ResolverTypeWrapper<LiveMetricConnection>;
  LiveMetricEdge: ResolverTypeWrapper<LiveMetricEdge>;
  LiveMetrics: ResolverTypeWrapper<LiveMetrics>;
  LiveShareUrls: ResolverTypeWrapper<LiveShareUrls>;
  LiveStats: ResolverTypeWrapper<LiveStats>;
  LiveStatsViews: ResolverTypeWrapper<LiveStatsViews>;
  LiveStreams: ResolverTypeWrapper<LiveStreams>;
  LiveStreamsConnection: ResolverTypeWrapper<LiveStreamsConnection>;
  LiveStreamsEdge: ResolverTypeWrapper<LiveStreamsEdge>;
  LiveViewerEngagement: ResolverTypeWrapper<LiveViewerEngagement>;
  Localization: ResolverTypeWrapper<Localization>;
  LocalizationMe: ResolverTypeWrapper<LocalizationMe>;
  Media: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['Media']>;
  MediaCategory: MediaCategory;
  MediaConnection: ResolverTypeWrapper<MediaConnection>;
  MediaEdge: ResolverTypeWrapper<Omit<MediaEdge, 'node'> & { node?: Maybe<ResolversTypes['Media']> }>;
  MediaModeration: ResolverTypeWrapper<MediaModeration>;
  MediaPublishingInfo: ResolverTypeWrapper<MediaPublishingInfo>;
  MediaQuality: MediaQuality;
  MediaStreams: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['MediaStreams']>;
  MediaStreamsConnection: ResolverTypeWrapper<MediaStreamsConnection>;
  MediaStreamsEdge: ResolverTypeWrapper<Omit<MediaStreamsEdge, 'node'> & { node?: Maybe<ResolversTypes['MediaStreams']> }>;
  MediaTag: ResolverTypeWrapper<MediaTag>;
  MediaTagConnection: ResolverTypeWrapper<MediaTagConnection>;
  MediaTagEdge: ResolverTypeWrapper<MediaTagEdge>;
  MediaType: MediaType;
  MediaUploadInfo: ResolverTypeWrapper<MediaUploadInfo>;
  Metadata: ResolverTypeWrapper<Metadata>;
  Metric: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Metric']>;
  ModerationAction: ResolverTypeWrapper<ModerationAction>;
  ModerationActionAppealInput: ModerationActionAppealInput;
  ModerationActionAppealPayload: ResolverTypeWrapper<ModerationActionAppealPayload>;
  MonetizationInsights: ResolverTypeWrapper<MonetizationInsights>;
  Mutation: ResolverTypeWrapper<{}>;
  Neon: ResolverTypeWrapper<Neon>;
  NetworkChannelsSort: NetworkChannelsSort;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  NotificationFollowedChannelUpdateInput: NotificationFollowedChannelUpdateInput;
  NotificationFollowedChannelUpdatePayload: ResolverTypeWrapper<NotificationFollowedChannelUpdatePayload>;
  NotificationSettings: ResolverTypeWrapper<NotificationSettings>;
  OrderDirection: OrderDirection;
  Organization: ResolverTypeWrapper<Organization>;
  OrganizationAnalysis: ResolverTypeWrapper<OrganizationAnalysis>;
  OrganizationCategory: OrganizationCategory;
  OrganizationConnection: ResolverTypeWrapper<OrganizationConnection>;
  OrganizationEdge: ResolverTypeWrapper<OrganizationEdge>;
  OrganizationPermission: ResolverTypeWrapper<OrganizationPermission>;
  OrganizationRole: OrganizationRole;
  OrganizationStats: ResolverTypeWrapper<OrganizationStats>;
  OrganizationStatsChannels: ResolverTypeWrapper<OrganizationStatsChannels>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Partner: ResolverTypeWrapper<Partner>;
  PartnerReportDimension: PartnerReportDimension;
  PartnerReportFile: ResolverTypeWrapper<PartnerReportFile>;
  PartnerReportFilterMediaType: PartnerReportFilterMediaType;
  PartnerReportFilterMonetizationType: PartnerReportFilterMonetizationType;
  PartnerReportFilters: PartnerReportFilters;
  PartnerReportMetric: PartnerReportMetric;
  PartnerReportProduct: PartnerReportProduct;
  PartnerReportStatus: PartnerReportStatus;
  PartnerSpace: ResolverTypeWrapper<PartnerSpace>;
  Player: ResolverTypeWrapper<Player>;
  PlayerAlgorithmName: PlayerAlgorithmName;
  PlayerQueue: ResolverTypeWrapper<PlayerQueue>;
  PlayerQueueAlgorithmName: PlayerQueueAlgorithmName;
  PlayerQueueContextArgument: PlayerQueueContextArgument;
  Poll: ResolverTypeWrapper<Omit<Poll, 'component' | 'post'> & { component?: Maybe<ResolversTypes['Component']>, post?: Maybe<ResolversTypes['Post']> }>;
  PollAnswerAction: PollAnswerAction;
  PollAnswerInput: PollAnswerInput;
  PollAnswerPayload: ResolverTypeWrapper<PollAnswerPayload>;
  PollConnection: ResolverTypeWrapper<PollConnection>;
  PollEdge: ResolverTypeWrapper<PollEdge>;
  PollFilter: PollFilter;
  PollOption: ResolverTypeWrapper<PollOption>;
  PollShareUrls: ResolverTypeWrapper<PollShareUrls>;
  Post: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['Post']>;
  PostConnection: ResolverTypeWrapper<PostConnection>;
  PostEdge: ResolverTypeWrapper<Omit<PostEdge, 'node'> & { node?: Maybe<ResolversTypes['Post']> }>;
  PostEngagementMetrics: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['PostEngagementMetrics']>;
  PostMetric: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['PostMetric']>;
  PostMetricConnection: ResolverTypeWrapper<PostMetricConnection>;
  PostMetricEdge: ResolverTypeWrapper<Omit<PostMetricEdge, 'node'> & { node?: Maybe<ResolversTypes['PostMetric']> }>;
  PostMetrics: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['PostMetrics']>;
  PostOperator: PostOperator;
  PostStatus: PostStatus;
  PostStatusOperator: PostStatusOperator;
  PostTypename: PostTypename;
  ProductUpdates: ResolverTypeWrapper<ProductUpdates>;
  Promotion: Promotion;
  Query: ResolverTypeWrapper<{}>;
  Reaction: ResolverTypeWrapper<Omit<Reaction, 'opener'> & { opener?: Maybe<ResolversTypes['Story']> }>;
  ReactionConnection: ResolverTypeWrapper<ReactionConnection>;
  ReactionEdge: ResolverTypeWrapper<ReactionEdge>;
  ReactionEngagementMetrics: ResolverTypeWrapper<ReactionEngagementMetrics>;
  ReactionMetric: ResolverTypeWrapper<ReactionMetric>;
  ReactionMetricConnection: ResolverTypeWrapper<ReactionMetricConnection>;
  ReactionMetricEdge: ResolverTypeWrapper<ReactionMetricEdge>;
  ReactionMetrics: ResolverTypeWrapper<ReactionMetrics>;
  ReactionPayload: ResolverTypeWrapper<ReactionPayload>;
  ReactionShareUrls: ResolverTypeWrapper<ReactionShareUrls>;
  ReactionVideo: ResolverTypeWrapper<ReactionVideo>;
  ReactionVideoConnection: ResolverTypeWrapper<ReactionVideoConnection>;
  ReactionVideoCreateInput: ReactionVideoCreateInput;
  ReactionVideoDeleteInput: ReactionVideoDeleteInput;
  ReactionVideoDeletePayload: ResolverTypeWrapper<ReactionVideoDeletePayload>;
  ReactionVideoEdge: ResolverTypeWrapper<ReactionVideoEdge>;
  ReactionVideoPayload: ResolverTypeWrapper<ReactionVideoPayload>;
  ReactionVideoStats: ResolverTypeWrapper<ReactionVideoStats>;
  ReactionVideoStatsBookmarks: ResolverTypeWrapper<ReactionVideoStatsBookmarks>;
  ReactionVideoStatsFavorites: ResolverTypeWrapper<ReactionVideoStatsFavorites>;
  ReactionVideoStatsLikes: ResolverTypeWrapper<ReactionVideoStatsLikes>;
  ReactionVideoStatsReactionVideos: ResolverTypeWrapper<ReactionVideoStatsReactionVideos>;
  ReactionVideoStatsSaves: ResolverTypeWrapper<ReactionVideoStatsSaves>;
  ReactionVideoUpdateInput: ReactionVideoUpdateInput;
  ReactionViewerEngagement: ResolverTypeWrapper<ReactionViewerEngagement>;
  RecommendedRecording: ResolverTypeWrapper<Omit<RecommendedRecording, 'recording'> & { recording?: Maybe<ResolversTypes['Recording']> }>;
  RecommendedRecordingConnection: ResolverTypeWrapper<RecommendedRecordingConnection>;
  RecommendedRecordingEdge: ResolverTypeWrapper<RecommendedRecordingEdge>;
  Recording: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Recording']>;
  RecordingPrivacy: RecordingPrivacy;
  RecordingViolation: RecordingViolation;
  RecoverPasswordInput: RecoverPasswordInput;
  RecoverPasswordPayload: ResolverTypeWrapper<RecoverPasswordPayload>;
  RelatedVideoContext: RelatedVideoContext;
  RemindUnwatchedVideos: ResolverTypeWrapper<RemindUnwatchedVideos>;
  RemoveCollectionInput: RemoveCollectionInput;
  RemoveCollectionPayload: ResolverTypeWrapper<RemoveCollectionPayload>;
  RemoveCollectionVideoInput: RemoveCollectionVideoInput;
  RemoveCollectionVideoPayload: ResolverTypeWrapper<RemoveCollectionVideoPayload>;
  RemoveWatchLaterVideoInput: RemoveWatchLaterVideoInput;
  RemoveWatchLaterVideoPayload: ResolverTypeWrapper<RemoveWatchLaterVideoPayload>;
  RemoveWatchedVideoInput: RemoveWatchedVideoInput;
  RemoveWatchedVideoPayload: ResolverTypeWrapper<RemoveWatchedVideoPayload>;
  ReorderCollectionMediaInput: ReorderCollectionMediaInput;
  ReorderCollectionMediaPayload: ResolverTypeWrapper<ReorderCollectionMediaPayload>;
  ReportCreatorInput: ReportCreatorInput;
  ReportCreatorPayload: ResolverTypeWrapper<ReportCreatorPayload>;
  ReportFileDownloadLink: ResolverTypeWrapper<ReportFileDownloadLink>;
  ReportFileDownloadLinkConnection: ResolverTypeWrapper<ReportFileDownloadLinkConnection>;
  ReportFileDownloadLinkEdge: ResolverTypeWrapper<ReportFileDownloadLinkEdge>;
  ReportVideoInput: ReportVideoInput;
  ReportVideoPayload: ResolverTypeWrapper<ReportVideoPayload>;
  ReporterEmailVerifyInput: ReporterEmailVerifyInput;
  ReporterEmailVerifyPayload: ResolverTypeWrapper<ReporterEmailVerifyPayload>;
  RequestActivationCodeInput: RequestActivationCodeInput;
  RequestActivationCodePayload: ResolverTypeWrapper<RequestActivationCodePayload>;
  ResetPasswordInput: ResetPasswordInput;
  ResetPasswordPayload: ResolverTypeWrapper<ResetPasswordPayload>;
  Restriction: ResolverTypeWrapper<Restriction>;
  RestrictionCode: RestrictionCode;
  Role: Role;
  RolePermission: RolePermission;
  Rule: ResolverTypeWrapper<Rule>;
  RuleConnection: ResolverTypeWrapper<RuleConnection>;
  RuleEdge: ResolverTypeWrapper<RuleEdge>;
  Search: ResolverTypeWrapper<Search>;
  SearchVideoSort: SearchVideoSort;
  Section: ResolverTypeWrapper<Omit<Section, 'relatedComponent'> & { relatedComponent?: Maybe<ResolversTypes['Component']> }>;
  SectionConnection: ResolverTypeWrapper<SectionConnection>;
  SectionContextArgument: SectionContextArgument;
  SectionEdge: ResolverTypeWrapper<SectionEdge>;
  SendTransactionalEmailInput: SendTransactionalEmailInput;
  SendTransactionalEmailPayload: ResolverTypeWrapper<SendTransactionalEmailPayload>;
  SendValidationEmailInput: SendValidationEmailInput;
  SendValidationEmailPayload: ResolverTypeWrapper<SendValidationEmailPayload>;
  ShareUrls: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['ShareUrls']>;
  SharingURL: ResolverTypeWrapper<SharingUrl>;
  SharingURLConnection: ResolverTypeWrapper<SharingUrlConnection>;
  SharingURLEdge: ResolverTypeWrapper<SharingUrlEdge>;
  Status: Status;
  Story: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['Story']>;
  StoryOperator: StoryOperator;
  StoryTypename: StoryTypename;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  StringOperator: StringOperator;
  Subdivision: ResolverTypeWrapper<Subdivision>;
  Subtitle: ResolverTypeWrapper<Subtitle>;
  SubtitleConnection: ResolverTypeWrapper<SubtitleConnection>;
  SubtitleEdge: ResolverTypeWrapper<SubtitleEdge>;
  Suggestion: ResolverTypeWrapper<Suggestion>;
  SuggestionConnection: ResolverTypeWrapper<SuggestionConnection>;
  SuggestionEdge: ResolverTypeWrapper<SuggestionEdge>;
  SupportedCountry: ResolverTypeWrapper<SupportedCountry>;
  SupportedCountryConnection: ResolverTypeWrapper<SupportedCountryConnection>;
  SupportedCountryEdge: ResolverTypeWrapper<SupportedCountryEdge>;
  SupportedLanguage: ResolverTypeWrapper<SupportedLanguage>;
  SupportedLanguageConnection: ResolverTypeWrapper<SupportedLanguageConnection>;
  SupportedLanguageEdge: ResolverTypeWrapper<SupportedLanguageEdge>;
  ThumbnailHeight: ThumbnailHeight;
  Thumbnails: ResolverTypeWrapper<Thumbnails>;
  Time: ResolverTypeWrapper<Scalars['Time']['output']>;
  Tips: ResolverTypeWrapper<Tips>;
  Topic: ResolverTypeWrapper<Topic>;
  TopicConnection: ResolverTypeWrapper<TopicConnection>;
  TopicEdge: ResolverTypeWrapper<TopicEdge>;
  TopicLabel: ResolverTypeWrapper<TopicLabel>;
  TopicLabelConnection: ResolverTypeWrapper<TopicLabelConnection>;
  TopicLabelEdge: ResolverTypeWrapper<TopicLabelEdge>;
  TopicShareUrls: ResolverTypeWrapper<TopicShareUrls>;
  TopicStats: ResolverTypeWrapper<TopicStats>;
  TopicStatsFollowers: ResolverTypeWrapper<TopicStatsFollowers>;
  TopicStatsVideos: ResolverTypeWrapper<TopicStatsVideos>;
  TopicWhitelistStatus: ResolverTypeWrapper<TopicWhitelistStatus>;
  TopicWhitelistStatusMode: TopicWhitelistStatusMode;
  UnfollowChannelInput: UnfollowChannelInput;
  UnfollowChannelPayload: ResolverTypeWrapper<UnfollowChannelPayload>;
  UnfollowTopicInput: UnfollowTopicInput;
  UnfollowTopicPayload: ResolverTypeWrapper<UnfollowTopicPayload>;
  UnfollowUserInput: UnfollowUserInput;
  UnfollowUserPayload: ResolverTypeWrapper<UnfollowUserPayload>;
  UnlikeVideoInput: UnlikeVideoInput;
  UnlikeVideoPayload: ResolverTypeWrapper<UnlikeVideoPayload>;
  UpdateBehaviorRuleInput: UpdateBehaviorRuleInput;
  UpdateBehaviorRulePayload: ResolverTypeWrapper<UpdateBehaviorRulePayload>;
  UpdateChannelInput: UpdateChannelInput;
  UpdateChannelPayload: ResolverTypeWrapper<UpdateChannelPayload>;
  UpdateCollectionInput: UpdateCollectionInput;
  UpdateCollectionPayload: ResolverTypeWrapper<UpdateCollectionPayload>;
  UpdateNotificationSettingsEmailInput: UpdateNotificationSettingsEmailInput;
  UpdateNotificationSettingsEmailPayload: ResolverTypeWrapper<UpdateNotificationSettingsEmailPayload>;
  UpdateNotificationSettingsPushInput: UpdateNotificationSettingsPushInput;
  UpdateNotificationSettingsPushPayload: ResolverTypeWrapper<UpdateNotificationSettingsPushPayload>;
  UpdateReactionInput: UpdateReactionInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserPayload: ResolverTypeWrapper<UpdateUserPayload>;
  UpdateVideoInput: UpdateVideoInput;
  UpdateVideoPayload: ResolverTypeWrapper<UpdateVideoPayload>;
  UploadedVideoSort: UploadedVideoSort;
  User: ResolverTypeWrapper<User>;
  UserActivationCodeAccountType: UserActivationCodeAccountType;
  UserCollectionsSort: UserCollectionsSort;
  UserEmailChangeConfirmInput: UserEmailChangeConfirmInput;
  UserEmailChangeConfirmPayload: ResolverTypeWrapper<UserEmailChangeConfirmPayload>;
  UserEmailChangeRequestInput: UserEmailChangeRequestInput;
  UserEmailChangeRequestPayload: ResolverTypeWrapper<UserEmailChangeRequestPayload>;
  UserEmailConfirmationCodeResetInput: UserEmailConfirmationCodeResetInput;
  UserEmailConfirmationCodeResetPayload: ResolverTypeWrapper<UserEmailConfirmationCodeResetPayload>;
  UserEmailValidationTokenInput: UserEmailValidationTokenInput;
  UserEmailValidationTokenPayload: ResolverTypeWrapper<UserEmailValidationTokenPayload>;
  UserFollowingChannelsSort: UserFollowingChannelsSort;
  UserFollowingTopicsSort: UserFollowingTopicsSort;
  UserInterest: ResolverTypeWrapper<UserInterest>;
  UserInterestAddInput: UserInterestAddInput;
  UserInterestAddPayload: ResolverTypeWrapper<UserInterestAddPayload>;
  UserInterestConnection: ResolverTypeWrapper<UserInterestConnection>;
  UserInterestEdge: ResolverTypeWrapper<UserInterestEdge>;
  UserInterestRemoveInput: UserInterestRemoveInput;
  UserInterestRemovePayload: ResolverTypeWrapper<UserInterestRemovePayload>;
  UserInterestsUpdateInput: UserInterestsUpdateInput;
  UserInterestsUpdatePayload: ResolverTypeWrapper<UserInterestsUpdatePayload>;
  UserOpenWebCodeBRequestInput: UserOpenWebCodeBRequestInput;
  UserOpenWebCodeBRequestPayload: ResolverTypeWrapper<UserOpenWebCodeBRequestPayload>;
  UserPollAnswer: ResolverTypeWrapper<UserPollAnswer>;
  UserStats: ResolverTypeWrapper<UserStats>;
  UserStatsCollections: ResolverTypeWrapper<UserStatsCollections>;
  UserStatsFollowers: ResolverTypeWrapper<UserStatsFollowers>;
  UserStatsFollowingChannels: ResolverTypeWrapper<UserStatsFollowingChannels>;
  UserStatsFollowingTopics: ResolverTypeWrapper<UserStatsFollowingTopics>;
  UserStatsLikedVideos: ResolverTypeWrapper<UserStatsLikedVideos>;
  UserStatsReactionVideos: ResolverTypeWrapper<UserStatsReactionVideos>;
  UserStatsUploadedVideos: ResolverTypeWrapper<UserStatsUploadedVideos>;
  UserStatsVideos: ResolverTypeWrapper<UserStatsVideos>;
  UserStatsWatchLater: ResolverTypeWrapper<UserStatsWatchLater>;
  UserStatsWatchedVideos: ResolverTypeWrapper<UserStatsWatchedVideos>;
  UserSubscriptionsType: UserSubscriptionsType;
  Video: ResolverTypeWrapper<Video>;
  VideoConnection: ResolverTypeWrapper<VideoConnection>;
  VideoDigest: ResolverTypeWrapper<VideoDigest>;
  VideoEdge: ResolverTypeWrapper<VideoEdge>;
  VideoEngagementMetrics: ResolverTypeWrapper<VideoEngagementMetrics>;
  VideoFilter: VideoFilter;
  VideoMetric: ResolverTypeWrapper<VideoMetric>;
  VideoMetricConnection: ResolverTypeWrapper<VideoMetricConnection>;
  VideoMetricEdge: ResolverTypeWrapper<VideoMetricEdge>;
  VideoMetrics: ResolverTypeWrapper<VideoMetrics>;
  VideoOrLive: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['VideoOrLive']>;
  VideoRelatedAlgo: VideoRelatedAlgo;
  VideoShareUrls: ResolverTypeWrapper<VideoShareUrls>;
  VideoStats: ResolverTypeWrapper<VideoStats>;
  VideoStatsBookmarks: ResolverTypeWrapper<VideoStatsBookmarks>;
  VideoStatsFavorites: ResolverTypeWrapper<VideoStatsFavorites>;
  VideoStatsLikes: ResolverTypeWrapper<VideoStatsLikes>;
  VideoStatsReactionVideos: ResolverTypeWrapper<VideoStatsReactionVideos>;
  VideoStatsSaves: ResolverTypeWrapper<VideoStatsSaves>;
  VideoStatsViews: ResolverTypeWrapper<VideoStatsViews>;
  VideoStatus: VideoStatus;
  VideoStreams: ResolverTypeWrapper<VideoStreams>;
  VideoStreamsConnection: ResolverTypeWrapper<VideoStreamsConnection>;
  VideoStreamsEdge: ResolverTypeWrapper<VideoStreamsEdge>;
  VideoViewerEngagement: ResolverTypeWrapper<VideoViewerEngagement>;
  ViewerEngagement: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['ViewerEngagement']>;
  Views: ResolverTypeWrapper<Views>;
  Visibility: Visibility;
  VisibilityOperator: VisibilityOperator;
  Watch: ResolverTypeWrapper<Omit<Watch, 'post'> & { post: ResolversTypes['Post'] }>;
  WatchedVideoAddInput: WatchedVideoAddInput;
  WatchedVideoAddPayload: ResolverTypeWrapper<WatchedVideoAddPayload>;
  Web: ResolverTypeWrapper<Web>;
  WebMetadata: ResolverTypeWrapper<WebMetadata>;
  WebMetadataConnection: ResolverTypeWrapper<WebMetadataConnection>;
  WebMetadataConnectionConnection: ResolverTypeWrapper<WebMetadataConnectionConnection>;
  WebMetadataConnectionEdge: ResolverTypeWrapper<WebMetadataConnectionEdge>;
  addLikeInput: AddLikeInput;
  removeLikeInput: RemoveLikeInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ActivateUserInput: ActivateUserInput;
  ActivateUserPayload: ActivateUserPayload;
  AddCollectionVideoInput: AddCollectionVideoInput;
  AddCollectionVideoPayload: AddCollectionVideoPayload;
  AddWatchLaterVideoInput: AddWatchLaterVideoInput;
  AddWatchLaterVideoPayload: AddWatchLaterVideoPayload;
  Algorithm: Algorithm;
  AlgorithmNameOperator: AlgorithmNameOperator;
  Analytics: Omit<Analytics, 'timeSeries' | 'topValues'> & { timeSeries: ResolversParentTypes['AnalyticsPayload'], topValues: ResolversParentTypes['AnalyticsPayload'] };
  AnalyticsFilter: AnalyticsFilter;
  AnalyticsFlatPayload: AnalyticsFlatPayload;
  AnalyticsGroupedPayload: AnalyticsGroupedPayload;
  AnalyticsGroupedPayloadItem: AnalyticsGroupedPayloadItem;
  AnalyticsMetric: AnalyticsMetric;
  AnalyticsOrderBy: AnalyticsOrderBy;
  AnalyticsPayload: ResolversInterfaceTypes<ResolversParentTypes>['AnalyticsPayload'];
  AnalyticsReport: AnalyticsReport;
  AnalyticsReportConnection: AnalyticsReportConnection;
  AnalyticsReportCreateInput: AnalyticsReportCreateInput;
  AnalyticsReportCreatePayload: AnalyticsReportCreatePayload;
  AnalyticsReportEdge: AnalyticsReportEdge;
  AnalyticsReportFilters: AnalyticsReportFilters;
  AnalyticsReportOrderBy: AnalyticsReportOrderBy;
  AnalyticsTimePeriod: AnalyticsTimePeriod;
  Any: Scalars['Any']['output'];
  AppealApplication: AppealApplication;
  AskPartnerReportFileInput: AskPartnerReportFileInput;
  AskPartnerReportFilePayload: AskPartnerReportFilePayload;
  Attribute: Attribute;
  AttributeConnection: AttributeConnection;
  AttributeEdge: AttributeEdge;
  AutoSuggestionFilter: AutoSuggestionFilter;
  Behavior: Behavior;
  BehaviorRuleTag: BehaviorRuleTag;
  BehaviorRuleTagConnection: BehaviorRuleTagConnection;
  BehaviorRuleTagEdge: BehaviorRuleTagEdge;
  BigInt: Scalars['BigInt']['output'];
  BookmarkFilter: BookmarkFilter;
  BookmarkMetric: BookmarkMetric;
  BookmarkMetricConnection: BookmarkMetricConnection;
  BookmarkMetricEdge: BookmarkMetricEdge;
  BookmarkOperator: BookmarkOperator;
  Boolean: Scalars['Boolean']['output'];
  BooleanOperator: BooleanOperator;
  Category: ResolversInterfaceTypes<ResolversParentTypes>['Category'];
  CategoryConnection: CategoryConnection;
  CategoryEdge: Omit<CategoryEdge, 'node'> & { node?: Maybe<ResolversParentTypes['Category']> };
  CategoryFilter: CategoryFilter;
  CategoryOperator: CategoryOperator;
  Channel: Channel;
  ChannelConnection: ChannelConnection;
  ChannelCreateInput: ChannelCreateInput;
  ChannelCreatePayload: ChannelCreatePayload;
  ChannelEdge: ChannelEdge;
  ChannelEngagementMetrics: ChannelEngagementMetrics;
  ChannelExternalLinks: ChannelExternalLinks;
  ChannelExternalLinksInput: ChannelExternalLinksInput;
  ChannelMetric: ChannelMetric;
  ChannelMetricConnection: ChannelMetricConnection;
  ChannelMetricEdge: ChannelMetricEdge;
  ChannelMetrics: ChannelMetrics;
  ChannelPermission: ChannelPermission;
  ChannelShareUrls: ChannelShareUrls;
  ChannelStats: ChannelStats;
  ChannelStatsFollowers: ChannelStatsFollowers;
  ChannelStatsReactions: ChannelStatsReactions;
  ChannelStatsVideos: ChannelStatsVideos;
  ChannelStatsViews: ChannelStatsViews;
  ClearCollectionMediasInput: ClearCollectionMediasInput;
  ClearCollectionMediasPayload: ClearCollectionMediasPayload;
  ClearLikedVideosInput: ClearLikedVideosInput;
  ClearLikedVideosPayload: ClearLikedVideosPayload;
  ClearWatchLaterVideosInput: ClearWatchLaterVideosInput;
  ClearWatchLaterVideosPayload: ClearWatchLaterVideosPayload;
  ClearWatchedVideosInput: ClearWatchedVideosInput;
  ClearWatchedVideosPayload: ClearWatchedVideosPayload;
  Collection: Collection;
  CollectionConnection: CollectionConnection;
  CollectionEdge: CollectionEdge;
  CollectionEngagementMetrics: CollectionEngagementMetrics;
  CollectionFilter: CollectionFilter;
  CollectionMetric: CollectionMetric;
  CollectionMetricConnection: CollectionMetricConnection;
  CollectionMetricEdge: CollectionMetricEdge;
  CollectionMetrics: CollectionMetrics;
  CollectionStats: CollectionStats;
  CollectionStatsVideos: CollectionStatsVideos;
  Comment: Omit<Comment, 'post'> & { post: ResolversParentTypes['Post'] };
  CommentConnection: CommentConnection;
  CommentEdge: CommentEdge;
  CommentEngagementMetrics: CommentEngagementMetrics;
  CommentMetric: CommentMetric;
  CommentMetricConnection: CommentMetricConnection;
  CommentMetricEdge: CommentMetricEdge;
  CommentMetrics: CommentMetrics;
  CommentSort: CommentSort;
  CommentViewerEngagement: CommentViewerEngagement;
  Component: ResolversUnionTypes<ResolversParentTypes>['Component'];
  ComponentConnection: ComponentConnection;
  ComponentEdge: Omit<ComponentEdge, 'node'> & { node?: Maybe<ResolversParentTypes['Component']> };
  Content: ResolversInterfaceTypes<ResolversParentTypes>['Content'];
  ContentCategory: ContentCategory;
  Conversation: Omit<Conversation, 'story'> & { story?: Maybe<ResolversParentTypes['Story']> };
  ConversationConnection: ConversationConnection;
  ConversationEdge: ConversationEdge;
  ConversationFilter: ConversationFilter;
  Country: Country;
  CountryConnection: CountryConnection;
  CountryEdge: CountryEdge;
  CreateBehaviorRuleInput: CreateBehaviorRuleInput;
  CreateBehaviorRulePayload: CreateBehaviorRulePayload;
  CreateCollectionInput: CreateCollectionInput;
  CreateCollectionPayload: CreateCollectionPayload;
  CreateReactionInput: CreateReactionInput;
  CreateUserInput: CreateUserInput;
  CreateUserPayload: CreateUserPayload;
  CreateVideoInput: CreateVideoInput;
  CreateVideoPayload: CreateVideoPayload;
  CuratedCategory: CuratedCategory;
  CuratedCategoryConnection: CuratedCategoryConnection;
  CuratedCategoryEdge: CuratedCategoryEdge;
  DailymotionAd: DailymotionAd;
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  DeleteBehaviorRuleInput: DeleteBehaviorRuleInput;
  DeleteBehaviorRulePayload: DeleteBehaviorRulePayload;
  DeleteReactionInput: DeleteReactionInput;
  DeleteReactionPayload: DeleteReactionPayload;
  DeleteUserInput: DeleteUserInput;
  DeleteUserPayload: DeleteUserPayload;
  DeleteVideoInput: DeleteVideoInput;
  DeleteVideoPayload: DeleteVideoPayload;
  EmailChangeRequest: EmailChangeRequest;
  ExperimentMatch: ExperimentMatch;
  ExperimentMatchConnection: ExperimentMatchConnection;
  ExperimentMatchEdge: ExperimentMatchEdge;
  FallbackCountry: FallbackCountry;
  FallbackCountryConnection: FallbackCountryConnection;
  FallbackCountryEdge: FallbackCountryEdge;
  Favorite: Omit<Favorite, 'post'> & { post: ResolversParentTypes['Post'] };
  FeatureMatch: FeatureMatch;
  FeatureMatchConnection: FeatureMatchConnection;
  FeatureMatchEdge: FeatureMatchEdge;
  FeaturedContent: FeaturedContent;
  FeedFilter: FeedFilter;
  FeedPost: Omit<FeedPost, 'post'> & { post?: Maybe<ResolversParentTypes['Post']> };
  FeedPostConnection: FeedPostConnection;
  FeedPostEdge: FeedPostEdge;
  FeedSort: FeedSort;
  FileUpload: FileUpload;
  Float: Scalars['Float']['output'];
  FollowChannelInput: FollowChannelInput;
  FollowChannelPayload: FollowChannelPayload;
  FollowChannelsInput: FollowChannelsInput;
  FollowChannelsPayload: FollowChannelsPayload;
  FollowTopicInput: FollowTopicInput;
  FollowTopicPayload: FollowTopicPayload;
  FollowTopicsInput: FollowTopicsInput;
  FollowTopicsPayload: FollowTopicsPayload;
  FollowUserInput: FollowUserInput;
  FollowUserPayload: FollowUserPayload;
  FollowedChannel: FollowedChannel;
  FollowedChannelConnection: FollowedChannelConnection;
  FollowedChannelEdge: FollowedChannelEdge;
  FollowedTopic: FollowedTopic;
  FollowedTopicConnection: FollowedTopicConnection;
  FollowedTopicEdge: FollowedTopicEdge;
  Follower: Follower;
  FollowerConnection: FollowerConnection;
  FollowerEdge: FollowerEdge;
  FollowerEngagement: FollowerEngagement;
  FollowerEngagementNotifications: FollowerEngagementNotifications;
  Following: Following;
  FollowingChannelStartsLive: FollowingChannelStartsLive;
  FollowingChannelUploadsVideo: FollowingChannelUploadsVideo;
  FollowingConnection: FollowingConnection;
  FollowingEdge: FollowingEdge;
  FollowingStartsLive: FollowingStartsLive;
  GenerateFileUploadUrlInput: GenerateFileUploadUrlInput;
  GenerateFileUploadUrlPayload: GenerateFileUploadUrlPayload;
  GeoblockedCountries: GeoblockedCountries;
  Geoblocking: Geoblocking;
  GeoblockingConnection: GeoblockingConnection;
  GeoblockingEdge: GeoblockingEdge;
  Hashtag: Hashtag;
  HashtagConnection: HashtagConnection;
  HashtagEdge: HashtagEdge;
  HashtagEngagementMetrics: HashtagEngagementMetrics;
  HashtagMetrics: HashtagMetrics;
  History: ResolversInterfaceTypes<ResolversParentTypes>['History'];
  HistoryConnection: HistoryConnection;
  HistoryEdge: Omit<HistoryEdge, 'node'> & { node?: Maybe<ResolversParentTypes['History']> };
  HistoryFilter: HistoryFilter;
  HtmlPage: HtmlPage;
  ID: Scalars['ID']['output'];
  IDOperator: IdOperator;
  Image: Image;
  Int: Scalars['Int']['output'];
  InteractionOperator: InteractionOperator;
  Interest: Interest;
  InterestConnection: InterestConnection;
  InterestEdge: InterestEdge;
  Language: Language;
  LikeConnection: LikeConnection;
  LikeEdge: LikeEdge;
  LikeMetric: LikeMetric;
  LikeMetricConnection: LikeMetricConnection;
  LikeMetricEdge: LikeMetricEdge;
  LikeMetricFilter: LikeMetricFilter;
  LikeNode: Omit<LikeNode, 'post'> & { post?: Maybe<ResolversParentTypes['Post']> };
  LikePayload: LikePayload;
  LikeRatingOperator: LikeRatingOperator;
  LikeVideoInput: LikeVideoInput;
  LikeVideoPayload: LikeVideoPayload;
  Live: Live;
  LiveConnection: LiveConnection;
  LiveEdge: LiveEdge;
  LiveEngagementMetrics: LiveEngagementMetrics;
  LiveFilter: LiveFilter;
  LiveMetric: LiveMetric;
  LiveMetricConnection: LiveMetricConnection;
  LiveMetricEdge: LiveMetricEdge;
  LiveMetrics: LiveMetrics;
  LiveShareUrls: LiveShareUrls;
  LiveStats: LiveStats;
  LiveStatsViews: LiveStatsViews;
  LiveStreams: LiveStreams;
  LiveStreamsConnection: LiveStreamsConnection;
  LiveStreamsEdge: LiveStreamsEdge;
  LiveViewerEngagement: LiveViewerEngagement;
  Localization: Localization;
  LocalizationMe: LocalizationMe;
  Media: ResolversUnionTypes<ResolversParentTypes>['Media'];
  MediaConnection: MediaConnection;
  MediaEdge: Omit<MediaEdge, 'node'> & { node?: Maybe<ResolversParentTypes['Media']> };
  MediaModeration: MediaModeration;
  MediaPublishingInfo: MediaPublishingInfo;
  MediaStreams: ResolversUnionTypes<ResolversParentTypes>['MediaStreams'];
  MediaStreamsConnection: MediaStreamsConnection;
  MediaStreamsEdge: Omit<MediaStreamsEdge, 'node'> & { node?: Maybe<ResolversParentTypes['MediaStreams']> };
  MediaTag: MediaTag;
  MediaTagConnection: MediaTagConnection;
  MediaTagEdge: MediaTagEdge;
  MediaUploadInfo: MediaUploadInfo;
  Metadata: Metadata;
  Metric: ResolversInterfaceTypes<ResolversParentTypes>['Metric'];
  ModerationAction: ModerationAction;
  ModerationActionAppealInput: ModerationActionAppealInput;
  ModerationActionAppealPayload: ModerationActionAppealPayload;
  MonetizationInsights: MonetizationInsights;
  Mutation: {};
  Neon: Neon;
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  NotificationFollowedChannelUpdateInput: NotificationFollowedChannelUpdateInput;
  NotificationFollowedChannelUpdatePayload: NotificationFollowedChannelUpdatePayload;
  NotificationSettings: NotificationSettings;
  Organization: Organization;
  OrganizationAnalysis: OrganizationAnalysis;
  OrganizationConnection: OrganizationConnection;
  OrganizationEdge: OrganizationEdge;
  OrganizationPermission: OrganizationPermission;
  OrganizationStats: OrganizationStats;
  OrganizationStatsChannels: OrganizationStatsChannels;
  PageInfo: PageInfo;
  Partner: Partner;
  PartnerReportFile: PartnerReportFile;
  PartnerReportFilters: PartnerReportFilters;
  PartnerSpace: PartnerSpace;
  Player: Player;
  PlayerQueue: PlayerQueue;
  PlayerQueueContextArgument: PlayerQueueContextArgument;
  Poll: Omit<Poll, 'component' | 'post'> & { component?: Maybe<ResolversParentTypes['Component']>, post?: Maybe<ResolversParentTypes['Post']> };
  PollAnswerInput: PollAnswerInput;
  PollAnswerPayload: PollAnswerPayload;
  PollConnection: PollConnection;
  PollEdge: PollEdge;
  PollFilter: PollFilter;
  PollOption: PollOption;
  PollShareUrls: PollShareUrls;
  Post: ResolversUnionTypes<ResolversParentTypes>['Post'];
  PostConnection: PostConnection;
  PostEdge: Omit<PostEdge, 'node'> & { node?: Maybe<ResolversParentTypes['Post']> };
  PostEngagementMetrics: ResolversInterfaceTypes<ResolversParentTypes>['PostEngagementMetrics'];
  PostMetric: ResolversUnionTypes<ResolversParentTypes>['PostMetric'];
  PostMetricConnection: PostMetricConnection;
  PostMetricEdge: Omit<PostMetricEdge, 'node'> & { node?: Maybe<ResolversParentTypes['PostMetric']> };
  PostMetrics: ResolversInterfaceTypes<ResolversParentTypes>['PostMetrics'];
  PostOperator: PostOperator;
  PostStatusOperator: PostStatusOperator;
  ProductUpdates: ProductUpdates;
  Query: {};
  Reaction: Omit<Reaction, 'opener'> & { opener?: Maybe<ResolversParentTypes['Story']> };
  ReactionConnection: ReactionConnection;
  ReactionEdge: ReactionEdge;
  ReactionEngagementMetrics: ReactionEngagementMetrics;
  ReactionMetric: ReactionMetric;
  ReactionMetricConnection: ReactionMetricConnection;
  ReactionMetricEdge: ReactionMetricEdge;
  ReactionMetrics: ReactionMetrics;
  ReactionPayload: ReactionPayload;
  ReactionShareUrls: ReactionShareUrls;
  ReactionVideo: ReactionVideo;
  ReactionVideoConnection: ReactionVideoConnection;
  ReactionVideoCreateInput: ReactionVideoCreateInput;
  ReactionVideoDeleteInput: ReactionVideoDeleteInput;
  ReactionVideoDeletePayload: ReactionVideoDeletePayload;
  ReactionVideoEdge: ReactionVideoEdge;
  ReactionVideoPayload: ReactionVideoPayload;
  ReactionVideoStats: ReactionVideoStats;
  ReactionVideoStatsBookmarks: ReactionVideoStatsBookmarks;
  ReactionVideoStatsFavorites: ReactionVideoStatsFavorites;
  ReactionVideoStatsLikes: ReactionVideoStatsLikes;
  ReactionVideoStatsReactionVideos: ReactionVideoStatsReactionVideos;
  ReactionVideoStatsSaves: ReactionVideoStatsSaves;
  ReactionVideoUpdateInput: ReactionVideoUpdateInput;
  ReactionViewerEngagement: ReactionViewerEngagement;
  RecommendedRecording: Omit<RecommendedRecording, 'recording'> & { recording?: Maybe<ResolversParentTypes['Recording']> };
  RecommendedRecordingConnection: RecommendedRecordingConnection;
  RecommendedRecordingEdge: RecommendedRecordingEdge;
  Recording: ResolversInterfaceTypes<ResolversParentTypes>['Recording'];
  RecoverPasswordInput: RecoverPasswordInput;
  RecoverPasswordPayload: RecoverPasswordPayload;
  RelatedVideoContext: RelatedVideoContext;
  RemindUnwatchedVideos: RemindUnwatchedVideos;
  RemoveCollectionInput: RemoveCollectionInput;
  RemoveCollectionPayload: RemoveCollectionPayload;
  RemoveCollectionVideoInput: RemoveCollectionVideoInput;
  RemoveCollectionVideoPayload: RemoveCollectionVideoPayload;
  RemoveWatchLaterVideoInput: RemoveWatchLaterVideoInput;
  RemoveWatchLaterVideoPayload: RemoveWatchLaterVideoPayload;
  RemoveWatchedVideoInput: RemoveWatchedVideoInput;
  RemoveWatchedVideoPayload: RemoveWatchedVideoPayload;
  ReorderCollectionMediaInput: ReorderCollectionMediaInput;
  ReorderCollectionMediaPayload: ReorderCollectionMediaPayload;
  ReportCreatorInput: ReportCreatorInput;
  ReportCreatorPayload: ReportCreatorPayload;
  ReportFileDownloadLink: ReportFileDownloadLink;
  ReportFileDownloadLinkConnection: ReportFileDownloadLinkConnection;
  ReportFileDownloadLinkEdge: ReportFileDownloadLinkEdge;
  ReportVideoInput: ReportVideoInput;
  ReportVideoPayload: ReportVideoPayload;
  ReporterEmailVerifyInput: ReporterEmailVerifyInput;
  ReporterEmailVerifyPayload: ReporterEmailVerifyPayload;
  RequestActivationCodeInput: RequestActivationCodeInput;
  RequestActivationCodePayload: RequestActivationCodePayload;
  ResetPasswordInput: ResetPasswordInput;
  ResetPasswordPayload: ResetPasswordPayload;
  Restriction: Restriction;
  Rule: Rule;
  RuleConnection: RuleConnection;
  RuleEdge: RuleEdge;
  Search: Search;
  Section: Omit<Section, 'relatedComponent'> & { relatedComponent?: Maybe<ResolversParentTypes['Component']> };
  SectionConnection: SectionConnection;
  SectionContextArgument: SectionContextArgument;
  SectionEdge: SectionEdge;
  SendTransactionalEmailInput: SendTransactionalEmailInput;
  SendTransactionalEmailPayload: SendTransactionalEmailPayload;
  SendValidationEmailInput: SendValidationEmailInput;
  SendValidationEmailPayload: SendValidationEmailPayload;
  ShareUrls: ResolversInterfaceTypes<ResolversParentTypes>['ShareUrls'];
  SharingURL: SharingUrl;
  SharingURLConnection: SharingUrlConnection;
  SharingURLEdge: SharingUrlEdge;
  Story: ResolversUnionTypes<ResolversParentTypes>['Story'];
  StoryOperator: StoryOperator;
  String: Scalars['String']['output'];
  StringOperator: StringOperator;
  Subdivision: Subdivision;
  Subtitle: Subtitle;
  SubtitleConnection: SubtitleConnection;
  SubtitleEdge: SubtitleEdge;
  Suggestion: Suggestion;
  SuggestionConnection: SuggestionConnection;
  SuggestionEdge: SuggestionEdge;
  SupportedCountry: SupportedCountry;
  SupportedCountryConnection: SupportedCountryConnection;
  SupportedCountryEdge: SupportedCountryEdge;
  SupportedLanguage: SupportedLanguage;
  SupportedLanguageConnection: SupportedLanguageConnection;
  SupportedLanguageEdge: SupportedLanguageEdge;
  Thumbnails: Thumbnails;
  Time: Scalars['Time']['output'];
  Tips: Tips;
  Topic: Topic;
  TopicConnection: TopicConnection;
  TopicEdge: TopicEdge;
  TopicLabel: TopicLabel;
  TopicLabelConnection: TopicLabelConnection;
  TopicLabelEdge: TopicLabelEdge;
  TopicShareUrls: TopicShareUrls;
  TopicStats: TopicStats;
  TopicStatsFollowers: TopicStatsFollowers;
  TopicStatsVideos: TopicStatsVideos;
  TopicWhitelistStatus: TopicWhitelistStatus;
  UnfollowChannelInput: UnfollowChannelInput;
  UnfollowChannelPayload: UnfollowChannelPayload;
  UnfollowTopicInput: UnfollowTopicInput;
  UnfollowTopicPayload: UnfollowTopicPayload;
  UnfollowUserInput: UnfollowUserInput;
  UnfollowUserPayload: UnfollowUserPayload;
  UnlikeVideoInput: UnlikeVideoInput;
  UnlikeVideoPayload: UnlikeVideoPayload;
  UpdateBehaviorRuleInput: UpdateBehaviorRuleInput;
  UpdateBehaviorRulePayload: UpdateBehaviorRulePayload;
  UpdateChannelInput: UpdateChannelInput;
  UpdateChannelPayload: UpdateChannelPayload;
  UpdateCollectionInput: UpdateCollectionInput;
  UpdateCollectionPayload: UpdateCollectionPayload;
  UpdateNotificationSettingsEmailInput: UpdateNotificationSettingsEmailInput;
  UpdateNotificationSettingsEmailPayload: UpdateNotificationSettingsEmailPayload;
  UpdateNotificationSettingsPushInput: UpdateNotificationSettingsPushInput;
  UpdateNotificationSettingsPushPayload: UpdateNotificationSettingsPushPayload;
  UpdateReactionInput: UpdateReactionInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserPayload: UpdateUserPayload;
  UpdateVideoInput: UpdateVideoInput;
  UpdateVideoPayload: UpdateVideoPayload;
  User: User;
  UserEmailChangeConfirmInput: UserEmailChangeConfirmInput;
  UserEmailChangeConfirmPayload: UserEmailChangeConfirmPayload;
  UserEmailChangeRequestInput: UserEmailChangeRequestInput;
  UserEmailChangeRequestPayload: UserEmailChangeRequestPayload;
  UserEmailConfirmationCodeResetInput: UserEmailConfirmationCodeResetInput;
  UserEmailConfirmationCodeResetPayload: UserEmailConfirmationCodeResetPayload;
  UserEmailValidationTokenInput: UserEmailValidationTokenInput;
  UserEmailValidationTokenPayload: UserEmailValidationTokenPayload;
  UserInterest: UserInterest;
  UserInterestAddInput: UserInterestAddInput;
  UserInterestAddPayload: UserInterestAddPayload;
  UserInterestConnection: UserInterestConnection;
  UserInterestEdge: UserInterestEdge;
  UserInterestRemoveInput: UserInterestRemoveInput;
  UserInterestRemovePayload: UserInterestRemovePayload;
  UserInterestsUpdateInput: UserInterestsUpdateInput;
  UserInterestsUpdatePayload: UserInterestsUpdatePayload;
  UserOpenWebCodeBRequestInput: UserOpenWebCodeBRequestInput;
  UserOpenWebCodeBRequestPayload: UserOpenWebCodeBRequestPayload;
  UserPollAnswer: UserPollAnswer;
  UserStats: UserStats;
  UserStatsCollections: UserStatsCollections;
  UserStatsFollowers: UserStatsFollowers;
  UserStatsFollowingChannels: UserStatsFollowingChannels;
  UserStatsFollowingTopics: UserStatsFollowingTopics;
  UserStatsLikedVideos: UserStatsLikedVideos;
  UserStatsReactionVideos: UserStatsReactionVideos;
  UserStatsUploadedVideos: UserStatsUploadedVideos;
  UserStatsVideos: UserStatsVideos;
  UserStatsWatchLater: UserStatsWatchLater;
  UserStatsWatchedVideos: UserStatsWatchedVideos;
  Video: Video;
  VideoConnection: VideoConnection;
  VideoDigest: VideoDigest;
  VideoEdge: VideoEdge;
  VideoEngagementMetrics: VideoEngagementMetrics;
  VideoFilter: VideoFilter;
  VideoMetric: VideoMetric;
  VideoMetricConnection: VideoMetricConnection;
  VideoMetricEdge: VideoMetricEdge;
  VideoMetrics: VideoMetrics;
  VideoOrLive: ResolversUnionTypes<ResolversParentTypes>['VideoOrLive'];
  VideoShareUrls: VideoShareUrls;
  VideoStats: VideoStats;
  VideoStatsBookmarks: VideoStatsBookmarks;
  VideoStatsFavorites: VideoStatsFavorites;
  VideoStatsLikes: VideoStatsLikes;
  VideoStatsReactionVideos: VideoStatsReactionVideos;
  VideoStatsSaves: VideoStatsSaves;
  VideoStatsViews: VideoStatsViews;
  VideoStreams: VideoStreams;
  VideoStreamsConnection: VideoStreamsConnection;
  VideoStreamsEdge: VideoStreamsEdge;
  VideoViewerEngagement: VideoViewerEngagement;
  ViewerEngagement: ResolversInterfaceTypes<ResolversParentTypes>['ViewerEngagement'];
  Views: Views;
  VisibilityOperator: VisibilityOperator;
  Watch: Omit<Watch, 'post'> & { post: ResolversParentTypes['Post'] };
  WatchedVideoAddInput: WatchedVideoAddInput;
  WatchedVideoAddPayload: WatchedVideoAddPayload;
  Web: Web;
  WebMetadata: WebMetadata;
  WebMetadataConnection: WebMetadataConnection;
  WebMetadataConnectionConnection: WebMetadataConnectionConnection;
  WebMetadataConnectionEdge: WebMetadataConnectionEdge;
  addLikeInput: AddLikeInput;
  removeLikeInput: RemoveLikeInput;
};

export type ActAsPyEnumDirectiveArgs = {
  name: Scalars['String']['input'];
};

export type ActAsPyEnumDirectiveResolver<Result, Parent, ContextType = any, Args = ActAsPyEnumDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthDirectiveArgs = {
  accounts?: Maybe<Array<AccountType>>;
  dailyteam?: Maybe<Scalars['Boolean']['input']>;
  permissions?: Maybe<Array<RolePermission>>;
  roles?: Maybe<Array<Role>>;
};

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BetaDirectiveArgs = {
  reason?: Scalars['String']['input'];
};

export type BetaDirectiveResolver<Result, Parent, ContextType = any, Args = BetaDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ConstraintDirectiveArgs = {
  args?: Maybe<Array<Scalars['String']['input']>>;
  fieldName?: Maybe<Scalars['String']['input']>;
  filterOperators?: Maybe<Array<Scalars['String']['input']>>;
  filterValues?: Maybe<Array<Scalars['String']['input']>>;
  format?: Maybe<Scalars['String']['input']>;
  id?: Maybe<Array<Scalars['String']['input']>>;
  max?: Maybe<Scalars['Int']['input']>;
  maxItems?: Maybe<Scalars['Int']['input']>;
  maxLength?: Maybe<Scalars['Int']['input']>;
  min?: Maybe<Scalars['Int']['input']>;
  minItems?: Maybe<Scalars['Int']['input']>;
  minLength?: Maybe<Scalars['Int']['input']>;
  pattern?: Maybe<Scalars['String']['input']>;
};

export type ConstraintDirectiveResolver<Result, Parent, ContextType = any, Args = ConstraintDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type DepthLimitDirectiveArgs = {
  int: Scalars['Int']['input'];
};

export type DepthLimitDirectiveResolver<Result, Parent, ContextType = any, Args = DepthLimitDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type HiddenDirectiveArgs = { };

export type HiddenDirectiveResolver<Result, Parent, ContextType = any, Args = HiddenDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type NonIntrospectableDirectiveArgs = { };

export type NonIntrospectableDirectiveResolver<Result, Parent, ContextType = any, Args = NonIntrospectableDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ResetSecondsDirectiveArgs = { };

export type ResetSecondsDirectiveResolver<Result, Parent, ContextType = any, Args = ResetSecondsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type SkipResolveDirectiveArgs = {
  paths: Array<Scalars['String']['input']>;
};

export type SkipResolveDirectiveResolver<Result, Parent, ContextType = any, Args = SkipResolveDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ValidateChoicesDirectiveArgs = {
  argumentName?: Maybe<Scalars['String']['input']>;
  choices?: Maybe<Array<Maybe<Scalars['String']['input']>>>;
  fieldName?: Maybe<Scalars['String']['input']>;
  message?: Maybe<Scalars['String']['input']>;
};

export type ValidateChoicesDirectiveResolver<Result, Parent, ContextType = any, Args = ValidateChoicesDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ValidateTimePeriodFrequencyDirectiveArgs = {
  argumentName?: Maybe<Scalars['String']['input']>;
  fieldName?: Maybe<Scalars['String']['input']>;
  message?: Maybe<Scalars['String']['input']>;
};

export type ValidateTimePeriodFrequencyDirectiveResolver<Result, Parent, ContextType = any, Args = ValidateTimePeriodFrequencyDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ValidateVideoTimeCodeDirectiveArgs = {
  argumentName?: Maybe<Scalars['String']['input']>;
  fieldName?: Maybe<Scalars['String']['input']>;
  message?: Maybe<Scalars['String']['input']>;
};

export type ValidateVideoTimeCodeDirectiveResolver<Result, Parent, ContextType = any, Args = ValidateVideoTimeCodeDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ActivateUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ActivateUserPayload'] = ResolversParentTypes['ActivateUserPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddCollectionVideoPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddCollectionVideoPayload'] = ResolversParentTypes['AddCollectionVideoPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddWatchLaterVideoPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddWatchLaterVideoPayload'] = ResolversParentTypes['AddWatchLaterVideoPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AlgorithmResolvers<ContextType = any, ParentType extends ResolversParentTypes['Algorithm'] = ResolversParentTypes['Algorithm']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnalyticsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Analytics'] = ResolversParentTypes['Analytics']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  kpi?: Resolver<ResolversTypes['AnalyticsFlatPayload'], ParentType, ContextType, RequireFields<AnalyticsKpiArgs, 'filter' | 'metric' | 'timePeriod'>>;
  timeSeries?: Resolver<ResolversTypes['AnalyticsPayload'], ParentType, ContextType, RequireFields<AnalyticsTimeSeriesArgs, 'filter' | 'metrics' | 'timePeriod'>>;
  topValues?: Resolver<ResolversTypes['AnalyticsPayload'], ParentType, ContextType, RequireFields<AnalyticsTopValuesArgs, 'dimensions' | 'filter' | 'limit' | 'metrics' | 'timePeriod'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnalyticsFlatPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnalyticsFlatPayload'] = ResolversParentTypes['AnalyticsFlatPayload']> = {
  fields?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  values?: Resolver<Array<Maybe<Array<Maybe<ResolversTypes['Any']>>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnalyticsGroupedPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnalyticsGroupedPayload'] = ResolversParentTypes['AnalyticsGroupedPayload']> = {
  fields?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  values?: Resolver<Array<ResolversTypes['AnalyticsGroupedPayloadItem']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnalyticsGroupedPayloadItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnalyticsGroupedPayloadItem'] = ResolversParentTypes['AnalyticsGroupedPayloadItem']> = {
  field?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  values?: Resolver<Array<Maybe<Array<Maybe<ResolversTypes['Any']>>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnalyticsPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnalyticsPayload'] = ResolversParentTypes['AnalyticsPayload']> = {
  __resolveType: TypeResolveFn<'AnalyticsFlatPayload' | 'AnalyticsGroupedPayload', ParentType, ContextType>;
  fields?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type AnalyticsReportResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnalyticsReport'] = ResolversParentTypes['AnalyticsReport']> = {
  channelXid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  downloadLinks?: Resolver<Maybe<ResolversTypes['ReportFileDownloadLinkConnection']>, ParentType, ContextType, RequireFields<AnalyticsReportDownloadLinksArgs, 'page'>>;
  endDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  hasRevenueInfo?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  organizationXid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reportToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['AnalyticsReportStatus']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnalyticsReportConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnalyticsReportConnection'] = ResolversParentTypes['AnalyticsReportConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['AnalyticsReportEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnalyticsReportCreatePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnalyticsReportCreatePayload'] = ResolversParentTypes['AnalyticsReportCreatePayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  report?: Resolver<Maybe<ResolversTypes['AnalyticsReport']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnalyticsReportEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnalyticsReportEdge'] = ResolversParentTypes['AnalyticsReportEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['AnalyticsReport']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface AnyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Any'], any> {
  name: 'Any';
}

export type AppealApplicationResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppealApplication'] = ResolversParentTypes['AppealApplication']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  moderationAction?: Resolver<ResolversTypes['ModerationAction'], ParentType, ContextType>;
  reasons?: Resolver<Array<ResolversTypes['AppealReason']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AskPartnerReportFilePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AskPartnerReportFilePayload'] = ResolversParentTypes['AskPartnerReportFilePayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reportFile?: Resolver<Maybe<ResolversTypes['PartnerReportFile']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttributeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Attribute'] = ResolversParentTypes['Attribute']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttributeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttributeConnection'] = ResolversParentTypes['AttributeConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['AttributeEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttributeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttributeEdge'] = ResolversParentTypes['AttributeEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Attribute']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BehaviorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Behavior'] = ResolversParentTypes['Behavior']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  matchedExperiments?: Resolver<Maybe<ResolversTypes['ExperimentMatchConnection']>, ParentType, ContextType, RequireFields<BehaviorMatchedExperimentsArgs, 'page'>>;
  matchedFeatures?: Resolver<Maybe<ResolversTypes['FeatureMatchConnection']>, ParentType, ContextType, RequireFields<BehaviorMatchedFeaturesArgs, 'page'>>;
  rules?: Resolver<Maybe<ResolversTypes['RuleConnection']>, ParentType, ContextType, RequireFields<BehaviorRulesArgs, 'page'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BehaviorRuleTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['BehaviorRuleTag'] = ResolversParentTypes['BehaviorRuleTag']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BehaviorRuleTagConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['BehaviorRuleTagConnection'] = ResolversParentTypes['BehaviorRuleTagConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['BehaviorRuleTagEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BehaviorRuleTagEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['BehaviorRuleTagEdge'] = ResolversParentTypes['BehaviorRuleTagEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['BehaviorRuleTag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BookmarkMetricResolvers<ContextType = any, ParentType extends ResolversParentTypes['BookmarkMetric'] = ResolversParentTypes['BookmarkMetric']> = {
  bookmark?: Resolver<ResolversTypes['BookmarkTypename'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookmarkMetricConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['BookmarkMetricConnection'] = ResolversParentTypes['BookmarkMetricConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['BookmarkMetricEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookmarkMetricEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['BookmarkMetricEdge'] = ResolversParentTypes['BookmarkMetricEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['BookmarkMetric']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  __resolveType: TypeResolveFn<'ContentCategory' | 'CuratedCategory', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type CategoryConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryConnection'] = ResolversParentTypes['CategoryConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['CategoryEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryEdge'] = ResolversParentTypes['CategoryEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Channel'] = ResolversParentTypes['Channel']> = {
  accountType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<ChannelAvatarArgs, 'height'>>;
  banner?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, Partial<ChannelBannerArgs>>;
  bookmarks?: Resolver<Maybe<ResolversTypes['LikeConnection']>, ParentType, ContextType, RequireFields<ChannelBookmarksArgs, 'first' | 'page'>>;
  canChangeName?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  collections?: Resolver<Maybe<ResolversTypes['CollectionConnection']>, ParentType, ContextType, RequireFields<ChannelCollectionsArgs, 'first' | 'hasPublicVideos' | 'page'>>;
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>;
  coverURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<ChannelCoverUrlArgs, 'size'>>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  externalLinks?: Resolver<Maybe<ResolversTypes['ChannelExternalLinks']>, ParentType, ContextType>;
  followerEngagement?: Resolver<Maybe<ResolversTypes['FollowerEngagement']>, ParentType, ContextType>;
  followers?: Resolver<Maybe<ResolversTypes['FollowerConnection']>, ParentType, ContextType, RequireFields<ChannelFollowersArgs, 'first' | 'page'>>;
  followings?: Resolver<Maybe<ResolversTypes['FollowingConnection']>, ParentType, ContextType, RequireFields<ChannelFollowingsArgs, 'first' | 'page'>>;
  history?: Resolver<Maybe<ResolversTypes['HistoryConnection']>, ParentType, ContextType, RequireFields<ChannelHistoryArgs, 'filter' | 'first' | 'page'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isArtist?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isAvailable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isFollowed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isNotificationEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['Language']>, ParentType, ContextType>;
  lives?: Resolver<Maybe<ResolversTypes['LiveConnection']>, ParentType, ContextType, RequireFields<ChannelLivesArgs, 'first' | 'page'>>;
  logoURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<ChannelLogoUrlArgs, 'size'>>;
  medias?: Resolver<Maybe<ResolversTypes['MediaConnection']>, ParentType, ContextType, RequireFields<ChannelMediasArgs, 'first' | 'page'>>;
  metabaseIframeURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<ChannelMetabaseIframeUrlArgs, 'dashboardId'>>;
  metrics?: Resolver<Maybe<ResolversTypes['ChannelMetrics']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  networkChannels?: Resolver<Maybe<ResolversTypes['ChannelConnection']>, ParentType, ContextType, RequireFields<ChannelNetworkChannelsArgs, 'first' | 'hasPublicVideos' | 'page'>>;
  organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
  reactions?: Resolver<Maybe<ResolversTypes['ReactionConnection']>, ParentType, ContextType, RequireFields<ChannelReactionsArgs, 'first' | 'page'>>;
  shareUrls?: Resolver<Maybe<ResolversTypes['ChannelShareUrls']>, ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['ChannelStats']>, ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thumbnails?: Resolver<Maybe<ResolversTypes['Thumbnails']>, ParentType, ContextType>;
  videos?: Resolver<Maybe<ResolversTypes['VideoConnection']>, ParentType, ContextType, RequireFields<ChannelVideosArgs, 'first' | 'page'>>;
  viewCount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelConnection'] = ResolversParentTypes['ChannelConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['ChannelEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelCreatePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelCreatePayload'] = ResolversParentTypes['ChannelCreatePayload']> = {
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelEdge'] = ResolversParentTypes['ChannelEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  permission?: Resolver<Maybe<ResolversTypes['ChannelPermission']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelEngagementMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelEngagementMetrics'] = ResolversParentTypes['ChannelEngagementMetrics']> = {
  bookmarks?: Resolver<Maybe<ResolversTypes['BookmarkMetricConnection']>, ParentType, ContextType, Partial<ChannelEngagementMetricsBookmarksArgs>>;
  collections?: Resolver<Maybe<ResolversTypes['CollectionMetricConnection']>, ParentType, ContextType, Partial<ChannelEngagementMetricsCollectionsArgs>>;
  followers?: Resolver<Maybe<ResolversTypes['ChannelMetricConnection']>, ParentType, ContextType>;
  followings?: Resolver<Maybe<ResolversTypes['ChannelMetricConnection']>, ParentType, ContextType>;
  history?: Resolver<Maybe<ResolversTypes['PostMetricConnection']>, ParentType, ContextType, RequireFields<ChannelEngagementMetricsHistoryArgs, 'filter'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lives?: Resolver<Maybe<ResolversTypes['LiveMetricConnection']>, ParentType, ContextType, Partial<ChannelEngagementMetricsLivesArgs>>;
  reactions?: Resolver<Maybe<ResolversTypes['ReactionMetricConnection']>, ParentType, ContextType>;
  videos?: Resolver<Maybe<ResolversTypes['VideoMetricConnection']>, ParentType, ContextType, Partial<ChannelEngagementMetricsVideosArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelExternalLinksResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelExternalLinks'] = ResolversParentTypes['ChannelExternalLinks']> = {
  facebookURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  instagramURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pinterestURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitterURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  websiteURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelMetricResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelMetric'] = ResolversParentTypes['ChannelMetric']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelMetricConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelMetricConnection'] = ResolversParentTypes['ChannelMetricConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['ChannelMetricEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelMetricEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelMetricEdge'] = ResolversParentTypes['ChannelMetricEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['ChannelMetric']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelMetrics'] = ResolversParentTypes['ChannelMetrics']> = {
  engagement?: Resolver<Maybe<ResolversTypes['ChannelEngagementMetrics']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelPermissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelPermission'] = ResolversParentTypes['ChannelPermission']> = {
  level?: Resolver<Maybe<ResolversTypes['ChannelPermissionLevel']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelShareUrlsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelShareUrls'] = ResolversParentTypes['ChannelShareUrls']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  permalink?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelStats'] = ResolversParentTypes['ChannelStats']> = {
  followers?: Resolver<Maybe<ResolversTypes['ChannelStatsFollowers']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reactions?: Resolver<Maybe<ResolversTypes['ChannelStatsReactions']>, ParentType, ContextType>;
  videos?: Resolver<Maybe<ResolversTypes['ChannelStatsVideos']>, ParentType, ContextType>;
  views?: Resolver<Maybe<ResolversTypes['ChannelStatsViews']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelStatsFollowersResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelStatsFollowers'] = ResolversParentTypes['ChannelStatsFollowers']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelStatsReactionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelStatsReactions'] = ResolversParentTypes['ChannelStatsReactions']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelStatsVideosResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelStatsVideos'] = ResolversParentTypes['ChannelStatsVideos']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelStatsViewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelStatsViews'] = ResolversParentTypes['ChannelStatsViews']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClearCollectionMediasPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClearCollectionMediasPayload'] = ResolversParentTypes['ClearCollectionMediasPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClearLikedVideosPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClearLikedVideosPayload'] = ResolversParentTypes['ClearLikedVideosPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClearWatchLaterVideosPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClearWatchLaterVideosPayload'] = ResolversParentTypes['ClearWatchLaterVideosPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClearWatchedVideosPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClearWatchedVideosPayload'] = ResolversParentTypes['ClearWatchedVideosPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']> = {
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hashtags?: Resolver<Maybe<ResolversTypes['HashtagConnection']>, ParentType, ContextType, RequireFields<CollectionHashtagsArgs, 'first' | 'page'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isFeatured?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isPrivate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  medias?: Resolver<Maybe<ResolversTypes['MediaConnection']>, ParentType, ContextType, RequireFields<CollectionMediasArgs, 'first' | 'page'>>;
  metrics?: Resolver<Maybe<ResolversTypes['CollectionMetrics']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['CollectionStats']>, ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<CollectionThumbnailArgs, 'height'>>;
  thumbnailURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<CollectionThumbnailUrlArgs, 'size'>>;
  thumbnails?: Resolver<Maybe<ResolversTypes['Thumbnails']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  videos?: Resolver<Maybe<ResolversTypes['VideoConnection']>, ParentType, ContextType, RequireFields<CollectionVideosArgs, 'first' | 'page'>>;
  xid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionConnection'] = ResolversParentTypes['CollectionConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['CollectionEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionEdge'] = ResolversParentTypes['CollectionEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionEngagementMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionEngagementMetrics'] = ResolversParentTypes['CollectionEngagementMetrics']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  videos?: Resolver<Maybe<ResolversTypes['VideoMetricConnection']>, ParentType, ContextType, Partial<CollectionEngagementMetricsVideosArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionMetricResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionMetric'] = ResolversParentTypes['CollectionMetric']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionMetricConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionMetricConnection'] = ResolversParentTypes['CollectionMetricConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['CollectionMetricEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionMetricEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionMetricEdge'] = ResolversParentTypes['CollectionMetricEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['CollectionMetric']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionMetrics'] = ResolversParentTypes['CollectionMetrics']> = {
  engagement?: Resolver<Maybe<ResolversTypes['CollectionEngagementMetrics']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionStats'] = ResolversParentTypes['CollectionStats']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  videos?: Resolver<Maybe<ResolversTypes['CollectionStatsVideos']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionStatsVideosResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionStatsVideos'] = ResolversParentTypes['CollectionStatsVideos']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  createDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metrics?: Resolver<Maybe<ResolversTypes['CommentMetrics']>, ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updateDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  viewerEngagement?: Resolver<Maybe<ResolversTypes['CommentViewerEngagement']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentConnection'] = ResolversParentTypes['CommentConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['CommentEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentEdge'] = ResolversParentTypes['CommentEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentEngagementMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentEngagementMetrics'] = ResolversParentTypes['CommentEngagementMetrics']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likes?: Resolver<Maybe<ResolversTypes['LikeMetricConnection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentMetricResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentMetric'] = ResolversParentTypes['CommentMetric']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentMetricConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentMetricConnection'] = ResolversParentTypes['CommentMetricConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['CommentMetricEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentMetricEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentMetricEdge'] = ResolversParentTypes['CommentMetricEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['CommentMetric']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentMetrics'] = ResolversParentTypes['CommentMetrics']> = {
  engagement?: Resolver<Maybe<ResolversTypes['CommentEngagementMetrics']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentViewerEngagementResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentViewerEngagement'] = ResolversParentTypes['CommentViewerEngagement']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likeRating?: Resolver<Maybe<ResolversTypes['LikeRating']>, ParentType, ContextType>;
  liked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ComponentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Component'] = ResolversParentTypes['Component']> = {
  __resolveType: TypeResolveFn<'Channel' | 'Collection' | 'Live' | 'Poll' | 'Reaction' | 'ReactionVideo' | 'Topic' | 'Video', ParentType, ContextType>;
};

export type ComponentConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ComponentConnection'] = ResolversParentTypes['ComponentConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['ComponentEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ComponentEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ComponentEdge'] = ResolversParentTypes['ComponentEdge']> = {
  metadata?: Resolver<Maybe<ResolversTypes['Metadata']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Component']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Content'] = ResolversParentTypes['Content']> = {
  __resolveType: TypeResolveFn<'Collection' | 'Live' | 'Reaction' | 'Video', ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
};

export type ContentCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContentCategory'] = ResolversParentTypes['ContentCategory']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Conversation'] = ResolversParentTypes['Conversation']> = {
  algorithm?: Resolver<Maybe<ResolversTypes['AlgorithmName']>, ParentType, ContextType>;
  dailymotionAd?: Resolver<Maybe<ResolversTypes['DailymotionAd']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  story?: Resolver<Maybe<ResolversTypes['Story']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConversationConnection'] = ResolversParentTypes['ConversationConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['ConversationEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConversationEdge'] = ResolversParentTypes['ConversationEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Conversation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  codeAlpha2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountryConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CountryConnection'] = ResolversParentTypes['CountryConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['CountryEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountryEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CountryEdge'] = ResolversParentTypes['CountryEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateBehaviorRulePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateBehaviorRulePayload'] = ResolversParentTypes['CreateBehaviorRulePayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rule?: Resolver<Maybe<ResolversTypes['Rule']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCollectionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateCollectionPayload'] = ResolversParentTypes['CreateCollectionPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  collection?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateUserPayload'] = ResolversParentTypes['CreateUserPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateVideoPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateVideoPayload'] = ResolversParentTypes['CreateVideoPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Video']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CuratedCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['CuratedCategory'] = ResolversParentTypes['CuratedCategory']> = {
  categoryId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CuratedCategoryConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CuratedCategoryConnection'] = ResolversParentTypes['CuratedCategoryConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['CuratedCategoryEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CuratedCategoryEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CuratedCategoryEdge'] = ResolversParentTypes['CuratedCategoryEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['CuratedCategory']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DailymotionAdResolvers<ContextType = any, ParentType extends ResolversParentTypes['DailymotionAd'] = ResolversParentTypes['DailymotionAd']> = {
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  promotion?: Resolver<ResolversTypes['Promotion'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeleteBehaviorRulePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteBehaviorRulePayload'] = ResolversParentTypes['DeleteBehaviorRulePayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteReactionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteReactionPayload'] = ResolversParentTypes['DeleteReactionPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteUserPayload'] = ResolversParentTypes['DeleteUserPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteVideoPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteVideoPayload'] = ResolversParentTypes['DeleteVideoPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EmailChangeRequestResolvers<ContextType = any, ParentType extends ResolversParentTypes['EmailChangeRequest'] = ResolversParentTypes['EmailChangeRequest']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  newEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExperimentMatchResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExperimentMatch'] = ResolversParentTypes['ExperimentMatch']> = {
  endingAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  matched?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<ResolversTypes['BehaviorRuleTagConnection']>, ParentType, ContextType, RequireFields<ExperimentMatchTagsArgs, 'page'>>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  variation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExperimentMatchConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExperimentMatchConnection'] = ResolversParentTypes['ExperimentMatchConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['ExperimentMatchEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExperimentMatchEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExperimentMatchEdge'] = ResolversParentTypes['ExperimentMatchEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['ExperimentMatch']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FallbackCountryResolvers<ContextType = any, ParentType extends ResolversParentTypes['FallbackCountry'] = ResolversParentTypes['FallbackCountry']> = {
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>;
  fallbackCountry?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FallbackCountryConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FallbackCountryConnection'] = ResolversParentTypes['FallbackCountryConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['FallbackCountryEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FallbackCountryEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FallbackCountryEdge'] = ResolversParentTypes['FallbackCountryEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['FallbackCountry']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FavoriteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Favorite'] = ResolversParentTypes['Favorite']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatureMatchResolvers<ContextType = any, ParentType extends ResolversParentTypes['FeatureMatch'] = ResolversParentTypes['FeatureMatch']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  matched?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<ResolversTypes['BehaviorRuleTagConnection']>, ParentType, ContextType, RequireFields<FeatureMatchTagsArgs, 'page'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatureMatchConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FeatureMatchConnection'] = ResolversParentTypes['FeatureMatchConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['FeatureMatchEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatureMatchEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FeatureMatchEdge'] = ResolversParentTypes['FeatureMatchEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['FeatureMatch']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeaturedContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['FeaturedContent'] = ResolversParentTypes['FeaturedContent']> = {
  channels?: Resolver<Maybe<ResolversTypes['ChannelConnection']>, ParentType, ContextType, RequireFields<FeaturedContentChannelsArgs, 'first' | 'page'>>;
  collections?: Resolver<Maybe<ResolversTypes['CollectionConnection']>, ParentType, ContextType, RequireFields<FeaturedContentCollectionsArgs, 'first' | 'page'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  medias?: Resolver<Maybe<ResolversTypes['MediaConnection']>, ParentType, ContextType, RequireFields<FeaturedContentMediasArgs, 'first' | 'page'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedPostResolvers<ContextType = any, ParentType extends ResolversParentTypes['FeedPost'] = ResolversParentTypes['FeedPost']> = {
  featured?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedPostConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FeedPostConnection'] = ResolversParentTypes['FeedPostConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['FeedPostEdge']>>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedPostEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FeedPostEdge'] = ResolversParentTypes['FeedPostEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['FeedPost']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileUploadResolvers<ContextType = any, ParentType extends ResolversParentTypes['FileUpload'] = ResolversParentTypes['FileUpload']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  progressURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uploadURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowChannelPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowChannelPayload'] = ResolversParentTypes['FollowChannelPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowChannelsPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowChannelsPayload'] = ResolversParentTypes['FollowChannelsPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowTopicPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowTopicPayload'] = ResolversParentTypes['FollowTopicPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowTopicsPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowTopicsPayload'] = ResolversParentTypes['FollowTopicsPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowUserPayload'] = ResolversParentTypes['FollowUserPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowedChannelResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowedChannel'] = ResolversParentTypes['FollowedChannel']> = {
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  followedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isNotificationEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowedChannelConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowedChannelConnection'] = ResolversParentTypes['FollowedChannelConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['FollowedChannelEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowedChannelEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowedChannelEdge'] = ResolversParentTypes['FollowedChannelEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['FollowedChannel']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowedTopicResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowedTopic'] = ResolversParentTypes['FollowedTopic']> = {
  followedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  topic?: Resolver<Maybe<ResolversTypes['Topic']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowedTopicConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowedTopicConnection'] = ResolversParentTypes['FollowedTopicConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['FollowedTopicEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowedTopicEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowedTopicEdge'] = ResolversParentTypes['FollowedTopicEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['FollowedTopic']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Follower'] = ResolversParentTypes['Follower']> = {
  creator?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowerConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowerConnection'] = ResolversParentTypes['FollowerConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['FollowerEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowerEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowerEdge'] = ResolversParentTypes['FollowerEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Follower']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowerEngagementResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowerEngagement'] = ResolversParentTypes['FollowerEngagement']> = {
  followDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  notifications?: Resolver<Maybe<ResolversTypes['FollowerEngagementNotifications']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowerEngagementNotificationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowerEngagementNotifications'] = ResolversParentTypes['FollowerEngagementNotifications']> = {
  uploads?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Following'] = ResolversParentTypes['Following']> = {
  creator?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowingChannelStartsLiveResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowingChannelStartsLive'] = ResolversParentTypes['FollowingChannelStartsLive']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isEmailEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowingChannelUploadsVideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowingChannelUploadsVideo'] = ResolversParentTypes['FollowingChannelUploadsVideo']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isEmailEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowingConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowingConnection'] = ResolversParentTypes['FollowingConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['FollowingEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowingEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowingEdge'] = ResolversParentTypes['FollowingEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Following']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowingStartsLiveResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowingStartsLive'] = ResolversParentTypes['FollowingStartsLive']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isPushEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenerateFileUploadUrlPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['GenerateFileUploadUrlPayload'] = ResolversParentTypes['GenerateFileUploadUrlPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fileUpload?: Resolver<Maybe<ResolversTypes['FileUpload']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeoblockedCountriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeoblockedCountries'] = ResolversParentTypes['GeoblockedCountries']> = {
  allowed?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  denied?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeoblockingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Geoblocking'] = ResolversParentTypes['Geoblocking']> = {
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isAllowed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeoblockingConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeoblockingConnection'] = ResolversParentTypes['GeoblockingConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['GeoblockingEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeoblockingEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeoblockingEdge'] = ResolversParentTypes['GeoblockingEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Geoblocking']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HashtagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Hashtag'] = ResolversParentTypes['Hashtag']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metrics?: Resolver<Maybe<ResolversTypes['HashtagMetrics']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  xid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HashtagConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['HashtagConnection'] = ResolversParentTypes['HashtagConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['HashtagEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HashtagEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['HashtagEdge'] = ResolversParentTypes['HashtagEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Hashtag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HashtagEngagementMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['HashtagEngagementMetrics'] = ResolversParentTypes['HashtagEngagementMetrics']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  videos?: Resolver<Maybe<ResolversTypes['VideoMetricConnection']>, ParentType, ContextType, Partial<HashtagEngagementMetricsVideosArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HashtagMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['HashtagMetrics'] = ResolversParentTypes['HashtagMetrics']> = {
  engagement?: Resolver<Maybe<ResolversTypes['HashtagEngagementMetrics']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HistoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['History'] = ResolversParentTypes['History']> = {
  __resolveType: TypeResolveFn<'Favorite' | 'Watch', ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
};

export type HistoryConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['HistoryConnection'] = ResolversParentTypes['HistoryConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['HistoryEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HistoryEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['HistoryEdge'] = ResolversParentTypes['HistoryEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['History']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = {
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InterestResolvers<ContextType = any, ParentType extends ResolversParentTypes['Interest'] = ResolversParentTypes['Interest']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  interestId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InterestConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['InterestConnection'] = ResolversParentTypes['InterestConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['InterestEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InterestEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['InterestEdge'] = ResolversParentTypes['InterestEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Interest']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LanguageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Language'] = ResolversParentTypes['Language']> = {
  codeAlpha2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  codeAlpha3?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikeConnection'] = ResolversParentTypes['LikeConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['LikeEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikeEdge'] = ResolversParentTypes['LikeEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['LikeNode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeMetricResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikeMetric'] = ResolversParentTypes['LikeMetric']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['LikeRating'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeMetricConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikeMetricConnection'] = ResolversParentTypes['LikeMetricConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['LikeMetricEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeMetricEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikeMetricEdge'] = ResolversParentTypes['LikeMetricEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['LikeMetric']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeNodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikeNode'] = ResolversParentTypes['LikeNode']> = {
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['LikeRating']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikePayload'] = ResolversParentTypes['LikePayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeVideoPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikeVideoPayload'] = ResolversParentTypes['LikeVideoPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LiveResolvers<ContextType = any, ParentType extends ResolversParentTypes['Live'] = ResolversParentTypes['Live']> = {
  allowEmbed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  aspectRatio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  audienceCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  bestAvailableQuality?: Resolver<Maybe<ResolversTypes['MediaQuality']>, ParentType, ContextType>;
  canDisplayAds?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  canDisplayAudience?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['MediaCategory']>, ParentType, ContextType>;
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  claimer?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  curatedCategories?: Resolver<Maybe<ResolversTypes['CuratedCategoryConnection']>, ParentType, ContextType, RequireFields<LiveCuratedCategoriesArgs, 'page'>>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  embedHtml?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  embedURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  geoblockedCountries?: Resolver<Maybe<ResolversTypes['GeoblockedCountries']>, ParentType, ContextType>;
  geoblocking?: Resolver<Maybe<ResolversTypes['GeoblockingConnection']>, ParentType, ContextType, RequireFields<LiveGeoblockingArgs, 'page'>>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hlsURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  interests?: Resolver<Maybe<ResolversTypes['InterestConnection']>, ParentType, ContextType, RequireFields<LiveInterestsArgs, 'page'>>;
  isBookmarked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isCreatedForKids?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isExplicit?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isInCollection?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<LiveIsInCollectionArgs, 'collectionXid'>>;
  isInWatchLater?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isLiked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isOnAir?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isPasswordProtected?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isPrivate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isPublished?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isReacted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['Language']>, ParentType, ContextType>;
  metrics?: Resolver<Maybe<ResolversTypes['LiveMetrics']>, ParentType, ContextType>;
  moderation?: Resolver<Maybe<ResolversTypes['MediaModeration']>, ParentType, ContextType>;
  reactions?: Resolver<Maybe<ResolversTypes['ReactionConnection']>, ParentType, ContextType, RequireFields<LiveReactionsArgs, 'first' | 'page'>>;
  restriction?: Resolver<Maybe<ResolversTypes['Restriction']>, ParentType, ContextType>;
  shareUrls?: Resolver<Maybe<ResolversTypes['LiveShareUrls']>, ParentType, ContextType>;
  sharingURLs?: Resolver<Maybe<ResolversTypes['SharingURLConnection']>, ParentType, ContextType, RequireFields<LiveSharingUrLsArgs, 'page'>>;
  startAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['LiveStats']>, ParentType, ContextType>;
  subtitles?: Resolver<Maybe<ResolversTypes['SubtitleConnection']>, ParentType, ContextType, RequireFields<LiveSubtitlesArgs, 'first' | 'page'>>;
  tags?: Resolver<Maybe<ResolversTypes['MediaTagConnection']>, ParentType, ContextType, RequireFields<LiveTagsArgs, 'page'>>;
  thumbnail?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<LiveThumbnailArgs, 'height'>>;
  thumbnailURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<LiveThumbnailUrlArgs, 'size'>>;
  thumbnails?: Resolver<Maybe<ResolversTypes['Thumbnails']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topics?: Resolver<Maybe<ResolversTypes['TopicConnection']>, ParentType, ContextType, RequireFields<LiveTopicsArgs, 'first' | 'page' | 'whitelistedOnly'>>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  viewerEngagement?: Resolver<Maybe<ResolversTypes['LiveViewerEngagement']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  xid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LiveConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LiveConnection'] = ResolversParentTypes['LiveConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['LiveEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LiveEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['LiveEdge'] = ResolversParentTypes['LiveEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Live']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LiveEngagementMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['LiveEngagementMetrics'] = ResolversParentTypes['LiveEngagementMetrics']> = {
  audience?: Resolver<Maybe<ResolversTypes['ChannelMetricConnection']>, ParentType, ContextType>;
  bookmarks?: Resolver<Maybe<ResolversTypes['BookmarkMetricConnection']>, ParentType, ContextType, Partial<LiveEngagementMetricsBookmarksArgs>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likes?: Resolver<Maybe<ResolversTypes['LikeMetricConnection']>, ParentType, ContextType, Partial<LiveEngagementMetricsLikesArgs>>;
  reactions?: Resolver<Maybe<ResolversTypes['ReactionMetricConnection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LiveMetricResolvers<ContextType = any, ParentType extends ResolversParentTypes['LiveMetric'] = ResolversParentTypes['LiveMetric']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LiveMetricConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LiveMetricConnection'] = ResolversParentTypes['LiveMetricConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['LiveMetricEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LiveMetricEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['LiveMetricEdge'] = ResolversParentTypes['LiveMetricEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['LiveMetric']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LiveMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['LiveMetrics'] = ResolversParentTypes['LiveMetrics']> = {
  engagement?: Resolver<Maybe<ResolversTypes['LiveEngagementMetrics']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LiveShareUrlsResolvers<ContextType = any, ParentType extends ResolversParentTypes['LiveShareUrls'] = ResolversParentTypes['LiveShareUrls']> = {
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  permalink?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LiveStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['LiveStats'] = ResolversParentTypes['LiveStats']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  views?: Resolver<Maybe<ResolversTypes['LiveStatsViews']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LiveStatsViewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['LiveStatsViews'] = ResolversParentTypes['LiveStatsViews']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LiveStreamsResolvers<ContextType = any, ParentType extends ResolversParentTypes['LiveStreams'] = ResolversParentTypes['LiveStreams']> = {
  chromecastURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hlsSourceURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hlsURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  restriction?: Resolver<Maybe<ResolversTypes['Restriction']>, ParentType, ContextType>;
  xid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LiveStreamsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LiveStreamsConnection'] = ResolversParentTypes['LiveStreamsConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['LiveStreamsEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LiveStreamsEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['LiveStreamsEdge'] = ResolversParentTypes['LiveStreamsEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['LiveStreams']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LiveViewerEngagementResolvers<ContextType = any, ParentType extends ResolversParentTypes['LiveViewerEngagement'] = ResolversParentTypes['LiveViewerEngagement']> = {
  bookmarked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  favorited?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likeRating?: Resolver<Maybe<ResolversTypes['LikeRating']>, ParentType, ContextType>;
  liked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  reacted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  saved?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocalizationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Localization'] = ResolversParentTypes['Localization']> = {
  fallbackCountries?: Resolver<Maybe<ResolversTypes['FallbackCountryConnection']>, ParentType, ContextType, RequireFields<LocalizationFallbackCountriesArgs, 'page'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['LocalizationMe']>, ParentType, ContextType>;
  supportedCountries?: Resolver<Maybe<ResolversTypes['SupportedCountryConnection']>, ParentType, ContextType, RequireFields<LocalizationSupportedCountriesArgs, 'page'>>;
  supportedLanguages?: Resolver<Maybe<ResolversTypes['SupportedLanguageConnection']>, ParentType, ContextType, RequireFields<LocalizationSupportedLanguagesArgs, 'page'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocalizationMeResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocalizationMe'] = ResolversParentTypes['LocalizationMe']> = {
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  subdivision?: Resolver<Maybe<ResolversTypes['Subdivision']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Media'] = ResolversParentTypes['Media']> = {
  __resolveType: TypeResolveFn<'Live' | 'Video', ParentType, ContextType>;
};

export type MediaConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaConnection'] = ResolversParentTypes['MediaConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['MediaEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaEdge'] = ResolversParentTypes['MediaEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaModerationResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaModeration'] = ResolversParentTypes['MediaModeration']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reviewedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaPublishingInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaPublishingInfo'] = ResolversParentTypes['MediaPublishingInfo']> = {
  percentage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaStreamsResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaStreams'] = ResolversParentTypes['MediaStreams']> = {
  __resolveType: TypeResolveFn<'LiveStreams' | 'VideoStreams', ParentType, ContextType>;
};

export type MediaStreamsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaStreamsConnection'] = ResolversParentTypes['MediaStreamsConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['MediaStreamsEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaStreamsEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaStreamsEdge'] = ResolversParentTypes['MediaStreamsEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['MediaStreams']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaTag'] = ResolversParentTypes['MediaTag']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaTagConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaTagConnection'] = ResolversParentTypes['MediaTagConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['MediaTagEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaTagEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaTagEdge'] = ResolversParentTypes['MediaTagEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['MediaTag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaUploadInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaUploadInfo'] = ResolversParentTypes['MediaUploadInfo']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  publishing?: Resolver<Maybe<ResolversTypes['MediaPublishingInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['Metadata'] = ResolversParentTypes['Metadata']> = {
  algorithm?: Resolver<Maybe<ResolversTypes['Algorithm']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetricResolvers<ContextType = any, ParentType extends ResolversParentTypes['Metric'] = ResolversParentTypes['Metric']> = {
  __resolveType: TypeResolveFn<'BookmarkMetric' | 'ChannelMetric' | 'CollectionMetric' | 'CommentMetric' | 'LikeMetric' | 'LiveMetric' | 'ReactionMetric' | 'VideoMetric', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type ModerationActionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationAction'] = ResolversParentTypes['ModerationAction']> = {
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  referenceNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModerationActionAppealPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ModerationActionAppealPayload'] = ResolversParentTypes['ModerationActionAppealPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MonetizationInsightsResolvers<ContextType = any, ParentType extends ResolversParentTypes['MonetizationInsights'] = ResolversParentTypes['MonetizationInsights']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isEmailEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  activateUser?: Resolver<Maybe<ResolversTypes['ActivateUserPayload']>, ParentType, ContextType, RequireFields<MutationActivateUserArgs, 'input'>>;
  addCollectionVideo?: Resolver<Maybe<ResolversTypes['AddCollectionVideoPayload']>, ParentType, ContextType, RequireFields<MutationAddCollectionVideoArgs, 'input'>>;
  addLike?: Resolver<Maybe<ResolversTypes['LikePayload']>, ParentType, ContextType, RequireFields<MutationAddLikeArgs, 'input'>>;
  addWatchLaterVideo?: Resolver<Maybe<ResolversTypes['AddWatchLaterVideoPayload']>, ParentType, ContextType, RequireFields<MutationAddWatchLaterVideoArgs, 'input'>>;
  analyticsReportCreate?: Resolver<Maybe<ResolversTypes['AnalyticsReportCreatePayload']>, ParentType, ContextType, RequireFields<MutationAnalyticsReportCreateArgs, 'input'>>;
  askPartnerReportFile?: Resolver<Maybe<ResolversTypes['AskPartnerReportFilePayload']>, ParentType, ContextType, RequireFields<MutationAskPartnerReportFileArgs, 'input'>>;
  channelCreate?: Resolver<Maybe<ResolversTypes['ChannelCreatePayload']>, ParentType, ContextType, RequireFields<MutationChannelCreateArgs, 'input'>>;
  clearCollectionMedias?: Resolver<Maybe<ResolversTypes['ClearCollectionMediasPayload']>, ParentType, ContextType, RequireFields<MutationClearCollectionMediasArgs, 'input'>>;
  clearLikedVideos?: Resolver<Maybe<ResolversTypes['ClearLikedVideosPayload']>, ParentType, ContextType, RequireFields<MutationClearLikedVideosArgs, 'input'>>;
  clearWatchLaterVideos?: Resolver<Maybe<ResolversTypes['ClearWatchLaterVideosPayload']>, ParentType, ContextType, RequireFields<MutationClearWatchLaterVideosArgs, 'input'>>;
  clearWatchedVideos?: Resolver<Maybe<ResolversTypes['ClearWatchedVideosPayload']>, ParentType, ContextType, RequireFields<MutationClearWatchedVideosArgs, 'input'>>;
  createBehaviorRule?: Resolver<Maybe<ResolversTypes['CreateBehaviorRulePayload']>, ParentType, ContextType, RequireFields<MutationCreateBehaviorRuleArgs, 'input'>>;
  createCollection?: Resolver<Maybe<ResolversTypes['CreateCollectionPayload']>, ParentType, ContextType, RequireFields<MutationCreateCollectionArgs, 'input'>>;
  createReaction?: Resolver<Maybe<ResolversTypes['ReactionPayload']>, ParentType, ContextType, RequireFields<MutationCreateReactionArgs, 'input'>>;
  createUser?: Resolver<Maybe<ResolversTypes['CreateUserPayload']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  createVideo?: Resolver<Maybe<ResolversTypes['CreateVideoPayload']>, ParentType, ContextType, RequireFields<MutationCreateVideoArgs, 'input'>>;
  deleteBehaviorRule?: Resolver<Maybe<ResolversTypes['DeleteBehaviorRulePayload']>, ParentType, ContextType, RequireFields<MutationDeleteBehaviorRuleArgs, 'input'>>;
  deleteReaction?: Resolver<Maybe<ResolversTypes['DeleteReactionPayload']>, ParentType, ContextType, RequireFields<MutationDeleteReactionArgs, 'input'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['DeleteUserPayload']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'input'>>;
  deleteVideo?: Resolver<Maybe<ResolversTypes['DeleteVideoPayload']>, ParentType, ContextType, RequireFields<MutationDeleteVideoArgs, 'input'>>;
  followChannel?: Resolver<Maybe<ResolversTypes['FollowChannelPayload']>, ParentType, ContextType, RequireFields<MutationFollowChannelArgs, 'input'>>;
  followChannels?: Resolver<Maybe<ResolversTypes['FollowChannelsPayload']>, ParentType, ContextType, RequireFields<MutationFollowChannelsArgs, 'input'>>;
  followTopic?: Resolver<Maybe<ResolversTypes['FollowTopicPayload']>, ParentType, ContextType, RequireFields<MutationFollowTopicArgs, 'input'>>;
  followTopics?: Resolver<Maybe<ResolversTypes['FollowTopicsPayload']>, ParentType, ContextType, RequireFields<MutationFollowTopicsArgs, 'input'>>;
  followedUserAdd?: Resolver<Maybe<ResolversTypes['FollowUserPayload']>, ParentType, ContextType, RequireFields<MutationFollowedUserAddArgs, 'input'>>;
  followedUserRemove?: Resolver<Maybe<ResolversTypes['UnfollowUserPayload']>, ParentType, ContextType, RequireFields<MutationFollowedUserRemoveArgs, 'input'>>;
  generateFileUploadUrl?: Resolver<Maybe<ResolversTypes['GenerateFileUploadUrlPayload']>, ParentType, ContextType, RequireFields<MutationGenerateFileUploadUrlArgs, 'input'>>;
  likeVideo?: Resolver<Maybe<ResolversTypes['LikeVideoPayload']>, ParentType, ContextType, RequireFields<MutationLikeVideoArgs, 'input'>>;
  moderationActionAppeal?: Resolver<Maybe<ResolversTypes['ModerationActionAppealPayload']>, ParentType, ContextType, RequireFields<MutationModerationActionAppealArgs, 'input'>>;
  notificationFollowedChannelUpdate?: Resolver<Maybe<ResolversTypes['NotificationFollowedChannelUpdatePayload']>, ParentType, ContextType, RequireFields<MutationNotificationFollowedChannelUpdateArgs, 'input'>>;
  pollAnswer?: Resolver<Maybe<ResolversTypes['PollAnswerPayload']>, ParentType, ContextType, RequireFields<MutationPollAnswerArgs, 'input'>>;
  reactionVideoCreate?: Resolver<Maybe<ResolversTypes['ReactionVideoPayload']>, ParentType, ContextType, RequireFields<MutationReactionVideoCreateArgs, 'input'>>;
  reactionVideoDelete?: Resolver<Maybe<ResolversTypes['ReactionVideoDeletePayload']>, ParentType, ContextType, RequireFields<MutationReactionVideoDeleteArgs, 'input'>>;
  reactionVideoUpdate?: Resolver<Maybe<ResolversTypes['ReactionVideoPayload']>, ParentType, ContextType, RequireFields<MutationReactionVideoUpdateArgs, 'input'>>;
  recoverPassword?: Resolver<Maybe<ResolversTypes['RecoverPasswordPayload']>, ParentType, ContextType, RequireFields<MutationRecoverPasswordArgs, 'input'>>;
  removeCollection?: Resolver<Maybe<ResolversTypes['RemoveCollectionPayload']>, ParentType, ContextType, RequireFields<MutationRemoveCollectionArgs, 'input'>>;
  removeCollectionVideo?: Resolver<Maybe<ResolversTypes['RemoveCollectionVideoPayload']>, ParentType, ContextType, RequireFields<MutationRemoveCollectionVideoArgs, 'input'>>;
  removeLike?: Resolver<Maybe<ResolversTypes['LikePayload']>, ParentType, ContextType, RequireFields<MutationRemoveLikeArgs, 'input'>>;
  removeWatchLaterVideo?: Resolver<Maybe<ResolversTypes['RemoveWatchLaterVideoPayload']>, ParentType, ContextType, RequireFields<MutationRemoveWatchLaterVideoArgs, 'input'>>;
  removeWatchedVideo?: Resolver<Maybe<ResolversTypes['RemoveWatchedVideoPayload']>, ParentType, ContextType, RequireFields<MutationRemoveWatchedVideoArgs, 'input'>>;
  reorderCollectionMedia?: Resolver<Maybe<ResolversTypes['ReorderCollectionMediaPayload']>, ParentType, ContextType, RequireFields<MutationReorderCollectionMediaArgs, 'input'>>;
  reportCreator?: Resolver<ResolversTypes['ReportCreatorPayload'], ParentType, ContextType, RequireFields<MutationReportCreatorArgs, 'input'>>;
  reportVideo?: Resolver<Maybe<ResolversTypes['ReportVideoPayload']>, ParentType, ContextType, RequireFields<MutationReportVideoArgs, 'input'>>;
  reporterEmailVerify?: Resolver<ResolversTypes['ReporterEmailVerifyPayload'], ParentType, ContextType, RequireFields<MutationReporterEmailVerifyArgs, 'input'>>;
  requestActivationCode?: Resolver<Maybe<ResolversTypes['RequestActivationCodePayload']>, ParentType, ContextType, RequireFields<MutationRequestActivationCodeArgs, 'input'>>;
  resetPassword?: Resolver<Maybe<ResolversTypes['ResetPasswordPayload']>, ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'input'>>;
  sendTransactionalEmail?: Resolver<Maybe<ResolversTypes['SendTransactionalEmailPayload']>, ParentType, ContextType, RequireFields<MutationSendTransactionalEmailArgs, 'input'>>;
  sendValidationEmail?: Resolver<Maybe<ResolversTypes['SendValidationEmailPayload']>, ParentType, ContextType, RequireFields<MutationSendValidationEmailArgs, 'input'>>;
  unfollowChannel?: Resolver<Maybe<ResolversTypes['UnfollowChannelPayload']>, ParentType, ContextType, RequireFields<MutationUnfollowChannelArgs, 'input'>>;
  unfollowTopic?: Resolver<Maybe<ResolversTypes['UnfollowTopicPayload']>, ParentType, ContextType, RequireFields<MutationUnfollowTopicArgs, 'input'>>;
  unlikeVideo?: Resolver<Maybe<ResolversTypes['UnlikeVideoPayload']>, ParentType, ContextType, RequireFields<MutationUnlikeVideoArgs, 'input'>>;
  updateBehaviorRule?: Resolver<Maybe<ResolversTypes['UpdateBehaviorRulePayload']>, ParentType, ContextType, RequireFields<MutationUpdateBehaviorRuleArgs, 'input'>>;
  updateChannel?: Resolver<Maybe<ResolversTypes['UpdateChannelPayload']>, ParentType, ContextType, RequireFields<MutationUpdateChannelArgs, 'input'>>;
  updateCollection?: Resolver<Maybe<ResolversTypes['UpdateCollectionPayload']>, ParentType, ContextType, RequireFields<MutationUpdateCollectionArgs, 'input'>>;
  updateNotificationSettingsEmail?: Resolver<Maybe<ResolversTypes['UpdateNotificationSettingsEmailPayload']>, ParentType, ContextType, RequireFields<MutationUpdateNotificationSettingsEmailArgs, 'input'>>;
  updateNotificationSettingsPush?: Resolver<Maybe<ResolversTypes['UpdateNotificationSettingsPushPayload']>, ParentType, ContextType, RequireFields<MutationUpdateNotificationSettingsPushArgs, 'input'>>;
  updateReaction?: Resolver<Maybe<ResolversTypes['ReactionPayload']>, ParentType, ContextType, RequireFields<MutationUpdateReactionArgs, 'input'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['UpdateUserPayload']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
  updateVideo?: Resolver<Maybe<ResolversTypes['UpdateVideoPayload']>, ParentType, ContextType, RequireFields<MutationUpdateVideoArgs, 'input'>>;
  userEmailChangeConfirm?: Resolver<Maybe<ResolversTypes['UserEmailChangeConfirmPayload']>, ParentType, ContextType, RequireFields<MutationUserEmailChangeConfirmArgs, 'input'>>;
  userEmailChangeRequest?: Resolver<Maybe<ResolversTypes['UserEmailChangeRequestPayload']>, ParentType, ContextType, RequireFields<MutationUserEmailChangeRequestArgs, 'input'>>;
  userEmailConfirmationCodeReset?: Resolver<Maybe<ResolversTypes['UserEmailConfirmationCodeResetPayload']>, ParentType, ContextType, RequireFields<MutationUserEmailConfirmationCodeResetArgs, 'input'>>;
  userEmailValidationTokenRequest?: Resolver<Maybe<ResolversTypes['UserEmailValidationTokenPayload']>, ParentType, ContextType, RequireFields<MutationUserEmailValidationTokenRequestArgs, 'input'>>;
  userInterestAdd?: Resolver<Maybe<ResolversTypes['UserInterestAddPayload']>, ParentType, ContextType, RequireFields<MutationUserInterestAddArgs, 'input'>>;
  userInterestRemove?: Resolver<Maybe<ResolversTypes['UserInterestRemovePayload']>, ParentType, ContextType, RequireFields<MutationUserInterestRemoveArgs, 'input'>>;
  userInterestsUpdate?: Resolver<Maybe<ResolversTypes['UserInterestsUpdatePayload']>, ParentType, ContextType, RequireFields<MutationUserInterestsUpdateArgs, 'input'>>;
  userOpenWebCodeBRequest?: Resolver<Maybe<ResolversTypes['UserOpenWebCodeBRequestPayload']>, ParentType, ContextType, RequireFields<MutationUserOpenWebCodeBRequestArgs, 'input'>>;
  watchedVideoAdd?: Resolver<Maybe<ResolversTypes['WatchedVideoAddPayload']>, ParentType, ContextType, RequireFields<MutationWatchedVideoAddArgs, 'input'>>;
};

export type NeonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Neon'] = ResolversParentTypes['Neon']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sections?: Resolver<Maybe<ResolversTypes['SectionConnection']>, ParentType, ContextType, RequireFields<NeonSectionsArgs, 'page' | 'space'>>;
  web?: Resolver<Maybe<ResolversTypes['Web']>, ParentType, ContextType, RequireFields<NeonWebArgs, 'uri'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Analytics' | 'AnalyticsGroupedPayloadItem' | 'AnalyticsReport' | 'Attribute' | 'Behavior' | 'BehaviorRuleTag' | 'Channel' | 'ChannelEngagementMetrics' | 'ChannelExternalLinks' | 'ChannelMetrics' | 'ChannelShareUrls' | 'ChannelStats' | 'ChannelStatsFollowers' | 'ChannelStatsReactions' | 'ChannelStatsVideos' | 'ChannelStatsViews' | 'Collection' | 'CollectionEngagementMetrics' | 'CollectionMetrics' | 'CollectionStats' | 'CollectionStatsVideos' | 'Comment' | 'CommentEngagementMetrics' | 'CommentMetrics' | 'CommentViewerEngagement' | 'ContentCategory' | 'Conversation' | 'Country' | 'CuratedCategory' | 'DailymotionAd' | 'EmailChangeRequest' | 'ExperimentMatch' | 'FallbackCountry' | 'Favorite' | 'FeatureMatch' | 'FeaturedContent' | 'FileUpload' | 'FollowedChannel' | 'FollowedTopic' | 'Follower' | 'FollowerEngagement' | 'Following' | 'FollowingChannelStartsLive' | 'FollowingChannelUploadsVideo' | 'FollowingStartsLive' | 'GeoblockedCountries' | 'Geoblocking' | 'Hashtag' | 'HashtagEngagementMetrics' | 'HashtagMetrics' | 'Image' | 'Interest' | 'Language' | 'Live' | 'LiveEngagementMetrics' | 'LiveMetrics' | 'LiveShareUrls' | 'LiveStats' | 'LiveStatsViews' | 'LiveStreams' | 'LiveViewerEngagement' | 'Localization' | 'LocalizationMe' | 'MediaModeration' | 'MediaTag' | 'MediaUploadInfo' | 'Metadata' | 'MonetizationInsights' | 'Neon' | 'NotificationSettings' | 'Organization' | 'OrganizationAnalysis' | 'OrganizationStats' | 'OrganizationStatsChannels' | 'Partner' | 'PartnerReportFile' | 'PartnerSpace' | 'Player' | 'PlayerQueue' | 'Poll' | 'PollOption' | 'PollShareUrls' | 'ProductUpdates' | 'Reaction' | 'ReactionEngagementMetrics' | 'ReactionMetrics' | 'ReactionShareUrls' | 'ReactionVideo' | 'ReactionVideoStats' | 'ReactionVideoStatsBookmarks' | 'ReactionVideoStatsFavorites' | 'ReactionVideoStatsLikes' | 'ReactionVideoStatsReactionVideos' | 'ReactionVideoStatsSaves' | 'ReactionViewerEngagement' | 'RecommendedRecording' | 'RemindUnwatchedVideos' | 'ReportFileDownloadLink' | 'Restriction' | 'Rule' | 'Search' | 'Section' | 'SharingURL' | 'Subdivision' | 'Subtitle' | 'Suggestion' | 'SupportedCountry' | 'SupportedLanguage' | 'Thumbnails' | 'Tips' | 'Topic' | 'TopicLabel' | 'TopicShareUrls' | 'TopicStats' | 'TopicStatsFollowers' | 'TopicStatsVideos' | 'TopicWhitelistStatus' | 'User' | 'UserInterest' | 'UserPollAnswer' | 'UserStats' | 'UserStatsCollections' | 'UserStatsFollowers' | 'UserStatsFollowingChannels' | 'UserStatsFollowingTopics' | 'UserStatsLikedVideos' | 'UserStatsReactionVideos' | 'UserStatsUploadedVideos' | 'UserStatsVideos' | 'UserStatsWatchLater' | 'UserStatsWatchedVideos' | 'Video' | 'VideoDigest' | 'VideoEngagementMetrics' | 'VideoMetrics' | 'VideoShareUrls' | 'VideoStats' | 'VideoStatsBookmarks' | 'VideoStatsFavorites' | 'VideoStatsLikes' | 'VideoStatsReactionVideos' | 'VideoStatsSaves' | 'VideoStatsViews' | 'VideoStreams' | 'VideoViewerEngagement' | 'Views' | 'Watch' | 'Web' | 'WebMetadata' | 'WebMetadataConnection', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type NotificationFollowedChannelUpdatePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotificationFollowedChannelUpdatePayload'] = ResolversParentTypes['NotificationFollowedChannelUpdatePayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotificationSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotificationSettings'] = ResolversParentTypes['NotificationSettings']> = {
  followingChannelStartsLive?: Resolver<Maybe<ResolversTypes['FollowingChannelStartsLive']>, ParentType, ContextType>;
  followingChannelUploadsVideo?: Resolver<Maybe<ResolversTypes['FollowingChannelUploadsVideo']>, ParentType, ContextType>;
  followingStartsLive?: Resolver<Maybe<ResolversTypes['FollowingStartsLive']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  monetizationInsights?: Resolver<Maybe<ResolversTypes['MonetizationInsights']>, ParentType, ContextType>;
  productUpdates?: Resolver<Maybe<ResolversTypes['ProductUpdates']>, ParentType, ContextType>;
  remindUnwatchedVideos?: Resolver<Maybe<ResolversTypes['RemindUnwatchedVideos']>, ParentType, ContextType>;
  tips?: Resolver<Maybe<ResolversTypes['Tips']>, ParentType, ContextType>;
  videoDigest?: Resolver<Maybe<ResolversTypes['VideoDigest']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']> = {
  analysis?: Resolver<Maybe<ResolversTypes['OrganizationAnalysis']>, ParentType, ContextType>;
  analytics?: Resolver<Maybe<ResolversTypes['Analytics']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['OrganizationCategory']>, ParentType, ContextType>;
  channels?: Resolver<Maybe<ResolversTypes['ChannelConnection']>, ParentType, ContextType, RequireFields<OrganizationChannelsArgs, 'first' | 'page'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['OrganizationStats']>, ParentType, ContextType>;
  userLimit?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  xid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationAnalysisResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationAnalysis'] = ResolversParentTypes['OrganizationAnalysis']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reports?: Resolver<ResolversTypes['AnalyticsReportConnection'], ParentType, ContextType, RequireFields<OrganizationAnalysisReportsArgs, 'page'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationConnection'] = ResolversParentTypes['OrganizationConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['OrganizationEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationEdge'] = ResolversParentTypes['OrganizationEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
  permission?: Resolver<Maybe<ResolversTypes['OrganizationPermission']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationPermissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationPermission'] = ResolversParentTypes['OrganizationPermission']> = {
  level?: Resolver<Maybe<ResolversTypes['OrganizationRole']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationStats'] = ResolversParentTypes['OrganizationStats']> = {
  channels?: Resolver<Maybe<ResolversTypes['OrganizationStatsChannels']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationStatsChannelsResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationStatsChannels'] = ResolversParentTypes['OrganizationStatsChannels']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nextPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PartnerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Partner'] = ResolversParentTypes['Partner']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  organizations?: Resolver<Maybe<ResolversTypes['OrganizationConnection']>, ParentType, ContextType, RequireFields<PartnerOrganizationsArgs, 'first' | 'page'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PartnerReportFileResolvers<ContextType = any, ParentType extends ResolversParentTypes['PartnerReportFile'] = ResolversParentTypes['PartnerReportFile']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  downloadLinks?: Resolver<Maybe<ResolversTypes['ReportFileDownloadLinkConnection']>, ParentType, ContextType, RequireFields<PartnerReportFileDownloadLinksArgs, 'page'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reportToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['PartnerReportStatus']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PartnerSpaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['PartnerSpace'] = ResolversParentTypes['PartnerSpace']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reportFile?: Resolver<Maybe<ResolversTypes['PartnerReportFile']>, ParentType, ContextType, RequireFields<PartnerSpaceReportFileArgs, 'reportToken'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  queue?: Resolver<Maybe<ResolversTypes['PlayerQueue']>, ParentType, ContextType, Partial<PlayerQueueArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerQueueResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlayerQueue'] = ResolversParentTypes['PlayerQueue']> = {
  hasAutoPlayNext?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  recordings?: Resolver<Maybe<ResolversTypes['RecommendedRecordingConnection']>, ParentType, ContextType, RequireFields<PlayerQueueRecordingsArgs, 'page'>>;
  videos?: Resolver<Maybe<ResolversTypes['VideoConnection']>, ParentType, ContextType, RequireFields<PlayerQueueVideosArgs, 'page'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PollResolvers<ContextType = any, ParentType extends ResolversParentTypes['Poll'] = ResolversParentTypes['Poll']> = {
  component?: Resolver<Maybe<ResolversTypes['Component']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['UserPollAnswer']>, ParentType, ContextType>;
  options?: Resolver<Array<ResolversTypes['PollOption']>, ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shareUrls?: Resolver<Maybe<ResolversTypes['PollShareUrls']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  voterCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PollAnswerPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['PollAnswerPayload'] = ResolversParentTypes['PollAnswerPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PollConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PollConnection'] = ResolversParentTypes['PollConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['PollEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PollEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PollEdge'] = ResolversParentTypes['PollEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Poll']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PollOptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PollOption'] = ResolversParentTypes['PollOption']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  voterCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PollShareUrlsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PollShareUrls'] = ResolversParentTypes['PollShareUrls']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  permalink?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  __resolveType: TypeResolveFn<'Collection' | 'Live' | 'Reaction' | 'ReactionVideo' | 'Video', ParentType, ContextType>;
};

export type PostConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostConnection'] = ResolversParentTypes['PostConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['PostEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostEdge'] = ResolversParentTypes['PostEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostEngagementMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostEngagementMetrics'] = ResolversParentTypes['PostEngagementMetrics']> = {
  __resolveType: TypeResolveFn<'LiveEngagementMetrics' | 'ReactionEngagementMetrics' | 'VideoEngagementMetrics', ParentType, ContextType>;
  bookmarks?: Resolver<Maybe<ResolversTypes['BookmarkMetricConnection']>, ParentType, ContextType, Partial<PostEngagementMetricsBookmarksArgs>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likes?: Resolver<Maybe<ResolversTypes['LikeMetricConnection']>, ParentType, ContextType, Partial<PostEngagementMetricsLikesArgs>>;
  reactions?: Resolver<Maybe<ResolversTypes['ReactionMetricConnection']>, ParentType, ContextType>;
};

export type PostMetricResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostMetric'] = ResolversParentTypes['PostMetric']> = {
  __resolveType: TypeResolveFn<'CollectionMetric' | 'LiveMetric' | 'ReactionMetric' | 'VideoMetric', ParentType, ContextType>;
};

export type PostMetricConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostMetricConnection'] = ResolversParentTypes['PostMetricConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['PostMetricEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostMetricEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostMetricEdge'] = ResolversParentTypes['PostMetricEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['PostMetric']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostMetrics'] = ResolversParentTypes['PostMetrics']> = {
  __resolveType: TypeResolveFn<'LiveMetrics' | 'ReactionMetrics' | 'VideoMetrics', ParentType, ContextType>;
  engagement?: Resolver<Maybe<ResolversTypes['PostEngagementMetrics']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type ProductUpdatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductUpdates'] = ResolversParentTypes['ProductUpdates']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isEmailEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  appealApplication?: Resolver<ResolversTypes['AppealApplication'], ParentType, ContextType, RequireFields<QueryAppealApplicationArgs, 'token'>>;
  behavior?: Resolver<Maybe<ResolversTypes['Behavior']>, ParentType, ContextType>;
  categories?: Resolver<Maybe<ResolversTypes['CategoryConnection']>, ParentType, ContextType, RequireFields<QueryCategoriesArgs, 'filter' | 'page'>>;
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType, Partial<QueryChannelArgs>>;
  channels?: Resolver<Maybe<ResolversTypes['ChannelConnection']>, ParentType, ContextType, RequireFields<QueryChannelsArgs, 'first' | 'page'>>;
  collection?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType, RequireFields<QueryCollectionArgs, 'xid'>>;
  collections?: Resolver<Maybe<ResolversTypes['CollectionConnection']>, ParentType, ContextType, RequireFields<QueryCollectionsArgs, 'first' | 'page'>>;
  contentFeed?: Resolver<Maybe<ResolversTypes['FeedPostConnection']>, ParentType, ContextType, RequireFields<QueryContentFeedArgs, 'first' | 'name' | 'page'>>;
  conversations?: Resolver<Maybe<ResolversTypes['ConversationConnection']>, ParentType, ContextType, RequireFields<QueryConversationsArgs, 'page'>>;
  featuredContent?: Resolver<Maybe<ResolversTypes['FeaturedContent']>, ParentType, ContextType>;
  feed?: Resolver<Maybe<ResolversTypes['PostConnection']>, ParentType, ContextType, RequireFields<QueryFeedArgs, 'first' | 'name' | 'page'>>;
  hashtag?: Resolver<Maybe<ResolversTypes['Hashtag']>, ParentType, ContextType, RequireFields<QueryHashtagArgs, 'id'>>;
  interests?: Resolver<Maybe<ResolversTypes['InterestConnection']>, ParentType, ContextType, RequireFields<QueryInterestsArgs, 'enabledOnly' | 'page'>>;
  live?: Resolver<Maybe<ResolversTypes['Live']>, ParentType, ContextType, RequireFields<QueryLiveArgs, 'xid'>>;
  liveStreams?: Resolver<Maybe<ResolversTypes['LiveStreamsConnection']>, ParentType, ContextType, RequireFields<QueryLiveStreamsArgs, 'first' | 'page'>>;
  lives?: Resolver<Maybe<ResolversTypes['LiveConnection']>, ParentType, ContextType, RequireFields<QueryLivesArgs, 'first' | 'page'>>;
  localization?: Resolver<Maybe<ResolversTypes['Localization']>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  media?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType, RequireFields<QueryMediaArgs, 'xid'>>;
  mediaStreams?: Resolver<Maybe<ResolversTypes['MediaStreamsConnection']>, ParentType, ContextType, RequireFields<QueryMediaStreamsArgs, 'first' | 'mediaXids' | 'page'>>;
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  partner?: Resolver<Maybe<ResolversTypes['PartnerSpace']>, ParentType, ContextType>;
  player?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<QueryPlayerArgs, 'embed'>>;
  poll?: Resolver<Maybe<ResolversTypes['Poll']>, ParentType, ContextType, RequireFields<QueryPollArgs, 'id'>>;
  polls?: Resolver<Maybe<ResolversTypes['PollConnection']>, ParentType, ContextType, RequireFields<QueryPollsArgs, 'first' | 'page'>>;
  reaction?: Resolver<Maybe<ResolversTypes['Reaction']>, ParentType, ContextType, RequireFields<QueryReactionArgs, 'xid'>>;
  reactionVideo?: Resolver<Maybe<ResolversTypes['ReactionVideo']>, ParentType, ContextType, RequireFields<QueryReactionVideoArgs, 'xid'>>;
  search?: Resolver<Maybe<ResolversTypes['Search']>, ParentType, ContextType>;
  supportedCountries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Country']>>>, ParentType, ContextType>;
  topic?: Resolver<Maybe<ResolversTypes['Topic']>, ParentType, ContextType, Partial<QueryTopicArgs>>;
  topics?: Resolver<Maybe<ResolversTypes['TopicConnection']>, ParentType, ContextType, RequireFields<QueryTopicsArgs, 'first' | 'page'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'xid'>>;
  video?: Resolver<Maybe<ResolversTypes['Video']>, ParentType, ContextType, RequireFields<QueryVideoArgs, 'xid'>>;
  videoOrLive?: Resolver<Maybe<ResolversTypes['VideoOrLive']>, ParentType, ContextType, RequireFields<QueryVideoOrLiveArgs, 'xid'>>;
  videoStreams?: Resolver<Maybe<ResolversTypes['VideoStreamsConnection']>, ParentType, ContextType, RequireFields<QueryVideoStreamsArgs, 'first' | 'page'>>;
  videos?: Resolver<Maybe<ResolversTypes['VideoConnection']>, ParentType, ContextType, RequireFields<QueryVideosArgs, 'first' | 'page'>>;
  views?: Resolver<Maybe<ResolversTypes['Views']>, ParentType, ContextType>;
};

export type ReactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reaction'] = ResolversParentTypes['Reaction']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hashtags?: Resolver<Maybe<ResolversTypes['HashtagConnection']>, ParentType, ContextType, RequireFields<ReactionHashtagsArgs, 'first' | 'page'>>;
  hlsURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isCommentsEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isReactionsEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  metrics?: Resolver<Maybe<ResolversTypes['ReactionMetrics']>, ParentType, ContextType>;
  opener?: Resolver<Maybe<ResolversTypes['Story']>, ParentType, ContextType>;
  reactions?: Resolver<Maybe<ResolversTypes['ReactionConnection']>, ParentType, ContextType, RequireFields<ReactionReactionsArgs, 'first' | 'page'>>;
  shareUrls?: Resolver<Maybe<ResolversTypes['ReactionShareUrls']>, ParentType, ContextType>;
  subtitles?: Resolver<Maybe<ResolversTypes['SubtitleConnection']>, ParentType, ContextType, RequireFields<ReactionSubtitlesArgs, 'autoGenerated' | 'page'>>;
  thumbnail?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<ReactionThumbnailArgs, 'height'>>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  viewerEngagement?: Resolver<Maybe<ResolversTypes['ReactionViewerEngagement']>, ParentType, ContextType>;
  xid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionConnection'] = ResolversParentTypes['ReactionConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['ReactionEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionEdge'] = ResolversParentTypes['ReactionEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Reaction']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionEngagementMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionEngagementMetrics'] = ResolversParentTypes['ReactionEngagementMetrics']> = {
  bookmarks?: Resolver<Maybe<ResolversTypes['BookmarkMetricConnection']>, ParentType, ContextType, Partial<ReactionEngagementMetricsBookmarksArgs>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likes?: Resolver<Maybe<ResolversTypes['LikeMetricConnection']>, ParentType, ContextType, Partial<ReactionEngagementMetricsLikesArgs>>;
  reactions?: Resolver<Maybe<ResolversTypes['ReactionMetricConnection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionMetricResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionMetric'] = ResolversParentTypes['ReactionMetric']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionMetricConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionMetricConnection'] = ResolversParentTypes['ReactionMetricConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['ReactionMetricEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionMetricEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionMetricEdge'] = ResolversParentTypes['ReactionMetricEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['ReactionMetric']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionMetrics'] = ResolversParentTypes['ReactionMetrics']> = {
  engagement?: Resolver<Maybe<ResolversTypes['VideoEngagementMetrics']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionPayload'] = ResolversParentTypes['ReactionPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reaction?: Resolver<Maybe<ResolversTypes['Reaction']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionShareUrlsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionShareUrls'] = ResolversParentTypes['ReactionShareUrls']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  permalink?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionVideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionVideo'] = ResolversParentTypes['ReactionVideo']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hashtags?: Resolver<Maybe<ResolversTypes['HashtagConnection']>, ParentType, ContextType, RequireFields<ReactionVideoHashtagsArgs, 'first' | 'page'>>;
  hlsURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isBookmarked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isCommentsEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isInWatchLater?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isLiked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isReacted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isReactionVideosEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['ReactionVideoStats']>, ParentType, ContextType>;
  subtitles?: Resolver<Maybe<ResolversTypes['SubtitleConnection']>, ParentType, ContextType, RequireFields<ReactionVideoSubtitlesArgs, 'autoGenerated' | 'first' | 'page'>>;
  thumbnail?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<ReactionVideoThumbnailArgs, 'height'>>;
  thumbnailURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<ReactionVideoThumbnailUrlArgs, 'size'>>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Video']>, ParentType, ContextType>;
  viewerEngagement?: Resolver<Maybe<ResolversTypes['ReactionViewerEngagement']>, ParentType, ContextType>;
  xid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionVideoConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionVideoConnection'] = ResolversParentTypes['ReactionVideoConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['ReactionVideoEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionVideoDeletePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionVideoDeletePayload'] = ResolversParentTypes['ReactionVideoDeletePayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionVideoEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionVideoEdge'] = ResolversParentTypes['ReactionVideoEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['ReactionVideo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionVideoPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionVideoPayload'] = ResolversParentTypes['ReactionVideoPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reactionVideo?: Resolver<Maybe<ResolversTypes['ReactionVideo']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionVideoStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionVideoStats'] = ResolversParentTypes['ReactionVideoStats']> = {
  bookmarks?: Resolver<Maybe<ResolversTypes['ReactionVideoStatsBookmarks']>, ParentType, ContextType>;
  favorites?: Resolver<Maybe<ResolversTypes['ReactionVideoStatsFavorites']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likes?: Resolver<Maybe<ResolversTypes['ReactionVideoStatsLikes']>, ParentType, ContextType>;
  reactionVideos?: Resolver<Maybe<ResolversTypes['ReactionVideoStatsReactionVideos']>, ParentType, ContextType>;
  saves?: Resolver<Maybe<ResolversTypes['ReactionVideoStatsSaves']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionVideoStatsBookmarksResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionVideoStatsBookmarks'] = ResolversParentTypes['ReactionVideoStatsBookmarks']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionVideoStatsFavoritesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionVideoStatsFavorites'] = ResolversParentTypes['ReactionVideoStatsFavorites']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionVideoStatsLikesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionVideoStatsLikes'] = ResolversParentTypes['ReactionVideoStatsLikes']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionVideoStatsReactionVideosResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionVideoStatsReactionVideos'] = ResolversParentTypes['ReactionVideoStatsReactionVideos']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionVideoStatsSavesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionVideoStatsSaves'] = ResolversParentTypes['ReactionVideoStatsSaves']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionViewerEngagementResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReactionViewerEngagement'] = ResolversParentTypes['ReactionViewerEngagement']> = {
  bookmarked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  favorited?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likeRating?: Resolver<Maybe<ResolversTypes['LikeRating']>, ParentType, ContextType>;
  liked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  reacted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  saved?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  watchCompleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  watchStarted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecommendedRecordingResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecommendedRecording'] = ResolversParentTypes['RecommendedRecording']> = {
  algorithm?: Resolver<Maybe<ResolversTypes['Algorithm']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  recording?: Resolver<Maybe<ResolversTypes['Recording']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecommendedRecordingConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecommendedRecordingConnection'] = ResolversParentTypes['RecommendedRecordingConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['RecommendedRecordingEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecommendedRecordingEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecommendedRecordingEdge'] = ResolversParentTypes['RecommendedRecordingEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['RecommendedRecording']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecordingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Recording'] = ResolversParentTypes['Recording']> = {
  __resolveType: TypeResolveFn<'Live' | 'Reaction' | 'Video', ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  reactions?: Resolver<Maybe<ResolversTypes['ReactionConnection']>, ParentType, ContextType, RequireFields<RecordingReactionsArgs, 'first' | 'page'>>;
  thumbnail?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<RecordingThumbnailArgs, 'height'>>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type RecoverPasswordPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecoverPasswordPayload'] = ResolversParentTypes['RecoverPasswordPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemindUnwatchedVideosResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemindUnwatchedVideos'] = ResolversParentTypes['RemindUnwatchedVideos']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isEmailEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isPushEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveCollectionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveCollectionPayload'] = ResolversParentTypes['RemoveCollectionPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveCollectionVideoPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveCollectionVideoPayload'] = ResolversParentTypes['RemoveCollectionVideoPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveWatchLaterVideoPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveWatchLaterVideoPayload'] = ResolversParentTypes['RemoveWatchLaterVideoPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveWatchedVideoPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveWatchedVideoPayload'] = ResolversParentTypes['RemoveWatchedVideoPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReorderCollectionMediaPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReorderCollectionMediaPayload'] = ResolversParentTypes['ReorderCollectionMediaPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReportCreatorPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReportCreatorPayload'] = ResolversParentTypes['ReportCreatorPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReportFileDownloadLinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReportFileDownloadLink'] = ResolversParentTypes['ReportFileDownloadLink']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReportFileDownloadLinkConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReportFileDownloadLinkConnection'] = ResolversParentTypes['ReportFileDownloadLinkConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['ReportFileDownloadLinkEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReportFileDownloadLinkEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReportFileDownloadLinkEdge'] = ResolversParentTypes['ReportFileDownloadLinkEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['ReportFileDownloadLink']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReportVideoPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReportVideoPayload'] = ResolversParentTypes['ReportVideoPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReporterEmailVerifyPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReporterEmailVerifyPayload'] = ResolversParentTypes['ReporterEmailVerifyPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RequestActivationCodePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RequestActivationCodePayload'] = ResolversParentTypes['RequestActivationCodePayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResetPasswordPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResetPasswordPayload'] = ResolversParentTypes['ResetPasswordPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RestrictionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Restriction'] = ResolversParentTypes['Restriction']> = {
  code?: Resolver<ResolversTypes['RestrictionCode'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Rule'] = ResolversParentTypes['Rule']> = {
  complexCondition?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  condition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creatorXid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  endAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  experiment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<ResolversTypes['BehaviorRuleTagConnection']>, ParentType, ContextType, RequireFields<RuleTagsArgs, 'page'>>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuleConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['RuleConnection'] = ResolversParentTypes['RuleConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['RuleEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuleEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['RuleEdge'] = ResolversParentTypes['RuleEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Rule']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResolvers<ContextType = any, ParentType extends ResolversParentTypes['Search'] = ResolversParentTypes['Search']> = {
  autosuggestions?: Resolver<Maybe<ResolversTypes['SuggestionConnection']>, ParentType, ContextType, RequireFields<SearchAutosuggestionsArgs, 'filter' | 'first' | 'page' | 'query'>>;
  channels?: Resolver<Maybe<ResolversTypes['ChannelConnection']>, ParentType, ContextType, RequireFields<SearchChannelsArgs, 'first' | 'page' | 'query'>>;
  collections?: Resolver<Maybe<ResolversTypes['CollectionConnection']>, ParentType, ContextType, RequireFields<SearchCollectionsArgs, 'first' | 'page' | 'query'>>;
  hashtags?: Resolver<Maybe<ResolversTypes['HashtagConnection']>, ParentType, ContextType, RequireFields<SearchHashtagsArgs, 'first' | 'page' | 'query'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lives?: Resolver<Maybe<ResolversTypes['LiveConnection']>, ParentType, ContextType, RequireFields<SearchLivesArgs, 'first' | 'page' | 'query'>>;
  topics?: Resolver<Maybe<ResolversTypes['TopicConnection']>, ParentType, ContextType, RequireFields<SearchTopicsArgs, 'first' | 'page' | 'query'>>;
  videos?: Resolver<Maybe<ResolversTypes['VideoConnection']>, ParentType, ContextType, RequireFields<SearchVideosArgs, 'first' | 'page' | 'query' | 'sort'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Section'] = ResolversParentTypes['Section']> = {
  components?: Resolver<Maybe<ResolversTypes['ComponentConnection']>, ParentType, ContextType, RequireFields<SectionComponentsArgs, 'page'>>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  groupingType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  relatedComponent?: Resolver<Maybe<ResolversTypes['Component']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SectionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SectionConnection'] = ResolversParentTypes['SectionConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['SectionEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SectionEdge'] = ResolversParentTypes['SectionEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Section']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SendTransactionalEmailPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendTransactionalEmailPayload'] = ResolversParentTypes['SendTransactionalEmailPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SendValidationEmailPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendValidationEmailPayload'] = ResolversParentTypes['SendValidationEmailPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShareUrlsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShareUrls'] = ResolversParentTypes['ShareUrls']> = {
  __resolveType: TypeResolveFn<'ChannelShareUrls' | 'LiveShareUrls' | 'PollShareUrls' | 'ReactionShareUrls' | 'TopicShareUrls' | 'VideoShareUrls', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  permalink?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type SharingUrlResolvers<ContextType = any, ParentType extends ResolversParentTypes['SharingURL'] = ResolversParentTypes['SharingURL']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  serviceName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SharingUrlConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SharingURLConnection'] = ResolversParentTypes['SharingURLConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['SharingURLEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SharingUrlEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SharingURLEdge'] = ResolversParentTypes['SharingURLEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['SharingURL']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Story'] = ResolversParentTypes['Story']> = {
  __resolveType: TypeResolveFn<'Channel' | 'Collection' | 'ContentCategory' | 'Hashtag' | 'Live' | 'Poll' | 'Reaction' | 'ReactionVideo' | 'Topic' | 'Video', ParentType, ContextType>;
};

export type SubdivisionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subdivision'] = ResolversParentTypes['Subdivision']> = {
  codeAlpha2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubtitleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subtitle'] = ResolversParentTypes['Subtitle']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['Language']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  xid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubtitleConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubtitleConnection'] = ResolversParentTypes['SubtitleConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['SubtitleEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubtitleEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubtitleEdge'] = ResolversParentTypes['SubtitleEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Subtitle']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SuggestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Suggestion'] = ResolversParentTypes['Suggestion']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SuggestionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SuggestionConnection'] = ResolversParentTypes['SuggestionConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['SuggestionEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SuggestionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SuggestionEdge'] = ResolversParentTypes['SuggestionEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Suggestion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SupportedCountryResolvers<ContextType = any, ParentType extends ResolversParentTypes['SupportedCountry'] = ResolversParentTypes['SupportedCountry']> = {
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['Language']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SupportedCountryConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SupportedCountryConnection'] = ResolversParentTypes['SupportedCountryConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['SupportedCountryEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SupportedCountryEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SupportedCountryEdge'] = ResolversParentTypes['SupportedCountryEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['SupportedCountry']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SupportedLanguageResolvers<ContextType = any, ParentType extends ResolversParentTypes['SupportedLanguage'] = ResolversParentTypes['SupportedLanguage']> = {
  countries?: Resolver<Maybe<ResolversTypes['CountryConnection']>, ParentType, ContextType, RequireFields<SupportedLanguageCountriesArgs, 'page'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['Language']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SupportedLanguageConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SupportedLanguageConnection'] = ResolversParentTypes['SupportedLanguageConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['SupportedLanguageEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SupportedLanguageEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SupportedLanguageEdge'] = ResolversParentTypes['SupportedLanguageEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['SupportedLanguage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThumbnailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Thumbnails'] = ResolversParentTypes['Thumbnails']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  x60?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  x240?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export type TipsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tips'] = ResolversParentTypes['Tips']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isEmailEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isPushEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicResolvers<ContextType = any, ParentType extends ResolversParentTypes['Topic'] = ResolversParentTypes['Topic']> = {
  collection?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType, Partial<TopicCollectionArgs>>;
  coverURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<TopicCoverUrlArgs, 'size'>>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isFollowed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  names?: Resolver<Maybe<ResolversTypes['TopicLabelConnection']>, ParentType, ContextType, RequireFields<TopicNamesArgs, 'page'>>;
  shareUrls?: Resolver<Maybe<ResolversTypes['TopicShareUrls']>, ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['TopicStats']>, ParentType, ContextType>;
  thumbnails?: Resolver<Maybe<ResolversTypes['Thumbnails']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videos?: Resolver<Maybe<ResolversTypes['VideoConnection']>, ParentType, ContextType, RequireFields<TopicVideosArgs, 'first' | 'page'>>;
  whitelistStatus?: Resolver<Maybe<ResolversTypes['TopicWhitelistStatus']>, ParentType, ContextType>;
  xid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicConnection'] = ResolversParentTypes['TopicConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['TopicEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicEdge'] = ResolversParentTypes['TopicEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Topic']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicLabelResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicLabel'] = ResolversParentTypes['TopicLabel']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['Language']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicLabelConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicLabelConnection'] = ResolversParentTypes['TopicLabelConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['TopicLabelEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicLabelEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicLabelEdge'] = ResolversParentTypes['TopicLabelEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['TopicLabel']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicShareUrlsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicShareUrls'] = ResolversParentTypes['TopicShareUrls']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  permalink?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicStats'] = ResolversParentTypes['TopicStats']> = {
  followers?: Resolver<Maybe<ResolversTypes['TopicStatsFollowers']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  videos?: Resolver<Maybe<ResolversTypes['TopicStatsVideos']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicStatsFollowersResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicStatsFollowers'] = ResolversParentTypes['TopicStatsFollowers']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicStatsVideosResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicStatsVideos'] = ResolversParentTypes['TopicStatsVideos']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicWhitelistStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicWhitelistStatus'] = ResolversParentTypes['TopicWhitelistStatus']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isWhitelisted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  mode?: Resolver<Maybe<ResolversTypes['TopicWhitelistStatusMode']>, ParentType, ContextType>;
  whitelistedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnfollowChannelPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnfollowChannelPayload'] = ResolversParentTypes['UnfollowChannelPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnfollowTopicPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnfollowTopicPayload'] = ResolversParentTypes['UnfollowTopicPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnfollowUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnfollowUserPayload'] = ResolversParentTypes['UnfollowUserPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnlikeVideoPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnlikeVideoPayload'] = ResolversParentTypes['UnlikeVideoPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateBehaviorRulePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateBehaviorRulePayload'] = ResolversParentTypes['UpdateBehaviorRulePayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rule?: Resolver<Maybe<ResolversTypes['Rule']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateChannelPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateChannelPayload'] = ResolversParentTypes['UpdateChannelPayload']> = {
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateCollectionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateCollectionPayload'] = ResolversParentTypes['UpdateCollectionPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  collection?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateNotificationSettingsEmailPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateNotificationSettingsEmailPayload'] = ResolversParentTypes['UpdateNotificationSettingsEmailPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notificationSettings?: Resolver<Maybe<ResolversTypes['NotificationSettings']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateNotificationSettingsPushPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateNotificationSettingsPushPayload'] = ResolversParentTypes['UpdateNotificationSettingsPushPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notificationSettings?: Resolver<Maybe<ResolversTypes['NotificationSettings']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateUserPayload'] = ResolversParentTypes['UpdateUserPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateVideoPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateVideoPayload'] = ResolversParentTypes['UpdateVideoPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Video']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  accountStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  accountType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  appleID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatarURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<UserAvatarUrlArgs, 'size'>>;
  birthday?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  canAccessPartnerHQ?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  canChangeNickname?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  canChangeUsername?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  collections?: Resolver<Maybe<ResolversTypes['CollectionConnection']>, ParentType, ContextType, RequireFields<UserCollectionsArgs, 'first' | 'page'>>;
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>;
  coverURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<UserCoverUrlArgs, 'size'>>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailChangeRequest?: Resolver<Maybe<ResolversTypes['EmailChangeRequest']>, ParentType, ContextType>;
  facebookID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  followedChannels?: Resolver<Maybe<ResolversTypes['FollowedChannelConnection']>, ParentType, ContextType, RequireFields<UserFollowedChannelsArgs, 'first' | 'page'>>;
  followedTopics?: Resolver<Maybe<ResolversTypes['FollowedTopicConnection']>, ParentType, ContextType, RequireFields<UserFollowedTopicsArgs, 'first' | 'page'>>;
  followers?: Resolver<Maybe<ResolversTypes['FollowerConnection']>, ParentType, ContextType, RequireFields<UserFollowersArgs, 'first' | 'page'>>;
  following?: Resolver<Maybe<ResolversTypes['FollowingConnection']>, ParentType, ContextType, RequireFields<UserFollowingArgs, 'first' | 'page'>>;
  followingChannels?: Resolver<Maybe<ResolversTypes['ChannelConnection']>, ParentType, ContextType, RequireFields<UserFollowingChannelsArgs, 'first' | 'page'>>;
  followingTopics?: Resolver<Maybe<ResolversTypes['TopicConnection']>, ParentType, ContextType, RequireFields<UserFollowingTopicsArgs, 'first' | 'page'>>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  googleplusID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasChannel?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hasLinkedSocialAccounts?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hasOrganizationMemberships?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  interests?: Resolver<Maybe<ResolversTypes['UserInterestConnection']>, ParentType, ContextType, RequireFields<UserInterestsArgs, 'enabledOnly' | 'page'>>;
  isAdmin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isConfirmed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isCopyrightOwnerMassReport?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isFollowed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['Language']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  likedMedias?: Resolver<Maybe<ResolversTypes['MediaConnection']>, ParentType, ContextType, RequireFields<UserLikedMediasArgs, 'first' | 'page'>>;
  likedVideos?: Resolver<Maybe<ResolversTypes['VideoConnection']>, ParentType, ContextType, RequireFields<UserLikedVideosArgs, 'first' | 'page'>>;
  microsoftID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nickname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notificationSettings?: Resolver<Maybe<ResolversTypes['NotificationSettings']>, ParentType, ContextType>;
  organizations?: Resolver<Maybe<ResolversTypes['OrganizationConnection']>, ParentType, ContextType, RequireFields<UserOrganizationsArgs, 'first' | 'page'>>;
  partner?: Resolver<Maybe<ResolversTypes['Partner']>, ParentType, ContextType>;
  reactionVideos?: Resolver<Maybe<ResolversTypes['ReactionVideoConnection']>, ParentType, ContextType, RequireFields<UserReactionVideosArgs, 'first' | 'page'>>;
  sharingURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['UserStats']>, ParentType, ContextType>;
  subscriptions?: Resolver<Maybe<ResolversTypes['VideoConnection']>, ParentType, ContextType, RequireFields<UserSubscriptionsArgs, 'first' | 'page' | 'type'>>;
  uploadedVideos?: Resolver<Maybe<ResolversTypes['VideoConnection']>, ParentType, ContextType, RequireFields<UserUploadedVideosArgs, 'first' | 'page'>>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  watchLater?: Resolver<Maybe<ResolversTypes['VideoConnection']>, ParentType, ContextType, RequireFields<UserWatchLaterArgs, 'first' | 'page'>>;
  watchLaterMedias?: Resolver<Maybe<ResolversTypes['MediaConnection']>, ParentType, ContextType, RequireFields<UserWatchLaterMediasArgs, 'first' | 'page'>>;
  watchedMedias?: Resolver<Maybe<ResolversTypes['MediaConnection']>, ParentType, ContextType, RequireFields<UserWatchedMediasArgs, 'first' | 'page'>>;
  watchedVideos?: Resolver<Maybe<ResolversTypes['VideoConnection']>, ParentType, ContextType, RequireFields<UserWatchedVideosArgs, 'first' | 'page'>>;
  xid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEmailChangeConfirmPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserEmailChangeConfirmPayload'] = ResolversParentTypes['UserEmailChangeConfirmPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEmailChangeRequestPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserEmailChangeRequestPayload'] = ResolversParentTypes['UserEmailChangeRequestPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEmailConfirmationCodeResetPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserEmailConfirmationCodeResetPayload'] = ResolversParentTypes['UserEmailConfirmationCodeResetPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEmailValidationTokenPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserEmailValidationTokenPayload'] = ResolversParentTypes['UserEmailValidationTokenPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailValidationToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserInterestResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserInterest'] = ResolversParentTypes['UserInterest']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  interest?: Resolver<Maybe<ResolversTypes['Interest']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserInterestAddPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserInterestAddPayload'] = ResolversParentTypes['UserInterestAddPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserInterestConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserInterestConnection'] = ResolversParentTypes['UserInterestConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['UserInterestEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserInterestEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserInterestEdge'] = ResolversParentTypes['UserInterestEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['UserInterest']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserInterestRemovePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserInterestRemovePayload'] = ResolversParentTypes['UserInterestRemovePayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserInterestsUpdatePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserInterestsUpdatePayload'] = ResolversParentTypes['UserInterestsUpdatePayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserOpenWebCodeBRequestPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserOpenWebCodeBRequestPayload'] = ResolversParentTypes['UserOpenWebCodeBRequestPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  codeB?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPollAnswerResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPollAnswer'] = ResolversParentTypes['UserPollAnswer']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  optionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserStats'] = ResolversParentTypes['UserStats']> = {
  collections?: Resolver<Maybe<ResolversTypes['UserStatsCollections']>, ParentType, ContextType>;
  followers?: Resolver<Maybe<ResolversTypes['UserStatsFollowers']>, ParentType, ContextType>;
  followingChannels?: Resolver<Maybe<ResolversTypes['UserStatsFollowingChannels']>, ParentType, ContextType>;
  followingTopics?: Resolver<Maybe<ResolversTypes['UserStatsFollowingTopics']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likedVideos?: Resolver<Maybe<ResolversTypes['UserStatsLikedVideos']>, ParentType, ContextType>;
  reactionVideos?: Resolver<Maybe<ResolversTypes['UserStatsReactionVideos']>, ParentType, ContextType>;
  uploadedVideos?: Resolver<Maybe<ResolversTypes['UserStatsUploadedVideos']>, ParentType, ContextType>;
  videos?: Resolver<Maybe<ResolversTypes['UserStatsVideos']>, ParentType, ContextType>;
  watchLater?: Resolver<Maybe<ResolversTypes['UserStatsWatchLater']>, ParentType, ContextType>;
  watchedVideos?: Resolver<Maybe<ResolversTypes['UserStatsWatchedVideos']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserStatsCollectionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserStatsCollections'] = ResolversParentTypes['UserStatsCollections']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserStatsFollowersResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserStatsFollowers'] = ResolversParentTypes['UserStatsFollowers']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserStatsFollowingChannelsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserStatsFollowingChannels'] = ResolversParentTypes['UserStatsFollowingChannels']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserStatsFollowingTopicsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserStatsFollowingTopics'] = ResolversParentTypes['UserStatsFollowingTopics']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserStatsLikedVideosResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserStatsLikedVideos'] = ResolversParentTypes['UserStatsLikedVideos']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserStatsReactionVideosResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserStatsReactionVideos'] = ResolversParentTypes['UserStatsReactionVideos']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserStatsUploadedVideosResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserStatsUploadedVideos'] = ResolversParentTypes['UserStatsUploadedVideos']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserStatsVideosResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserStatsVideos'] = ResolversParentTypes['UserStatsVideos']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserStatsWatchLaterResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserStatsWatchLater'] = ResolversParentTypes['UserStatsWatchLater']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserStatsWatchedVideosResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserStatsWatchedVideos'] = ResolversParentTypes['UserStatsWatchedVideos']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Video'] = ResolversParentTypes['Video']> = {
  allowEmbed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  aspectRatio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  bestAvailableQuality?: Resolver<Maybe<ResolversTypes['MediaQuality']>, ParentType, ContextType>;
  canDisplayAds?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  categories?: Resolver<Maybe<ResolversTypes['CategoryConnection']>, ParentType, ContextType, RequireFields<VideoCategoriesArgs, 'filter'>>;
  category?: Resolver<Maybe<ResolversTypes['MediaCategory']>, ParentType, ContextType>;
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  claimer?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  collections?: Resolver<Maybe<ResolversTypes['CollectionConnection']>, ParentType, ContextType, RequireFields<VideoCollectionsArgs, 'first' | 'page'>>;
  comments?: Resolver<Maybe<ResolversTypes['CommentConnection']>, ParentType, ContextType, RequireFields<VideoCommentsArgs, 'first' | 'page'>>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  curatedCategories?: Resolver<Maybe<ResolversTypes['CuratedCategoryConnection']>, ParentType, ContextType, RequireFields<VideoCuratedCategoriesArgs, 'page'>>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  embedHtml?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  embedURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  geoblockedCountries?: Resolver<Maybe<ResolversTypes['GeoblockedCountries']>, ParentType, ContextType>;
  geoblocking?: Resolver<Maybe<ResolversTypes['GeoblockingConnection']>, ParentType, ContextType, RequireFields<VideoGeoblockingArgs, 'page'>>;
  hasFingerprint?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hasPerspective?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hashtags?: Resolver<Maybe<ResolversTypes['HashtagConnection']>, ParentType, ContextType, RequireFields<VideoHashtagsArgs, 'first' | 'page'>>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hlsURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  interests?: Resolver<Maybe<ResolversTypes['InterestConnection']>, ParentType, ContextType, RequireFields<VideoInterestsArgs, 'page'>>;
  is360?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isAdvertisingBlocked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isBookmarked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isCommentsEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isCreatedForKids?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isDownloadable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isExplicit?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isInCollection?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<VideoIsInCollectionArgs, 'collectionXid'>>;
  isInWatchLater?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isLiked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isPasswordProtected?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isPrivate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isPublished?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isReacted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isReactionVideosEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isWatched?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isWatchedComplete?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['Language']>, ParentType, ContextType, RequireFields<VideoLanguageArgs, 'source'>>;
  metrics?: Resolver<Maybe<ResolversTypes['VideoMetrics']>, ParentType, ContextType>;
  moderation?: Resolver<Maybe<ResolversTypes['MediaModeration']>, ParentType, ContextType>;
  nextVideos?: Resolver<Maybe<ResolversTypes['VideoConnection']>, ParentType, ContextType, RequireFields<VideoNextVideosArgs, 'first' | 'page'>>;
  reactionVideos?: Resolver<Maybe<ResolversTypes['ReactionVideoConnection']>, ParentType, ContextType, RequireFields<VideoReactionVideosArgs, 'first' | 'page'>>;
  reactions?: Resolver<Maybe<ResolversTypes['ReactionConnection']>, ParentType, ContextType, RequireFields<VideoReactionsArgs, 'first' | 'page'>>;
  relatedVideos?: Resolver<Maybe<ResolversTypes['VideoConnection']>, ParentType, ContextType, RequireFields<VideoRelatedVideosArgs, 'first' | 'page'>>;
  restriction?: Resolver<Maybe<ResolversTypes['Restriction']>, ParentType, ContextType>;
  shareUrls?: Resolver<Maybe<ResolversTypes['VideoShareUrls']>, ParentType, ContextType>;
  sharingURLs?: Resolver<Maybe<ResolversTypes['SharingURLConnection']>, ParentType, ContextType, RequireFields<VideoSharingUrLsArgs, 'page'>>;
  spritesheet?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  spritesheetSeeker?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['VideoStats']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['VideoStatus']>, ParentType, ContextType>;
  subtitles?: Resolver<Maybe<ResolversTypes['SubtitleConnection']>, ParentType, ContextType, RequireFields<VideoSubtitlesArgs, 'autoGenerated' | 'first' | 'page'>>;
  tags?: Resolver<Maybe<ResolversTypes['MediaTagConnection']>, ParentType, ContextType, RequireFields<VideoTagsArgs, 'page'>>;
  thumbnail?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<VideoThumbnailArgs, 'height'>>;
  thumbnailURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<VideoThumbnailUrlArgs, 'size'>>;
  thumbnails?: Resolver<Maybe<ResolversTypes['Thumbnails']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topics?: Resolver<Maybe<ResolversTypes['TopicConnection']>, ParentType, ContextType, RequireFields<VideoTopicsArgs, 'first' | 'page' | 'whitelistedOnly'>>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  uploadInfo?: Resolver<Maybe<ResolversTypes['MediaUploadInfo']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  viewCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  viewerEngagement?: Resolver<Maybe<ResolversTypes['VideoViewerEngagement']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  xid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoConnection'] = ResolversParentTypes['VideoConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['VideoEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoDigestResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoDigest'] = ResolversParentTypes['VideoDigest']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isEmailEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isPushEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoEdge'] = ResolversParentTypes['VideoEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['Video']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoEngagementMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoEngagementMetrics'] = ResolversParentTypes['VideoEngagementMetrics']> = {
  bookmarks?: Resolver<Maybe<ResolversTypes['BookmarkMetricConnection']>, ParentType, ContextType, Partial<VideoEngagementMetricsBookmarksArgs>>;
  comments?: Resolver<Maybe<ResolversTypes['CommentMetricConnection']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likes?: Resolver<Maybe<ResolversTypes['LikeMetricConnection']>, ParentType, ContextType, Partial<VideoEngagementMetricsLikesArgs>>;
  reactions?: Resolver<Maybe<ResolversTypes['ReactionMetricConnection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoMetricResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoMetric'] = ResolversParentTypes['VideoMetric']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoMetricConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoMetricConnection'] = ResolversParentTypes['VideoMetricConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['VideoMetricEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoMetricEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoMetricEdge'] = ResolversParentTypes['VideoMetricEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['VideoMetric']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoMetrics'] = ResolversParentTypes['VideoMetrics']> = {
  engagement?: Resolver<Maybe<ResolversTypes['VideoEngagementMetrics']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoOrLiveResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoOrLive'] = ResolversParentTypes['VideoOrLive']> = {
  __resolveType: TypeResolveFn<'Live' | 'Video', ParentType, ContextType>;
};

export type VideoShareUrlsResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoShareUrls'] = ResolversParentTypes['VideoShareUrls']> = {
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  permalink?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoStats'] = ResolversParentTypes['VideoStats']> = {
  bookmarks?: Resolver<Maybe<ResolversTypes['VideoStatsBookmarks']>, ParentType, ContextType>;
  favorites?: Resolver<Maybe<ResolversTypes['VideoStatsFavorites']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likes?: Resolver<Maybe<ResolversTypes['VideoStatsLikes']>, ParentType, ContextType>;
  reactionVideos?: Resolver<Maybe<ResolversTypes['VideoStatsReactionVideos']>, ParentType, ContextType>;
  saves?: Resolver<Maybe<ResolversTypes['VideoStatsSaves']>, ParentType, ContextType>;
  views?: Resolver<Maybe<ResolversTypes['VideoStatsViews']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoStatsBookmarksResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoStatsBookmarks'] = ResolversParentTypes['VideoStatsBookmarks']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoStatsFavoritesResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoStatsFavorites'] = ResolversParentTypes['VideoStatsFavorites']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoStatsLikesResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoStatsLikes'] = ResolversParentTypes['VideoStatsLikes']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoStatsReactionVideosResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoStatsReactionVideos'] = ResolversParentTypes['VideoStatsReactionVideos']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoStatsSavesResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoStatsSaves'] = ResolversParentTypes['VideoStatsSaves']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoStatsViewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoStatsViews'] = ResolversParentTypes['VideoStatsViews']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoStreamsResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoStreams'] = ResolversParentTypes['VideoStreams']> = {
  audioURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  chromecastURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  h264URL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<VideoStreamsH264UrlArgs, 'quality'>>;
  hlsURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  previewURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<VideoStreamsPreviewUrlArgs, 'quality'>>;
  restriction?: Resolver<Maybe<ResolversTypes['Restriction']>, ParentType, ContextType>;
  xid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoStreamsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoStreamsConnection'] = ResolversParentTypes['VideoStreamsConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['VideoStreamsEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoStreamsEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoStreamsEdge'] = ResolversParentTypes['VideoStreamsEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['VideoStreams']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoViewerEngagementResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoViewerEngagement'] = ResolversParentTypes['VideoViewerEngagement']> = {
  bookmarked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  favorited?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likeRating?: Resolver<Maybe<ResolversTypes['LikeRating']>, ParentType, ContextType>;
  liked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  reacted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  saved?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  watchCompleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  watchStarted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ViewerEngagementResolvers<ContextType = any, ParentType extends ResolversParentTypes['ViewerEngagement'] = ResolversParentTypes['ViewerEngagement']> = {
  __resolveType: TypeResolveFn<'CommentViewerEngagement' | 'LiveViewerEngagement' | 'ReactionViewerEngagement' | 'VideoViewerEngagement', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likeRating?: Resolver<Maybe<ResolversTypes['LikeRating']>, ParentType, ContextType>;
  liked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
};

export type ViewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Views'] = ResolversParentTypes['Views']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  neon?: Resolver<Maybe<ResolversTypes['Neon']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WatchResolvers<ContextType = any, ParentType extends ResolversParentTypes['Watch'] = ResolversParentTypes['Watch']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WatchedVideoAddPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['WatchedVideoAddPayload'] = ResolversParentTypes['WatchedVideoAddPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebResolvers<ContextType = any, ParentType extends ResolversParentTypes['Web'] = ResolversParentTypes['Web']> = {
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isFollowable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['Language']>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['WebMetadataConnectionConnection']>, ParentType, ContextType, RequireFields<WebMetadataArgs, 'page'>>;
  metadatas?: Resolver<Maybe<Array<Maybe<ResolversTypes['WebMetadata']>>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebMetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebMetadata'] = ResolversParentTypes['WebMetadata']> = {
  attributes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Attribute']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebMetadataConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebMetadataConnection'] = ResolversParentTypes['WebMetadataConnection']> = {
  attributes?: Resolver<Maybe<ResolversTypes['AttributeConnection']>, ParentType, ContextType, RequireFields<WebMetadataConnectionAttributesArgs, 'page'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebMetadataConnectionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebMetadataConnectionConnection'] = ResolversParentTypes['WebMetadataConnectionConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['WebMetadataConnectionEdge']>>, ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebMetadataConnectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebMetadataConnectionEdge'] = ResolversParentTypes['WebMetadataConnectionEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['WebMetadataConnection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ActivateUserPayload?: ActivateUserPayloadResolvers<ContextType>;
  AddCollectionVideoPayload?: AddCollectionVideoPayloadResolvers<ContextType>;
  AddWatchLaterVideoPayload?: AddWatchLaterVideoPayloadResolvers<ContextType>;
  Algorithm?: AlgorithmResolvers<ContextType>;
  Analytics?: AnalyticsResolvers<ContextType>;
  AnalyticsFlatPayload?: AnalyticsFlatPayloadResolvers<ContextType>;
  AnalyticsGroupedPayload?: AnalyticsGroupedPayloadResolvers<ContextType>;
  AnalyticsGroupedPayloadItem?: AnalyticsGroupedPayloadItemResolvers<ContextType>;
  AnalyticsPayload?: AnalyticsPayloadResolvers<ContextType>;
  AnalyticsReport?: AnalyticsReportResolvers<ContextType>;
  AnalyticsReportConnection?: AnalyticsReportConnectionResolvers<ContextType>;
  AnalyticsReportCreatePayload?: AnalyticsReportCreatePayloadResolvers<ContextType>;
  AnalyticsReportEdge?: AnalyticsReportEdgeResolvers<ContextType>;
  Any?: GraphQLScalarType;
  AppealApplication?: AppealApplicationResolvers<ContextType>;
  AskPartnerReportFilePayload?: AskPartnerReportFilePayloadResolvers<ContextType>;
  Attribute?: AttributeResolvers<ContextType>;
  AttributeConnection?: AttributeConnectionResolvers<ContextType>;
  AttributeEdge?: AttributeEdgeResolvers<ContextType>;
  Behavior?: BehaviorResolvers<ContextType>;
  BehaviorRuleTag?: BehaviorRuleTagResolvers<ContextType>;
  BehaviorRuleTagConnection?: BehaviorRuleTagConnectionResolvers<ContextType>;
  BehaviorRuleTagEdge?: BehaviorRuleTagEdgeResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  BookmarkMetric?: BookmarkMetricResolvers<ContextType>;
  BookmarkMetricConnection?: BookmarkMetricConnectionResolvers<ContextType>;
  BookmarkMetricEdge?: BookmarkMetricEdgeResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  CategoryConnection?: CategoryConnectionResolvers<ContextType>;
  CategoryEdge?: CategoryEdgeResolvers<ContextType>;
  Channel?: ChannelResolvers<ContextType>;
  ChannelConnection?: ChannelConnectionResolvers<ContextType>;
  ChannelCreatePayload?: ChannelCreatePayloadResolvers<ContextType>;
  ChannelEdge?: ChannelEdgeResolvers<ContextType>;
  ChannelEngagementMetrics?: ChannelEngagementMetricsResolvers<ContextType>;
  ChannelExternalLinks?: ChannelExternalLinksResolvers<ContextType>;
  ChannelMetric?: ChannelMetricResolvers<ContextType>;
  ChannelMetricConnection?: ChannelMetricConnectionResolvers<ContextType>;
  ChannelMetricEdge?: ChannelMetricEdgeResolvers<ContextType>;
  ChannelMetrics?: ChannelMetricsResolvers<ContextType>;
  ChannelPermission?: ChannelPermissionResolvers<ContextType>;
  ChannelShareUrls?: ChannelShareUrlsResolvers<ContextType>;
  ChannelStats?: ChannelStatsResolvers<ContextType>;
  ChannelStatsFollowers?: ChannelStatsFollowersResolvers<ContextType>;
  ChannelStatsReactions?: ChannelStatsReactionsResolvers<ContextType>;
  ChannelStatsVideos?: ChannelStatsVideosResolvers<ContextType>;
  ChannelStatsViews?: ChannelStatsViewsResolvers<ContextType>;
  ClearCollectionMediasPayload?: ClearCollectionMediasPayloadResolvers<ContextType>;
  ClearLikedVideosPayload?: ClearLikedVideosPayloadResolvers<ContextType>;
  ClearWatchLaterVideosPayload?: ClearWatchLaterVideosPayloadResolvers<ContextType>;
  ClearWatchedVideosPayload?: ClearWatchedVideosPayloadResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  CollectionConnection?: CollectionConnectionResolvers<ContextType>;
  CollectionEdge?: CollectionEdgeResolvers<ContextType>;
  CollectionEngagementMetrics?: CollectionEngagementMetricsResolvers<ContextType>;
  CollectionMetric?: CollectionMetricResolvers<ContextType>;
  CollectionMetricConnection?: CollectionMetricConnectionResolvers<ContextType>;
  CollectionMetricEdge?: CollectionMetricEdgeResolvers<ContextType>;
  CollectionMetrics?: CollectionMetricsResolvers<ContextType>;
  CollectionStats?: CollectionStatsResolvers<ContextType>;
  CollectionStatsVideos?: CollectionStatsVideosResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  CommentConnection?: CommentConnectionResolvers<ContextType>;
  CommentEdge?: CommentEdgeResolvers<ContextType>;
  CommentEngagementMetrics?: CommentEngagementMetricsResolvers<ContextType>;
  CommentMetric?: CommentMetricResolvers<ContextType>;
  CommentMetricConnection?: CommentMetricConnectionResolvers<ContextType>;
  CommentMetricEdge?: CommentMetricEdgeResolvers<ContextType>;
  CommentMetrics?: CommentMetricsResolvers<ContextType>;
  CommentViewerEngagement?: CommentViewerEngagementResolvers<ContextType>;
  Component?: ComponentResolvers<ContextType>;
  ComponentConnection?: ComponentConnectionResolvers<ContextType>;
  ComponentEdge?: ComponentEdgeResolvers<ContextType>;
  Content?: ContentResolvers<ContextType>;
  ContentCategory?: ContentCategoryResolvers<ContextType>;
  Conversation?: ConversationResolvers<ContextType>;
  ConversationConnection?: ConversationConnectionResolvers<ContextType>;
  ConversationEdge?: ConversationEdgeResolvers<ContextType>;
  Country?: CountryResolvers<ContextType>;
  CountryConnection?: CountryConnectionResolvers<ContextType>;
  CountryEdge?: CountryEdgeResolvers<ContextType>;
  CreateBehaviorRulePayload?: CreateBehaviorRulePayloadResolvers<ContextType>;
  CreateCollectionPayload?: CreateCollectionPayloadResolvers<ContextType>;
  CreateUserPayload?: CreateUserPayloadResolvers<ContextType>;
  CreateVideoPayload?: CreateVideoPayloadResolvers<ContextType>;
  CuratedCategory?: CuratedCategoryResolvers<ContextType>;
  CuratedCategoryConnection?: CuratedCategoryConnectionResolvers<ContextType>;
  CuratedCategoryEdge?: CuratedCategoryEdgeResolvers<ContextType>;
  DailymotionAd?: DailymotionAdResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  DeleteBehaviorRulePayload?: DeleteBehaviorRulePayloadResolvers<ContextType>;
  DeleteReactionPayload?: DeleteReactionPayloadResolvers<ContextType>;
  DeleteUserPayload?: DeleteUserPayloadResolvers<ContextType>;
  DeleteVideoPayload?: DeleteVideoPayloadResolvers<ContextType>;
  EmailChangeRequest?: EmailChangeRequestResolvers<ContextType>;
  ExperimentMatch?: ExperimentMatchResolvers<ContextType>;
  ExperimentMatchConnection?: ExperimentMatchConnectionResolvers<ContextType>;
  ExperimentMatchEdge?: ExperimentMatchEdgeResolvers<ContextType>;
  FallbackCountry?: FallbackCountryResolvers<ContextType>;
  FallbackCountryConnection?: FallbackCountryConnectionResolvers<ContextType>;
  FallbackCountryEdge?: FallbackCountryEdgeResolvers<ContextType>;
  Favorite?: FavoriteResolvers<ContextType>;
  FeatureMatch?: FeatureMatchResolvers<ContextType>;
  FeatureMatchConnection?: FeatureMatchConnectionResolvers<ContextType>;
  FeatureMatchEdge?: FeatureMatchEdgeResolvers<ContextType>;
  FeaturedContent?: FeaturedContentResolvers<ContextType>;
  FeedPost?: FeedPostResolvers<ContextType>;
  FeedPostConnection?: FeedPostConnectionResolvers<ContextType>;
  FeedPostEdge?: FeedPostEdgeResolvers<ContextType>;
  FileUpload?: FileUploadResolvers<ContextType>;
  FollowChannelPayload?: FollowChannelPayloadResolvers<ContextType>;
  FollowChannelsPayload?: FollowChannelsPayloadResolvers<ContextType>;
  FollowTopicPayload?: FollowTopicPayloadResolvers<ContextType>;
  FollowTopicsPayload?: FollowTopicsPayloadResolvers<ContextType>;
  FollowUserPayload?: FollowUserPayloadResolvers<ContextType>;
  FollowedChannel?: FollowedChannelResolvers<ContextType>;
  FollowedChannelConnection?: FollowedChannelConnectionResolvers<ContextType>;
  FollowedChannelEdge?: FollowedChannelEdgeResolvers<ContextType>;
  FollowedTopic?: FollowedTopicResolvers<ContextType>;
  FollowedTopicConnection?: FollowedTopicConnectionResolvers<ContextType>;
  FollowedTopicEdge?: FollowedTopicEdgeResolvers<ContextType>;
  Follower?: FollowerResolvers<ContextType>;
  FollowerConnection?: FollowerConnectionResolvers<ContextType>;
  FollowerEdge?: FollowerEdgeResolvers<ContextType>;
  FollowerEngagement?: FollowerEngagementResolvers<ContextType>;
  FollowerEngagementNotifications?: FollowerEngagementNotificationsResolvers<ContextType>;
  Following?: FollowingResolvers<ContextType>;
  FollowingChannelStartsLive?: FollowingChannelStartsLiveResolvers<ContextType>;
  FollowingChannelUploadsVideo?: FollowingChannelUploadsVideoResolvers<ContextType>;
  FollowingConnection?: FollowingConnectionResolvers<ContextType>;
  FollowingEdge?: FollowingEdgeResolvers<ContextType>;
  FollowingStartsLive?: FollowingStartsLiveResolvers<ContextType>;
  GenerateFileUploadUrlPayload?: GenerateFileUploadUrlPayloadResolvers<ContextType>;
  GeoblockedCountries?: GeoblockedCountriesResolvers<ContextType>;
  Geoblocking?: GeoblockingResolvers<ContextType>;
  GeoblockingConnection?: GeoblockingConnectionResolvers<ContextType>;
  GeoblockingEdge?: GeoblockingEdgeResolvers<ContextType>;
  Hashtag?: HashtagResolvers<ContextType>;
  HashtagConnection?: HashtagConnectionResolvers<ContextType>;
  HashtagEdge?: HashtagEdgeResolvers<ContextType>;
  HashtagEngagementMetrics?: HashtagEngagementMetricsResolvers<ContextType>;
  HashtagMetrics?: HashtagMetricsResolvers<ContextType>;
  History?: HistoryResolvers<ContextType>;
  HistoryConnection?: HistoryConnectionResolvers<ContextType>;
  HistoryEdge?: HistoryEdgeResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Interest?: InterestResolvers<ContextType>;
  InterestConnection?: InterestConnectionResolvers<ContextType>;
  InterestEdge?: InterestEdgeResolvers<ContextType>;
  Language?: LanguageResolvers<ContextType>;
  LikeConnection?: LikeConnectionResolvers<ContextType>;
  LikeEdge?: LikeEdgeResolvers<ContextType>;
  LikeMetric?: LikeMetricResolvers<ContextType>;
  LikeMetricConnection?: LikeMetricConnectionResolvers<ContextType>;
  LikeMetricEdge?: LikeMetricEdgeResolvers<ContextType>;
  LikeNode?: LikeNodeResolvers<ContextType>;
  LikePayload?: LikePayloadResolvers<ContextType>;
  LikeVideoPayload?: LikeVideoPayloadResolvers<ContextType>;
  Live?: LiveResolvers<ContextType>;
  LiveConnection?: LiveConnectionResolvers<ContextType>;
  LiveEdge?: LiveEdgeResolvers<ContextType>;
  LiveEngagementMetrics?: LiveEngagementMetricsResolvers<ContextType>;
  LiveMetric?: LiveMetricResolvers<ContextType>;
  LiveMetricConnection?: LiveMetricConnectionResolvers<ContextType>;
  LiveMetricEdge?: LiveMetricEdgeResolvers<ContextType>;
  LiveMetrics?: LiveMetricsResolvers<ContextType>;
  LiveShareUrls?: LiveShareUrlsResolvers<ContextType>;
  LiveStats?: LiveStatsResolvers<ContextType>;
  LiveStatsViews?: LiveStatsViewsResolvers<ContextType>;
  LiveStreams?: LiveStreamsResolvers<ContextType>;
  LiveStreamsConnection?: LiveStreamsConnectionResolvers<ContextType>;
  LiveStreamsEdge?: LiveStreamsEdgeResolvers<ContextType>;
  LiveViewerEngagement?: LiveViewerEngagementResolvers<ContextType>;
  Localization?: LocalizationResolvers<ContextType>;
  LocalizationMe?: LocalizationMeResolvers<ContextType>;
  Media?: MediaResolvers<ContextType>;
  MediaConnection?: MediaConnectionResolvers<ContextType>;
  MediaEdge?: MediaEdgeResolvers<ContextType>;
  MediaModeration?: MediaModerationResolvers<ContextType>;
  MediaPublishingInfo?: MediaPublishingInfoResolvers<ContextType>;
  MediaStreams?: MediaStreamsResolvers<ContextType>;
  MediaStreamsConnection?: MediaStreamsConnectionResolvers<ContextType>;
  MediaStreamsEdge?: MediaStreamsEdgeResolvers<ContextType>;
  MediaTag?: MediaTagResolvers<ContextType>;
  MediaTagConnection?: MediaTagConnectionResolvers<ContextType>;
  MediaTagEdge?: MediaTagEdgeResolvers<ContextType>;
  MediaUploadInfo?: MediaUploadInfoResolvers<ContextType>;
  Metadata?: MetadataResolvers<ContextType>;
  Metric?: MetricResolvers<ContextType>;
  ModerationAction?: ModerationActionResolvers<ContextType>;
  ModerationActionAppealPayload?: ModerationActionAppealPayloadResolvers<ContextType>;
  MonetizationInsights?: MonetizationInsightsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Neon?: NeonResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  NotificationFollowedChannelUpdatePayload?: NotificationFollowedChannelUpdatePayloadResolvers<ContextType>;
  NotificationSettings?: NotificationSettingsResolvers<ContextType>;
  Organization?: OrganizationResolvers<ContextType>;
  OrganizationAnalysis?: OrganizationAnalysisResolvers<ContextType>;
  OrganizationConnection?: OrganizationConnectionResolvers<ContextType>;
  OrganizationEdge?: OrganizationEdgeResolvers<ContextType>;
  OrganizationPermission?: OrganizationPermissionResolvers<ContextType>;
  OrganizationStats?: OrganizationStatsResolvers<ContextType>;
  OrganizationStatsChannels?: OrganizationStatsChannelsResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Partner?: PartnerResolvers<ContextType>;
  PartnerReportFile?: PartnerReportFileResolvers<ContextType>;
  PartnerSpace?: PartnerSpaceResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  PlayerQueue?: PlayerQueueResolvers<ContextType>;
  Poll?: PollResolvers<ContextType>;
  PollAnswerPayload?: PollAnswerPayloadResolvers<ContextType>;
  PollConnection?: PollConnectionResolvers<ContextType>;
  PollEdge?: PollEdgeResolvers<ContextType>;
  PollOption?: PollOptionResolvers<ContextType>;
  PollShareUrls?: PollShareUrlsResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostConnection?: PostConnectionResolvers<ContextType>;
  PostEdge?: PostEdgeResolvers<ContextType>;
  PostEngagementMetrics?: PostEngagementMetricsResolvers<ContextType>;
  PostMetric?: PostMetricResolvers<ContextType>;
  PostMetricConnection?: PostMetricConnectionResolvers<ContextType>;
  PostMetricEdge?: PostMetricEdgeResolvers<ContextType>;
  PostMetrics?: PostMetricsResolvers<ContextType>;
  ProductUpdates?: ProductUpdatesResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reaction?: ReactionResolvers<ContextType>;
  ReactionConnection?: ReactionConnectionResolvers<ContextType>;
  ReactionEdge?: ReactionEdgeResolvers<ContextType>;
  ReactionEngagementMetrics?: ReactionEngagementMetricsResolvers<ContextType>;
  ReactionMetric?: ReactionMetricResolvers<ContextType>;
  ReactionMetricConnection?: ReactionMetricConnectionResolvers<ContextType>;
  ReactionMetricEdge?: ReactionMetricEdgeResolvers<ContextType>;
  ReactionMetrics?: ReactionMetricsResolvers<ContextType>;
  ReactionPayload?: ReactionPayloadResolvers<ContextType>;
  ReactionShareUrls?: ReactionShareUrlsResolvers<ContextType>;
  ReactionVideo?: ReactionVideoResolvers<ContextType>;
  ReactionVideoConnection?: ReactionVideoConnectionResolvers<ContextType>;
  ReactionVideoDeletePayload?: ReactionVideoDeletePayloadResolvers<ContextType>;
  ReactionVideoEdge?: ReactionVideoEdgeResolvers<ContextType>;
  ReactionVideoPayload?: ReactionVideoPayloadResolvers<ContextType>;
  ReactionVideoStats?: ReactionVideoStatsResolvers<ContextType>;
  ReactionVideoStatsBookmarks?: ReactionVideoStatsBookmarksResolvers<ContextType>;
  ReactionVideoStatsFavorites?: ReactionVideoStatsFavoritesResolvers<ContextType>;
  ReactionVideoStatsLikes?: ReactionVideoStatsLikesResolvers<ContextType>;
  ReactionVideoStatsReactionVideos?: ReactionVideoStatsReactionVideosResolvers<ContextType>;
  ReactionVideoStatsSaves?: ReactionVideoStatsSavesResolvers<ContextType>;
  ReactionViewerEngagement?: ReactionViewerEngagementResolvers<ContextType>;
  RecommendedRecording?: RecommendedRecordingResolvers<ContextType>;
  RecommendedRecordingConnection?: RecommendedRecordingConnectionResolvers<ContextType>;
  RecommendedRecordingEdge?: RecommendedRecordingEdgeResolvers<ContextType>;
  Recording?: RecordingResolvers<ContextType>;
  RecoverPasswordPayload?: RecoverPasswordPayloadResolvers<ContextType>;
  RemindUnwatchedVideos?: RemindUnwatchedVideosResolvers<ContextType>;
  RemoveCollectionPayload?: RemoveCollectionPayloadResolvers<ContextType>;
  RemoveCollectionVideoPayload?: RemoveCollectionVideoPayloadResolvers<ContextType>;
  RemoveWatchLaterVideoPayload?: RemoveWatchLaterVideoPayloadResolvers<ContextType>;
  RemoveWatchedVideoPayload?: RemoveWatchedVideoPayloadResolvers<ContextType>;
  ReorderCollectionMediaPayload?: ReorderCollectionMediaPayloadResolvers<ContextType>;
  ReportCreatorPayload?: ReportCreatorPayloadResolvers<ContextType>;
  ReportFileDownloadLink?: ReportFileDownloadLinkResolvers<ContextType>;
  ReportFileDownloadLinkConnection?: ReportFileDownloadLinkConnectionResolvers<ContextType>;
  ReportFileDownloadLinkEdge?: ReportFileDownloadLinkEdgeResolvers<ContextType>;
  ReportVideoPayload?: ReportVideoPayloadResolvers<ContextType>;
  ReporterEmailVerifyPayload?: ReporterEmailVerifyPayloadResolvers<ContextType>;
  RequestActivationCodePayload?: RequestActivationCodePayloadResolvers<ContextType>;
  ResetPasswordPayload?: ResetPasswordPayloadResolvers<ContextType>;
  Restriction?: RestrictionResolvers<ContextType>;
  Rule?: RuleResolvers<ContextType>;
  RuleConnection?: RuleConnectionResolvers<ContextType>;
  RuleEdge?: RuleEdgeResolvers<ContextType>;
  Search?: SearchResolvers<ContextType>;
  Section?: SectionResolvers<ContextType>;
  SectionConnection?: SectionConnectionResolvers<ContextType>;
  SectionEdge?: SectionEdgeResolvers<ContextType>;
  SendTransactionalEmailPayload?: SendTransactionalEmailPayloadResolvers<ContextType>;
  SendValidationEmailPayload?: SendValidationEmailPayloadResolvers<ContextType>;
  ShareUrls?: ShareUrlsResolvers<ContextType>;
  SharingURL?: SharingUrlResolvers<ContextType>;
  SharingURLConnection?: SharingUrlConnectionResolvers<ContextType>;
  SharingURLEdge?: SharingUrlEdgeResolvers<ContextType>;
  Story?: StoryResolvers<ContextType>;
  Subdivision?: SubdivisionResolvers<ContextType>;
  Subtitle?: SubtitleResolvers<ContextType>;
  SubtitleConnection?: SubtitleConnectionResolvers<ContextType>;
  SubtitleEdge?: SubtitleEdgeResolvers<ContextType>;
  Suggestion?: SuggestionResolvers<ContextType>;
  SuggestionConnection?: SuggestionConnectionResolvers<ContextType>;
  SuggestionEdge?: SuggestionEdgeResolvers<ContextType>;
  SupportedCountry?: SupportedCountryResolvers<ContextType>;
  SupportedCountryConnection?: SupportedCountryConnectionResolvers<ContextType>;
  SupportedCountryEdge?: SupportedCountryEdgeResolvers<ContextType>;
  SupportedLanguage?: SupportedLanguageResolvers<ContextType>;
  SupportedLanguageConnection?: SupportedLanguageConnectionResolvers<ContextType>;
  SupportedLanguageEdge?: SupportedLanguageEdgeResolvers<ContextType>;
  Thumbnails?: ThumbnailsResolvers<ContextType>;
  Time?: GraphQLScalarType;
  Tips?: TipsResolvers<ContextType>;
  Topic?: TopicResolvers<ContextType>;
  TopicConnection?: TopicConnectionResolvers<ContextType>;
  TopicEdge?: TopicEdgeResolvers<ContextType>;
  TopicLabel?: TopicLabelResolvers<ContextType>;
  TopicLabelConnection?: TopicLabelConnectionResolvers<ContextType>;
  TopicLabelEdge?: TopicLabelEdgeResolvers<ContextType>;
  TopicShareUrls?: TopicShareUrlsResolvers<ContextType>;
  TopicStats?: TopicStatsResolvers<ContextType>;
  TopicStatsFollowers?: TopicStatsFollowersResolvers<ContextType>;
  TopicStatsVideos?: TopicStatsVideosResolvers<ContextType>;
  TopicWhitelistStatus?: TopicWhitelistStatusResolvers<ContextType>;
  UnfollowChannelPayload?: UnfollowChannelPayloadResolvers<ContextType>;
  UnfollowTopicPayload?: UnfollowTopicPayloadResolvers<ContextType>;
  UnfollowUserPayload?: UnfollowUserPayloadResolvers<ContextType>;
  UnlikeVideoPayload?: UnlikeVideoPayloadResolvers<ContextType>;
  UpdateBehaviorRulePayload?: UpdateBehaviorRulePayloadResolvers<ContextType>;
  UpdateChannelPayload?: UpdateChannelPayloadResolvers<ContextType>;
  UpdateCollectionPayload?: UpdateCollectionPayloadResolvers<ContextType>;
  UpdateNotificationSettingsEmailPayload?: UpdateNotificationSettingsEmailPayloadResolvers<ContextType>;
  UpdateNotificationSettingsPushPayload?: UpdateNotificationSettingsPushPayloadResolvers<ContextType>;
  UpdateUserPayload?: UpdateUserPayloadResolvers<ContextType>;
  UpdateVideoPayload?: UpdateVideoPayloadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserEmailChangeConfirmPayload?: UserEmailChangeConfirmPayloadResolvers<ContextType>;
  UserEmailChangeRequestPayload?: UserEmailChangeRequestPayloadResolvers<ContextType>;
  UserEmailConfirmationCodeResetPayload?: UserEmailConfirmationCodeResetPayloadResolvers<ContextType>;
  UserEmailValidationTokenPayload?: UserEmailValidationTokenPayloadResolvers<ContextType>;
  UserInterest?: UserInterestResolvers<ContextType>;
  UserInterestAddPayload?: UserInterestAddPayloadResolvers<ContextType>;
  UserInterestConnection?: UserInterestConnectionResolvers<ContextType>;
  UserInterestEdge?: UserInterestEdgeResolvers<ContextType>;
  UserInterestRemovePayload?: UserInterestRemovePayloadResolvers<ContextType>;
  UserInterestsUpdatePayload?: UserInterestsUpdatePayloadResolvers<ContextType>;
  UserOpenWebCodeBRequestPayload?: UserOpenWebCodeBRequestPayloadResolvers<ContextType>;
  UserPollAnswer?: UserPollAnswerResolvers<ContextType>;
  UserStats?: UserStatsResolvers<ContextType>;
  UserStatsCollections?: UserStatsCollectionsResolvers<ContextType>;
  UserStatsFollowers?: UserStatsFollowersResolvers<ContextType>;
  UserStatsFollowingChannels?: UserStatsFollowingChannelsResolvers<ContextType>;
  UserStatsFollowingTopics?: UserStatsFollowingTopicsResolvers<ContextType>;
  UserStatsLikedVideos?: UserStatsLikedVideosResolvers<ContextType>;
  UserStatsReactionVideos?: UserStatsReactionVideosResolvers<ContextType>;
  UserStatsUploadedVideos?: UserStatsUploadedVideosResolvers<ContextType>;
  UserStatsVideos?: UserStatsVideosResolvers<ContextType>;
  UserStatsWatchLater?: UserStatsWatchLaterResolvers<ContextType>;
  UserStatsWatchedVideos?: UserStatsWatchedVideosResolvers<ContextType>;
  Video?: VideoResolvers<ContextType>;
  VideoConnection?: VideoConnectionResolvers<ContextType>;
  VideoDigest?: VideoDigestResolvers<ContextType>;
  VideoEdge?: VideoEdgeResolvers<ContextType>;
  VideoEngagementMetrics?: VideoEngagementMetricsResolvers<ContextType>;
  VideoMetric?: VideoMetricResolvers<ContextType>;
  VideoMetricConnection?: VideoMetricConnectionResolvers<ContextType>;
  VideoMetricEdge?: VideoMetricEdgeResolvers<ContextType>;
  VideoMetrics?: VideoMetricsResolvers<ContextType>;
  VideoOrLive?: VideoOrLiveResolvers<ContextType>;
  VideoShareUrls?: VideoShareUrlsResolvers<ContextType>;
  VideoStats?: VideoStatsResolvers<ContextType>;
  VideoStatsBookmarks?: VideoStatsBookmarksResolvers<ContextType>;
  VideoStatsFavorites?: VideoStatsFavoritesResolvers<ContextType>;
  VideoStatsLikes?: VideoStatsLikesResolvers<ContextType>;
  VideoStatsReactionVideos?: VideoStatsReactionVideosResolvers<ContextType>;
  VideoStatsSaves?: VideoStatsSavesResolvers<ContextType>;
  VideoStatsViews?: VideoStatsViewsResolvers<ContextType>;
  VideoStreams?: VideoStreamsResolvers<ContextType>;
  VideoStreamsConnection?: VideoStreamsConnectionResolvers<ContextType>;
  VideoStreamsEdge?: VideoStreamsEdgeResolvers<ContextType>;
  VideoViewerEngagement?: VideoViewerEngagementResolvers<ContextType>;
  ViewerEngagement?: ViewerEngagementResolvers<ContextType>;
  Views?: ViewsResolvers<ContextType>;
  Watch?: WatchResolvers<ContextType>;
  WatchedVideoAddPayload?: WatchedVideoAddPayloadResolvers<ContextType>;
  Web?: WebResolvers<ContextType>;
  WebMetadata?: WebMetadataResolvers<ContextType>;
  WebMetadataConnection?: WebMetadataConnectionResolvers<ContextType>;
  WebMetadataConnectionConnection?: WebMetadataConnectionConnectionResolvers<ContextType>;
  WebMetadataConnectionEdge?: WebMetadataConnectionEdgeResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  actAsPyEnum?: ActAsPyEnumDirectiveResolver<any, any, ContextType>;
  auth?: AuthDirectiveResolver<any, any, ContextType>;
  beta?: BetaDirectiveResolver<any, any, ContextType>;
  constraint?: ConstraintDirectiveResolver<any, any, ContextType>;
  depthLimit?: DepthLimitDirectiveResolver<any, any, ContextType>;
  hidden?: HiddenDirectiveResolver<any, any, ContextType>;
  nonIntrospectable?: NonIntrospectableDirectiveResolver<any, any, ContextType>;
  resetSeconds?: ResetSecondsDirectiveResolver<any, any, ContextType>;
  skipResolve?: SkipResolveDirectiveResolver<any, any, ContextType>;
  validateChoices?: ValidateChoicesDirectiveResolver<any, any, ContextType>;
  validateTimePeriodFrequency?: ValidateTimePeriodFrequencyDirectiveResolver<any, any, ContextType>;
  validateVideoTimeCode?: ValidateVideoTimeCodeDirectiveResolver<any, any, ContextType>;
};
