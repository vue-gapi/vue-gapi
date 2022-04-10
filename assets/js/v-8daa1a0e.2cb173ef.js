"use strict";(self.webpackChunkvue_gapi=self.webpackChunkvue_gapi||[]).push([[509],{6464:(n,s,a)=>{a.r(s),a.d(s,{data:()=>e});const e={key:"v-8daa1a0e",path:"/",title:"VueGapi",lang:"en-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"Requirements",slug:"requirements",children:[]},{level:2,title:"Installation",slug:"installation",children:[]},{level:2,title:"Usage",slug:"usage",children:[]}],filePathRelative:"README.md",git:{updatedTime:null,contributors:[]}}},8899:(n,s,a)=>{a.r(s),a.d(s,{default:()=>$});var e=a(3648);const p={href:"https://www.npmjs.com/package/vue-gapi",target:"_blank",rel:"noopener noreferrer"},t=(0,e._)("img",{src:"https://img.shields.io/npm/v/vue-gapi.svg",alt:"npm"},null,-1),o=(0,e.Uk)(),l={href:"https://v3.vuejs.org/",target:"_blank",rel:"noopener noreferrer"},r=(0,e._)("img",{src:"https://img.shields.io/badge/vue.js-3.x-brightgreen.svg?logo=vue.js",alt:"vuejs3"},null,-1),c=(0,e._)("h1",{id:"vuegapi",tabindex:"-1"},[(0,e._)("a",{class:"header-anchor",href:"#vuegapi","aria-hidden":"true"},"#"),(0,e.Uk)(" VueGapi")],-1),i={href:"https://github.com/google/google-api-javascript-client",target:"_blank",rel:"noopener noreferrer"},u=(0,e.Uk)("Google API Client Library"),k=(0,e.Uk)(" wrapper for "),g={href:"https://v3.vuejs.org/",target:"_blank",rel:"noopener noreferrer"},b=(0,e.Uk)("Vue.js"),d=(0,e._)("h2",{id:"requirements",tabindex:"-1"},[(0,e._)("a",{class:"header-anchor",href:"#requirements","aria-hidden":"true"},"#"),(0,e.Uk)(" Requirements")],-1),m=(0,e.Uk)("Version 2 requires "),h={href:"https://v3.vuejs.org/",target:"_blank",rel:"noopener noreferrer"},v=(0,e.Uk)("Vue.js v3.x"),f=(0,e.Uk)("."),_=(0,e.Uk)("If you are looking for a Vue.js v2.x compatible version, use "),U={href:"https://github.com/vue-gapi/vue-gapi/tree/releases/v1",target:"_blank",rel:"noopener noreferrer"},y=(0,e.Uk)("Version 1"),w=(0,e.Uk)("."),j=(0,e.uE)('<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save vue-gapi\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>or</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> vue-gapi\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2>',5),x=(0,e.Uk)("Installing the plugin with "),V={href:"https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientinitargs--",target:"_blank",rel:"noopener noreferrer"},I=(0,e._)("code",null,"gapi.client.init",-1),W=(0,e.Uk)(" configuration parameters:"),E=(0,e.uE)('<div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>\n<span class="token keyword">import</span> VueGapi <span class="token keyword">from</span> <span class="token string">&#39;vue-gapi&#39;</span>\n\n<span class="token keyword">const</span> app <span class="token operator">=</span> Vue<span class="token punctuation">.</span><span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n\napp<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>VueGapi<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n  <span class="token literal-property property">apiKey</span><span class="token operator">:</span> <span class="token string">&#39;&lt;YOUR_API_KEY&gt;&#39;</span><span class="token punctuation">,</span>\n  <span class="token literal-property property">clientId</span><span class="token operator">:</span> <span class="token string">&#39;&lt;YOUR_CLIENT_ID&gt;.apps.googleusercontent.com&#39;</span><span class="token punctuation">,</span>\n  <span class="token literal-property property">discoveryDocs</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;https://sheets.googleapis.com/$discovery/rest?version=v4&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token literal-property property">scope</span><span class="token operator">:</span> <span class="token string">&#39;https://www.googleapis.com/auth/spreadsheets&#39;</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div>',1),G=(0,e.Uk)("exposes a "),q=(0,e._)("code",null,"$gapi",-1),R=(0,e.Uk)(),A={href:"https://v3.vuejs.org/api/application-config.html#globalproperties",target:"_blank",rel:"noopener noreferrer"},C=(0,e.Uk)("global property"),D=(0,e.Uk)(" accessible inside the application:"),S=(0,e.uE)('<div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>$gapi<span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> currentUser<span class="token punctuation">,</span> gapi<span class="token punctuation">,</span> hasGrantedScopes <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">{</span> currentUser<span class="token punctuation">,</span> gapi<span class="token punctuation">,</span> hasGrantedScopes <span class="token punctuation">}</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div>',1),Y=(0,e.Uk)("See "),L={href:"https://vue-gapi.github.io/vue-gapi/examples/authentication.html",target:"_blank",rel:"noopener noreferrer"},O=(0,e.Uk)("Examples"),P=(0,e.Uk)(" for a comprehensive example."),$={render:function(n,s){const a=(0,e.up)("OutboundLink");return(0,e.wg)(),(0,e.iD)(e.HY,null,[(0,e._)("p",null,[(0,e._)("a",p,[t,(0,e.Wm)(a)]),o,(0,e._)("a",l,[r,(0,e.Wm)(a)])]),c,(0,e._)("p",null,[(0,e._)("a",i,[u,(0,e.Wm)(a)]),k,(0,e._)("a",g,[b,(0,e.Wm)(a)])]),d,(0,e._)("p",null,[m,(0,e._)("a",h,[v,(0,e.Wm)(a)]),f]),(0,e._)("p",null,[_,(0,e._)("a",U,[y,(0,e.Wm)(a)]),w]),j,(0,e._)("p",null,[x,(0,e._)("a",V,[I,(0,e.Wm)(a)]),W]),E,(0,e._)("p",null,[G,q,R,(0,e._)("a",A,[C,(0,e.Wm)(a)]),D]),S,(0,e._)("p",null,[Y,(0,e._)("a",L,[O,(0,e.Wm)(a)]),P])],64)}}}}]);