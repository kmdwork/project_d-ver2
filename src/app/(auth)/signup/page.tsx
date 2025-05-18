// import SignupForm from "@/components/auth/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <>
        {/* <SignupForm /> */}
        <h1>Sorry. You cant create an account because of the demo version</h1>
        <div className="mt-2 text-center text-gray-400">
            <Link href="/">HOME</Link>
        </div>
        <div className="mt-2 text-center text-gray-400">
            <Link href="/login">ログイン</Link>
        </div>
    </>
  )
}
