import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      testing works!
    </p>
  `,
  styles: [
  ]
})
export class TestingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
