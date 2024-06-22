import { object, string } from "zod"

export const signInSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Enter a valid email address"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required"),
})

export const signUpSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    displayName: string({ required_error: "Username is required" })
        .min(1, "Username is required"),
    username: string({ required_error: "Username is required" })
        .min(1, "Username is required"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    confirmPass: string({ required_error: "Passwords do not match" })
        .min(1, "Passwords do not match")
}).superRefine(({ confirmPass, password }, ctx) => {
    if (confirmPass !== password) {
        ctx.addIssue({
            code: 'custom',
            message: "Passwords do not match",
            path: ['confirmPass'],
        });
    }
});