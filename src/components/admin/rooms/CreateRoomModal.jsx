import { useState } from "react";
import { Building2 } from "lucide-react";
import Modal from "../ui/Modal";
import RoomForm from "./RoomForm";
import { createRoom } from "../../../api/roomApi";

export default function CreateRoomModal({ open, onClose, reloadRooms }) {
  const [loading, setLoading] = useState(false);

  const handleCreate = async (roomData, image) => {
    try {
      setLoading(true);
      await createRoom(roomData, image);
      await reloadRooms();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Nueva sala"
      open={open}
      onClose={onClose}
    >
      <RoomForm onSubmit={handleCreate} loading={loading} />
    </Modal>
  );
}