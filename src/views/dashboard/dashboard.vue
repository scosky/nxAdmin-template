<template>
  <section class="app-container">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="filters.name" placeholder="群名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getGroups">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="groups" highlight-current-row style="width: 100%">
      <el-table-column prop="groupId" label="群编号" width="120">
      </el-table-column>
      <el-table-column prop="name" label="群名称" width="120">
      </el-table-column>
      <el-table-column prop="creator" label="创建人" width="80">
      </el-table-column>
      <el-table-column prop="owner" label="群主" width="80"> </el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 0 ? 'info' : 'success'"
            disable-transitions
          >
            <span v-if="scope.row.status === '0'">正常</span>
            <span v-else-if="scope.row.status === '1'">禁言</span>
            <span v-else-if="scope.row.status === '2'">冻结</span>
            <span v-else-if="scope.row.status === '3'">删除</span>
            <span v-else>未知</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="200">
      </el-table-column>
      <el-table-column prop="switchStatus" label="领包开关" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.switchStatus"
            active-value="1"
            inactive-value="0"
            active-color="#13ce66"
            @change="changeStatus($event, scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="editGroupHandler(scope.row)"
            size="small"
            >编辑</el-button
          >
          <el-button type="text" @click="catMembers(scope.row)" size="small"
            >查看群成员</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="10"
        :total="total"
        style="float: right"
      >
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog
      title="群资料"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="editGroup"
        label-width="160px"
        ref="editGroup"
        :rules="editGroupRules"
      >
        <el-form-item label="群编号" prop="groupId">
          <el-input
            v-model="editGroup.groupId"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="创建人" prop="creator">
          <el-input
            v-model="editGroup.creator"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="群主" prop="owner">
          <el-input
            v-model="editGroup.owner"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="群昵称" prop="name">
          <el-input v-model="editGroup.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="允许加好友">
          <el-radio v-model="editGroup.allowAddFriend" label="1">是</el-radio>
          <el-radio v-model="editGroup.allowAddFriend" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="允许成员修改昵称">
          <el-radio v-model="editGroup.allowSetNickname" label="1">是</el-radio>
          <el-radio v-model="editGroup.allowSetNickname" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="允许成员语音/视频通话">
          <el-radio v-model="editGroup.allowVodChat" label="1">是</el-radio>
          <el-radio v-model="editGroup.allowVodChat" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="启用群二维码">
          <el-radio v-model="editGroup.allowGrpQrcode" label="1">是</el-radio>
          <el-radio v-model="editGroup.allowGrpQrcode" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="邀请成员需确认">
          <el-radio v-model="editGroup.inviteConfirm" label="1">是</el-radio>
          <el-radio v-model="editGroup.inviteConfirm" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="群公告" prop="intro">
          <el-input type="textarea" v-model="editGroup.intro"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateGroupData('editGroup')"
          >修改</el-button
        >
        <el-button @click.native="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="群成员"
      :visible.sync="groupMemberVisible"
      :close-on-click-modal="false"
      :width="dialogWidth"
    >
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
        <el-form :inline="true" :model="groupfilters" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="groupfilters.id" placeholder="ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="getGroupMembers"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>

      <el-table :data="groupMembers" highlight-current-row style="width: 100%">
        <el-table-column prop="id" label="ID" width="110"> </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120">
        </el-table-column>
        <el-table-column prop="inviter" label="邀请人ID" width="110">
        </el-table-column>
        <el-table-column prop="inviterName" label="邀请人" width="120">
        </el-table-column>
        <el-table-column prop="inviterTime" label="邀请时间" width="170">
        </el-table-column>
      </el-table>

      <el-col :span="24" class="toolbar">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrent"
          :page-size="groupfilters.pageSize"
          :total="groupfilters.total"
          style="float: right"
        >
        </el-pagination>
      </el-col>
    </el-dialog>
  </section>
</template>

<script>
import {
  getGroupListPage,
  getGroupDetail,
  setSwitchStatus,
} from "@/api/groupTable";
import { membersData } from "@/api/turst";
import { modifyGroup } from "@/api/users";
export default {
  data() {
    return {
      dialogWidth: "800px",
      dialogFormVisible: false,
      groupMemberVisible: false,
      filters: {
        name: "",
      },
      groups: [],
      total: 0,
      page: 1,
      editGroup: {
        groupId: "",
        name: "",
        creator: "",
        owner: "",
        intro: "",
        allowAddFriend: "",
        allowSetNickname: "",
        allowVodChat: "",
        allowGrpQrcode: "",
        inviteConfirm: "",
      },
      groupMembers: [],
      groupfilters: {
        id: "",
        groupId: "",
        total: 0,
        page: 1,
        pageSize: 10,
      },
      editGroupRules: {
        name: [{ required: true, message: "请输入群昵称", trigger: "blur" }],
        intro: [{ required: true, message: "请输入群公告", trigger: "blur" }],
      },
    };
  },
  methods: {
    changeStatus: function (val, row) {
      const param = { groupId: row.groupId, switchStatus: val };
      setSwitchStatus(param).then((res) => {});
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getGroups();
    },
    getGroups() {
      const para = {
        page: this.page,
        name: this.filters.name,
        size: 10,
      };
      getGroupListPage(para).then((res) => {
        this.groups = res.data;
        this.total = res.total;
      });
    },
    editGroupHandler(row) {
      this.dialogFormVisible = true;
      this.groupDetail(row);
    },
    groupDetail(row) {
      const param = { groupId: row.groupId };
      getGroupDetail(param).then((res) => {
        this.editGroup.owner = row.owner;
        this.editGroup.creator = row.creator;
        this.editGroup.name = res.data.name;
        this.editGroup.groupId = res.data.groupId;
        this.editGroup.allowAddFriend = res.data.allowAddFriend;
        this.editGroup.allowSetNickname = res.data.allowSetNickname;
        this.editGroup.allowVodChat = res.data.allowVodChat;
        this.editGroup.allowGrpQrcode = res.data.allowGrpQrcode;
        this.editGroup.inviteConfirm = res.data.inviteConfirm;
        this.editGroup.intro = res.data.intro;
      });
    },
    updateGroupData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("确认修改群信息？", "修改密码", {})
            .then(() => {
              const param = JSON.stringify(this.editGroup);
              modifyGroup(param).then((res) => {
                this.dialogFormVisible = false;
                this.$message({
                  message: "修改群资料成功",
                  type: "success",
                });
                this.getGroups();
              });
            })
            .catch((e) => {});
        } else {
          return false;
        }
      });
    },
    handleCurrent(val) {
      this.page = val;
      this.getGroups();
    },
    getGroupMembers() {
      const para = {
        page: this.page,
        id: this.groupfilters.id,
        groupId: this.groupfilters.groupId,
        size: 10,
      };
      membersData(para).then((res) => {
        this.groupMembers = res.data;
        this.groupfilters.total = res.total;
      });
    },
    catMembers(row) {
      this.groupMemberVisible = true;
      this.groupfilters.groupId = row.groupId;
      this.getGroupMembers();
    },
  },
  mounted() {
    this.getGroups();
  },
};
</script>

<style scoped>
</style>