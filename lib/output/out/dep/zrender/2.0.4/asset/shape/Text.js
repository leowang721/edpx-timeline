/*! @2014 Leo Wang. All Rights Reserved */
define("zrender/shape/Text",["require","../tool/area","./Base","../tool/util"],function(require){var e=require("../tool/area"),t=require("./Base"),i=function(e){t.call(this,e)};return i.prototype={type:"text",brush:function(t,i){var n=this.style;if(i)n=this.getHighlightStyle(n,this.highlightStyle||{});if("undefined"!=typeof n.text&&n.text!==!1){if(t.save(),this.setContext(t,n),this.setTransform(t),n.textFont)t.font=n.textFont;t.textAlign=n.textAlign||"start",t.textBaseline=n.textBaseline||"middle";var a,r=(n.text+"").split("\n"),o=e.getTextHeight("国",n.textFont),s=this.getRect(n),l=n.x;if("top"==n.textBaseline)a=s.y;else if("bottom"==n.textBaseline)a=s.y+o;else a=s.y+o/2;for(var h=0,d=r.length;d>h;h++){if(n.maxWidth)switch(n.brushType){case"fill":t.fillText(r[h],l,a,n.maxWidth);break;case"stroke":t.strokeText(r[h],l,a,n.maxWidth);break;case"both":t.fillText(r[h],l,a,n.maxWidth),t.strokeText(r[h],l,a,n.maxWidth);break;default:t.fillText(r[h],l,a,n.maxWidth)}else switch(n.brushType){case"fill":t.fillText(r[h],l,a);break;case"stroke":t.strokeText(r[h],l,a);break;case"both":t.fillText(r[h],l,a),t.strokeText(r[h],l,a);break;default:t.fillText(r[h],l,a)}a+=o}t.restore()}},getRect:function(t){if(t.__rect)return t.__rect;var i=e.getTextWidth(t.text,t.textFont),n=e.getTextHeight(t.text,t.textFont),a=t.x;if("end"==t.textAlign||"right"==t.textAlign)a-=i;else if("center"==t.textAlign)a-=i/2;var r;if("top"==t.textBaseline)r=t.y;else if("bottom"==t.textBaseline)r=t.y-n;else r=t.y-n/2;return t.__rect={x:a,y:r,width:i,height:n},t.__rect}},require("../tool/util").inherits(i,t),i});