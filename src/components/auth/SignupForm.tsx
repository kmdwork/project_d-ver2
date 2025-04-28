'use client';
 
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
import { createUser } from '@/lib/actions/createUser';



export default function SignupForm() {
    const [state, formAction] = useActionState(createUser, {
        success: false,
        errors: {}
    })
  return (
        <Card className="w-full max-w-md mx-auto bg-black text-white">
        <CardHeader className="mt-5">
            <CardTitle className="line-clamp-2 text-white">登録</CardTitle>
        </CardHeader>
        <CardContent>
            <form action={formAction} className="space-y-4">
            {/* 名前 */}
            <div className="space-y-2">
                <Label htmlFor="name" className="text-white">名前</Label>
                <Input
                id="name"
                type="text"
                name="name"
                required
                className="bg-gray-700 text-white border border-gray-600"
                />
                {state.errors.name && (
                <div className="text-red-500">
                    <p className="text-sm">{state.errors.name.join(",")}</p>
                </div>
                )}
            </div>

            {/* メールアドレス */}
            <div className="space-y-2">
                <Label htmlFor="email" className="text-white">メールアドレス</Label>
                <Input
                id="email"
                type="email"
                name="email"
                required
                className="bg-gray-700 text-white border border-gray-600"
                />
                {state.errors.email && (
                <div className="text-red-500">
                    <p className="text-sm">{state.errors.email.join(",")}</p>
                </div>
                )}
            </div>

            {/* パスワード */}
            <div className="space-y-2">
                <Label htmlFor="password" className="text-white">パスワード</Label>
                <Input
                id="password"
                type="password"
                name="password"
                required
                className="bg-gray-700 text-white border border-gray-600"
                />
                {state.errors.password && (
                <div className="text-red-500">
                    <p className="text-sm">{state.errors.password.join(",")}</p>
                </div>
                )}
            </div>

            {/* パスワード(確認) */}
            <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">パスワード(確認)</Label>
                <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                required
                className="bg-gray-700 text-white border border-gray-600"
                />
                {state.errors.confirmPassword && (
                <div className="text-red-500">
                    <p className="text-sm">{state.errors.confirmPassword.join(",")}</p>
                </div>
                )}
            </div>

            {/* 登録ボタン */}
            <Button type="submit" className="w-full bg-red-800 hover:bg-red-700 text-white">
                登録
            </Button>
            </form>
        </CardContent>
        </Card>
  )
}
