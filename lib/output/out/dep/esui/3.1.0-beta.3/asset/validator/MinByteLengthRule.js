/*! @2014 Leo Wang. All Rights Reserved */
define("esui/validator/MinByteLengthRule",["require","./Rule","./ValidityState","../lib","../main"],function(require){function e(){t.apply(this,arguments)}var t=require("./Rule"),i=require("./ValidityState");return e.prototype.type="minByteLength",e.prototype.errorMessage="${title}不能小于${minByteLength}个字符",e.prototype.check=function(e,t){var n=e.replace(/[^\x00-\xff]/g,"xx").length;return new i(n>=this.getLimitCondition(t),this.getErrorMessage(t))},require("../lib").inherits(e,t),require("../main").registerRule(e,100),e});