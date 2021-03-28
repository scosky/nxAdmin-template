<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <span style="margin-right: 45%">{{ name }}</span>
    </el-header>

    <el-main>
      <el-row :gutter="20">
        <el-col :span="7"
          ><div class="grid-content bg-purple">
            <span>玩法设置:</span>
            <el-radio v-model="isOpen" label="1" @change="openSet"
              >开启</el-radio
            >
            <el-radio v-model="isOpen" label="0" @change="closeSet"
              >关闭</el-radio
            >
          </div></el-col
        >
      </el-row>
      <span style="color: #409eff">返倍设置:</span>
      <div v-for="odd in odds" :key="odd.index" class="odds-wap gf">
        <span style="margin-left: 20px"> 中{{ odd.index }}雷:返</span>
        <el-input
          v-model="odd.val"
          :disabled="switchSet"
          oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
        ></el-input>
        <span>倍</span>
      </div>
      <el-row>
        <el-button type="primary" @click="oddsSubmit">修改</el-button>
        <el-button type="primary" @click="oddRest">重置</el-button>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { getGroupOdds } from "@/api/groupTable";
import { setGroupOdds } from "@/api/users";
export default {
  name: "SixSigin",
  props: ["groupIdValue"],
  data() {
    return {
      groupId: 0,
      name: "6包赔率 单雷",
      packs: 61,
      odds: [],
      isOpen: "1",
      switchSet: false,
    };
  },
  methods: {
    oddsSubmit() {
      const data = {
        isOpen: this.isOpen,
        switchSet: this.switchSet,
        odds: this.odds,
      };
      const params = {
        groupId: this.groupId,
        packs: this.packs,
        odds: JSON.stringify(data),
      };
      setGroupOdds(params).then((res) => {
        this.$message({
          message: "成功",
          type: "success",
        });
      });
    },
    oddRest() {
      this.getSixSigin();
    },
    openSet() {
      this.switchSet = false;
    },
    closeSet() {
      this.switchSet = true;
    },
    getSixSigin() {
      const param = {
        groupId: this.groupId,
        packs: this.packs,
      };
      getGroupOdds(param).then((res) => {
        const data = res.data;
        if (data == "" || data == null) {
          this.odds = [
            { index: 1, val: "0" },
            { index: 2, val: "0" },
            { index: 3, val: "0" },
            { index: 4, val: "0" },
            { index: 5, val: "0" },
            { index: 6, val: "0" },
          ];
          this.isOpen = "1";
          this.switchSet = false;
        } else {
          const result = JSON.parse(data);
          this.odds = result.odds;
          this.isOpen = result.isOpen;
          this.switchSet = result.switchSet;
        }
      });
    },
  },
  mounted() {
    this.groupId = this.groupIdValue;
    this.getSixSigin();
  },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.el-submenu__title i {
  color: rgb(66, 185, 131) !important;
}
.app-container {
  height: 100% !important;
}
.el-container {
  height: 800px !important;
}
.odds-wap .el-input {
  width: 180px;
}
.odds-wap .el-input .el-input__inner {
  text-align: center;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  height: 50px;
  text-align: center;
  margin: 0 auto;
  line-height: 50px;
}
.grid-content span {
  margin-right: 10px;
}
.grid-content .el-input {
  width: 100px;
  margin: 0 10px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.odds-wap {
  margin: 20px 0;
  letter-spacing: 1px;
  background: #eef1f6;
  width: 58%;
  border-radius: 4px;
  height: 50px;
  line-height: 50px;
}
</style>
