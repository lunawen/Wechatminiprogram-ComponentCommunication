// components/child/child.js
Component({
  properties: {
    messageFromParent: String,
    styleFromParent: String,
    shouldReset: Boolean
  },
  data: {
    buttonStyle: "background: #FF6701; border: solid 1px #F7F3E9; color: #F7F3E9; margin-top: 16rpx;",
    messageForParent: "I'm from child :)"
  },
  methods: {
    onClick: function() {
      this.triggerEvent('childEvent', { paramFromChild: this.data.messageForParent});
      this.setData({
        buttonText: "Button Clicked!",
        buttonStyle: "background: #536162; color: #F7F3E9; margin-top: 16rpx;"
      });
    }
  },
  pageLifetimes: {
    show: function() {
      // console.log("set data on show");
      this.setData({
        buttonText: this.properties.messageFromParent
      });
    }
  },
  observers: {
    'shouldReset': function(val) {
      // console.log("observer - child shouldReset", val);
      if (val) {
        this.setData({
          buttonText: this.properties.messageFromParent,
          buttonStyle: "background: #FF6701; border: solid 1px #F7F3E9; color: #F7F3E9; margin-top: 16rpx;"
        })
      }
    }
  }
})
