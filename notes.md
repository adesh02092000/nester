# House Market Place (React + Firebase)

We will use Firebase for database + file storage + authentication.
We won't need to use any kind of context API or state manager since Firebase is modular and we can fetch things from there as we need.

### Setting up Firebase

- [x] Create a new firebase project

- [x]  Create "web" app within firebase to get config values"

- [x] Install firebase

  ```shell
  npm i firebase
  ```

- [x] Create a new file `firebase.config.js` and paste the config values : 
  ```js
  import { initializeApp } from "firebase/app";
  const firebaseConfig = {
    apiKey: <API_KEY>,
    authDomain: <AUTH_DOMAIN>,
    projectId: <Project_ID>,
    storageBucket: <Storage_bucket>,
    messagingSenderId: <MessageSenderID>,
    appId: <appID>
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  ```

  Now since we need to `firestore` SDK we will import it now : 
  ```js
  import { initializeApp } from 'firebase/app'
  // import the firestore SDK
  import { getFirestore } from 'firebase/firestore'
  
  const firebaseConfig = {
    apiKey: 'AIzaSyD0vxHbUaMH-NXHa4GcxqrFyPMZ7qXBEYs',
    authDomain: 'house-marketplace-d9ee5.firebaseapp.com',
    projectId: 'house-marketplace-d9ee5',
    storageBucket: 'house-marketplace-d9ee5.appspot.com',
    messagingSenderId: '998449487778',
    appId: '1:998449487778:web:d40b1f9b6e1131519f5cfb',
  }
  
  const app = initializeApp(firebaseConfig)
  // export the firestore databse
  export const db = getFirestore()
  ```

   