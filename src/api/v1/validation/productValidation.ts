import Joi from "joi";

export const productSchemas = {
    create: Joi.object({
        name: Joi.string().min(2).max(80).required(),
        sku: Joi.string().pattern(/^[A-Z]{3}\d{4}$/).required().messages({
            "string.pattern.base": '"sku" must match pattern /^[A-Z]{3}\\d{4}$/'
        }),
        quantity: Joi.number().integer().min(0).required(),
        price: Joi.number().positive().precision(2).required(),
        category: Joi.string().valid("electronics", "clothing", "food", "tools", "other").required()
    }),
    update: Joi.object({
        name: Joi.string().min(2).max(80).optional(),
        quantity: Joi.number().integer().min(0).optional(),
        price: Joi.number().positive().precision(2).optional(),
        category: Joi.string().valid("electronics", "clothing", "food", "tools", "other").optional()
    })
};