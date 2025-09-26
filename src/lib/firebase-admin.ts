import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// Safely parse the service account key
let serviceAccount: admin.ServiceAccount | undefined;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (e) {
    console.error('Error parsing FIREBASE_SERVICE_ACCOUNT:', e);
  }
}


if (!admin.apps.length) {
  admin.initializeApp({
    credential: serviceAccount
      ? admin.credential.cert(serviceAccount)
      // Fallback for local development or environments with ADC
      : admin.credential.applicationDefault(),
  });
}

const db = getFirestore();

export { db, admin };
