export declare function createDocument<T>(collectionName: string, data: T): Promise<T & { id: string }>;
export declare function getAllDocuments<T>(collectionName: string): Promise<T[]>;
export declare function getDocumentById<T>(collectionName: string, id: string): Promise<T | null>;
export declare function updateDocument<T>(collectionName: string, id: string, data: Partial<T>): Promise<T>;
export declare function deleteDocument(collectionName: string, id: string): Promise<void>;