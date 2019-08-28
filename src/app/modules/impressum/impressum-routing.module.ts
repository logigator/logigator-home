import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ImpressumComponent} from './components/impressum/impressum.component';

const routes: Routes = [
    {
      path: '',
      component: ImpressumComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImpressumRoutingModule { }
