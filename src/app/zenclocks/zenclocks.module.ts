import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimercontrolComponent } from './timercontrol/timercontrol.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TimerComponent } from './timer/timer.component';
import { MenuComponent } from './menu/menu.component';
import { ZenclocksComponent } from './zenclocks.component';
import { AboutComponent } from './about/about.component';
import { PopupComponent } from './shared/popup/popup.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MenuComponent,
    TimercontrolComponent,
    TimerComponent,
    ZenclocksComponent,
    AboutComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule
  ]
}) export class ZenclocksModule { }
