<template>
  <form @submit.prevent="submitNotification" class="notification-form">
    <combo-box
      id="category"
      label="Category"
      :options="categories"
      v-model="category"
      @change="categoryChanged"
    ></combo-box>
    <div class="form-group">
      <label for="message">Message:</label>
      <textarea
        id="message"
        v-model="message"
        rows="5"
        class="form-control"
      ></textarea>
    </div>
    <combo-box
      id="user"
      label="User"
      :options="users"
      v-model="selectedUser"
      :value="selectedUser"
      @change="userSelectionChanged"
    ></combo-box>

    <button type="submit" class="btn-submit">Submit</button>
  </form>
</template>

<script>
import axios from "axios";
import ComboBox from "./ComboBox.vue";

export default {
  components: {
    "combo-box": ComboBox,
  },
  data() {
    return {
      category: "",
      message: "",
      selectedCategory: "",
      selectedUser: "",
      users: [],
      categories: [
        { value: "Sports", label: "Sports" },
        { value: "Finance", label: "Finance" },
        { value: "Movies", label: "Movies" },
      ],
      notificationTypes: [
        { value: "All", label: "All" },
        { value: "SMS", label: "SMS" },
        { value: "E-Mail", label: "Email" },
        { value: "Push Notification", label: "Push Notification" },
      ],
    };
  },
  methods: {
    userSelectionChanged(event) {
      const selectedUser = event.target.value;
      this.selectedUser = selectedUser;
    },
    categoryChanged(event) {
      const category = event.target.value;
      this.selectedCategory = category;
      console.log(this.selectedCategory);
    },
    submitNotification() {
      if (this.message.trim() === "") {
        alert("Message cannot be empty");
        return;
      }

      const notification = {
        category: this.selectedCategory,
        message: this.message,
        userName: this.selectedUser,
      };
      console.log(notification);
      axios
        .post("http://localhost:3000/notifications", notification)
        .then(() => {
          console.log("entro");
          this.message = "";
          this.$emit("notification-submitted");
        })
        .catch((error) => {
          console.error(error);
        });
    },

    fetchUsers() {
      axios
        .get("http://localhost:3000/users")
        .then((response) => {
          this.users = response.data.map((name) => {
            return {
              value: name,
              label: name,
            };
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.fetchUsers();
    this.$emit("component-created");
  },
};
</script>

<style scoped>
/* Styles specific to the NotificationForm component */
.notification-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

textarea {
  width: 100%;
  resize: vertical;
}

.btn-submit {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  transition-duration: 0.4s;
}

.btn-submit:hover {
  background-color: #45a049;
}
</style>
