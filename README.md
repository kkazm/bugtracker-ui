# ![](https://fonts.gstatic.com/s/i/materialiconsoutlined/bug_report/v12/24px.svg) kkazm/bugtracker-ui

A bug tracker with a web-based user interface, similar to Jira and Bugzilla. This repository is the web client built with Angular.

The corresponding REST backend web service source code is [available here](https://github.com/kkazm/bugtracker).

**Demo available online at <https://kkazm.ovh/bugtracker>**

By default, the application expects a REST API at `http://localhost:8080`. This can be changed in the configuration file: TODO

## Development server

Run `npx ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npx ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

(Todo) ~~Run `npx ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).~~

(Todo) ~~Run `npx ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.~~