/*! PC_JX - v1.0.0 - 2016-11-25 */
define(function(require,exports,module){!function(a){function b(){}function c(a){g=[a]}function d(a,b,c,d){try{d=a&&a.apply(b.context||b,c)}catch(a){d=!1}return d}function e(a){return/\?/.test(a)?"&":"?"}function f(f){function n(a){W++||(X(),R&&(A[T]={s:[a]}),N&&(a=N.apply(f,[a])),d(K,f,[a,v]),d(M,f,[f,v]))}function E(a){W++||(X(),R&&a!=w&&(A[T]=a),d(L,f,[f,a]),d(M,f,[f,a]))}f=a.extend({},C,f);var F,G,H,I,J,K=f.success,L=f.error,M=f.complete,N=f.dataFilter,O=f.callbackParameter,P=f.callback,Q=f.cache,R=f.pageCache,S=f.charset,T=f.url,U=f.data,V=f.timeout,W=0,X=b;return y&&y(function(a){a.done(K).fail(L),K=a.resolve,L=a.reject}).promise(f),f.abort=function(){!W++&&X()},d(f.beforeSend,f,[f])===!1||W?f:(T=T||j,U=U?"string"==typeof U?U:a.param(U,f.traditional):j,T+=U?e(T)+U:j,O&&(T+=e(T)+encodeURIComponent(O)+"=?"),!Q&&!R&&(T+=e(T)+"_"+(new Date).getTime()+"="),T=T.replace(/=\?(&|$)/,"="+P+"$1"),R&&(F=A[T])?F.s?n(F.s[0]):E(F):(x[P]=c,H=a(u)[0],H.id=m+B++,S&&(H[i]=S),D&&D.version()<11.6?(I=a(u)[0]).text="document.getElementById('"+H.id+"')."+p+"()":H[h]=h,r in H&&(H.htmlFor=H.id,H.event=o),H[q]=H[p]=H[r]=function(a){if(!H[s]||!/i/.test(H[s])){try{H[o]&&H[o]()}catch(a){}a=g,g=0,a?n(a[0]):E(k)}},H.src=T,X=function(a){J&&clearTimeout(J),H[r]=H[q]=H[p]=null,z[t](H),I&&z[t](I)},z[l](H,G=z.firstChild),I&&z[l](I,G),J=V>0&&setTimeout(function(){E(w)},V)),f)}var g,h="async",i="charset",j="",k="error",l="insertBefore",m="_jqjsp",n="on",o=n+"click",p=n+k,q=n+"load",r=n+"readystatechange",s="readyState",t="removeChild",u="<script>",v="success",w="timeout",x=window,y=a.Deferred,z=a("head")[0]||document.documentElement,A={},B=0,C={callback:m,url:location.href},D=x.opera;f.setup=function(b){a.extend(C,b)},a.jsonp=f}(jQuery)});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-25 */