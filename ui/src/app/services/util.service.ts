import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UtilityService {

    proxy(url: string, group: string = 'coder')  {
        var path = encodeURIComponent(url);
        return `https://cba-proxy.index-0.com/proxy?path=${path}&group=${group}`;
    }
}