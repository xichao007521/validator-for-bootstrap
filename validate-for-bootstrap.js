!(function($) {
    var defaultSettings = {
        submitClass : "submit",
        showType : 1, //0--block 1--inline
        callback : function(){},
        validRules : {
            required : {
                validate: function(value) {return ($.trim(value) != '');},
                defaultHelpMsg: validateMessages['helpMsg']['required'],
                defaultHintMsg : validateMessages['hintMsg']['required']
            },
            email : {
                validate: function(value) {return (/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value));},
                defaultHelpMsg: validateMessages['helpMsg']['email'],
                defaultHintMsg : validateMessages['hintMsg']['email']
            },
            number : {
                validate : function(value){return (/^\d+[\.]?\d*$/.test(value));},
                defaultHelpMsg: validateMessages['helpMsg']['number'],
                defaultHintMsg: validateMessages['hintMsg']['number']
            },
            english : {
                validate : function(value){return (/^(\w)+$/.test(value));},
                defaultHelpMsg: validateMessages['helpMsg']['english'],
                defaultHintMsg: validateMessages['hintMsg']['english']
            }
        }
    }
    $.fn.validate = function(options) {
        var opts = $.extend({}, defaultSettings, options);
        return this.each(function() {
            var ipts = $(this).find("input[validate-type]");
            var showType = opts["showType"];
            ipts.each(function(){
                var validateType = $(this).attr("validate-type");
                var validRule = opts.validRules[validateType];
                var hintMsg = $(this).attr("hint-msg");
                if(!hintMsg) hintMsg = validRule["defaultHintMsg"];
                if(hintMsg) $(this).attr("placeholder", hintMsg);

                $(this).blur(function(){
                    validateField(this, validRule, showType);
                });
            });
            var submitClass = opts["submitClass"];
            $(this).find("." + submitClass).click(function(){
                var pass = true;
                ipts.each(function(){
                    var validateType = $(this).attr("validate-type");
                    var validRule = opts.validRules[validateType];
                    pass = validateField(this, validRule, showType);
                    if(!pass) return false;
                });
                if(pass) opts.callback.call(this, opts.callback.arguments);
            });
        });
    };

    function validateField(iptElem, validRule, showType){
        var ipt = $(iptElem);
        var value = ipt.val();
        var helpMsg = ipt.attr("help-msg");
        if(!helpMsg) helpMsg = validRule["defaultHelpMsg"];
        var pass = validRule["validate"].call(null, value);
        showResult(iptElem, pass, helpMsg, showType);
        return pass;
    }

    function showResult(iptElem, pass, helpMsg, showType){
        var ipt = $(iptElem);
        var controlGroup = ipt.parent();
        while(!controlGroup.hasClass("control-group") && controlGroup.size() != 0){
            controlGroup = controlGroup.parent();
        }
        if(controlGroup.size() == 0) return;
        var helpSpanClass = "";
        if(showType == 0) helpSpanClass = "help-block";
        else if(showType == 1) helpSpanClass = "help-inline";
        if(pass){
            controlGroup.removeClass("error");
            ipt.next("span." + helpSpanClass).addClass("hide");
        }else{
            if(ipt.next("span." + helpSpanClass).size() == 0){
                ipt.after($("<span class='" + helpSpanClass + "'>" + helpMsg + "</span>"));
            }
            ipt.next("span." + helpSpanClass).removeClass("hide");
            controlGroup.addClass("error");
        }
    }
})(jQuery)