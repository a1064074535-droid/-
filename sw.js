self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("push",e=>{let d={};try{d=e.data?e.data.json():{}}catch(_){d={body:e.data?e.data.text():""}}
 e.waitUntil(self.registration.showNotification(d.title||"رفيق الذكر",{body:d.body||"",tag:d.tag||"rafiq",renotify:true,icon:"icon-192.png",badge:"icon-192.png",dir:"rtl",lang:"ar",vibrate:[200,100,200],data:{url:d.url||"./",go:d.go||"today"}}))});
self.addEventListener("notificationclick",e=>{e.notification.close();const d=e.notification.data||{};const url=d.url||"./";
 e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(list=>{for(const c of list){if(c.url.indexOf(self.registration.scope)===0&&"focus" in c){c.postMessage({go:d.go});return c.focus()}}return self.clients.openWindow(url)}))});
