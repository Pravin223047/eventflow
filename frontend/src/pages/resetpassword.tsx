import { AuthLayout } from "@/auth/authlayout";
import { ResetPasswordForm } from "@/auth/resetpasswordform";

export function ResetPassword() {
  return (
    <AuthLayout title="Reset Password" subtitle="Enter your new password">
      <ResetPasswordForm />
    </AuthLayout>
  );
}
