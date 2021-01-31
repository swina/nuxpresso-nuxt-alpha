(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{470:function(e,n){var t={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"Articles"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"slug"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"articles"},arguments:[{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"slug"},value:{kind:"Variable",name:{kind:"Name",value:"slug"}}}]}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"title"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"excerpt"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"content"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"homepage"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"random_image"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"tags"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"lang"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"image"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"url"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"caption"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"alternativeText"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"previewUrl"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"gallery"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"url"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"caption"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"alternativeText"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"updated_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"seo_title"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"seo_description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"categories"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"slug"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"parent"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"slug"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"title"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"blocks"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"component"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"json"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"featured_img"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:599}};t.loc.source={body:"query Articles ( $slug : String){\r\n  articles( where : { slug :$slug } ) {\r\n    id\r\n    title\r\n    excerpt\r\n    content\r\n    homepage\r\n    random_image\r\n    tags\r\n    lang\r\n    image { \r\n        name \r\n        url\r\n        caption\r\n        alternativeText\r\n        previewUrl\r\n    }\r\n    gallery {\r\n        name\r\n        url\r\n        caption\r\n        alternativeText\r\n    }\r\n    updated_at\r\n    seo_title\r\n    seo_description\r\n    categories {\r\n        name\r\n        slug\r\n    }\r\n    parent {\r\n      slug\r\n      title\r\n    }\r\n    blocks\r\n    component {\r\n      json\r\n    }\r\n    featured_img\r\n  } \r\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};var r={};function d(e,n){for(var i=0;i<e.definitions.length;i++){var element=e.definitions[i];if(element.name&&element.name.value==n)return element}}t.definitions.forEach((function(e){if(e.name){var n=new Set;!function e(n,t){if("FragmentSpread"===n.kind)t.add(n.name.value);else if("VariableDefinition"===n.kind){var r=n.type;"NamedType"===r.kind&&t.add(r.name.value)}n.selectionSet&&n.selectionSet.selections.forEach((function(n){e(n,t)})),n.variableDefinitions&&n.variableDefinitions.forEach((function(n){e(n,t)})),n.definitions&&n.definitions.forEach((function(n){e(n,t)}))}(e,n),r[e.name.value]=n}})),e.exports=t,e.exports.Articles=function(e,n){var t={kind:e.kind,definitions:[d(e,n)]};e.hasOwnProperty("loc")&&(t.loc=e.loc);var l=r[n]||new Set,c=new Set,m=new Set;for(l.forEach((function(e){m.add(e)}));m.size>0;){var o=m;m=new Set,o.forEach((function(e){c.has(e)||(c.add(e),(r[e]||new Set).forEach((function(e){m.add(e)})))}))}return c.forEach((function(n){var r=d(e,n);r&&t.definitions.push(r)})),t}(t,"Articles")},474:function(e,n,t){"use strict";t.r(n);var r=t(3),d=t.n(r),l=t(470),c=t.n(l);function m(e,n,t,r,d,l,c){try{var m=e[l](c),o=m.value}catch(e){return void t(e)}m.done?n(o):Promise.resolve(o).then(r,d)}var o={name:"NuxpArticleSlug",components:{NuxpressoMokaTemplate:t(361).a},data:function(){return{articles:[],loaded:!1,template:null}},computed:{},head:function(){if(this.articles)return{title:this.articles.seo_title?this.articles.seo_title:this.articles.title,meta:[{hid:"description",name:"description",content:this.articles.seo_description?this.articles.seo_description:this.settings.seo_description||""}]}},asyncData:function(e){return(n=d.a.mark((function n(){var t,r,data;return d.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t=e.app,r=e.route,n.next=3,t.apolloProvider.defaultClient.query({query:c.a,variables:{slug:r.params.slug}});case 3:return data=n.sent,n.abrupt("return",{articles:data.data.articles[0]});case 5:case"end":return n.stop()}}),n)})),function(){var e=this,t=arguments;return new Promise((function(r,d){var l=n.apply(e,t);function c(e){m(l,r,d,c,o,"next",e)}function o(e){m(l,r,d,c,o,"throw",e)}c(void 0)}))})();var n}},v=t(19),component=Object(v.a)(o,(function(){var e=this.$createElement,n=this._self._c||e;return this.articles&&!this.loaded?n("nuxpresso-moka-template",{attrs:{doc:this.articles.blocks.json,article:this.articles}}):this._e()}),[],!1,null,null,null);n.default=component.exports}}]);