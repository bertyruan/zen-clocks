import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { PortfolioComponent } from "./portfolio.component";
import { WorkComponent } from "./work/work.component";

const routes: Routes = [
    {   
        path: '',  
        component: PortfolioComponent,
        children: [
            {path: '', component: HomeComponent},
            {path: 'about', component: AboutComponent},
            {path: 'work', component: WorkComponent},
            {path: 'contact', component: ContactComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PortfolioRoutingModule {}