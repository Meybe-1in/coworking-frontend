import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { getCalendar } from "../../api/axiosConfig";


export default function ReservationCalendar() {
  const loadEvents = async (info, successCallback, failureCallback) => {
    try {
      const data = await getCalendar(info.startStr, info.endStr);

      const formatted = data.map(e => ({
        title: e.title,
        start: e.start,
        end: e.end,
        backgroundColor: "#3b82f6",
        borderColor: "#3b82f6",
        textColor: "#fff"
      }));

      successCallback(formatted);
    } catch (error) {
      failureCallback(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"

        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}

        buttonText={{
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día"
        }}

        events={loadEvents}

        slotMinTime="07:00:00"
        slotMaxTime="21:00:00"
        allDaySlot={false}
        selectable={false}
        editable={false}
        height="auto"
      />
    </div>
  );
}
