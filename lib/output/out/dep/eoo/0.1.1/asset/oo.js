/*! @2014 Leo Wang. All Rights Reserved */
void function(e){e("eoo/oo",[],function(){function e(){return e.create.apply(e,arguments)}function t(t){var n=function(){return n.prototype.constructor.apply(this,arguments)};o.prototype=t.prototype;var i=n.prototype=new o;if(i.$self=n,!("$super"in i))i.$super=e.prototype.$super;return n.$superClass=t,n}function n(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function i(e,t){for(var i in e)n(e,i)&&t(e[i],i,e);if(r)for(var a=V.length-1;a>-1;--a){var o=V[a];n(e,o)&&t(e[o],o,e)}}function a(){return this.prototype.constructor.toString()}var o=function(){},s="__eooName__",l="__eooOwner__";e.create=function(n,o){if(o=o||{},n=n||e,"object"==typeof n)o=n,n=e;var r=t(n),V=r.prototype;return i(o,function(e,t){if("function"==typeof e)e[s]=t,e[l]=r;V[t]=e}),r.toString=a,r},e.static="function"==typeof Object.create?Object.create:function(e){if(arguments.length>1)throw new Error("Second argument not supported");if("object"!=typeof e)throw new TypeError("Argument must be an object");return o.prototype=e,new o},e.toString=function(){return"function Class() { [native code] }"},e.prototype={constructor:function(){},$self:e,$superClass:Object,$super:function(e){var t=this.$super.caller,n=t[s],i=t[l].$superClass,a=i.prototype[n];if("function"!=typeof a)throw new TypeError("Call the super class's "+n+", but it is not a function!");return a.apply(this,e)}};var r=!{toString:1}.propertyIsEnumerable("toString"),V=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toString","toLocaleString","valueOf"];return e})}("function"==typeof define&&define.amd?define:function(e){module.exports=e(require)});