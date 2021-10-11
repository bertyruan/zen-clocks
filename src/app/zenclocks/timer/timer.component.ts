import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
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
export class TimerComponent implements OnInit, OnDestroy {
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
        private timercontrolService : TimercontrolService) {}

    ngOnInit() {
        this.initTimer();
        this.setupRestart();
        this.initForm();
        this.timerService.exitEditMode$.subscribe(() => {
            if(this.isEditMode) {
                //call unsubscribe before updating
                this.clock.unsubscribe();
                this.controller.unsubscribe();
                this.updateTime(this.timerForm.value.minutes, this.timerForm.value.seconds);
                this.initTimer();
                this.timerService.timeEvents$.next(TimerEvent.PAUSE);
                //this.timeDisplay = new TimeValue(this.timerForm.value.minutes, this.timerForm.value.seconds);
                this.isEditMode = false;
            }
        });
    }

    ngOnDestroy() {
        this.controller.unsubscribe();
        this.clock.unsubscribe();
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
        this.controller = this.timercontrolService.startTimer$.pipe(
            filter(t => t?.id === this.timer.id),
        ).subscribe(
           () => this.startClock()
        );
    }

    startClock() {
        this.clock = this.timerService.getNewClock(this.timer.value.minutes,this.timer.value.seconds).subscribe({next: (timeLeft) => {
            this.timeDisplay.minutes = Math.floor(timeLeft / 60); 
            this.timeDisplay.seconds = timeLeft - (this.timeDisplay.minutes * 60);
        }, complete: () => { 
            this.timeDisplay.minutes = 0;
            this.timeDisplay.seconds = 0;
            this.timerService.onNextAudio(this.timer.isLast);
            this.timercontrolService.endTimer$.next(this.timer);
        }});
        this.timerService.timeEvents$.next(TimerEvent.START);
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
        this.timercontrolService.updateTime(this.timer.id, this.timeInputValue);
    }

    padSeconds(seconds: number) {
        return seconds < 10 ? "0" + seconds.toString() : seconds.toString();
    }

    removeTimer() {
        this.timercontrolService.removeFromQueue(this.timer.id);
    }

    toggleEditMode() {
        this.isEditMode = true;
        this.timerService.timeEvents$.next(TimerEvent.PAUSE);
        this.timerService.timerEditModeState$.next(TimerEditState.MAINTAIN);
    }

    maintainEditMode () : void {
        this.timerService.timerEditModeState$.next(TimerEditState.MAINTAIN);
    }
}