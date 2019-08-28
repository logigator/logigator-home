import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HOME_ROUTES} from './modules/home/home.module';


const routes: Routes = [
    {
      path: '',
      children: HOME_ROUTES
    },
    {
      path: 'impressum',
      loadChildren: () => import('./modules/impressum/impressum.module').then(m => m.ImpressumModule)
    },
    {
      path: 'privacy-policy',
      loadChildren: () => import('./modules/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
