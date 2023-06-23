const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const users = [
  {
    ID: 1,
    Name: "John Doe",
    Email: "john@example.com",
    Phone: "123",
    Subscribed: ["Sports"],
    Channels: ["SMS", "E-Mail", "Push Notification"]
  },
  {
    ID: 2,
    Name: "Jane Smith",
    Email: "jane@example.com",
    Phone: "456",
    Subscribed: ["Finance", "Movies"],
    Channels: ["SMS", "E-Mail"]
  },
  // Add more mock users here
];

const logHistory = [];

class SMSNotification {
  sendNotification(user, message) {
    saveLogEntry('SMS', user.Name, message);
  }
}

class EmailNotification {
  sendNotification(user, message) {
    saveLogEntry('Email', user.Name, message);
  }
}

class PushNotification {
  sendNotification(user, message) {
    saveLogEntry('Push', user.Name, message);
  }
}


app.post('/notifications', (req, res) => {
  const { category, message, userName } = req.body;

  let selectedUsers = users; // Select all users by default

  if (userName) {
    selectedUsers = users.filter(user => user.Name === userName); // Filter users by selected userName
  }
  console.log("Selected Users:", selectedUsers); // Add this lin
  const subscribedUsers = selectedUsers.filter(user => {
    console.log("User:", user.Name);
    console.log("Subscribed Categories:", user.Subscribed);
    console.log("Category:", category);
    return user.Subscribed.includes(category);
  });
  console.log("Subscribed Users:", subscribedUsers);
  subscribedUsers.forEach(user => {
    const notificationChannels = []; // Track channels for each user

    user.Channels.forEach(channel => {
      if (!notificationChannels.includes(channel)) {
        notificationChannels.push(channel);

        switch (channel) {
          case 'SMS':
            const smsNotification = new SMSNotification();
            smsNotification.sendNotification(user, message);
            break;
          case 'E-Mail':
            const emailNotification = new EmailNotification();
            emailNotification.sendNotification(user, message);
            break;
          case 'Push Notification':
            const pushNotification = new PushNotification();
            pushNotification.sendNotification(user, message);
            break;
          default:
            break;
        }
      }
    });
  });
  console.log("Notification sending completed.");
  res.sendStatus(200);
});


app.get('/log', (req, res) => {
  const sortedLogHistory = logHistory.sort((a, b) => b.timestamp - a.timestamp);
  res.json(sortedLogHistory);
});

app.get('/users', (req, res) => {
  const userNames = users.map(user => user.Name);
  res.json(userNames);
});

function saveLogEntry(type, user, message) {
  const logEntry = {
    type: type,
    timestamp: new Date(),
    user: user,
    message: message
  };
  logHistory.push(logEntry);
}

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { app, server };