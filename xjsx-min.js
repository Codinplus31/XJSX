!function(e,o){var t={_observer:e.MutationObserver&&function(){var o,t,n,r,s=this,a=new e.MutationObserver((function(e){for("complete"===document.readyState&&(a.disconnect(),s.XJSXLastProcessCallback()),t&&(r=t)||(r=document.body)&&(t=r)||(r=document.head||document.documentElement);r.lastChild;)r=r.lastChild;if(!o||o!==r){o=r;for(var i=0;i<e.length;i++)for(var c=e[i],d=0;d<c.addedNodes.length;d++)!(n=c.addedNodes[d]).parentNode||n.fromXJSXCore||n.parentNode.removed||n.parentNode.disabled||n.parentNode.fromXJSXCore&&(n.fromXJSXCore=!0)||s.stage(n)}}));a.observe(document,{childList:!0,subtree:!0}),addEventListener("load",(function(){!s.resolved&&(a.disconnect(),s.XJSXLastProcessCallback()),removeEventListener("load",arguments.callee)}))}||function(){var e=this.document;addEventListener("load",(function(){t.XJSXCompiler(e),removeEventListener("load",arguments.callee)}))},effect:{},createEffect:function(e,o){"function"==typeof o&&(t.effect[e]=o)},events:{},addEventListener:function(o,n){t.events[o]&&n(t.events[o]),e.addEventListener(o,n)},dispatchEvent:function(o,n){var r=t.events[o];!r&&(t.events[o]=r=document.createEvent("CustomEvent")),r.initCustomEvent(o,!1,!1,n),e.dispatchEvent(r)},dispatcher:function(e,o){!t.dispatcher_init&&(t.dispatcher_init=document.createEvent("Event")),t.dispatcher_init.initEvent(o),e.dispatchEvent(t.dispatcher_init)},loop:function(e,o,t,n){var r,s={};"number"!=typeof t&&Number(t),r=t<50||!t?requestAnimationFrame:setTimeout;var a=0;return s.nm=function(i){n.isVisible&&a<e&&(0===a||!0!==i?(o(a),a++,s.nm(!0)):r(s.nm,t))},s.arr=function(i){n.isVisible&&a<e.length&&(0===a||!0!==i?(o(e[a],a),a++,s.arr(!0)):r(s.arr,t))},s.obj=function(){var s,i=function(e){var o=[];for(var t in e)o.push(t);return o}(e),c=function(d){n.isVisible()&&a<i.length&&(s=i[a],0===a||!0!==d?(o(e[s],s),a++,c(!0)):r(c,t))};c()},s},stage:function(e){var o=this.getOnboardProcess();e instanceof Comment&&this._XJSXSyntax(e.data)&&!this.XJSXProcessor(e,o)||o&&o.nodes.append(e)},_XJSXSyntax:function(e){return 0===e.search(/^\?[^\?][^]+\?$/)},isKeyWord:function(e){return"string"==typeof e&&0===e.search(/^[a-z0-9]+([^]+[a-z0-9])?$/)},parseKeyWord:function(e){for(e=e.trim();"?"===e[0];)e=e.substring(1);for(;"?"===e[e.length-1];)e=e.substring(0,e.length-1);for(var o=0,t="",n=e.length;":"!==e[o]&&n>o;)t+=e[o],o+=1;if(e=e.substring(o,n),t=t.trim(),this.isKeyWord(t))return":"===e[0]&&(e=e.substring(1)),[t,e]},parseParameter:function(e,o){return 2>(e=e.split(";")).length&&e.push([])||(e[e.length-1]=e[e.length-1].split(",")),{arguments:e.pop(),parameter:o&&o("["+e+"]")||e}},_parseParameterCB:function(e){},_parseParameter:function(e,o){for(var t=_parseParameterCB(),n=null,r=0;r<e.length;r++){var s=e[r];n&&n(s),n=t[s]}},domParser:function(){var e=t.domParser_node;return(e=e&&e.cloneNode(!0)||document.createElement("span")).innerHTML=arguments[0],e},mode:["embedded","defined"],createModule:function(e){if(!(e instanceof Array&&1>e.length)&&this.isKeyWord(e[0].keyword)&&!this.modules[e[0].keyword]&&!this.signedKeywords[e[0].keyword]){this.modules[e[0].keyword]={operations:e,keywords:{},name:e[0].keyword};for(var o=1;o<e.length;o++)this.modules[e[0].keyword].keywords[e[o].keyword]=o,this.signedKeywords[e[o].keyword]=e[0].keyword,!this.isKeyWord(e[o].keyword)&&delete this.modules[e[0].keyword],this.modules[e[o].keyword]}},_eval:function(e){return function(){var o=e(arguments[0],arguments[1]);return e=o[1],0===arguments.length&&t._eval(e)||1===arguments.length&&"string"==typeof arguments[0]&&o[0]}},modules:{},moduleType:[12,11,13],customTemplates:{},signedKeywords:{},moduleLength:0,hasOnboardProcess:function(){return this.onboardProcesses.length>0},getOnboardProcess:function(){return this.onboardProcesses[this.onboardProcesses.length-1]||null},terminateCurrentProcess:function(){var e=this.onboardProcesses[this.onboardProcesses.length-1];e&&(e.isterminated=!0,this.onboardProcesses.pop())},onboardProcesses:[],getPNextNode:function(e){return e&&(e.nextSibling||e.parentNode&&this.getPNextNode(e.parentNode))},getNextNode:function(e){return e&&(e.firstChild||e.nextSibling||e.parentNode&&this.getPNextNode(e.parentNode))},createElement:function(e,o){return"string"==typeof e&&(e=document.createElement(e))||(o=e,(e=document.createTextNode("")).process={},e.process.nodes=this.XJSXNodeList(e),e._remove=e.remove,e.remove=function(){e.process.nodes.remove(),e._remove()}),e.fromXJSXCore=o,e},execCallback:function(e,o,t){if(!e.isDeadProcess||"onprogress"===o){!o&&(o="callback");var n=e.callback[o];if("function"==typeof n){e={__proto__:e};var r=this.CALLBACK_PROTOTYPE(e,"onend"===o?"callback":o,t);r.__callback__=n,r.__callback__(e.params[1],"callback"===o&&e.micro_callback&&e.micro_callback(e.micro_parameter,r)),e.closed=!0}}},CALLBACK_PROTOTYPE:function(e,o,t){e.module.operations[0].type;var n=this,r={parentParams:e.parentParams,isVisible:e.nodes.isVisible,eval:function(){return 0===arguments.length&&e.eval()||arguments[1]&&!e.eval(arguments[0],arguments[1])||e.eval(arguments[0])},forEach:function(t){e.closed||"function"==typeof t&&"callback"===o&&e.nodes.forEach((function(o){t(n.XJSXElement(o,e))}))},global:e.global};return"onprogress"===o&&(r.appendTo=function(e){e.appendChild(t.cloneNode(!0))},r.disable=function(){!e.closed&&(t.remove(),t.disabled=!0)},r.delete=function(){!e.closed&&(t.remove(),t.removed=!0)})||"onload"===o&&(r.killProcess=function(){e.__proto__.isDeadProcess=!0})||"callback"===o&&(r.appendAllTo=function(o,t){t&&!e.nodes.forEach((function(e){o.appendChild(e.cloneNode(!0))}))||e.nodes.forEach((function(e){o.appendChild(e)}))||e.nodes.flush()},r.remove=e.remove,r.removeAllNode=e.nodes.remove,r._removeAllNode=function(o){e.nodes.forEach((function(e){e.remove(),"function"==typeof o&&o(e)})),e.nodes.flush()},r.flush=function(){e.nodes.flush()},r.addChild=function(o,t){var n=e;if(!t)for(;n.parentProcess;)n=n.parentProcess;if(n=n.nodes,o instanceof NodeList)for(var r=n.me();o.length;)o[0].fromXJSXCore=!0,n.push(o[0]),r.parentNode&&r.parentNode.insertBefore(o[0],r);else{if(o instanceof DocumentFragment)for(var s=0;s<o.childNodes.length;s++)o.childNodes[s].fromXJSXCore=!0,n.push(o.childNodes[s]);else o instanceof Node?n.push(o):n.push(o=document.createTextNode(o));n=n.me(),o.fromXJSXCore=!0,n.parentNode&&n.parentNode.insertBefore(o,n)}},r.putChild=function(o,t){var n=e;if(!t)for(;n.parentProcess;)n=n.parentProcess;if((n=n.nodes).remove(),n.flush(),o instanceof NodeList)for(var r=n.me();o.length;)o[0].fromXJSXCore=!0,n.push(o[0]),r.parentNode&&r.parentNode.insertBefore(o[0],r);else{if(o instanceof DocumentFragment)for(var s=0;s<o.childNodes.length;s++)o.childNodes[s].fromXJSXCore=!0,n.push(o.childNodes[s]);else o instanceof Node?n.push(o):n.push(o=document.createTextNode(o));n=n.me(),o.fromXJSXCore=!0,n.parentNode&&n.parentNode.insertBefore(o,n)}},r.terminate=function(){!e.closed&&e.isterminated||(n.onboardProcesses.pop(),e.__proto__.isterminated=!0)})&&e.micro_callback&&(r.x_addChild=function(o){for(var t=e;t.parentProcess;)t=t.parentProcess;var n=(t=t.nodes).cut();if(!(o instanceof NodeList)){if(o instanceof DocumentFragment)for(var r=0;r<o.childNodes.length;r++)o.childNodes[r].fromXJSXCore=!0,t.push(o.childNodes[r]);else o instanceof Node?t.push(o):t.push(o=document.createTextNode(o));return t=t.me(),o.fromXJSXCore=!0,t.parentNode&&t.parentNode.insertBefore(o,t),n}for(var s=t.me();o.length;)o[0].fromXJSXCore=!0,t.push(o[0]),s.parentNode&&s.parentNode.insertBefore(o[0],s)}),r},XJSXElement:function(e,o){return{appendTo:function(o,t){t?o.appendChild(e.cloneNode(!0)):o.appendChild(e)},remove:function(){o.closed||e.remove()},getAllTextContent:function(){var o=e.textContent;return e.process&&e.process.nodes.forEach((function(e){o+=e.textContent})),o}}},XJSXTokenError:function(e){return e.node.remove(),"Unexpected token '"+e.params[0]+"'.\n"+(e.nextInLineProcess>=1&&"( "+e.currentProcess.parentParams.join(":")+" )..."||"")+"( "+e.currentProcess.params.join(":")+" )...( "+e.params.join(":")+" ) ... "},XJSXNodeList:function(e){var o,t,n=e.process,r=[],s=this,a=function(e){if(e instanceof Array)e.forEach(a);else if(e instanceof NodeList)for(var o=e.length,n=0;n<o;n++)o!==e.length&&(n=0,o=e.length),t(e[n]);else t(e),e.process&&e.process.nodes.forEach&&e.process.nodes.forEach(a)},i={isVisible:function(){return s.document.contains&&s.document.contains(e.parentElement||e)},me:function(){return e},flush:function(e){r=[]},cut:function(){var e=r;return r=[],function(){for(var o=0;o<e.length;o++){var t=e[o];if(t instanceof Array){for(var n=0;n<t.length;n++)t[n].remove();return}if(t instanceof NodeList){for(;t.length>0;)t[t.length-1].remove();return}t.remove()}e=[]}},push:function(e){r.push(e)},append:function(e){o&&o.contains&&o.contains(e)||(o=e,!n._isDeadProcess&&s.execCallback(n,"onprogress",e),e.removed||i.removed&&!e.remove()||r.push(e))},forEach:function(e){if(t=e,!n.closed&&"function"==typeof t)for(var o=0;o<r.length;o++)a(r[o])},remove:function(){if(!n.closed){n.removed=i.removed=!0;for(var e=0;e<r.length;e++){var o=r[e];if(o instanceof Array){for(var t=0;t<o.length;t++)o[t].remove();return}if(o instanceof NodeList){for(;o.length>0;)o[o.length-1].remove();return}o.remove()}r=[]}},pop:function(){r.pop()}};return i},XJSXMethodKeyword:function(e,o){var t=e.process.nodes;return{eval:o,remove:e.remove,isVisible:t.isVisible,putChild:function(o){if(t.remove(),o instanceof NodeList)for(;o.length;)o[0].fromXJSXCore=!0,t.push(o[0]),e.parentNode&&e.parentNode.insertBefore(o[0],e);else{if(o instanceof DocumentFragment)for(var n=0;n<o.childNodes.length;n++)o.childNodes[n].fromXJSXCore=!0,t.push(o.childNodes[n]);else o instanceof Node?t.push(o):t.push(o=document.createTextNode(o));!o.fromXJSXCore&&(o.fromXJSXCore=!0),e.parentNode&&e.parentNode.insertBefore(o,e)}}}},XJSXLastProcessCallback:function(){this.resolved=!0,this.onboardProcesses.length&&this.modules.end.operations[0].callback(void 0,this.onboardProcesses[this.onboardProcesses.length-1],this),this.timeStamp},XJSXProcessor:function(e,o){var t;if(t=this.parseKeyWord(e.data)){var n,r,s,a;if(o&&o.module.keywords[t[0]]&&!(a=!1)||(a=this.modules[t[0]]),a&&(n=!(15===(r=a.operations[0].type)||10===r)),10===r){if(e.remove(),!o||o._isDeadProcess||"function"!==o.type)return;return o.micro_parameter=t[1],void(o.micro_callback=a.operations[0].callback)}!n&&o&&(o.isDeadProcess=o._isDeadProcess);var i=(o?!o.isDeadProcess&&1:1)||0;if(!1===a){if(!i)return void o.nodes.append(e);var c,d;if(s=!0,a=o.module,r=o.type,o.name===a.name&&!(c=0)||(c=a.keywords[o.name]),d=a.keywords[t[0]],12===r&&c>d||13===r&&c+1!==d)return;if(this.execCallback(o),o.isterminated)return void this.terminateCurrentProcess();this.terminateCurrentProcess()}if(i){var l=this.createElement(!0);e.parentNode.insertBefore(l,e),e.remove(),e=l}else e.process={},e.process.nodes={},e.process.nodes.append=o.nodes.append;if(o&&(!i||!s)&&(!i||15!==r)&&o.nodes.append(e),a&&(22!==r&&11!==r||i)){if(15===r||22===r)return e.remove(),void(a.operations[0].callback&&a.operations[0].callback(t[1],o,this));if(11!==r)e.process.eval=12===r&&(o&&o.eval||this.eval)||14===r&&s&&o&&o.eval||o&&o.eval()||this.eval(),e.process.__proto__={name:t[0],params:t,remove:e.remove,isterminated:void 0,isDeadProcess:o&&o.isDeadProcess||void 0,_isDeadProcess:o&&o.isDeadProcess||void 0,parentProcess:!n&&o||void 0,parentParams:n&&t||o.parentParams,global:n&&{}||o.global,module:a,type:a.operations[0].type,callback:a.operations[a.keywords[t[0]]]||a.operations[0]},i&&this.execCallback(e.process,"onload"),this.onboardProcesses.push(e.process);else{var u=o&&o.eval||this.eval;a.operations[0].callback&&a.operations[0].callback(t[1],this.XJSXMethodKeyword(e,u),u)}}}},XJSXCompiler:function(e,n){for(var r={document:e,onboardProcesses:[],eval:"function"==typeof n&&n||t._eval(o),__proto__:t},s=document.createTreeWalker(e,NodeFilter.SHOW_COMMENT,(function(e){return t._XJSXSyntax(e.data)&&!0})).nextNode(),a=document.createTreeWalker(e,NodeFilter.SHOW_COMMENT,(function(e){return t._XJSXSyntax(e.data)&&!0})).lastChild(),i=s&&(s.nextSibling||s.parentNode);s;){if(s===a){r.stage(s);break}r.stage(s),s.parentNode?(s=r.getNextNode(s),i=r.getNextNode(s)):i=(s=i).nextSibling||s.parentNode&&s.parentNode.nextSibling}return r.document=document,r.XJSXLastProcessCallback(),e}};t.createModule([{keyword:"end",callback:function(e,o,t){o&&(!o.isDeadProcess&&!t.execCallback(o)&&o.module.operations[0].onend&&(o.callback=o.module.operations[0])&&t.execCallback(o,"onend"),o.isterminated||t.terminateCurrentProcess())},type:15}]),!e.DISABLE_XJSX&&{eval:t._eval(o),onboardProcesses:[],document:document,__proto__:t}._observer(),e.XJSX={FUNCTION:2,METHOD:1,KEYWORD:0,createEffect:t.createEffect,parseXJSXParameter:t.parseParameter,createTemplate:function(e,o){var n=t.customTemplates;return new Promise((function(t,r){function s(){d++,i&&d>=c&&t()}var a={};"object"==typeof e?a=e:a[e]=o;var i,c=0,d=0;for(var l in a)c++,o=a[l],delete a[l],o instanceof Promise?function(e){o.then((function(o){n[e]=o,s()})),o.catch((function(){n[e]="",s()}))}(l):(n[l]=o,d++);i=!0,c++,s()}))},customTemplates:t.customTemplates,getEffect:function(e){return t.effect[e]},eval:t._eval(o),domParser:t.domParser,dispatcher:t.dispatcher,event:{emit:t.dispatchEvent,on:t.addEventListener,emitData:function(e,o){t.dispatchEvent("data/"+e,o)}},parseElement:function(o,n){o instanceof Node&&t.XJSXCompiler(o,e.eval===n&&!(n=void 0)||n)},createModule:function(e,o,n){if(t.moduleType[o]){var r=[{keyword:e,type:t.moduleType[o],onload:n.onload,onprogress:n.onprogress,callback:n.callback}];return 1===o&&(t.createModule(r),r=void 0),{append:function(e,o){if(r)return r.push({keyword:e,onload:o.onload,onprogress:o.onprogress,callback:o.callback}),this},end:function(){r&&t.createModule(r)}}}},__createModule__:function(){t.createModule(arguments[0])},__XJSXCORE__:function(){return t}},!Node.prototype.remove&&(Node.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)}),!Document.prototype.contains&&(Node.prototype.contains=function(e){for(var o=0;o<this.childNodes.length;o++)if(this.childNodes[o].contains&&this.childNodes[o].contains(e))return!0;return!1}),!XMLHttpRequest.prototype.hasOwnProperty("response")&&Object.defineProperty(XMLHttpRequest.prototype,"response",{get:function(){return this.responseText||this.responseXML||""}})}(this||self,(function(){return!arguments[1]&&"string"==typeof arguments[0]&&[eval(arguments[0],arguments[0]=arguments[1]=void 0),eval("("+arguments.callee+")")]||"string"==typeof arguments[1]&&[eval("var "+arguments[1]+"=arguments[0]"),eval("("+arguments.callee+")"),arguments[0]=arguments[1]=void 0]||[eval(arguments[0],arguments[0]=arguments[1]=void 0),eval("("+arguments.callee+")")]}));