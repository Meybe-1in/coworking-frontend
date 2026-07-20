import { useMemo } from "react";

import ReservationsTable from "../../components/admin/tables/ReservationsTable";
import { reservationColumns, } from "../../components/admin/columns/reservationColumns";
import useReservations from "../../components/admin/hooks/useReservations";

import Icon from "../../components/admin/ui/Icon";
import { ICONS } from "../../helpers/admin/icons";

export default function ReservationsPage() {
  const {
    reservations,
    loading,
    error,
    reloadReservations,
  } = useReservations();

  const resCols = useMemo(
    () => reservationColumns(reloadReservations),
    [reloadReservations]
  );

  return (
    <ReservationsTable
      reservations={reservations}
      loading={loading}
      error={error}
      reloadReservations={reloadReservations}
      resCols={resCols}
      Icon={Icon}
      ICONS={ICONS}
    />
  );
}