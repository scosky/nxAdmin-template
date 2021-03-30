<template>
  <div class="app-container">
    <div class="item" style="color: #42b983">
      <h4>【{{ name }} &nbsp;群】赔率设置</h4>
    </div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '2', '3']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-setting"></i>5包赔率</template
            >
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="fiveSiginHandler"
                >单雷赔率</el-menu-item
              >
              <el-menu-item index="1-2" @click="fiveDoubleHandler"
                >多雷赔率</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-setting"></i>6包赔率</template
            >
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="sexSiginHandler"
                >单雷赔率</el-menu-item
              >
              <el-menu-item index="2-2" @click="sexDoubleHandler"
                >多雷赔率</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-setting"></i>9包赔率</template
            >
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="nineHandler(1)"
                >单雷赔率</el-menu-item
              >
              <el-menu-item index="3-2" @click="nineHandler(2)"
                >双雷赔率</el-menu-item
              >
              <el-menu-item index="3-3" @click="nineHandler(3)"
                >三雷赔率</el-menu-item
              >
              <el-menu-item index="3-4" @click="nineHandler(4)"
                >四雷赔率</el-menu-item
              >
              <el-menu-item index="3-5" @click="nineHandler(5)"
                >五雷赔率</el-menu-item
              >
              <el-menu-item index="3-6" @click="nineHandler(6)"
                >六雷赔率</el-menu-item
              >
              <el-menu-item index="3-7" @click="nineHandler(7)"
                >七雷赔率</el-menu-item
              >
              <el-menu-item index="3-8" @click="nineHandler(8)"
                >八雷赔率</el-menu-item
              >
              <el-menu-item index="3-9" @click="nineHandler(9)"
                >九雷赔率</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <component :is="currentView" :groupIdValue="groupIdValue"></component>
    </el-container>
  </div>
</template>

<script>
import fiveSigin from "./five/sigin";
import fiveDouble from "./five/double";
import sixSigin from "./six/sigin";
import sixDouble from "./six/double";
import oneView from "./nine/one";
import twoView from "./nine/two";
import threeView from "./nine/three";
import fourView from "./nine/four";
import fiveView from "./nine/five";
import sixView from "./nine/six";
import sevenView from "./nine/seven";
import eightView from "./nine/eight";
import nineView from "./nine/nine";
export default {
  name: "oddsTe",
  props: {
    id: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      groupId: 0,
      groupIdValue: 0,
      currentView: fiveSigin,
    };
  },
  methods: {
    fiveSiginHandler() {
      this.currentView = fiveSigin;
    },
    fiveDoubleHandler() {
      this.currentView = fiveDouble;
    },
    sexSiginHandler() {
      this.currentView = sixSigin;
    },
    sexDoubleHandler() {
      this.currentView = sixDouble;
    },
    nineHandler(index) {
      if (index == 1) this.currentView = oneView;
      if (index == 2) this.currentView = twoView;
      if (index == 3) this.currentView = threeView;
      if (index == 4) this.currentView = fourView;
      if (index == 5) this.currentView = fiveView;
      if (index == 6) this.currentView = sixView;
      if (index == 7) this.currentView = sevenView;
      if (index == 8) this.currentView = eightView;
      if (index == 9) this.currentView = nineView;
    },
  },
  created() {
    this.groupId = this.id;
    this.groupIdValue = this.id;
  },
  mounted() {
    this.fiveSiginHandler();
  },
};
</script>

<style>
.odds-wap .el-input .el-input__inner {
  text-align: center !important;
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
