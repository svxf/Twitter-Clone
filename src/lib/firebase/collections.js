import { collection } from 'firebase/firestore';
import db from './firebase';

export const usersCollection = collection(db, 'users');

export const tweetsCollection = collection(db, 'posts');
