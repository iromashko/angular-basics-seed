import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Donut } from '../../models/donut.model';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-donut-form',
  template: `
    <form class="donut-form" #form="ngForm" *ngIf="donut; else loading">
      <label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          class="input"
          required
          minlength="5"
          [ngModel]="donut.name"
          [ngModelOptions]="{ updateOn: 'blur' }"
          #name="ngModel"
        />

        <ng-container *ngIf="name.invalid && name.touched">
          <div class="donut-form-error" *ngIf="name.errors?.required">
            Name is required.
          </div>
          <div class="donut-form-error" *ngIf="name.errors?.minlength">
            Minimum length of a name is 5!
          </div>
        </ng-container>
      </label>

      <label>
        <span>Icon</span>

        <select
          name="icon"
          class="input input--select"
          required
          [ngModel]="donut.icon"
          #icon="ngModel"
        >
          <option *ngFor="let icon of icons" [ngValue]="icon">
            {{ icon }}
          </option>
        </select>

        <ng-container *ngIf="icon.invalid && icon.touched">
          <div class="donut-form-error" *ngIf="icon.errors?.required">
            Icon is required.
          </div>
        </ng-container>
      </label>

      <label>
        <span>Price</span>
        <input
          type="number"
          name="price"
          class="input"
          required
          min="0"
          [ngModel]="donut.price"
          #price="ngModel"
        />
      </label>

      <ng-container *ngIf="price.invalid && price.touched">
        <div class="donut-form-error" *ngIf="price.errors?.required">
          Price is required.
        </div>
      </ng-container>

      <div class="donut-form-radios">
        <p class="donut-form-radios-label">Promo:</p>
        <label>
          <input
            type="radio"
            name="promo"
            [value]="undefined"
            [ngModel]="donut.promo"
          />
          <span>None</span>
        </label>
        <label>
          <input
            type="radio"
            name="promo"
            value="new"
            [ngModel]="donut.promo"
          />
          <span>New</span>
        </label>
        <label>
          <input
            type="radio"
            name="promo"
            value="limited"
            [ngModel]="donut.promo"
          />
          <span>Limited</span>
        </label>
      </div>

      <label>
        <span>Description</span>
        <textarea
          name="description"
          class="input input--textarea"
          required
          [ngModel]="donut.description"
          #description="ngModel"
        ></textarea>
      </label>

      <ng-container *ngIf="description.invalid && description.touched">
        <div class="donut-form-error" *ngIf="description.errors?.required">
          Description is required.
        </div>
      </ng-container>

      <button *ngIf="!isEdit" type="button" class="btn btn--green" (click)="handleCreate(form)">
        Create
      </button>
      <button
        type="button"
        [disabled]="form.untouched"
        *ngIf="isEdit"
        class="btn btn--green"
        (click)="handleUpdate(form)"
      >
        Update
      </button>
      <button type="button" class="btn btn--red"*ngIf="isEdit" (click)="deleteDonut()">
        Delete
      </button>
      <button type="button" class="btn btn--grey" *ngIf="form.touched || isEdit" (click)="form.reset()">
        Reset Form
      </button>

      <div class="donut-form-working" *ngIf="form.valid && form.submitted">
        Working...
      </div>
    </form>

    <ng-template #loading> Loading... </ng-template>
  `,
  styles: [
    `
      .donut-form {
        &-radios {
          display: flex;
          align-content: center;

          &-label {
            margin-right: 10px;
          }

          label {
            display: flex;
            align-items: center;

            span {
              color: #444;
              margin-bottom: 0;
            }
          }
        }

        &-working {
          font-size: 12px;
          font-style: italic;
          margin: 10px 0;
        }

        &-error {
          font-size: 12px;
          color: #e66262;
          margin-bottom: 10px;
        }
      }
    `,
  ],
})
export class DonutFormComponent {
  @Input() donut!: Donut;
  @Input() isEdit!: boolean;
  @Output() create = new EventEmitter<Donut>();
  @Output() update = new EventEmitter<Donut>();
  @Output() delete = new EventEmitter<Donut>();

  icons: string[] = [
    'caramel-swirl',
    'glazed-fudge',
    'just-chocolate',
    'sour-supreme',
    'strawberry-glaze',
    'vanilla-sundae',
    'zesty-lemon',
  ];

  handleCreate(form: NgForm): void {
    if (form.valid) {
      this.create.emit(form.value as Donut);
    } else {
      form.form.markAllAsTouched();
    }
  }

  handleUpdate(form: NgForm): void {
    if (form.valid) {
      this.update.emit({ id: this.donut.id, ...form.value });
    } else {
      form.form.markAllAsTouched();
    }
  }

  deleteDonut(): void {
    if (confirm(`Really delete ${this.donut.name}`)) {
      this.delete.emit({ ...this.donut });
    }
  }
}
