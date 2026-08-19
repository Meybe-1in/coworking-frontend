import ReservationReportFilters from "../../components/admin/reports/reservation/ReservationReportFilters";
import useReservationReport from "../../components/admin/hooks/report/useReservationReport";

export default function ReservationReport() {

    const {
        report,
        loading,
        error,
        generateReport,
    } = useReservationReport();

    const handleGenerateReport = async (request) => {
        await generateReport(request);
    };

    return (
        <section>

            <h1>Reporte de Reservas</h1>

            <ReservationReportFilters
                onGenerate={handleGenerateReport}
                loading={loading}
            />

            {error && (
                <p>{error}</p>
            )}

            {report && (
                <pre>
                    {JSON.stringify(report, null, 2)}
                </pre>
            )}

        </section>
    );
}