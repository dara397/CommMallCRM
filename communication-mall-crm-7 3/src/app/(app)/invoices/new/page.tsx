import { PageHeader } from "@/components/ui";
import DocumentForm from "@/components/DocumentForm";
import { loadFormLookups } from "@/lib/formData";
import { defaultTaxRate } from "@/lib/config";
import { createInvoice } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewInvoicePage({
  searchParams,
}: {
  searchParams: { customerId?: string };
}) {
  const { customers, products, equipment } = await loadFormLookups();
  const locked = searchParams.customerId
    ? customers.find((c) => c.id === searchParams.customerId)
    : undefined;

  return (
    <>
      <PageHeader title="New invoice" />
      <DocumentForm
        action={createInvoice}
        docType="INVOICE"
        customers={customers}
        products={products}
        equipment={equipment}
        defaultTaxRate={defaultTaxRate}
        lockedCustomer={locked}
        initial={{ customerId: searchParams.customerId }}
        cancelHref="/invoices"
        submitLabel="Create invoice"
      />
    </>
  );
}
