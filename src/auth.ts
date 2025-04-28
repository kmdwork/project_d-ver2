// NextAuth を使って認証機能を定義
// Credentials プロバイダーを設定（メール＆パスワードによるログイン）
// Prisma と bcryptjs によってユーザー情報をデータベースと照合
// auth, signIn, signOut, handlers をエクスポートしてアプリ全体で利用可能にする

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from "@/lib/prisma";
import bcryptjs from 'bcryptjs';


async function getUser(email: string) {
    return await prisma.user.findUnique({
        where: { email: email}
    })
}
 

// NextAuth() により、API ハンドラーとユーティリティ が返されます：
//   auth: サーバー側の認証状態確認に使う
//   signIn: サインイン用
//   signOut: サインアウト用
//   handlers: GET/POST など API 用のエンドポイントに接続できる関数
export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
        async authorize(credentials) {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(8) })
            .safeParse(credentials);

            if(parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getUser(email);
                // バリデーションに成功すれば DB からユーザーを取得
                if(!user) return null;
                const passwordMatch = await bcryptjs.compare(password, user.password );
                if(passwordMatch) return user; 
                // 正しければユーザーオブジェクトを返す（＝ログイン成功）
                // 間違っていれば null を返す（ログイン失敗）
            }
            return null;
        },
    }),
  ],
  // sessionにid情報も含める
  // 現在のsessionはname, emailのみ token.subにidが含まれているので
  // session.user.idで取得できるようにしておく
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id || token.sub || '') as string;
        session.user.name = token.name ?? '';
        session.user.email = token.email ?? '';
      }
      return session;
    }  
  }
});