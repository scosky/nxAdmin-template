<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <span style="margin-right: 45%">{{ name }}</span>
    </el-header>

    <el-main>
      <el-row :gutter="20">
        <el-col :span="7"
          ><div class="grid-content bg-purple">
            <span>玩法设置：</span>
            <el-radio v-model="radio" label="1">开启</el-radio>
            <el-radio v-model="radio" label="2">关闭</el-radio>
          </div></el-col
        >
        <el-col :span="7"
          ><div class="grid-content bg-purple">
            <span>固定赔率：</span>
            <el-checkbox v-model="checked" @change="checkMe">选中</el-checkbox>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="grid-content bg-purple gf">
            <span>单个赔率</span>
            <el-input
              size="mini"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            ></el-input>
            <span>倍</span>
          </div>
        </el-col>

        <el-col :span="7"
          ><div class="grid-content bg-purple gf">
            <span>赔率</span>
            <el-input
              size="mini"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            ></el-input>
            <span>倍</span>
          </div></el-col
        >
      </el-row>
      <span style="color: #409eff">奖率设置:</span>
      <div v-for="odd in odds" :key="odd.index" class="odds-wap gf">
        <span style="margin-left: 20px"> 中{{ odd.index }}个:奖</span>
        <el-input
          v-model="odd.val"
          size="mini"
          oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
          class="oddsinput"
        ></el-input>
        <span>倍</span>
      </div>
      <el-row>
        <el-button @click="oddsSubmit" type="primary">修改</el-button>
        <el-button @click="oddRest" type="primary">重置</el-button>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "fourView",
  data() {
    return {
      name: "9包赔率 五雷",
      odds: [
        { index: 6, val: "0" },
        { index: 7, val: "0" },
        { index: 8, val: "0" },
        { index: 9, val: "0" },
      ],
      radio: "1",
      checked: false,
    };
  },
  methods: {
    oddsSubmit() {
      this.$message({
        message: "成功",
        type: "success",
      });
    },
    oddRest() {},
    checkMe() {
      var flag = this.checked;
      console.log(flag);
    },
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
