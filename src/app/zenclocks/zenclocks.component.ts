import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { TimerEditState } from "./shared/timer-constants";
import { TimerService } from "./timer/timer.service";
import { TimerbankService } from "./timerbank/timerbank.service";
import { TimercontrolService } from "./timercontrol/timercontrol.service";

@Component({
    selector: 'app-zenclock',
    templateUrl: './zenclocks.component.html',
    styleUrls: ['./zenclocks.component.scss']
})
export class ZenclocksComponent implements AfterViewInit {
    isPopupOpened = false;
    greyScreen = "grey-screen";
    setName = "";

    @ViewChild("container") container! : ElementRef;

    constructor(
        private timerService: TimerService, 
        private timercontrolService : TimercontrolService, 
        private timerbankService : TimerbankService) {}
 
    ngAfterViewInit() : void {
        // console.log(this.container);
        // this.container.nativeElement.addEventListener("click", console.log);
    }

    onPopupOpen() : void {
        this.isPopupOpened = !this.isPopupOpened;
    }

    onClose(event: EventEmitter<null>) : void {
        this.isPopupOpened = false;
    }

    onSave(timerName : any) {
        const newSet = {name: timerName, timers: this.timercontrolService.queue.map(v => v.value)};
        if(this.timerbankService.saveSet(newSet)) {
            //this.saveMessage = "Success!";
        } else {
            //this.saveMessage = "Choose a different name!";
        }
    }

    exitTimerEditMode() : void {
        this.timerService.timerEditModeState$.next(TimerEditState.EXIT);
    }
}