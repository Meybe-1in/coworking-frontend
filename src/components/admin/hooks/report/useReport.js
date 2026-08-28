import { useEffect, useState } from "react";

export default function useReport({
    getReport,
    generatePdf,
    generateCsv,
    reportErrorMessage,
}) {
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
            const data = await getReport(request);

            setReport(data);

            return data;
        } catch {
            setError(reportErrorMessage);

            throw new Error(reportErrorMessage);
        } finally {
            setLoading(false);
        }
    };

    const generatePdfPreview = async (request) => {
        setDownloadingPdf(true);
        setError(null);

        try {
            const blob = await generatePdf(request);

            const url = URL.createObjectURL(blob);

            setPdfUrl(url);

            return blob;
        } catch {
            setError("Error al generar el PDF");

            throw new Error("Error al generar el PDF");
        } finally {
            setDownloadingPdf(false);
        }
    };

    const downloadPdf = async (request) => {
        setDownloadingPdf(true);
        setError(null);

        try {
            return await generatePdf(request);
        } catch {
            setError("Error al generar el PDF");

            throw new Error("Error al generar el PDF");
        } finally {
            setDownloadingPdf(false);
        }
    };

    const downloadCsv = async (request) => {
        setDownloadingCsv(true);
        setError(null);

        try {
            return await generateCsv(request);
        } catch {
            setError("Error al generar el CSV");

            throw new Error("Error al generar el CSV");
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