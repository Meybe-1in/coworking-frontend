import "./RoomUsageReportPreview.css";

export default function RoomUsageReportPreview({
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
        <section className="room-usage-report-preview">
            <div className="room-usage-report-preview__header">

                <div className="room-usage-report-preview__info">
                    <h2>Vista previa del reporte</h2>

                    <p>
                        Revisa el reporte antes de descargarlo.
                    </p>
                </div>

                <div className="room-usage-report-preview__actions">

                    <button
                        type="button"
                        onClick={onDownloadPdf}
                        disabled={downloadingPdf}
                        className="room-usage-report-preview__button"
                    >
                        {downloadingPdf
                            ? "Generando PDF..."
                            : "Descargar PDF"}
                    </button>

                    <button
                        type="button"
                        onClick={onDownloadCsv}
                        disabled={downloadingCsv}
                        className="room-usage-report-preview__button"
                    >
                        {downloadingCsv
                            ? "Generando CSV..."
                            : "Descargar CSV"}
                    </button>

                </div>
            </div>

            <div className="room-usage-report-preview__document">
                <iframe
                    src={pdfUrl}
                    title="Vista previa del reporte de uso de salas"
                />
            </div>
        </section>
    );
}