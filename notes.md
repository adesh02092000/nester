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
    apiKey: <API_KEY>,
    authDomain: <AUTH_DOMAIN>,
    projectId: <Project_ID>,
    storageBucket: <Storage_bucket>,
    messagingSenderId: <MessageSenderID>,
    appId: <appID>
  };
  
  const app = initializeApp(firebaseConfig)
  // export the firestore databse
  export const db = getFirestore()
  ```

- [x] Enable authentication for email/password and Google, (we'll add it in the app later on)
  Go to the authentication section and enable email/password and google

  <img src="notes.assets/image-20220607191648653.png" alt="image-20220607191648653" style="zoom:67%;" />

  In case of google, add you own custom public facing name (this will appear when the user signs in)

<img src="notes.assets/image-20220607191759707.png" alt="image-20220607191759707" style="zoom: 50%;" />

<img src="notes.assets/image-20220607191958664.png" alt="image-20220607191958664" style="zoom:50%;" />

- [x] Create a firebase user : 
  From sign-in methods go to users tab : 

  <img src="notes.assets/image-20220607192148366.png" alt="image-20220607192148366" style="zoom:50%;" />

<img src="notes.assets/image-20220607192312828.png" alt="image-20220607192312828" style="zoom: 80%;" />

- [x] Enable `Firestore`
  Use the test mode for now and set the location to be southeast asia

- [x] Create auth rules : 
  The rules are written in Common expression language (`CEL`), and right now it says that anyone can read and write the database of next 30 days

  ![image-20220607193141524](notes.assets/image-20220607193141524.png)

  Change it to this instead  :
  ![image-20220607193548359](notes.assets/image-20220607193548359.png)

Which says that anyone can read the listings but to create you need to log in, and no more than 6 images are allowed per listing. For deleting and updating the listings too you need to log in and the listing should be yours

Also for the users collection, allow read and create to anyone, but only allow update to the authenticated users

- [x] Add Storage Rules : 
  Currently the rules allows read and write to any authenticated user. But we want to change it to this : 

  <img src="notes.assets/image-20220607195051639.png" alt="image-20220607195051639" style="zoom:80%;" />

Can write only if authenticated and the image size must be less than 2MB

- [ ] Create the listing collection and add a dummy document into it.
  ```json
  // sample listing
  {
  	"listings": [
  		{
  			"name": "Beautiful Stratford Condo",
  			"type": "rent",
  			"userRef": "ID OF A USER", // while submitting the listing we add the userRef from the code
  			"bedrooms": 2,
  			"bathrooms": 2,
  			"parking": true,
  			"furnished": true,
  			"offer": true,
  			"regularPrice": 2500,
  			"discountedPrice": 2000,
  			"location": "8601 West Peachtree St Stratford, CT 06614",
  			"geolocation": {
  				"lat": "41.205590",
  				"lng": "-73.150530"
  			},
  			"imageUrls": [],
  			"timestamp": "00:00:00"
  		},
  }
  ```

  <img src="notes.assets/image-20220607202620503.png" alt="image-20220607202620503" style="zoom:50%;" />

- [ ] Add some composite indexes for (type, timestamp, `userRef`, offer), we do this since we need to make queries that match across multiple fields

  **First Index**

- Collection: Listings

- Query Scope: Collection

| Field     |            |
| --------- | ---------- |
| type      | Ascending  |
| timestamp | Descending |

**Second Index**

- Collection: Listings
- Query Scope: Collection

| Field     |            |
| --------- | ---------- |
| userRef   | Ascending  |
| timestamp | Descending |

**Third Index**

- Collection: Listings
- Query Scope: Collection

| Field     |            |
| --------- | ---------- |
| offer     | Ascending  |
| timestamp | Descending |

![image-20220607203639880](notes.assets/image-20220607203639880.png)

Here we are making the indexes manually but when we run our query in our app code we get a link for generating the required index. (which is the recommended way)

:heavy_check_mark: Firebase setup done.

### The Plan ahead

Next let's create a basic layout for the pages like Explore, offers, sign up and so on. (Only layout no logic)
Then we'll tackle the sign in and sign up feature with email or google, also the forget password feature.
And then we will move to actual logic of listing the houses

