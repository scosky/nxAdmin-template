<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <span style="margin-right: 45%">{{ name }}</span>
      <el-dropdown></el-dropdown>
    </el-header>

    <el-main >
      <div class="two-sigin cc">
        <el-radio v-model="radio" label="1">开启</el-radio>
        <el-radio v-model="radio" label="2">关闭</el-radio>
         <span>固定赔率</span>
           <el-checkbox v-model="checked" class="check"></el-checkbox>
           <e>赔率</e>
         <el-input
          oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
          class="oddsinput"
        ></el-input
        >
          
      </div>



      <div v-for="odd in odds" :key="odd.index" class="odds-wap ">
        <span> 中{{ odd.index }}倍:奖</span>
        <el-input
          v-model="odd.val"
          oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
          class="oddsinput"
        ></el-input
        >&nbsp;
        <span>倍</span>
      </div>
      <el-row>
        <el-button :plain="true" @click="oddsSubmit">修改</el-button>
        <el-button :plain="true" @click="oddRest">重置</el-button>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "threeView",
  data() {
    return {
      name: "9包赔率 三雷",
      odds: [
        { index: 4, val: "1" },
        { index: 5, val: "1" },
        { index: 6, val: "1" },
        { index: 7, val: "1" },
        { index: 8, val: "1" },
        { index: 9, val: "1" },
      ],
      radio: "1",
      checked:true
    };
  },
  methods: {
    oddsSubmit() {
      this.$message({
        message: "成功",
        type: "success",
      });
    },
  },
  oddRest() {},
};
</script>

<style scoped>
.two-sigin span{
    margin-left: 20px;
}
.check{
    margin: 0 10px;
}
.two-sigin .el-input {
  width: 180px;
}
.el-input .el-input__inner {
  text-align: center !important;
}
.odds-wap {
  margin: 20px auto;
  letter-spacing: 3px;
  /* text-align: center; */
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
</style>
</style>
