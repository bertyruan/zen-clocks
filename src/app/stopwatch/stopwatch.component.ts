import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, interval, NEVER, noop, Subscription } from "rxjs";
import { mapTo, scan, startWith, switchMap, takeWhile, tap } from "rxjs/operators"

enum TimerEvent {
    PAUSE,
    START,
    RESTART
}
@Component({
    selector: 'app-stopwatch',
    templateUrl: './stopwatch.component.html',
    styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {
    timeToggler = new BehaviorSubject<TimerEvent>(TimerEvent.PAUSE);
    timer$ : Subscription;
    minutes : number;
    seconds : number;
    constructor() { 
        this.minutes = 21;
        this.seconds = 0;
        this.timer$ = this.start();
        
    }

    ngOnInit(): void {
        
    }

    onStart() {
        this.timeToggler.next(TimerEvent.START);
    }
    onPause() {
        this.timeToggler.next(TimerEvent.PAUSE);
    }
    onRestart() {
        this.timeToggler.next(TimerEvent.RESTART);
    }
    updateTime(newMinutes: any, newSeconds:any){
        this.timer$.unsubscribe();
        this.minutes = newMinutes.value;
        this.seconds = newSeconds.value;
        this.timer$ = this.start();
    }

    displayTime() : string {
        let m = this.minutes < 10 ? "0" + this.minutes.toString() : this.minutes.toString();
        let s = this.seconds < 10 ? "0" + this.seconds.toString() : this.seconds.toString();
        return `${m}:${s}`;
    }

    private start() {
        const total = (this.minutes * 60 + this.seconds) ;
        return this.timeToggler.pipe(
            switchMap(t => {
                if(t === TimerEvent.PAUSE) return NEVER;
                if(t === TimerEvent.START) return interval(1000).pipe(mapTo(-1));
                return interval(1000).pipe(mapTo(-1), startWith(total));
            }),
            scan((timeLeft, time)=>time === -1 ? timeLeft + time : time, total),
            takeWhile((timeLeft) => timeLeft >= 0)
        ).subscribe(timeLeft => {
            this.minutes = Math.floor(timeLeft / 60); 
            this.seconds = timeLeft - (this.minutes * 60);
        });
    }
}