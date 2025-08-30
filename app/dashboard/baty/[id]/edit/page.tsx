import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchInvoiceByIdBaty, fetchCustomersCities } from "@/app/lib/data";
import EditBaty from "@/app/ui/invoices/edit-form-baty";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [weather, citys] = await Promise.all([
    fetchInvoiceByIdBaty(id),
    fetchCustomersCities(),
  ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Baty", href: "/dashboard/baty" },
          {
            label: "Edit Weather",
            href: `/dashboard/baty/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditBaty weather={weather} citys={citys} />
    </main>
  );
}
