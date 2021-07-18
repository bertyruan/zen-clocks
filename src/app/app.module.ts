import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { AppRoutingModule } from './app-routing.module';
import { TetrisComponent } from './tetris/tetris.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { HomeComponent } from './home/home.component';

@NgModule({ 
  declarations: [
    AppComponent,
    SandboxComponent,
    TetrisComponent,
    StopwatchComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
