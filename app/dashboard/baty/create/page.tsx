import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomersCities } from "@/app/lib/data";
import FormBaty2 from "@/app/ui/invoices/create-form-baty2";

export default async function Page() {
  const cities = await fetchCustomersCities();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Baty", href: "/dashboard/baty" },
          {
            label: "Create Invoice",
            href: "/dashboard/baty/create",
            active: true,
          },
        ]}
      />
      <FormBaty2 cities={cities} />
    </main>
  );
}
