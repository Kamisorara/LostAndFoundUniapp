(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-found-found"],{"0543":function(t,a,e){"use strict";var n=e("4ea4");e("99af"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(e("2909"));e("96cf");var i=n(e("1da1")),o=e("39eb"),s={name:"",data:function(){return{foundList:[{id:1,userName:"Kamisora",message:"丢失一个airpods pro 有没有人看到",lafPhotoUrl:"https://img1.baidu.com/it/u=358105290,730157327&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1656781200&t=7849921314e7abf94a336061c0f659c8",avatarUrl:"https://kamisora-bucker-1.oss-cn-hangzhou.aliyuncs.com/2022/06/29/3a22a87c-a150-4165-a453-5d69566a3094.png"}],pageSize:6,pageNum:1,totalPages:0,status:"loading",loadMore:{loadingText:"正在拼命加载中...",loadmoreText:"上滑加载...",nomoreText:"---------鄙人不才，实在没有了T_T---------"}}},methods:{toNoticeDetailPage:function(t){uni.navigateTo({url:"../detail/noticeDetail/noticeDetail?id="+t})},getAllFoundLists:function(){var t=this;return(0,i.default)(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,(0,o.getAllFoundList)(t.pageNum,t.pageSize).then(function(){var a=(0,i.default)(regeneratorRuntime.mark((function a(e){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:console.log(e),e.data.data.pages<=t.pageNum?t.status="nomore":t.status="loading",1===t.pageNum?t.foundList=e.data.data.records:t.foundList=[].concat((0,r.default)(t.foundList),(0,r.default)(e.data.data.records)),t.pageNum++;case 4:case"end":return a.stop()}}),a)})));return function(t){return a.apply(this,arguments)}}());case 2:case"end":return a.stop()}}),a)})))()}},onReachBottom:function(){var t=this;"nomore"!=this.status&&setTimeout((function(){t.getAllFoundLists(t.pageNum,t.pageSize)}),200)},onReady:function(){this.getAllFoundLists()},onPullDownRefresh:function(){uni.redirectTo({url:"found"}),setTimeout((function(){uni.stopPullDownRefresh()}),1e3)}};a.default=s},"09d6":function(t,a,e){"use strict";e.r(a);var n=e("0543"),r=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(a,t,(function(){return n[t]}))}(i);a["default"]=r.a},"13be":function(t,a,e){"use strict";var n=e("795e"),r=e.n(n);r.a},"2f92":function(t,a,e){"use strict";e.d(a,"b",(function(){return r})),e.d(a,"c",(function(){return i})),e.d(a,"a",(function(){return n}));var n={"u-Image":e("3092").default,uTag:e("22d3").default,uAvatar:e("4e28").default,uLoadmore:e("71a9").default},r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"found"},[e("v-uni-view",{staticClass:"found-title",staticStyle:{"font-weight":"600","font-size":"60rpx",color:"darkorange"}},[e("v-uni-text",{staticStyle:{"margin-left":"50rpx"}},[t._v("帮帮大家")])],1),e("v-uni-view",{staticClass:"found-main",staticStyle:{"margin-top":"30rpx",display:"flex","flex-wrap":"wrap"}},t._l(t.foundList,(function(a,n){return e("v-uni-view",{key:n,class:{"position-left":(n+1)%2!=0,"position-right":(n+1)%2==0},staticStyle:{"background-color":"#FFFFFF",height:"500rpx",width:"345rpx","border-radius":"20rpx"}},[e("v-uni-view",{staticClass:"found-img",staticStyle:{margin:"auto","margin-top":"10rpx",height:"370rpx",width:"320rpx","background-color":"antiquewhite"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toNoticeDetailPage(a.id)}}},[e("u--image",{attrs:{showLoading:!0,src:a.lafPhotoUrl,width:"320rpx",height:"370rpx"}})],1),e("v-uni-view",{staticClass:"found-text",staticStyle:{display:"flex"}},[e("u-tag",{attrs:{text:"拾物",plain:!0,size:"mini"}}),e("v-uni-view",{staticClass:"u-line-2"},[e("v-uni-text",{staticStyle:{"font-size":"25rpx","margin-left":"10rpx","margin-top":"5rpx"}},[t._v(t._s(a.message))])],1)],1),e("v-uni-view",{staticClass:"found-user",staticStyle:{display:"flex"}},[e("v-uni-view",{staticClass:"found-user-avatar"},[e("u-avatar",{attrs:{src:a.avatarUrl,size:"25"}})],1),e("v-uni-view",{staticClass:"found-user-name",staticStyle:{"margin-left":"20rpx","font-weight":"600","font-size":"25rpx"}},[e("v-uni-text",[t._v(t._s(a.userName))])],1),e("v-uni-view",{staticClass:"u-line-1",staticStyle:{"margin-left":"50rpx",color:"darkgray"}},[e("v-uni-text",{staticStyle:{"font-size":"20rpx"}},[t._v("浏览:")]),e("v-uni-text",{staticStyle:{"font-size":"30rpx","margin-left":"5rpx"}},[t._v("0")])],1)],1)],1)})),1),e("u-loadmore",{attrs:{status:t.status,"loading-text":t.loadMore.loadingText,"loadmore-text":t.loadMore.loadmoreText,"nomore-text":t.loadMore.nomoreText,icon:!0}})],1)},i=[]},3668:function(t,a,e){var n=e("4f03");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=e("4f06").default;r("5d9ae9bd",n,!0,{sourceMap:!1,shadowMode:!1})},"39eb":function(t,a,e){"use strict";var n=e("4ea4");Object.defineProperty(a,"__esModule",{value:!0}),a.getAllFoundList=o,a.createFoundNotice=s,a.getNoticeFoundNoticeDetail=u;var r=n(e("bf63")),i="/laf/found";function o(t,a){return r.default.get(i+"/get-all-found?pageNum="+t+"&pageSize="+a)}function s(t){return r.default.post(i+"/create-found-notice",t)}function u(t){return r.default.get(i+"/get-foundpost-detail?id="+t)}},"42cf":function(t,a,e){"use strict";var n=e("4ea4");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(e("a781")),i={name:"u-line",mixins:[uni.$u.mpMixin,uni.$u.mixin,r.default],computed:{lineStyle:function(){var t={};return t.margin=this.margin,"row"===this.direction?(t.borderBottomWidth="1px",t.borderBottomStyle=this.dashed?"dashed":"solid",t.width=uni.$u.addUnit(this.length),this.hairline&&(t.transform="scaleY(0.5)")):(t.borderLeftWidth="1px",t.borderLeftStyle=this.dashed?"dashed":"solid",t.height=uni.$u.addUnit(this.length),this.hairline&&(t.transform="scaleX(0.5)")),t.borderColor=this.color,uni.$u.deepMerge(t,uni.$u.addStyle(this.customStyle))}}};a.default=i},4570:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n={fade:{enter:{opacity:0},"enter-to":{opacity:1},leave:{opacity:1},"leave-to":{opacity:0}},"fade-up":{enter:{opacity:0,transform:"translateY(100%)"},"enter-to":{opacity:1,transform:"translateY(0)"},leave:{opacity:1,transform:"translateY(0)"},"leave-to":{opacity:0,transform:"translateY(100%)"}},"fade-down":{enter:{opacity:0,transform:"translateY(-100%)"},"enter-to":{opacity:1,transform:"translateY(0)"},leave:{opacity:1,transform:"translateY(0)"},"leave-to":{opacity:0,transform:"translateY(-100%)"}},"fade-left":{enter:{opacity:0,transform:"translateX(-100%)"},"enter-to":{opacity:1,transform:"translateY(0)"},leave:{opacity:1,transform:"translateY(0)"},"leave-to":{opacity:0,transform:"translateX(-100%)"}},"fade-right":{enter:{opacity:0,transform:"translateX(100%)"},"enter-to":{opacity:1,transform:"translateY(0)"},leave:{opacity:1,transform:"translateY(0)"},"leave-to":{opacity:0,transform:"translateX(100%)"}},"slide-up":{enter:{transform:"translateY(100%)"},"enter-to":{transform:"translateY(0)"},leave:{transform:"translateY(0)"},"leave-to":{transform:"translateY(100%)"}},"slide-down":{enter:{transform:"translateY(-100%)"},"enter-to":{transform:"translateY(0)"},leave:{transform:"translateY(0)"},"leave-to":{transform:"translateY(-100%)"}},"slide-left":{enter:{transform:"translateX(-100%)"},"enter-to":{transform:"translateY(0)"},leave:{transform:"translateY(0)"},"leave-to":{transform:"translateX(-100%)"}},"slide-right":{enter:{transform:"translateX(100%)"},"enter-to":{transform:"translateY(0)"},leave:{transform:"translateY(0)"},"leave-to":{transform:"translateX(100%)"}},zoom:{enter:{transform:"scale(0.95)"},"enter-to":{transform:"scale(1)"},leave:{transform:"scale(1)"},"leave-to":{transform:"scale(0.95)"}},"fade-zoom":{enter:{opacity:0,transform:"scale(0.95)"},"enter-to":{opacity:1,transform:"scale(1)"},leave:{opacity:1,transform:"scale(1)"},"leave-to":{opacity:0,transform:"scale(0.95)"}}};a.default=n},4997:function(t,a,e){"use strict";e.r(a);var n=e("2f92"),r=e("09d6");for(var i in r)"default"!==i&&function(t){e.d(a,t,(function(){return r[t]}))}(i);e("562c");var o,s=e("f0c5"),u=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,"5d78a204",null,!1,n["a"],o);a["default"]=u.exports},"4afd":function(t,a,e){"use strict";e.r(a);var n=e("5436"),r=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(a,t,(function(){return n[t]}))}(i);a["default"]=r.a},"4cd0":function(t,a,e){"use strict";e("a9e3"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n={props:{show:{type:Boolean,default:uni.$u.props.transition.show},mode:{type:String,default:uni.$u.props.transition.mode},duration:{type:[String,Number],default:uni.$u.props.transition.duration},timingFunction:{type:String,default:uni.$u.props.transition.timingFunction}}};a.default=n},"4f03":function(t,a,e){var n=e("24fb");a=n(!1),a.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/* uni.scss */uni-page-body[data-v-5d78a204]{background-color:#f4f4f4}.position-left[data-v-5d78a204]{margin-left:%?20?%;margin-right:%?20?%;margin-top:%?30?%}.position-right[data-v-5d78a204]{margin-top:%?30?%}body.?%PAGE?%[data-v-5d78a204]{background-color:#f4f4f4}',""]),t.exports=a},5436:function(t,a,e){"use strict";var n=e("4ea4");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(e("5530")),i=n(e("4cd0")),o=n(e("ca7a")),s={name:"u-transition",data:function(){return{inited:!1,viewStyle:{},status:"",transitionEnded:!1,display:!1,classes:""}},computed:{mergeStyle:function(){var t=this.viewStyle,a=this.customStyle;return(0,r.default)((0,r.default)({transitionDuration:"".concat(this.duration,"ms"),transitionTimingFunction:this.timingFunction},uni.$u.addStyle(a)),t)}},mixins:[uni.$u.mpMixin,uni.$u.mixin,o.default,i.default],watch:{show:{handler:function(t){t?this.vueEnter():this.vueLeave()},immediate:!0}}};a.default=s},"562c":function(t,a,e){"use strict";var n=e("3668"),r=e.n(n);r.a},"6b71":function(t,a,e){var n=e("dc67");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=e("4f06").default;r("8d153ee2",n,!0,{sourceMap:!1,shadowMode:!1})},"6c4b":function(t,a,e){"use strict";e.r(a);var n=e("42cf"),r=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(a,t,(function(){return n[t]}))}(i);a["default"]=r.a},"741a":function(t,a,e){"use strict";e.r(a);var n=e("7ac4"),r=e("4afd");for(var i in r)"default"!==i&&function(t){e.d(a,t,(function(){return r[t]}))}(i);e("fdea");var o,s=e("f0c5"),u=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,"a75f7a08",null,!1,n["a"],o);a["default"]=u.exports},"795e":function(t,a,e){var n=e("e8f8");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=e("4f06").default;r("057af1ba",n,!0,{sourceMap:!1,shadowMode:!1})},"7ac4":function(t,a,e){"use strict";var n;e.d(a,"b",(function(){return r})),e.d(a,"c",(function(){return i})),e.d(a,"a",(function(){return n}));var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.inited?e("v-uni-view",{ref:"u-transition",staticClass:"u-transition",class:t.classes,style:[t.mergeStyle],on:{touchmove:function(a){arguments[0]=a=t.$handleEvent(a),t.noop.apply(void 0,arguments)},click:function(a){arguments[0]=a=t.$handleEvent(a),t.clickHandler.apply(void 0,arguments)}}},[t._t("default")],2):t._e()},i=[]},a781:function(t,a,e){"use strict";e("a9e3"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n={props:{color:{type:String,default:uni.$u.props.line.color},length:{type:[String,Number],default:uni.$u.props.line.length},direction:{type:String,default:uni.$u.props.line.direction},hairline:{type:Boolean,default:uni.$u.props.line.hairline},margin:{type:[String,Number],default:uni.$u.props.line.margin},dashed:{type:Boolean,default:uni.$u.props.line.dashed}}};a.default=n},b053:function(t,a,e){"use strict";e.r(a);var n=e("e284"),r=e("6c4b");for(var i in r)"default"!==i&&function(t){e.d(a,t,(function(){return r[t]}))}(i);e("13be");var o,s=e("f0c5"),u=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,"2f0e5305",null,!1,n["a"],o);a["default"]=u.exports},ca7a:function(t,a,e){"use strict";var n=e("4ea4");e("99af"),e("d3b7"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,e("96cf");var r=n(e("1da1")),i=(n(e("4570")),function(t){return{enter:"u-".concat(t,"-enter u-").concat(t,"-enter-active"),"enter-to":"u-".concat(t,"-enter-to u-").concat(t,"-enter-active"),leave:"u-".concat(t,"-leave u-").concat(t,"-leave-active"),"leave-to":"u-".concat(t,"-leave-to u-").concat(t,"-leave-active")}}),o={methods:{clickHandler:function(){this.$emit("click")},vueEnter:function(){var t=this,a=i(this.mode);this.status="enter",this.$emit("beforeEnter"),this.inited=!0,this.display=!0,this.classes=a.enter,this.$nextTick((0,r.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,uni.$u.sleep(20);case 2:t.$emit("enter"),t.transitionEnded=!1,t.$emit("afterEnter"),t.classes=a["enter-to"];case 6:case"end":return e.stop()}}),e)}))))},vueLeave:function(){var t=this;if(this.display){var a=i(this.mode);this.status="leave",this.$emit("beforeLeave"),this.classes=a.leave,this.$nextTick((function(){t.transitionEnded=!1,t.$emit("leave"),setTimeout(t.onTransitionEnd,t.duration),t.classes=a["leave-to"]}))}},onTransitionEnd:function(){this.transitionEnded||(this.transitionEnded=!0,this.$emit("leave"===this.status?"afterLeave":"afterEnter"),!this.show&&this.display&&(this.display=!1,this.inited=!1))}}};a.default=o},dc67:function(t,a,e){var n=e("24fb");a=n(!1),a.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/* uni.scss */uni-view[data-v-a75f7a08], uni-scroll-view[data-v-a75f7a08], uni-swiper-item[data-v-a75f7a08]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}\r\n/**\r\n * vue版本动画内置的动画模式有如下：\r\n * fade：淡入\r\n * zoom：缩放\r\n * fade-zoom：缩放淡入\r\n * fade-up：上滑淡入\r\n * fade-down：下滑淡入\r\n * fade-left：左滑淡入\r\n * fade-right：右滑淡入\r\n * slide-up：上滑进入\r\n * slide-down：下滑进入\r\n * slide-left：左滑进入\r\n * slide-right：右滑进入\r\n */.u-fade-enter-active[data-v-a75f7a08],\r\n.u-fade-leave-active[data-v-a75f7a08]{transition-property:opacity}.u-fade-enter[data-v-a75f7a08],\r\n.u-fade-leave-to[data-v-a75f7a08]{opacity:0}.u-fade-zoom-enter[data-v-a75f7a08],\r\n.u-fade-zoom-leave-to[data-v-a75f7a08]{-webkit-transform:scale(.95);transform:scale(.95);opacity:0}.u-fade-zoom-enter-active[data-v-a75f7a08],\r\n.u-fade-zoom-leave-active[data-v-a75f7a08]{transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform}.u-fade-down-enter-active[data-v-a75f7a08],\r\n.u-fade-down-leave-active[data-v-a75f7a08],\r\n.u-fade-left-enter-active[data-v-a75f7a08],\r\n.u-fade-left-leave-active[data-v-a75f7a08],\r\n.u-fade-right-enter-active[data-v-a75f7a08],\r\n.u-fade-right-leave-active[data-v-a75f7a08],\r\n.u-fade-up-enter-active[data-v-a75f7a08],\r\n.u-fade-up-leave-active[data-v-a75f7a08]{transition-property:opacity,-webkit-transform;transition-property:opacity,transform;transition-property:opacity,transform,-webkit-transform}.u-fade-up-enter[data-v-a75f7a08],\r\n.u-fade-up-leave-to[data-v-a75f7a08]{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);opacity:0}.u-fade-down-enter[data-v-a75f7a08],\r\n.u-fade-down-leave-to[data-v-a75f7a08]{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);opacity:0}.u-fade-left-enter[data-v-a75f7a08],\r\n.u-fade-left-leave-to[data-v-a75f7a08]{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);opacity:0}.u-fade-right-enter[data-v-a75f7a08],\r\n.u-fade-right-leave-to[data-v-a75f7a08]{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);opacity:0}.u-slide-down-enter-active[data-v-a75f7a08],\r\n.u-slide-down-leave-active[data-v-a75f7a08],\r\n.u-slide-left-enter-active[data-v-a75f7a08],\r\n.u-slide-left-leave-active[data-v-a75f7a08],\r\n.u-slide-right-enter-active[data-v-a75f7a08],\r\n.u-slide-right-leave-active[data-v-a75f7a08],\r\n.u-slide-up-enter-active[data-v-a75f7a08],\r\n.u-slide-up-leave-active[data-v-a75f7a08]{transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform}.u-slide-up-enter[data-v-a75f7a08],\r\n.u-slide-up-leave-to[data-v-a75f7a08]{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}.u-slide-down-enter[data-v-a75f7a08],\r\n.u-slide-down-leave-to[data-v-a75f7a08]{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}.u-slide-left-enter[data-v-a75f7a08],\r\n.u-slide-left-leave-to[data-v-a75f7a08]{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}.u-slide-right-enter[data-v-a75f7a08],\r\n.u-slide-right-leave-to[data-v-a75f7a08]{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}.u-zoom-enter-active[data-v-a75f7a08],\r\n.u-zoom-leave-active[data-v-a75f7a08]{transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform}.u-zoom-enter[data-v-a75f7a08],\r\n.u-zoom-leave-to[data-v-a75f7a08]{-webkit-transform:scale(.95);transform:scale(.95)}',""]),t.exports=a},e284:function(t,a,e){"use strict";var n;e.d(a,"b",(function(){return r})),e.d(a,"c",(function(){return i})),e.d(a,"a",(function(){return n}));var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"u-line",style:[t.lineStyle]})},i=[]},e8f8:function(t,a,e){var n=e("24fb");a=n(!1),a.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/* uni.scss */uni-view[data-v-2f0e5305], uni-scroll-view[data-v-2f0e5305], uni-swiper-item[data-v-2f0e5305]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}.u-line[data-v-2f0e5305]{vertical-align:middle}',""]),t.exports=a},fdea:function(t,a,e){"use strict";var n=e("6b71"),r=e.n(n);r.a}}]);