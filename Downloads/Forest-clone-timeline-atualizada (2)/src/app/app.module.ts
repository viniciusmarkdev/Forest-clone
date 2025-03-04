import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { ForestComponent } from './icons/forest/forest.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TimelineComponent } from './timeline/timeline.component';
import { TagComponent } from './tag/tag.component';
import { ClockSvgComponent } from './clock-svg/clock-svg.component';
import { ThreeDotsComponent } from './three-dots/three-dots.component';
import { EntrarComponent } from './entrar/entrar.component';
import { FormsModule } from '@angular/forms';

import { AlertasComponent } from './alertas/alertas.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { CadastrarComponent } from './cadastrar/cadastrar.component';



@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    ForestComponent,
    TimelineComponent,
    TagComponent,
    ClockSvgComponent,
    ThreeDotsComponent,
    EntrarComponent,
    AlertasComponent,
    CadastrarComponent,
   
    

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
