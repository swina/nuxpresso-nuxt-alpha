(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{358:function(e,n){var t={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"Components"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"loop_type"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"components"},arguments:[{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"loop"},value:{kind:"BooleanValue",value:!0}},{kind:"ObjectField",name:{kind:"Name",value:"loop_type"},value:{kind:"Variable",name:{kind:"Name",value:"loop_type"}}}]}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"category"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"image"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"url"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"json"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"updated_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"loop"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"loop_type"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"loop_limit"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:289}};t.loc.source={body:"query Components($loop_type:String) {\r\n\tcomponents( where : {loop: true, loop_type:$loop_type}){\r\n    \tid\r\n        name\r\n        description\r\n        category\r\n        image {\r\n            url\r\n        }\r\n    \tjson\r\n        updated_at\r\n    \tloop\r\n    \tloop_type\r\n        loop_limit\r\n  }\r\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};var r={};function o(e,n){for(var i=0;i<e.definitions.length;i++){var element=e.definitions[i];if(element.name&&element.name.value==n)return element}}t.definitions.forEach((function(e){if(e.name){var n=new Set;!function e(n,t){if("FragmentSpread"===n.kind)t.add(n.name.value);else if("VariableDefinition"===n.kind){var r=n.type;"NamedType"===r.kind&&t.add(r.name.value)}n.selectionSet&&n.selectionSet.selections.forEach((function(n){e(n,t)})),n.variableDefinitions&&n.variableDefinitions.forEach((function(n){e(n,t)})),n.definitions&&n.definitions.forEach((function(n){e(n,t)}))}(e,n),r[e.name.value]=n}})),e.exports=t,e.exports.Components=function(e,n){var t={kind:e.kind,definitions:[o(e,n)]};e.hasOwnProperty("loc")&&(t.loc=e.loc);var l=r[n]||new Set,d=new Set,c=new Set;for(l.forEach((function(e){c.add(e)}));c.size>0;){var m=c;c=new Set,m.forEach((function(e){d.has(e)||(d.add(e),(r[e]||new Set).forEach((function(e){c.add(e)})))}))}return d.forEach((function(n){var r=o(e,n);r&&t.definitions.push(r)})),t}(t,"Components")},360:function(e,n){var t={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"Articles"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"slug"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"articles"},arguments:[{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"categories"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"slug"},value:{kind:"Variable",name:{kind:"Name",value:"slug"}}}]}},{kind:"ObjectField",name:{kind:"Name",value:"loop"},value:{kind:"BooleanValue",value:!0}},{kind:"ObjectField",name:{kind:"Name",value:"homepage"},value:{kind:"BooleanValue",value:!1}}]}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"slug"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"title"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"excerpt"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"content"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"homepage"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"random_image"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"tags"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"lang"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"image"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"url"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"caption"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"alternativeText"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"gallery"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"url"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"caption"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"alternativeText"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"image_title"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"updated_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"seo_title"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"seo_description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"categories"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"slug"},arguments:[],directives:[]}]}}]}}]}}],loc:{start:0,end:488}};t.loc.source={body:"query Articles ($slug:String) {\r\n  articles ( where: { categories : { slug:$slug } , loop: true , homepage: false } ) {\r\n    slug\r\n    title\r\n    excerpt\r\n    content\r\n    homepage\r\n    random_image\r\n    tags\r\n    lang\r\n    image {\r\n      url\r\n      caption\r\n      alternativeText\r\n    }\r\n    gallery {\r\n      url\r\n      caption\r\n      alternativeText\r\n    }\r\n    image_title\r\n    updated_at\r\n    seo_title\r\n    seo_description\r\n    categories {\r\n        name\r\n        slug\r\n    }\r\n  }\r\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};var r={};function o(e,n){for(var i=0;i<e.definitions.length;i++){var element=e.definitions[i];if(element.name&&element.name.value==n)return element}}t.definitions.forEach((function(e){if(e.name){var n=new Set;!function e(n,t){if("FragmentSpread"===n.kind)t.add(n.name.value);else if("VariableDefinition"===n.kind){var r=n.type;"NamedType"===r.kind&&t.add(r.name.value)}n.selectionSet&&n.selectionSet.selections.forEach((function(n){e(n,t)})),n.variableDefinitions&&n.variableDefinitions.forEach((function(n){e(n,t)})),n.definitions&&n.definitions.forEach((function(n){e(n,t)}))}(e,n),r[e.name.value]=n}})),e.exports=t,e.exports.Articles=function(e,n){var t={kind:e.kind,definitions:[o(e,n)]};e.hasOwnProperty("loc")&&(t.loc=e.loc);var l=r[n]||new Set,d=new Set,c=new Set;for(l.forEach((function(e){c.add(e)}));c.size>0;){var m=c;c=new Set,m.forEach((function(e){d.has(e)||(d.add(e),(r[e]||new Set).forEach((function(e){c.add(e)})))}))}return d.forEach((function(n){var r=o(e,n);r&&t.definitions.push(r)})),t}(t,"Articles")},361:function(e,n){var t={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"Articles"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"tag"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"articles"},arguments:[{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"tags_contains"},value:{kind:"Variable",name:{kind:"Name",value:"tag"}}}]}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"slug"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"title"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"excerpt"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"image"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"url"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"caption"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"alternativeText"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"previewUrl"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"categories"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"slug"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"blocks"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:270}};t.loc.source={body:"query Articles ( $tag: String ) {\r\n  articles ( where:{ tags_contains : $tag } ){\r\n    slug\r\n    title\r\n    excerpt\r\n    image{\r\n      url\r\n      caption\r\n      alternativeText\r\n      previewUrl\r\n    }\r\n    categories {\r\n      name\r\n      slug\r\n    }\r\n    blocks\r\n  }\r\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};var r={};function o(e,n){for(var i=0;i<e.definitions.length;i++){var element=e.definitions[i];if(element.name&&element.name.value==n)return element}}t.definitions.forEach((function(e){if(e.name){var n=new Set;!function e(n,t){if("FragmentSpread"===n.kind)t.add(n.name.value);else if("VariableDefinition"===n.kind){var r=n.type;"NamedType"===r.kind&&t.add(r.name.value)}n.selectionSet&&n.selectionSet.selections.forEach((function(n){e(n,t)})),n.variableDefinitions&&n.variableDefinitions.forEach((function(n){e(n,t)})),n.definitions&&n.definitions.forEach((function(n){e(n,t)}))}(e,n),r[e.name.value]=n}})),e.exports=t,e.exports.Articles=function(e,n){var t={kind:e.kind,definitions:[o(e,n)]};e.hasOwnProperty("loc")&&(t.loc=e.loc);var l=r[n]||new Set,d=new Set,c=new Set;for(l.forEach((function(e){c.add(e)}));c.size>0;){var m=c;c=new Set,m.forEach((function(e){d.has(e)||(d.add(e),(r[e]||new Set).forEach((function(e){c.add(e)})))}))}return d.forEach((function(n){var r=o(e,n);r&&t.definitions.push(r)})),t}(t,"Articles")},374:function(e,n,t){"use strict";t.r(n);var r=t(3),o=t.n(r),l=t(361),d=t.n(l),c=(t(360),t(358)),m=t.n(c),v=t(359),k=t(24);function f(e,n,t,r,o,l,d){try{var c=e[l](d),m=c.value}catch(e){return void t(e)}c.done?n(m):Promise.resolve(m).then(r,o)}function h(object,e){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(object);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),n.push.apply(n,t)}return n}function N(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(n){S(e,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(source,n))}))}return e}function S(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var y={name:"NuxpCategories",data:function(){return{start:0,limit:10,component:null,articles:null}},components:{NuxpressoMokaTemplate:v.a},computed:N(N({},Object(k.b)(["settings","loop_action","categories"])),{},{action:function(){return this.loop_action},setLimit:function(){this.component.hasOwnProperty("loop_limit")&&(this.limit=parseInt(this.component.loop_limit))},category:function(){var e=this;return this.categories.filter((function(n){n.slug,e.$route.params.slug}))[0]}}),head:function(){return{title:this.settings.site_name+" - "+this.$route.params.slug,meta:[{hid:this.$route.params.slug,name:this.$route.params.slug,content:this.settings.site_title+" "+this.$route.params.slugt}]}},watch:{action:function(e){"next"===e&&(this.start+=this.limit,this.$fetch(),this.$store.dispatch("set_loop_action",null)),"prev"===e&&(this.start-=this.limit,this.start<0&&(this.start=0),this.$fetch(),this.$store.dispatch("set_loop_action",null))}},fetch:function(){var e,n=this;return(e=o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.$apolloProvider.defaultClient.query({query:m.a,variables:{loop_type:n.$route.params.slug}}).then((function(e){e.data.length?n.component=e.data.components[0]:n.$apolloProvider.defaultClient.query({query:m.a}).then((function(e){console.log(e.data),n.component=e.data.components[0]})),n.$apolloProvider.defaultClient.query({query:d.a,variables:{start:n.start,limit:n.limit,tag:n.$route.params.slug}}).then((function(e){n.articles=e.data.articles}))}));case 1:case"end":return e.stop()}}),e)})),function(){var n=this,t=arguments;return new Promise((function(r,o){var l=e.apply(n,t);function d(e){f(l,r,o,d,c,"next",e)}function c(e){f(l,r,o,d,c,"throw",e)}d(void 0)}))})()},mounted:function(){this.$fetch()}},F=t(19),component=Object(F.a)(y,(function(){var e=this.$createElement,n=this._self._c||e;return this.articles&&this.component?n("nuxpresso-moka-template",{attrs:{doc:this.component.json,article:this.articles,pagination:!0}}):this._e()}),[],!1,null,null,null);n.default=component.exports}}]);