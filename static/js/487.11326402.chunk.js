"use strict";(self.webpackChunknews_muncher=self.webpackChunknews_muncher||[]).push([[487],{619:function(e,t,r){r(791);var a=r(87),s=r(184);t.Z=function(e){var t=e.guid,r=e.tags,n=e.date,l=e.publisher,c=e.parent_url,i=e.title,d=e.image,o=e.summary,u=e.country,m="/".concat(u,"/article/").concat(t),h=r.slice(0,6),x=new Date(n).toLocaleDateString("en-GB",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return(0,s.jsx)("div",{className:"card-box",children:(0,s.jsxs)("div",{className:"w-full max-w-2xl rounded overflow-hidden shadow-lg my-4 mx-auto",children:[(0,s.jsx)("img",{className:"w-full h-48 object-cover",src:d,alt:i}),(0,s.jsxs)("div",{className:"px-6 py-4",children:[(0,s.jsx)("p",{className:"font-bold text-m mb-2 text-red-700",children:x}),(0,s.jsxs)(a.rU,{to:m,className:"font-bold text-xl mb-2 text-blue-700 hover:text-blue-900",children:[" ",i]}),(0,s.jsx)("div",{className:"",children:(0,s.jsx)("a",{href:c,target:"_blank",rel:"noopener noreferrer",children:(0,s.jsxs)("p",{className:"mt-4 text-gray-700 text-sm font-bold text-base",children:[l," ",(0,s.jsx)("sup",{children:"\ud83d\udd17"})]})})}),(0,s.jsx)("p",{className:"mt-4 text-gray-700 text-base",children:o})]}),(0,s.jsx)("div",{className:"tag-container m-5",children:h.map((function(e,t){return(0,s.jsx)(a.rU,{to:"/IN/tag/".concat(e,"/"),className:"tag-link",children:e.replace(/-/g," ")},t)}))})]})})}},487:function(e,t,r){r.r(t),r.d(t,{default:function(){return h}});var a=r(165),s=r(861),n=r(439),l=r(791),c=r(243),i=r(619),d=r(87),o=r(184);var u=function(e){var t=e.title,r=e.tags,a=e.image,s=e.summary,n=e.date,l=e.highlight,c=e.guid,i=e.publisher,u=e.parent_url,m="/IN/article/".concat(c),h=r.slice(0,6),x="card-base-style",g=new Date(n).toLocaleDateString("en-GB",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return l&&(x+=" highlight-styles"),(0,o.jsx)("div",{className:x,children:(0,o.jsxs)("div",{className:"h-screen w-full overflow-y-auto max-w-sm rounded overflow-hidden shadow-lg my-4 mx-auto",children:[(0,o.jsx)("img",{className:"w-full h-48 object-cover",src:a}),(0,o.jsxs)("div",{className:"px-6 py-4",children:[(0,o.jsx)("p",{className:"font-bold text-m mb-2 text-red-700",children:g}),(0,o.jsx)(d.rU,{to:m,className:"font-bold text-xl mb-2 text-blue-700 hover:text-blue-900",children:(0,o.jsx)("div",{className:"font-bold text-xl mb-2 text-blue-700",children:t})}),(0,o.jsx)("div",{className:"",children:(0,o.jsx)("a",{href:u,target:"_blank",rel:"noopener noreferrer",children:(0,o.jsxs)("p",{className:"mt-4 text-gray-700 text-sm font-bold text-base",children:[i," ",(0,o.jsx)("sup",{children:"\ud83d\udd17"})]})})}),(0,o.jsx)("p",{className:"text-gray-700 text-base",children:s})]}),(0,o.jsx)("div",{className:"tag-container m-5",children:h.map((function(e,t){return(0,o.jsx)(d.rU,{to:"/IN/tag/".concat(e,"/"),className:"tag-link",children:e.replace(/-/g," ")},t)}))})]})})},m=r(689);var h=function(){var e=(0,l.useState)(null),t=(0,n.Z)(e,2),r=t[0],d=t[1],h=(0,l.useState)([]),x=(0,n.Z)(h,2),g=x[0],f=x[1],p=(0,m.UO)().article,b=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(){var t,r,s,n,l;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r="https://api.newsmuncher.com/api/article/".concat(p),e.next=4,c.Z.get(r);case 4:s=e.sent,d(s.data),n=new Set,l=(null===(t=s.data.related)||void 0===t?void 0:t.filter((function(e){var t=!n.has(e.guid);return n.add(e.guid),t})))||[],f(l),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.error("Error fetching article:",e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}();return(0,l.useEffect)((function(){b()}),[p]),(0,l.useEffect)((function(){var e=document.querySelector(".card-container"),t=function(){e.scrollWidth,e.scrollLeft,e.clientWidth};return e.addEventListener("scroll",t),function(){return e.removeEventListener("scroll",t)}}),[g]),(0,o.jsxs)("div",{className:"bg-gray-100 min-h-screen",children:[(0,o.jsx)("header",{className:"bg-white shadow text-center",children:(0,o.jsx)("h2",{className:"text-2xl mb-4 font-bold text-gray-800 p-4",children:"Article Details"})}),(0,o.jsxs)("main",{className:"p-4",children:[(0,o.jsx)("section",{className:"mb-8 p-4 bg-white rounded-lg shadow-lg",children:r?(0,o.jsx)(i.Z,{title:r.title,image:r.top_image,summary:r.clean_summary,guid:r.guid,date:r.publish_date,publisher:r.site,parent_url:r.url,tags:r.tags}):(0,o.jsx)("p",{children:"Loading..."})}),(0,o.jsxs)("section",{className:"mb-8",children:[(0,o.jsx)("header",{className:"bg-white shadow text-center",children:(0,o.jsx)("h2",{className:"text-2xl mb-4 font-bold text-gray-800 p-4",children:"Timeline"})}),(0,o.jsx)("div",{className:"h-screen w-full overflow-hidden card-container hide-scrollbar overflow-x-scroll flex space-x-12",children:g.map((function(e,t){return(0,o.jsx)("div",{className:"flex-none w-60 card-wrapper horizontal-styles interactive-card",children:(0,o.jsx)(u,{title:e.title,image:e.top_image,date:e.publish_date,summary:e.clean_summary,highlight:e.guid===p,guid:e.guid,horizontal:!0,publisher:e.site,parent_url:e.url,tags:e.tags})},e.guid||t)}))})]})]})]})}}}]);
//# sourceMappingURL=487.11326402.chunk.js.map