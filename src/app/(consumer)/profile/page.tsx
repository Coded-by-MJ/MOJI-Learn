import { PageHeader } from "@/components/global/PageHeader";
import ProfileForm from "@/features/auth/components/ProfileForm";
import { redirect } from "next/navigation";
import { getAuthUserServer } from "@/features/users/actions";
async function ProfilePage() {
  const user = await getAuthUserServer();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div className="container my-6">
      <PageHeader title="Profile" />
      <ProfileForm name={user.name} />
    </div>
  );
}
export default ProfilePage;
