import { Time } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, combineLatest, interval, NEVER, noop, Observable, of, Subscription } from "rxjs";
import { first, map, mapTo, scan, startWith, switchMap, switchMapTo, takeWhile, tap } from "rxjs/operators"
import { TimerEvent, Timer, TimeValue } from "./timer-constants";
import { TimerService } from "./timer/timer.service";
import { TimercontrolService } from "./timercontrol.service";

@Component({
    selector: 'app-timercontrol',
    templateUrl: './timercontrol.component.html',
    styleUrls: ['./timercontrol.component.css']
})
export class TimercontrolComponent implements OnInit {
    timers : Timer[] = [];

    constructor(private timerService: TimerService, private timercontroService: TimercontrolService) {}

    ngOnInit(): void {
        this.addSplit();
    }

    onStart() {
        this.timercontroService.start();
        this.timerService.timeEvents$.next(TimerEvent.START);
        
    }
    onPause() {
        this.timerService.timeEvents$.next(TimerEvent.PAUSE);
    }
    onRestart() {
        this.timerService.timeEvents$.next(TimerEvent.RESTART);
    }
    
    addSplit() {
        const newTimer = new TimeValue();
        const id = this.timercontroService.addToQueue(newTimer);
        this.timers.push({id: id, value: newTimer, order: 0});
    }
    removeSplit(id: number) {
        if(this.timers.length > 1) {
            this.timers.splice(this.timers.findIndex(t => t.id === id),1);
            this.timercontroService.removeFromQueue(id);
        }
    }

}