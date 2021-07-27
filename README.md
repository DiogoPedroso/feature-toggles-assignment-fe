# FeatureToggle

The Frontend portion of the "Feature Toggles assignment", it contains a Login page that requires the ["Authorization" micro-service](https://github.com/DiogoPedroso/feature-toggles-be-authentication-microservice) to be running for authentication and authorization and the ["Feature Toggle" micro-service](https://github.com/DiogoPedroso/feature-toggles-be-features-microservice) to access the toggle-feature. Only the "userAdmin" (or any other hardcoded users with the "ROLE_ADMIN" role) has priviledges to access the Frontend. Update the environment variable files according to your environment's config.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.9.

## Setup

To setup the project run `npm i` on the root folder.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Running integration tests tests

This project uses [Cypress](https://www.cypress.io/) for testing. To run the tests use the command `npx cypress open` on the root of the project and follow the GUI instructions.

