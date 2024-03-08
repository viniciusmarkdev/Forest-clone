import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { ForestComponent } from './icons/forest/forest.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TimelineComponent } from './timeline/timeline.component';





@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    ForestComponent,
    TimelineComponent,
   
    

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
