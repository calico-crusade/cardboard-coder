import { Injectable } from "@angular/core";
import { catchError, Observable, of, Subscription, tap, lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";

export class RxjsHandler<T> {
    
    private _subs: Subscription[] = [];
    private _raw!: Observable<T>;

    get raw() { return this._raw; }
    get promise() { return lastValueFrom(this.observable); }

    constructor(
        public observable: Observable<T>,
        public name?: string
    ) { this._raw = this.observable; }

    error(handler: (err: any) => void, def?: T) {
        this.observable = <any>this.observable
            .pipe(
                catchError(err => {
                    console.error('Error occurred during XHR: ', {
                        name: this.name,
                        error: err,
                        default: def
                    });
                    handler(err);
                    return of(def);
                })
            );
        return this;
    }

    tap(handler: (item: T) => void) {
        this.observable = this.observable.pipe(tap(t => handler(t)));
        return this;
    }

    subscribe(handler: (item: T) => void) { 
        const sub = this.observable.subscribe(t => {
            if (!environment.production)
                console.log('XHR Request Result', {
                    name: this.name,
                    results: t
                });
            handler(t);
        });
        this._subs.push(sub);
        return sub;
    }

    unsubscribe() {
        for(let sub of this._subs) sub.unsubscribe();
        this._subs = [];
    }
}

export class SubscriptionHandler {
    subscriptions: Subscription[] = [];

    subscribe<T>(obs: Observable<T>, handler: (item: T) => void, error?: (error: any) => void) {
        let o: Observable<T | undefined> = obs;
        if (error) {
            o = obs.pipe(
                catchError(err => {
                    console.error('An Error occurred', { err });
                    error(err);
                    return of(undefined)
                })
            );
        }

        const sub = o.subscribe(t => handler(<any>t));
        this.subscriptions.push(sub);
        return this;
    }

    unsubscribe() {
        for(let sub of this.subscriptions) sub.unsubscribe();
        this.subscriptions = [];
    }
}

export class StorageVar<T> {
    constructor(
        public defValue: T,
        public name: string,
        public fun?: (val?: T) => void
    ) { }

    get value(): T {
        const val = localStorage.getItem(this.name);

        return <any>this.convertType(val);
    }

    set value(item: T | undefined) {
        if (!item) {
            localStorage.removeItem(this.name);
            if (this.fun) this.fun(item);
            return;
        }

        localStorage.setItem(this.name, <any>item);
        if (this.fun) this.fun(item);
    }

    convertType(value?: string | null) {
        if (value === undefined || value === null) {
            return this.defValue;
        }

        switch(typeof this.defValue) {
            case 'string': return value;
            case 'number': return Number(value);
            case 'bigint': return BigInt(value);
            case 'boolean': return value === 'true';
        }

        let int = parseInt(value);
        if (!isNaN(int)) return int;

        if (value.toLocaleLowerCase() === 'true' ||
            value.toLocaleLowerCase() === 'false') return value === 'true';
        
        return value;
    }
}

@Injectable({ providedIn: 'root' })
export class UtilityService {

    sleep(seconds: number) {
        return new Promise<void>((resolve, _) => {
            setTimeout(() => {
                resolve();
            }, seconds * 1000);
        });
    }

    proxy(url: string, group: string = 'coder')  {
        var path = encodeURIComponent(url);
        return `https://cba-proxy.index-0.com/proxy?path=${path}&group=${group}`;
    }
}