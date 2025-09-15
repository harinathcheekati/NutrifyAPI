import admin from 'firebase-admin';
import { getApps, initializeApp, cert } from 'firebase-admin/app';

// This is a lazy initialization of the Firebase Admin SDK.
// It will only initialize on the first call to getAdminDb().
// This prevents the SDK from being initialized during the build process,
// which would fail because environment variables are not available at build time.
const getAdminDb = () => {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)),
    });
  }
  return admin.firestore();
};

export { getAdminDb };
