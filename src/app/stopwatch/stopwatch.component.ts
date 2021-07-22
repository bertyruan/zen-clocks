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
        console.log("TODO!");
    }

}