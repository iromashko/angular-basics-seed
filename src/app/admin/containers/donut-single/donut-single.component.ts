import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';

@Component({
  selector: 'app-donut-single',
  template: `
    <div>
      <app-donut-form
        [donut]="donut"
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

  constructor(private donutService: DonutService) {}

  ngOnInit(): void {
    const id = 'Cr_lPfl';

    this.donutService.getDonut(id).subscribe((donut) => {
      this.donut = donut;
    });
  }

  createDonut(donut: Donut): void {
    this.donutService.addDonut(donut);
  }

  updateDonut(donut: Donut): void {
    console.log(`update`, donut);
    this.donutService
      .updateDonut(donut)
      .subscribe({
        next: () => console.log(`update succesfull`),
        error: (err) => console.log(err),
      });
  }

  deleteDonut(donut: Donut): void {
    this.donutService
      .deleteDonut(donut)
      .subscribe((d) => console.log(`donut deleted`, d));
  }
}
