import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  // signIn に指定された /login は、ユーザーが認証されていないときにリダイレクトされる ログインページ を指定しています。
  // デフォルトの NextAuth のサインインページを使わず、自作のページを使いたいときに便利です。

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
    // middleware.ts のような場所で呼ばれ、リクエストのたびに「このユーザーはこのページにアクセスしてよいか？」を判断します。

      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard') || nextUrl.pathname.startsWith('/mydvdbox');
      // isLoggedIn: ユーザーがログインしているかどうか（auth.user があるかどうか）
      // isOnDashboard: アクセス先が /dashboard または /mydvdbox 配下かどうか

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        // return false; // Redirect unauthenticated users to login page
        return Response.redirect(new URL('/login', nextUrl));
        // ダッシュボード関連ページにアクセスしようとしているが未ログインの場合: /login にリダイレクト

      } else if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/dashboard', nextUrl));
        // ログインしているユーザーがログインページにアクセス: /dashboard にリダイレクトして二重ログインを防止
      }
      return true;
      // それ以外（例：トップページやブログ記事など）は全てアクセスを許可

    },
  },
  providers: [], // Add providers with an empty array for now
  // 認証プロバイダー（Google、GitHub、Emailなど）を定義する場所ですが、今は空配列になっています。
} satisfies NextAuthConfig;

// この authConfig オブジェクトは、NextAuth.js の 設定（NextAuthConfig） を定義しており、以下の3つのポイントに注目できます：
// pages: カスタムログインページの設定
// callbacks: 認証に関するカスタムロジック
// providers: 認証プロバイダー（未設定）

