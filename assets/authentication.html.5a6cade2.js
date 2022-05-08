import{_ as c,r as p,o as l,c as u,a as n,b as a,w as e,F as r,d as s,e as i}from"./app.2effcce0.js";const k={},d=n("h1",{id:"authentication",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#authentication","aria-hidden":"true"},"#"),s(" Authentication")],-1),b=s("Once you have "),m=s("installed"),_=s(" the plugin, here is a conventional Vue.js v3.x "),h={href:"https://vuejs.org/guide/essentials/component-basics.html",target:"_blank",rel:"noopener noreferrer"},g=s("component"),f=s(" that displays a login or logout button based on a detected authenticated state."),v=i(`<h3 id="component" tabindex="-1"><a class="header-anchor" href="#component" aria-hidden="true">#</a> Component</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> computed<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useGapi <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-gapi&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> gapi <span class="token operator">=</span> <span class="token function">useGapi</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// (1) Subscribe to authentication status changes</span>
    <span class="token keyword">const</span> isSignedIn <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
    gapi<span class="token punctuation">.</span><span class="token function">listenUserSignIn</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      isSignedIn<span class="token punctuation">.</span>value <span class="token operator">=</span> value
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// (2) Display authenticated user name</span>
    <span class="token keyword">const</span> userName <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> user <span class="token operator">=</span> gapi<span class="token punctuation">.</span><span class="token function">getUserData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

      <span class="token keyword">return</span> user <span class="token operator">?</span> user<span class="token punctuation">.</span>firstName <span class="token operator">:</span> <span class="token keyword">undefined</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// (3) Expose $gapi methods</span>
    <span class="token keyword">function</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      gapi<span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> currentUser<span class="token punctuation">,</span> gapi<span class="token punctuation">,</span> hasGrantedScopes <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">{</span> currentUser<span class="token punctuation">,</span> gapi<span class="token punctuation">,</span> hasGrantedScopes <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function">logout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      gapi<span class="token punctuation">.</span><span class="token function">logout</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      isSignedIn<span class="token punctuation">,</span>
      userName<span class="token punctuation">,</span>
      login<span class="token punctuation">,</span>
      logout<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;#login-template&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br></div></div><h3 id="template" tabindex="-1"><a class="header-anchor" href="#template" aria-hidden="true">#</a> Template</h3><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text/x-template<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>login-template<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>div v<span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">&quot;isSignedIn&quot;</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>button @click<span class="token operator">=</span><span class="token string">&quot;logout()&quot;</span> type<span class="token operator">=</span><span class="token string">&quot;button&quot;</span><span class="token operator">&gt;</span>Logout<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
      <span class="token punctuation">{</span><span class="token punctuation">{</span> userName <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>button
      <span class="token operator">:</span>disabled<span class="token operator">=</span><span class="token string">&quot;isSignedIn === null&quot;</span>
      @click<span class="token operator">=</span><span class="token string">&quot;login()&quot;</span>
      type<span class="token operator">=</span><span class="token string">&quot;button&quot;</span>
      v<span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">&quot;!isSignedIn&quot;</span>
    <span class="token operator">&gt;</span>
      Login
    <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div>`,4),y=s("Subscribe to authentication status changes via "),x=n("code",null,"listenUserSignIn",-1),S=s("."),w=s("Expose "),q=n("code",null,"login",-1),G=s(" and "),I=n("code",null,"logout",-1),E=s(" methods."),j=s("Most "),A=n("code",null,"$gapi",-1),N=s(" methods return a promise. See the "),U=n("code",null,"GoogleAuthService",-1),L=s(" reference documentation"),D=s(" for more details."),V=s("Display the authenticated user's name via "),B=n("code",null,"getUserData",-1),C=s("."),F=s("See the "),R=n("code",null,"UserData",-1),T=s(" reference documentation"),$=s(" for a full list of user object properties which are persisted in local storage in practice.");function M(O,z){const t=p("RouterLink"),o=p("ExternalLinkIcon");return l(),u(r,null,[d,n("p",null,[b,a(t,{to:"/#usage"},{default:e(()=>[m]),_:1}),_,n("a",h,[g,a(o)]),f]),v,n("ol",null,[n("li",null,[n("p",null,[y,a(t,{to:"/reference/GoogleAuthService/__index__.html#listenusersignin-callback-%E2%87%92-promise-void"},{default:e(()=>[x]),_:1}),S])]),n("li",null,[n("p",null,[w,a(t,{to:"/reference/GoogleAuthService/__index__.html#login-options-%E2%87%92-promise-loginresponse"},{default:e(()=>[q]),_:1}),G,a(t,{to:"/reference/GoogleAuthService/__index__.html#logout-%E2%87%92-promise"},{default:e(()=>[I]),_:1}),E]),n("p",null,[n("em",null,[j,A,N,a(t,{to:"/reference/GoogleAuthService/__index__.html#googleauthservice"},{default:e(()=>[U,L]),_:1}),D])])]),n("li",null,[n("p",null,[V,a(t,{to:"/reference/GoogleAuthService/__index__.html#getuserdata-%E2%87%92-userdata-null"},{default:e(()=>[B]),_:1}),C]),n("p",null,[n("em",null,[F,a(t,{to:"/reference/GoogleAuthService/__index__.html#userdata-object"},{default:e(()=>[R,T]),_:1}),$])])])])],64)}var J=c(k,[["render",M],["__file","authentication.html.vue"]]);export{J as default};
