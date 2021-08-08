import { Component, Input, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { Timer, TimerEvent, TimeValue } from "../timer-constants";
import { TimercontrolService } from "../timercontrol.service";
import { TimerService } from "./timer.service";

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html'
})
export class TimerComponent implements OnInit {
    timeInputValue!: TimeValue;
    timeDisplay!: TimeValue;

    @Input()
    timer!: Timer;

    constructor(private timerService : TimerService, private timercontrol : TimercontrolService) {}

    ngOnInit() {
        this.timeDisplay = this.timer.value;
        this.timeInputValue = this.timer.value.clone();
        this.timercontrol.startTimer$.pipe(filter(t => t?.id === this.timer.id)).subscribe(
           () => this.startClock()
        )
    }

    startClock() {
        this.timerService.getClock(this.timer.value.minutes,this.timer.value.seconds).subscribe({next: (timeLeft) => {
            this.timeDisplay.minutes = Math.floor(timeLeft / 60); 
            this.timeDisplay.seconds = timeLeft - (this.timeDisplay.minutes * 60);
        }, complete: () => this.timercontrol.endTimer$.next(this.timer)});
    }

    get displayTime() : string {
        return this.timeDisplay.toString();    
    }

    //TODO
    updateTime(newMinutes: any, newSeconds:any){
        this.timeInputValue = new TimeValue(newMinutes.value, newSeconds.value);
        this.timeDisplay = this.timeInputValue.clone();
        this.timercontrol.updateTime(this.timer.id, this.timeInputValue);
    }
}