"use strict";(self.webpackChunknews_muncher=self.webpackChunknews_muncher||[]).push([[451],{619:function(e,t,r){r(791);var n=r(87),a=r(184);t.Z=function(e){var t=e.guid,r=e.tags,c=e.date,s=e.publisher,i=e.parent_url,l=e.title,u=e.image,o=e.summary,d=e.country,f="/".concat(d,"/article/").concat(t),h=r.slice(0,6),m=new Date(c).toLocaleDateString("en-GB",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return(0,a.jsx)("div",{className:"card-box",children:(0,a.jsxs)("div",{className:"w-full max-w-2xl rounded overflow-hidden shadow-lg my-4 mx-auto",children:[(0,a.jsx)("img",{className:"w-full h-48 object-cover",src:u,alt:l}),(0,a.jsxs)("div",{className:"px-6 py-4",children:[(0,a.jsx)("p",{className:"font-bold text-m mb-2 text-red-700",children:m}),(0,a.jsxs)(n.rU,{to:f,className:"font-bold text-xl mb-2 text-blue-700 hover:text-blue-900",children:[" ",l]}),(0,a.jsx)("div",{className:"",children:(0,a.jsx)("a",{href:i,target:"_blank",rel:"noopener noreferrer",children:(0,a.jsxs)("p",{className:"mt-4 text-gray-700 text-sm font-bold text-base",children:[s," ",(0,a.jsx)("sup",{children:"\ud83d\udd17"})]})})}),(0,a.jsx)("p",{className:"mt-4 text-gray-700 text-base",children:o})]}),(0,a.jsx)("div",{className:"tag-container m-5",children:h.map((function(e,t){return(0,a.jsx)(n.rU,{to:"/IN/tag/".concat(e,"/"),className:"tag-link",children:e.replace(/-/g," ")},t)}))})]})})}},98:function(e,t,r){var n=r(165),a=r(433),c=r(861),s=r(439),i=r(791),l=r(243);t.Z=function(e){var t=(0,i.useState)([]),r=(0,s.Z)(t,2),u=r[0],o=r[1],d=(0,i.useState)(null),f=(0,s.Z)(d,2),h=f[0],m=f[1],x=(0,i.useState)(!1),v=(0,s.Z)(x,2),p=v[0],g=v[1],b=(0,i.useRef)(!1),w=function(){var t=(0,c.Z)((0,n.Z)().mark((function t(){var r,c,s=arguments;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=s.length>0&&void 0!==s[0]?s[0]:h||e,!b.current){t.next=3;break}return t.abrupt("return");case 3:return b.current=!0,g(!0),t.prev=5,t.next=8,l.Z.get(r);case 8:c=t.sent,m(c.data.next),o((function(e){var t=[].concat((0,a.Z)(e),(0,a.Z)(c.data.results)),r=new Set;return t.filter((function(e){var t=!r.has(e.guid);return r.add(e.guid),t}))})),t.next=16;break;case 13:t.prev=13,t.t0=t.catch(5),console.error("Error fetching articles:",t.t0);case 16:return t.prev=16,g(!1),b.current=!1,t.finish(16);case 20:case"end":return t.stop()}}),t,null,[[5,13,16,20]])})));return function(){return t.apply(this,arguments)}}();return(0,i.useEffect)((function(){w()}),[e]),{articles:u,isFetching:p,loadMoreData:function(){h&&!p&&w(h)},setIsFetching:g,setArticles:o}}},126:function(e,t,r){var n=r(791);t.Z=function(e,t){(0,n.useEffect)((function(){var r=function(){if(e.current){var r=e.current;r.scrollTop+r.clientHeight>=r.scrollHeight-700&&t()}},n=e.current;return n&&n.addEventListener("scroll",r),function(){n&&n.removeEventListener("scroll",r)}}),[e,t])}},537:function(e,t,r){var n=r(791);t.Z=function(e){(0,n.useEffect)((function(){var t=function(t){var r=e.current,n=window.innerHeight;switch(t.keyCode){case 37:case 38:r&&r.scrollBy({top:-n,behavior:"smooth"});break;case 39:case 40:r&&r.scrollBy({top:n,behavior:"smooth"})}};return window.addEventListener("keydown",t),function(){window.removeEventListener("keydown",t)}}),[e])}},451:function(e,t,r){r.r(t);var n=r(791),a=r(689),c=r(98),s=r(619),i=r(126),l=r(537),u=r(184);t.default=function(){var e=(0,a.UO)().country,t="https://api.newsmuncher.com/api/trending/".concat(e),r=(0,c.Z)(t),o=r.articles,d=r.isFetching,f=r.loadMoreData,h=(0,n.useRef)(null);return(0,l.Z)(h),(0,i.Z)(h,f),(0,u.jsxs)("div",{className:"w-full",children:[(0,u.jsx)("div",{className:"text-center",children:(0,u.jsx)("h2",{className:"text-2xl font-bold text-blue-700",children:"Trending Articles"})}),(0,u.jsxs)("div",{ref:h,className:"card-container-vertical",children:[o.map((function(t){return(0,u.jsx)("div",{className:"card-wrapper-vertical",children:(0,u.jsx)(s.Z,{country:e,title:t.title,image:t.top_image,summary:t.clean_summary,guid:t.guid,date:t.publish_date,publisher:t.site,parent_url:t.url,tags:t.tags})},t.guid)})),d&&(0,u.jsx)("p",{})]})]})}}}]);
//# sourceMappingURL=451.da74f84a.chunk.js.map