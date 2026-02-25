import { Request, Response, NextFunction } from "express";
import * as productService from "../services/productService";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const getAllProductsHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const products = await productService.getAllProducts();
        res.status(HTTP_STATUS.OK).json({
            message: "Products retrieved",
            count: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
};

export const getProductByIdHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Product not found" });
            return;
        }
        res.status(HTTP_STATUS.OK).json({ data: product });
    } catch (error) {
        next(error);
    }
};

export const createProductHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(HTTP_STATUS.CREATED).json({
            message: "Product created",
            data: newProduct
        });
    } catch (error) {
        next(error);
    }
};

export const updateProductHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const existingProduct = await productService.getProductById(req.params.id);
        if (!existingProduct) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Product not found" });
            return;
        }

        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        res.status(HTTP_STATUS.OK).json({
            message: "Product updated",
            data: updatedProduct
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProductHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const existingProduct = await productService.getProductById(req.params.id);
        if (!existingProduct) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Product not found" });
            return;
        }

        await productService.deleteProduct(req.params.id);
        res.status(HTTP_STATUS.OK).json({ message: "Product deleted" });
    } catch (error) {
        next(error);
    }
};