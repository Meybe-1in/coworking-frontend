import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import { getCalendar } from "../../api/axiosConfig";

export default function ReservationCalendar() {
  const [events, setEvents] = useState([]);

  const loadEvents = async (info) => {
    const data = await getCalendar(info.startStr, info.endStr);

    setEvents(
      data.map(e => ({
        title: e.title,
        start: e.start,
        end: e.end,
        display: "background",
        backgroundColor: "#ef4444"
      }))
    );
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        events={events}
        slotMinTime="07:00:00"   // empieza a las 7 AM
        slotMaxTime="21:00:00"   // termina a las 8 PM
        allDaySlot={false}
        selectable={false}
        editable={false}
        height="auto"
        eventsSet={loadEvents}
      />
    </div>
  );
}
