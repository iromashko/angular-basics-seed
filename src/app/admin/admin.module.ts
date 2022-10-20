import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonutListComponent } from './containers/donut-list/donut-list.component';
import { DonutCardComponent } from './components/donut-card/donut-card.component';
import { DonutSingleComponent } from './containers/donut-single/donut-single.component';
import { DonutFormComponent } from './components/donut-form/donut-form.component';
import { FormsModule } from '@angular/forms';
import { DonutService } from './services/donut.service';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: 'donuts',
    component: DonutListComponent,
  },
  {
    path: 'donuts/new',
    component: DonutSingleComponent,
    data: {
      isEdit: false
    }
  },
  {
    path: 'donuts/:id',
    component: DonutSingleComponent,
    data: {
      isEdit: true
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'donuts',
  },
];

@NgModule({
  declarations: [
    DonutListComponent,
    DonutCardComponent,
    DonutSingleComponent,
    DonutFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [DonutService],
})
export class AdminModule {}
