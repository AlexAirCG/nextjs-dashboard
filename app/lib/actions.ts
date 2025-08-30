"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const FormSchemaBaty = z.object({
  id: z.string(),
  city: z.string(),
  temp: z.coerce.number(),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
const CreateInvoice2 = FormSchemaBaty.omit({ id: true, date: true });
const UpdateBaty = FormSchemaBaty.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;

  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function createInvoiceBaty2(formData: FormData) {
  const { city, temp } = CreateInvoice2.parse({
    city: formData.get("city"),
    temp: formData.get("temp"),
  });

  const date = new Date().toISOString().split("T")[0];

  await sql`
    INSERT INTO weatherss (city, temp, date)
    VALUES (${city}, ${temp}, ${date})
  `;

  revalidatePath("/dashboard/baty");
  redirect("/dashboard/baty");
}

export async function updateBaty(id: string, formDate: FormData) {
  const { city, temp } = UpdateBaty.parse({
    id: formDate.get("id"),
    city: formDate.get("city"),
    temp: formDate.get("temp"),
  });

  await sql`
    UPDATE weatherss
    SET id = ${id}, city = ${city}, temp = ${temp}
    WHERE id = ${id}
  `;

  revalidatePath("/dashboard/baty");
  redirect("/dashboard/baty");
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath("/dashboard/invoices");
}

export async function deleteWeatherBayt(id: string) {
  await sql`DELETE FROM weatherss WHERE id = ${id}`;
  revalidatePath("dashboard/baty");
}
