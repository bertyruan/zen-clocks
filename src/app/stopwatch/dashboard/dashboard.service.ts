import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TimerSet } from "../timer-constants";
import { TimerbankService } from "../timerbank/timerbank.service";

@Injectable({providedIn: "root"})
export class DashboardService {
    public currentSet$ = new BehaviorSubject<TimerSet>({name: "", timers: []});
}