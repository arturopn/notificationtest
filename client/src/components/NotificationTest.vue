<template>
  <div class="container">
    <h2>NotificationTest</h2>
    <notification-form
      @notification-submitted="fetchLogHistory"
      @component-created="fetchUsers"
    ></notification-form>
    <h2>Log History</h2>
    <log-history :logHistory="logHistory"></log-history>
  </div>
</template>

<script>
import NotificationForm from "./NotificationForm.vue";
import LogHistory from "./LogHistory.vue";
import axios from "axios";

export default {
  components: {
    "notification-form": NotificationForm,
    "log-history": LogHistory,
  },
  data() {
    return {
      logHistory: [],
    };
  },
  methods: {
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
  },
  created() {
    this.fetchLogHistory();
    this.fetchUsers();
  },
};
</script>

<style scoped>
/* Styles specific to the MainComponent */
</style>
