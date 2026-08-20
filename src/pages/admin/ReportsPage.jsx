import { Outlet } from "react-router-dom";

export default function ReportsPage() {
    return (
        <section className="reports-page">
            <header className="reports-page__header">
            </header>

            <div className="reports-page__content">
                <Outlet />
            </div>
        </section>
    );
}