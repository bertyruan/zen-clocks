import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { NEVER, Subscription } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { Timer, TimerEditState, TimerEvent, TimeValue } from "../shared/timer-constants";
import { TimercontrolService } from "../timercontrol/timercontrol.service";
import { TimerService } from "./timer.service";

@Component({
    selector: 'app-zc-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
    timerForm! : FormGroup;
    timeInputValue!: TimeValue;
    timeDisplay!: TimeValue;
    controller : Subscription = NEVER.subscribe();
    clock : Subscription = NEVER.subscribe();
    isEditMode = false;

    @Input()
    timer!: Timer;

    constructor(
        private timerService : TimerService, 
        private timercontrol : TimercontrolService) {}

    ngOnInit() {
        this.initTimer();
        this.setupRestart();
        this.initForm();
        this.timerService.exitEditMode$.subscribe(() => {
            this.updateTime(this.timerForm.value.minutes, this.timerForm.value.seconds);
            this.isEditMode = false;
        });
    }

    initForm() {
        this.timerForm = new FormGroup({
            'minutes': new FormControl(this.timeInputValue.minutes),
            'seconds': new FormControl(this.padSeconds(this.timeInputValue.seconds))
        });
    }

    initTimer() {
        this.timeDisplay = this.timer.value.clone();
        this.timeInputValue = this.timer.value.clone();
        this.controller = this.timercontrol.startTimer$.pipe(
            filter(t => t?.id === this.timer.id),
            // tap(t => console.log(t.id, t?.id === this.timer.id)),
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
        this.timeInputValue = new TimeValue(+newMinutes, +newSeconds);
        this.timeDisplay = this.timeInputValue.clone();
        this.timercontrol.updateTime(this.timer.id, this.timeInputValue);
    }

    padSeconds(seconds: number) {
        return seconds < 10 ? "0" + seconds.toString() : seconds.toString();
    }

    removeTimer() {
        this.timercontrol.removeFromQueue(this.timer.id);
    }

    toggleEditMode() {
        this.isEditMode = !this.isEditMode;
        this.timerService.timerEditModeState$.next(TimerEditState.MAINTAIN);
    }

    maintainEditMode () : void {
        this.timerService.timerEditModeState$.next(TimerEditState.MAINTAIN);
    }
}