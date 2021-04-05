<template>
  <div class="app-container">
    <div class="item" style="color: #42b983">
      <h4>【{{ name }} &nbsp;群】报奖信息</h4>
    </div>
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
      class="monitor"
      style="overflow: auto"
      ref="chatContent"
    >
      <div v-for="item in data" :key="item.index" class="content">
        <div v-if="item.msgType == 888">
          <div class="el-divider el-divider--horizontal">
            <div class="el-divider__text is-left" style="color: #fff">
              中奖信息
            </div>
          </div>
          <p>玩家昵称：{{ item.nickname }}</p>
          <p>发包金额：{{ item.amount }}</p>
          <p>发包个数：{{ item.recvNum }}</p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;押：{{
              item.remark
            }}
          </p>
          <p>开奖结果：{{ item.result }}</p>
          <p>最&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;佳：{{ item.best }}</p>
          <p>应&nbsp;&nbsp;赔&nbsp;付：{{ item.paidAmt }}</p>
          <p>时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间：{{ item.time }}</p>
        </div>
        <div v-else-if="item.msgType == 999">
          <div class="el-divider el-divider--horizontal">
            <div class="el-divider__text is-left" style="color: #f56c6c">
              错包提示
            </div>
          </div>
          <p>玩家昵称：{{ item.nickname }}（{{ item.userId }}）</p>
          <p>发包金额：{{ item.amount }}</p>
          <p>错包信息：{{ item.msg }}</p>
          <p>时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间：{{ item.time }}</p>
        </div>
        <div v-else></div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
export default {
  name: "monitor",
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
      data: [],
      busy: false,
      userId: 0,
      wsUrl: "",
      websock: null,
    };
  },
  methods: {
    loadMore: function () {},
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight;
      });
    },
    webSocketInit() {
      this.websock = new WebSocket(this.wsUrl);
      this.websock.onopen = this.websocketonopen;
      this.websock.onmessage = this.websocketonmessage;
    },
    websocketonopen() {
      if (this.websock.readyState === 1) {
        const reg = {
          cmd: "REG",
          type: "0",
          uid: this.userId,
          groupId: this.groupId,
        };
        this.websock.send(JSON.stringify(reg));
      }
    },
    websocketonmessage(event) {
      console.log("Received Message: " + event.data);
      const data = JSON.parse(event.data);
      if (data.status == undefined) {
        if (data.msgType == 888 || data.msgType == 999) {
          this.data.push(data);
          this.loading = false;
          this.scrollToBottom();
        }
      } else {
        console.log("注册成功......");
      }
    },
    onClose() {
      if (this.websock != null) {
        if (this.websock.readyState === 1) {
          this.websock.close();
        }
      }
    },
  },
  mounted() {
    this.groupId = this.id;
    this.userId = store.getters.uuid;
    this.wsUrl = store.getters.wsUrl;
    console.log("wsUrl:" + this.wsUrl);
    this.webSocketInit();
    this.websocketonopen();
  },
  destroyed() {
    this.onClose();
  },
};
</script>
<style scoped>
.monitor {
  border-radius: 4px;
  width: 80%;
  height: 480px;
  border: 1px solid #42b983;
}
.content {
  background: rgb(49, 180, 141);
  color: #fff;
  font-size: 14px;
  border-top: 1px dashed#fff;
  border-bottom: 1px dashed#fff;
}
.content div p {
  padding-left: 10px;
  margin: 5px;
}

.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 20px 0;
}
.el-divider {
  background-color: #dcdfe6;
  position: relative;
}
.el-divider__text.is-left {
  left: 20px;
  transform: translateY(-50%);
}
.el-divider__text {
  position: absolute;
  background-color: rgb(49, 180, 141);
  padding: 0 5px;
  font-weight: 500;
  color: #303133;
  font-size: 16px;
  letter-spacing: 1pt;
}
</style>