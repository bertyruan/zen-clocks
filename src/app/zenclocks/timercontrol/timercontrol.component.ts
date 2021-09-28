import { Time } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, combineLatest, interval, NEVER, noop, Observable, of, Subscription } from "rxjs";
import { first, map, mapTo, scan, startWith, switchMap, switchMapTo, takeWhile, tap } from "rxjs/operators"
import { TimerbankService } from "../timerbank/timerbank.service";
import { TimerEvent, Timer, TimeValue } from "../timer-constants";
import { TimerService } from "../timer/timer.service";
import { TimercontrolService } from "./timercontrol.service";

@Component({
    selector: 'app-timercontrol',
    templateUrl: './timercontrol.component.html',
    styleUrls: ['./timercontrol.component.css']
})
export class TimercontrolComponent implements OnInit {
    timerName = "";
    saveMessage = "";

    constructor(private timerService: TimerService, 
        private timercontroService: TimercontrolService, 
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
        const newSet = {name: timerName.value, timers: this.timercontroService.queue.map(v => v.value)};
        if(this.timerbankService.saveSet(newSet)) {
            this.saveMessage = "Success!";
        } else {
            this.saveMessage = "Choose a different name!";
        }
    }
    addSplit(minutes = 1, seconds = 0) {
        const newTimer = new TimeValue(minutes,seconds);
        this.timercontroService.addToQueue(newTimer);
    }
    
    removeSplit(id: number) {
        this.timercontroService.removeFromQueue(id);
    }

    updateSet() : void {
        let timeValues = this.timercontroService.queue.map(timer => timer.value);
        this.timerbankService.updateSet({name: this.timerName, timers: timeValues});
    }    

    private clearSplits() {
        this.timercontroService.removeAllFromQueue();
    }

}