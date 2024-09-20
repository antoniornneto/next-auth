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
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Employee } from "@prisma/client";
import { dayjs } from "@/lib/utils";

const FormSchema = z
  .object({
    cpf: z.string(),
    name: z.string(),
    email: z
      .string()
      .min(1, "O campo de email é obrigatório")
      .email("Email inválido"),
    password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas precisam ser iguais",
  });

const SignUpForm = () => {
  const cpfParams = useSearchParams().get("cpf") as string;
  const inscriptionParams = useSearchParams().get("inscription");
  const nameParams = useSearchParams().get("name");
  const [employee, setEmployee] = useState<Employee>({
    id: "" as string,
    cpf: "" as string,
    name: "" as string,
    birthday: new Date() as Date,
    inscription: "" as string,
    function: "" as string,
    createdAt: new Date() as Date,
    updatedAt: new Date() as Date,
  });
  useEffect(() => {
    const response = fetch(
      `/api/employee?cpf=${cpfParams}&inscription=${inscriptionParams}&name=${nameParams}`
    )
      .then((res) => res.json())
      .then((data) => setEmployee(data.existingEmployee));
  }, [cpfParams, inscriptionParams, nameParams]);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cpf: employee.cpf,
      name: employee.name,
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cpf: employee.cpf,
        name: employee.name,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      router.push("/sign-in");
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <Input defaultValue={employee.cpf} />
              </FormItem>
            )}
          />
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <Input defaultValue={employee.name} />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Matrícula</FormLabel>
            <Input defaultValue={employee.inscription} />
          </FormItem>
          <FormItem>
            <FormLabel>Função</FormLabel>
            <Input defaultValue={employee.function} />
          </FormItem>
          <FormItem>
            <FormLabel>Data de aniversário</FormLabel>
            <Input
              defaultValue={dayjs(employee.birthday).format("DD/MM/YYYY")}
            />
          </FormItem>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-Enter your password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Re-Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6" type="submit">
          Sign up
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        If you don&apos;t have an account, please&nbsp;
        <Link className="text-blue-500 hover:underline" href="/sign-in">
          Sign in
        </Link>
      </p>
    </Form>
  );
};

export default SignUpForm;
