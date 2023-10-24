import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectPageComponent} from "./presentation/pages/project-page/project-page.component";

export const projectPageUrl: string = 'project';

const routes: Routes = [
  {path: projectPageUrl, title: 'Проект', component: ProjectPageComponent},
  // {path: '**', title: 'Страница не найдена', component: UnknownPageComponent},
  {path: '**', redirectTo: projectPageUrl, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
