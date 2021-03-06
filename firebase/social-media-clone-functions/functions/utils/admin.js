const admin = require('firebase-admin')
const serviceAccount = require('../key/key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "social-network-fbc13.appspot.com"
});

const db = admin.firestore();

module.exports = { admin, db };