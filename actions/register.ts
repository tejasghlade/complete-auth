"use server"


import { RegisterSchema } from "@/schemas";
import { revalidatePath, revalidateTag } from "next/cache";
import * as z from "zod"
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values : z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error : "Invalid fields !"}
    }

    const { email , password , name } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password,10);

    // Todo :: one method 
    // const existingUser = await db.user.findUnique({
    //     where : {
    //         email,
    //     }
    // });

    // Todo :: other method
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error : "Email already in use!"}
    }

    await db.user.create({
        data : {
            name , 
            email , 
            password : hashedPassword,
        }
    });

    // Todo :: Send verification token email

    return {success : "User Created"}

    // revalidatePath() next caching
    // revalidateTag()
}