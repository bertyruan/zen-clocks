import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandboxComponent } from './sandbox/sandbox.component';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TetrisComponent } from './tetris/tetris.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: "", component: HomeComponent, pathMatch: 'full'},
  {path: "sandbox", component: SandboxComponent},
  {path: "tetris", component: TetrisComponent},
  {path: "stopwatch", component: StopwatchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
