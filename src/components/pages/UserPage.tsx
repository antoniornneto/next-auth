import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const UserPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>USER PAGE</h1>
      <div>
        <h2>Bem-Vindo | {session?.user.name}</h2>
        <h2>USER PAGE</h2>
      </div>
    </div>
  );
};

export default UserPage;
