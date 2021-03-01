import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { EditComponent } from './components/edit/edit.component';
import { ListsComponent } from './components/lists/lists.component';
//import { ListComponent } from '../products/components/categories/lists/list.component';
import { NewComponent } from './components/new/new.component';

const routes: Routes = [
  {path: 'details', component: DetailsComponent },
  {path: 'edit', component: EditComponent },
  {path: '', component: ListsComponent },
  {path: 'new', component: NewComponent },
  {path: '', redirectTo: '/lists', pathMatch: 'full' },

];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild (routes )
  ],
  exports: [ RouterModule ]
})
export class AuthRoutingModuleModule { }
