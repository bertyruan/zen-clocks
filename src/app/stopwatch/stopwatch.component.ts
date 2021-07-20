import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, combineLatest, interval, NEVER, noop, of, Subscription } from "rxjs";
import { first, map, mapTo, scan, startWith, switchMap, switchMapTo, takeWhile, tap } from "rxjs/operators"
import { StopwatchService } from "./stopwatch.service";

enum TimerEvent {
    PAUSE,
    START,
    RESTART,
    NEWTIME
}
interface time {minutes: number, seconds: number}
@Component({
    selector: 'app-stopwatch',
    templateUrl: './stopwatch.component.html',
    styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {
    timeEvents$ = new BehaviorSubject<TimerEvent>(TimerEvent.PAUSE);
    event1$ : Subscription;
    minutes = 1;
    seconds = 0;
    timeValues$ = new BehaviorSubject<time>({minutes: this.minutes, seconds: this.seconds});
    
    constructor(stopwatchService : StopwatchService) { 
        this.event1$ = this.start(); 
    }

    ngOnInit(): void {
        
    }

    onStart() {
        this.timeEvents$.next(TimerEvent.START);
    }
    onPause() {
        this.timeEvents$.next(TimerEvent.PAUSE);
    }
    onRestart() {
        this.timeEvents$.next(TimerEvent.RESTART);
    }
    updateTime(newMinutes: any, newSeconds:any){
        this.timeValues$.next({minutes: newMinutes.value, seconds: newSeconds.value});
        this.timeEvents$.next(TimerEvent.NEWTIME);
    }

    displayTime() : string {
        let m = this.minutes < 10 ? "0" + this.minutes.toString() : this.minutes.toString();
        let s = this.seconds < 10 ? "0" + this.seconds.toString() : this.seconds.toString();
        return `${m}:${s}`;
    }

    private start() {
        return combineLatest([this.timeEvents$, this.timeValues$]).pipe(
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
            }, this.minutes * 60 + this.seconds),
            tap(console.log),
            tap(timeLeft => { if(timeLeft === 0) console.log("FINISHED")}),
            takeWhile((timeLeft) => timeLeft >= 0)
        ).subscribe(timeLeft => {
            this.minutes = Math.floor(timeLeft / 60); 
            this.seconds = timeLeft - (this.minutes * 60);
        });
    }
}