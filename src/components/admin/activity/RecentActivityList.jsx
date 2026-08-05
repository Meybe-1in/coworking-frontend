import Loader from "../ui/Loader";
import Err from "../ui/Err";

import DashboardChart from "../stats/DashboardChart";
import RecentActivityItem from "./RecentActivityItem";

export default function RecentActivityList({
    activities,
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
            <ul className="recent-activity-list">

                {activities.map(activity => (

                    <RecentActivityItem
                        key={`${activity.type}-${activity.date}`}
                        activity={activity}
                    />

                ))}

            </ul>
        </DashboardChart>
    );

}