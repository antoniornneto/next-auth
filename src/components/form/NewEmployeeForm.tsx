"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const FormSchema = z.object({
  cpf: z.string().min(11, "Preencha o campo corretamente"),
  name: z.string().min(10, "Preencha com o nome completo"),
  inscription: z
    .string()
    .min(4, "Preencha com no mínimo 4 caracteres")
    .max(4, "Preencha com no máximo 4 caracteres"),
  birthday: z.string(),
  function: z.string().min(6, "Preencha o campo corretamente"),
});

const NewEmployeeForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cpf: "",
      name: "",
      inscription: "",
      birthday: "",
      function: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const createEmployee = await fetch("/api/employee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cpf: values.cpf,
        name: values.name,
        inscription: values.inscription,
        birhtday: values.birthday,
        function: values.function,
      }),
    });

    location.reload();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF:</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 99999999999" {...field} />
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
                <FormLabel>Nome Completo:</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: José Pinheiro da Silva" {...field} />
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
                <FormLabel>Matrícula:</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 0094" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de nascimento:</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="function"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Função:</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Presidente Diretor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6" type="submit">
          Cadastrar funcionário
        </Button>
      </form>
    </Form>
  );
};

export default NewEmployeeForm;
