<template>
  <div class="app-container">
    <div class="item" style="color: #42b983">
      <h4>【{{ name }}&nbsp;群】 流水统计</h4>
    </div>
    
    <section>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
        <el-form :inline="true" :model="filters" @submit.native.prevent>
          <el-form-item>
            <el-input
              placeholder="用户ID"
              v-model="filters.userId"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
              :controls="false"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="getFieldTurs">流水统计</el-button>
            &nbsp;
            <el-button type="primary" v-on:click="txtOut">文本导出</el-button> &nbsp;
            <el-button type="primary" v-on:click="excelOut">excel导出</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <div v-if="isShow">
        <el-row :gutter="20">
          <el-col :span="3">
            <div class="grid-content bg-purple">
              总流水:&nbsp;{{waters}}</span>
            </div>
          </el-col>

          <el-col :span="3">
            <div class="grid-content bg-purple">
              总盈亏:&nbsp;{{profit}}</span>
            </div>
          </el-col>

          <el-col :span="3">
            <div class="grid-content bg-purple">
              玩家总数:&nbsp;{{persons}}</span>
            </div>
          </el-col>

           <el-col :span="3"
            ><div class="grid-content bg-purple">
              总包数:&nbsp;{{pack}}</span></div
          ></el-col>

          <el-col :span="3"
            ><div class="grid-content bg-purple">
              错包数:&nbsp;{{errorPack}}</span></div
          ></el-col>
          
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              错包流水:&nbsp;{{errorWaters}}</span></div
          ></el-col>
        </el-row>
      </div>

      <el-table :data="data" highlight-current-row style="width: 100%">
        <el-table-column prop="userId" label="ID" width="120"></el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120">
        </el-table-column>
        <el-table-column prop="pack" label="包数" width="150">
        </el-table-column>
        <el-table-column prop="water" label="流水" width="150">
        </el-table-column>
        <el-table-column prop="paid" label="盈亏" width="150">
        </el-table-column>
      </el-table>

      <el-col :span="24" class="toolbar">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrent"
          :page-size="10"
          :total="total"
          style="float: right"
        >
        </el-pagination>
      </el-col>
    </section>
  </div>
</template>
<script>
import { getThisField } from "@/api/groupTable";
export default {
  name: "turnover",
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
      filters: {
        userId: "",
      },
      isShow: true,
      data: [],
      profit: "0",
      errorPack: "0",
      errorWaters: "0",
      pack: "0",
      persons: "0",
      waters: "0",
      total: 0,
      page: 1,
      active: 1,
      options: [
        {
          value: "",
          label: "所有",
        },
        {
          value: "0",
          label: "正常",
        },
        {
          value: "1",
          label: "托号",
        },
      ],
      value: "",
    };
  },
  methods: {
    handleCurrent(val) {
      this.page = val;
      this.getFieldTurs();
    },
    txtOut() {
      if (this.data.length == 0) {
        this.$message({
          message: "统计已清除数据不能导出TXT",
          type: "warning",
        });
        return;
      }
      let txtUrl =
        "http://47.118.59.217:8082/api/mc/group/trade/export/txt?type=2";
      txtUrl += "&userId=" + this.filters.userId + "&groupId=" + this.groupId;
      window.location.href = txtUrl;
    },
    excelOut() {
      if (this.data.length == 0) {
        this.$message({
          message: "统计已清除不能导出EXCEL",
          type: "warning",
        });
        return;
      }
      let excelUrl =
        "http://47.118.59.217:8082/api/mc/group/trade/export/excel?type=2";
      excelUrl += "&userId=" + this.filters.userId + "&groupId=" + this.groupId;
      window.location.href = excelUrl;
    },
    getFieldTurs() {
      const para = {
        page: this.page,
        groupId: this.groupId,
        userId: this.filters.userId,
        mc: this.value,
        size: 10,
      };
      getThisField(para).then((res) => {
        this.active = 1;
        this.data = res.data.list;
        this.data.forEach(function (element, index, array) {
          if (element.paid == null) {
            element.paid = 0;
          }
          const paid = Number(element.paid) - Number(element.water);
          element.paid = paid.toFixed(2);
        });
        this.total = res.data.total;
        this.persons = res.data.persons;
        this.pack = res.data.pack;
        this.waters = res.data.waters;
        if (res.data.errorPack == null) {
          this.errorPack = 0;
        } else {
          this.errorPack = res.data.errorPack;
        }
        if (res.data.errorPack == null) {
          this.errorWaters = 0;
        } else {
          this.errorWaters = res.data.errorWaters;
        }
        if (res.data.profit == null) {
          this.profit = 0;
        } else {
          this.profit = res.data.profit;
        }
      });
    },
  },
  mounted() {
    this.groupId = this.id;
    this.getFieldTurs();
  },
};
</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
  z-index: -1;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #42b983;
  padding-left: 5px;
  height: 40px;
  line-height: 40px;
  color: white;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>