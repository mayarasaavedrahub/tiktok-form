import { collection, query, where, getCountFromServer } from "firebase/firestore"
import { db } from "../config/firebase"



const COLLECTION_NAME = 'user-tiktok';

export async function getCountUser() {
    const coll = collection(db, COLLECTION_NAME)
    const query_ = query(coll, where('createdAt', '==', 'createdAt'))
    const snapshot = await getCountFromServer(query_)
    return alert (snapshot.data().count)
}
