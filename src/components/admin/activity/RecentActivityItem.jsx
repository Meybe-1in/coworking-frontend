import {
    CalendarClock, CreditCard, ClipboardList,
} from "lucide-react";

import { formatRelativeDate } from "../../../helpers/admin/dateFormatter";

import "./RecentActivity.css";

export default function RecentActivityItem({ activity }) {

    const activityConfig = {

        Pago: {
            icon: <CreditCard size={16} />,
            className: "payment"
        },

        Reserva: {
            icon: <ClipboardList size={16} />,
            className: "reservation"
        }

    };

    const config = activityConfig[activity.type];
    return (

        <li className="recent-activity-item">

            <div className={`recent-activity-icon ${config.className}`}>{config.icon}</div>

            <div className="recent-activity-content">

                <p className="recent-activity-user">
                    {activity.user}
                </p>

                <p className="recent-activity-description">
                    {activity.description}
                </p>

                <div className="recent-activity-date">

                    <CalendarClock size={11} />

                    <span>
                        {formatRelativeDate(activity.date)}
                    </span>

                </div>
            </div>
        </li>

    );

}