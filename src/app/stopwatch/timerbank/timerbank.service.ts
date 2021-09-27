import { Time } from "@angular/common";
import { Injectable, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, Observable } from "rxjs";
import { DashboardService } from "../dashboard/dashboard.service";
import { Timerbank, TimerSet, TimeValue } from "../timer-constants";

@Injectable({providedIn: 'root'})
export class TimerbankService {
    private TIMERSETS = "TIMERSETS";

    private defaultSet = {name: "default", timers: [new TimeValue(1,0)]};
 
    public timerBank$ = new BehaviorSubject<Timerbank>({current: this.defaultSet, sets: []});

    constructor(private cookieService: CookieService, private dashboardService: DashboardService) {
        this.loadTimerSets();
        this.configurePostTimerSets();
    }

    private loadTimerSets() : void {
        let cookie = this.cookieService.get(this.TIMERSETS);
        let bank = cookie ? JSON.parse(cookie) as Timerbank : this.timerBank$.value;

        this.timerBank$.next(bank);
        this.dashboardService.currentSet$.next(bank.current);
    }

    private configurePostTimerSets() {
        this.timerBank$.subscribe(bank => {
            this.cookieService.set(this.TIMERSETS, JSON.stringify(bank), 1000);
        });
        this.dashboardService.currentSet$.subscribe(set => {
            let bank : Timerbank = {current: set, sets: this.timerBank$.value.sets};
            this.cookieService.set(this.TIMERSETS, JSON.stringify(bank), 1000);
        })
    }

    public getCurrent() : TimerSet {
        return this.timerBank$.value.current;
    }
    
    public deleteSet(name: string) : boolean {
        const index = this.getSetIndex(name);
        if(index >= 0 && this.timerBank$.value.sets.length > 1) {
            this.timerBank$.value.sets.splice(this.getSetIndex(name), 1);
            if(this.dashboardService.currentSet$.value.name === name) {
                this.dashboardService.currentSet$.next(this.timerBank$.value.sets[0]);
            }
            
            return true;
        }
        return false;
    }

    public saveSet(set: TimerSet) : boolean {
        if(!set.name || this.getSetIndex(set.name) >= 0) return false;
        let newSets = this.timerBank$.value.sets.concat(set);
        this.timerBank$.next({current: set, sets: newSets});
        return true;
    }

    private getSetIndex(name: string) : number {
        return this.timerBank$.value.sets.findIndex(set => set.name === name);
    }
}