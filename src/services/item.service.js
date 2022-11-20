import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getUserItems = async (userEmail) => {
  if (userEmail !== "") {
    const q = query(
      collection(db, "items"),
      where("creatorEmail", "==", userEmail)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }
};

const createItem = async (itemToAdd) => {
  if (itemToAdd) {
    const docRef = await addDoc(collection(db, "items"), itemToAdd);
    return docRef;
  }
};

const deleteItem = async (itemToDelete) => {
  if (itemToDelete) {
    const docRef = await deleteDoc(doc(db, "items", itemToDelete.id));
    return docRef;
  }
};

const updateItem = async (itemToUpdate) => {
  if (itemToUpdate) {
    const docRef = await updateDoc(doc(db, "items", itemToUpdate.id), {
      ...itemToUpdate,
    });
    return docRef;
  }
};

export { getUserItems, createItem, deleteItem, updateItem };
