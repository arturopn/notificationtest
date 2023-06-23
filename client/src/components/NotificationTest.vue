<template>
  <div class="container">
    <h2>NotificationTest</h2>
    <form @submit.prevent="submitNotification" class="notification-form">
      <div class="form-group">
        <label for="category">Category:</label>
        <select id="category" v-model="category" class="form-control">
          <option value="Sports">Sports</option>
          <option value="Finance">Finance</option>
          <option value="Movies">Movies</option>
        </select>
      </div>
      <div class="form-group">
        <label for="message">Message:</label>
        <textarea
          id="message"
          v-model="message"
          rows="5"
          class="form-control"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="user">User:</label>
        <select
          id="user"
          v-model="selectedUser"
          class="form-control"
          autocomplete="off"
        >
          <option value="" disabled>Select a user</option>
          <option v-for="user in users" :value="user" :key="user">
            {{ user }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="channel">Notification Type:</label>
        <select id="channel" v-model="selectedChannel" class="form-control">
          <option value="">Select a notification type</option>
          <option value="SMS">SMS</option>
          <option value="Email">Email</option>
          <option value="Push">Push Notification</option>
        </select>
      </div>
      <button type="submit" class="btn-submit">Submit</button>
    </form>

    <h2>Log History</h2>
    <div class="log-container">
      <div v-for="log in logHistory" :key="log.id" class="log-item">
        <div class="log-label">Notification Type:</div>
        <div class="log-value">{{ log.channel }}</div>
        <div class="log-label">User Name:</div>
        <div class="log-value">{{ log.user }}</div>
        <div class="log-label">Sent on:</div>
        <div class="log-value">{{ formatReadableDate(log.timestamp) }}</div>
        <div class="log-label">Message:</div>
        <div class="log-message">{{ log.message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  data() {
    return {
      category: "Sports",
      message: "",
      logHistory: [],
      selectedUser: "",
      selectedChannel: "",
      users: [],
      axios: axios,
    };
  },
  methods: {
    submitNotification() {
      if (this.message.trim() === "") {
        alert("Message cannot be empty");
        return;
      }

      const notification = {
        category: this.category,
        message: this.message,
        userName: this.selectedUser,
        type: this.selectedChannel,
      };

      axios
        .post("http://localhost:3000/notifications", notification)
        .then(() => {
          this.message = "";
          this.fetchLogHistory();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchLogHistory() {
      axios
        .get("http://localhost:3000/log")
        .then((response) => {
          this.logHistory = response.data.map((log) => {
            return {
              channel: this.getChannelName(log.type),
              timestamp: log.timestamp,
              user: log.user,
              message: log.message,
            };
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchUsers() {
      axios
        .get("http://localhost:3000/users")
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getChannelName(type) {
      switch (type) {
        case "SMS":
          return "SMS";
        case "Email":
          return "Email";
        case "Push":
          return "Push Notification";
        default:
          return "";
      }
    },
    formatReadableDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString();
    },
  },
  created() {
    this.fetchLogHistory();
    this.fetchUsers();
  },
};
</script>

<style>
.container {
  margin: 20px;
}

.notification-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 10px;
}

.form-control {
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.btn-submit {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.log-container {
  display: inline-block;
}

.log-item {
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  vertical-align: top;
}

.log-label {
  font-weight: bold;
}

.log-value {
  margin-top: 5px;
}

.log-message {
  margin-top: 5px;
}
</style>
