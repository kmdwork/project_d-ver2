import PrivateHeader from "@/components/layouts/PrivateHeader";

export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <PrivateHeader />
            <div className="min-h-screen flex items-center justify-center p-4">
                {children}
            </div>
        </>
    );
  }
