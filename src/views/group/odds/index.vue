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
              <el-menu-item index="3-1" @click="oneHandler"
                >单雷赔率</el-menu-item
              >
              <el-menu-item index="3-2" @click="twoHandler"
                >双雷赔率</el-menu-item
              >
              <el-menu-item index="3-3">三雷赔率</el-menu-item>
              <el-menu-item index="3-4">四雷赔率</el-menu-item>
              <el-menu-item index="3-5">五雷赔率</el-menu-item>
              <el-menu-item index="3-6">六雷赔率</el-menu-item>
              <el-menu-item index="3-7">七雷赔率</el-menu-item>
              <el-menu-item index="3-8">八雷赔率</el-menu-item>
              <el-menu-item index="3-9">九雷赔率</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: center; font-size: 12px">
          <span>{{ titleName }}</span>
        </el-header>
        <el-main>
          <component :is="currentView"></component>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import fiveSigin from "./fiev/sigin";
import fiveDouble from "./fiev/double";
import sixSigin from "./six/sigin";
import sixDouble from "./six/double";
export default {
  name: "odds-te",
  data() {
    return {
      titleName: "5包赔率 单雷",
      currentView: fiveSigin,
    };
  },
  methods: {
    fiveSiginHandler() {
      this.titleName = "5包赔率 单雷";
      this.currentView = fiveSigin;
    },
    fiveDoubleHandler() {
      this.titleName = "5包赔率 多雷";
      this.currentView = fiveDouble;
    },
    sexSiginHandler() {
      this.titleName = "6包赔率 单雷";
      this.currentView = sixSigin;
    },
    sexDoubleHandler() {
      this.titleName = "6包赔率 多雷";
      this.currentView = sixDouble;
    },
    oneHandler() {
      this.titleName = "9包赔率 单雷";
    },
    twoHandler() {
      this.titleName = "9包赔率 双雷";
    },
  },
  mounted() {
    this.fiveSiginHandler();
  },
};
</script>

<style>
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

.el-input {
  width: 180px;
}
</style>
