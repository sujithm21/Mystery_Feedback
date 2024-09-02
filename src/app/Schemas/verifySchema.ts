import {z} from "zod"

export const verifySchema = z
    .string()
    .length(6, "The verification code must be 6 characters")