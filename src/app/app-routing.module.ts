import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/guard/auth.guard';
import { RegisterComponent } from './modules/register/register.component';
import { HomeComponent } from './modules/home/home.component';
import { MovieComponent } from './modules/movie/movie.component';
import { RatedMoviesComponent } from './modules/rated-movies/rated-movies.component';
import { LoginComponent } from './modules/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'movie/:id', component: MovieComponent, canActivate: [AuthGuard] },
  { path: 'rated-movies', component: RatedMoviesComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
