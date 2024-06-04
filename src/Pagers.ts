export class SearchPagerAll extends VideoPager {
    /**
     * @param {import("./types.d.ts").SearchContext} context the query params
     * @param {(PlatformVideo | PlatformChannel)[]} results the initial results
    */
    cb: any;
    constructor(results, hasMore, params, page, cb) {
        super(results, hasMore, { params, page });
        this.cb = cb;
    }

    nextPage() {

        this.context.page = this.context.page + 1

        const opts = {
            q: this.context.params.query,
            sort: this.context.params.sort,
            page: this.context.page,
            filters: this.context.params.filters
        };

        return this.cb(opts);
    }
}

export class SearchChannelPager extends ChannelPager {
    cb: any;
    constructor(results, hasNextPage, params, page, cb) {
        super(results, hasNextPage, { params, page })
        this.cb = cb;
    }

    nextPage() {
        const opts = { q: this.context.params.query, page: this.context.page += 1 };
        return this.cb(opts);
    }
}



export class ChannelVideoPager extends VideoPager {
    /**
     * @param {import("./types.d.ts").URLContext} context the context
     * @param {PlatformVideo[]} results the initial results
     * @param {boolean} hasNextPage if there is a next page
     */
    cb: any;
    constructor(context, results, hasNextPage, cb) {
        super(results, hasNextPage, context);
        this.cb = cb;
    }

    nextPage() {
        return this.cb(this.context)
    }
}


export class SearchPlaylistPager extends VideoPager {
    /**
     * @param {import("./types.d.ts").SearchContext} context the query params
     * @param {(PlatformVideo | PlatformChannel)[]} results the initial results
    */
    cb: any;
    constructor(results, hasMore, params, page, cb) {
        super(results, hasMore, { params, page });
        this.cb = cb;
    }

    nextPage() {

        this.context.page = this.context.page + 1

        const opts = {
            q: this.context.params.query,
            sort: this.context.params.sort,
            page: this.context.page,
            filters: this.context.params.filters
        };

        // return searchPlaylists(opts);
        return this.cb(opts)
    }
}