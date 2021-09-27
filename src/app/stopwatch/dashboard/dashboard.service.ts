import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TimerSet } from "../timer-constants";

@Injectable({providedIn: "root"})
export class DashboardService {
    public currentSet$ = new BehaviorSubject<TimerSet>({name: "", timers: []});
}