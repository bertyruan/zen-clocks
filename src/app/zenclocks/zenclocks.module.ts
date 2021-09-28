import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimercontrolComponent } from './timercontrol/timercontrol.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TimerComponent } from './timer/timer.component';
import { MenuComponent } from './menu/menu.component';
import { ZenclocksComponent } from './zenclocks.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    MenuComponent,
    TimercontrolComponent,
    TimerComponent,
    ZenclocksComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule
  ]
}) export class ZenclocksModule { }
