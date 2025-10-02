import admin from 'firebase-admin';
import { getApps, initializeApp, applicationDefault } from 'firebase-admin/app';

const getAdminDb = () => {
  if (getApps().length === 0) {
    initializeApp({
      credential: applicationDefault(),
    });
  }
  return admin.firestore();
};

export { getAdminDb };
