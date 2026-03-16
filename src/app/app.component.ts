import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { sliderAnimation } from './route-animatios';

@Component({
  animations: [sliderAnimation],
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tictactoe';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
