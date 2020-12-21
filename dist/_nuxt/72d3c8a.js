(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{404:function(e,n){var t={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"Components"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"components"},arguments:[{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"loop"},value:{kind:"BooleanValue",value:!0}}]}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"category"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"image"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"url"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"json"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"updated_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"loop"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"loop_type"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"loop_limit"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:248}};t.loc.source={body:"query Components {\r\n\tcomponents( where : {loop: true}){\r\n    \tid\r\n        name\r\n        description\r\n        category\r\n        image {\r\n            url\r\n        }\r\n    \tjson\r\n        updated_at\r\n    \tloop\r\n    \tloop_type\r\n        loop_limit\r\n  }\r\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};var r={};function o(e,n){for(var i=0;i<e.definitions.length;i++){var element=e.definitions[i];if(element.name&&element.name.value==n)return element}}t.definitions.forEach((function(e){if(e.name){var n=new Set;!function e(n,t){if("FragmentSpread"===n.kind)t.add(n.name.value);else if("VariableDefinition"===n.kind){var r=n.type;"NamedType"===r.kind&&t.add(r.name.value)}n.selectionSet&&n.selectionSet.selections.forEach((function(n){e(n,t)})),n.variableDefinitions&&n.variableDefinitions.forEach((function(n){e(n,t)})),n.definitions&&n.definitions.forEach((function(n){e(n,t)}))}(e,n),r[e.name.value]=n}})),e.exports=t,e.exports.Components=function(e,n){var t={kind:e.kind,definitions:[o(e,n)]};e.hasOwnProperty("loc")&&(t.loc=e.loc);var c=r[n]||new Set,l=new Set,d=new Set;for(c.forEach((function(e){d.add(e)}));d.size>0;){var m=d;d=new Set,m.forEach((function(e){l.has(e)||(l.add(e),(r[e]||new Set).forEach((function(e){d.add(e)})))}))}return l.forEach((function(n){var r=o(e,n);r&&t.definitions.push(r)})),t}(t,"Components")},427:function(e,n,t){"use strict";t.r(n);var r=t(414),o=t.n(r),c=t(404),l=t.n(c),d=t(406),m=t(8);function f(object,e){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(object);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),n.push.apply(n,t)}return n}function v(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var h={name:"NuxpArticles",components:{NuxpressoMokaTemplate:d.a},data:function(){return{start:0,limit:10,component:null}},computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(n){v(e,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(source,n))}))}return e}({},Object(m.b)(["settings"])),mounted:function(){this.limit=this.settings.articles_limit},watch:{components:function(e){var n=this;this.component=e.filter((function(e){return e.loop_type===n.$route.params.slug}))[0],this.component||(this.component=e[0]),this.component.hasOwnProperty("loop_limit")&&parseInt(this.component.loop_limit)&&(this.limit=parseInt(this.component.loop_limit))}},apollo:{articles:{prefetch:!0,query:o.a,variables:function(){return{limit:parseInt(this.limit),start:parseInt(this.start)}},update:function(data){return data.articles}},components:{prefetch:!0,query:l.a,update:function(data){return data.components}}},methods:{next:function(){this.start=this.start+this.settings.articles_limit},prev:function(){this.start=this.start-this.settings.articles_limit}}},k=t(3),component=Object(k.a)(h,(function(){var e=this.$createElement,n=this._self._c||e;return this.articles&&this.component?n("nuxpresso-moka-template",{attrs:{doc:this.component.json,article:this.articles}}):this._e()}),[],!1,null,null,null);n.default=component.exports}}]);