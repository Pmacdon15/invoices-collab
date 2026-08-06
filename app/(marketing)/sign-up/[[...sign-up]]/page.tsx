import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-5">
      <Suspense>
        <SignUp signInUrl="/sign-in" />
      </Suspense>
    </div>
  );
}
