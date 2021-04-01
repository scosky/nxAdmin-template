<template>
  <el-tooltip effect="dark" content="刷新群功能" placement="bottom">
    <el-button class="btn-text can-hover" type="text" @click="refMenu">
      <nx-svg-icon
        class-name="ref-icon"
        icon-class="ref"
        style="font-size: 35px; margin-top: -6px"
        @click="refMenu"
      />
    </el-button>
  </el-tooltip>
</template>

<script>
import router from "@/router";
import store from "@/store";
import nxSvgIcon from "@/components/nx-svg-icon/index";
export default {
  name: "nx-ref-menu",
  components: { nxSvgIcon },
  methods: {
    refMenu() {
      store
        .dispatch("GetInfo")
        .then((res) => {
          const roles = res.roles;
          store.dispatch("GenerateRoutes", { roles }).then(() => {
            router.addRoutes(store.getters.addRouters);
          });
        })
        .catch((err) => {
          store.dispatch("FedLogOut").then(() => {
            Message.error(err || "Verification failed, please login again");
            next({ path: "/" });
          });
        });
    },
  },
};
</script>

<style scoped>
.ref-icon {
  font-size: 22px;
  cursor: pointer;
  vertical-align: -5px !important;
}
</style>


