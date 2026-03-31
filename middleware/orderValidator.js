import { body } from "express-validator";

export const createOrderValidator = [
    body("user_id")
    .isInt()
    .withMessage("user_id måste vara ett nummer"),

    body("total_price")
    .isFloat({ min: 0 })
    .withMessage("total_price måste vara ett positivt nummer"),
];