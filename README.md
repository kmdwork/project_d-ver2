
DVD管理アプリの要件定義
    プロジェクト概要
    映画DVDコレクションを管理するためのウェブアプリケーションを開発します。
    このアプリでは、ユーザーが所有する映画DVDを登録・管理し、TMDb APIを活用して映画情報を表示します。

技術スタック
    フロントエンド: Next.js(15.3.1), TypeScript, TailwindCSS
    バックエンド: Next.js API Routes
    データベース: 最初は{sqlite}を使う *(PlanetScale (MySQL) または Supabase (PostgreSQL))
    ORM: {Prisma}
    外部API: TMDb API
    追加ライブラリ:
        {React Hook Form} (フォーム管理)
        (Zod) (バリデーション)
        {NextAuth.js} (認証)
        {shadocn} (レイアウト)

DB設計

    User {
        id        String   @id @default(cuid())
        name      String?
        email     String   @unique
        password  String   // ハッシュ化されたパスワード
        createdAt DateTime @default(now())
        updatedAt DateTime @updatedAt
        movies    Movie[]
    }

    Movie {
        id          String   @id @default(cuid())
        title       String
        tmdbId      Int?      // TMDbのIDがない場合もある
        dvdBoxNumber    Int  // DVDボックスの識別子
        dvdNumber Int // 同dvdbox内の何番目に入っているか
        notes       String?
        watchedAt DateTime? // 映画を見た日（オプショナル）
        createdAt   DateTime @default(now())
        updatedAt   DateTime @updatedAt
        authorId      String
        author        User     @relation(fields: [authorId], references: [id])
        image       String?  //今のところは実装なしだが一応確保しておく
    }


機能要件

        1. ユーザー認証
            サインアップ/ログイン機能
            パスワードリセット
            プロフィール管理

        2. ホームページ
            TMDb APIから取得した人気映画をスライドショー形式で表示
            ユーザーのお気に入り映画をハイライト表示
            最近追加された映画の表示
            DVD統計情報（総数、ジャンル別分布など）

        3. DVD一覧ページ (DVD Table)
            ページネーション機能（20件ずつ表示）
            検索機能
                タイトル検索
                監督/俳優名検索
                ジャンル検索
                DVD Box ID検索
            ??並べ替え機能
                タイトル (昇順/降順)
                発売年 (昇順/降順)
                追加日 (昇順/降順)
                ??評価 (昇順/降順)
            フィルタリング機能
                ??ジャンル別
                DVD Box ID別
                お気に入り

        4. DVD登録ページ (DVD Registration)
            キーワード検索でTMDb APIから映画候補を10件表示
            選択した映画の基本情報を自動入力
            DVD Box IDの入力
            ??購入日の入力
            ??メモ欄
            notes (監督や役者　キーワードを挿入)
            お気に入り登録オプション

        5. 映画詳細ページ (Movie Information)
            TMDb APIから取得した詳細情報表示
                ポスター画像
                あらすじ
                制作年
                監督・キャスト情報
                評価
                ジャンル
            DVD情報表示
                DVD Box ID
                購入日
                メモ (notes)
            編集・削除機能

画面遷移図

        ・(public) ホーム画面 
        ・(auth) ログイン画面
        ・(auth) サインアップ画面
        ・(private) ダッシュボード
        ・(private) DVD一覧画面
        ・(private) DVD登録画面
        ・(private) 映画詳細画面
        ・(private) DVD編集画面

        ホーム画面 → ログイン画面 /  サインアップ画面
        ホーム画面 → if(auth) DVD一覧画面 / DVD登録画面
        DVD一覧画面 → 映画詳細画面
        映画詳細画面 → DVD編集画面
        DVD登録画面 → (完了画面) -> ホーム画面（登録完了後）

開発工程
        1.プロジェクトセットアップ（Next.js, TypeScript, TailwindCSS）
        2.Prismaセットアップ、データベーススキーマ定義
        3.TMDb API連携実装
        4.認証システム実装
        5.各画面UI実装
        6.APIエンドポイント実装
        7.テスト・デバッグ
        8.デプロイ

ページURL
    「/」 HOME画面
    「/login」 ログイン画面
    「/register」 サインアップ画面
    「/dashboard」 ダッシュボード
    「/DVDtable」 DVD一覧画面
    「/DVDRegistration」 DVD登録画面
    「/SuccessRegistration」 完了画面
    「/MovieInformation」 映画詳細画面
    「/DVDInformationEdit」 DVD編集画面
    





This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
