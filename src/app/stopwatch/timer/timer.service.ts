import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, interval, NEVER, Observable } from "rxjs";
import { map, tap, switchMap, mapTo, scan, startWith, takeWhile, filter } from "rxjs/internal/operators";
import { TimerEvent, TimeValue } from "../timer-constants";

@Injectable({providedIn: "root"})
export class TimerService {
    private clock!: Observable<number>;
    public timeEvents$ = new BehaviorSubject<TimerEvent>(TimerEvent.PAUSE);
    //public timeEvents$ = this.timeEvents.asObservable();
    
    public timeValues$ = new BehaviorSubject<TimeValue>({} as TimeValue);
    //public timeValues$ = this.timeValues.asObservable();

    public getClock(minutes: number, seconds: number) : Observable<number> {
        if(!this.clock) {
            this.clock = this.initClock(minutes, seconds);
        }
        this.timeValues$.next(new TimeValue(minutes, seconds));
        this.timeEvents$.next(TimerEvent.PAUSE);
        return this.clock;
    }

    private initClock(minutes: number, seconds: number) : Observable<number> {
        return combineLatest([this.timeEvents$, this.timeValues$]).pipe(
            tap(arr => console.log(arr[0], arr[1].isValid)),
            filter(arr => arr[1].isValid),
            map(arr => {
                return [arr[0], arr[1].toSeconds()] 
            }),
            tap(console.log),
            switchMap(arr => {
                let t = arr[0];
                if(t === TimerEvent.PAUSE) return NEVER;
                return interval(1000).pipe(mapTo([TimerEvent.START, arr[1]]), startWith(arr));
            }),
            scan((timeLeft : number, arr)=> {
                if(arr[0] === TimerEvent.NEWTIME) return arr[1];
                if(arr[0] === TimerEvent.RESTART) return arr[1];
                return timeLeft - 1;
            }, +minutes * 60 + +seconds),
         
            tap(timeLeft => { if(timeLeft === 0) console.log("FINISHED")}),
            takeWhile((timeLeft) => timeLeft >= 0)
        )
    }
}