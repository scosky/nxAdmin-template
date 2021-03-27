<template>
  <div class="app-container">
    <div class="item">
      <h4>{{ name }} 群中奖信息</h4>
    </div>
  </div>
</template>
<script>
export default {
  name: "win",
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