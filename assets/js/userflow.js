// Userflow
!function(){var e="undefined"==typeof window?{}:window,r=e.userflow;if(!r){var t="https://js.userflow.com/",n=null;r=e.userflow={_stubbed:!0,load:function(){return n||(n=new Promise((function(r,o){var s=document.createElement("script");s.async=!0;var a=e.USERFLOWJS_ENV_VARS||{};"es2020"===(a.USERFLOWJS_BROWSER_TARGET||function(e){for(var r=[[/Edg\//,/Edg\/(\d+)/,80],[/OPR\//,/OPR\/(\d+)/,67],[/Chrome\//,/Chrome\/(\d+)/,80],[/Safari\//,/Version\/(\d+)/,14],[/Firefox\//,/Firefox\/(\d+)/,74]],t=0;t<r.length;t++){var n=r[t],o=n[0],s=n[1],a=n[2];if(e.match(o)){var u=e.match(new RegExp(s));if(u&&parseInt(u[1],10)>=a)return"es2020";break}}return"legacy"}(navigator.userAgent))?(s.type="module",s.src=a.USERFLOWJS_ES2020_URL||t+"es2020/userflow.js"):s.src=a.USERFLOWJS_LEGACY_URL||t+"legacy/userflow.js",s.onload=function(){r()},s.onerror=function(){document.head.removeChild(s),n=null;var e=new Error("Could not load Userflow.js");console.error(e.message),o(e)},document.head.appendChild(s)}))),n}};var o=e.USERFLOWJS_QUEUE=e.USERFLOWJS_QUEUE||[],s=function(e){r[e]=function(){var t=Array.prototype.slice.call(arguments);r.load(),o.push([e,null,t])}},a=function(e){r[e]=function(){var t,n=Array.prototype.slice.call(arguments);r.load();var s=new Promise((function(e,r){t={resolve:e,reject:r}}));return o.push([e,t,n]),s}},u=function(e,t){r[e]=function(){return t}};s("_setTargetEnv"),s("closeResourceCenter"),s("init"),s("off"),s("on"),s("prepareAudio"),s("registerCustomInput"),s("remount"),s("reset"),s("setBaseZIndex"),s("setCustomInputSelector"),s("setCustomNavigate"),s("setCustomScrollIntoView"),s("setInferenceAttributeFilter"),s("setInferenceAttributeNames"),s("setInferenceClassNameFilter"),s("setResourceCenterLauncherHidden"),s("setScrollPadding"),s("setShadowDomEnabled"),s("setPageTrackingDisabled"),s("setUrlFilter"),s("openResourceCenter"),s("toggleResourceCenter"),a("endAll"),a("endAllFlows"),a("endChecklist"),a("group"),a("identify"),a("identifyAnonymous"),a("start"),a("startFlow"),a("startWalk"),a("track"),a("updateGroup"),a("updateUser"),u("getResourceCenterState",null),u("isIdentified",!1)}}();

userflow.init("ct_dybdwc2fkna4lmih2zyqb6eune");
userflow.identifyAnonymous({
    website_lead: false,
});