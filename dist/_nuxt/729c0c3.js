(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{377:function(e,t,n){"use strict";n.r(t);var r=n(3),o=n.n(r),c=n(249),l=n.n(c),h=n(359),m=n(24);function f(e,t,n,r,o,c,l){try{var h=e[c](l),m=h.value}catch(e){return void n(e)}h.done?t(m):Promise.resolve(m).then(r,o)}function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var O={name:"NuxpMain",components:{NuxpressoMokaTemplate:h.a},data:function(){return{template:null}},head:function(){return{title:this.homepage.seo_title?this.homepage.seo_title:this.homepage.title,meta:[{hid:this.homepage.seo_title?this.homepage.seo_title:this.settings.seo_title,name:this.homepage.seo_title?this.homepage.seo_title:this.homepage.title,content:this.homepage.seo_description?this.homepage.seo_description:this.settings.seo_description}]}},computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){v(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},Object(m.b)(["homepage"])),asyncData:function(e){return(t=o.a.mark((function t(){var n,data;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.app,t.next=3,n.apolloProvider.defaultClient.query({query:l.a,variables:{blocks_id:n.store.state.homepage.template_id}});case 3:return data=t.sent,t.abrupt("return",{components:data.data.components[0]});case 5:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(r,o){var c=t.apply(e,n);function l(e){f(c,r,o,l,h,"next",e)}function h(e){f(c,r,o,l,h,"throw",e)}l(void 0)}))})();var t}},y=n(19),component=Object(y.a)(O,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("client-only",[this.homepage?t("nuxpresso-moka-template",{attrs:{doc:this.homepage.blocks.json,article:this.homepage}}):this._e()],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);