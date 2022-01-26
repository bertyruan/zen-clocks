import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrowdfundingComponent } from '../crowdfunding/crowdfunding.component';
import { CrowdfundingRoutingModule } from './crowdfunding-routing.module';



@NgModule({
  declarations: [
    CrowdfundingComponent
  ],
  imports: [
    CommonModule,
    CrowdfundingRoutingModule
  ]
})
export class CrowdfundingModule { }
