import { Component, OnInit } from "@angular/core";
import { TimerbankService } from "src/app/zenclocks/timerbank/timerbank.service";
import { TimeValue, TimerSet } from "../shared/timer-constants";

@Component({
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.css"],
    selector: "app-zc-menu"
})
export class MenuComponent implements OnInit {
    sets : TimerSet[] = [];
    deleteMessage = "";

    constructor(private timerbankService : TimerbankService) {}

    ngOnInit() {
        this.timerbankService.timerBank$.subscribe(bank => {
            this.sets = bank;
        });
    }

    selectSet(set: TimerSet) : void {
        this.timerbankService.currentSet$.next(set);
    }

    deleteSet(name: string) : void {
        if(this.timerbankService.deleteSet(name)) {
            this.deleteMessage = "deleted " + name;
        } 
        else {
            this.deleteMessage = "sorry can't delete"
        } 
    }

    timeToString(timeValue: TimeValue) : string {
        return TimeValue.toString(timeValue.minutes, timeValue.seconds);
    }
}