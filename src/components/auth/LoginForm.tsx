'use client';
 
import { authenticate } from '@/lib/actions/authenticate';
import { useActionState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";

 
export default function LoginForm() {
  const [errorMessage, formAction] = useActionState(
    authenticate,
    undefined,
  );
//   const [state, formAction] = useActionState(
//     action: (prevState: any, formData: FormData) => Promise<any>,
//     initialState: any
//   );
// authenticate はサーバー関数（'use server'）で、(prevState, formData) を引数に取る関数。
// undefined は初期状態。最初は errorMessage にエラーがないので undefined。



  return (
    <Card className="w-full max-w-md mx-auto bg-black text-white">
    <CardHeader className="mt-5">
        <CardTitle className="line-clamp-2 text-white">ログイン</CardTitle>
    </CardHeader>
    <CardContent>
        <form action={formAction} className='space-y-4'>
        <div className='space-y-2'>
            <Label htmlFor='email' className="text-white">メールアドレス</Label>
            <Input id='email' type='email' name='email' required className="bg-gray-700 text-white border border-gray-600" />
        </div>
        <div className='space-y-2'>
            <Label htmlFor='password' className="text-white">パスワード</Label>
            <Input id='password' type='password' name='password' required className="bg-gray-700 text-white border border-gray-600" />
        </div>
        <Button type='submit' className='w-full bg-red-800 hover:bg-red-700 text-white'>
            ログイン
        </Button>
        <div className="flex h-8 items-end space-x-1">
            {errorMessage && (
            <div className="text-red-500">
                <p className="text-sm">{errorMessage}</p>
            </div>
            )}
        </div>
        </form>
    </CardContent>
    </Card>
  )
}