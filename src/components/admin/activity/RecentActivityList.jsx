import Loader from "../ui/Loader";
import Err from "../ui/Err";

import DashboardChart from "../stats/DashboardChart";
import RecentActivityItem from "./RecentActivityItem";

export default function RecentActivityList({
    activities = [],
    loading,
    error,
}) {

    return (

        <DashboardChart
            title="Actividad reciente"
            data={activities}
            loading={loading}
            error={error}
        >
            {activities.length === 0 ? (

                <div className="recent-activity-empty">

                    <p className="recent-activity-empty-title">
                        No hay actividad reciente
                    </p>

                    <p className="recent-activity-empty-description">
                        Las acciones del sistema aparecerán aquí
                    </p>

                </div>

            ) : (
                <ul className="recent-activity-list">

                    {activities.map(activity => (

                        <RecentActivityItem
                            key={`${activity.type}-${activity.date}`}
                            activity={activity}
                        />

                    ))}

                </ul>
            )}
        </DashboardChart>
    );

}