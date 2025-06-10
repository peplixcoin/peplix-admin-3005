const Notification = require('../models/Notification');

// Add a new notification
exports.addNotification = async (req, res) => {
    const { message, isImportant } = req.body;

    try {
        const newNotification = new Notification({
            message,
            isImportant,
        });
        await newNotification.save();
        res.status(201).json({ message: 'Notification added successfully', newNotification });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add notification', error });
    }
};

// Get all notifications
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch notifications', error });
    }
};

// Update a notification
exports.updateNotification = async (req, res) => {
    const { id } = req.params;
    const { message, isImportant } = req.body;

    try {
        const updatedNotification = await Notification.findByIdAndUpdate(id, { message, isImportant }, { new: true });
        if (!updatedNotification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.json({ message: 'Notification updated successfully', updatedNotification });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update notification', error });
    }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNotification = await Notification.findByIdAndDelete(id);
        if (!deletedNotification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete notification', error });
    }
};
