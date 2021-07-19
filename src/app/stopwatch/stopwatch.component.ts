import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, combineLatest, interval, NEVER, noop, of, Subscription } from "rxjs";
import { first, map, mapTo, scan, startWith, switchMap, switchMapTo, takeWhile, tap } from "rxjs/operators"

enum TimerEvent {
    PAUSE,
    START,
    RESTART,
    NEWTIME
}
interface time {minutes: number, seconds: number}
@Component({
    selector: 'app-stopwatch',
    templateUrl: './stopwatch.component.html',
    styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {
    timeToggler = new BehaviorSubject<TimerEvent>(TimerEvent.PAUSE);
    timer$ : Subscription;
    minutes = 1;
    seconds = 0;
    newTimer = new BehaviorSubject<time>({minutes: 1, seconds: 0});
    

    

    constructor() { 
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
        this.newTimer.next({minutes: newMinutes.value, seconds: newSeconds.value});
        console.log(newMinutes.value, newSeconds.value);
        this.timeToggler.next(TimerEvent.NEWTIME);
    }

    displayTime() : string {
        let m = this.minutes < 10 ? "0" + this.minutes.toString() : this.minutes.toString();
        let s = this.seconds < 10 ? "0" + this.seconds.toString() : this.seconds.toString();
        return `${m}:${s}`;
    }

    private start() {
        return combineLatest([this.timeToggler, this.newTimer]).pipe(
            map(arr => [arr[0], arr[1].minutes * 60 + arr[1].seconds]),
            tap(console.log),
            switchMap(arr => {
                let t = arr[0];
                if(t === TimerEvent.PAUSE) return NEVER;
                return interval(1000).pipe(mapTo(TimerEvent.START), startWith(arr));
            }),
            scan((timeLeft : number, arr)=> {
                if(arr[0] === TimerEvent.NEWTIME) return arr[1];
                if(arr[0] === TimerEvent.RESTART) return arr[1];
                return timeLeft - 1;
            }, 60),
            takeWhile((timeLeft) => timeLeft >= 0)
        ).subscribe(timeLeft => {
            this.minutes = Math.floor(timeLeft / 60); 
            this.seconds = timeLeft - (this.minutes * 60);
        });
    }
}