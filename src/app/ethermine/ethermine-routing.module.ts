import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

const route : Routes = [{path: '', component: HomeComponent}]

@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: [RouterModule]
})
export class EthermineRoutingModule {}