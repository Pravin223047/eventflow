import { AuthLayout } from "@/auth/authlayout";
import EmailVerificationPage from "@/auth/EmailVerificationPage";

export function VerifyEmail() {
  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle="Enter the 6-digit code sent to your email address."
    >
      <EmailVerificationPage />
    </AuthLayout>
  );
}
