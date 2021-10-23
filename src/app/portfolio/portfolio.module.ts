import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { PortfolioRoutingModule } from "./portfolio-routing.module";
import { PortfolioComponent } from "./portfolio.component";
import { WorkComponent } from "./work/work.component";
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
    declarations: [
        PortfolioComponent,
        ContactComponent, 
        HomeComponent, 
        WorkComponent
    ],
    imports: [
        PortfolioRoutingModule,
        CommonModule,
        FlexLayoutModule,
        MatSliderModule 
    ],
    bootstrap: []
})
export class PortfolioModule {}