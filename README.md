1. 引入必要的js和css
    <link type="text/css" media="all" rel="stylesheet" href="css/bootstrap.min.css" >  // bootstrap css
    <script type="text/javascript" src="js/jquery-1.8.2.min.js"></script>              // jquery js
    <script type="text/javascript" src="js/bootstrap.min.js"></script>                 // bootstrap js
    <script type="text/javascript" src="../validate-message-zh.js"></script>           // validate message zh, or you can define validateMessages in your page
    <script type="text/javascript" src="../validate-for-bootstrap.js"></script>        // validate js

2. 给想要验证的元素加上css
    <li class="control-group">
        <label class="control-label" for="type-0-email">email</label>
        <div class="controls">
            <input type="text" id="type-0-email" validate-type="email" />
        </div>
    </li>

3. 给验证元素加上验证类型 validate-type, 另外还有两个属性可以用：
    hint-msg ： 提示文字
    help-msg : 出错后的帮助文字

    如果这两个属性没有设置，会使用validate中的defaultsettings

4. 在js中添加validate方法
    $(".validate-show-block").validate();

    其中validate方法中的可选参数：格式为json，例如
    var validateShowBlockSetting = {
        showType : 0,  //0 -- block , 1 -- inline
        callback : function(){
            alert("you are now fire submit : " + $(this).html());
        },
        validRules : {}
    }

    validRules 默认如下：
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

5. 效果请参见demo，尤其是那个验证重名的方法





