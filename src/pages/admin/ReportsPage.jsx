import { Outlet } from "react-router-dom";

export default function ReportsPage() {
    return (
        <section className="reports-page">
            <header className="reports-page__header">
                <h1>Reportes</h1>
                <p>
                    Consulta y analiza la información del sistema.
                </p>
            </header>

            <div className="reports-page__content">
                <Outlet />
            </div>
        </section>
    );
}