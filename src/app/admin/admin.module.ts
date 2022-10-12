import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonutListComponent } from './containers/donut-list/donut-list.component';
import { DonutCardComponent } from './components/donut-card/donut-card.component';
import { DonutSingleComponent } from './containers/donut-single/donut-single.component';
import { DonutFormComponent } from './components/donut-form/donut-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DonutListComponent,
    DonutCardComponent,
    DonutSingleComponent,
    DonutFormComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [DonutListComponent, DonutSingleComponent],
})
export class AdminModule {}
