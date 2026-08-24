import { useEffect, useState } from "react";

import {
    getFinancialReport,
    generateFinancialReportPdf,
    generateFinancialReportCsv,
} from "../../../../api/adminReportApi";

export default function useFinancialReport() {

    const [report, setReport] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);

    const [loading, setLoading] = useState(false);
    const [downloadingPdf, setDownloadingPdf] = useState(false);
    const [downloadingCsv, setDownloadingCsv] = useState(false);

    const [error, setError] = useState(null);

    useEffect(() => {
        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [pdfUrl]);

    const generateReport = async (request) => {

        setLoading(true);
        setError(null);

        try {

            const data = await getFinancialReport(request);

            setReport(data);

            return data;

        } catch {

            setError(
                "Error al generar el reporte financiero"
            );

            throw new Error(
                "Error al generar el reporte financiero"
            );

        } finally {

            setLoading(false);

        }
    };

    const generatePdfPreview = async (request) => {

        setDownloadingPdf(true);
        setError(null);

        try {

            const blob =
                await generateFinancialReportPdf(request);

            const url =
                URL.createObjectURL(blob);

            setPdfUrl(url);

            return blob;

        } catch {

            setError(
                "Error al generar el PDF"
            );

            throw new Error(
                "Error al generar el PDF"
            );

        } finally {

            setDownloadingPdf(false);

        }
    };

    const downloadPdf = async (request) => {

        setDownloadingPdf(true);
        setError(null);

        try {

            return await generateFinancialReportPdf(
                request
            );

        } catch {

            setError(
                "Error al generar el PDF"
            );

            throw new Error(
                "Error al generar el PDF"
            );

        } finally {

            setDownloadingPdf(false);

        }
    };

    const downloadCsv = async (request) => {

        setDownloadingCsv(true);
        setError(null);

        try {

            return await generateFinancialReportCsv(
                request
            );

        } catch {

            setError(
                "Error al generar el CSV"
            );

            throw new Error(
                "Error al generar el CSV"
            );

        } finally {

            setDownloadingCsv(false);

        }
    };

    return {
        report,
        pdfUrl,
        loading,
        downloadingPdf,
        downloadingCsv,
        error,
        generateReport,
        generatePdfPreview,
        downloadPdf,
        downloadCsv,
    };
}