'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
 
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // await signIn('credentials', formData);
    // formData を Object.fromEntries() で通常のオブジェクトに変換（例：{ email: "test@example.com", password: "pass1234" }）
    // redirect: false を指定することで、リダイレクトを手動で制御できるようにします（自動リダイレクトを無効化）
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false
    });

    redirect('/dashboard')

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'メールアドレスまたはパスワードが正しくありません。';
        default:
          return 'エラーが発生しました。';
      }
    }
    throw error;
  }
}