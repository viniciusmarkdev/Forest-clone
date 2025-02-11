import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';
import { TimerComponent } from './timer/timer.component';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';

const routes: Routes = [
  {path:'', redirectTo:'timer', pathMatch: 'full'},
  {path : 'timer', component:TimerComponent},
  { path :'timeline' , component:TimelineComponent},
  { path :'entrar' , component: EntrarComponent},
  { path :'cadastrar' , component: CadastrarComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
