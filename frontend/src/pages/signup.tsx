import { AuthLayout } from "@/auth/authlayout";
import { SignUpForm } from "@/auth/signupform";

export function SignUp() {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Sign up to get started with Bloom"
    >
      <SignUpForm />
    </AuthLayout>
  );
}
