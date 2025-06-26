
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBALHyk24n7KnR5veLiJKzh3joYfjjC0dk",
  authDomain: "event-management-system-78ac4.firebaseapp.com",
  projectId: "event-management-system-78ac4",
  appId: "1:794119017402:web:2a90d5f6f8f49beec34383",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
//AIzaSyDm3vOQHi8MKle_4FjH_U_1dLNvtbtmthk