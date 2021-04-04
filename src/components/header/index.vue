<template>
  <div class="head">
    <div class="header-title">
      <div class="header-name">
        <svg-icon
          icon-class="si-glyph-electron"
          style="font-size: 15px; color: #333333"
        ></svg-icon>
        <span
          style="
            font-size: 14px;
            color: #333333;
            font-weight: bold;
            letter-spacing: 1px;
          "
          >星辰</span
        >
      </div>
      <div class="header-close">
        <span class="login-name">{{ userName }}</span>
        <svg-icon
          icon-class="min"
          @click.native="minimizeWin"
          style="-webkit-app-region: no-drag"
        ></svg-icon>
        <svg-icon
          icon-class="max"
          @click.native="maximizeWin"
          style="-webkit-app-region: no-drag"
        ></svg-icon>
        <svg-icon
          icon-class="close"
          @click.native="closeWin"
          style="-webkit-app-region: no-drag"
        ></svg-icon>
      </div>
    </div>
    <!-- <div class="more"></div> -->
  </div>
</template>
<script>
import { ipcRenderer } from "electron";
import { mapState } from "vuex";
export default {
  name: "headerTitle",
  methods: {
    closeWin() {
      this.$store.dispatch("LogOut").then(() => {});
      ipcRenderer.send("window-close");
    },
    maximizeWin() {
      ipcRenderer.send("window-max");
    },
    minimizeWin() {
      ipcRenderer.send("window-min");
    },
  },
  computed: {
    ...mapState({
      userName: (state) => state.user.name,
    }),
  },
};
</script>
<style scoped>
.header-title {
  -webkit-app-region: drag;
  background-color: #e4e4e4;
  width: 100%;
  height: 25px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999999999;
  margin-bottom: 30px;
}
.header-title .header-name {
  float: left;
  margin-left: 5px;
  line-height: 25px;
}
.header-title .header-close {
  float: right;
  margin-right: 3px;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
}
.header-title .header-close {
  float: right;
  margin-right: 3px;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
}
.header-title .header-close svg {
  margin-top: 3px;
  color: #333333;
}
.header-title .header-close .login-name {
  font-size: 14px;
  color: #409eff;
  font-weight: bold;
  letter-spacing: 1px;
}
.more {
  width: 100%;
  height: 25px;
  position: relative;
  top: 0;
  left: 0;
  z-index: 11;
}
</style>