import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';

@Component({
  selector: 'app-donut-single',
  template: `
    <div>
      <app-donut-form
        [donut]="donut"
        [isEdit]="isEdit"
        (create)="createDonut($event)"
        (update)="updateDonut($event)"
        (delete)="deleteDonut($event)"
      ></app-donut-form>
    </div>
  `,
  styles: [],
})
export class DonutSingleComponent implements OnInit {
  donut!: Donut;
  isEdit!: boolean;

  constructor(
    private donutService: DonutService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.donutService.getDonut(id).subscribe((donut) => {
      this.donut = donut;
    });

    this.isEdit = this.route.snapshot.data.isEdit;
  }

  createDonut(donut: Donut): void {
    this.donutService
      .addDonut(donut)
      .subscribe((d) => this.router.navigate(['admin', 'donuts', d.id]));
  }

  updateDonut(donut: Donut): void {
    console.log(`update`, donut);
    this.donutService.updateDonut(donut).subscribe({
      next: () => this.router.navigate(['admin']),
      error: (err) => console.log(err),
    });
  }

  deleteDonut(donut: Donut): void {
    this.donutService
      .deleteDonut(donut)
      .subscribe(() => this.router.navigate(['admin']));
  }
}
