import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimercontrolComponent } from './timercontrol/timercontrol.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TimerComponent } from './timer/timer.component';
import { MenuComponent } from './menu/menu.component';
import { ZenclocksComponent } from './zenclocks.component';
import { AboutComponent } from './about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faCaretLeft, faCaretRight, faPauseCircle, faPlayCircle, faRedo } from '@fortawesome/free-solid-svg-icons';
import { ZenclocksRoutingModule } from './zenclocks-routing.module';

@NgModule({
  declarations: [
    MenuComponent,
    TimercontrolComponent,
    TimerComponent,
    ZenclocksComponent,
    AboutComponent
  ],
  imports: [
    ZenclocksRoutingModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ]
}) export class ZenclocksModule { 
  constructor(private library: FaIconLibrary) {
    library.addIcons(faPlayCircle, faPauseCircle, faRedo, faCaretLeft, faCaretRight);
  }
}
