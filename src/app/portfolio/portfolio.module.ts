import { NgModule } from "@angular/core";
import { AppRoutingModule } from "../app-routing.module";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { PortfolioRoutingModule } from "./portfolio-routing.module";
import { PortfolioComponent } from "./portfolio.component";
import { WorkComponent } from "./work/work.component";

@NgModule({
    declarations: [
        PortfolioComponent,
        ContactComponent, 
        HomeComponent, 
        WorkComponent
    ],
    imports: [
        PortfolioRoutingModule
    ],
    bootstrap: []
})
export class PortfolioModule {}