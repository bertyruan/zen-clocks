import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TetrisComponent } from './tetris/tetris.component';
import { ZenclocksComponent } from './zenclocks/zenclocks.component';

const routes: Routes = [
  {path: "", redirectTo: "portfolio", pathMatch: 'full'},
  {
    path: "portfolio",
    loadChildren: () => import("./portfolio/portfolio.module").then(m => m.PortfolioModule)
  },
  {
    path: "zen-clocks",
    loadChildren: () => import("./zenclocks/zenclocks.module").then(m => m.ZenclocksModule)
  }
  // { path: '404', component: PageNotFoundComponent },
  // { path: '**', redirectTo: '404' }
  // {path: "tetris", component: TetrisComponent},
  // {path: "timer", component: ZenclocksComponent}
  //{path: "stopwatch", loadChildren: () => import('./stopwatch/stopwatch.module').then(m => m.StopwatchModule),}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
