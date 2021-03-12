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
              <el-menu-item index="1-1" @click="singleFive">单雷玩法</el-menu-item>
              <el-menu-item index="1-2" @click="doubleFive">双雷玩法</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>玩法6</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="singleSix">单雷玩法</el-menu-item>
              <el-menu-item index="1-2" @click="doubleSix">双雷玩法</el-menu-item>
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
          <span style="margin-right: 45%">{{name}}</span>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
          </el-dropdown>
          <span>xxx群</span>
        </el-header>

        <el-main>
          <div v-for="odd in odds" :key="odd.index" class="odds-wap">
          <span> {{singleName}}{{ odd.index }}雷：</span>
           <el-input
              style="width: 20%"
              v-model="odd.value"
            ></el-input
            >&nbsp;
            <span>倍</span>

          </div>
            <el-row>
              <el-button style="margin-left:50%" :plain="true" @click="oddsSubmit">修改</el-button>
            </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {
    singleFive,
    doubleFive,
    singleSix,
    doubleSix
  } from '@/api/odds'
export default {
  name: "odds",
  data() {
    return {
      odds: [],
      name:"",
      singleName:""
    };
  },
  methods: {
     singleFive() {
       this.name ="玩法5 单雷玩法" 
       this.singleName = "单"
      singleFive().then((res) => {
       console.log(res);
       this.odds = res.data.val
      });
    },
    doubleFive(){
      this.name= "玩法5 双雷玩法"
       this.singleName = "双"
        doubleFive().then((res) => {
       this.odds = res.data.val
      });

    },
    singleSix(){
      this.name= "玩法6 单雷玩法"
          this.singleName = "单"
            singleSix().then((res) => {
          this.odds = res.data.val
          });
    },
    doubleSix(){
      this.name= "玩法6双雷玩法"
          this.singleName = "双"
            doubleSix().then((res) => {
          this.odds = res.data.val
          });
    },
    oddsSubmit(){
      console.log(this.odds);
       this.$message({
          message: '成功',
          type: 'success'
        });
    }
  },
  mounted() {
    this.singleFive()
  },
}
</script>

<style scoped>
  .odds-wap{
    margin: 20px auto;
    letter-spacing:3px;
    text-align: center;
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
.app-container{
  height: 100% !important;
}
.el-container {
    height: 800px !important;

}
</style>