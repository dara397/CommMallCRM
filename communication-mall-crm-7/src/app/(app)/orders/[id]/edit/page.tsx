import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/ui";
import DocumentForm from "@/components/DocumentForm";
import { loadFormLookups } from "@/lib/formData";
import { defaultTaxRate } from "@/lib/config";
import { toInputDateTime } from "@/lib/format";
import { updateOrder } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditOrderPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await prisma.serviceOrder.findUnique({
    where: { id: params.id },
    include: { lineItems: { orderBy: { sortOrder: "asc" } } },
  });
  if (!order) notFound();

  const { customers, products, equipment } = await loadFormLookups();
  const action = updateOrder.bind(null, order.id);

  return (
    <>
      <PageHeader title={`Edit order ${order.number}`} />
      <DocumentForm
        action={action}
        docType="ORDER"
        customers={customers}
        products={products}
        equipment={equipment}
        defaultTaxRate={defaultTaxRate}
        initial={{
          customerId: order.customerId,
          taxRate: order.taxRate,
          notes: order.notes || "",
          dateValue: toInputDateTime(order.scheduledAt),
          items: order.lineItems.map((li) => ({
            description: li.description,
            quantity: li.quantity,
            unitPrice: li.unitPrice,
            mrc: li.mrc,
            productId: li.productId,
            equipmentId: li.equipmentId,
          })),
        }}
        cancelHref={`/orders/${order.id}`}
        submitLabel="Save changes"
      />
    </>
  );
}
