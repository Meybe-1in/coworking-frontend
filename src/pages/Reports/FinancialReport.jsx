import { useState } from "react";

import ReportMetricsFilters from "../../components/admin/reports/ReportMetricsFilters";
import ReportPreview from "../../components/admin/reports/ReportPreview";
import useReport from "../../components/admin/hooks/report/useReport";
import {
    getFinancialReport,
    generateFinancialReportPdf,
    generateFinancialReportCsv,
} from "../../api/adminReportApi";

import {
    FINANCIAL_REPORT_METRICS,
    DEFAULT_FINANCIAL_REPORT_METRICS,
} from "../../helpers/admin/reportMetrics";

export default function FinancialReport() {
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
        getReport: getFinancialReport,
        generatePdf: generateFinancialReportPdf,
        generateCsv: generateFinancialReportCsv,
        reportErrorMessage:
            "Error al generar el reporte financiero",
    });

    const [reportRequest, setReportRequest] =
        useState(null);

    const handleGenerateReport = async (request) => {
        try {
            await generateReport(request);

            setReportRequest(request);

            await generatePdfPreview(request);
        } catch {
            // El hook maneja el error.
        }
    };

    return (
        <section>
            <h1>Reporte Financiero</h1>

            <ReportMetricsFilters
                onGenerate={handleGenerateReport}
                loading={loading}
                metricsOptions={FINANCIAL_REPORT_METRICS}
                defaultMetrics={DEFAULT_FINANCIAL_REPORT_METRICS}
                metricsTitle="Reporte financiero"
            />

            {error && <p>{error}</p>}

            <ReportPreview
                pdfUrl={pdfUrl}
                onDownloadPdf={() =>
                    downloadPdf(
                        reportRequest,
                        "reporte-financiero.pdf"
                    )
                }
                onDownloadCsv={() =>
                    downloadCsv(
                        reportRequest,
                        "reporte-financiero.csv"
                    )
                }
                downloadingPdf={downloadingPdf}
                downloadingCsv={downloadingCsv}
                description="Revisa el reporte financiero antes de descargarlo."
                title="Vista previa del reporte financiero"
            />
        </section>
    );
}