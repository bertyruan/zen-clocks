import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { TimerbankService } from "src/app/zenclocks/timerbank/timerbank.service";
import { TimeValue, TimerSet } from "../shared/timer-constants";

@Component({
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.scss"],
    selector: "app-zc-menu"
})
export class MenuComponent implements OnInit {
    sets : TimerSet[] = [];
    deleteMessage = "";

    @Output() onClose = new EventEmitter<any>();

    constructor(private timerbankService : TimerbankService) {}

    ngOnInit() {
        this.timerbankService.timerBank$.subscribe(bank => {
            this.sets = bank;
        });
    }

    onClosePopup() : void {
        this.onClose.next(null);
    }

    selectSet(set: TimerSet) : void {
        this.timerbankService.currentSet$.next(set);
        this.onClose.next(null);
    }

    deleteSet(name: string) : void {
        if(this.timerbankService.deleteSet(name)) {
            this.deleteMessage = "deleted " + name;
        } 
        else {
            this.deleteMessage = "sorry can't delete"
        } 
    }

    clearDeleteMessage() {
        this.deleteMessage = "";
    }

    timeToString(timeValue: TimeValue) : string {
        return TimeValue.toString(timeValue.minutes, timeValue.seconds);
    }
}