/*! @2014 Leo Wang. All Rights Reserved */
!function(e){if("function"==typeof define&&define.amd)define("moment/lang/is",["moment"],e);else if("object"==typeof exports)module.exports=e(require("../moment"));else e(window.moment)}(function(e){function t(e){if(e%100===11)return!0;else if(e%10===1)return!1;return!0}function i(e,i,n,a){var o=e+" ";switch(n){case"s":return i||a?"nokkrar sekúndur":"nokkrum sekúndum";case"m":return i?"mínúta":"mínútu";case"mm":if(t(e))return o+(i||a?"mínútur":"mínútum");else if(i)return o+"mínúta";return o+"mínútu";case"hh":if(t(e))return o+(i||a?"klukkustundir":"klukkustundum");else return o+"klukkustund";case"d":if(i)return"dagur";else return a?"dag":"degi";case"dd":if(t(e))if(i)return o+"dagar";else return o+(a?"daga":"dögum");else if(i)return o+"dagur";return o+(a?"dag":"degi");case"M":if(i)return"mánuður";else return a?"mánuð":"mánuði";case"MM":if(t(e))if(i)return o+"mánuðir";else return o+(a?"mánuði":"mánuðum");else if(i)return o+"mánuður";return o+(a?"mánuð":"mánuði");case"y":return i||a?"ár":"ári";case"yy":if(t(e))return o+(i||a?"ár":"árum");else return o+(i||a?"ár":"ári")}}return e.lang("is",{months:"janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"),monthsShort:"jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),weekdays:"sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"),weekdaysShort:"sun_mán_þri_mið_fim_fös_lau".split("_"),weekdaysMin:"Su_Má_Þr_Mi_Fi_Fö_La".split("_"),longDateFormat:{LT:"H:mm",L:"DD/MM/YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] LT",LLLL:"dddd, D. MMMM YYYY [kl.] LT"},calendar:{sameDay:"[í dag kl.] LT",nextDay:"[á morgun kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[í gær kl.] LT",lastWeek:"[síðasta] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"eftir %s",past:"fyrir %s síðan",s:i,m:i,mm:i,h:"klukkustund",hh:i,d:i,dd:i,M:i,MM:i,y:i,yy:i},ordinal:"%d.",week:{dow:1,doy:4}})});