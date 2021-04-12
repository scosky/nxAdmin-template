<template>
  <el-container>
    <el-header style="text-align: right; font-size: 18px">
      <span style="margin-right: 45%">{{ name }}</span>
    </el-header>

    <el-main>
      <el-row :gutter="20">
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <span>&nbsp;&nbsp;赔率：</span>
            <el-radio v-model="using" label="1" @change="openSet"
              >开启</el-radio
            >
            <el-radio v-model="using" label="0" @change="closeSet"
              >关闭</el-radio
            >
          </div></el-col
        >

        <el-col :span="8">
          <div class="grid-content bg-purple" style="margin-left: 40px">
            <span>&nbsp;&nbsp;最小金额:</span>
            <el-input-number
              v-model="min"
              change="value=value.replace(/[^\d]/g, '')"
              :controls="false"
              :disabled="switchSet"
              :min="1"
              style="width: 80px"
            ></el-input-number>
            <span>&nbsp;&nbsp;最大金额:</span>
            <el-input-number
              v-model="max"
              change="value=value.replace(/[^\d]/g, '')"
              :controls="false"
              :min="1"
              :max="99999"
              style="width: 80px"
              :disabled="switchSet"
            ></el-input-number>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <span>&nbsp;&nbsp;固定赔率</span>
            <el-input-number
              v-model="rate"
              :disabled="switchSet"
              :controls="false"
              oninput="value=value.replace(/[^\d.]/g,'')"
              :min="1.0"
              :precision="2"
              style="width: 80px"
            ></el-input-number>
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
import { getPaidRate } from "@/api/groupTable";
import { setPaidRate } from "@/api/users";
export default {
  name: "eightView",
  props: ["groupIdValue"],
  data() {
    return {
      groupId: 0,
      name: "9包赔率 八雷",
      using: "1",
      paid: "9:8",
      rate: 0,
      fix: "1",
      min: 10,
      max: 200,
      switchSet: false,
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
      const paidRate = {
        using: this.using,
        fix: this.fix,
        rate: this.rate,
        min: this.min,
        max: this.max,
      };
      const params = {
        groupId: this.groupId,
        paid: this.paid,
        value: JSON.stringify(paidRate),
      };
      setPaidRate(params).then((res) => {
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
        paid: this.paid,
      };
      getPaidRate(param).then((res) => {
        const data = res.data;
        if (data.length > 0) {
          const paidRate = JSON.parse(data);
          for (let key in paidRate) {
            if (key === "using") {
              this.using = paidRate[key];
              continue;
            }
            if (key === "fix") {
              this.fix = paidRate[key];
              continue;
            }
            if (key === "rate") {
              this.rate = paidRate[key];
              continue;
            }
            if (key === "min") {
              this.min = paidRate[key];
              continue;
            }
            if (key === "max") {
              this.max = paidRate[key];
              continue;
            }
          }
          if (this.using == "0") {
            this.switchSet = true;
          } else {
            this.switchSet = false;
          }
        } else {
          this.rate = 1;
          this.switchSet = false;
          this.using = "1";
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
