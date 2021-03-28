<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <span style="margin-right: 45%">{{ name }}</span>
    </el-header>

    <el-main>
      <el-row :gutter="20">
        <el-col :span="7"
          ><div class="grid-content bg-purple">
            <span>赔率：</span>
            <el-radio v-model="isOpen" label="1" @change="openSet"
              >开启</el-radio
            >
            <el-radio v-model="isOpen" label="2" @change="closeSet"
              >关闭</el-radio
            >
          </div></el-col
        >
        <el-col :span="7"
          ><div class="grid-content bg-purple gf">
            <span>单个赔率</span>
            <el-input
              size="mini"
              v-model="tage"
              :disabled="switchSet"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            ></el-input>
            <span>倍</span>
          </div></el-col
        >
      </el-row>

      <el-row>
        <el-button @click="oddsSubmit" type="primary">修改</el-button>
        <el-button @click="oddRest" type="primary">重置</el-button>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { getGroupOdds } from "@/api/groupTable";
import { setGroupOdds } from "@/api/users";
export default {
  name: "eightView",
  props: ["groupIdValue"],
  data() {
    return {
      groupId: 0,
      name: "9包赔率 九雷",
      packs: 99,
      isOpen: "",
      switchSet: false,
      tage: "",
    };
  },
  methods: {
    oddsSubmit() {
      const data = {
        isOpen: this.isOpen,
        switchSet: this.switchSet,
        tage: this.tage,
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
      this.getEightView();
    },
    openSet() {
      this.switchSet = false;
    },
    closeSet() {
      this.switchSet = true;
    },
    getEightView() {
      const param = {
        groupId: this.groupId,
        packs: this.packs,
      };
      getGroupOdds(param).then((res) => {
        const data = res.data;
        if (data == "" || data == null) {
          this.tage = "0";
          this.isOpen = "1";
          this.switchSet = false;
        } else {
          const result = JSON.parse(data);
          this.isOpen = result.isOpen;
          this.switchSet = result.switchSet;
          this.tage = result.tage;
        }
      });
    },
  },
  mounted() {
    this.groupId = this.groupIdValue;
    this.getEightView();
  },
};
</script>

<style>
.gf input.el-input__inner {
  border-bottom: 1px solid #42b983;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 0%;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  font-size: 14px;
}
.gf input.el-input__inner:focus {
  border-bottom-color: #42b983;
}
</style>
<style scoped>
.two-sigin span {
  margin-left: 20px;
}
.two-sigin .el-input {
  width: 180px;
  outline: none;
  border: 0;
}
.el-input .el-input__inner {
  text-align: center !important;
}
.odds-wap {
  margin: 20px 0;
  letter-spacing: 3px;
  background: #eef1f6;
  width: 58%;
  border-radius: 4px;
  height: 50px;
  line-height: 50px;
}
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
.grid-content e {
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
</style>
