export const MONTH_ABBREVIATIONS = {
    Enero: "Ene",
    Febrero: "Feb",
    Marzo: "Mar",
    Abril: "Abr",
    Mayo: "May",
    Junio: "Jun",
    Julio: "Jul",
    Agosto: "Ago",
    Septiembre: "Sep",
    Octubre: "Oct",
    Noviembre: "Nov",
    Diciembre: "Dic",
};
export function formatChartLabel(value) {
  if (!value.includes("-")) {
    return MONTH_ABBREVIATIONS[value] || value;
  }

  return new Date(value).toLocaleDateString("es-SV", {
    day: "numeric",
    month: "short",
  });
}