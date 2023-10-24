import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { ProjectPageComponent } from './presentation/pages/project-page/project-page.component';
import { PlotComponent } from './presentation/shared/components/plot/plot.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectPageComponent,
    PlotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
