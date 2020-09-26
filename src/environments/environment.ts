// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 firebase : {
  apiKey: "AIzaSyAugNOrihx80doowuRHkgNFqvKzPgPhJfE",
  authDomain: "etraining-poc.firebaseapp.com",
  databaseURL: "https://etraining-poc.firebaseio.com",
  projectId: "etraining-poc",
  storageBucket: "etraining-poc.appspot.com",
  messagingSenderId: "750194164879",
  appId: "1:750194164879:web:a6188ca5cbb3c9a1089cfa",
  measurementId: "G-J4NNN7MVT5"
},
serviceUrl:'https://us-central1-etraining-poc.cloudfunctions.net'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
