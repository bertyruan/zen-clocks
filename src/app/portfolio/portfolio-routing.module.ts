import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { WorkComponent } from "./work/work.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'work', component: WorkComponent},
    {path: 'contact', component: ContactComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PortfolioRoutingModule {}