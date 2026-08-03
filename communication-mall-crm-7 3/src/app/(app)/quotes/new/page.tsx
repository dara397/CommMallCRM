import { PageHeader } from "@/components/ui";
import DocumentForm from "@/components/DocumentForm";
import { loadFormLookups } from "@/lib/formData";
import { defaultTaxRate } from "@/lib/config";
import { createQuote } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewQuotePage({
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
      <PageHeader title="New quote" subtitle="Build a quote from products, equipment, or custom lines." />
      <DocumentForm
        action={createQuote}
        docType="QUOTE"
        customers={customers}
        products={products}
        equipment={equipment}
        defaultTaxRate={defaultTaxRate}
        lockedCustomer={locked}
        initial={{ customerId: searchParams.customerId }}
        cancelHref="/quotes"
        submitLabel="Create quote"
      />
    </>
  );
}
