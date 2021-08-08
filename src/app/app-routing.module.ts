import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandboxComponent } from './sandbox/sandbox.component';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TetrisComponent } from './tetris/tetris.component';
import { TimercontrolComponent } from './stopwatch/timercontrol.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './stopwatch/dashboard/dashboard.component';

const routes: Routes = [
  {path: "", component: HomeComponent, pathMatch: 'full'},
  {path: "sandbox", component: SandboxComponent},
  {path: "tetris", component: TetrisComponent},
  {path: "timer", component: DashboardComponent}
  //{path: "stopwatch", loadChildren: () => import('./stopwatch/stopwatch.module').then(m => m.StopwatchModule),}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
