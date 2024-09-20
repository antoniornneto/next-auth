"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const FormSchema = z.object({
  cpf: z.string(),
  name: z.string(),
  inscription: z.string(),
});

const EmployeeVerify = () => {
  const router = useRouter();
  const [notFound, setNotFound] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cpf: "",
      name: "",
      inscription: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const { cpf, inscription, name } = values;
    const response = await fetch(
      `/api/employee?cpf=${cpf}&inscription=${inscription}&name=${name}`
    );

    if (response.ok) {
      router.push(
        `/sign-up?cpf=${cpf}&inscription=${inscription}&name=${name}`
      );
    } else {
      setNotFound(true);
      setTimeout(() => {
        setNotFound(false);
      }, 7000);
    }
  };

  return (
    <div>
      <h1>
        Preencha os campos abaixo para verificarmos se você faz parte da
        cooperativa Coopervaço.
      </h1>
      {notFound && (
        <div className="bg-red-300 w-fit p-2 rounded-lg text-red-900">
          <p>
            Funcionário não encontrado, favor verificar se as informações foram
            inseridas corretamente.
          </p>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="99999999999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="João Silveira Campos"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inscription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matrícula</FormLabel>
                  <FormControl>
                    <Input placeholder="0043" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full mt-6" type="submit">
            Enviar Dados
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EmployeeVerify;
