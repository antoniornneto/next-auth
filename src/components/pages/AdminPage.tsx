import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import NewEmployeeForm from "../form/NewEmployeeForm";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>ADMIN PAGE</h1>
      <div>
        <h2>Bem-Vindo | {session?.user.name}</h2>
        <NewEmployeeForm />
      </div>
    </div>
  );
};

export default AdminPage;
