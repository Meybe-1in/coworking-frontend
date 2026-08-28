import { useEffect, useState } from "react";

export default function useReport({
    getReport,
    generatePdf,
    generateCsv,
    reportErrorMessage,
}) {
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
            return await getReport(request);
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

            setPdfUrl((previousUrl) => {
                if (previousUrl) {
                    URL.revokeObjectURL(previousUrl);
                }

                return url;
            });

            return blob;
        } catch {
            const message = "Error al generar el PDF";

            setError(message);
            throw new Error(message);
        } finally {
            setDownloadingPdf(false);
        }
    };

    const downloadFile = (blob, filename) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);
    };

    const downloadPdf = async (request, filename) => {
        setDownloadingPdf(true);
        setError(null);

        try {
            const blob = await generatePdf(request);

            downloadFile(blob, filename);

            return blob;
        } catch {
            const message = "Error al generar el PDF";

            setError(message);
            throw new Error(message);
        } finally {
            setDownloadingPdf(false);
        }
    };

    const downloadCsv = async (request, filename) => {
        setDownloadingCsv(true);
        setError(null);

        try {
            const blob = await generateCsv(request);

            downloadFile(blob, filename);

            return blob;
        } catch {
            const message = "Error al generar el CSV";

            setError(message);
            throw new Error(message);
        } finally {
            setDownloadingCsv(false);
        }
    };

    return {
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