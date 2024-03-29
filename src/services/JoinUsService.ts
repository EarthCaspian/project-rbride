import { JoinUsModel } from "../models/requests/JoinUsModel";

const sendEmail = async (values : JoinUsModel) => {
    const url = 'http://localhost:8080/api/contact/sendJoinUsEmail';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            console.log('Mail sent successfully');
            return { success: true };
        } else {
            console.error('Failed to send mail');
            return { success: false, error: 'Failed to send mail' };
        }
    } catch (error) {
        console.error('Error sending mail:', error);
        return { success: false, error: 'Error sending mail' };
    }
};

export { sendEmail };