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
    constructor(private timerService: TimerService, private timercontroService: TimercontrolService) {}

    ngOnInit(): void {
        this.addSplit();
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
    
    addSplit() {
        const newTimer = new TimeValue();
        this.timercontroService.addToQueue(newTimer);
    }
    
    removeSplit(id: number) {
        this.timercontroService.removeFromQueue(id);
    }

}