import { NgModule } from "@angular/core";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { PortfolioRoutingModule } from "./portfolio-routing.module";
import { WorkComponent } from "./work/work.component";

@NgModule({
    declarations: [ContactComponent, HomeComponent, WorkComponent],
    imports: [PortfolioRoutingModule]
})
export class PortfolioModule {}