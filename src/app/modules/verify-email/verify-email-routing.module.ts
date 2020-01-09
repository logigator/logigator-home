import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VerifyEmailComponent} from './components/verify-email/verify-email.component';

const routes: Routes = [
	{
		path: ':token',
		component: VerifyEmailComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class VerifyEmailRoutingModule { }
