import AdminPage from "@/components/pages/AdminPage";
import UserPage from "@/components/pages/UserPage";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>{session?.user.role == "admin" ? <AdminPage /> : <UserPage />}</div>
  );
};

export default page;
