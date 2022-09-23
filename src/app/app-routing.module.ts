import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';

const routes:Routes = [
  { path: 'home', component: StoreComponent },
  // route with parameter
  { path: 'home/:id', component: StoreComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
