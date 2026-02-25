import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const validateRequest = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true 
        });

        if (error) {
            const errorMessage = error.details
                .map((detail) => detail.message)
                .join(", ");
            
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: `Validation error: ${errorMessage}`
            });
            return;
        }

        req.body = value; 
        next();
    };
};