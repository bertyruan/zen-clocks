import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, interval, NEVER, Observable } from "rxjs";
import { map, tap, switchMap, mapTo, scan, startWith, takeWhile, filter } from "rxjs/internal/operators";
import { TimerEvent, TimeValues } from "./stopwatch-values";

@Injectable({providedIn: "root"})
export class StopwatchService {

    public timeEvents$ = new BehaviorSubject<TimerEvent>(TimerEvent.PAUSE);
    //public timeEvents$ = this.timeEvents.asObservable();
    
    public timeValues$ = new BehaviorSubject<TimeValues>({} as TimeValues);
    //public timeValues$ = this.timeValues.asObservable();

    public initNewClock(minutes: number, seconds: number) : Observable<number> {
        return combineLatest([this.timeEvents$, this.timeValues$]).pipe(
            tap(arr => console.log(arr[0], arr[1].isValid)),
            filter(arr => arr[1].isValid),
            map(arr => {
                let toSeconds = arr[1].minutes * 60 + (arr[1].seconds * 1);
                return [arr[0], toSeconds] 
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
            }, minutes * 60 + seconds),
         
            tap(timeLeft => { if(timeLeft === 0) console.log("FINISHED")}),
            takeWhile((timeLeft) => timeLeft >= 0)
        )
    }
}