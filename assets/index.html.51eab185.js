import{_ as o,o as p,c as i,a as n,b as e,d as s,e as t,r as c}from"./app.5e992d15.js";const l={},r={href:"https://www.npmjs.com/package/vue-gapi",target:"_blank",rel:"noopener noreferrer"},u=n("img",{src:"https://img.shields.io/npm/v/vue-gapi.svg",alt:"npm"},null,-1),d=s(),k={href:"https://vuejs.org/",target:"_blank",rel:"noopener noreferrer"},h=n("img",{src:"https://img.shields.io/badge/vue.js-3.x-brightgreen.svg?logo=vue.js",alt:"vuejs3"},null,-1),_=n("h1",{id:"vuegapi",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#vuegapi","aria-hidden":"true"},"#"),s(" VueGapi")],-1),v={href:"https://github.com/google/google-api-javascript-client",target:"_blank",rel:"noopener noreferrer"},g=s("Google API Client Library"),m=s(" wrapper for "),b={href:"https://vuejs.org/",target:"_blank",rel:"noopener noreferrer"},f=s("Vue.js"),y=n("h2",{id:"\u26A0\uFE0F-deprecation",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u26A0\uFE0F-deprecation","aria-hidden":"true"},"#"),s(" \u26A0\uFE0F Deprecation")],-1),w=s("The Google Sign-In JavaScript Platform Library is "),x={href:"https://developers.googleblog.com/2022/03/gis-jsweb-authz-migration.html",target:"_blank",rel:"noopener noreferrer"},j=s("deprecated"),G=s(" and will be fully retired on March 31, 2023. This plugin will not be receiving new features."),I=s("We would encourage you to migrate your application to "),V={href:"https://github.com/wavezync/vue3-google-signin",target:"_blank",rel:"noopener noreferrer"},S=s("Vue3 Google Sign-in"),A=s(" which exposes a number of Vue 3 composables built on the new "),U={href:"https://developers.google.com/identity/gsi/web",target:"_blank",rel:"noopener noreferrer"},E=s("Google Identity Services"),L=s(" library."),N=n("h2",{id:"requirements",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#requirements","aria-hidden":"true"},"#"),s(" Requirements")],-1),P=s("Version 2 requires "),q={href:"https://vuejs.org/",target:"_blank",rel:"noopener noreferrer"},C=s("Vue 3"),R=s("."),T=s("If you are looking for a "),B={href:"https://v2.vuejs.org/",target:"_blank",rel:"noopener noreferrer"},D=s("Vue 2"),O=s(" compatible version, use "),Y={href:"https://github.com/vue-gapi/vue-gapi/tree/releases/v1",target:"_blank",rel:"noopener noreferrer"},$=s("Version 1"),z=s("."),K=t(`<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> vue-gapi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2>`,3),J=s("Install the plugin with "),M={href:"https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientinitargs--",target:"_blank",rel:"noopener noreferrer"},W=n("code",null,"gapi.client.init",-1),F=s(" configuration parameters:"),H=t(`<div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> VueGapi <span class="token keyword">from</span> <span class="token string">&#39;vue-gapi&#39;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>VueGapi<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">apiKey</span><span class="token operator">:</span> <span class="token string">&#39;&lt;YOUR_API_KEY&gt;&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">clientId</span><span class="token operator">:</span> <span class="token string">&#39;&lt;YOUR_CLIENT_ID&gt;.apps.googleusercontent.com&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">discoveryDocs</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;https://sheets.googleapis.com/$discovery/rest?version=v4&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">scope</span><span class="token operator">:</span> <span class="token string">&#39;https://www.googleapis.com/auth/spreadsheets&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="composition-api" tabindex="-1"><a class="header-anchor" href="#composition-api" aria-hidden="true">#</a> Composition API</h3>`,2),Q=s("Inject the "),X={href:"https://vue-gapi.github.io/vue-gapi/reference/GoogleAuthService/__index__.html#googleauthservice",target:"_blank",rel:"noopener noreferrer"},Z=n("code",null,"GoogleAuthService",-1),nn=s(" instance via "),sn=n("code",null,"useGapi",-1),an=s(":"),en=t(`<div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useGapi <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-gapi&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> gapi <span class="token operator">=</span> <span class="token function">useGapi</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">function</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      gapi<span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> currentUser<span class="token punctuation">,</span> gapi<span class="token punctuation">,</span> hasGrantedScopes <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">{</span> currentUser<span class="token punctuation">,</span> gapi<span class="token punctuation">,</span> hasGrantedScopes <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span> login <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="options-api" tabindex="-1"><a class="header-anchor" href="#options-api" aria-hidden="true">#</a> Options API</h3>`,2),tn=s("Reference the "),on=n("code",null,"$gapi",-1),pn=s(),cn={href:"https://vuejs.org/api/application.html#app-config-globalproperties",target:"_blank",rel:"noopener noreferrer"},ln=s("global property"),rn=s(" accessible inside the application:"),un=t(`<div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>$gapi<span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> currentUser<span class="token punctuation">,</span> gapi<span class="token punctuation">,</span> hasGrantedScopes <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">{</span> currentUser<span class="token punctuation">,</span> gapi<span class="token punctuation">,</span> hasGrantedScopes <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function dn(kn,hn){const a=c("ExternalLinkIcon");return p(),i("div",null,[n("p",null,[n("a",r,[u,e(a)]),d,n("a",k,[h,e(a)])]),_,n("p",null,[n("a",v,[g,e(a)]),m,n("a",b,[f,e(a)])]),y,n("p",null,[w,n("a",x,[j,e(a)]),G]),n("p",null,[I,n("strong",null,[n("a",V,[S,e(a)])]),A,n("a",U,[E,e(a)]),L]),N,n("p",null,[P,n("a",q,[C,e(a)]),R]),n("p",null,[T,n("a",B,[D,e(a)]),O,n("a",Y,[$,e(a)]),z]),K,n("p",null,[J,n("a",M,[W,e(a)]),F]),H,n("p",null,[Q,n("a",X,[Z,e(a)]),nn,sn,an]),en,n("p",null,[tn,on,pn,n("a",cn,[ln,e(a)]),rn]),un])}var vn=o(l,[["render",dn],["__file","index.html.vue"]]);export{vn as default};