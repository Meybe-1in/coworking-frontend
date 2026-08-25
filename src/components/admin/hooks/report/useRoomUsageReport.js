import { useEffect, useState } from "react";

import {
    getRoomUsageReport,
    generateRoomUsageReportPdf,
    generateRoomUsageReportCsv,
} from "../../../../api/adminReportApi";

export default function useRoomUsageReport() {
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
            const data = await getRoomUsageReport(request);

            setReport(data);

            return data;
        } catch {
            setError(
                "Error al generar el reporte de uso de salas"
            );

            throw new Error(
                "Error al generar el reporte"
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
                await generateRoomUsageReportPdf(request);

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
            return await generateRoomUsageReportPdf(
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
            return await generateRoomUsageReportCsv(
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