import { sendRequestNotification, sendEstimateNotification } from './utils/emailService.js';
import dotenv from 'dotenv';

dotenv.config();

// Test data for main request
const testRequestData = {
    Contact_Details: {
        First_name: "Test",
        Last_name: "User",
        Company: "Test Company",
        Email: "test@example.com",
        Phone: "812-123-4567"
    },
    Address: {
        Street1: "123 Test Street",
        Street2: "Apt 1",
        City: "Evansville",
        State: "IN",
        Zip: "47701"
    },
    Service_details: {
        PropertyType: "Residential",
        Tree_Removal: true,
        Tree_Trimming: false,
        Palm_Trimming: false,
        Hurricane_Preparation: false,
        Root_Health: false,
        Tree_Maintenance_Planning: false,
        Job_Size: "Medium",
        Job_Details: "Test job details"
    },
    Availability: {
        Day: new Date(),
        Another_Day: new Date(Date.now() + 86400000),
        Arrival_time: {
            Any_time: false,
            Morning: true,
            Afternoon: false
        }
    },
    Images: ["test1.jpg", "test2.jpg"],
    Status: "Pending"
};

// Test data for estimate request
const testEstimateData = {
    customerName: "Test Customer",
    email: "testcustomer@example.com",
    phone: "812-987-6543",
    service: "TREE REMOVAL"
};

console.log('Testing email functionality...');
console.log('Make sure you have set up Gmail App Password in .env file');
console.log('');

// Test main request email
console.log('Sending test request notification...');
sendRequestNotification(testRequestData)
    .then(() => {
        console.log('✅ Request notification email sent successfully!');
    })
    .catch((error) => {
        console.error('❌ Error sending request notification:', error.message);
    });

// Test estimate email
console.log('Sending test estimate notification...');
sendEstimateNotification(testEstimateData)
    .then(() => {
        console.log('✅ Estimate notification email sent successfully!');
    })
    .catch((error) => {
        console.error('❌ Error sending estimate notification:', error.message);
    });

