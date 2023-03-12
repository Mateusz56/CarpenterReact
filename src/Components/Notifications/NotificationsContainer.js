import { useState } from "react";
import Notifications from "./Notifications"

function PopupsContainer(props) {
    const [ notifications, setNotifications ] = useState([]);
    Notifications.setState = setNotifications

    return (
        <div className={`NotificationsContainer`}>
            {notifications.map(x =>
                <div key={x.id} className={`Notification ${x.class}`} onClick={() => Notifications.RemoveNotification(x.id)}>
                    {x.message}
                </div>
            )}
        </div>
    )
}

export default PopupsContainer;