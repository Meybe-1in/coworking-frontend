import "./styles/RoomOccupancy.css";

export default function RoomOccupancyTooltip({
    active,
    payload,
}) {

    if (!active || !payload?.length) {
        return null;
    }

    const room = payload[0].payload;

    return (
        <div className="chart-tooltip">

            <p className="chart-tooltip-title">
                {room.roomName}
            </p>

            <p className="chart-tooltip-item">
                Ocupación:<strong> {room.occupancyPercentage}%</strong>
            </p>

            <p className="chart-tooltip-item">
                Horas reservadas:<strong> {room.reservedHours}</strong>
            </p>

            <p className="chart-tooltip-item">
                Reservas:<strong> {room.reservationCount}</strong>
            </p>

        </div>
    );

}