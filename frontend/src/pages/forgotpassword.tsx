import { AuthLayout } from "@/auth/authlayout";
import { ForgotPasswordForm } from "@/auth/forgotpasswordform";

export function ForgotPassword() {
  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to reset your password"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
