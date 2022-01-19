(this["webpackJsonpdino-app"]=this["webpackJsonpdino-app"]||[]).push([[1],{104:function(e,t,n){},105:function(e,t,n){"use strict";n.r(t);var i,o=n(7),c=n.n(o),r=n(33),s=n.n(r),a=n(18),l=n(67),u=n(26),d=n(16),j=(n(61),n(36)),O=n(17),b=n(19),f=n(2),v=n(3);!function(e){e.SET_MODE="SET_MODE",e.SET_STATE="SET_STATE",e.INTRODUCTION="INTRODUCTION",e.ERROR="ERROR",e.REQUEST_PREVIEW="REQUEST_PREVIEW",e.STREAM="STREAM"}(i||(i={}));var h,g=i;!function(e){e.USERNAME="USERNAME",e.TOKEN="TOKEN",e.ERROR="ERROR",e.AVAILABLE_MODES="AVAILABLE_MODES"}(h||(h={}));var p=h,m=function(){function e(){Object(f.a)(this,e)}return Object(v.a)(e,null,[{key:"websocket",get:function(){var e=this;if(!this._websocket){var t,n=null===(t=localStorage.getItem(p.TOKEN))||void 0===t?void 0:t.replace(/[^a-z0-9-]/gim,"");this._websocket=new WebSocket("wss://dino.petrusbellmonte.de",[null!==n&&void 0!==n?n:"no-token","dino"]),console.log(n),this._websocket.onopen=function(){var t;console.log("socket opened..."),null===(t=e._websocket)||void 0===t||t.send(JSON.stringify({origin:e.myOrigin,type:g.INTRODUCTION,args:{name:localStorage.getItem(p.USERNAME),type:"APP"}}))},this._websocket.onerror=function(e){console.log(e)},this._websocket.onclose=function(t){e._websocket=void 0},this._websocket.onmessage=function(t){try{var n=JSON.parse(t.data);switch(console.log(n),n.type){case g.INTRODUCTION:var i=n;if("server"===i.origin.toLowerCase())e.introduction=i,e.triggerListenersByType(Object(b.a)(Object(b.a)({},n),{},{type:g.SET_STATE,args:{newState:n.args.currentState}})),document.dispatchEvent(new CustomEvent(p.AVAILABLE_MODES,{detail:e.introduction.args.availableModes}));else if(e.introduction){var o,c;console.log("wtf");var r=e.introduction.args.availableModes.map((function(e){return e.type}));e.introduction.args.availableModes=[].concat(Object(O.a)(e.introduction.args.availableModes),Object(O.a)((null!==(o=null!==(c=i.args.availableModes)&&void 0!==c?c:i.args.possibleModes)&&void 0!==o?o:[]).filter((function(e){return!r.includes(e.type)})))),console.log("updating available modes... Now: ".concat(JSON.stringify(e.introduction.args.availableModes))),document.dispatchEvent(new CustomEvent(p.AVAILABLE_MODES,{detail:e.introduction.args.availableModes})),e.triggerListenersByType(n)}else console.log("weird shit");break;case g.SET_MODE:case g.SET_STATE:e.triggerListenersByType(n);break;case g.ERROR:throw new Error(n.args.message)}}catch(s){console.warn(s),document.dispatchEvent(new CustomEvent(p.ERROR,{detail:s.msg}))}}}return this._websocket}},{key:"triggerListenersByType",value:function(e){this.actionListeners.filter((function(t){return t.actionType===e.type})).forEach((function(t){return t.listener(e)}))}},{key:"addListener",value:function(e,t){this.websocket;var n=Math.max.apply(Math,Object(O.a)(this.actionListeners.map((function(e){return e.id}))))+1;return this.actionListeners=[].concat(Object(O.a)(this.actionListeners),[{id:n,actionType:e,listener:t}]),n}},{key:"removeListener",value:function(e){this.actionListeners=this.actionListeners.filter((function(t){return t.id!==e}))}}]),e}();m.introduction=void 0,m._websocket=void 0,m.myOrigin=Math.random().toString().replace(/^../,""),m.actionListeners=[];var E=function(e){var t,n=Object(o.useState)(null!==(t=window["LAST_".concat(e)])&&void 0!==t?t:null),i=Object(d.a)(n,2),c=i[0],r=i[1];Object(o.useEffect)((function(){var t=m.addListener(e,(function(t){window["LAST_".concat(e)]=t,r(t)}));return function(){m.removeListener(t)}}),[e]);return[c,function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"ALL";m.websocket.send(JSON.stringify({origin:m.myOrigin,type:e,address:n,args:t}))}]},x=function(e,t){var n,i,c=Object(o.useState)(null!==(n=JSON.parse(null!==(i=localStorage.getItem(e))&&void 0!==i?i:"null"))&&void 0!==n?n:t),r=Object(d.a)(c,2),s=r[0],a=r[1];return Object(o.useEffect)((function(){var t=function(e){a(e.detail),console.log("update modes"+JSON.stringify(e.detail))};return document.addEventListener(e,t),function(){return document.removeEventListener(e,t)}}),[]),[s,function(t){localStorage.setItem(e,JSON.stringify(t));var n=new CustomEvent(e,{detail:t});document.dispatchEvent(n)}]},w=(n(62),n(13)),S=function(e){var t=e.title,n=E(g.SET_STATE),i=Object(d.a)(n,2),o=i[0],c=i[1],r=x(p.USERNAME),s=Object(d.a)(r,1)[0];return Object(w.jsx)(a.e,{children:Object(w.jsxs)(a.v,{children:[Object(w.jsx)(a.c,{slot:"start",children:Object(w.jsx)(a.b,{className:(null===o||void 0===o?void 0:o.args.newState)?"active":"inactive",onClick:function(){return c({newState:!(null===o||void 0===o?void 0:o.args.newState)})},children:Object(w.jsx)(a.f,{slot:"icon-only",icon:j.e})})}),Object(w.jsxs)(a.t,{children:[t,", ",s]}),Object(w.jsx)(a.c,{slot:"end",children:Object(w.jsx)(a.m,{})})]})})},y=function(){Object(u.e)().name;var e=x(p.USERNAME,""),t=Object(d.a)(e,2),n=t[0],i=t[1],o=x(p.TOKEN,""),c=Object(d.a)(o,2),r=c[0],s=c[1];return Object(w.jsxs)(a.p,{children:[Object(w.jsx)(S,{title:"Settings"}),Object(w.jsxs)(a.d,{children:[Object(w.jsx)("p",{children:"This is the settings page!"}),Object(w.jsxs)(a.j,{children:[Object(w.jsxs)(a.h,{children:[Object(w.jsx)(a.i,{position:"floating",children:"Username"}),Object(w.jsx)(a.g,{name:"username",value:n,onIonChange:function(e){var t;return i(null!==(t=e.detail.value)&&void 0!==t?t:"")}})]}),Object(w.jsxs)(a.h,{children:[Object(w.jsx)(a.i,{position:"floating",children:"Token"}),Object(w.jsx)(a.g,{type:"password",name:"token",value:r,onIonChange:function(e){var t;return s(null!==(t=e.detail.value)&&void 0!==t?t:"")}})]})]})]})]})},T=n(21),k=n(71),R=n(113),A=n(114),L=n(115),M=n(72),N=n(69),_=n(73);n(90);function I(){var e=Object(R.a)().progress;return Object(w.jsxs)(A.a,{center:!0,children:[e," % loaded"]})}function D(e){var t=Object(T.d)(k.a,"dino.fbx"),n=Object(o.useRef)(null),i=Object(o.useState)(!1),c=Object(d.a)(i,2),r=(c[0],c[1]);return Object(w.jsxs)("mesh",Object(b.a)(Object(b.a)({},e),{},{ref:n,scale:8e-4,onPointerOver:function(e){return r(!0)},onPointerOut:function(e){return r(!1)},children:[Object(w.jsx)("primitive",{object:t}),Object(w.jsx)("meshPhongMaterial",{color:"green",opacity:.1,transparent:!0})]}))}Object(T.b)({EffectComposer:M.a,RenderPass:N.a,UnrealBloomPass:_.a});var U,C=function(e){var t=e.children,n=(e.active,Object(T.e)()),i=n.gl,c=n.camera,r=n.size,s=Object(o.useState)(),a=Object(d.a)(s,2),l=a[0],u=a[1],j=Object(o.useRef)(null);return Object(o.useEffect)((function(){}),[r]),Object(T.c)((function(){var e;return l&&(null===(e=j.current)||void 0===e?void 0:e.render())}),1),Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("scene",{ref:u,children:t}),Object(w.jsxs)("effectComposer",{ref:j,args:[i],children:[Object(w.jsx)("renderPass",{attachArray:"passes",scene:l,camera:c}),Object(w.jsx)("unrealBloomPass",{attachArray:"passes",args:[void 0,1.5,1,0]})]})]})},P=function(){return Object(T.e)((function(e){var t=e.camera;t.rotation.set(-35*(Math.PI/180),0,0),t.position.set(0,2,5)})),Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("ambientLight",{}),Object(w.jsx)("pointLight",{position:[10,10,10]}),Object(w.jsx)(D,{position:[0,-2,0]})]})},B=function(){return Object(w.jsx)(T.a,{style:{height:"min(40vh, 500px)"},linear:!0,id:"dino-canvas",children:Object(w.jsxs)(o.Suspense,{fallback:Object(w.jsx)(I,{}),children:[Object(w.jsx)(C,{children:Object(w.jsx)(P,{})}),Object(w.jsx)(L.a,{autoRotate:!0,enableZoom:!1,enablePan:!1})]})})},W=n(53),J=n(28);n(63),n(64),n(65);!function(e){e.COLOR="COLOR",e.NUMBER="NUMBER"}(U||(U={}));var V=U,F=function(e){var t=e.mode,n=E(g.SET_MODE),i=Object(d.a)(n,2),c=(i[0],i[1]),r=Object(o.useState)([]),s=Object(d.a)(r,2),l=s[0],u=s[1];Object(o.useEffect)((function(){u(Object.keys(t.params).map((function(e){return[e,t.params[e]]})))}),[t]);return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("h1",{children:t.name}),Object(w.jsx)("p",{children:t.description}),l.map((function(e){var t=Object(d.a)(e,2);return function(e,t){var n;return Object(w.jsxs)(a.h,{children:[Object(w.jsx)(a.i,{children:t.name}),Object(w.jsx)("input",{type:t.type===V.NUMBER?"number":"color",value:null!==(n=t.value)&&void 0!==n?n:t.defaultValue,onChange:function(t){u((function(n){return n.map((function(n){var i=Object(d.a)(n,2),o=i[0],c=i[1];return o===e?[o,Object(b.a)(Object(b.a)({},c),{},{value:t.target.value})]:[o,c]}))}))}})]},e)}(t[0],t[1])})),Object(w.jsx)(a.b,{onClick:function(){return c({newMode:Object(b.a)(Object(b.a)({},t),{},{params:l.reduce((function(e,t){var n=Object(d.a)(t,2),i=n[0],o=n[1];return e[i]=o}),{})})})},children:"Apply"})]})};function K(){var e=x(p.AVAILABLE_MODES),t=Object(d.a)(e,1)[0],n=E(g.SET_MODE),i=Object(d.a)(n,2);i[0],i[1];return Object(w.jsx)(W.a,{spaceBetween:50,loop:!0,navigation:!0,pagination:!0,id:"dino-slides",children:null===t||void 0===t?void 0:t.map((function(e){return Object(w.jsx)(W.b,{children:Object(w.jsx)(F,{mode:e},e.type)},e.type)}))})}J.c.use([J.a,J.b]);var z=function(){return Object(w.jsxs)(a.p,{children:[Object(w.jsx)(S,{title:"Dino \ud83e\udd95"}),Object(w.jsxs)(a.d,{children:[Object(w.jsx)(B,{}),Object(w.jsx)("h1",{style:{textAlign:"center"},children:"Mein geiler Dino!"}),Object(w.jsx)(K,{})]})]})},Q=function(){var e=E(g.INTRODUCTION),t=Object(d.a)(e,1)[0],n=Object(o.useState)(),i=Object(d.a)(n,2),c=i[0],r=i[1];return Object(o.useEffect)((function(){var e;(null===t||void 0===t?void 0:t.origin)&&(r("".concat(null!==(e=null===t||void 0===t?void 0:t.args.name)&&void 0!==e?e:"A new device"," connected!")),setTimeout((function(){return r(void 0)}),4e3))}),[t]),Object(w.jsx)(a.u,{isOpen:!!c,color:"success",message:c})},H=(n(93),[{title:"Manage Dinos",url:"/",iosIcon:j.c,mdIcon:j.d},{title:"Settings",url:"/Settings",iosIcon:j.a,mdIcon:j.b}]),Z=function(){var e=Object(u.d)();return Object(w.jsx)(a.l,{contentId:"main",type:"reveal",side:"end",children:Object(w.jsx)(a.d,{children:Object(w.jsxs)(a.j,{id:"menu-list",children:[Object(w.jsx)(a.k,{children:"DinoAPP"}),Object(w.jsx)(a.o,{children:"Control your dinos from everywhere \ud83c\udf89"}),H.map((function(t,n){return Object(w.jsx)(a.n,{autoHide:!1,children:Object(w.jsxs)(a.h,{className:e.pathname===t.url?"selected":"",routerLink:t.url,routerDirection:"none",lines:"none",detail:!1,children:[Object(w.jsx)(a.f,{slot:"start",ios:t.iosIcon,md:t.mdIcon}),Object(w.jsx)(a.i,{children:t.title})]})},n)}))]})})})};n(94),n(95),n(96),n(97),n(98),n(99),n(100),n(101),n(102),n(103),n(104);Object(a.E)({});var $=function(){return Object(w.jsxs)(a.a,{children:[Object(w.jsx)(l.a,{children:Object(w.jsxs)(a.s,{contentId:"main",children:[Object(w.jsx)(Z,{}),Object(w.jsxs)(a.r,{id:"main",children:[Object(w.jsx)(u.a,{path:"/",exact:!0,children:Object(w.jsx)(z,{})}),Object(w.jsx)(u.a,{path:"/Settings",exact:!0,children:Object(w.jsx)(y,{})})]})]})}),Object(w.jsx)(Q,{})]})},q=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function G(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}s.a.render(Object(w.jsx)(c.a.StrictMode,{children:Object(w.jsx)($,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/DinoApp",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/DinoApp","/service-worker.js");q?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var i=n.headers.get("content-type");404===n.status||null!=i&&-1===i.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):G(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):G(t,e)}))}}()},61:function(e,t,n){},62:function(e,t,n){},65:function(e,t,n){},78:function(e,t){function n(e){return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}))}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=78},79:function(e,t){function n(e){return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}))}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=79},80:function(e,t,n){var i={"./ion-icon.entry.js":[109,12]};function o(e){if(!n.o(i,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=i[e],o=t[0];return n.e(t[1]).then((function(){return n(o)}))}o.keys=function(){return Object.keys(i)},o.id=80,e.exports=o},90:function(e,t,n){},93:function(e,t,n){}},[[105,2,3]]]);
//# sourceMappingURL=main.9cdaab64.chunk.js.map