import { useState } from "react";

import RoomUsageReportPreview from "../../components/admin/reports/room/RoomUsageReportPreview";

import RoomUsageReportFilters from "../../components/admin/reports/room/RoomUsageReportFilters";

import useRoomUsageReport from "../../components/admin/hooks/report/useRoomUsageReport";

export default function RoomUsageReport() {
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
    } = useRoomUsageReport();

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

            link.download =
                "reporte-uso-salas.pdf";

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

            link.download =
                "reporte-uso-salas.csv";

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
            <h1>Reporte de Uso de Salas</h1>

            <RoomUsageReportFilters
                onGenerate={handleGenerateReport}
                loading={loading}
            />

            {error && (
                <p>{error}</p>
            )}

            <RoomUsageReportPreview
                pdfUrl={pdfUrl}
                onDownloadPdf={handleDownloadPdf}
                onDownloadCsv={handleDownloadCsv}
                downloadingPdf={downloadingPdf}
                downloadingCsv={downloadingCsv}
            />
        </section>
    );
}