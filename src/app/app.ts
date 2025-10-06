import {Component, computed, effect, inject, Injector, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly title = signal('bugtracker-ui');
  private injector = inject(Injector);
  readonly eff = effect((onCleanup) => {
    console.log("From effect!")
    const interval = setInterval(() => console.log("HEllo interval!"), 2000);
    onCleanup(() => {clearInterval(interval)});
  });

  hello() {
    this.eff.destroy();
  }

}
