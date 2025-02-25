import LoginPage from "@/app/auth/login/page";

export default function Home() {
  return (
    <div suppressHydrationWarning={true}>
      <LoginPage />
    </div>
  );
}
