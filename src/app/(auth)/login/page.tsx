import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <div className="mt-2 text-center text-gray-400">
         <Link href="/">HOME</Link>
      </div>
      <div className="mt-2 text-center text-gray-400">
        <Link href="/signup">サインアップ</Link>
      </div>
    </>
  )
}
