import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { PortfolioRoutingModule } from "./portfolio-routing.module";
import { PortfolioComponent } from "./portfolio.component";
import { WorkComponent } from "./work/work.component";
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';

@NgModule({
    declarations: [
        PortfolioComponent,
        ContactComponent, 
        HomeComponent, 
        WorkComponent, AboutComponent
    ],
    imports: [
        PortfolioRoutingModule,
        CommonModule,
        FlexLayoutModule,
        MatGridListModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        LayoutModule,
        MatToolbarModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule
    ],
    bootstrap: []
})
export class PortfolioModule {}