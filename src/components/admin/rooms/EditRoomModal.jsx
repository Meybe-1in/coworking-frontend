import { useState } from "react";
import Modal from "../ui/Modal";
import RoomForm from "./RoomForm";
import { updateRoom } from "../../../api/roomApi";

export default function EditRoomModal({
  room,
  open,
  onClose,
  reloadRooms,
}) {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (
    roomData,
    image
  ) => {
    try {
      setLoading(true);

      await updateRoom(
        room.id,
        roomData,
        image
      );

      await reloadRooms();

      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Editar sala"
      open={open}
      onClose={onClose}
    >
      <RoomForm
        initialData={room}
        onSubmit={handleUpdate}
        loading={loading}
      />
    </Modal>
  );
}