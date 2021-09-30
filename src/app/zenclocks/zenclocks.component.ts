import { Component, EventEmitter, OnInit } from "@angular/core";
import { TimerbankService } from "./timerbank/timerbank.service";
import { TimercontrolService } from "./timercontrol/timercontrol.service";

@Component({
    selector: 'app-zenclock',
    templateUrl: './zenclocks.component.html',
    styleUrls: ['./zenclocks.component.scss']
})
export class ZenclocksComponent implements OnInit {
    isPopupOpened = false;
    greyScreen = "grey-screen";
    setName = "";

    constructor(private timercontrolService : TimercontrolService, private timerbankService : TimerbankService) {}
    
    ngOnInit() : void {}

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
}