import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { TimerEvent, TimeValues } from "../stopwatch-values";
import { StopwatchService } from "../stopwatch.service";

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html'
})
export class TimerComponent {
    clock1$ : Subscription;
    timeValue: TimeValues;
    minutes = 1;
    seconds = 0;

    constructor(private stopwatchService : StopwatchService) { 
        this.clock1$ = this.stopwatchService.getClock(this.minutes,this.seconds).subscribe(timeLeft => {
            this.minutes = Math.floor(timeLeft / 60); 
            this.seconds = timeLeft - (this.minutes * 60);
        });
        this.timeValue = new TimeValues(this.minutes, this.seconds);
    }

    get displayTime() : string {
        let m = this.minutes < 10 ? "0" + this.minutes.toString() : this.minutes.toString();
        let s = this.seconds < 10 ? "0" + this.seconds.toString() : this.seconds.toString();
        return `${m}:${s}`;
    }

    updateTime(newMinutes: any, newSeconds:any){
        this.timeValue = new TimeValues(newMinutes.value, newSeconds.value);
        this.stopwatchService.timeValues$.next(this.timeValue);
        this.stopwatchService.timeEvents$.next(TimerEvent.NEWTIME);
    }
}