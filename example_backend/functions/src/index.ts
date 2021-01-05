import * as functions from "firebase-functions";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { deleteInAlgolia, indexInAlgolia } from "./algolia";

function updateIndex(snap: functions.Change<DocumentSnapshot>, indexName: string) {
    if (!snap.after.exists) return deleteInAlgolia(indexName, snap.after.id);
    return indexInAlgolia(indexName, snap.after.data(), snap.after.id);
}

export const onPartnerUpdateIndexAlgolia = functions
.region("europe-west3")
.firestore
.document("partners/{partnerId}")
.onCreate((snap, context) => {
    const indexName = "partners";
    return updateIndex(snap, indexName);
});

export const onUsersUpdateIndexAlgolia = functions
.region("europe-west3")
.firestore
.document("users/{userId}")
.onCreate((snap, context) => {
    const indexName = "users";
    return updateIndex(snap, indexName);
});

// export const onBlogUpdateIndexAlgolia = functions
//     .region("europe-west3")
//     .firestore
//     .document("blog/{blogId}")
//     .onWrite((snap, context) => {
//         const indexName = "blog";
//         return updateIndex(snap, indexName);
//     });

/**
 * This function is only used to reset the database daily
 */
// export const scheduledFirestoreImport = functions
//     .region("europe-west3")
//     .pubsub
//     .schedule("every 24 hours")
//     .onRun((context) => {
//         return importDatabaseBackup();
//     });


