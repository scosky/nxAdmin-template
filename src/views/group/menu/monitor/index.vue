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
        <p>发包人昵称:&nbsp;{{ item.nickname }}</p>
        <p>发包金额:&nbsp;{{ item.amount }}</p>
        <p>发包个数:&nbsp;{{ item.recvNum }}</p>
        <p>红包备注:&nbsp;{{ item.remark }}</p>
        <p>赔率:&nbsp;{{ item.paidRate }}</p>
        <p>赔付金额:&nbsp;{{ item.paidAmt }}</p>
        <p>开奖结果:&nbsp;{{ item.result }}</p>
        <p>时间:&nbsp;{{ item.time }}</p>
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
      busy: true,
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
        if (dat.msgType == 888 || dat.msgType == 999) {
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
  border-bottom: 1px dashed#fff;
  border-top: 1px dashed#fff;
}
.content p {
  padding-left: 10px;
  margin-top: 0px;
  margin-bottom: 0px;
}

.content p:first-child {
  margin-top: 10px;
}

.content p:last-child {
  margin-bottom: 10px;
}
</style>