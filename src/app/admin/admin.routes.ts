import { Route } from '@angular/router';

export const AdminRoutes: Route[] = [
  {
    path: 'donuts',
    loadComponent: () =>
      import('../admin/containers/donut-list/donut-list.component').then(
        (c) => c.DonutListComponent
      ),
  },
  {
    path: 'donuts/new',
    loadComponent: () =>
      import('../admin/containers/donut-single/donut-single.component').then(
        (c) => c.DonutSingleComponent
      ),
    data: {
      isEdit: false,
    },
  },
  {
    path: 'donuts/:id',
    loadComponent: () =>
      import('../admin/containers/donut-single/donut-single.component').then(
        (c) => c.DonutSingleComponent
      ),
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
