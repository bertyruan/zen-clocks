import { Component, Input, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Timer, TimerEvent, TimeValue } from "../timer-constants";
import { TimercontrolService } from "../timercontrol.service";
import { TimerService } from "./timer.service";

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html'
})
export class TimerComponent implements OnInit {
    clock1$! : Observable<number>;
    timeValue!: TimeValue;
    timeDisplay!: TimeValue;

    @Input()
    timer!: Timer;

    constructor(private timerService : TimerService, private timercontrol : TimercontrolService) {}

    ngOnInit() {
        this.timeDisplay = this.timer.value;
        this.timeValue = this.timer.value;
        this.clock1$ = this.timerService.getClock(this.timer.value.minutes,this.timer.value.seconds);
        this.timercontrol.startTimer$.subscribe(c => {
            if(c.id === this.timer.id) {
                this.startClock();
            }
        })
    }

    startClock() {
        this.clock1$.subscribe({next: (timeLeft) => {
            this.timeDisplay.minutes = Math.floor(timeLeft / 60); 
            this.timeDisplay.seconds = timeLeft - (this.timeDisplay.minutes * 60);
        }, complete: () => this.timercontrol.endTimer$.next(this.timer)});
    }

    get displayTime() : string {
        return this.timeDisplay.toString();    
    }

    updateTime(newMinutes: any, newSeconds:any){
        this.timeValue = new TimeValue(newMinutes.value, newSeconds.value);
        this.timerService.timeValues$.next(this.timeValue);
        this.timerService.timeEvents$.next(TimerEvent.NEWTIME);
    }
}

function next(next: any, arg1: (timeLeft: any) => void) {
    throw new Error("Function not implemented.");
}
