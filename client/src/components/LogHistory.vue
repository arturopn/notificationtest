<template>
  <div class="log-container">
    <div class="log-item" v-for="log in logHistory" :key="log.id">
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
</template>

<script>
export default {
  props: {
    logHistory: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatReadableDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString();
    },
  },
};
</script>

<style scoped>
/* Styles specific to the LogHistory component */
.log-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.log-item {
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}

.log-label {
  font-weight: bold;
}

.log-value {
  margin-bottom: 5px;
}

.log-message {
  white-space: pre-wrap;
}
</style>
