import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";
import { Timer, TimerEvent, TimeValue } from "./timer-constants";
import { TimerService } from "./timer/timer.service";

@Injectable({providedIn: 'root'})
export class TimercontrolService {
    public queue : Timer[] = [];
    private activeClockIndex = -1;

    private startTimer = new BehaviorSubject<Timer>({} as Timer);
    public startTimer$ = this.startTimer.asObservable();
    public endTimer$ = new BehaviorSubject<Timer>({} as Timer); 

    
    constructor(private timerService: TimerService) {
        this.endTimer$.pipe(filter(t => t.id !== undefined)).subscribe(endTimer => {
            let index = this.queue.findIndex(timer => timer.id === endTimer.id);
            if(this.activeClockIndex <= this.queue.length - 1) {
                this.activeClockIndex++;
                const nextClock = this.queue[this.activeClockIndex].value.subtract(1);
                this.timerService.timeValues$.next(nextClock);
                this.timerService.timeEvents$.next(TimerEvent.NEWTIME);
                this.startTimer.next(this.queue[this.activeClockIndex]);
            };
        });
    }

    public start() {
        if(this.activeClockIndex < 0 && this.queue.length) {
            this.activeClockIndex++;
            this.startTimer.next(this.queue[this.activeClockIndex]);
        }
        this.timerService.timeValues$.next(this.queue[this.activeClockIndex].value.clone());
        this.timerService.timeEvents$.next(TimerEvent.START);
    }

    public pause() {
        this.timerService.timeEvents$.next(TimerEvent.PAUSE);
    }

    public restart() {
        this.timerService.timeEvents$.next(TimerEvent.RESTART);
    }

    public addToQueue(timer: TimeValue) : number {
        const id = Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000);
        //const order = this.queue.length ? this.queue[this.queue.length - 1].order + 1 : 1;
        this.queue.push({id: id, order: 0, value: timer});
        return id;
    }

    public removeFromQueue(id: number) : Timer | null {
        if(this.queue.length > 1) {
            const timerIndex = this.queue.findIndex(timer => timer.id === id);
            const removedTimer = this.queue.splice(timerIndex, 1)[0];
            if(timerIndex === this.activeClockIndex) {
                //don't change activeIndex
                const nextTimer = this.queue[this.activeClockIndex];
                this.timerService.timeEvents$.next(TimerEvent.PAUSE);
                this.startTimer.next(nextTimer);
                this.timerService.timeValues$.next(nextTimer.value);
                this.timerService.timeEvents$.next(TimerEvent.START);
            }
            return removedTimer;
        }
        return null;
    }

    public updateTime(id: number, timeValue: TimeValue) {
        const timerIndex = this.queue.findIndex(t => t.id === id);
        if(timerIndex === this.activeClockIndex) {
            this.timerService.timeEvents$.next(TimerEvent.NEWTIME);
            this.timerService.timeValues$.next(timeValue.clone());
            
        }
        this.queue[timerIndex].value.minutes = timeValue.minutes;
        this.queue[timerIndex].value.seconds = timeValue.seconds;
    }

    public reorder(id: number, order: number) : boolean {
        if(0 > order || order >= this.queue.length) {
            return false;
        }
        const timer = this.removeFromQueue(id);
        if(timer) {
            this.queue.splice(order - 1, 0, timer);
            return true;
        }
        return false;
    }
}