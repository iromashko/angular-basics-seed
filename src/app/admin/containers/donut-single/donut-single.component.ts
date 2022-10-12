import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donut-single',
  template: `
    <div>
      <app-donut-form></app-donut-form>
    </div>
  `,
  styles: [],
})
export class DonutSingleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
