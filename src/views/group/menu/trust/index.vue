<template>
  <div class="app-container">
    <div class="item" style="color: #42b983">
      <h4>【{{ name }}&nbsp;群】 托号设置</h4>
    </div>
    <section>
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
        <el-form :inline="true" :model="filters" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="filters.id" placeholder="ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="filters.phone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="members">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--列表-->
      <el-table :data="trusts" highlight-current-row style="width: 100%">
        <el-table-column prop="id" label="ID" width="120"> </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120">
        </el-table-column>
        <el-table-column prop="msend" label="是否托号" width="120">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.msend === '1' ? 'success' : 'info'"
              disable-transitions
            >
              <span v-if="scope.row.msend === '0'">否</span>
              <span v-else>是</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="mstatus" label="是否启用" width="120">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.mstatus === '1' ? 'success' : 'info'"
              disable-transitions
            >
              <span v-if="scope.row.mstatus === '0'">停用</span>
              <span v-else>启用</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              :plain="true"
              v-if="scope.row.msend === '0'"
              size="mini"
              type="primary"
              @click="setTrust(scope.$index, scope.row)"
              >设置托号</el-button
            >
            <el-button
              :plain="true"
              v-else-if="scope.row.msend === '1'"
              size="mini"
              type="primary"
              @click="cancelTrust(scope.$index, scope.row)"
              >取消托号</el-button
            >

            <el-button
              :plain="true"
              v-if="scope.row.msend === '0'"
              size="mini"
              type="primary"
              :disabled="true"
              @click="getTrustRule(scope.$index, scope.row)"
              >规则设置</el-button
            >
            <el-button
              :plain="true"
              v-else-if="scope.row.msend === '1'"
              size="mini"
              type="primary"
              :disabled="false"
              @click="getTrustRule(scope.$index, scope.row)"
              >规则设置</el-button
            >

            <el-button
              :plain="true"
              v-if="scope.row.mstatus === '0'"
              size="mini"
              type="primary"
              @click="startTrust(scope.$index, scope.row)"
              >启用</el-button
            >
            <el-button
              :plain="true"
              v-else-if="scope.row.mstatus === '1'"
              size="mini"
              type="primary"
              @click="stopTrust(scope.$index, scope.row)"
              >停用</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrent"
          :page-size="pageSize"
          :total="total"
          style="float: right"
        >
        </el-pagination>
      </el-col>

      <el-dialog
        title="确认交易密码"
        :visible.sync="pwdVisible"
        :close-on-click-modal="false"
      >
        <el-input
          v-model="pwd"
          placeholder="请输入交易密码"
          style="width: 200px"
          type="password"
        ></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="setTrustValue('paid')"
            >确认</el-button
          >
          <el-button @click.native="pwdVisible = false">取消</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="发包规则设置"
        :visible.sync="ruleVisible"
        :close-on-click-modal="false"
      >
        <el-form :model="ruleFrom" ref="ruleFrom">
          <el-form-item label="发包周期" prop="period">
            <el-input-number
              v-model="ruleFrom.period"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
              :controls="false"
              :disabled="ruleFrom.status"
            ></el-input-number
            ><span>&nbsp;秒</span>
          </el-form-item>

          <el-form-item label="发包金额" prop="amount">
            <el-input-number
              v-model="ruleFrom.amount"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
              :controls="false"
              :disabled="ruleFrom.status"
            ></el-input-number
            ><span>&nbsp;元</span>
          </el-form-item>

          <el-form-item label="玩法规则">
            <el-input-number
              v-model="ruleFrom.pack"
              change="value=value.replace(/^\.+|[^\d.]/g,'')"
              @input="packHandler"
              :controls="false"
              :disabled="ruleFrom.status"
              style="width: 75px"
              :min="5"
              :max="9"
            ></el-input-number
            ><span>&nbsp;&nbsp;包&nbsp;&nbsp;</span>

            <el-input-number
              v-model="ruleFrom.thunder"
              change="value=value.replace(/^\.+|[^\d.]/g,'')"
              @input="thunderHandler"
              :controls="false"
              :disabled="ruleFrom.status"
              style="width: 75px"
              :min="1"
              :max="9"
            ></el-input-number>
            <span>&nbsp;&nbsp;雷&nbsp;&nbsp;</span>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="setTrustRule('paid')"
            :disabled="ruleFrom.status"
            >确认</el-button
          >
          <el-button @click.native="ruleVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>
