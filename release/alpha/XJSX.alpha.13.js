/***
 * @onprogress
 * @parentProcess
 * @core.execCallback
 */
//console.log("xjsx");

(function (eval) {
  var time = 0;
  var __core__ = {
    _observer: window.MutationObserver
      ? function (elm) {
        var lastChild,
         lastDoc,
         cn,
        core=this,
        obs= new window.MutationObserver(function (e) {
            var n,
            lc;
            if (!lastDoc) {
             lastDoc= document.body||document.documentElement//lastChild
            }
            
            lc=lastDoc
            while (lc.lastChild) {
                lc=lc.lastChild
            }
/*****/
        if (lastChild) {
        }
          if (lastChild&&lastChild===lc) {
          //  console.log(document.documentElement.innerHTML,e);
            return 
          }
            lastChild=lc
/****/
/***
            if ((cn=e[e.length-1])&&(cn=cn.addedNodes[0])) {
             while (cn.lastChild) {
                cn=cn.lastChild
            }
              if (cn!==lc) {
                return;
              }
            }else{
              return
            }
            ***/
           for (var i = 0; i < e.length; i++) {
              var record = e[i];
            console.log(record);
                for (var _i = 0; _i < record.addedNodes.length; _i++) {
                  n = record.addedNodes[_i];
                if (!n.fromXJSXCore) {
                 core.stage(n);
                  }
                }
            }

            return (
              n = e = i = void 0
            );
          });
          obs.observe(elm || document, {
            childList: true,
           subtree: true,
          });
          addEventListener("load", function () {
                  if (!core.resolved) {
                //  console.log(document.body.textContent);
                    obs.disconnect();
                    core.XJSXLastProcessCallback();
                  }
          });
          return (elm = void 0), obs;
        }
      : function (elm) {
          elm.addEventListener("DOMNodeInserted", function (e) {
            void (e.target.fromXJSXCore ? 0 : core.stage(e.target));
            e = void 0;
          });
          return (elm = void 0);
        },
    stage: function (e) {
     // console.log(e.textContent);
      /*** console.time('p') **/
      //console.log(this);
      
      //if (!this.lastNodeInit && e instanceof HTMLBodyElement) {
     //  var t = document.createComment("jj");
       // t.lastProcess = true;
     //   e.appendChild(t, e);
     //   t = void 0;
      //  this.lastNodeInit = true
    //  }

      var currentProcess = this.getOnboardProcess();

      var mode = this.isOurs(e);

      if (mode === this.mode[0]) {
        this.XJSXProcessor(e, currentProcess);
      } else {
        if (currentProcess) {
          currentProcess = currentProcess.process;

          currentProcess.nodes.append(e, false);
          /***
             * if (currentProcess.module.operations[0].type === "keyword") {
              
            } else {
              currentProcess.documentFragment.appendChild(e);
            }
            ***/
        }
      }
      /***  console.timeEnd('p') **/
      /*
        else if (mode === this.mode[1]) {
        } else if (mode === "null") {
           console.error("mode");
        }
        */
    },
    isOurs: function (e) {
      return e instanceof Comment
        ? e.data.match(/^\?\?[^]+\?\?$/)
          ? this.mode[0]
          : null
        : false;

      /*
          ? e.data.match(/\?\?/gim)
            ? this.mode[0]
            : e.data.match(/\?\?/gim)
            ? this.mode[1]
            : "null"
          : false;
          */
    },
    isKeyWord: function (e) {
      return (
        "string" === typeof e &&
        e.trim() &&
        e.length > 1 &&
        e.match(/^[a-z0-9]+([^]+[a-z0-9])?$/)
      );
    },
    isVariable: function (e) {
      return (
        "string" === typeof e &&
        e.trim() &&
        e.length > 1 &&
        e.match(/^[a-z_$]*([a-z_$])?$/i)
      );
    },
    parseKeyWord: function (e) {
      e = e.trim();
      while (e[0] === "?") {
        e = e.substring(1);
      }
      while (e[e.length - 1] === "?") {
        e = e.substring(0, e.length - 1);
      }
      var i = 0;
      var keyword = "";

      while (e[0] !== ":" && e.length > 0) {
        i++;
        keyword += e[0];
        e = e.substring(1);
      }
      if (e[0] === ":") {
        e = e.substring(1);
      }
      return [keyword.trim().toLowerCase(), e];
    },
    mode: ["embedded", "defined"],
    createModule: function (module) {
      if (module instanceof Array && 1 > module.length) {
        return console.error(this.error_meassages.IMC);
      }

      if (!this.isKeyWord(module[0].keyword)) {
        return console.error(this.error_meassages.IMC);
      }

      module[0].keyword = module[0].keyword.toLowerCase();

      if (
        this.modules.hasOwnProperty(module[0].keyword) ||
        this.signedKeywords.hasOwnProperty(module[0].keyword)
      ) {
        return console.error(this.error_meassages.IMC);
      }

      this.modules[module[0].keyword] = {
        operations: module,
        keywords: {},
        name: module[0].keyword,
      };

      for (var i = 1; i < module.length; i++) {
        if (!this.isKeyWord(module[i].keyword)) {
          delete this.modules[module[0].keyword];
          return console.error(this.error_meassages.IMC, module[i].keyword);
        }
        module[i].keyword = module[i].keyword.toLowerCase();
        this.modules[module[0].keyword].keywords[module[i].keyword] = i;
        this.signedKeywords[module[i].keyword] = module[0].keyword;
      }
    },
    getModule: function (key) {
      return this.modules[key];
    },
      eval:eval,
    modules: {},
    signedKeywords: {},
    moduleLength: 0,
    //  currentonboardProcess: {},

    hasOnboardProcess: function () {
      return this.onboardProcesses.length > 0;
    },
    getOnboardProcess: function () {
      return this.onboardProcesses[this.onboardProcesses.length - 1] || null;
    },
    terminateCurrentProcess: function () {
      var cP = this.onboardProcesses[this.onboardProcesses.length - 1];
      if (cP) {
        cP = cP.process;
        cP.isterminated = true;
        this.onboardProcesses.pop();
      }
    },
    onboardProcesses: [],
    getPreviousNode:function(node) {
              if (!node) {
                return;
              }else if (node.previousSibling) {
            return node.previousSibling
       }else if(node.parentNode){
         return node.parentNode
       }
       return;
     },
    getNextNode:function(node) {
              if (!node) {
                return;
              }else if (node.firstChild) {
         return node.firstChild
       }else if(node.nextSibling){
         return node.nextSibling
       }else if(node.parentNode){
     return node.parentNode.nextSibling
       }else{
        return;
       }
     },
    createElement: function (name, trusted) {
      if ("string" === typeof name) {
        name = document.createElement(name);
      } else {
        trusted = name;
        name = document.createTextNode("");
        name.process = {};
        name.process.nodes = this.XJSXNodeList(name);
  
        name._remove = name.remove;
        name.remove = function () {
          if (this.process) {
            this.process.nodes.remove();
          }
          this._remove();
        };
      }
      name.fromXJSXCore = trusted;
      return name;
    },
    execCallback: function (crt, opt, node) {
      if (crt instanceof Text) {
        crt = crt.process;
      }

      /*** check ***/
      if (crt.isDeadProcess && opt !== "onprogress") {
        return;
      }
      var foo = crt.callback;

      if (!opt) {
        opt = "callback";
      }
      foo = foo[opt];
      if ("function" !== typeof foo) {
        return;
      }

      crt = {
        __proto__: crt,
      };

      foo.prototype = this.CALLBACK_PROTOTYPE(crt, opt, node);
      new foo(crt.params[1], crt.eval, node);
      foo.prototype = {};
      crt.closed = true;
    },
    CALLBACK_PROTOTYPE: function (process, opt, node) {
      /*****
       * use process.__proto__ to set process
       * note: this process is an instance, use .__proto__
       *****/

      var type = process.module.operations[0].type,
        core = this,
        _this = {
          parentParams: process.parentParams,
          eval: function () {
           // if (process.closed) {
            //  return console.error("process has ended ");
           // }
            var e = process.eval;

           return e(arguments[0]);
          },
          forEach: function (foo) {
            if (process.closed) {
              return console.error("process has ended ");
            }
            if ("function" !== typeof foo) {
              return console.error("parameter should be a function ");
            }
            if (opt === "callback") {
              process.nodes.forEach(function(a) {
                foo(core.toXJSXElement(a))
              });
            } else if (opt === "onload") {
              /* code */
            }
          },
          global: process.global,
        };

      if (opt === "onprogress") {
        _this.element = node;
      }

      /****check**/
      // if (type === "keyword") {
      // }

      if (opt === "onload") {
        _this.killProcess = function () {
          process.__proto__.isDeadProcess = true;
        };
      }
      if (opt === "callback") {
        _this.appendAllTo=function(doc) {
          process.nodes.forEach(function(node) {
           doc.appendChild(node)
          })
        }
        _this.removeAllNode=function(foo) {
          process.nodes.forEach(function(node) {
            node.remove()
          if("function"===typeof foo){foo(node)}
          })
          process.nodes.flush()
        }
        
        _this.flush=function() {
          process.nodes.flush();
        }
        _this.putChild=function(child) {
          var pp=process
        while (pp.parentProcess) {
          pp=pp.parentProcess;
        }
        pp=pp.nodes;
        pp.forEach(function(a) {
          a.remove()
        })
        
        if (child instanceof Array) {
          pp.flush()
          pp.push(child)
        pp=pp.me();
        var _ch=pp
        for (var i = child.length - 1; i >= 0; i--) {
        pp.parentNode.insertBefore(child[i],_ch),_ch=child[i];
        }
        } else{
        if (child instanceof DocumentFragment) {
          pp.flush();
          for (var i = 0; i <child.childNodes.length; i++) {
           pp.push(child.childNodes[i])
          }
        }else{
          pp.flush()
          pp.push(child)
        }
        pp=pp.me();
        pp.parentNode.insertBefore(child,pp)
        }
          }
        _this.terminate = function () {
          if (process.closed) {
            return console.error("process has ended ");
          }
          if (!process.isterminated) {
            process.__proto__.isterminated = true;
            core.onboardProcesses.pop();
          }
        };
      }

      return _this;
    },
    toXJSXElement: function (node, process) {
      return {
        remove: function () {
          if (process.closed) {
            return console.error("process has ended ");
          }
          node.remove();
         // node.removed = true;
        },
        getAllTextContent: function () {
          var txt = node.textContent;
          if (node.process) {
            node.process.nodes.forEach(function (e) {
              txt += e.getAllTextContent();
            });
          } else {
          }
          return txt;
        },

        /*,
        get textContent() {
            return node.textContent;
        }
        */
      };
    },
    XJSXNodeList: function (node) {
      var process = node.process;
      //if (node instanceof Text) {
      //}else{
       // console.error("unusual code...")
       // process=node
       //}
      var nodes = [],
        currentNodeParant,
        foo,
        core=this,
        forEach = function (a) {
          if (a instanceof Array) {
            a.forEach(forEach)
            return 
          }else if (a instanceof NodeList) {
            for (var i = 0; i < a.length; i++) {
              foo(a[i])
            }
            return 
          }
          if (a.process) {
            foo(a);
            /** commented for performance pp**/
            /***foo(core.toXJSXElement(a, process))***/
            a.process.nodes.forEach(forEach);
          } else {
            foo(a);
            /** commented for performance pp**/
            /***  foo(core.toXJSXElement(a, process)); **/
          }
        },
        self = {
          me:function(){return node},
          flush:function(a){nodes=[]},
          push:function(e) {nodes.push(e)},
          append: function (e, shouldProcess) {
            /*** this will prevent dublicate*/

            if (currentNodeParant && e.parentNode === currentNodeParant) {
              return;
            } else {
              currentNodeParant = void 0;
            }

            if (e instanceof Element) {
              currentNodeParant = e;
            }
            /***/

            if (!shouldProcess) {
              core.execCallback(process, "onprogress", e);
            }

            if (e.removed) {
              return;
            }

            if (self.removed) {
              e.remove();
            } else {
              nodes.push(e);
            }
          },
          forEach: function (f) {
            foo = f;
            if (process.closed) {
              return console.error("process has ended ");
            }
            if ("function" !== typeof foo) {
              return console.error("parameter should be a function ");
            }
            nodes.forEach(forEach);
            //  foo=void 0;
          },
          remove: function () {
            process.removed = self.removed = true;
            nodes.forEach(function (a) {
              a.remove();
            });
            nodes = [];
          },
          pop: function () {
            nodes.pop();
          }
          //push: function (e) {
         //   self.append(e);
       //   },

          /*,
        get length(){
            return nodes.length;
        },
        get lastChild() {
            return nodes[nodes.length - 1];
        } */
        };
      return self;
    },

    XJSXLastProcessCallback: function () {
   //   time += performance.now() - tm
      this.resolved = true;
      console.log("process ended");

      if (this.hasOnboardProcess()) {
        /***check end**/
        this.modules.end.operations[0].callback(["end", ""]);
      }
    //  console.log("done in " + time + "ms");
      //core.terminateCurrentProcess();
    },
    XJSXProcessor: function (e, currentProcess) {
      var params = this.parseKeyWord(e.data);
      // if ("object" !== typeof currentProcess) {
      //  currentProcess = core.getOnboardProcess();
      //}
      if (currentProcess) {
        currentProcess = currentProcess.process;
      }

      var isNewProcess;
      var type;
      var module =
        currentProcess &&
        currentProcess.module.keywords.hasOwnProperty(params[0])
          ? void 0
          : this.getModule(params[0]);

      if (module) {
        type=module.operations[0].type;
        isNewProcess = type === "x-keyword" ? false : true;
      }

      if (!isNewProcess && currentProcess) {
        currentProcess.isDeadProcess = currentProcess._isDeadProcess;
      }

      var shouldProcess =
        currentProcess && currentProcess.isDeadProcess ? false : true;

      /***
       * comment code
       * **/

      /****
        if (
          !isNewProcess&&
        currentProcess.isDeadProcess&&
        !currentProcess._isDeadProcess
       
        ) {
          shouldProcess=true
          console.log(params[1]);
 
}
***/

      //if (currentProcess) {
      if (
        currentProcess &&
        currentProcess.module.keywords.hasOwnProperty(params[0])
      ) {
        /** is next in line?**/
        var nextInLineProcess;
        var currentInLineProcess;
        module = currentProcess.module;
       type =module.operations[0].type
        var previousKeyword = currentProcess.name;
        previousKeyword =
          previousKeyword === module.operations[0].keyword
            ? 0
            : module.keywords[previousKeyword];

        nextInLineProcess = previousKeyword;
        currentInLineProcess = module.keywords[params[0]];

        var err_msg =
          "Unexpected token '" +
          params[0] +
          "'.\n" +
          (nextInLineProcess === 1
            ? ""
            : "( " + currentProcess.parentParams.join(":") + " )...") +
          "( " +
          currentProcess.params.join(":") +
          " )..." +
          "( " +
          params.join(":") +
          " ) " +
          "... ";

        if ((
          type==="keyword"&&nextInLineProcess >currentInLineProcess)||
          (type==="function"&&nextInLineProcess+1 !== currentInLineProcess)
          ) {
            console.log(nextInLineProcess,currentInLineProcess,type);
          return console.error(err_msg);
        }

        // module = currentProcess.module;

        this.execCallback(currentProcess);
        if (currentProcess.isterminated) {
          /*** check **/
          this.terminateCurrentProcess();
          return console.error(err_msg);
        } else {
          this.terminateCurrentProcess();
        }
        err_msg = void 0;
      }
      //  }

      var newNode = this.createElement(true);
      //console.log(e, type,shouldProcess);

      if (e.parentNode) {
        e.parentNode.insertBefore(newNode, e);
        e.remove();
        e.process = newNode.process;
        if (shouldProcess) {
          e = newNode;
        }
      } else {
        /**
          this is weird...nodes should have parents 
          ***/
      }

      if (currentProcess&&!(shouldProcess&&type==="x-keyword")) {
        currentProcess.nodes.append(e, shouldProcess);
      }

      if (e instanceof Comment) {
        e = newNode;
      }

      if (!module) {
        console.error(
          "Unexpected token '%s' (%s:%s)",
          params[0],
          params[0],
          params[1]
        );
        return;
      }
      if (type === "x-keyword") {
        if (shouldProcess) {
          module = module.operations;
          module = module[0].callback;
          if (module) {
            module(params[1], currentProcess,this);
          }
        } else {
          this.terminateCurrentProcess();
        }
        return;
      } else if (type === "method") {
        if (shouldProcess) {
        module = module.operations;
        module = module[0].callback;
        if (module) {
          module(params[1], e, currentProcess?currentProcess.eval:this.eval);
        }
        }
        return;
      }

      if (type === "keyword") {
        var _eval = currentProcess ? currentProcess.eval : this.eval;
      } else {
        var _eval = currentProcess ? currentProcess.eval() : this.eval();
      }

      e.process.__proto__ = {
        name: params[0],
        params: params,
        getNode: function(){return e},
        isDeadProcess: currentProcess ? currentProcess.isDeadProcess : false,
        _isDeadProcess: currentProcess ? currentProcess.isDeadProcess : false,
           parentProcess: !isNewProcess?currentProcess:void 0,
        parentParams: isNewProcess ? params : currentProcess.parentParams,
        global: isNewProcess ? {} : currentProcess.global,

        //   documentFragment: document.createDocumentFragment(),

        eval: _eval,
        module: module,
        type: module.operations[0].type,
        callback:
          module.operations[module.keywords[params[0]]] || module.operations[0],
      };

      if (shouldProcess) {
        this.execCallback(e, "onload");
      }

      this.onboardProcesses.push(e);
    },
   XJSXCompiler:function (element,eval) {
     var core={__proto__:__core__};
     if ("function" === typeof eval) {
       core.eval=eval;
     }
     var node=element.firstChild
      var _n=core.getNextNode(node)
     while(node){
        core.stage(node);
        node=_n
        _n=core.getNextNode(node)
     }
     core.XJSXLastProcessCallback();
     //console.log(element.textContent); 
   },
    error_meassages: {
      IMC: "invalid module case"
    },
  };

var prg=function (q) {
        q = this.global.q;
        if (q) {
          return;
        }
        var node = this.element;
        console.log(node,node.process);
       node.remove()
        if (node instanceof HTMLScriptElement) {
          node._type = node.type;
          node.type = "noscript";
        }
      }
  __core__.createModule([
    {
      keyword: "if",
      onload: function (q) {
        try {
          q = this.global.q = eval(q) ? true : false;
        } catch (e) {
          return console.error(e);
        }
        if (!q) {
          this.killProcess();
        }
      },
      onprogress: prg,
      callback: function (q) {
        q = this.global.q;
        if (!q) {
          this.removeAllNode()
        } else {
          this.global.done = true;
        }
      },
      type: "keyword",
    },
    {
      keyword: "else-if",
      onload: function (_q) {
        var q = this.global.q;
        if (q || this.global.done) {
          this.global.q = false;
          this.killProcess();
          return;
        }
        if (this.global.done) {
          console.log(_q);
        }
        try {
          q = this.global.q = eval(_q) ? true : false;
        } catch (e) {
          return console.error(e);
        }
        if (!q) {
          this.killProcess();
        }
      },
      onprogress: function (q) {
        q = this.global.q;
        if (q) {
          return;
        }
        var node = this.element;
        if (node instanceof HTMLScriptElement) {
          node._type = node.type;
          node.type = "noscript";
        }
      },
      callback: function (q) {
        q = this.global.q;
        if (!q) {
          this.removeAllNode()
        } else {
          this.global.done = true;
        }
      },
    },
    {
      keyword: "else",
      onload: function (q) {
        q = this.global.q = this.global.done;
        if (q) {
          this.killProcess();
        }
      },
      onprogress: prg,
      callback: function (q) {
       // this.putChild()
        this.terminate();
        q = this.global.q;
        if (q) {
          this.removeAllNode()
        }
      },
    },
  ]);

  __core__.createModule([
    {
      keyword: "end",
      callback: function (e, currentProcess,core) {
        if (currentProcess) {
          core.execCallback(currentProcess);
          if (!currentProcess.isterminated) {
            core.terminateCurrentProcess();
          }
        } else {
          console.error("Unexpected token 'end'");
        }
      },
      type: "x-keyword",
    },
  ]);
  __core__.createModule([
    {
      keyword: "print",
      callback: function (e, currentProcess,core) {
       e=e.trim()
       console.log(e);
      },
      type: "method",
    },
  ]);
  
  __core__.createModule([
    {
      keyword: "fetch",
      onload: function(url) {
        try {
          url=this.eval(url)
        } catch (e) {
          return console.error(e)
        }
        var http=new XMLHttpRequest()
        http.open("get",url)
        http.send()
        this.global.http=http;
      },
      type: "function",
    },
    {
      keyword: "then",
      onload:function() {
        this.killProcess();
      },
      onprogress: function () {
           var node = this.element;
          // node.remove()
        if (node instanceof HTMLScriptElement) {
          node._type = node.type;
          node.type = "noscript";
        }
            },
      callback: function (p) {
        var self=this
       var http=this.global.http
       var data;
       var doc=document.createDocumentFragment()
       this.appendAllTo(doc)
       this.flush();
       http.onerror=http.onload=function () {
         p=p.trim();
         if (!__core__.isVariable(p)) {
           return console.error("'"+p+"' is not a valid variable name")
         }
          data=http.responseText;
           self.eval(data,p)
        __core__.XJSXCompiler(doc,self.eval)
          self.putChild(doc)
       }
      }
    }
  ]);
  
              var tm = performance.now();

  ({__proto__:__core__})._observer(document);
  
  return 
  
})(function () {
  /***
   * use strict inside eval to avoid "arguments"
   */
  if (!arguments[1]&&"string" === typeof arguments[0]) {
      return eval(arguments[0]);
  }
  
  if ("string"===typeof arguments[1]) {
    eval(`var ${arguments[1]} = arguments[0]`)
    return 
  }
  

  void eval(arguments[0]);
  return eval("(" + arguments.callee.toString() + ")");
});
