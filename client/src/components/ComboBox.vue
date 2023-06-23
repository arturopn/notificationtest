<template>
  <div class="form-group">
    <label :for="id">{{ label }}:</label>
    <select :id="id" v-model="selectedValue" class="form-control">
      <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    value: {
      // Add this line
      type: String,
      required: true,
    },
  },

  computed: {
    selectedValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
};
</script>

<style scoped>
/* Styles specific to the ComboBox component */
</style>
