import * as functions from 'firebase-functions';

// Firebase
import * as admin from 'firebase-admin';
admin.initializeApp();


// Cloud Vision
import * as vision from '@google-cloud/vision';
const visionClient =  new vision.ImageAnnotatorClient();

// Dedicated bucket for cloud function invocation
const bucketName = 'auto-tag-882d3.appspot.com';

export const imageTagger = functions.storage
    
    .bucket(bucketName)
    .object()
    .onChange( async event => {

            // File data
            const object = event.data;
            const filePath = object.name;   

            // Location of saved file in bucket
            const imageUri = `gs://${bucketName}/${filePath}`;

            const docId = filePath.split('.jpg')[0];

            const docRef  = admin.firestore().collection('photos').doc(docId);

            // Await the cloud vision response
            const results = await visionClient.labelDetection(imageUri);

            // Map the data to desired format
            const labels = results[0].labelAnnotations.map(obj => obj.description);
            const hotdog = labels.includes('hot dog')


            return docRef.set({ hotdog, labels })           
});
