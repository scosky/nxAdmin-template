<template>
  <div class="app-container">
    <div class="item" style="color: #42b983">
      <h4>【{{ name }} &nbsp;群】中奖信息</h4>
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