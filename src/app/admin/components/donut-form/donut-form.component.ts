import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Donut } from '../../models/donut.model';

@Component({
  selector: 'app-donut-form',
  template: `
    <form class="donut-form" #form="ngForm" (ngSubmit)="handleSubmit(form)">
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

      <button type="submit" class="btn btn--green">Create</button>
      <button type="button" class="btn btn--grey" (click)="form.reset()">
        Reset Form
      </button>

      <div class="donut-form-working" *ngIf="form.valid && form.submitted">
        Working...
      </div>

      <pre>
        {{ donut | json }}
      </pre
      >
      <pre>
        {{ form.form.value | json }}
      </pre
      >
    </form>
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
  @Output() create = new EventEmitter<Donut>();

  icons: string[] = [
    'caramel-swirl',
    'glazed-fudge',
    'just-chocolate',
    'sour-supreme',
    'strawberry-glaze',
    'vanilla-sundae',
    'zesty-lemon',
  ];

  handleSubmit(form: NgForm): void {
    if (form.valid) {
      this.create.emit(form.value as Donut);
    } else {
      form.form.markAllAsTouched();
    }
  }
}
