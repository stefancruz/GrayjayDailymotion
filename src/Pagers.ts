export class SearchPagerAll extends VideoPager {
    cb: Function;

    constructor(results: PlatformVideo[], hasMore: boolean, params: any, page: number, cb: Function) {
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
    cb: Function;
    constructor(context: any, results: PlatformVideo[], hasNextPage: boolean, cb: Function) {
        super(results, hasNextPage, context);
        this.cb = cb;
    }

    nextPage() {
        return this.cb(this.context)
    }
}


export class ChannelPlaylistPager extends PlaylistPager {
    cb: Function;
    constructor(results: [], hasMore: boolean, params: any, page: number, cb: Function) {
        super(results, hasMore, { params, page });
        this.cb = cb;
    }

    nextPage() {

        this.context.page += 1;

        return this.cb(this.context.params.url, this.context.page)
    }
}

export class SearchPlaylistPager extends PlaylistPager {
    cb: Function;
    constructor(results: PlatformPlaylist[], hasMore: boolean, params: any, page: number, cb: Function) {
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