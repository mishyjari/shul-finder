(this["webpackJsonpshul-finder"]=this["webpackJsonpshul-finder"]||[]).push([[0],{59:function(e,t,n){},60:function(e,t,n){"use strict";n.r(t);var i=n(1),o=n(0),c=n.n(o),a=n(17),r=n.n(a),s=n(26),l=n(7),u=n(9);n(35);var A=Object(o.createContext)({}),d=function(e){mapkit.init({authorizationCallback:function(e){fetch("https://shul-finder.herokuapp.com/gettoken").then((function(e){return e.text()})).then(e)}});var t=Object(o.useState)(new mapkit.Map("root")),n=Object(u.a)(t,2),c=n[0],a=n[1];c.isScrollEnabled=!0,c.isZoomEnabled=!0,navigator.geolocation.getCurrentPosition((function(e){var t,n=e.coords,i=n.latitude,o=n.longitude;try{var a=new mapkit.Coordinate(i,o),r=new mapkit.CoordinateSpan(.25,.25),s=new mapkit.CoordinateRegion(a,r);c.showsUserLocation=!0,c.showsUserLocationControl=!0,c.addAnnotation((t=a,new mapkit.MarkerAnnotation(t,{title:"My Location",color:"grey"}))),c.setCenterAnimated(a),c.setRegionAnimated(s)}catch(l){console.log("Couldnt get user location")}}),(function(e){console.log(e.message);var t=new mapkit.Coordinate(39.5,-98.35),n=new mapkit.CoordinateSpan(50,50),i=new mapkit.CoordinateRegion(t,n);c.setCenterAnimated(t),c.setRegionAnimated(i)}));return Object(i.jsx)(A.Provider,{value:{map:c,setMap:a,updateMap:function(e){a(new mapkit.Map(e))}},children:e.children})},j=n(62),h=n(64),b=n(43),g=function(e){var t=Object(o.useState)(""),n=Object(u.a)(t,2),c=n[0],a=n[1],r=function(){return Object(i.jsx)(A.Consumer,{children:function(e){var t=e.map;return Object(i.jsx)(j.a,{type:"submit",onClick:function(){t.removeAnnotations(t.annotations),s(c,(function(e,n){e&&console.log(e);try{var i=n.results[0],o=i.formattedAddress,c=i.coordinate,r=i.region,s=c.latitude,l=c.longitude,u=new mapkit.Coordinate(s,l);if(a(o),r){var A=r.span,d=A.latitudeDelta,j=A.longitudeDelta,h=new mapkit.CoordinateSpan(d,j),b=new mapkit.CoordinateRegion(u,h);t.setRegionAnimated(b,h)}else t.setCenterAnimated(u)}catch(g){console.log(g)}}),t)},children:"Go"})}})},s=function(e,t,n){try{(new mapkit.Geocoder).lookup(e,(function(e,n){return t(e,n)}))}catch(i){console.log(i)}};return Object(i.jsx)(h.a,{onSubmit:function(e){return e.preventDefault()},children:Object(i.jsxs)(h.a.Row,{children:[Object(i.jsxs)(b.a,{children:[Object(i.jsx)(h.a.Label,{children:"Search: "}),Object(i.jsx)(h.a.Control,{type:"text",value:c,name:"search",onChange:function(e){return a(e.target.value)}})]}),Object(i.jsx)(b.a,{children:Object(i.jsx)(r,{})})]})})},O=function(){return Object(i.jsx)("nav",{children:Object(i.jsx)("ul",{})})},m=function(){return Object(i.jsxs)("header",{children:[Object(i.jsx)("h3",{children:Object(i.jsx)(s.b,{to:"/",children:"ShulFinder"})}),Object(i.jsx)(O,{}),Object(i.jsx)(g,{})]})},x=function(){return Object(i.jsx)("footer",{children:Object(i.jsx)("h6",{children:"2020 Michelle Frattaroli"})})},p=n(19),C=n(45),f=Object(o.createContext)({results:[],setResults:function(e){return Object(C.a)(e)}}),v=function(e){var t=Object(o.useState)([]),n=Object(u.a)(t,2),c=n[0],a=n[1];return Object(o.useEffect)((function(){fetch("https://shul-finder.herokuapp.com/synagogues").then((function(e){return e.json()})).then((function(e){a(e)}))}),[]),Object(i.jsx)(f.Provider,{value:{results:c,setResults:a},children:e.children})},I="data:image/png;base64,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",w=function(e,t){var n=e.latitude,i=e.longitude,o=t.eastLongitude,c=t.westLongitude,a=t.northLatitude,r=t.southLatitude;return Math.abs(n)<Math.abs(a)&&Math.abs(n)>Math.abs(r)&&Math.abs(i)<Math.abs(c)&&Math.abs(i)>Math.abs(o)},R=n(66),B=n(63);function k(e){var t=Object(o.useState)(!0),n=Object(u.a)(t,2),c=n[0],a=n[1];return Object(i.jsxs)(B.a,{show:c,onHide:function(){return a(!1)},size:"lg",centered:!0,variant:"dark",children:[Object(i.jsx)(B.a.Header,{closeButton:!0,children:Object(i.jsx)(B.a.Title,{children:"Search By Location"})}),Object(i.jsxs)(B.a.Body,{children:[Object(i.jsx)(g,{}),Object(i.jsx)(j.a,{variant:"secondary w-50",onClick:function(){return a(!1)},children:"Close"})]})]})}n(35);var L=function(e){var t=e.updateMap,n=e.setMap,c=e.map,a=Object(o.useState)(!1),r=Object(u.a)(a,2),s=r[0],l=r[1];Object(o.useEffect)((function(){return navigator.geolocation.getCurrentPosition((function(e){l(!0)}),(function(e){console.log(e)})),t("map-container"),function(){return n()}}),[]);var A=function(e){c.annotations=[];var t=c.region.toBoundingRegion();e.results.filter((function(e){var n=c.annotations.findIndex((function(t){return t.data._id===e._id})),i=e.latitude,o=e.longitude;return n<0&&w({latitude:i,longitude:o},t)})).forEach((function(e){try{var n=e.latitude,i=e.longitude;if(w({latitude:n,longitude:i},t)){var o=function(e){var t=new mapkit.Coordinate(e.latitude,e.longitude),n={title:e.name,color:"blue",subtitle:e.movement,data:e,animates:!0,calloutEnabled:!0,clusteringIdentifier:"synagogue-cluster",glyphImage:{1:I,2:I,3:I}};return new mapkit.MarkerAnnotation(t,n)}(e);c.addAnnotation(o)}}catch(a){console.log(a),console.log(e)}}))};return Object(i.jsx)(f.Consumer,{children:function(e){s&&A(e);var t=Math.floor(1e3*(c.visibleMapRect.size.height+c.visibleMapRect.size.width));return c.addEventListener("region-change-end",(function(){(s||t<10)&&A(e)})),s?Object(i.jsx)("div",{id:"map-container"}):Object(i.jsx)("div",{id:"map-container",children:t>=10?Object(i.jsxs)(i.Fragment,{children:[Object(i.jsxs)(R.a,{children:[Object(i.jsx)(R.a.Header,{children:Object(i.jsx)("strong",{children:"Location Services Disabled"})}),Object(i.jsx)(R.a.Body,{children:"Zoom in or use search to view map annotations."})]}),Object(i.jsx)(k,{})]}):Object(i.jsx)(k,{})})}})},M=function(){return Object(i.jsx)(A.Consumer,{children:function(e){return Object(i.jsx)(L,Object(p.a)({},e))}})},P=n(41),y=n(65);function Q(e){var t=Object(o.useState)(!0),n=Object(u.a)(t,2),c=n[0],a=n[1],r=e.heading,s=e.text,l=e.variant;return c?Object(i.jsxs)(y.a,{variant:l,onClose:function(){return a(!1)},dismissible:!0,children:[Object(i.jsx)(y.a.Heading,{children:r}),Object(i.jsx)("p",{children:s})]}):Object(i.jsx)(i.Fragment,{})}var D=function(e){var t=e.name,n=e.city,o=e.state,c=e.movement;return Object(i.jsxs)("div",{className:"synagogue-list-item",children:[Object(i.jsx)("h5",{children:t}),Object(i.jsxs)("h6",{children:[n,", ",o]}),Object(i.jsx)("em",{children:c})]})},G=function(e){var t=e.map,n=Object(o.useState)(!1),c=Object(u.a)(n,2),a=c[0],r=c[1],s=Object(o.useState)({results:[],displayCount:5}),l=Object(u.a)(s,2),A=l[0],d=l[1],j=function(){return r(!a)};return a?Object(i.jsx)("div",{className:"show-list",children:Object(i.jsx)("button",{onClick:j,children:"Show List"})}):Object(i.jsxs)("div",{className:a?"list-fluid collapse":"list-fluid expand",onScroll:function(e){e.target.scrollHeight-e.target.scrollTop===e.target.clientHeight&&d({results:[],displayCount:A.displayCount+=5})},children:[Object(i.jsx)("button",{className:"toggle-btn",onClick:j,children:Object(i.jsx)("span",{children:a?">>":"<<"})}),Object(i.jsx)(f.Consumer,{children:function(e){return t.addEventListener("region-change-end",(function(){e.setResults(e.results)})),Object(i.jsxs)("div",{children:[e.results.filter((function(e){var n=e.latitude,i=e.longitude,o=t.region.toBoundingRegion();return w({latitude:n,longitude:i},o)})).slice(0,A.displayCount).map((function(e){return Object(i.jsx)(D,Object(p.a)({},e),e._id)})),Object(i.jsx)("button",{onClick:function(){return function(e){d({results:e.results.slice(0,A.displayCount),displayCount:A.displayCount+=5}),console.log(A)}(e)},className:"btn btn-secondary w-100 load-more-btn",children:"Load More"})]})}})]})};n(35);var E=function(){return Object(i.jsx)(A.Consumer,{children:function(e){return Object(i.jsxs)("div",{id:"accordion-container",children:[Object(i.jsx)("div",{id:"list-fluid",children:Object(i.jsx)(G,Object(p.a)({},e))}),Object(i.jsx)("div",{id:"map-fluid",children:Object(i.jsx)(L,Object(p.a)({},e))})]})}})};n(58);var Z=function(){return Object(i.jsxs)("div",{className:"App",children:[Object(i.jsx)(Q,{variant:"danger",heading:"Application under development",text:"Dataset is incomplete and limited to the US. More thorough data and features coming soon!"}),Object(i.jsx)(d,{children:Object(i.jsxs)(v,{children:[Object(i.jsxs)(s.a,{children:[Object(i.jsx)(m,{}),Object(i.jsx)(P.BrowserView,{children:Object(i.jsx)("main",{id:"main",children:Object(i.jsx)(l.c,{children:Object(i.jsx)(l.a,{exact:!0,path:"/",component:E})})})}),Object(i.jsx)(P.MobileView,{children:Object(i.jsx)("main",{id:"main-mobile",children:Object(i.jsx)(l.c,{children:Object(i.jsx)(l.a,{exact:!0,path:"/",component:M})})})})]}),Object(i.jsx)(x,{})]})})]})},U=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,67)).then((function(t){var n=t.getCLS,i=t.getFID,o=t.getFCP,c=t.getLCP,a=t.getTTFB;n(e),i(e),o(e),c(e),a(e)}))};n(59);r.a.render(Object(i.jsx)(c.a.StrictMode,{children:Object(i.jsx)(Z,{})}),document.getElementById("root")),U()}},[[60,1,2]]]);
//# sourceMappingURL=main.c733cd26.chunk.js.map