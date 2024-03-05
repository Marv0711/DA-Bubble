import { trigger, transition, style, animate, keyframes } from '@angular/animations';

export const slideFromRight = trigger('slideFromRight', [
  transition(':enter', [
    animate('2000ms', keyframes([
      style({ transform: 'translateX(300%)', offset: 0 }),
      style({ transform: 'translateX(90%)', offset: 0.8 }),
      style({ transform: 'translateX(90%)', offset: 1 })
    ]))
  ]),
  transition(':leave', [
    animate('1000ms ease', style({ transform: 'translateX(100%)' }))
  ])
]);