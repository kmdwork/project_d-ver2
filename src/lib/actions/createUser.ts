'use server'

import { registerSchema } from "@/validations/user";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { hash } from 'bcryptjs'
import { redirect } from "next/navigation";
import { signIn } from "@/auth";


type ActionState = {
    success: boolean,
    errors: Record<string, string[]>
}



function handleValidationError(error: ZodError): ActionState {
    const { fieldErrors, formErrors } = error.flatten();
    const castedFieldErrors = fieldErrors as Record<string, string[]>;
    // zodの仕様でパスワード一致確認のエラーは formErrorsで渡ってくる
    // formErrorsがある場合は、confirmPasswordフィールドにエラーを追加
    if (formErrors.length > 0) {
        return { success: false, errors: { ...fieldErrors, confirmPassword: formErrors}}
    }
    return { success: false, errors: castedFieldErrors };
}

function handleError(customErrors: Record<string, string[]>): ActionState {
    return { success: false, errors: customErrors };
}


export async function createUser(
    prevState: ActionState ,
    formData: FormData
) {
    // formDataの取得
    const rawFormData = Object.fromEntries(
        ["name", "email", "password", "confirmPassword"].map((field) => [
            field,
            formData.get(field) as string,
        ])
    ) as Record<string, string>;


    //バリデート
    const validationResult = registerSchema.safeParse(rawFormData);
    if(!validationResult.success) {
        return handleValidationError(validationResult.error);
    }

    //DBにemailが被ってないか確認
    const existUser = await prisma.user.findUnique({
        where: { email: rawFormData.email }
    })
    if(existUser) {
        return handleError({ email: ['このメールアドレスはすでに使用されています']});
    }

    //DBに登録
    const hashedPassword = await hash(rawFormData.password, 12);
    await prisma.user.create({
        data: {
            name: rawFormData.name,
            email: rawFormData.email,
            password: hashedPassword,
        }
    })

    // dashboardにリダイレクト
    await signIn('credentials', {
        ...Object.fromEntries(formData),
        redirect: false
    });
  
    redirect('/dashboard')
  
}