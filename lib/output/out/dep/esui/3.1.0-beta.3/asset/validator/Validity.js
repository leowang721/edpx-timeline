/*! @2014 Leo Wang. All Rights Reserved */
define("esui/validator/Validity",["require","underscore"],function(require){function e(){this.states=[],this.stateIndex={},this.customMessage="",this.customValidState=null}var t=require("underscore");return e.prototype.addState=function(e,t){if(this.stateIndex[e]){if(this.stateIndex[e]===t)return;for(var i=0;i<this.states.length;i++)if(this.states[i]===this.stateIndex[e]){this.states.splice(i,1);break}}this.states.push(t),this.stateIndex[e]=t},e.prototype.getState=function(e){return this.stateIndex[e]||null},e.prototype.getStates=function(){return this.states.slice()},e.prototype.getCustomMessage=function(){return this.customMessage},e.prototype.setCustomMessage=function(e){this.customMessage=e},e.prototype.setCustomValidState=function(e){this.customValidState=e},e.prototype.isValid=function(){return t.all(this.getStates(),function(e){return e.getState()})},e.prototype.getValidState=function(){return this.customValidState||(this.isValid()?"valid":"invalid")},e});