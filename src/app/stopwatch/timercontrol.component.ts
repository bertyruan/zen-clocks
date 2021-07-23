import { Time } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, combineLatest, interval, NEVER, noop, Observable, of, Subscription } from "rxjs";
import { first, map, mapTo, scan, startWith, switchMap, switchMapTo, takeWhile, tap } from "rxjs/operators"
import { TimerEvent, Timer, TimeValue } from "./timer-constants";
import { TimerService } from "./timer.service";

@Component({
    selector: 'app-timercontrol',
    templateUrl: './timercontrol.component.html',
    styleUrls: ['./timercontrol.component.css']
})
export class TimercontrolComponent implements OnInit {
    timers : Timer[] = [{id: 1, state: TimerEvent.START, value: new TimeValue()}];

    constructor(private timerService: TimerService) {}
    begin = true;
    ngOnInit(): void {
        
    }

    onStart() {
        this.begin = true;
        this.timerService.timeEvents$.next(TimerEvent.START);
    }
    onPause() {
        this.timerService.timeEvents$.next(TimerEvent.PAUSE);
    }
    onRestart() {
        this.timerService.timeEvents$.next(TimerEvent.RESTART);
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