import { Time } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, combineLatest, interval, NEVER, noop, Observable, of, Subscription } from "rxjs";
import { first, map, mapTo, scan, startWith, switchMap, switchMapTo, takeWhile, tap } from "rxjs/operators"
import { TimerEvent, TimeValues } from "./stopwatch-values";
import { StopwatchService } from "./stopwatch.service";

@Component({
    selector: 'app-stopwatch',
    templateUrl: './stopwatch.component.html',
    styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {
    clock1$ : Subscription;
    clockValue1$: Observable<TimeValues>;
    minutes = 1;
    seconds = 0;
    
    constructor(private stopwatchService : StopwatchService) { 
        this.clock1$ = this.stopwatchService.initNewClock(1,0).subscribe(timeLeft => {
            this.minutes = Math.floor(timeLeft / 60); 
            this.seconds = timeLeft - (this.minutes * 60);
        });
        this.stopwatchService.timeValues$.next(new TimeValues(this.minutes, this.seconds));
        this.clockValue1$ = this.stopwatchService.timeValues$.asObservable();
    }

    ngOnInit(): void {
        
    }

    onStart() {
        this.stopwatchService.timeEvents$.next(TimerEvent.START);
    }
    onPause() {
        this.stopwatchService.timeEvents$.next(TimerEvent.PAUSE);
    }
    onRestart() {
        this.stopwatchService.timeEvents$.next(TimerEvent.RESTART);
    }
    updateTime(newMinutes: any, newSeconds:any){
        let a = new TimeValues(+newMinutes.value, +newSeconds.value);
        this.stopwatchService.timeValues$.next(a);
        this.stopwatchService.timeEvents$.next(TimerEvent.NEWTIME);
    }
    addSplit() {
        console.log("TODO!");
    }

    displayTime() : string {
        let m = this.minutes < 10 ? "0" + this.minutes.toString() : this.minutes.toString();
        let s = this.seconds < 10 ? "0" + this.seconds.toString() : this.seconds.toString();
        return `${m}:${s}`;
    }

    private initClock() {
        
    }
}