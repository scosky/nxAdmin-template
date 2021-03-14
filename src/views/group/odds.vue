<template>
  <div class="app-container">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-setting"></i>5包赔率</template
            >
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="singleFive"
                >单雷赔率</el-menu-item
              >
              <el-menu-item index="1-2" @click="doubleFive"
                >多雷赔率</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-setting"></i>6包赔率</template
            >
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="singleSix"
                >单雷赔率</el-menu-item
              >
              <el-menu-item index="1-2" @click="doubleSix"
                >多雷赔率</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-setting"></i>9包赔率</template
            >
            <el-menu-item-group>
              <el-menu-item index="1-1">单雷赔率</el-menu-item>
              <el-menu-item index="1-2">双雷赔率</el-menu-item>
              <el-menu-item index="1-3">三雷赔率</el-menu-item>
              <el-menu-item index="1-4">四雷赔率</el-menu-item>
              <el-menu-item index="1-5">五雷赔率</el-menu-item>
              <el-menu-item index="1-6">六雷赔率</el-menu-item>
              <el-menu-item index="1-7">七雷赔率</el-menu-item>
              <el-menu-item index="1-8">八雷赔率</el-menu-item>
              <el-menu-item index="1-9">九雷赔率</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span style="margin-right: 45%">{{ name }}</span>
          <el-dropdown></el-dropdown>
        </el-header>

        <el-main>
          <div>
            <el-radio v-model="radio" label="1">开启</el-radio>
            <el-radio v-model="radio" label="2">关闭</el-radio>
          </div>

          <div v-for="odd in odds" :key="odd.index" class="odds-wap">
            <span> 中{{ odd.index }}雷:返</span>
            <el-input
              v-model="odd.value"
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
    </el-container>
  </div>
</template>
<script>
import { singleFive, doubleFive, singleSix, doubleSix } from "@/api/odds";
export default {
  name: "odds",
  data() {
    return {
      odds: [],
      name: "",
      radio: "1 ",
      flag: "singleFive",
    };
  },
  methods: {
    oddRest() {
      if (this.flag == "singleFive") {
        this.singleFive();
      }
      if (this.flag == "doubleFive") {
        this.doubleFive();
      }
      if (this.flag == "singleSix") {
        this.singleSix();
      }
      if (this.flag == "doubleSix") {
        this.doubleSix();
      }
    },
    singleFive() {
      this.flag = "singleFive";
      this.name = "5包赔率 单雷";
      singleFive().then((res) => {
        this.odds = res.data.singleFive;
      });
    },
    doubleFive() {
      this.flag = "doubleFive";
      this.name = "5包赔率 多雷";
      doubleFive().then((res) => {
        this.odds = res.data.doubleFive;
      });
    },
    singleSix() {
      this.flag = "singleSix";
      this.name = "6包赔率 单雷";
      singleSix().then((res) => {
        this.odds = res.data.singleSix;
      });
    },
    doubleSix() {
      this.flag = "doubleSix";
      this.name = "6包赔率 多雷";
      doubleSix().then((res) => {
        this.odds = res.data.doubleSix;
      });
    },
    oddsSubmit() {
      console.log(this.odds);
      this.$message({
        message: "成功",
        type: "success",
      });
    },
  },
  mounted() {
    this.singleFive();
  },
};
</script>

<style scoped>
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