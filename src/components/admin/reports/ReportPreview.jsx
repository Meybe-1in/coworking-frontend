import "./ReportPreview.css";

export default function ReportPreview({
    pdfUrl,
    onDownloadPdf,
    onDownloadCsv,
    downloadingPdf = false,
    downloadingCsv = false,
    description = "Revisa el reporte antes de descargarlo.",
    title = "Vista previa del reporte",
}) {
    if (!pdfUrl) {
        return null;
    }

    return (
        <section className="report-preview">
            <div className="report-preview__header">
                <div className="report-preview__info">
                    <h2>Vista previa del reporte</h2>

                    <p>{description}</p>
                </div>

                <div className="report-preview__actions">
                    <button
                        type="button"
                        onClick={onDownloadPdf}
                        disabled={downloadingPdf}
                        className="report-preview__button"
                    >
                        {downloadingPdf
                            ? "Generando PDF..."
                            : "Descargar PDF"}
                    </button>

                    <button
                        type="button"
                        onClick={onDownloadCsv}
                        disabled={downloadingCsv}
                        className="report-preview__button"
                    >
                        {downloadingCsv
                            ? "Generando CSV..."
                            : "Descargar CSV"}
                    </button>
                </div>
            </div>

            <div className="report-preview__document">
                <iframe
                    src={pdfUrl}
                    title={title}
                />
            </div>
        </section>
    );
}