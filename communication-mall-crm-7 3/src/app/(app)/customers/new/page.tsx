import { PageHeader } from "@/components/ui";
import CustomerForm from "@/components/CustomerForm";
import { createCustomer } from "../actions";

export default function NewCustomerPage() {
  return (
    <>
      <PageHeader title="New customer" />
      <CustomerForm action={createCustomer} cancelHref="/customers" />
    </>
  );
}
