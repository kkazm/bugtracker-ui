import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ThemeManager } from './service/theme-manager.service';

/**
 * Page from Spring
 */
export type Page<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSlideToggleModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {

  title = 'bugtracker-ui';

  constructor(
    /** TODO Unused, but necessary for theme switching to work. */
    private themeManager: ThemeManager
  ) {
  }

  /**
   * Utility function to get a more specific type name.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#custom_method_that_gets_a_more_specific_type
   */
  public static myGetType(value: any) {
    if (value === null) {
      return "null";
    }
    const baseType = typeof value;
    // Primitive types
    if (!["object", "function"].includes(baseType)) {
      return baseType;
    }

    // Symbol.toStringTag often specifies the "display name" of the
    // object's class. It's used in Object.prototype.toString().
    const tag = value[Symbol.toStringTag];
    if (typeof tag === "string") {
      return tag;
    }

    // If it's a function whose source code starts with the "class" keyword
    if (
      baseType === "function" &&
      Function.prototype.toString.call(value).startsWith("class")
    ) {
      return "class";
    }

    // The name of the constructor; for example `Array`, `GeneratorFunction`,
    // `Number`, `String`, `Boolean` or `MyCustomClass`
    const className = value.constructor.name;
    if (typeof className === "string" && className !== "") {
      return className;
    }

    // At this point there's no robust way to get the type of value,
    // so we use the base implementation.
    return baseType;
  }

}
