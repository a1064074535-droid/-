self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("notificationclick",e=>{e.notification.close();const d=e.notification.data||{};const url=d.url||"./";
 e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(list=>{for(const c of list){if(c.url.indexOf(self.registration.scope)===0&&"focus" in c){c.postMessage({go:d.go});return c.focus()}}return self.clients.openWindow(url)}))});
