<template>
  <div class="app-container">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>玩法5</template
            >
            <el-menu-item-group>
              <el-menu-item index="1-1">单雷玩法</el-menu-item>
              <el-menu-item index="1-2">双雷玩法</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>玩法6</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">单雷玩法</el-menu-item>
              <el-menu-item index="1-2">双雷玩法</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-setting"></i>玩法9</template
            >
            <el-menu-item-group>
              <el-menu-item index="1-1">单雷玩法</el-menu-item>
              <el-menu-item index="1-2">双雷玩法</el-menu-item>
              <el-menu-item index="1-3">三雷玩法</el-menu-item>
              <el-menu-item index="1-4">四雷玩法</el-menu-item>
              <el-menu-item index="1-5">五雷玩法</el-menu-item>
              <el-menu-item index="1-6">六雷玩法</el-menu-item>
              <el-menu-item index="1-7">七雷玩法</el-menu-item>
              <el-menu-item index="1-8">八雷玩法</el-menu-item>
              <el-menu-item index="1-9">九雷玩法</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span style="margin-right: 45%">[玩法5]单雷玩法</span>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
          </el-dropdown>
          <span>xxx群</span>
        </el-header>

        <el-main>
          <div v-for="(odd, index) in oadds" :key="index">
            中{{ index }}雷<el-input
              style="width: 20%"
              v-model="odd.age"
            ></el-input
            >倍
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "odds",
  data() {
    return {
      oadds: [
        { name: "zhongguo", age: "111" },
        { name: "zhongguo", age: "111" },
      ],
    };
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
</style>