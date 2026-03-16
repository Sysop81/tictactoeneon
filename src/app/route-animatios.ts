import { trigger, transition, style, query, animate, group } from '@angular/animations';

// Other Animation style
// export const slider = trigger('routeAnimations', [
//   transition('* <=> *', [
//     style({ position: 'relative' }),
//     query(':enter, :leave', [
//       style({
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         opacity: 0
//       })
//     ], { optional: true }),
    

//     query(':enter', [
//       animate('600ms ease', style({ opacity: 1 }))
//     ], { optional: true })
//   ])
// ]);


export const sliderAnimation = trigger('routeAnimations', [
  // 1. From Login to Game
  transition('isLeft => isRight', slideTo('right')),

  // 2. From Game to Login
  transition('isRight => isLeft', slideTo('left')),
  
  // OPTIONAL: Other transitions
  // transition('* <=> *', slideTo('right'))
]);


function slideTo(direction: 'left' | 'right') {
  return [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ left: direction === 'right' ? '100%' : '-100%' })
    ], { optional: true }),
    group([
      query(':leave', [
        animate('400ms ease-out', style({ left: direction === 'right' ? '-100%' : '100%' }))
      ], { optional: true }),
      query(':enter', [
        animate('400ms ease-out', style({ left: '0%' }))
      ], { optional: true })
    ]),
  ];
}