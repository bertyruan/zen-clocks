import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { ZenclocksComponent } from "./zenclocks.component";

const routes: Routes = [{path: "", component: ZenclocksComponent}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ZenclocksRoutingModule {}