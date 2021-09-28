import { Component, OnInit } from "@angular/core";
import { TimerbankService } from "src/app/zenclocks/timerbank/timerbank.service";
import { TimeValue, TimerSet } from "../timer-constants";
import { DashboardService } from "./dashboard.service";

@Component({
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"],
    selector: "app-sw-dashboard"
})
export class DashboardComponent implements OnInit {
    sets : TimerSet[] = [];
    deleteMessage = "";

    constructor(private timerbankService : TimerbankService, private dashboardService: DashboardService) {}

    ngOnInit() {
        this.timerbankService.timerBank$.subscribe(bank => {
            this.sets = bank.sets;
        });
    }

    selectSet(set: TimerSet) : void {
        this.dashboardService.currentSet$.next(set);
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