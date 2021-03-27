<template>
  <div class="app-container">
    <div class="item">
      <h4>{{ name }} 流水统计</h4>
    </div>
  </div>
</template>
<script>
export default {
  name: "turnover",
  props: {
    id: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: "",
    },
  },
};
</script>