!function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e){"#presentation"!==location.hash&&y||(h.style.display="none",p.style.display="none",window.setTimeout(function(){e.classList.add("button_visible"),e.classList.remove("button_hidden")},2e3))}function a(){"#test1"===location.hash&&y?(h.style.display="block",p.style.display="block",p.style.width="33.3%"):"#test2"===location.hash&&y?(h.style.display="block",p.style.display="block",p.style.width="66.6%"):"#test3"===location.hash&&y?(h.style.display="block",p.style.display="block",p.style.width="100%"):"#test-results"===location.hash&&(h.style.display="none",p.style.display="none")}function r(){"#presentation"===location.hash?yaCounter45804912.reachGoal("2_SCREEN_VISITED"):"#test1"===location.hash?yaCounter45804912.reachGoal("TEST_1_VISITED"):"#test2"===location.hash?yaCounter45804912.reachGoal("TEST_2_VISITED"):"#test3"===location.hash&&yaCounter45804912.reachGoal("TEST_3_VISITED")}function l(){var e=v[Math.floor(Math.random()*(v.length-1))];b=T[e].title,S=T[e].title,E="assets/m"+e+".jpg",w="Я прошел тест Школы перпективных исследований. Мне рекомендован фильм: ",s(document,"vk-share",{url:document.URL,title:w+b,description:S,image:"http://advanced.studies.school/"+E,noparse:!0},{type:"round",text:"Поделиться"}),document.getElementById("results-header").innerHTML=b,document.getElementById("results-img").src=E,document.querySelector("meta[property='og\\:title']").content=w+b,document.querySelector("meta[property='og\\:description']").content=S,document.querySelector("meta[property='og\\:image']").content=E}function c(e){console.log(e);var t=new XMLHttpRequest;t.open("POST","/sendresult"),t.setRequestHeader("Content-Type","application/json"),t.send(JSON.stringify(e))}var s,d=n(1),u=(o(d),n(2)),f=(o(u),n(3)),v=(o(f),[]),h=document.getElementById("progress"),p=document.getElementById("progress__bar"),m=(document.getElementsByClassName("background")[0],document.getElementsByClassName("screen__filter")[0],document.getElementById("start-button")),g=document.getElementById("end-button"),y=!0,w="Я прошел тест Школы перпективных исследований. Мне рекомендован фильм: ",b="",S="",E="",T={1:{title:"Меланхолия, Ларс фон Триер, 2011"},2:{title:"Доктор Стрейнджлав, или Как я перестал бояться и полюбил бомбу, Стэнли Кубрик, 1964"},3:{title:"Экзистенция, Дэвид Кроненберг, 1999"},4:{title:"Опасный метод, Дэвид Кроненберг, 2011"},5:{title:"Викинг, Андрей Кравчук, 2017"},6:{title:"Люмьер и компания, Дэвид Линч и другие, 1995"},7:{title:"Система безопасности, Сидни Люмет, 1964"},8:{title:"Древо жизни, Терренс Малик, 2011"},9:{title:"Туринская лошадь, Бела Тарр и Агнеш Храницки, 2011"},10:{title:"Плутовство, Барри Левинсон, 1997"},11:{title:"Гленгарри Глен Росс (Американцы), Джеймс Фоули, 1992"},12:{title:"Искусственный разум, Стивен Спилберг, 2001"},13:{title:"Тряпичный союз, Михаил Местецкий, 2015"},14:{title:"Агора, Алехандро Аменабар, 2009"},15:{title:"Монти Пайтон и Священный Грааль, Терри Гиллиам, 1975"},16:{title:"Визит инспектора, Эшлин Уолш, 2015"},17:{title:"Агора, Алехандро Аменабар, 2009"},18:{title:"Призрак в доспехах: Невинность, Мамору Осии, 2004"}};window.innerWidth<=1e3&&(y=!1),window.onload=function(){s=function(e,t,n,o){var i=e.createElement("script");i.src="http://vk.com/js/api/share.js?90",i.onload=i.onreadystatechange=function(){this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||this.executed||(this.executed=!0,setTimeout(function(){e.getElementById(t).innerHTML=VK.Share.button(n,o),VK.Share._base_domain="https:"+VK.Share._base_domain},0))},e.documentElement.appendChild(i)},y?(window.setTimeout(function(){document.getElementsByClassName("h1_hello")[0].style.opacity="1",document.getElementsByClassName("arrow-down")[0].style.opacity="1"},1500),initialize("#fullpage",{anchors:["start","presentation","test1","test2","test3"]})):(document.getElementsByClassName("h1_hello")[0].style.opacity="1",document.getElementsByClassName("arrow-down")[0].style.opacity="1"),document.getElementById("hello-arrow-down").addEventListener("click",function(){yaCounter45804912.reachGoal("1_SCREEN_ARROW_CLICKED")})};var m=document.getElementById("start-button");i(m),"onhashchange"in window?window.onhashchange=function(){i(m),a(),r()}:window.onload=function(){i(m),a(),r(),document.getElementsByClassName("h1_hello")[0].style.opacity="1"},m.addEventListener("click",function(){yaCounter45804912.reachGoal("START_PRESSED"),y&&(h.style.display="block",p.style.display="block"),document.getElementById("test1").style.display="flex",document.getElementById("test2").style.display="flex",document.getElementById("test3").style.display="flex",window.location.href="#test1"});for(var L=document.querySelectorAll(".test-screen .list-item"),k=0;k<L.length;k++)L[k].onclick=function(){var e=v.indexOf(parseInt(this.id));-1!==e?(v.splice(e,1),this.classList.toggle("list-item_selected")):3==v.length?alert("Выбери не более 3-х вариантов"):(v.push(parseInt(this.id)),this.classList.toggle("list-item_selected")),v.length>=3?g.classList.remove("button_disabled"):g.classList.add("button_disabled"),console.log(v)};g.addEventListener("click",function(){g.classList.contains("button_disabled")?alert("Выбери не менее 3-х вариантов"):(l(),document.getElementById("test-results").style.display="block",window.location.href="#test-results",document.getElementById("test-results").style.visibility="visible",yaCounter45804912.reachGoal("TEST_FINISHED"),c(v))});var x=document.getElementById("agreement-checkbox"),B=document.getElementById("form-subscribe__submit");x.checked?B.disabled=!1:B.disabled=!0,x.addEventListener("click",function(){x.checked?B.disabled=!1:B.disabled=!0}),B.addEventListener("click",function(){x.checked||alert("Пожалуйста, дайте свое согласие на обработку персональных данных")}),document.getElementById("form-subscribe").onsubmit=function(e){e.preventDefault(),console.log(e);var t=new XMLHttpRequest;t.open("POST","/subscribe"),t.setRequestHeader("Content-Type","application/json"),t.send(JSON.stringify({email:e.target.elements.email.value})),alert("Благодарим за подписку и до встречи на открытых лекциях!")},function(e,t,n){(t[n]=t[n]||[]).push(function(){try{t.yaCounter45804912=new Ya.Metrika({id:45804912,clickmap:!0,trackLinks:!0,accurateTrackBounce:!0,webvisor:!0,trackHash:!0})}catch(e){}});var o=e.getElementsByTagName("script")[0],i=e.createElement("script"),a=function(){o.parentNode.insertBefore(i,o)};i.type="text/javascript",i.async=!0,i.src="https://cdn.jsdelivr.net/npm/yandex-metrica-watch/watch.js","[object Opera]"==t.opera?e.addEventListener("DOMContentLoaded",a,!1):a()}(document,window,"yandex_metrika_callbacks")},function(e,t){},function(e,t){},function(e,t,n){"use strict";function o(e){p($e,tt),Ve(),Xe.css3&&(Xe.css3=Me()),null!==$e?(c($e,{height:"100%",position:"relative"}),m($e,Qe),m(d("html"),nt)):Ye("error","Error! Fullpage.js needs to be initialized with a selector. For example: fullpage('#fullpage');"),P(!0),He(),Ne(),Ae();var t=u(Xe.sectionSelector);for(i=0;i<t.length;++i)m(t[i],rt);var n=u(Xe.slideSelector);for(i=0;i<n.length;++i)m(n[i],vt);Xe.navigation&&W();for(var o=u(lt),i=0;i<o.length;i++){var a=i,r=o[i],l=u(ht,r),f=l.length;if(a||null!==d(ct)||m(r,it),void 0!==Xe.anchors[a]&&(r.setAttribute("data-anchor",Xe.anchors[a]),h(r,it)&&me(Xe.anchors[a],a)),f>0){var v=100*f,g=100/f,y=r.innerHTML,w='<div class="'+mt+'"><div class="'+yt+'">'+y+"</div></div>";r.innerHTML=w,l=u(ht,r),s(d(wt,r),"width",v+"%"),Xe.controlArrows&&f>1&&G(r),Xe.slidesNavigation&&Le(r,f);for(var b=0;b<l.length;b++){s(l[b],"width",g+"%")}var S=d(pt,r);null!==typeof S?m(l[0],it):ze(S)}}e()}function i(){for(var e=u(Tt),t=0;t<e.length;t++)T(e[t],"click onclick touchstart",le);N(Xe.autoScrolling,"internal");var n=d(ct),o=d(pt,n),i=f(d(ct));if(o&&(0!==i||0===i&&0!==f(o))&&ze(o),Xe.navigation){s(Ke,"margin-top","-"+Ke.offsetHeight/2+"px");m(d("a",u("li",Ke)[f(d(ct))]),it)}K();var a=window.location.hash.replace("#","").split("/"),r=a[0];if(r.length){var l=d('[data-anchor="'+r+'"]');if(!Xe.animateAnchor&&l.length){if(Xe.autoScrolling)De(l.offsetTop);else{De(0),Ie(r);var c=ie(l.offsetTop);L(c.element,c.options,0)}me(r,null),E(Xe.afterLoad)&&Xe.afterLoad.call(l,r,f(l)+1),p(n,it),m(l,it)}}Ie(),Re(document,re,"DOMContentLoaded","DOMContentLoaded","DOMContentLoaded")}function a(e,t){"object"!==(void 0===t?"undefined":Je(t))&&(t={});for(var n in t)e.hasOwnProperty(n)&&(e[n]=t[n]);return e}function r(e){return document.getElementById(e)}function l(e){return document.getElementsByTagName(e)[0]}function c(e,t){var n;for(n in t)t.hasOwnProperty(n)&&null!==n&&(e.style[n]=t[n]);return e}function s(e,t,n){e.style[t]=n}function d(e,t){return t=t||document,t.querySelector(e)}function u(e,t){return t=t||document,t.querySelectorAll(e)}function f(e){for(var t=0;e=e.previousSibling;)3==e.nodeType&&/^\s*$/.test(e.data)||t++;return t}function v(e,t){return void 0!==t?e.style.display=t?"block":"none":"block"==e.style.display?e.style.display="none":e.style.display="block",e}function h(e,t){return!!e.className.match(new RegExp("(\\s|^)"+t+"(\\s|$)"))}function p(e,t){if(e&&h(e,t)){var n=new RegExp("(\\s|^)"+t+"(\\s|$)");e.className=e.className.replace(n,"")}}function m(e,t){e&&!h(e,t)&&(e.className+=" "+t)}function g(e,t){return e&&(t(e)?e:g(e.parentNode,t))}function y(){return"innerWidth"in window?window.innerWidth:document.documentElement.offsetWidth}function w(){return"innerHeight"in window?window.innerHeight:document.documentElement.offsetHeight}function b(e){if(null===e||"object"!==(void 0===e?"undefined":Je(e)))return e;var t=e.constructor();for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}function S(e){e.preventDefault?e.preventDefault():e.returnValue=!1}function E(e){var t={};return e&&"[object Function]"===t.toString.call(e)}function T(e,t,n){for(var o=t.split(" "),i=0,a=o.length;i<a;i++)document.addEventListener?e.addEventListener(o[i],n,!1):e.attachEvent(o[i],n,!1)}function L(e,t,n,o){var i=C(e),a=t-i,r=0;Fe=!0;!function l(){if(Fe){var c=t;r+=20,c=Math.easeInOutCubic(r,i,a,n),_(e,c),r<n?setTimeout(l,20):void 0!==o&&o()}else r<n&&o()}()}function k(){var e=document.documentElement;return(window.pageYOffset||e.scrollTop)-(e.clientTop||0)}function x(e,t){for(var n=[];e;e=e.nextSibling)1==e.nodeType&&e!=t&&n.push(e);return n}function B(e){return x(e.parentNode.firstChild,e)}function I(e){for(var t=e.nextSibling;t&&1!=t.nodeType;)t=t.nextSibling;return t}function M(e){for(var t=e.previousSibling;t&&1!=t.nodeType;)t=t.previousSibling;return t}function C(e){return e.self!=window&&h(e,mt)?e.scrollLeft:!Xe.autoScrolling||Xe.scrollBar?k():e.offsetTop}function _(e,t){!Xe.autoScrolling||Xe.scrollBar||e.self!=window&&h(e,mt)?e.self!=window&&h(e,mt)?e.scrollLeft=t:e.scrollTo(0,t):e.style.top=t+"px"}function N(e,t){qe("autoScrolling",e,t);var n=d(ct);if(Xe.autoScrolling&&!Xe.scrollBar)c(document.body,{overflow:"hidden",height:"100%"}),c(l("html"),{overflow:"hidden",height:"100%"}),A(Xe.recordHistory,"internal"),c($e,{"-ms-touch-action":"none","touch-action":"none"}),n&&De(n.offsetTop);else{c(document.body,{overflow:"visible",height:"100%"}),c(l("html"),{overflow:"visible",height:"100%"}),A(!1,"internal"),c($e,{"-ms-touch-action":"","touch-action":""}),De(0);var o=ie(n.offsetTop);o.element.scrollTo(0,o.options)}}function A(e,t){qe("recordHistory",e,t)}function R(e,t){qe("scrollingSpeed",e,t)}function H(e,t){qe("fitToSection",e,t)}function P(e){e?_e():Ce()}function O(e){Xe.keyboardScrolling=e}function z(){var e=M(d(ct));e&&ne(e,null,!0)}function D(){var e=I(d(ct));e&&ne(e,null,!1)}function j(e,t){R(0,"internal"),q(e,t),R(Ue.scrollingSpeed,"internal")}function q(e,t){var n=be(e);void 0!==t?Ee(e,t):n&&ne(n)}function V(){te("next")}function Y(){te("prev")}function X(e){if(!h($e,tt)){Rt=!0,At=w();for(var t=u(lt),n=0;n<t.length;++n){var o=t[n],i=d(gt,o),a=u(ht,o);i&&a.length>1&&de(i,d(pt,i))}var r=d(ct);f(r)&&De(r.offsetTop),Rt=!1,E(Xe.afterResize)&&e&&Xe.afterResize.call($e),E(Xe.afterReBuild)&&!e&&Xe.afterReBuild.call($e)}}function G(e){var t=document.createElement("div");t.className=xt;var n=document.createElement("div");n.className=It;var o=d(gt,e);Xe.controlArrowColor,o.parentNode.appendChild(t),o.parentNode.appendChild(n),Xe.loopHorizontal||(d(Bt,e).style.display="none")}function W(){var e=document.createElement("div");e.setAttribute("id",st);var t=document.createElement("ul");e.appendChild(t),document.body.appendChild(e),Ke=d(dt),s(Ke,"color",Xe.navigationColor),m(Ke,Xe.navigationPosition),Xe.showActiveTooltip&&m(Ke,ft);for(var n="",o=0;o<u(lt).length;o++){var i="";Xe.anchors.length&&(i=Xe.anchors[o]),n=n+'<li><a href="#'+i+'"><span></span></a>';var a=Xe.navigationTooltips[o];void 0!==(void 0===a?"undefined":Je(a))&&""!==a&&(n+='<div class="'+ut+" "+Xe.navigationPosition+'">'+a+"</div>"),n+="</li>"}var r=d("ul",Ke);r.innerHTML=r.innerHTML+n;for(var l=u(Et),c=0;c<l.length;c++)T(l[c],"click onclick touchstart",function(e){e=window.event||e||e.originalEvent,S(e);var t=f(this.parentNode);ne(u(lt)[t],null,!1)})}function K(){var e=d(ct);E(Xe.afterLoad)&&Xe.afterLoad.call(e,e.getAttribute("data-anchor"),f(e)+1),E(Xe.afterRender)&&Xe.afterRender.call($e)}function F(){var e;if(!Xe.autoScrolling||Xe.scrollBar){for(var t=k(),n=0,o=Math.abs(t-u(lt)[0].offsetTop),i=u(lt),a=0;a<i.length;++a){var r=i[a],l=Math.abs(t-r.offsetTop);l<o&&(n=a,o=l)}e=u(lt)[n]}if(!Xe.autoScrolling||Xe.scrollBar){if(!h(e,it)){Dt=!0;var c=d(ct),s=f(c)+1,v=ge(e),g=e.getAttribute("data-anchor"),y=f(e)+1,w=d(pt,e);if(w)var b=w.getAttribute("data-anchor"),S=f(w);Ht&&(p(c,it),m(e,it),E(Xe.onLeave)&&Xe.onLeave.call(c,s,y,v),E(Xe.afterLoad)&&Xe.afterLoad.call(e,g,y),me(g,0),Xe.anchors.length&&(Ge=g,ke(S,b,g,y))),clearTimeout(Ot),Ot=setTimeout(function(){Dt=!1},100)}Xe.fitToSection&&(clearTimeout(zt),zt=setTimeout(function(){(Ht&&!Xe.autoScrolling||Xe.scrollBar)&&(f(d(ct))==f(e)&&(Rt=!0),ne(e),Rt=!1)},Xe.fitToSectionDelay))}}function U(e){"down"==e?D():z()}function $(e){var t=window.event||e||e.originalEvent;if(J(t)){Xe.autoScrolling&&S(e);var n=d(ct),o=u(gt,n);if(Ht&&!Ct){var i=Oe(t);Vt=i.y,Yt=i.x,o&&Math.abs(qt-Yt)>Math.abs(jt-Vt)?Math.abs(qt-Yt)>y()/100*Xe.touchSensitivity&&(qt>Yt?V():Y()):Xe.autoScrolling&&Math.abs(jt-Vt)>w()/100*Xe.touchSensitivity&&(jt>Vt?U("down"):Vt>jt&&U("up"))}}}function J(e){return void 0===e.pointerType||"mouse"!=e.pointerType}function Q(e){var t=window.event||e||e.originalEvent;if(Xe.fitToSection&&(Fe=!1),J(t)){var n=Oe(t);jt=n.y,qt=n.x}}function Z(e,t){for(var n=0,o=e.slice(Math.max(e.length-t,1)),i=0;i<o.length;i++)n+=o[i];return Math.ceil(n/t)}function ee(e){var t=(new Date).getTime();if(Xe.autoScrolling){e=window.event||e||e.originalEvent;var n=e.wheelDelta||-e.deltaY||-e.detail,o=Math.max(-1,Math.min(1,n));Pt.length>149&&Pt.shift(),Pt.push(Math.abs(n)),Xe.scrollBar&&S(e);var i=t-Xt;if(Xt=t,i>200&&(Pt=[]),Ht){Z(Pt,10)>=Z(Pt,70)&&U(o<0?"down":"up")}return!1}Xe.fitToSection&&(Fe=!1)}function te(e){var t=d(ct),n=d(gt,t);if(n&&!Ct){var o=d(pt,n),i=null;if(!(i="prev"===e?M(o):I(o))){if(!Xe.loopHorizontal)return;var a=B(o);i="prev"===e?a[a.length-1]:a[0]}Ct=!0,de(n,i)}}function ne(e,t,n){if(null!==e){var o={element:e,callback:t,isMovementUp:n,dtop:e.offsetTop,yMovement:ge(e),anchorLink:e.getAttribute("data-anchor"),sectionIndex:f(e),activeSlide:d(pt,e),activeSection:d(ct),leavingSection:f(d(ct))+1,localIsResizing:Rt};if(!(f(o.activeSection)==o.sectionIndex&&!Rt||Xe.scrollBar&&k()===o.dtop)){if(o.activeSlide)var i=o.activeSlide.getAttribute("data-anchor"),a=f(o.activeSlide);for(var r=u(lt),l=0;l<r.length;l++)p(r[l],it);m(e,it),Ht=!1,ke(a,i,o.anchorLink,o.sectionIndex),E(Xe.onLeave)&&!o.localIsResizing&&Xe.onLeave.call(o.activeSection,o.leavingSection,o.sectionIndex+1,o.yMovement),oe(o),Ge=o.anchorLink,me(o.anchorLink,o.sectionIndex)}}}function oe(e){if(Xe.css3&&Xe.autoScrolling&&!Xe.scrollBar){we("translate3d(0px, -"+e.dtop+"px, 0px)",!0),Xe.scrollingSpeed?setTimeout(function(){ae(e)},Xe.scrollingSpeed):ae(e)}else{var t=ie(e.dtop);L(t.element,t.options,Xe.scrollingSpeed,function(){ae(e)})}}function ie(e){var t={};return Xe.autoScrolling&&!Xe.scrollBar?(t.options=-e,t.element=d("."+Qe)):(t.options=e,t.element=window),t}function ae(e){E(Xe.afterLoad)&&!e.localIsResizing&&Xe.afterLoad.call(e.element,e.anchorLink,e.sectionIndex+1),Ht=!0,E(e.callback)&&e.callback.call(this)}function re(){var e=window.location.hash.replace("#","").split("/"),t=e[0],n=e[1];t&&Ee(t,n)}function le(e){var t=this;t.self==window&&(t=e.target||e.srcElement),h(t,Lt)?Y():V()}function ce(){if(!Dt){var e=window.location.hash.replace("#","").split("/"),t=e[0],n=e[1];if(t.length){var o=void 0===Ge,i=void 0===Ge&&void 0===n&&!Ct;(t&&t!==Ge&&!o||i||!Ct&&We!=n)&&Ee(t,n)}}}function se(e,t){switch(t){case 38:case 33:z();break;case 32:if(e){z();break}case 40:case 34:D();break;case 36:q(1);break;case 35:q(u(lt).length);break;case 37:Y();break;case 39:V();break;default:return}}function de(e,t){var n=f(t),o=g(e,function(e){return h(e,rt)}),i=f(o),a=o.getAttribute("data-anchor"),r=d(St,o),l=Be(t),c=Rt;if(Xe.onSlideLeave){var s=d(pt,o),y=f(s),w=ye(y,n);c||"none"===w||E(Xe.onSlideLeave)&&Xe.onSlideLeave.call(s,a,i+1,y,w,n)}for(var b=u(ht,o),S=0;S<b.length;S++)p(b[S],it);m(t,it),!Xe.loopHorizontal&&Xe.controlArrows&&(v(d(Bt,o),0!==n),v(d(Mt,o),!t.is(":last-child"))),h(o,it)&&ke(n,l,a,i);var T=function(){c||E(Xe.afterSlideLoad)&&Xe.afterSlideLoad.call(t,a,i+1,l,n),Ct=!1};if(Xe.css3){var k="translate3d(-"+Math.round(t.offsetLeft)+"px, 0px, 0px)",x=d(wt,e);fe(x,Xe.scrollingSpeed>0),je(x,k),setTimeout(function(){T()},Xe.scrollingSpeed,Xe.easing)}else L(e,Math.round(t.offsetLeft),Xe.scrollingSpeed,function(){T()});if(Xe.slidesNavigation){p(d(at,r),it);m(d("a",u("li",r)[n]),it)}}function ue(){if(_t){if("text"!==document.activeElement.getAttribute("type")){var e=w();Math.abs(e-Kt)>20*Math.max(Kt,e)/100&&(X(!0),Kt=e)}}else clearTimeout(Wt),Wt=setTimeout(function(){X(!0)},350)}function fe(e){var t="all "+Xe.scrollingSpeed+"ms "+Xe.easingcss3;return p(e,et),c(e,{"-webkit-transition":t,transition:t}),e}function ve(e){return m(e,et)}function he(e,t){if(Xe.navigation)if(p(d(at,Ke),it),e)m(d('a[href="#'+e+'"]',Ke),it);else{var n=u("li",Ke)[t];m(d("a",n),it)}}function pe(e){if(Xe.menu){var t=d(Xe.menu);t&&(p(d(at,t),it),m(d('[data-menuanchor="'+e+'"]',t),it))}}function me(e,t){pe(e),he(e,t)}function ge(e){var t=f(d(ct)),n=f(e);return t==n?"none":t>n?"up":"down"}function ye(e,t){return e==t?"none":e>t?"left":"right"}function we(e,t){t?fe($e):ve($e),je($e,e),setTimeout(function(){p($e,et)},10)}function be(e){var t=d(lt+'[data-anchor="'+e+'"]');return t||(t=u(lt)[e-1]),t}function Se(e,t){var n=d(gt,t),o=d(ht+'[data-anchor="'+e+'"]',n);return n&&!o&&(o=u(ht,n)[e]),o}function Ee(e,t){var n=be(decodeURI(e));void 0===t&&(t=0),e===Ge||h(n,it)?Te(n,t):ne(n,function(){Te(n,t)})}function Te(e,t){if(void 0!==t){var n=d(gt,e),o=Se(t,e);o&&de(n,o)}}function Le(e,t){var n=document.createElement("div");n.className=bt;var o=document.createElement("ul");n.appendChild(o),e.appendChild(n);var i=d(St,e),a=d("ul",i);m(i,Xe.slidesNavPosition);for(var r="",l=0;l<t;l++)r+='<li><a href="#"><span></span></a></li>';a.innerHTML=a.innerHTML+r,s(i,"margin-left","-"+i.offsetWidth/2+"px"),m(d("a",u("li",i)[0]),it)}function ke(e,t,n,o){var i="";Xe.anchors.length&&(e?(void 0!==n&&(i=n),void 0===t&&(t=e),We=t,xe(i+"/"+t)):void 0!==e?(We=t,xe(n)):xe(n)),Ie()}function xe(e){if(Xe.recordHistory)location.hash=e;else if(_t||Nt)history.replaceState(void 0,void 0,"#"+e);else{var t=window.location.href.split("#")[0];window.location.replace(t+"#"+e)}}function Be(e){var t=e.getAttribute("data-anchor"),n=f(e);return t||(t=n),t}function Ie(e){var t=d(ct),n=d(pt,t),o=t.getAttribute("data-anchor"),i=f(t),e=String(i);if(Xe.anchors.length&&(e=o),n){e=e+"-"+Be(n)}e=e.replace("/","-").replace("#","");var a=new RegExp("\\b\\s?"+ot+"-[^\\s]+\\b","g");document.body.className=document.body.className.replace(a,""),m(document.body,ot+"-"+e)}function Me(){var e,t=document.createElement("p"),n={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.insertBefore(t,null);for(var o in n)void 0!==t.style[o]&&(t.style[o]="translate3d(1px,1px,1px)",e=window.getComputedStyle(t).getPropertyValue(n[o]));return document.body.removeChild(t),void 0!==e&&e.length>0&&"none"!==e}function Ce(){var e=d(Ze);document.addEventListener?(e.removeEventListener("mousewheel",ee,!1),e.removeEventListener("wheel",ee,!1)):e.detachEvent("onmousewheel",ee)}function _e(){Re(d(Ze),ee,"mousewheel","onmousewheel","wheel")}function Ne(){Re(window,ue,"resize","onresize")}function Ae(){Re(window,F,"scroll","onscroll","onscroll")}function Re(e,t,n,o,i){e.addEventListener?(e.addEventListener(n,t,!1),void 0!==i&&e.addEventListener(i,t,!1)):e.attachEvent(o,t)}function He(){if(_t||Nt){var e=d(Ze);if(document.addEventListener){var t=Pe();e.removeEventListener("touchstart",Q),e.removeEventListener(t.down,Q),e.removeEventListener("touchmove",$),e.removeEventListener(t.move,$),T(e,"touchstart "+t.down,Q),T(e,"touchmove "+t.move,$)}}}function Pe(){return window.PointerEvent?{down:"pointerdown",move:"pointermove"}:{down:"MSPointerDown",move:"MSPointerMove"}}function Oe(e){var t=[];return t.y=void 0!==e.pageY&&(e.pageY||e.pageX)?e.pageY:e.touches[0].pageY,t.x=void 0!==e.pageX&&(e.pageY||e.pageX)?e.pageX:e.touches[0].pageX,Nt&&J(e)&&(t.y=e.touches[0].pageY,t.x=e.touches[0].pageX),t}function ze(e,t){R(0,"internal"),void 0!==t&&(Rt=!0),de(g(e,function(e){return h(e,mt)}),e),void 0!==t&&(Rt=!1),R(Ue.scrollingSpeed,"internal")}function De(e){if(Xe.scrollBar){var t=ie(e);_(t.element,t.options,0)}else if(Xe.css3){var n="translate3d(0px, -"+e+"px, 0px)";we(n,!1)}else s($e,"top",-e+"px")}function je(e,t){c(e,{"-webkit-transform":t,"-moz-transform":t,"-ms-transform":t,transform:t})}function qe(e,t,n){Xe[e]=t,"internal"!==n&&(Ue[e]=t)}function Ve(){for(var e=0;e<Xe.anchors.length;e++){var t=Xe.anchors[e];(r("#"+t)||u('[name="'+t+'"]').length)&&Ye("error","data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).")}}function Ye(e,t){console&&console[e]&&console[e]("fullPage: "+t)}var Xe,Ge,We,Ke,Fe,Ue,$e,Je="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Qe="fullpage-wrapper",Ze="."+Qe,et="fp-notransition",tt="fp-destroyed",nt="fp-enabled",ot="fp-viewing",it="activeSection",at="."+it,rt="fp-section",lt="."+rt,ct=lt+at,st="fp-nav",dt="#"+st,ut="fp-tooltip",ft="fp-show-active",vt="fp-slide",ht="."+vt,pt=ht+at,mt="fp-slides",gt="."+mt,yt="fp-slidesContainer",wt="."+yt,bt="fp-slidesNav",St="."+bt,Et=St+" a",Tt=".fp-controlArrow",Lt="fp-prev",kt="."+Lt,xt="fp-controlArrow "+Lt,Bt=Tt+kt,It="fp-controlArrow fp-next",Mt=Tt+".fp-next",Ct=!1,_t=navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),Nt="ontouchstart"in window||navigator.msMaxTouchPoints>0||navigator.maxTouchPoints,At=w(),Rt=!1,Ht=!0,Pt=[];Math.easeInOutCubic=function(e,t,n,o){return(e/=o/2)<1?n/2*e*e*e+t:n/2*((e-=2)*e*e+2)+t},window.initialize=function(e,t){Xe=a({menu:!1,anchors:[],navigation:!1,navigationPosition:"right",navigationColor:"#000",navigationTooltips:[],showActiveTooltip:!1,slidesNavigation:!1,slidesNavPosition:"bottom",scrollBar:!1,css3:!0,scrollingSpeed:700,autoScrolling:!0,fitToSection:!0,fitToSectionDelay:1e3,easingcss3:"ease",loopHorizontal:!0,touchSensitivity:5,keyboardScrolling:!0,recordHistory:!0,controlArrows:!0,sectionSelector:".section",slideSelector:".slide",afterLoad:null,onLeave:null,afterRender:null,afterResize:null,afterReBuild:null,afterSlideLoad:null,onSlideLeave:null},t),Ue=b(Xe),$e=d(e),o(i)};var Ot,zt,Dt=!1,jt=0,qt=0,Vt=0,Yt=0,Xt=(new Date).getTime();document.addEventListener?window.addEventListener("hashchange",ce,!1):window.attachEvent("onhashchange",ce);var Gt;document.onkeydown=function(e){clearTimeout(Gt);var t=document.activeElement,n=t.tagName;if("SELECT"!==n&&"INPUT"!==n&&Xe.keyboardScrolling&&Xe.autoScrolling){e=window.event||e||e.originalEvent;for(var o=e.charCode||e.keyCode,i=[40,38,32,33,34],a=0;a<i.length;a++)i[a]==o&&S(e);var r=e.shiftKey;Gt=setTimeout(function(){se(r,o)},150)}},null!==d(Et)&&T(d(Et),"click onclick touchstart",function(e){S(e);var t=g(this,function(e){return h(e1,rt)}),n=d(gt,t),o=g(this,function(e){return"li"===e.tagName}),i=f(o);de(n,u(ht,n)[i])});var Wt,Kt=At;initialize}]);