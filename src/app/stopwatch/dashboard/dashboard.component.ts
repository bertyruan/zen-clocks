import { Component, OnInit } from "@angular/core";
import { TimerbankService } from "src/app/stopwatch/timerbank/timerbank.service";
import { TimeValue, TimerSet } from "../timer-constants";
import { DashboardService } from "./dashboard.service";

@Component({
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"],
    selector: "app-sw-dashboard"
})
export class DashboardComponent implements OnInit {
    sets : TimerSet[] = [];

    constructor(private timerbankService : TimerbankService, private dashboardService: DashboardService) {}

    ngOnInit() {
        this.timerbankService.timerBank$.subscribe(bank => {
            this.sets = bank.sets;
        });
    }

    selectTimer(name: string) : void {
        // this.dashboardService.currentSet$.next();
    }

    timeToString(timeValue: TimeValue) : string {
        return TimeValue.toString(timeValue.minutes, timeValue.seconds);
    }
}