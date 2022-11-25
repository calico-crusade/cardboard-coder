import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { UtilityService } from '../services';

@Directive({
  selector: 'img[proxy]'
})
export class ImageProxyDirective {
    private _proxy?: string;
    private _group?: string;
    private _force: boolean = false;

    @HostBinding('src') @Input() src?: string;

    @Input() 
    set group(value: string | undefined) { this._group = value; this.process(); }
    get group() { return this._group; }

    @Input() 
    set proxy(value: string | undefined) { this._proxy = value; this.process(); }
    get proxy() { return this._proxy; }


    @Input()
    set force(value: boolean) { this._force = value; this.process(); }
    get force() { return this._force; }

    constructor(
        private util: UtilityService
    ) { }

    @HostListener('error')
    onError() { this.process(true); }

    private process(isError: boolean = false) {
        if (!isError && !this.force) return;
        if (!this.src) return;

        this.src = this.util.proxy(this.src, this.group);
    }
}
