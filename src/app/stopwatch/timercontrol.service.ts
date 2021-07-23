import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Timer, TimerEvent, TimeValue } from "./timer-constants";
import { TimerService } from "./timer/timer.service";

@Injectable({providedIn: 'root'})
export class TimercontrolService {
    private queue : Timer[] = [];
    private hasStarted = false;

    private startTimer = new BehaviorSubject<Timer>({} as Timer);
    public startTimer$ = this.startTimer.asObservable();
    public endTimer$ = new BehaviorSubject<Timer>({} as Timer); 

    
    constructor(private timerService: TimerService) {
        this.endTimer$.subscribe(endTimer => {
            let index = this.queue.findIndex(timer => timer.id === endTimer.id);
            if(index === this.queue.length - 1) {
                this.hasStarted = false;
                return;
            };
            this.startTimer.next(this.queue[index + 1]);
        });
    }

    public start() {
        if(!this.hasStarted) {
            this.startTimer.next(this.queue[0]);
            this.hasStarted = true;
        }
    }

    public addToQueue(timer: TimeValue) : number {
        const id = Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000);
        const order = this.queue.length ? this.queue[this.queue.length - 1].order + 1 : 1;
        this.queue.push({id: id, order: order, value: timer});
        return id;
    }

    public removeFromQueue(id: number) : Timer | null {
        if(this.queue.length > 1) {
            return this.queue.splice(this.queue.findIndex(timer => timer.id === id), 1)[0];
        }
        return null;
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