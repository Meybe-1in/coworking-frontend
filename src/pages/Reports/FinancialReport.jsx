import { useState } from "react";

import FinancialReportPreview from "../../components/admin/reports/financial/FinancialReportPreview";
import FinancialReportFilters from "../../components/admin/reports/financial/FinancialReportFilters";
import useFinancialReport from "../../components/admin/hooks/report/useFinancialReport";

export default function FinancialReport() {

    const {
        loading,
        error,
        pdfUrl,
        generateReport,
        generatePdfPreview,
        downloadPdf,
        downloadCsv,
        downloadingPdf,
        downloadingCsv,
    } = useFinancialReport();

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

    const handleDownloadPdf = async () => {

        if (!reportRequest) {
            return;
        }

        try {

            const blob =
                await downloadPdf(reportRequest);

            const url =
                URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;
            link.download = "reporte-financiero.pdf";

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

            const blob =
                await downloadCsv(reportRequest);

            const url =
                URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;
            link.download = "reporte-financiero.csv";

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

            <h1>
                Reporte Financiero
            </h1>

            <FinancialReportFilters
                onGenerate={handleGenerateReport}
                loading={loading}
            />

            {error && (
                <p>
                    {error}
                </p>
            )}

            <FinancialReportPreview
                pdfUrl={pdfUrl}
                onDownloadPdf={handleDownloadPdf}
                onDownloadCsv={handleDownloadCsv}
                downloadingPdf={downloadingPdf}
                downloadingCsv={downloadingCsv}
            />

        </section>
    );
}