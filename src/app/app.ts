import {Component, computed, effect, inject, Injector, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggle, MatButton],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly title = signal('bugtracker-ui');
  private injector = inject(Injector);
  readonly eff = effect((onCleanup) => {
    console.log("From effect!")
    const interval = setInterval(() => console.log("HEllo interval!"), 2000);
    onCleanup(() => clearInterval(interval));
  });

  hello() {
    this.eff.destroy();
  }

}
