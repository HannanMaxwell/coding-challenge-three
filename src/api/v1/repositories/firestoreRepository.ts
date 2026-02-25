import { db } from "../../../config/firebaseConfig";

/**
 * Creates a document, returns the created data with ID
 */
export const createDocument = async <T extends { [x: string]: any }>(collectionName: string, data: T): Promise<T & { id: string }> => {
    try {
        const docRef = await db.collection(collectionName).add(data);
        return { ...data, id: docRef.id };
    } catch (error) {
        throw new Error(`Error creating document: ${(error as Error).message}`);
    }
};

/**
 * Gets all documents in a collection
 */
export const getAllDocuments = async <T extends { [x: string]: any }>(collectionName: string): Promise<T[]> => {
    try {
        const snapshot = await db.collection(collectionName).get();
        return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() } as unknown as T));
    } catch (error) {
        throw new Error(`Error getting documents: ${(error as Error).message}`);
    }
};

/**
 * Gets a document by ID
 */
export const getDocumentById = async <T extends { [x: string]: any }>(collectionName: string, id: string): Promise<T | null> => {
    try {
        const doc = await db.collection(collectionName).doc(id).get();
        return doc.exists ? ({ id: doc.id, ...doc.data() } as unknown as T) : null;
    } catch (error) {
        throw new Error(`Error getting document: ${(error as Error).message}`);
    }
};

/**
 * Updates a document
 */
export const updateDocument = async <T extends { [x: string]: any }>(collectionName: string, id: string, data: Partial<T>): Promise<T> => {
    try {
        await db.collection(collectionName).doc(id).update(data as { [x: string]: any });
        const updated = await db.collection(collectionName).doc(id).get();
        return { id: updated.id, ...updated.data() } as unknown as T;
    } catch (error) {
        throw new Error(`Error updating document: ${(error as Error).message}`);
    }
};

/**
 * Deletes a document
 */
export const deleteDocument = async (collectionName: string, id: string): Promise<void> => {
    try {
        await db.collection(collectionName).doc(id).delete();
    } catch (error) {
        throw new Error(`Error deleting document: ${(error as Error).message}`);
    }
};