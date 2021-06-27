// components/parent/parent.js
Component({
  properties: {
    styleFromPage: String,
    shouldReset: Boolean,
    paramFromChild: String
  },
  data: {
    styleForChild: "background: #FEA82F;",
    messageForChild: "Click Me!"
  },
  methods: {
    onChildEvent:function(e){
      // console.log("child event triggered");
      this.setData({
        paramFromChild: e.detail.paramFromChild
      })
    }
  },
  observers:{
    'paramFromChild': function(val) {
      // console.log("observer - messageFromChild", val);
      this.triggerEvent('parentEvent', { messageFromParent: val});
    },
    'shouldReset': function(val) {
      // console.log("observer - shouldReset", val);
      if (val) {
        this.setData({
          paramFromChild: ""
        })
      }
    }
  }
})
