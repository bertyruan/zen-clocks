import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimercontrolComponent } from './timercontrol/timercontrol.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TimerComponent } from './timer/timer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ZenclocksComponent } from './zenclocks.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TimercontrolComponent,
    TimerComponent,
    ZenclocksComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule
  ]
}) export class ZenclocksModule { }
