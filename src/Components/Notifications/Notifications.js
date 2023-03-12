class Notifications {
    static id = 0;
    static notificationsList = [];

    static setState;

    static AddNotification(className, message) {
        let notification = {
            class: className,
            message: message
        };
        notification.id = this.id++;
        this.notificationsList.push(notification);
        this.setState([...this.notificationsList])
    }

    static RemoveNotification(key) {
        const index = this.notificationsList.findIndex(x => x.id == key);

        if (index != -1) {
            this.notificationsList.splice(index, 1);
            this.setState([...this.notificationsList]);
        }
    }
}

export default Notifications;