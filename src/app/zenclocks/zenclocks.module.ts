import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimercontrolComponent } from './timercontrol/timercontrol.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TimerComponent } from './timer/timer.component';
import { MenuComponent } from './menu/menu.component';
import { ZenclocksComponent } from './zenclocks.component';
import { AboutComponent } from './about/about.component';
import { FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faCaretLeft, faCaretRight, faPauseCircle, faPlayCircle, faRedo } from '@fortawesome/free-solid-svg-icons';

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
    FlexLayoutModule,
    FormsModule,
    FontAwesomeModule
  ]
}) export class ZenclocksModule { 
  constructor(private library: FaIconLibrary) {
    library.addIcons(faPlayCircle, faPauseCircle, faRedo, faCaretLeft, faCaretRight);
  }
}
