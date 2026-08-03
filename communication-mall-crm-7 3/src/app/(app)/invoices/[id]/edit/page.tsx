import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/ui";
import DocumentForm from "@/components/DocumentForm";
import { loadFormLookups } from "@/lib/formData";
import { defaultTaxRate } from "@/lib/config";
import { toInputDate } from "@/lib/format";
import { updateInvoice } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditInvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
    include: { lineItems: { orderBy: { sortOrder: "asc" } } },
  });
  if (!invoice) notFound();

  const { customers, products, equipment } = await loadFormLookups();
  const action = updateInvoice.bind(null, invoice.id);

  return (
    <>
      <PageHeader title={`Edit invoice ${invoice.number}`} />
      <DocumentForm
        action={action}
        docType="INVOICE"
        customers={customers}
        products={products}
        equipment={equipment}
        defaultTaxRate={defaultTaxRate}
        initial={{
          customerId: invoice.customerId,
          taxRate: invoice.taxRate,
          notes: invoice.notes || "",
          dateValue: toInputDate(invoice.dueDate),
          items: invoice.lineItems.map((li) => ({
            description: li.description,
            quantity: li.quantity,
            unitPrice: li.unitPrice,
            mrc: li.mrc,
            productId: li.productId,
            equipmentId: li.equipmentId,
          })),
        }}
        cancelHref={`/invoices/${invoice.id}`}
        submitLabel="Save changes"
      />
    </>
  );
}
