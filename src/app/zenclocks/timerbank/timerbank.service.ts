import { Time } from "@angular/common";
import { Injectable, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, Observable } from "rxjs";
import { TimerSet, TimeValue } from "../shared/timer-constants";

@Injectable({providedIn: 'root'})
export class TimerbankService {
    private TIMERSETS = "TIMERSETS";
    private CURRENTSET = "CURRENTSET";

    private defaultCurrentSet : TimerSet = {name: "defaultCurrentSet", timers: [new TimeValue(1,0)]};
    public currentSet$ = new BehaviorSubject<TimerSet>({name: "", timers: []});

    public timerBank$ = new BehaviorSubject<TimerSet[]>([]);

    constructor(private cookieService: CookieService) {
        this.loadTimerSets();
        this.configureAutoSaveTimerSets();
    }

    private loadTimerSets() : void {
        const bankCookie = this.cookieService.get(this.TIMERSETS);
        const currentSetCookie = this.cookieService.get(this.CURRENTSET);
        const bank = bankCookie ? JSON.parse(bankCookie) as TimerSet[] : [];
        const currentSet = currentSetCookie ? JSON.parse(currentSetCookie) as TimerSet : this.defaultCurrentSet;

        this.timerBank$.next(bank);
        this.currentSet$.next(currentSet);
    }

    private configureAutoSaveTimerSets() {
        this.timerBank$.subscribe(bank => {
            this.cookieService.set(this.TIMERSETS, JSON.stringify(bank), 1000);
        });
        this.currentSet$.subscribe(set => {
            this.cookieService.set(this.CURRENTSET, JSON.stringify(set), 1000);
        })
    }

    public getCurrent() : TimerSet {
        return this.currentSet$.value;
    }
    
    public deleteSet(name: string) : boolean {
        const index = this.getSetIndex(name);
        if(index >= 0 && this.timerBank$.value.length > 1) {
            this.timerBank$.value.splice(this.getSetIndex(name), 1);
            if(this.currentSet$.value.name === name) {
                this.currentSet$.next(this.timerBank$.value[0]);
            }
            return true;
        }
        return false;
    }

    public saveSet(set: TimerSet) : boolean {
        if(!set.name || this.getSetIndex(set.name) >= 0) return false;
        let newSets = this.timerBank$.value.concat(set);
        this.timerBank$.next(newSets);
        this.currentSet$.next(set);
        return true;
    }

    public updateSet(set: TimerSet) {
        let sets = this.timerBank$.value;
        sets[this.getSetIndex(set.name)] = set;
        this.timerBank$.next(sets)
    }

    private getSetIndex(name: string) : number {
        return this.timerBank$.value.findIndex(set => set.name === name);
    }
}