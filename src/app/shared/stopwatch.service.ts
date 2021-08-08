import { Injectable, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { TimeValue } from "../stopwatch/timer-constants";

@Injectable({providedIn: 'root'})
export class StopwatchService implements OnInit {
    private TIMER = "TIMER";
    private DEFAULT = "DEFAULT";
    //TIMER schema: "name/mm:ss,mm:ss name/mm:ss,mm:ss,mm:ss,mm:ss"
    constructor(private cookieService: CookieService) {}
    ngOnInit() {
        this.getTimers();
    }
    public timers : Map<string, TimeValue[]> = new  Map();
    
    private getTimers() {
        if(this.cookieService.check(this.TIMER)) {
            let timers = this.cookieService.get(this.TIMER).split(' ').map(v => {
                let timer = v.split('/');
                let values = timer[1].split(',').map(d => {
                    const v = d.split(':')
                    const m = +v[0];
                    const s = +v[1];
                    return new TimeValue(m, s);
                });
                this.timers.set(timer[0], values);
                return values;
            })
        }
    }

    public setDefault(name: string) {
        if(this.timers.get(name)) {
            this.cookieService.set(this.DEFAULT, name);
        }
    }

    public getDefaultTimer() : TimeValue[] {  
        this.getTimers();
        if(this.cookieService.check(this.DEFAULT)){
            return this.timers.get(this.cookieService.get(this.DEFAULT)) as TimeValue[];
        }
        return [];
    }

    public saveTimers(timerName: string, timers : TimeValue[]) : void {
        //TODO...save everything...not just the last damn thing
        timerName = timerName.split("").reduce((p,c) => {
            if(c===" " || c==="/" || c===":") return p+"-";
            return p+c;
        }, "");
        let value = timers.reduce((prev, curr) => {
            return prev + curr.minutes.toString() + ":" + curr.seconds.toString() + ",";
        }, "");
        value = timerName + "/" + value.substring(0,value.length-1); 
        console.log(value);
        this.cookieService.set(this.TIMER, value, 1000);
        this.getTimers();
    }
}