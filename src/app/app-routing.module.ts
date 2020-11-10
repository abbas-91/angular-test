import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpeakersComponent } from './speakers/speakers/speakers.component';

const routes: Routes = [
  { path: 'speakers', component: SpeakersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
