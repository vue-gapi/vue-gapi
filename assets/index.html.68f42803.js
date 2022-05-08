import{_ as p,r as o,o as c,c as i,a as n,b as e,F as r,d as s,e as t}from"./app.2effcce0.js";const l={},u={href:"https://www.npmjs.com/package/vue-gapi",target:"_blank",rel:"noopener noreferrer"},k=n("img",{src:"https://img.shields.io/npm/v/vue-gapi.svg",alt:"npm"},null,-1),d=s(),h={href:"https://vuejs.org/",target:"_blank",rel:"noopener noreferrer"},g=n("img",{src:"https://img.shields.io/badge/vue.js-3.x-brightgreen.svg?logo=vue.js",alt:"vuejs3"},null,-1),b=n("h1",{id:"vuegapi",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#vuegapi","aria-hidden":"true"},"#"),s(" VueGapi")],-1),_={href:"https://github.com/google/google-api-javascript-client",target:"_blank",rel:"noopener noreferrer"},m=s("Google API Client Library"),v=s(" wrapper for "),f={href:"https://vuejs.org/",target:"_blank",rel:"noopener noreferrer"},y=s("Vue.js"),x=n("h2",{id:"requirements",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#requirements","aria-hidden":"true"},"#"),s(" Requirements")],-1),j=s("Version 2 requires "),w={href:"https://vuejs.org/",target:"_blank",rel:"noopener noreferrer"},G=s("Vue.js v3.x"),I=s("."),V=s("If you are looking for a Vue.js v2.x compatible version, use "),A={href:"https://github.com/vue-gapi/vue-gapi/tree/releases/v1",target:"_blank",rel:"noopener noreferrer"},S=s("Version 1"),U=s("."),E=t(`<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> vue-gapi
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2>`,3),N=s("Install the plugin with "),q={href:"https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientinitargs--",target:"_blank",rel:"noopener noreferrer"},C=n("code",null,"gapi.client.init",-1),L=s(" configuration parameters:"),P=t(`<div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> VueGapi <span class="token keyword">from</span> <span class="token string">&#39;vue-gapi&#39;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>VueGapi<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">apiKey</span><span class="token operator">:</span> <span class="token string">&#39;&lt;YOUR_API_KEY&gt;&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">clientId</span><span class="token operator">:</span> <span class="token string">&#39;&lt;YOUR_CLIENT_ID&gt;.apps.googleusercontent.com&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">discoveryDocs</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;https://sheets.googleapis.com/$discovery/rest?version=v4&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">scope</span><span class="token operator">:</span> <span class="token string">&#39;https://www.googleapis.com/auth/spreadsheets&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="composition-api" tabindex="-1"><a class="header-anchor" href="#composition-api" aria-hidden="true">#</a> Composition API</h3>`,2),R=s("Inject the "),B={href:"https://vue-gapi.github.io/vue-gapi/reference/GoogleAuthService/__index__.html#googleauthservice",target:"_blank",rel:"noopener noreferrer"},O=n("code",null,"GoogleAuthService",-1),Y=s(" instance via "),$=n("code",null,"useGapi",-1),D=s(":"),F=t(`<div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useGapi <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-gapi&#39;</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="options-api" tabindex="-1"><a class="header-anchor" href="#options-api" aria-hidden="true">#</a> Options API</h3>`,2),K=s("Reference the "),T=n("code",null,"$gapi",-1),z=s(),H={href:"https://vuejs.org/api/application.html#app-config-globalproperties",target:"_blank",rel:"noopener noreferrer"},J=s("global property"),M=s(" accessible inside the application:"),Q=t(`<div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>$gapi<span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> currentUser<span class="token punctuation">,</span> gapi<span class="token punctuation">,</span> hasGrantedScopes <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">{</span> currentUser<span class="token punctuation">,</span> gapi<span class="token punctuation">,</span> hasGrantedScopes <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div>`,1);function W(X,Z){const a=o("ExternalLinkIcon");return c(),i(r,null,[n("p",null,[n("a",u,[k,e(a)]),d,n("a",h,[g,e(a)])]),b,n("p",null,[n("a",_,[m,e(a)]),v,n("a",f,[y,e(a)])]),x,n("p",null,[j,n("a",w,[G,e(a)]),I]),n("p",null,[V,n("a",A,[S,e(a)]),U]),E,n("p",null,[N,n("a",q,[C,e(a)]),L]),P,n("p",null,[R,n("a",B,[O,e(a)]),Y,$,D]),F,n("p",null,[K,T,z,n("a",H,[J,e(a)]),M]),Q],64)}var sn=p(l,[["render",W],["__file","index.html.vue"]]);export{sn as default};