<script>
import {
  mSendData,
  setTrust,
  cancelTrust,
  startTrust,
  stopTrust,
} from "@/api/turst";
import md5 from "blueimp-md5";
import { getPaidRule } from "@/api/groupTable";
import { setPaidRule } from "@/api/users";
export default {
  name: "trust",
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
      groupId: "",
      filters: {
        id: "",
        phone: "",
        groupId: "",
      },
      trusts: [],
      total: 0,
      page: 1,
      pageSize: 10,
      ruleVisible: false,
      ruleFrom: {
        period: 5,
        amount: 10,
        pack: 5,
        thunder: 1,
        userId: 0,
        status: false,
      },
      pwdVisible: false,
      pwd: "",
      index: 0,
      row: null,
    };
  },
  methods: {
    packHandler(value) {
      if (!/^(5|6|9){1}$/.test(value)) {
        this.$message({
          message: "只能输入[5|6|9包]",
          type: "warning",
        });
        return;
      }

      if (value == 5) {
        if (!/^(1|2|3|4|5){1}$/.test(this.ruleFrom.thunder)) {
          this.$message({
            message: "只能输入[1,2,3,4,5]雷",
            type: "warning",
          });
          return false;
        }
      } else if (value == 6) {
        if (!/^(1|2|3|4|5|6){1}$/.test(this.ruleFrom.thunder)) {
          this.$message({
            message: "只能输入[1,2,3,4,5,6]雷",
            type: "warning",
          });
          return false;
        }
      }
    },
    thunderHandler(value) {
      if (!/^(5|6|9){1}$/.test(this.ruleFrom.pack)) {
        this.ruleFrom.packval = false;
        this.$message({
          message: "只能输入[5|6|9包]",
          type: "warning",
        });
        return;
      }

      if (this.ruleFrom.pack == 5) {
        if (!/^(1|2|3|4|5){1}$/.test(value)) {
          this.$message({
            message: "只能输入[1,2,3,4,5]雷",
            type: "warning",
          });
          return false;
        }
      } else if (this.ruleFrom.pack == 6) {
        if (!/^(1|2|3|4|5|6){1}$/.test(value)) {
          this.$message({
            message: "只能输入[1,2,3,4,5,6]雷",
            type: "warning",
          });
          return false;
        }
      }
    },
    getTrustRule(index, row) {
      if (row.msend == "1") {
        if (row.mstatus == "0") {
          this.ruleFrom.status = false;
        } else {
          this.ruleFrom.status = true;
        }
      }
      if (row.msend == "0") {
        this.ruleFrom.status = true;
      }
      this.ruleVisible = true;
      this.ruleFrom.userId = row.id;
      const param = { groupId: this.groupId, userId: this.ruleFrom.userId };
      getPaidRule(param).then((res) => {
        if (res.data.length > 0) {
          let obj = JSON.parse(res.data);
          this.ruleFrom.period = obj.period;
          this.ruleFrom.amount = obj.amount;
          this.ruleFrom.pack = obj.rule.split("-")[0];
          this.ruleFrom.thunder = obj.rule.split("-")[1];
        }
      });
    },
    setTrustRule() {
      if (!/^(5|6|9){1}$/.test(this.ruleFrom.pack)) {
        this.ruleFrom.packval = false;
        this.$message({
          message: "只能输入[5|6|9包]",
          type: "warning",
        });
        return;
      }

      if (this.ruleFrom.pack == 5) {
        if (!/^(1|2|3|4|5){1}$/.test(this.ruleFrom.thunder)) {
          this.$message({
            message: "只能输入[1,2,3,4,5]雷",
            type: "warning",
          });
          return false;
        }
      } else if (this.ruleFrom.pack == 6) {
        if (!/^(1|2|3|4|5|6){1}$/.test(this.ruleFrom.thunder)) {
          this.$message({
            message: "只能输入[1,2,3,4,5,6]雷",
            type: "warning",
          });
          return false;
        }
      }
      this.$confirm("提示信息", "确认设置此规则", {})
        .then(() => {
          const param = {
            userId: this.ruleFrom.userId,
            groupId: this.groupId,
            period: this.ruleFrom.period,
            amount: this.ruleFrom.amount,
            rule: this.ruleFrom.pack + "-" + this.ruleFrom.thunder,
          };
          console.log(JSON.stringify(param));
          setPaidRule(param).then((res) => {
            this.ruleVisible = false;
            this.$message({
              message: "修改成功",
              type: "success",
            });
          });
        })
        .catch((e) => {});
    },
    setTrust(index, row) {
      this.pwdVisible = true;
      this.index = index;
      this.row = row;
    },
    setTrustValue() {
      if (this.pwd.length < 6) {
        this.$message({
          message: "只能输入密码[密码最少6位]",
          type: "warning",
        });
        this.pwdVisible = false;
        return false;
      }
      this.pwdVisible = false;
      const tradePwd = md5(this.pwd);
      const param = {
        userId: this.row.id,
        groupId: this.groupId,
        tradePwd: tradePwd,
      };
      setTrust(param).then((res) => {
        this.trusts[this.index].msend = "1";
        this.index = 0;
        this.row = null;
        this.pwd = "";
        this.$message({
          message: "设置成功",
          type: "success",
        });
      });
    },
    cancelTrust(index, row) {
      this.$confirm("确认取消托号？", "取消托号", {})
        .then(() => {
          const param = {
            userId: row.id,
            groupId: this.groupId,
          };
          cancelTrust(param).then((res) => {
            this.trusts[index].msend = "0";
            this.trusts[index].mstatus = "0";
            this.$message({
              message: "取消成功",
              type: "success",
            });
          });
        })
        .catch((e) => {});
    },
    startTrust(index, row) {
      this.$confirm("确认启用托号？", "启用托号", {})
        .then(() => {
          const param = {
            userId: row.id,
            groupId: this.groupId,
          };
          startTrust(param).then((res) => {
            this.trusts[index].mstatus = "1";
            this.$message({
              message: "启用成功",
              type: "success",
            });
          });
        })
        .catch((e) => {});
    },
    stopTrust(index, row) {
      this.$confirm("确认停用托号？", "停用托号", {})
        .then(() => {
          const param = {
            userId: row.id,
            groupId: this.groupId,
          };
          stopTrust(param).then((res) => {
            this.trusts[index].mstatus = "0";
            this.this.$message({
              message: "停用成功",
              type: "success",
            });
          });
        })
        .catch((e) => {});
    },
    handleCurrent(val) {
      this.page = val;
      this.members();
    },
    members() {
      const para = {
        page: this.page,
        id: this.filters.id,
        phone: this.filters.phone,
        groupId: this.groupId,
        size: 10,
      };
      mSendData(para).then((res) => {
        this.trusts = res.data;
        this.total = res.total;
      });
    },
  },
  mounted() {
    this.groupId = this.id;
    this.members();
  },
};
</script>