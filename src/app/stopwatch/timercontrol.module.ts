import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimercontrolComponent } from './timercontrol.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [
    TimercontrolComponent,
    TimerComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule
  ]
}) export class TimercontrolModule { }
