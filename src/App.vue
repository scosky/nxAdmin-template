<template>
  <div id="app">
    <headerTitle />
    <router-view> </router-view>
  </div>
</template>

<script>
import headerTitle from "@/components/header";
export default {
  name: "App",
  components: { headerTitle },
};
</script>