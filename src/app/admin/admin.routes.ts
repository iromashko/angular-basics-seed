import { DonutListComponent } from './containers/donut-list/donut-list.component';
import { DonutSingleComponent } from './containers/donut-single/donut-single.component';
import { Route } from '@angular/router';

export const AdminRoutes: Route[] = [
  {
    path: 'donuts',
    component: DonutListComponent,
  },
  {
    path: 'donuts/new',
    component: DonutSingleComponent,
    data: {
      isEdit: false,
    },
  },
  {
    path: 'donuts/:id',
    component: DonutSingleComponent,
    data: {
      isEdit: true,
    },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'donuts',
  },
];
