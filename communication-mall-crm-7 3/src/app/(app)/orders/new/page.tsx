import { PageHeader } from "@/components/ui";
import DocumentForm from "@/components/DocumentForm";
import { loadFormLookups } from "@/lib/formData";
import { defaultTaxRate } from "@/lib/config";
import { createOrder } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewOrderPage({
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
      <PageHeader title="New service order" />
      <DocumentForm
        action={createOrder}
        docType="ORDER"
        customers={customers}
        products={products}
        equipment={equipment}
        defaultTaxRate={defaultTaxRate}
        lockedCustomer={locked}
        initial={{ customerId: searchParams.customerId }}
        cancelHref="/orders"
        submitLabel="Create order"
      />
    </>
  );
}
