import SignInForm from "@/components/form/SignInForm";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full">
      <h1>
        Para o primeiro acesso, por motivos de segurança precisamos verificar se
        você é um funcionário da Coopervaço. Clique{" "}
        <Link className="underline" href={"./employee-verify"}>
          aqui.
        </Link>
      </h1>
      <br />
      <h1>Caso contrário, faça o login abaixo.</h1>
      <SignInForm />
    </div>
  );
};

export default page;
