import express from "express";
import { validateRequest } from "../middleware/validateRequest";
import { productSchemas } from "../validation/productValidation";
import * as productController from "../controllers/productController";

const router = express.Router();



router.get("/products", productController.getAllProductsHandler);
router.get("/products/:id", productController.getProductByIdHandler);

router.post(
    "/products",
    validateRequest(productSchemas.create),
    productController.createProductHandler
);

router.put(
    "/products/:id",
    validateRequest(productSchemas.update),
    productController.updateProductHandler
);

router.delete("/products/:id", productController.deleteProductHandler);

export default router;