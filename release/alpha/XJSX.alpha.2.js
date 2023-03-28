/***
 * @onprogress
 * @parentProcess
 * @core.execCallback
 */

(function (eval) {
  var core = {
      _observer: window.MutationObserver
        ? function (foo, elm) {
            var obs = new window.MutationObserver(function (e) {
              for (var i = 0; i < e.length; i++) {
                if (e[i].type === "childList") {
                  for (var _i = 0; _i < e[i].addedNodes.length; _i++) {
                    //  console.log(e[i].addedNodes[_i].data);
                    void (e[i].addedNodes[_i].fromXJSXCore
                      ? 0
                      : foo(e[i].addedNodes[_i]));
                  }
                } else {
                  //  console.log(e[i]. target.data);
                  void (e[i].target.fromXJSXCore ? 0 : foo(e[i].target));
                }
              }
              return (e = i = void 0);
            });
            obs.observe(elm || document, {
              childList: true, //
              subtree: true,
            });
            addEventListener("load", function () {
              obs.disconnect();
            });
            return (elm = void 0);
          }
        : function (foo, elm) {
            elm.addEventListener("DOMNodeInserted", function (e) {
              void (e.target.fromXJSXCore ? 0 : foo(e.target));
              e = void 0;
            });
            return (elm = void 0);
          },

      stage: function (e) {
        //e.remove()
        //  return
        var currentProcess = core.getOnboardProcess();

        // if (currentProcess) {
        //  core.execCallback(currentProcess,"onprogress",e)
        //  if (e.removed) {
        //   return
        // }
        //  }

        var mode = core.isOurs(e);
        //  console.log(e.textContent);
        // console.log(77,e.data);
        if (
          mode === core.mode[0] // &&
          //  (currentProcess &&
          //   !currentProcess.process.isDeadProcess)
        ) {
          XJSXHandlers.processKeyword(e, currentProcess);
        } else {
          if (currentProcess) {
            //  console.log(currentProcess);
            //  ((currentProcess.process.module.operations[0].type==="keyword")?core.execCallback(currentProcess,"onprogress",e):0);

            currentProcess = currentProcess.process;
            //   console.log(currentProcess)

              currentProcess.nodes.append(e);
            /***
             * if (currentProcess.module.operations[0].type === "keyword") {
              //   core.execCallback(currentProcess,"onprogress",e)
            } else {
              currentProcess.documentFragment.appendChild(e);
            }
            ***/
            
          }
        }
        /*
        else if (mode === core.mode[1]) {
        } else if (mode === "null") {
           console.error("mode");
        }
        */
      },
      isOurs: function (e) {
        return e instanceof Comment
          ? e.data.match(/^\?\?[^]+\?\?$/)
            ? core.mode[0]
            : null
          : false;

        /*
          ? e.data.match(/\?\?/gim)
            ? core.mode[0]
            : e.data.match(/\?\?/gim)
            ? core.mode[1]
            : "null"
          : false;
          */
      },
      isKeyWord: function (e) {
        return "string" === typeof e && e.length > 1 && !e.match(/[\W\d]/);
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
        // console.log(keyword,e);
      },
      mode: ["embedded", "defined"],
      createModule: function (module) {
        if (module instanceof Array && 1 > module.length) {
          throw this.error_meassages.IMC;
        }

        if (!core.isKeyWord(module[0].keyword)) {
          throw core.error_meassages.IMC;
        }
        module[0].keyword = module[0].keyword.toLowerCase();

        if (
          core.modules.hasOwnProperty(module[0].keyword) ||
          core.signedKeywords.hasOwnProperty(module[0].keyword)
        ) {
          throw core.error_meassages.IMC;
        }

        core.modules[module[0].keyword] = {
          operations: module,
          keywords: {},
          name: module[0].keyword,
        };
        for (var i = 1; i < module.length; i++) {
          core.modules[module[0].keyword].keywords[module[i].keyword] = i;
          core.signedKeywords[module[i].keyword] = module[0].keyword;
        }
        //var module[0].keyword.length;
        //core.moduleLength=module[0].keyword.length;
      },
      getModule: function (key) {
        return core.modules[key];
      },
      modules: {},
      signedKeywords: {},
      moduleLength: 0,
      currentonboardProcess: {},
      hasOnboardProcess: function () {
        return core.onboardProcesses.length > 0;
      },
      getOnboardProcess: function () {
        return core.onboardProcesses[core.onboardProcesses.length - 1] || null;
      },
      onboardProcesses: [],
      createElement: function (name, trusted) {
        if ("string" === typeof name) {
          name = document.createElement(name);
        } else if (name === null) {
          name = document.createTextNode("");
          name.process = {};
          name.process.nodes = new core.Node(name);
          name._remove = name.remove;
          name.remove = function () {
            //this.removed=true;
            if (this.process) {
              //   this.process.removed=true;
              this.process.nodes.remove();
            }
            this._remove();
          };
        } else {
        }
        if (trusted) {
          name.fromXJSXCore = true;
        }
        return name;
      },
      execCallback: function (crt, opt, node) {
        if (crt instanceof Text) {
          crt = crt.process;
        }

if (crt.isDeadProcess) {
  return 
}
        var foo = crt.callback;

        if (!opt) {
          opt = "callback";
        }
        foo = foo[opt];
        if ("function" !== typeof foo) {
          return;
        }

        // if (opt==="onprogress") {
        //     var _crt = crt.parentProcess;
        //   if (_crt) {
        //    core.execCallback(_crt,"onprogress",node)
        //   console.log(_crt);
        //    }
        //   }
        crt = {
          __proto__: crt,
        };
        foo.prototype = new core.CALLBACK_PROTOTYPE(crt, opt, node);
        new foo(crt.params[1], crt.eval, node);
        foo.prototype = new Object();
        crt.closed = true;
      },
      CALLBACK_PROTOTYPE: function (process, opt, node) {
     /*****
      * use process.__proto__ to set process
      * note: this process is an instance, use .__proto__
      *****/
        var type = process.module.operations[0].type;
        if (type === "keyword") {
          this.parentParams = process.parentParams;
        }
        this.eval = function () {
          if (process.closed) {
            throw "process has ended ";
          }
          process.eval(arguments[0]);
        };

        if (opt === "onload") {
          this.killProcess = function () {
            process.__proto__.isDeadProcess = true;
          };
        }
        if (opt.match(/^callback$/)) {
          this.terminate = function () {
            if (process.closed) {
              throw "process has ended ";
            }
            if (!process.isterminated) {
              process.__proto__.isterminated = true;
              core.onboardProcesses.pop();
            }
          };
        }

        this.forEach = function (foo) {
          if (process.closed) {
            // console.log(process);
            throw "process has ended ";
          }
          if ("function" !== typeof foo) {
            throw "parameter should be a function ";
          }
          if (opt === "callback") {
            process.nodes.forEach(function (a, b) {
              // if (a.process&&a instanceof Text) { }else{    }
              foo(a, b, null);
            });
          } else if (opt === "onload") {
            // while (node=node.nextSibling) {
            //console.log(node);
            // node.remove()
            /* code */
            //  }
          }
        };
        this.global = process.global;
      },
      toXJSXElement: function (node, process) {
        this.remove = function () {
          if (process.closed) {
            throw "process has ended ";
          }
          node.remove();
          node.removed = true;
        };
        Object.defineProperty(this, "textContent", {
          get() {
            return node.textContent;
          },
        });
      },
      Node: function (process) {
        if (process instanceof Text) {
          process = process.process;
        }
        var nodes = [],
          self = this;

        Object.defineProperty(self, "length", {
          get() {
            return nodes.length;
          },
          //:false
        });
        self.push = self.append = function (e,shouldProcess) {
          //  console.log(process.removed);
          if (process.type === "keyword"&&shouldProcess) {
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
        };
        self.pop = function () {
          nodes.pop();
        };
        self.remove = function () {
          process.removed = self.removed = true;
          nodes.forEach(function (a, b) {
            a.remove();
          });
          nodes = [];
        };
        self.forEach = function (foo) {
          if (process.closed) {
            throw "process has ended ";
          }
          if ("function" !== typeof foo) {
            throw "parameter should be a function ";
          }
          nodes.forEach(function (a, b) {
            var _foo=arguments.callee
            // if (a.process&&a instanceof Text) { }else{    }
          // console.log(a);
           if (a.process) {
            foo(new core.toXJSXElement(a, process), b, null);
             a.process.nodes.forEach(function(a) {
            // console.log(a);
               _foo(a)
             })
           }else{
            foo(new core.toXJSXElement(a, process), b, null);
           }
          });
        };
      },
      error_meassages: {
        IMC: "invalid module case",
      },
    },
    XJSXHandlers = {
      processKeyword: function (e, currentProcess) {
        var params = core.parseKeyWord(e.data);
        if ("object" !== typeof currentProcess) {
          currentProcess = core.getOnboardProcess();
        }
        
      
        var isNewProcess;
        var module = core.getModule(params[0]);
        if (module) {
          //console.log(module);
          isNewProcess = module.operations[0].type ===null?false:true;
        }
      //  console.log(params[0]);
        if (
          //!isNewProcess&&
        currentProcess
      //  (currentProcess.process.module.keywords.hasOwnProperty(params[0]))
          ) {
currentProcess.process.isDeadProcess=currentProcess.process._isDeadProcess
        }
        
         var shouldProcess =
            currentProcess && currentProcess.process.isDeadProcess
              ? false
              : true;
              
              
        /***
         * comment code
         * **/
      // shouldProcess = isNewProcess && shouldProcess ? true : false;
       
       /****
        if (
          !isNewProcess&&
        currentProcess.process.isDeadProcess&&
        !currentProcess.process._isDeadProcess//&&
       // !shouldProcess
        ) {
          shouldProcess=true
          console.log(params[1]);
 // console.log(params[1],currentProcess.process);
}
***/
        //console.log(module);
        if (currentProcess) {
          //  if (currentProcess.process.isterminated) {
          //console.log("process terminated already... process should be alive");
          // return;
          //   }
          if (
            currentProcess.process.module.keywords.hasOwnProperty(params[0])
            //  &&
            //  ! module
            // currentProcess.process.module.operations[0].keywords !== params[0]
          ) {
            module = currentProcess.process.module;
            //var siblingProcess = module.keywords[params[0]] - 1;
            // var processCallback = module.operations[siblingProcess].callback;
            // console.log(currentProcess.process.callback);
            //({
            //  callback:processCallback
            //  }).callback()

          //  if (shouldProcess) {
              core.execCallback(currentProcess);
       //     }
            if (currentProcess.process.isterminated) {
              console.error(
                "process terminated already... process should be alive"
              );
              return;
            } else {
              //console.log(params);
              currentProcess.process.isterminated = true;
              core.onboardProcesses.pop();
              // return
            }
            // console.log(processCallback);
            //console.log(currentProcess.process);
          }
        }

        var newNode = core.createElement(null, true);
    
       //console.log(shouldProcess, e.data,currentProcess?currentProcess.process:null);
       
        if (e.parentNode) {
          e.parentNode.insertBefore(newNode, e);
          e.remove();
         e.process=newNode.process
          if (shouldProcess) {
            e = newNode;
          }else{
           // console.log(e);
          }
        }

        if (currentProcess) {
/*******
 * fixe here, type should be just "keyword"
 * 
 * 
          if (
            // !module&&
            currentProcess.process.module.operations[0].type !== "keyword"
          ) {
            currentProcess.process.documentFragment.appendChild(e);
          } else if (
            currentProcess.process.module.operations[0].type === "keyword"
          ) {
            //core.execCallback(currentProcess,"onprogress",e)
            currentProcess.process.nodes.append(e);
          }
          **/
          
            currentProcess.process.nodes.append(e,shouldProcess);
        }



if (!shouldProcess) {
  e=newNode
}



        if (!module ) {
         // console.log(params[0]);
           console.error("undefined keyword");
          return;
        }




        if (module.operations[0].type === "keyword") {
          var _eval = currentProcess ? currentProcess.process.eval : eval;
        } else {
          var _eval = currentProcess
            ? currentProcess.process.eval(null, true)
            : eval();
        }



        if (module.operations[0].type === null) {
     //  console.log(params[1],currentProcess);
          module = module.operations;
          module = module[0].callback;
          //console.log(currentProcess);
          module(currentProcess);
     
          //   e.remove();
          return;
        }

        // console.log(module,currentProcess);

        // core.currentonboardProcess=

        //  console.log(newNode);
        //console.log(isNewProcess+"5");
        e.process.__proto__ = {
          name: params[0],
          params: params,
          isDeadProcess: currentProcess ? currentProcess.process.isDeadProcess : false,
          _isDeadProcess: currentProcess ? currentProcess.process.isDeadProcess : false,
          parentProcess: currentProcess,
          parentParams: isNewProcess
            ? params
            : currentProcess.process.parentParams,
          global: isNewProcess ? {} : currentProcess.process.global,
          //nodes: new core.Node(e),
          documentFragment: document.createDocumentFragment(),

          eval: _eval,
          module: module,
          type: module.operations[0].type,
          callback:
            module.operations[module.keywords[params[0]]] ||
            module.operations[0],
        };
        if (shouldProcess) {
          core.execCallback(e, "onload"); 
        }
        //new core.toXJSXElement(e))
        //  core.execCallback(e,"onprogress",e)
        core.onboardProcesses.push(e); //-1;
        // currentonboardProcess=[]
        // return e
      },
    };

  // core.CALLBACK_PROTOTYPE.prototype = {
  // terminate: function () {},
  //};

  // console.log(new core.CALLBACK_PROTOTYPE());

  core.createModule([
    {
      keyword: "if",
      onload: function (q) {
      //  console.log(q);
        try {
          q=this.global.q = !eval(q); //?true:false
        } catch (e) {
          throw e;
        }
        if (q) {
          this.killProcess();
        }
      },
      callback: function (e) {
                  q=this.global.q 
        var d = [];
       // console.log(q);
        if (q) {
          this.forEach(function (e) {
         d.push(e.textContent);
         e.remove()
        });
         this.global.q=false
        }else{
         this.global.q=true
        }
   //   console.log(d);
      },
      _onload: function (q, eval) {
        try {
          this.global.q = eval(q); //?true:false
        } catch (e) {
          throw e;
        }
        this.forEach(function (node) {
          console.log(node);
        });
      },
      _onprogress: function (e, eval, node) {
        var q = this.global.q;
        //  console.log(node.textContent);
        if (0 && !q) {
          node.removed = true;
          node.remove();
        }
      },
      type: "keyword",
    },
    {
      keyword: "else",
      onload: function (q) {
        //console.log(q);
          q=this.global.q 
    // console.log(this);
          
        if (q) {
          this.killProcess();
        }
      },
      callback: function (q) {
                  //console.log(q);
          q=this.global.q 
       // console.log(q);
        var d = [];
      //  console.log(q,e);
        if (q) {
          this.forEach(function (e) {
         d.push(e.textContent);
         e.remove()
        });
        }
        this.terminate()
        // console.log(q);
      },
      _onprogress: function (e, eval, node) {
        var q = this.global.q;
        //console.log("else",node.textContent);
        //  console.log(e,this.global.condition);
        if (0 && q) {
          node.removed = true;
          node.remove();
        }
      },
      recallable: true,
    },
  ]);

  core.createModule([
    {
      keyword: "end",
      callback: function (currentProcess) {
        //  var currentProcess = core.getOnboardProcess();

        if (currentProcess) {
          //  currentProcess = currentProcess.process;
          //  var module = currentProcess.module
          //  module=module.operations[module.keywords[currentProcess.name]]
          //core.getModule(currentProcess.name);
          // console.log(currentProcess);

          core.execCallback(currentProcess);
          if (!currentProcess.process.isterminated) {
            currentProcess.isterminated = true;
            core.onboardProcesses.pop();
          } else {
           // console.log(88);
          }
        } else {
          console.error("no process to end");
        }
      },
      type: null,
    },
  ]);
  // var obj={d:eval('"use strict";')('var a=9')('a+=11')}
  //obj= obj.d;
  // obj('console.log(a,this);')('a',true)

  core._observer(core.stage, document);
})(function () {
  /***
   * use strict inside eval to avoid "arguments"
   */
  if ("string" === typeof arguments[0]) {
    if (arguments[1]) {
      void eval(arguments[0]);
      return eval("(" + arguments.callee.toString() + ")");
    }
    return eval(arguments[0]);
  } else {
    return eval("(" + arguments.callee.toString() + ")");
  }
});
