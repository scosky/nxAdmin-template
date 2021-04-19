<template>
  <el-container>
    <el-header style="text-align: right; font-size: 18px">
      <span style="margin-right: 45%">{{ name }}</span>
    </el-header>

    <el-main>
      <el-row :gutter="20">
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <span>玩法设置：</span>
            <el-radio v-model="using" label="1" @change="openSet"
              >开启</el-radio
            >
            <el-radio v-model="using" label="0" @change="closeSet"
              >关闭</el-radio
            >
          </div></el-col
        >
        <el-col :span="10">
          <div class="grid-content bg-purple" style="margin-left: 40px">
            <span>&nbsp;&nbsp;最小金额:</span>
            <el-input-number
              v-model="min"
              change="value=value.replace(/[^\d]/g, '')"
              :controls="false"
              :disabled="switchSet"
              :min="1"
              :max="99999"
              style="width: 80px"
            ></el-input-number>
            <span>&nbsp;&nbsp;最大金额:</span>
            <el-input-number
              v-model="max"
              change="value=value.replace(/[^\d]/g, '')"
              :controls="false"
              :min="1"
              :max="99999"
              :disabled="switchSet"
              style="width: 80px"
            ></el-input-number>
          </div>
        </el-col>
      </el-row>
      <span style="color: #409eff">奖率设置:</span>
      <div class="odds-wap">
        <span style="margin-left: 20px">单个赔率</span>
        <el-input-number
          v-model="rate"
          :disabled="switchSet"
          :min="1.0"
          :precision="2"
          :controls="false"
          oninput="value=value.replace(/[^\d.]/g,'')"
          style="width: 80px"
        ></el-input-number>
        <span>倍</span>
      </div>
      <div v-for="(item, index) in award" class="odds-wap">
        <span style="margin-left: 20px"> 中{{ item.index }}个:奖</span>
        <el-input-number
          v-model="item.val"
          :controls="false"
          :disabled="switchSet"
          oninput="value=value.replace(/[^\d.]/g,'')"
          class="oddsinput"
          :min="0.0"
          style="width: 80px"
        ></el-input-number>
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
import { getPaidRate } from "@/api/groupTable";
import { setPaidRate } from "@/api/users";
export default {
  name: "oneView",
  props: ["groupIdValue"],
  data() {
    return {
      groupId: 0,
      name: "9包赔率 单雷",
      paid: "9:1",
      using: "1",
      fix: "0",
      rate: "1",
      award: [],
      switchSet: false,
      min: 10,
      max: 200,
    };
  },
  methods: {
    oddsSubmit() {
      if (this.min >= this.max) {
        this.$message({
          message: "最小金额不能打与最大金额",
          type: "warning",
        });
        return false;
      }
      let award = {};
      var reg = /^[0-9][0-9]*([\.][0-9]{1,2})?$/;
      for (let item of this.award) {
        if (!reg.test(item.val)) {
          this.$message({
            message: "数字最多2位小数",
            type: "warning",
          });
          return false;
        }
        award[item.index] = item.val;
      }
      award.using = this.using;
      award.min = this.min;
      award.max = this.max;
      award.fix = this.fix;
      award.rate = this.rate;
      const params = {
        groupId: this.groupId,
        paid: this.paid,
        value: JSON.stringify(award),
      };
      setPaidRate(params).then((res) => {
        this.$message({
          message: "成功",
          type: "success",
        });
      });
    },
    oddRest() {
      this.getOneView();
    },
    openSet() {
      this.switchSet = false;
    },
    closeSet() {
      this.switchSet = true;
    },
    getOneView() {
      const param = {
        groupId: this.groupId,
        paid: this.paid,
      };
      getPaidRate(param).then((res) => {
        const data = res.data;
        if (data.length > 0) {
          const award = JSON.parse(data);
          for (let key in award) {
            if (key === "using") {
              this.using = award[key];
              continue;
            }
            if (key === "fix") {
              this.fix = award[key];
              continue;
            }
            if (key === "rate") {
              this.rate = award[key];
              continue;
            }
            if (key === "min") {
              this.min = award[key];
              continue;
            }
            if (key === "max") {
              this.max = award[key];
              continue;
            }
            this.award.push({ index: key, val: award[key] });
          }
          if (this.using == "0") {
            this.switchSet = true;
          } else {
            this.switchSet = false;
          }
        } else {
          this.using = "1";
          this.fix = "0";
          this.rate = "1";
          this.award = [
            { index: "5", val: 0 },
            { index: "6", val: 0 },
            { index: "7", val: 0 },
            { index: "8", val: 0 },
            { index: "9", val: 0 },
          ];
        }
      });
    },
  },
  mounted() {
    this.groupId = this.groupIdValue;
    this.getOneView();
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
  text-align: center !important;
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
  /* background: #eef1f6; */
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
  /* background: #d3dce6; */
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  height: 50px;
  text-align: left;
  padding-left: 10px;
  margin: 0 auto;
  line-height: 50px;
  min-width: 350px;
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
