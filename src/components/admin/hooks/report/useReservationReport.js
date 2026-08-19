import { useEffect, useState } from "react";
import {
    getReservationReport,
    generateReservationReportPdf,
    generateReservationReportCsv,
} from "../../../../api/adminReportApi";

export default function useReservationReport() {

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

            const data =
                await getReservationReport(request);

            setReport(data);

            return data;

        } catch {

            setError(
                "Error al generar el reporte de reservas"
            );

            throw new Error(
                "Error al generar el reporte"
            );

        } finally {

            setLoading(false);

        }
    };

    const downloadPdf = async (request) => {

        setDownloadingPdf(true);
        setError(null);

        try {

            const blob =
                await generateReservationReportPdf(request);

            const url =
                URL.createObjectURL(blob);

            setPdfUrl(url);

            return blob;

        } catch {

            setError("Error al generar el PDF");

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

            return await generateReservationReportCsv(
                request
            );

        } catch {

            setError("Error al generar el CSV");

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
        downloadPdf,
        downloadCsv,
    };
}