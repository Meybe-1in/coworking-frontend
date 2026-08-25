import "./FinancialReportPreview.css";

export default function FinancialReportPreview({
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
        <section className="financial-report-preview">

            <div className="financial-report-preview__header">

                <div>
                    <h2>Vista previa del reporte</h2>

                    <p>Revisa el reporte financiero antes de descargarlo.</p>
                </div>

                <div className="financial-report-preview__actions">

                    <button
                        type="button"
                        onClick={onDownloadPdf}
                        disabled={downloadingPdf}
                        className="financial-report-preview__button"
                    >
                        {downloadingPdf
                            ? "Generando PDF..."
                            : "Descargar PDF"}
                    </button>

                    <button
                        type="button"
                        onClick={onDownloadCsv}
                        disabled={downloadingCsv}
                        className="financial-report-preview__button"
                    >
                        {downloadingCsv
                            ? "Generando CSV..."
                            : "Descargar CSV"}
                    </button>

                </div>

            </div>

            <div className="financial-report-preview__document">

                <iframe
                    src={pdfUrl}
                    title="Vista previa del reporte financiero"
                />

            </div>

        </section>
    );
}