import { useMemo } from "react";

import PaymentsTable from "../../components/admin/tables/PaymentsTable";
import { paymentColumns, } from "../../components/admin/columns/paymentColumns";
import usePayments from "../../components/admin/hooks/usePayments";

import Icon from "../../components/admin/ui/Icon";
import { ICONS } from "../../helpers/admin/icons";

export default function PaymentsPage() {
  const {
    payments,
    loading,
    error,
    reloadPayments,
  } = usePayments();

  const payCols = useMemo(
    () => paymentColumns(reloadPayments),
    [reloadPayments]
  );

  return (
    <PaymentsTable
      payments={payments}
      loading={loading}
      error={error}
      reloadPayments={reloadPayments}
      payCol={payCols}
      Icon={Icon}
      ICONS={ICONS}
    />
  );
}