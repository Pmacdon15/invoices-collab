import { OrganizationProfile } from "@clerk/nextjs";

export default function OrganizationProfilePage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center p-4">
      <OrganizationProfile routing="path" path="/organization-profile" />
    </div>
  );
}
