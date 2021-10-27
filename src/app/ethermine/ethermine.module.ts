import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { EthermineRoutingModule } from './ethermine-routing.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    EthermineRoutingModule,
    CommonModule
  ]
})
export class EthermineModule { }
