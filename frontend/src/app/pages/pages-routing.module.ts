import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'create-account', component: SignUpComponent },
  { path: '', component: AppLayoutComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      { path: '', component: HomepageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
