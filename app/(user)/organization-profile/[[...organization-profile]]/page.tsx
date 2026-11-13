import { OrganizationProfile } from "@clerk/nextjs";
import { Suspense } from "react";
import Spinner from "@/components/shared/spinner";

export default function OrganizationProfilePage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center p-4">
      <Suspense fallback={<Spinner />}>
        <OrganizationProfile routing="path" path="/organization-profile" />
      </Suspense>
    </div>
  );
}
