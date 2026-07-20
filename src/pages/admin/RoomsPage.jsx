import { useMemo, useState } from "react";

import RoomsTable from "../../components/admin/tables/RoomsTable";
import { roomColumns, } from "../../components/admin/columns/roomColumns";
import useRooms from "../../components/admin/hooks/useRooms";
import useRoomActions from "../../components/admin/hooks/useRoomActions";

import EditRoomModal from "../../components/admin/rooms/EditRoomModal";

import Icon from "../../components/admin/ui/Icon";
import { ICONS } from "../../helpers/admin/icons";

export default function RoomsPage() {
  const [editingRoom, setEditingRoom] =
    useState(null);

  const {
    rooms,
    loading,
    error,
    reloadRooms,
  } = useRooms();

  const {
    deleteRoomAction,
  } = useRoomActions(reloadRooms);

  const handleEditRoom = (room) => {
    setEditingRoom(room);
  };

  const roomCols = useMemo(
    () =>
      roomColumns(
        handleEditRoom,
        deleteRoomAction
      ),
    [deleteRoomAction]
  );

  return (
    <>
      <RoomsTable
        rooms={rooms}
        loading={loading}
        error={error}
        reloadRooms={reloadRooms}
        roomCols={roomCols}
        Icon={Icon}
        ICONS={ICONS}
      />

      {editingRoom && (
        <EditRoomModal
          room={editingRoom}
          open={!!editingRoom}
          onClose={() => setEditingRoom(null)}
          reloadRooms={reloadRooms}
        />
      )}
    </>
  );
}