import { CommonModule, CurrencyPipe, NgClass, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Donut } from '../../models/donut.model';

@Component({
  standalone: true,
  imports: [RouterModule, NgClass, NgSwitch, CurrencyPipe, NgSwitchCase],
  selector: 'app-donut-card',
  template: `
    <a
      class="donut-card"
      [routerLink]="donut.id"
      [ngClass]="{
        'donut-card-promo': donut.promo
      }"
    >
      <img
        src="/assets/img/{{ donut.icon }}.svg"
        [alt]="donut.name"
        class="donut-card-icon"
      />

      <div>
        <p class="donut-card-name">
          {{ donut.name }}
          <ng-container [ngSwitch]="donut.promo" ]>
            <span [ngClass]="{ 'donut-card-label': donut.promo }">
              <ng-template [ngSwitchCase]="'new'"> NEW </ng-template>
              <ng-template [ngSwitchCase]="'limited'"> LIMITED </ng-template>
            </span>
          </ng-container>
        </p>
        <p class="donut-card-price">
          {{ donut.price / 100 | currency: 'RUB':'₽' }}
        </p>
      </div>
    </a>
  `,
  styles: [
    `
      .donut-card {
        display: flex;
        align-items: center;
        background: #f7f7f7;
        border-radius: 5px;
        margin-bottom: 5px;
        padding: 5px 15px;
        transition: transform 0.2s ease-in-out;

        &:hover {
          transform: translateY(-3px);
        }

        &-name {
          font-size: 16px;
        }

        &-price {
          font-size: 14px;
          color: #c14583;
        }

        &-icon {
          width: 50px;
          margin-right: 10px;
        }

        &-promo {
          border: 2px solid #eee;
        }

        &-label {
          border: 1px solid #c14583;
          border-radius: 4px;
          padding: 0 4px;
          margin-left: 5px;
          font-size: 12px;
          color: #c14583;
        }
      }
    `,
  ],
  host: {
    class: 'donut-card',
  },
})
export class DonutCardComponent {
  @Input() donut!: Donut;
}
