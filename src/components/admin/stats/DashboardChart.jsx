import Loader from "../ui/Loader";
import Err from "../ui/Err";
import CustomSelect from "../ui/CustomSelect";
import { CHART_PERIODS } from "../../../helpers/admin/chartPeriods";

import "./DashboardChart.css";

export default function DashboardChart({
    title,
    loading,
    error,
    data,
    period,
    setPeriod,
    children,
}) {

    return (
        <section className="chart-container">
            <div className="chart-header">

                <h3 className="chart-title">{title}</h3>

                <CustomSelect
                    value={period}
                    onValueChange={setPeriod}
                    options={Object.values(CHART_PERIODS)}
                />

            </div>

            <div className="chart-wrapper">

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Err msg={error} />
                ) : !data || data.length === 0 ? (

                    <div className="chart-empty"> No hay información disponible</div>
                ) : (
                    children
                )}

            </div>
        </section>
    );

}