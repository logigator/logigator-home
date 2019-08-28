import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpressumComponent } from './components/impressum/impressum.component';
import {ImpressumRoutingModule} from './impressum-routing.module';



@NgModule({
  declarations: [ImpressumComponent],
  imports: [
    ImpressumRoutingModule,
    CommonModule
  ]
})
export class ImpressumModule { }
