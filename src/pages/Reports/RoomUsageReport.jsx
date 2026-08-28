import { useState } from "react";

import ReportPreview from "../../components/admin/reports/ReportPreview";
import ReportMetricFilters from "../../components/admin/reports/ReportMetricFilters";
import useReport from "../../components/admin/hooks/report/useReport";
import {
    getRoomUsageReport,
    generateRoomUsageReportPdf,
    generateRoomUsageReportCsv,
} from "../../api/adminReportApi";

import {
    ROOM_USAGE_REPORT_METRICS,
    DEFAULT_ROOM_USAGE_REPORT_METRICS,
} from "../../helpers/admin/reportMetrics";


export default function RoomUsageReport() {
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
        getReport: getRoomUsageReport,
        generatePdf: generateRoomUsageReportPdf,
        generateCsv: generateRoomUsageReportCsv,
        reportErrorMessage: "Error al generar el reporte de uso de salas",
    });

    const [reportRequest, setReportRequest] =
        useState(null);

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
            <h1>Reporte de Uso de Salas</h1>

            <ReportMetricFilters
                onGenerate={handleGenerateReport}
                loading={loading}
                metricsOptions={ROOM_USAGE_REPORT_METRICS}
                defaultMetrics={DEFAULT_ROOM_USAGE_REPORT_METRICS}
                metricsTitle="Reporte de Uso de Salas"
            />

            {error && (
                <p>{error}</p>
            )}

            <ReportPreview
                pdfUrl={pdfUrl}
                onDownloadPdf={() =>
                    downloadPdf(
                        reportRequest,
                        "reporte-uso-salas.pdf"
                    )
                }
                onDownloadCsv={() =>
                    downloadCsv(
                        reportRequest,
                        "reporte-uso-salas.csv"
                    )
                }
                downloadingPdf={downloadingPdf}
                downloadingCsv={downloadingCsv}
                description="Revisa el reporte de uso de salas antes de descargarlo."
                title="Vista previa del reporte de uso de salas"
            />
        </section>
    );
}