(function () {
    var __core__ = XJSX.__XJSXCORE__();
    var MKEYWORD = 0xF;
    /** var √ **/
    __core__.createModule([
        {
            keyword: "var",
            callback: function (param, currentProcess, core) {
                var exec = currentProcess && currentProcess.eval || core.eval
                param = __core__.parseParameter(param).parameter[0].trim();
                param = param.split(/(^[a-zA-Z ]+)\=/);
                param.shift()
                // console.log(param);
                if (param[0]) {
                    try {
                        exec("var " + param[0] + "=(" + param[1] + ")")
                        // exec(exec(param[1]), param[0])
                    } catch (err) {
                        console.error("var:", param.join(""), err + "");
                    }
                }
                param= void 0;
            },
            type: MKEYWORD,
        },
    ]);
})()