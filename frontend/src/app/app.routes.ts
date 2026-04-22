import { Routes } from '@angular/router';

import { BrowseComponent } from './pages/browse/browse.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NewSkillComponent } from './pages/new-skill/new-skill.component';

export const routes: Routes = [
  { path: '',          component: BrowseComponent },
  { path: 'login',     component: LoginComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'new-skill', component: NewSkillComponent },
  { path: '**',        redirectTo: '' },
];
