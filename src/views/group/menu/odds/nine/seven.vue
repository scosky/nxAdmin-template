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
            <el-radio v-model="using" label="1" @change="openSet"
              >开启</el-radio
            >
            <el-radio v-model="using" label="0" @change="closeSet"
              >关闭</el-radio
            >
          </div></el-col
        >
        <el-col :span="7"
          ><div class="grid-content bg-purple">
            <span>固定赔率：</span>
            <el-checkbox
              v-model="checked"
              @change="checkMe(fix)"
              :disabled="Select"
              >选中</el-checkbox
            >
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="grid-content bg-purple gf">
            <span>单个赔率</span>
            <el-input
              v-model="rate"
              size="mini"
              :disabled="switchSet"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
              :min="0.0"
            ></el-input>
            <span>倍</span>
          </div>
        </el-col>

        <el-col :span="7"
          ><div class="grid-content bg-purple gf">
            <span>固定赔率</span>
            <el-input
              size="mini"
              v-model="fixedRate"
              :disabled="fixedStatus"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
              :min="0.0"
            ></el-input>
            <span>倍</span>
          </div></el-col
        >
      </el-row>
      <span style="color: #409eff">奖率设置:</span>
      <div v-for="(item, index) in award" class="odds-wap gf">
        <span style="margin-left: 20px"> 中{{ item.index }}个:奖</span>
        <el-input
          v-model="item.val"
          size="mini"
          :disabled="switchSet"
          oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
          class="oddsinput"
          :min="0.0"
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
import { getNinePaidRate } from "@/api/groupTable";
import { setNinePaidRate } from "@/api/users";
export default {
  name: "sevenView",
  props: ["groupIdValue"],
  data() {
    return {
      groupId: 0,
      name: "9包赔率 七雷",
      using: "1",
      paid: "9:7",
      fix: "0",
      rate: 0,
      fixedRate: 0,
      award: [],
      switchSet: false,
      checked: false,
      Select: false,
      fixedStatus: false,
    };
  },
  methods: {
    oddsSubmit() {
      let rate = { using: this.using };
      if (this.fix == "1") {
        rate.fix = "0";
        rate.rate = this.rate;
      } else {
        rate.fix = "1";
        rate.rate = this.fixedRate;
      }

      let award = {};
      for (let item of this.award) {
        award[item.index] = item.val;
      }
      const params = {
        groupId: this.groupId,
        paid: this.paid,
        fix: rate.fix,
        value: JSON.stringify(rate),
        award: JSON.stringify(award),
      };
      setNinePaidRate(params).then((res) => {
        this.$message({
          message: "成功",
          type: "success",
        });
      });
    },
    oddRest() {
      this.getSevenView();
    },
    checkMe(fix) {
      if (fix == 1) {
        this.checked = true;
        this.switchSet = true;
        this.fixedStatus = false;
        this.fix = 0;
      }

      if (fix == 0) {
        this.checked = false;
        this.switchSet = false;
        this.fixedStatus = true;
        this.fix = 1;
      }
    },
    openSet() {
      this.switchSet = false;
      this.Select = false;
      this.fixedStatus = false;
      if (this.fix == "0") {
        this.checkMe("1");
      } else {
        this.checkMe("0");
      }
    },
    closeSet() {
      this.switchSet = true;
      this.Select = true;
      this.fixedOdds = true;
    },
    getSevenView() {
      const param = {
        groupId: this.groupId,
        paid: this.paid,
      };
      getNinePaidRate(param).then((res) => {
        const awardStr = res.award;
        const dataStr = res.data;
        if (awardStr.length > 0) {
          const awardObj = JSON.parse(res.award);
          for (let item in awardObj) {
            this.award.push({ index: item, val: awardObj[item] });
          }
        } else {
          this.award = [
            { index: "8", val: 1 },
            { index: "9", val: 1 },
          ];
        }

        if (dataStr.length > 0) {
          const value = JSON.parse(res.data);
          for (let key in value) {
            if (key === "using") {
              this.using = value[key];
              continue;
            }
            if (key === "fix") {
              this.fix = value[key];
              continue;
            }
            if (key == "rate") {
              if (this.fix == "1") {
                this.fixedRate = value[key];
                this.rate = 1;
              } else {
                this.rate = value[key];
                this.fixedRate = 1;
              }
              continue;
            }
          }
          this.checkMe(this.fix);
        } else {
          this.using = "1";
          this.rate = 1;
          this.fixedRate = 1;
          this.fix = "0";
          this.checkMe(this.fix);
        }
      });
    },
  },
  mounted() {
    this.groupId = this.groupIdValue;
    this.getSevenView();
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
.gf .is-disabled .el-input__inner {
  background-color: rgba(255, 255, 255, 0);
  border-bottom: 1px solid #999;
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
