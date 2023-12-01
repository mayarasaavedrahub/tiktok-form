import {
    collection,
    doc,
    DocumentData,
    getCountFromServer,
    getDoc,
    getDocs,
    query,
    QueryFieldFilterConstraint,
    QuerySnapshot,
    setDoc,
    Timestamp,
    where,
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'user-tiktok';



export const createUser = async (user: User) => {
    try {
        await setDoc(doc(db, COLLECTION_NAME, user.email.replace( '', '')), {
            ...user,
          
            createdAt: user.createdAt || Timestamp.now(),
        });
    } catch (ex) {
        console.error('Error adding document: ', ex);
    }
};

export const findUserById = async (email: string): Promise<User | undefined> => {
    try {
        return mapToUser(await getDoc(doc(db, COLLECTION_NAME, email.replace(/\D/g, ''))));
    } catch (ex) {}
};

export const findUsers = async (filter: UserFilter): Promise<User[]> => {
    try {
        const constraints: QueryFieldFilterConstraint[] = [];
        if (filter.name) {
            constraints.push(where('name', '==', filter.name));
        }

        if (filter.email) {
            constraints.push(where('email', '==', filter.email));
        }

        if (filter.phone) {
            constraints.push(where('phone', '==', filter.phone));
        }

        return mapToUsers(await getDocs(query(collection(db, COLLECTION_NAME), ...constraints)));
    } catch (ex) {
        throw ex;
    }
};

const mapToUsers = (data: QuerySnapshot<DocumentData>) => {
    return data.docs.map(mapToUser);
};

const mapToUser = (doc: DocumentData) => {
    const user = doc.data() as unknown as User;
    user.id = doc.id;
    return user;
};


