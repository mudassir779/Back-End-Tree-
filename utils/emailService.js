import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter only if email configuration is available
let transporter = null;

if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
}

// Send new request notification
export const sendRequestNotification = async (requestData) => {
    try {
        // Check if email is configured
        if (!transporter || !process.env.NOTIFICATION_EMAIL) {
            console.log('Email not configured, skipping notification');
            return;
        }
        const { Contact_Details, Address, Service_details, Availability, Images } = requestData;
        
        // Get selected services
        const selectedServices = [];
        if (Service_details.Tree_Removal) selectedServices.push("Tree Removal");
        if (Service_details.Tree_Trimming) selectedServices.push("Tree Trimming");
        if (Service_details.Palm_Trimming) selectedServices.push("Palm Trimming");
        if (Service_details.Hurricane_Preparation) selectedServices.push("Hurricane Preparation");
        if (Service_details.Root_Health) selectedServices.push("Root Health/Management");
        if (Service_details.Tree_Maintenance_Planning) selectedServices.push("Commercial or Estate Tree Maintenance Planning");

        // Get preferred times
        const preferredTimes = [];
        if (Availability.Arrival_time?.Any_time) preferredTimes.push("Any time");
        if (Availability.Arrival_time?.Morning) preferredTimes.push("Morning");
        if (Availability.Arrival_time?.Afternoon) preferredTimes.push("Afternoon");

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.NOTIFICATION_EMAIL,
            subject: `New Tree Service Request - ${Contact_Details.First_name} ${Contact_Details.Last_name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2d5016;">🌳 New Tree Service Request</h2>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #2d5016; margin-top: 0;">Contact Information</h3>
                        <p><strong>Name:</strong> ${Contact_Details.First_name} ${Contact_Details.Last_name}</p>
                        <p><strong>Email:</strong> ${Contact_Details.Email}</p>
                        <p><strong>Phone:</strong> ${Contact_Details.Phone}</p>
                        ${Contact_Details.Company ? `<p><strong>Company:</strong> ${Contact_Details.Company}</p>` : ''}
                    </div>

                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #2d5016; margin-top: 0;">Address</h3>
                        <p><strong>Street 1:</strong> ${Address.Street1 || 'Not provided'}</p>
                        ${Address.Street2 ? `<p><strong>Street 2:</strong> ${Address.Street2}</p>` : ''}
                        <p><strong>City:</strong> ${Address.City || 'Not provided'}</p>
                        <p><strong>State:</strong> ${Address.State || 'Not provided'}</p>
                        <p><strong>ZIP:</strong> ${Address.Zip || 'Not provided'}</p>
                    </div>

                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #2d5016; margin-top: 0;">Service Details</h3>
                        <p><strong>Property Type:</strong> ${Service_details.PropertyType || 'Not specified'}</p>
                        <p><strong>Services Requested:</strong> ${selectedServices.join(', ')}</p>
                        ${Service_details.Job_Size ? `<p><strong>Job Size:</strong> ${Service_details.Job_Size}</p>` : ''}
                        ${Service_details.Job_Details ? `<p><strong>Additional Details:</strong> ${Service_details.Job_Details}</p>` : ''}
                    </div>

                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #2d5016; margin-top: 0;">Availability</h3>
                        ${Availability.Day ? `<p><strong>Preferred Day:</strong> ${new Date(Availability.Day).toLocaleDateString()}</p>` : ''}
                        ${Availability.Another_Day ? `<p><strong>Alternate Day:</strong> ${new Date(Availability.Another_Day).toLocaleDateString()}</p>` : ''}
                        ${preferredTimes.length > 0 ? `<p><strong>Preferred Times:</strong> ${preferredTimes.join(', ')}</p>` : ''}
                    </div>

                    ${Images && Images.length > 0 ? `
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #2d5016; margin-top: 0;">Uploaded Images</h3>
                        <p>${Images.length} image(s) uploaded</p>
                    </div>
                    ` : ''}

                    <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 0; color: #2d5016;"><strong>Status:</strong> Pending</p>
                        <p style="margin: 5px 0 0 0; color: #666;">Please contact the customer to schedule an appointment.</p>
                    </div>

                    <hr style="margin: 30px 0;">
                    <p style="color: #666; font-size: 12px;">
                        This email was sent from your Tree Service website contact form.<br>
                        Reply directly to this email to contact the customer.
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Request notification email sent successfully');
    } catch (error) {
        console.error('Error sending request notification email:', error);
    }
};

// Send estimate request notification
export const sendEstimateNotification = async (estimateData) => {
    try {
        // Check if email is configured
        if (!transporter || !process.env.NOTIFICATION_EMAIL) {
            console.log('Email not configured, skipping notification');
            return;
        }
        const { customerName, email, phone, service } = estimateData;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.NOTIFICATION_EMAIL,
            subject: `New Estimate Request - ${customerName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2d5016;">💰 New Estimate Request</h2>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #2d5016; margin-top: 0;">Customer Information</h3>
                        <p><strong>Name:</strong> ${customerName}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Service Requested:</strong> ${service}</p>
                    </div>

                    <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 0; color: #2d5016;"><strong>Action Required:</strong> Contact customer for estimate</p>
                        <p style="margin: 5px 0 0 0; color: #666;">Call or email to schedule a site visit.</p>
                    </div>

                    <hr style="margin: 30px 0;">
                    <p style="color: #666; font-size: 12px;">
                        This email was sent from your Tree Service website estimate form.<br>
                        Reply directly to this email to contact the customer.
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Estimate notification email sent successfully');
    } catch (error) {
        console.error('Error sending estimate notification email:', error);
    }
};

