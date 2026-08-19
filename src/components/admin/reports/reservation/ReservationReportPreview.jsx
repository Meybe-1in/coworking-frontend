import "./ReservationReportPreview.css";

export default function ReservationReportPreview({
    pdfUrl,
    onDownloadPdf,
    onDownloadCsv,
    downloadingPdf = false,
    downloadingCsv = false,
}) {

    if (!pdfUrl) {
        return null;
    }

    return (
        <section className="reservation-report-preview">

            <div className="reservation-report-preview__header">

                <div>
                    <h2>Vista previa del reporte</h2>

                    <p>Revisa el reporte antes de descargarlo.</p>
                </div>

                <div className="reservation-report-preview__actions">

                    <button
                        type="button"
                        onClick={onDownloadPdf}
                        disabled={downloadingPdf}
                        className="reservation-report-preview__button"
                    >
                        {downloadingPdf
                            ? "Generando PDF..."
                            : "Descargar PDF"}
                    </button>

                    <button
                        type="button"
                        onClick={onDownloadCsv}
                        disabled={downloadingCsv}
                        className="reservation-report-preview__button"
                    >
                        {downloadingCsv
                            ? "Generando CSV..."
                            : "Descargar CSV"}
                    </button>

                </div>

            </div>

            <div className="reservation-report-preview__document">

                <iframe
                    src={pdfUrl}
                    title="Vista previa del reporte de reservas"
                />

            </div>

        </section>
    );
}