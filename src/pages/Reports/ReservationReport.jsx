import { useState } from "react";
import ReportPreview from "../../components/admin/reports/ReportPreview";
import ReportMetricFilters from "../../components/admin/reports/ReportMetricFilters";
import useReport from "../../components/admin/hooks/report/useReport";
import {
    getReservationReport,
    generateReservationReportPdf,
    generateReservationReportCsv,
} from "../../api/adminReportApi";

import {
    RESERVATION_REPORT_METRICS,
    DEFAULT_RESERVATION_REPORT_METRICS,
} from "../../helpers/admin/reportMetrics";


export default function ReservationReport() {

    const {
        pdfUrl,
        loading,
        error,
        generateReport,
        generatePdfPreview,
        downloadPdf,
        downloadCsv,
        downloadingPdf,
        downloadingCsv,
    } = useReport({
        getReport: getReservationReport,
        generatePdf: generateReservationReportPdf,
        generateCsv: generateReservationReportCsv,
        reportErrorMessage: "Error al generar el reporte de reservas",
    });

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

    return (
        <section>

            <h1>Reporte de Reservas</h1>

            <ReportMetricFilters
                onGenerate={handleGenerateReport}
                loading={loading}
                metricsOptions={RESERVATION_REPORT_METRICS}
                defaultMetrics={DEFAULT_RESERVATION_REPORT_METRICS}
                metricsTitle="Reporte de Reservas"
            />

            {error && (
                <p>{error}</p>
            )}

            <ReportPreview
                pdfUrl={pdfUrl}
                onDownloadPdf={() =>
                    downloadPdf(
                        reportRequest,
                        "reporte-reservas.pdf"
                    )
                }
                onDownloadCsv={() =>
                    downloadCsv(
                        reportRequest,
                        "reporte-reservas.csv"
                    )
                }
                downloadingPdf={downloadingPdf}
                downloadingCsv={downloadingCsv}
                description="Revisa el reporte de reservas antes de descargarlo."
                title="Vista previa del reporte de reservas"
            />

        </section>
    );
}