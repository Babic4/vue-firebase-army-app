import { initializeApp } from "firebase/app";

import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  TwitterAuthProvider,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { ref, computed, onUnmounted } from "vue";

const firebaseConfig = {
  apiKey: "AIzaSyBRfQpbFsQcEK5sP6Tlv_x429zzTVoQHF0",
  authDomain: "army-app-3f258.firebaseapp.com",
  projectId: "army-app-3f258",
  storageBucket: "army-app-3f258.appspot.com",
  messagingSenderId: "1038167981016",
  appId: "1:1038167981016:web:91e4caa58119a1f3e990ad",
  measurementId: "G-1D1TXMW3XH",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const auth = getAuth(firebase);
const db = getFirestore(firebase);

auth.languageCode = "en";
const colorsCollection = collection(db, "colors");

export function useAuth() {
  const user = ref(null);
  const unsubscribe = onAuthStateChanged(auth, (_user) => (user.value = _user));
  onUnmounted(unsubscribe);
  const isLogin = computed(() => user.value !== null);

  const signIn = async () => {
    const twitterProvider = new TwitterAuthProvider();
    twitterProvider.setCustomParameters({
      lang: "en",
    });
    await signInWithPopup(auth, twitterProvider).then(async (result) => {
      const newColor = query(
        colorsCollection,
        where("userId", "==", result.user.uid)
      );
      const querySnapshot = await getDocs(newColor);
      let count = 0;
      querySnapshot.forEach(() => {
        count++;
      });
      if (count == 0) {
        addDoc(colorsCollection, {
          userId: result.user.uid,
          color: "#" + Math.floor(Math.random() * 16777215).toString(16),
        });
      }
    });
  };
  const logOut = () => signOut(auth);

  return { user, isLogin, signIn, logOut };
}

const messagesCollection = collection(db, "messages");
const messagesQuery = query(messagesCollection, orderBy("createdAt"));

export function useChat() {
  const messages = ref([]);
  const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
    messages.value = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .reverse();
  });
  onUnmounted(unsubscribe);

  const { user, isLogin } = useAuth();
  const sendMessage = (text) => {
    if (!isLogin.value) return;
    const { photoURL, uid, displayName } = user.value;
    if (!text) return;
    addDoc(messagesCollection, {
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text: text,
      datetime: Date.now(),
      createdAt: serverTimestamp(),
    });
  };

  return { messages, sendMessage };
}

export function useColors() {
  const colors = ref([]);
  const unsubscribe = onSnapshot(colorsCollection, (snapshot) => {
    colors.value = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .reverse();
  });
  onUnmounted(unsubscribe);

  const getColor = (id) => {
    colors.value.forEach((element) => {
      if (element.userId == id) {
        return element.color;
      }
    });
  };

  return { colors, getColor };
}
