export class SearchPagerAll extends VideoPager {
    cb: (opts: any) => VideoPager;

    constructor(results: PlatformVideo[], hasMore: boolean, params: any, page: number, cb: (opts: any) => VideoPager) {
        super(results, hasMore, { params, page });
        this.cb = cb;
    }

    nextPage() {
        this.context.page += 1;

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


export class ChannelPlaylistPager extends PlaylistPager {
    cb: Function;
    constructor(results, hasMore: false, params: any, page: number, cb: Function) {
        super(results, hasMore, { params, page });
        this.cb = cb;
    }

    nextPage() {

        this.context.page = this.context.page + 1;

        return this.cb(this.context.params.url, this.context.page)
    }
}

export class SearchPlaylistPager extends VideoPager {
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

        return this.cb(opts)
    }
}