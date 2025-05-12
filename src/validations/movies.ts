import { z } from 'zod';

export const movieSchema = z.object({
    title: z.string()
        .min(1, { message: "タイトルは必須です" })
        .max(255, { message: "タイトルは255文字以内で入力してください" }),
    tmdbId: z.preprocess((val: unknown) => {
        if (val === null || val === undefined) return null; // null, undefined は null に変換
        if (typeof val === 'string') {
            const trimmed = val.trim();
            if (trimmed === '' || trimmed === '0') return null; // 空文字や '0' を null に変換
            const num = Number(trimmed);
            return isNaN(num) ? null : num;
        }
        if (typeof val === 'number') {
            return val === 0 ? null : val; // 数値が0の場合も null に変換
        }
        return null; 
    }, z.number().nullable()),
    dvdBoxNumber: z.coerce.number()
        .min(1, { message: "dvdBoxNumberは必須です" }),
    notes: z.string()
        .max(500, { message: "備考は500文字以内で入力してください" })
        .optional(),
    watchedAt: z.string()
        .optional()
        .refine(
            (date) => !date || !isNaN(Date.parse(date)),
            { message: "有効な日付を入力してください" }
        ),
});


export const movieEditSchema = z.object({
    title: z.string()
        .min(1, { message: "タイトルは必須です" })
        .max(255, { message: "タイトルは255文字以内で入力してください" }),
    tmdbIdRaw: z.preprocess((val: unknown) => {
        if (val === null || val === undefined) return null; // null, undefined は null に変換
        if (typeof val === 'string') {
            const trimmed = val.trim();
            if (trimmed === '' || trimmed === '0') return null; // 空文字や '0' を null に変換
            const num = Number(trimmed);
            return isNaN(num) ? null : num;
        }
        if (typeof val === 'number') {
            return val === 0 ? null : val; // 数値が0の場合も null に変換
        }
        return null; 
    }, z.number().nullable()),
    notes: z.string()
        .max(500, { message: "備考は500文字以内で入力してください" })
        .optional(),
    watchedAt: z.string()
        .optional()
        .refine(
            (date) => !date || !isNaN(Date.parse(date)),
            { message: "有効な日付を入力してください" }
        ),

})