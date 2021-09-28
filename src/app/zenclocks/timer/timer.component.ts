import { Component, Input, OnInit } from "@angular/core";
import { NEVER, Observable, Subscription } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { Timer, TimerEvent, TimeValue } from "../timer-constants";
import { TimercontrolService } from "../timercontrol/timercontrol.service";
import { TimerService } from "./timer.service";

@Component({
    selector: 'app-zc-timer',
    templateUrl: './timer.component.html'
})
export class TimerComponent implements OnInit {
    timeInputValue!: TimeValue;
    timeDisplay!: TimeValue;
    controller : Subscription = NEVER.subscribe();
    clock : Subscription = NEVER.subscribe();

    @Input()
    timer!: Timer;

    constructor(private timerService : TimerService, private timercontrol : TimercontrolService) {}

    ngOnInit() {
        this.initTimer();
        this.setupRestart();
    }

    initTimer() {
        this.timeDisplay = this.timer.value.clone();
        this.timeInputValue = this.timer.value.clone();
        this.controller = this.timercontrol.startTimer$.pipe(
            filter(t => t?.id === this.timer.id),
            tap(t => console.log(t.id, t?.id === this.timer.id)),
        ).subscribe(
           () => this.startClock()
        );
    }

    startClock() {
        this.clock = this.timerService.getClock(this.timer.value.minutes,this.timer.value.seconds).subscribe({next: (timeLeft) => {
            this.timeDisplay.minutes = Math.floor(timeLeft / 60); 
            this.timeDisplay.seconds = timeLeft - (this.timeDisplay.minutes * 60);
            if(this.timeDisplay.toSeconds() === 0) { 
                const isLast = this.timer.isLast ? this.timerService.onNextAudio(true) : this.timerService.onNextAudio();
            }
        }, complete: () => { 
            this.timercontrol.endTimer$.next(this.timer);
        }});
    }

    setupRestart() {
        this.timerService.timeEvents$.pipe(filter(e=>e===TimerEvent.RESTART)).subscribe(_ => {
            this.clock.unsubscribe();
            this.timeDisplay = this.timer.value.clone();
        });
    }

    get displayTime() : string {
        return this.timeDisplay.toString();    
    }

    updateTime(newMinutes: any, newSeconds:any){
        this.timeInputValue = new TimeValue(newMinutes.value, newSeconds.value);
        this.timeDisplay = this.timeInputValue.clone();
        this.timercontrol.updateTime(this.timer.id, this.timeInputValue);
    }
}