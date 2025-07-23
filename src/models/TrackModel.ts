// This is Tracker Schema Model ::

import { Schema, model, models } from "mongoose";

const TrackSchema = new Schema({
    name: {
        type: String,
        default: undefined
    },
    email: {
        type: String,
        default: undefined
    },
    phoneNumber: {
        type: Number,
        default: undefined
    },
    pinCode: {
        type: String,
        default: undefined
    },
    city: {
        type: String,
        default: undefined
    },
    deviceName: {
        type: String,
        default: undefined
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others'],
        default: undefined,
    },
    trafficSource: {
        type: String,
        default: undefined
    },
    perPageTrack: [
        {
            pageUrl: {
                type: String,
                default: undefined
            },
            spendTime: {
                type: String,
                default: undefined
            },
        }
    ],
    revisit: {
        type: Number,
        default: 0
    },
    deviceIPAddress: {
        type: String,
        default: undefined
    }
}, { timestamps: true });

const TrackModel = models.TrackModel || model("TrackModel", TrackSchema);
export default TrackModel;

/* 
[
  {
    "name": "Rahul Sharma",
    "email": "rahul.sharma@example.com",
    "phoneNumber": 919876543210,
    "pinCode": "110001",
    "city": "New Delhi",
    "deviceName": "OnePlus 11",
    "gender": "Male",
    "trafficSource": "Google",
    "perPageTrack": [
      { "pageUrl": "/home", "spendTime": "00:01:20" },
      { "pageUrl": "/about", "spendTime": "00:00:50" }
    ],
    "revisit": 1,
    "createdAt": "2024-06-01T10:00:00.000Z",
    "updatedAt": "2024-06-01T10:05:00.000Z"
  },
  {
    "name": "Priya Singh",
    "email": "priya.singh@example.com",
    "phoneNumber": 919812345678,
    "pinCode": "400001",
    "city": "Mumbai",
    "deviceName": "iPhone 14",
    "gender": "Female",
    "trafficSource": "Facebook",
    "perPageTrack": [
      { "pageUrl": "/services", "spendTime": "00:02:10" }
    ],
    "revisit": 2,
    "createdAt": "2024-06-02T11:00:00.000Z",
    "updatedAt": "2024-06-02T11:10:00.000Z"
  },
  {
    "name": "Amit Patel",
    "email": "amit.patel@example.com",
    "phoneNumber": 919900112233,
    "pinCode": "380015",
    "city": "Ahmedabad",
    "deviceName": "Samsung Galaxy S23",
    "gender": "Male",
    "trafficSource": "Instagram",
    "perPageTrack": [
      { "pageUrl": "/contact", "spendTime": "00:00:45" }
    ],
    "revisit": 7,
    "createdAt": "2024-06-03T12:00:00.000Z",
    "updatedAt": "2024-06-03T12:00:00.000Z"
  },
  {
    "name": "Sneha Reddy",
    "email": "sneha.reddy@example.com",
    "phoneNumber": 919988776655,
    "pinCode": "500081",
    "city": "Hyderabad",
    "deviceName": "Vivo X90",
    "gender": "Female",
    "trafficSource": "LinkedIn",
    "perPageTrack": [
      { "pageUrl": "/blog", "spendTime": "00:03:00" }
    ],
    "revisit": 1,
    "createdAt": "2024-06-04T13:00:00.000Z",
    "updatedAt": "2024-06-04T13:15:00.000Z"
  },
  {
    "name": "Rohan Mehta",
    "email": "rohan.mehta@example.com",
    "phoneNumber": 919911223344,
    "pinCode": "700001",
    "city": "Kolkata",
    "deviceName": "Realme GT",
    "gender": "Male",
    "trafficSource": "Direct",
    "perPageTrack": [
      { "pageUrl": "/portfolio", "spendTime": "00:01:10" }
    ],
    "revisit": 3,
    "createdAt": "2024-06-05T14:00:00.000Z",
    "updatedAt": "2024-06-05T14:05:00.000Z"
  },
  {
    "name": "Emily Johnson",
    "email": "emily.johnson@example.com",
    "phoneNumber": 12025550123,
    "pinCode": "10001",
    "city": "New York",
    "deviceName": "iPhone 13",
    "gender": "Female",
    "trafficSource": "Google",
    "perPageTrack": [
      { "pageUrl": "/faq", "spendTime": "00:00:40" }
    ],
    "revisit": 2,
    "createdAt": "2024-06-06T15:00:00.000Z",
    "updatedAt": "2024-06-06T15:00:00.000Z"
  },
  {
    "name": "James Smith",
    "email": "james.smith@example.com",
    "phoneNumber": 447911123456,
    "pinCode": "SW1A1AA",
    "city": "London",
    "deviceName": "Samsung S22",
    "gender": "Male",
    "trafficSource": "Twitter",
    "perPageTrack": [
      { "pageUrl": "/pricing", "spendTime": "00:01:15" }
    ],
    "revisit": 2,
    "createdAt": "2024-06-07T16:00:00.000Z",
    "updatedAt": "2024-06-07T16:20:00.000Z"
  },
  {
    "name": "Aarav Kumar",
    "email": "aarav.kumar@example.com",
    "phoneNumber": 919922334455,
    "pinCode": "600001",
    "city": "Chennai",
    "deviceName": "Oppo Reno8",
    "gender": "Male",
    "trafficSource": "Referral",
    "perPageTrack": [
      { "pageUrl": "/events", "spendTime": "00:02:00" }
    ],
    "revisit": 1,
    "createdAt": "2024-06-08T17:00:00.000Z",
    "updatedAt": "2024-06-08T17:10:00.000Z"
  },
  {
    "name": "Saanvi Desai",
    "email": "saanvi.desai@example.com",
    "phoneNumber": 919933445566,
    "pinCode": "682001",
    "city": "Kochi",
    "deviceName": "iPad Air",
    "gender": "Female",
    "trafficSource": "YouTube",
    "perPageTrack": [
      { "pageUrl": "/help", "spendTime": "00:00:55" }
    ],
    "revisit": 7,
    "createdAt": "2024-06-09T18:00:00.000Z",
    "updatedAt": "2024-06-09T18:00:00.000Z"
  },
  {
    "name": "Ayesha Rahman",
    "email": "ayesha.rahman@example.com",
    "phoneNumber": 8801712345678,
    "pinCode": "1207",
    "city": "Dhaka",
    "deviceName": "Google Pixel 7",
    "gender": "Others",
    "trafficSource": "Instagram",
    "perPageTrack": [
      { "pageUrl": "/contact", "spendTime": "00:01:05" }
    ],
    "revisit": 1,
    "createdAt": "2024-06-10T19:00:00.000Z",
    "updatedAt": "2024-06-10T19:00:00.000Z"
  }
]

*/