import { AuthLayout } from "@/auth/authlayout";
import { SignInForm } from "@/auth/signinform";

export function SignIn() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
    >
      <SignInForm />
    </AuthLayout>
  );
}
