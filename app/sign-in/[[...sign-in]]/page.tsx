import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-5">
      <Suspense>
        <SignIn signUpUrl="/sign-up" />
      </Suspense>
    </div>
  );
}
