import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { AppRoutingModule } from './app-routing.module';
import { TetrisComponent } from './tetris/tetris.component';
import { HomeComponent } from './home/home.component';
import { TimercontrolModule } from './stopwatch/timercontrol.module';

@NgModule({ 
  declarations: [
    AppComponent,
    SandboxComponent,
    TetrisComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    TimercontrolModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
