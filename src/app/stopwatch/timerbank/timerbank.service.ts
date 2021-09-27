import { Time } from "@angular/common";
import { Injectable, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, Observable } from "rxjs";
import { Timerbank, TimerSet, TimeValue } from "../timer-constants";

@Injectable({providedIn: 'root'})
export class TimerbankService {
    private TIMERSETS = "TIMERSETS";
    private defaultSet = {name: "default", timers: [new TimeValue(1,0)]};
 
    public timerBank$ = new BehaviorSubject<Timerbank>({current: this.defaultSet, sets: []});

    constructor(private cookieService: CookieService) {
        this.loadTimerSets();
        this.configurePostTimerSets();
    }

    private loadTimerSets() : void {
        let cookie = this.cookieService.get(this.TIMERSETS);
        let bank = cookie ? JSON.parse(cookie) as Timerbank : this.timerBank$.value;
        // if(cookie) {
        //     for(let i = 0; i < bank.sets.length; i++) {
        //         for(let j = 0; j < bank.sets[i].timers.length; j++) {
        //             bank.sets[i].timers[j] = bank.sets[i].timers[j] as TimeValue;
        //         }
        //     }
        //     bank.default?.timers.map(timer => timer as TimeValue);
        //     bank.current.timers = bank.current.timers.map(timer => timer as TimeValue);
        // }
        this.timerBank$.next(bank);
    }

    private configurePostTimerSets() {
        this.timerBank$.subscribe(bank => {
            this.cookieService.set(this.TIMERSETS, JSON.stringify(bank), 1000);
        })
    }
    
    public setDefault(name: string) {
        const timersetIndex = this.getSetIndex(name);
        if(timersetIndex >= 0) {
            let newDefault = this.timerBank$.value.sets[timersetIndex];
            this.timerBank$.next({current: this.timerBank$.value.current, default: newDefault, sets: this.timerBank$.value.sets});
        }
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