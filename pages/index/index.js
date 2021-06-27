//index.js
const app = getApp()

Page({
  data: {
    pageStyle: "background: #FCECDD; text-align: center; margin: 32rpx 0; padding: 32rpx 0;",
    resetButtonStyle: "display: none;",
    resetFlag: false
  },
  onParentEvent: function(e){
    // console.log("parent event triggered");
    this.setData({
      messageFromParent: e.detail.messageFromParent,
      resetButtonStyle: "display: block; background: #FF6701; border: solid 1px #F7F3E9; color: #F7F3E9; margin-top: 16rpx;"
    })
  },
  onReset: function(e){
    this.setData({
      messageFromParent: "",
      resetFlag: true
      // ,resetButtonStyle: "display: none;" // not working
    });
    // Todo: I have to separate the resetButtonStyle part out, otherwise it's not working.
    // not sure why, if you know the answer, contact me.
    this.setData({
      resetButtonStyle: "display: none;"
    });
    // ,
    // console.log(this.data.resetButtonStyle);
  }
})