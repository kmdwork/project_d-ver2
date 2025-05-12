'use server'

import { auth } from "@/auth";
import { movieSchema } from "@/validations/movies";
import { redirect } from "next/navigation"
import { z } from 'zod';

import { prisma } from "@/lib/prisma";


type ActionState = {
    success: boolean,
    errors: Record<string, string[]>
}
type FieldErrorBlock = {
  [field: string]: {
    _errors: string[];
  };
};

export async function registrationMovies(
    prevState: ActionState ,
    formData: FormData
) {
    
    // フォームの情報を取得
    // console.log(formData)
    const formIdsRaw = formData.get('formIds') as string;
    const formIds = formIdsRaw.split(','); // 例: ['0', '1', '2']
    const movies = formIds.map((id) => {
        const tmdbIdRaw = formData.get(`tmdbId-${id}`);
        // console.log(tmdbIdRaw);
        return {
            title: formData.get(`title-${id}`),
            tmdbId: tmdbIdRaw === '0' || tmdbIdRaw === undefined || tmdbIdRaw === null ? null : Number(tmdbIdRaw),
            dvdBoxNumber: formData.get(`dvdBoxNumber-${id}`),
            notes: formData.get(`notes-${id}`) || '',
            watchedAt: formData.get(`watchedAt-${id}`) || '',
        };
    });
    

    // バリデーション
    const moviesSchema = z.array(movieSchema);
    const validationResult = moviesSchema.safeParse(movies);
    // console.log(validationResult.error.format());
    if (!validationResult.success) {
        const rawErrors = validationResult.error.format();
        const groupedErrors: Record<string, string[]> = {};
        const errorArray = rawErrors as unknown as Record<number, FieldErrorBlock>;

        // formIds = ['a1b2c3', 'x9y8z7', ...] のようなユニークID
        formIds.forEach((formId, index) => {
            const errorBlock = errorArray[index]; // Zod のエラーは配列形式なので index が必要
            if (!errorBlock || typeof errorBlock !== 'object') return;
            
            const fieldErrors: string[] = [];
            for (const fieldKey in errorBlock) {
                if (fieldKey === '_errors') continue;
                const fieldErrorObj = errorBlock[fieldKey];
                if (Array.isArray(fieldErrorObj?._errors)) {
                    fieldErrors.push(...fieldErrorObj._errors);
                }
            }
            if (fieldErrors.length > 0) {
                groupedErrors[formId] = fieldErrors;
            }
        });
        return {
            success: false,
            errors: groupedErrors, // formId をキーにした正しいマッピング
        };
    }


    // DB登録
    const session = await auth();
    const userId = session?.user?.id;
    if(!session?.user?.email || !userId) {
        throw new Error('不正なリクエストです')
    }
    // DBに1件ずつ保存（authorIdを含める）
    for (const movie of validationResult.data) {
        const result = await prisma.movie.aggregate({
            where:  {
                AND: [
                    {authorId: userId},
                    {dvdBoxNumber: movie.dvdBoxNumber}
                ]
            },
            _max: {
                dvdNumber: true, // 最大値を取得
            },
        })
        // console.log(movie.tmdbId);
        const dvdNumber = result._max.dvdNumber ? result._max.dvdNumber + 1 : 1 ;
        await prisma.movie.create({
            data: {
                title: movie.title,
                tmdbId: movie.tmdbId,
                dvdBoxNumber: movie.dvdBoxNumber,
                dvdNumber: dvdNumber,
                notes: movie.notes,
                watchedAt: movie.watchedAt ? new Date(movie.watchedAt) : null,
                authorId: userId,
            }
        });
    }
    // return { success: true, errors: {} };
    redirect('/mydvdbox/dvdtable')
}
