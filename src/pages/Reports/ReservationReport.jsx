import { useState } from "react";
import ReservationReportPreview from "../../components/admin/reports/reservation/ReservationReportPreview";
import ReservationReportFilters from "../../components/admin/reports/reservation/ReservationReportFilters";
import useReservationReport from "../../components/admin/hooks/report/useReservationReport";


export default function ReservationReport() {

    const {
        report,
        loading,
        error,
        pdfUrl,

        generateReport,
        generatePdfPreview,
        downloadPdf,
        downloadCsv,

        downloadingPdf,
        downloadingCsv,
    } = useReservationReport();

    const [reportRequest, setReportRequest] = useState(null);
    const handleGenerateReport = async (request) => {
        try {
            await generateReport(request);
            setReportRequest(request);
            await generatePdfPreview(request);

        } catch {
            // El hook ya maneja el error.
        }
    };

    const handleDownloadPdf = async () => {

        if (!reportRequest) {
            return;
        }

        try {
            const blob = await downloadPdf(reportRequest);
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = "reporte-reservas.pdf";

            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);

        } catch {
            // El hook ya maneja el error.
        }
    };
    const handleDownloadCsv = async () => {

        if (!reportRequest) {
            return;
        }

        try {
            const blob = await downloadCsv(reportRequest);
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = "reporte-reservas.csv";

            document.body.appendChild(link);

            link.click();
            link.remove();
            URL.revokeObjectURL(url);

        } catch {
            // El hook ya maneja el error.
        }
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

            <ReservationReportPreview
                pdfUrl={pdfUrl}
                onDownloadPdf={handleDownloadPdf}
                onDownloadCsv={handleDownloadCsv}
                downloadingPdf={downloadingPdf}
                downloadingCsv={downloadingCsv}
            />

        </section>
    );
}