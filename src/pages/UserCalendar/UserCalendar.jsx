import ReservationCalendar from "../../components/Calendar/ReservationCalendar";
import NavbarUser from "../../components/NavbarUser/NavbarUser";

export default function UserCalendar() {
  return (
    <>
      <NavbarUser />
      <main className="pt-24 max-w-7xl mx-auto px-4">
        <ReservationCalendar />
      </main>
    </>
  );
}
