// このミドルウェアは、アプリ全体に対して 「ルートごとに認可（ログイン状態）をチェック」 するために機能します。

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;
// NextAuth(authConfig) は先ほど定義した auth.config.ts を読み込み、NextAuth を初期化
// .auth は Middleware 用の認可関数 を返します
// → サーバー側でルートにアクセスするたびに「ログイン状態の確認」や「リダイレクト制御」を実行

// 結果として何が行われるか？
//   auth.config.ts の callbacks.authorized() が実行されて、例えば以下が実現されます：
//   /dashboard や /manage に未ログインでアクセスしたら /login にリダイレクト
//   /login にログイン中にアクセスしたら /dashboard にリダイレクト
//   その他のページはそのままアクセス可能


 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
// どのルートでこの Middleware を適用するか」 を定義しています。