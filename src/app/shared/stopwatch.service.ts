import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { TimeValue } from "../stopwatch/timer-constants";

@Injectable({providedIn: 'root'})
export class StopwatchService {
    private TIMER = "TIMER";

    constructor(private cookieService: CookieService) {}
    
    //1:1,
    public getTimers() : TimeValue[] {
        if(this.cookieService.check(this.TIMER)) {
            return this.cookieService.get(this.TIMER).split(',').map(d => {
                const v = d.split(':')
                const m = +v[0];
                const s = +v[1];
                return new TimeValue(m, s);
            });
        }
        return [];
    }

    public saveTimers(timers : TimeValue[]) : void {
        const value = timers.reduce((prev, curr) => {
            return prev + curr.minutes.toString() + ":" + curr.seconds.toString() + ",";
        }, "");
        this.cookieService.set(this.TIMER, value.substring(0,value.length-1));
    }
}