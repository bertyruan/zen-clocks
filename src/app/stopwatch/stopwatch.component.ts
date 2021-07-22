import { Time } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, combineLatest, interval, NEVER, noop, Observable, of, Subscription } from "rxjs";
import { first, map, mapTo, scan, startWith, switchMap, switchMapTo, takeWhile, tap } from "rxjs/operators"
import { TimerEvent, Timer, TimeValue } from "./stopwatch-values";
import { StopwatchService } from "./stopwatch.service";

@Component({
    selector: 'app-stopwatch',
    templateUrl: './stopwatch.component.html',
    styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {
    timers : Timer[] = [{id: 1, state: TimerEvent.PAUSE, value: new TimeValue()}];

    constructor(private stopwatchService: StopwatchService) {}

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
    
    addSplit() {
        const id = Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000);
        console.log(id);
        this.timers.push({id: id, state: TimerEvent.PAUSE, value: new TimeValue()})
    }
    removeSplit(id: number) {
        if(this.timers.length > 1) {
            this.timers.splice(this.timers.findIndex(t => t.id === id),1);
        }
    }

}