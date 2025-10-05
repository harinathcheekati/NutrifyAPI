import * as admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

export const getAdminDb = () => {
  if (getApps().length === 0) {
    
    console.log('Inside the getAdminDb function');

    const serviceAccount = JSON.parse(
          Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!, 'base64').toString('utf-8')
    );


    console.log('Service Account:', {
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      hasPrivateKey: !!serviceAccount.private_key,
    });
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: "studio-8456827210-c1c4f",
        databaseURL: "https://studio-8456827210-c1c4f.firebaseio.com",
      });
    }

    console.log('✅ Firebase Admin Initialized');
  }
  return admin.firestore(admin.app());
};