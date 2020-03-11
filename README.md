# Map Vue

## Usage

This application is written in [TypeScript](http://www.typescriptlang.org/) and utilizes the [`@arcgis/webpack-plugin`](https://github.com/Esri/arcgis-webpack-plugin) with [Vue](https://vuejs.org/).

### [Live Demo](https://jsapi-map-vue.surge.sh/)

---

To develop this application locally, you will need to create a `.env` file in your project with a client id. To obtain a client id, please reference [this documentation](https://developers.arcgis.com/documentation/core-concepts/security-and-authentication/accessing-arcgis-online-services/).

Your `.env` file should look like this.

```sh
ARCGIS_APP_ID=YoUrClIeNtId
```

---

You can develop, test, and build the application using various commands.

Run the application in development mode with a local development server.
```sh
npm start
```

Run the unit tests for the application. Unit tests are written with [Intern](https://theintern.io/).
```sh
npm test
```

Build the application for deployment.
```sh
npm run build
```

Run a production build of the application, but serve it up locally to see how the built app will behave.
```sh
npm run serve
```

Use `npm run serve` to full test that Service Workers are working correctly with `webpack-dev-server` self signed certifcates. Refer to [this article](https://deanhume.com/testing-service-workers-locally-with-self-signed-certificates/) on how to run Chrome with proper flags enabled for development purposes.