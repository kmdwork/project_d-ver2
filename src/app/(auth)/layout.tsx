export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="min-h-screen flex justify-center flex-col items-center p-4 bg-gray-800">
          {children}
        </div>
    );
  }
