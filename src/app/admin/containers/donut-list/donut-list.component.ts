import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';

@Component({
  selector: 'app-donut-list',
  template: `
    <div>
      <ng-container *ngIf="donuts.length; else nothing">
        <app-donut-card
          *ngFor="let donut of donuts; trackBy: trackById"
          [donut]="donut"
        ></app-donut-card>

        <ng-template ngFor [ngForOf]="donuts" let-donut let-i="index">
          <app-donut-card [donut]="donut"></app-donut-card>
          {{ i }}
        </ng-template>
      </ng-container>
    </div>

    <ng-template #nothing>
      <p>No Donuts here...</p>
    </ng-template>
  `,
  styles: [],
})
export class DonutListComponent implements OnInit {
  donuts!: Donut[];

  constructor() {}

  ngOnInit(): void {
    this.donuts = [
      {
        id: 'y8z0As',
        name: 'Just Chocolate',
        icon: 'just-chocolate',
        price: 119,
        description: 'For the pure chocoholic.',
      },
      {
        id: '3y98K1',
        name: 'Glazed Fudge',
        icon: 'glazed-fudge',
        price: 129,
        promo: true,
        description: 'Stiky perfection.',
      },
      {
        id: 'ae098s',
        name: 'Caramel Swirl',
        icon: 'caramel-swirl',
        price: 29,
        description: 'Chocolate drizzled with caramel.',
      },
    ];
  }

  trackById(index: number, donut: Donut) {
    return donut.id;
  }
}
