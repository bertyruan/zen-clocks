import { Time } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, combineLatest, interval, NEVER, noop, Observable, of, Subscription } from "rxjs";
import { first, map, mapTo, scan, startWith, switchMap, switchMapTo, takeWhile, tap } from "rxjs/operators"
import { StopwatchService } from "../shared/stopwatch.service";
import { TimerEvent, Timer, TimeValue } from "./timer-constants";
import { TimerService } from "./timer/timer.service";
import { TimercontrolService } from "./timercontrol.service";

@Component({
    selector: 'app-timercontrol',
    templateUrl: './timercontrol.component.html',
    styleUrls: ['./timercontrol.component.css']
})
export class TimercontrolComponent implements OnInit {
    n = 3;

    constructor(private timerService: TimerService, private timercontroService: TimercontrolService, private stopwatchService : StopwatchService) {}

    ngOnInit(): void {
        const savedTimers = this.stopwatchService.getDefaultTimer();
        if(savedTimers.length) {
            savedTimers.forEach(v => this.addSplit(v.minutes, v.seconds));
            return;
        }
        for(let i = 0; i < this.n; i++) {
            this.addSplit();
        }
    }

    get timers() {
        return this.timercontroService.queue;
    }

    onStart() {
        this.timercontroService.start();
    }
    onPause() {
        this.timercontroService.pause();
    }
    onRestart() {
        this.timercontroService.restart();
    }
    onSave(timerName : any) {
        this.stopwatchService.saveTimers(timerName.value, this.timercontroService.queue.map(v => v.value));
    }
    addSplit(m=0, s=2) {
        const newTimer = new TimeValue(m,s);
        this.timercontroService.addToQueue(newTimer);
    }
    
    removeSplit(id: number) {
        this.timercontroService.removeFromQueue(id);
    }

}