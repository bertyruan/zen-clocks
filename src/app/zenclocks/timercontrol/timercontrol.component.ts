import { Time } from "@angular/common";
import { Component, OnInit, Output } from "@angular/core";
import { BehaviorSubject, combineLatest, interval, NEVER, noop, Observable, of, Subscription } from "rxjs";
import { first, map, mapTo, scan, startWith, switchMap, switchMapTo, takeWhile, tap } from "rxjs/operators"
import { TimerbankService } from "../timerbank/timerbank.service";
import { TimerEvent, Timer, TimeValue } from "../shared/timer-constants";
import { TimerService } from "../timer/timer.service";
import { TimercontrolService } from "./timercontrol.service";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-zc-timercontrol',
    templateUrl: './timercontrol.component.html',
    styleUrls: ['./timercontrol.component.scss']
})
export class TimercontrolComponent implements OnInit {
    timerName = "";
    saveMessage = "";

    constructor(
        private timerService: TimerService, 
        private timercontrolService: TimercontrolService, 
        private timerbankService : TimerbankService
    ) {}

    ngOnInit(): void {
        this.timerbankService.currentSet$.subscribe(set => {
            if(this.timerName !== set.name) {
                this.timerName = set.name;
                this.clearSplits();
                set.timers.forEach(timer => this.addSplit(timer.minutes, timer.seconds));
            }
        });
    }

    get timers() {
        return this.timercontrolService.queue;
    }

    onStart() {
        this.timercontrolService.start();
        const newSet = {name: this.timerName, timers: this.timercontrolService.queue.map(v => v.value)};
        this.timerbankService.saveSet(newSet);
    }
    onPause() {
        this.timercontrolService.pause();
    }
    onRestart() {
        this.timercontrolService.restart();
    }
    
    addSplit(minutes=1, seconds=0) {
        const newTimer = new TimeValue(minutes,seconds);
        this.timercontrolService.addToQueue(newTimer);
    }

    updateSet() : void {
        let timeValues = this.timercontrolService.queue.map(timer => timer.value);
        this.timerbankService.updateSet({name: this.timerName, timers: timeValues});
    }    

    private clearSplits() {
        this.timercontrolService.removeAllFromQueue();
    }

}