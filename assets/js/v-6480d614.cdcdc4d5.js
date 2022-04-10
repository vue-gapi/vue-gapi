"use strict";(self.webpackChunkvue_gapi=self.webpackChunkvue_gapi||[]).push([[341],{6717:(n,s,a)=>{a.r(s),a.d(s,{data:()=>e});const e={key:"v-6480d614",path:"/examples/authentication.html",title:"Authentication",lang:"en-US",frontmatter:{},excerpt:"",headers:[{level:3,title:"Template",slug:"template",children:[]},{level:3,title:"Component",slug:"component",children:[]}],filePathRelative:"examples/authentication.md",git:{updatedTime:1649630608e3,contributors:[{name:"dependabot[bot]",email:"49699333+dependabot[bot]@users.noreply.github.com",commits:1}]}}},3543:(n,s,a)=>{a.r(s),a.d(s,{default:()=>z});var e=a(3648);const t=(0,e._)("h1",{id:"authentication",tabindex:"-1"},[(0,e._)("a",{class:"header-anchor",href:"#authentication","aria-hidden":"true"},"#"),(0,e.Uk)(" Authentication")],-1),p=(0,e.Uk)("Once you have "),o={href:"/#usage",target:"_blank",rel:"noopener noreferrer"},l=(0,e.Uk)("installed"),c=(0,e.Uk)(" the plugin, here is a conventional Vue.js v3.x "),r={href:"https://v3.vuejs.org/guide/component-basics.html",target:"_blank",rel:"noopener noreferrer"},u=(0,e.Uk)("component"),i=(0,e.Uk)(" that displays a login or logout button based on a detected authenticated state."),k=(0,e.uE)('<h3 id="template" tabindex="-1"><a class="header-anchor" href="#template" aria-hidden="true">#</a> Template</h3><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text/x-template<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>login-template<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n  <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>\n    <span class="token operator">&lt;</span>div v<span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">&quot;isSignedIn&quot;</span><span class="token operator">&gt;</span>\n      <span class="token operator">&lt;</span>button @click<span class="token operator">=</span><span class="token string">&quot;logout()&quot;</span> type<span class="token operator">=</span><span class="token string">&quot;button&quot;</span><span class="token operator">&gt;</span>Logout<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>\n      <span class="token punctuation">{</span><span class="token punctuation">{</span> userName <span class="token punctuation">}</span><span class="token punctuation">}</span>\n    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>\n    <span class="token operator">&lt;</span>button\n      <span class="token operator">:</span>disabled<span class="token operator">=</span><span class="token string">&quot;isSignedIn === null&quot;</span>\n      @click<span class="token operator">=</span><span class="token string">&quot;login()&quot;</span>\n      type<span class="token operator">=</span><span class="token string">&quot;button&quot;</span>\n      v<span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">&quot;!isSignedIn&quot;</span>\n    <span class="token operator">&gt;</span>\n      Login\n    <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>\n  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="component" tabindex="-1"><a class="header-anchor" href="#component" aria-hidden="true">#</a> Component</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>app<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;login&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;#login-template&#39;</span><span class="token punctuation">,</span>\n  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      <span class="token literal-property property">isSignedIn</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// (1) Track authenticated state</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// (2) Subscribe to authentication status changes</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>$gapi<span class="token punctuation">.</span><span class="token function">listenUserSignIn</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">isSignedIn</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>isSignedIn <span class="token operator">=</span> isSignedIn\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token comment">// (3) Expose $gapi methods</span>\n    <span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>$gapi<span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token function">logout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>$gapi<span class="token punctuation">.</span><span class="token function">logout</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token function">userName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">// (4) Display authenticated user name</span>\n      <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$gapi<span class="token punctuation">.</span><span class="token function">getUserData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>user<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> user<span class="token punctuation">.</span>firstName\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div>',4),b=(0,e.Uk)("Track authenticated state via an "),m=(0,e._)("code",null,"isSignedIn",-1),d=(0,e.Uk)(),g={href:"https://v3.vuejs.org/guide/data-methods.html#data-properties",target:"_blank",rel:"noopener noreferrer"},h=(0,e.Uk)("data option"),_=(0,e.Uk)(" property."),f=(0,e.Uk)("Subscribe to authentication status changes via "),v={href:"/reference/GoogleAuthService/__index__.html#listenusersignin-callback-%E2%87%92-promise-void",target:"_blank",rel:"noopener noreferrer"},y=(0,e._)("code",null,"listenUserSignIn",-1),U=(0,e.Uk)("."),S=(0,e.Uk)("Expose "),q={href:"/reference/GoogleAuthService/__index__.html#login-options-%E2%87%92-promise-loginresponse",target:"_blank",rel:"noopener noreferrer"},x=(0,e._)("code",null,"login",-1),w=(0,e.Uk)(" and "),I={href:"/reference/GoogleAuthService/__index__.html#logout-%E2%87%92-promise",target:"_blank",rel:"noopener noreferrer"},j=(0,e._)("code",null,"logout",-1),A=(0,e.Uk)(" methods."),W=(0,e.Uk)("Most "),E=(0,e._)("code",null,"$gapi",-1),G=(0,e.Uk)(" methods return a promise. See the "),D={href:"/reference/GoogleAuthService/__index__.html#googleauthservice",target:"_blank",rel:"noopener noreferrer"},$=(0,e._)("code",null,"GoogleAuthService",-1),T=(0,e.Uk)(" reference documentation"),C=(0,e.Uk)(" for more details."),L=(0,e.Uk)("Display the authenticated user's name via "),N={href:"/reference/GoogleAuthService/__index__.html#getuserdata-%E2%87%92-userdata-null",target:"_blank",rel:"noopener noreferrer"},O=(0,e._)("code",null,"getUserData",-1),H=(0,e.Uk)("."),M=(0,e.Uk)("See the "),P={href:"/reference/GoogleAuthService/__index__.html#userdata-object",target:"_blank",rel:"noopener noreferrer"},R=(0,e._)("code",null,"UserData",-1),V=(0,e.Uk)(" reference documentation"),Y=(0,e.Uk)(" for a full list of user object properties which are persisted in local storage in practice."),z={render:function(n,s){const a=(0,e.up)("OutboundLink");return(0,e.wg)(),(0,e.iD)(e.HY,null,[t,(0,e._)("p",null,[p,(0,e._)("a",o,[l,(0,e.Wm)(a)]),c,(0,e._)("a",r,[u,(0,e.Wm)(a)]),i]),k,(0,e._)("ol",null,[(0,e._)("li",null,[(0,e._)("p",null,[b,m,d,(0,e._)("a",g,[h,(0,e.Wm)(a)]),_])]),(0,e._)("li",null,[(0,e._)("p",null,[f,(0,e._)("a",v,[y,(0,e.Wm)(a)]),U])]),(0,e._)("li",null,[(0,e._)("p",null,[S,(0,e._)("a",q,[x,(0,e.Wm)(a)]),w,(0,e._)("a",I,[j,(0,e.Wm)(a)]),A]),(0,e._)("p",null,[(0,e._)("em",null,[W,E,G,(0,e._)("a",D,[$,T,(0,e.Wm)(a)]),C])])]),(0,e._)("li",null,[(0,e._)("p",null,[L,(0,e._)("a",N,[O,(0,e.Wm)(a)]),H]),(0,e._)("p",null,[(0,e._)("em",null,[M,(0,e._)("a",P,[R,V,(0,e.Wm)(a)]),Y])])])])],64)}}}}]);