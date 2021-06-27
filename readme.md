# 1. 前言

这个小 demo 是我在学习微信组件之间通信和事件触发机制的阶段性成果。

**Copyright：未经作者允许，禁止转载。**

[Github repo](https://github.com/lunawen/Wechatminiprogram-ComponentCommunication)

[Demo video](https://youtu.be/hSH-mmP0clw)

它包含了：

1. 一个默认起始页面 index
2. 一个自定义 parent component
3. 一个自定义 child component

逻辑：index 页面引用 parent component，parent componen 引用 child component。

## 如何引用组件？

很简单，只需要把 key 作为 component 的名字（可以和实际的 component file 名字不同），然后 value 写路径即可。

```json
// pages/index/index.json
{
  "usingComponents": {
    "parentComponent": "/components/parent/parent"
  }
}
```

---

# 2. 它实现了以下功能

## index -> parent -> child 方向的数据传输

1. index 向 parent 传入自定义 style - 这里我直接在 wxml 里面定义了一个 static value，用来体现最基础的数据传递；
2. index 向 parent 传入一个 flag - `shouldReset`，接下来会用来 reset；
3. parent 向 child 传入一个参数 - `messageForChild` - 这里
4. parent 向 child 传入自定义 style - `styleForChild`

## child -> parent -> index 方向的事件触发以及数据传输

1. child 的 button click 事件会触发一个传给 parent 的参数 - `messageFromChild`
2. parent 接收到这个参数之后继续传给 index - `messageFromParent`

## index -> parent -> child 方向的事件触发

最后，我们可以在 index 页面点击 reset button 来重置 app，这里我们只需要改变 shouldReset 的值（from true to false）即可。

注意我们在 parent 和 child component 里面都要配置 observer，用来监测这个 flag 的变化。

---

# 3. 代码详解

## 我的命名规则

```html
<child messageFromParent='{{messageForChild}}' styleFromParent="{{styleForChild}}" shouldReset="{{shouldReset}}"bind:childEvent="onChildEvent"/>
```

你们可能已经发现了，和很多教程不同的是，我特地用了 messageFromParent 和 messageForChild 来区分 local property 和 data binding。
messageFromParent 指的是 child component 里面的 property，而 messageForChild 则是 parent component 里面的 data key。

```js
// components/child/child.js
Component({
  properties: {
    messageFromParent: String
  }
})
```

```js
// components/parent/parent.js
Component({
  data: {
    messageForChild: "Click Me!"
  }
})
```

## child 触发 parent 事件

```html
<child messageFromParent='{{messageForChild}}' styleFromParent="{{styleForChild}}" shouldReset="{{shouldReset}}"bind:childEvent="onChildEvent"/>
```

这里的 `"bind:childEvent="onChildEvent"` 就是核心，childEvent是 child component 的一个 trigger，而`"onChildEvent"`则是 parent component 里面的一个 event handler method。


```js
// components/child/child.js
methods: {
    onClick: function() {
      // childEvent = trigger name
      // paramFromChild = parent component property
      // this.data.messageForParent = value to pass
      this.triggerEvent('childEvent', { paramFromChild: this.data.messageForParent});
        // ...
    }
  }
```

```js
// components/parent/parent.js
properties: {
    paramFromChild: String
},
// 注意要从 trigger event 的 detail 里面获取数据
methods: {
    onChildEvent:function(e){
      this.setData({
        paramFromChild: e.detail.paramFromChild
      })
    }
  }
```

---

# 4. 结语

我保留了一些 console.log(xxx) 的代码，你可以自行 uncomment 来了解数据和事件的发生先后顺序，也能在 debug 的时候帮到你~

## Todo

index.js 里面，我在 onReset function 中遇到了一个很奇怪的问题，resetButtonStyle 必须和其他的 reset 分开写才有效，目前不是很清楚为什么，如果有人知道的话，烦请告知~

```js
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
}
```

## Limitations

CSS 部分没有做的很仔细。