!(function($) {
    var defaultSettings = {
        submitClass : "submit",
        showType : 1, //0--block 1--inline
        callback : function(){},
        validRules : {
            required : {
                validate: function(ipt) {return ($.trim($(ipt).val()) != '');},
                defaultHelpMsg: validateMessages['helpMsg']['required'],
                defaultHintMsg : validateMessages['hintMsg']['required']
            },
            email : {
                validate: function(ipt) {return (/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test($(ipt).val()));},
                defaultHelpMsg: validateMessages['helpMsg']['email'],
                defaultHintMsg : validateMessages['hintMsg']['email']
            },
            number : {
                validate : function(ipt){return (/^\d+[\.]?\d*$/.test($(ipt).val()));},
                defaultHelpMsg: validateMessages['helpMsg']['number'],
                defaultHintMsg: validateMessages['hintMsg']['number']
            },
            english : {
                validate : function(ipt){return (/^(\w)+$/.test($(ipt).val()));},
                defaultHelpMsg: validateMessages['helpMsg']['english'],
                defaultHintMsg: validateMessages['hintMsg']['english']
            }
        }
    }
    $.fn.validate = function(options) {
        var opts = $.extend(true, defaultSettings, options);
        return this.each(function() {
            var ipts = $(this).find("input[validate-type]");
            var showType = opts["showType"];
            if(showType != 2){
                ipts.each(function(){
                    var validateType = $(this).attr("validate-type");
                    var validRule = opts.validRules[validateType];
                    var hintMsg = $(this).attr("hint-msg");
                    if(!hintMsg && validRule) hintMsg = validRule["defaultHintMsg"];
                    if(hintMsg) $(this).attr("placeholder", hintMsg);

                    $(this).blur(function(){
                        validateField(this, validRule, showType);
                    });
                });
            }
            var submitClass = opts["submitClass"];
            $(this).find("." + submitClass).click(function(){
                var pass = true;
                ipts.each(function(){
                    var validateType = $(this).attr("validate-type");
                    var validRule = opts.validRules[validateType];
                    pass = validateField(this, validRule, showType);
                    if(!pass) {
                        $(this).focus().select();
                        return false;
                    }
                });
                if(pass) {
                    opts.callback.call(this, opts.callback.arguments);
                    if(this.tagName.toLowerCase() == "input" && $(this).attr("type") == "submit") $(this).submit();
                }
            });
        });
    };

    function validateField(iptElem, validRule, showType){
        var ipt = $(iptElem);
        var helpMsg = ipt.attr("help-msg");
        if(!helpMsg) helpMsg = validRule["defaultHelpMsg"];
        var pass = validRule["validate"].call(null, iptElem);
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
            if(showType != 2){
                ipt.next("span." + helpSpanClass).addClass("hide");
            }else if(showType == 2){
                $(".error-container").addClass("hide");
            }
        }else{
            controlGroup.addClass("error");
            if(showType != 2){
                if(ipt.next("span." + helpSpanClass).size() == 0){
                    ipt.after($("<span class='" + helpSpanClass + "'>" + helpMsg + "</span>"));
                }
                ipt.next("span." + helpSpanClass).removeClass("hide");
            }else if(showType == 2){
                $(".error-container").removeClass("hide").html(helpMsg);
            }
        }

    }
})(jQuery)