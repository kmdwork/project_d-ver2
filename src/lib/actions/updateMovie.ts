'use server'

import { movieEditSchema } from "@/validations/movies";
import { prisma } from "@/lib/prisma";

type ActionState = {
    success: boolean,
    errors: Record<string, string[]>
}


export async function updateMovie(
    prevState: ActionState ,
    formData: FormData
) {

    // console.log(formData);
    // フォームの情報を取得
    const postId = formData.get('postId') as string;
    const title = formData.get('title')?.toString();
    const notes = formData.get('notes')?.toString();
    const watchedAt = formData.get('watchedAt')?.toString() || '';
    const tmdbIdRaw = formData.get('tmdbId')?.toString() || '';

    // バリデーション
    const validationResult = movieEditSchema.safeParse({title, notes, watchedAt, tmdbIdRaw});
    if(!validationResult.success) {
        return { success: false, errors: validationResult.error.flatten().fieldErrors }
    }
    
    // DB更新
    const tmdbId = tmdbIdRaw === '' ? null : Number(tmdbIdRaw);
    await prisma.movie.update({
        where: { id: postId },
        data: {
            title,
            notes: notes ? notes : '',
            watchedAt: watchedAt ? new Date(watchedAt) : null,
            tmdbId,
        }
    })

    return { success: true, errors: {} };

}