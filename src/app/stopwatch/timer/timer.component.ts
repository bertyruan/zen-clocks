import { Component, Input, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Timer, TimerEvent, TimeValue } from "../stopwatch-values";
import { StopwatchService } from "../stopwatch.service";

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

    @Input("start")
    start! : boolean;

    constructor(private stopwatchService : StopwatchService) {}

    ngOnInit() {
        this.timeDisplay = this.timer.value;
        this.timeValue = this.timer.value;
        this.clock1$ = this.stopwatchService.getClock(this.timer.value.minutes,this.timer.value.seconds);
        this.startClock();
    }

    startClock() {
        if(this.start) {
            this.clock1$.subscribe(timeLeft => {
                this.timeDisplay.minutes = Math.floor(timeLeft / 60); 
                this.timeDisplay.seconds = timeLeft - (this.timeDisplay.minutes * 60);
            });
        }    
    }

    get displayTime() : string {
        return this.timeDisplay.toString();    
    }

    updateTime(newMinutes: any, newSeconds:any){
        this.timeValue = new TimeValue(newMinutes.value, newSeconds.value);
        this.stopwatchService.timeValues$.next(this.timeValue);
        //this.stopwatchService.timeEvents$.next(TimerEvent.NEWTIME);
    }
}