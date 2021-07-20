import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopwatchComponent } from './stopwatch.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [
    StopwatchComponent,
    TimerComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule
  ]
}) export class StopwatchModule { }
