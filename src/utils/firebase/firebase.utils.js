import {initializeApp } from "firebase/app";
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from "firebase/auth"
import {getFirestore, doc, getDoc,setDoc} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAMaWR-36ZSf09U_lx-uhJkMcui-LPsnw4",
    authDomain: "crwn-clothing-d8a9b.firebaseapp.com",
    projectId: "crwn-clothing-d8a9b",
    storageBucket: "crwn-clothing-d8a9b.appspot.com",
    messagingSenderId: "1035198929428",
    appId: "1:1035198929428:web:da8b518f38477ff8472501"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopUp = ()=> signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) =>{
    const userDocRef = doc(db, "users",userAuth.uid)
    console.log(userDocRef)
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt =new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            });

        }catch(error){
            console.log("error creating the user", error.message)
        }
    }

    return userDocRef;
  }