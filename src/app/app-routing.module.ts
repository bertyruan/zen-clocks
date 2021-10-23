import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TetrisComponent } from './tetris/tetris.component';
import { ZenclocksComponent } from './zenclocks/zenclocks.component';

const routes: Routes = [
  {path: "", redirectTo: "timer", pathMatch: 'full'},
  {path: "tetris", component: TetrisComponent},
  {path: "timer", component: ZenclocksComponent}
  //{path: "stopwatch", loadChildren: () => import('./stopwatch/stopwatch.module').then(m => m.StopwatchModule),}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
