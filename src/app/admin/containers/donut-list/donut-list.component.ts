import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';

@Component({
  selector: 'app-donut-list',
  template: `
    <div>
      <div class="donut-list-actions">
        <a routerLink="new" class="btn btn--green">
          New Donut

          <img src="/assets/img/icon/plus.svg" />
        </a>
      </div>

      <ng-container *ngIf="donuts?.length; else nothing">
        <app-donut-card
          *ngFor="let donut of donuts; trackBy: trackById"
          [donut]="donut"
        ></app-donut-card>
      </ng-container>
    </div>

    <ng-template #nothing>
      <p>No Donuts here...</p>
    </ng-template>
  `,
  styles: [`
    .donut-list-actions {
      margin-bottom: 10px;
    }
  `],
})
export class DonutListComponent implements OnInit {
  donuts: Donut[] = [];

  constructor(private donutService: DonutService) {}

  ngOnInit(): void {
    this.donutService.getDonuts().subscribe((donuts) => {
      this.donuts = donuts;
    });
  }

  trackById(_: number, donut: Donut) {
    return donut.id;
  }
}
