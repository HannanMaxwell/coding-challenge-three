import { Product } from "../models/productModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const COLLECTION = "products";

export const getAllProducts = async (): Promise<Product[]> => {
    return await firestoreRepository.getAllDocuments<Product>(COLLECTION);
};

export const getProductById = async (id: string): Promise<Product | null> => {
    return await firestoreRepository.getDocumentById<Product>(COLLECTION, id);
};

export const createProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    const now = new Date();
    const newProduct = {
        ...productData,
        createdAt: now,
        updatedAt: now
    };
    
    return await firestoreRepository.createDocument<Product>(COLLECTION, newProduct as Product);
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product> => {
    const updateData = {
        ...productData,
        updatedAt: new Date()
    };
    
    return await firestoreRepository.updateDocument<Product>(COLLECTION, id, updateData);
};

export const deleteProduct = async (id: string): Promise<void> => {
    await firestoreRepository.deleteDocument(COLLECTION, id);
};