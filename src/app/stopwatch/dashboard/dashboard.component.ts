import { Component, OnInit } from "@angular/core";
import { StopwatchService } from "src/app/shared/stopwatch.service";
import { Routine } from "../timer-constants";

@Component({
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"],
    selector: "app-sw-dashboard"
})
export class DashboardComponent implements OnInit {
    constructor(private stopwatchService : StopwatchService) {}
    ngOnInit() {}

    get routines() {
        let t : Routine[] = [];
        this.stopwatchService.timers.forEach((value, key) => {
            t.push({name: key, timers: value});
        })
        return t;
    }
}