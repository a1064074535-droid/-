const V="rafiq-v7",SHELL=["./","./index.html","./old.html","./mihrab.webp","./icon-192.png","./icon-512.png","./manifest.webmanifest","./hisn.json"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).catch(()=>{}));self.skipWaiting()});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!=="rafiq-rt").map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
const RT=/^https:\/\/(cdn\.jsdelivr\.net|raw\.githubusercontent\.com|fonts\.(googleapis|gstatic)\.com|lrojiuulqmucofspdqoq\.supabase\.co\/storage)\//;
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
 if(u.origin===location.origin){if(r.mode==="navigate"||/\.(html|json|webmanifest)$/.test(u.pathname)||u.pathname.endsWith("/")){
   e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match("./index.html"))));return}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res})));return}
 if(RT.test(r.url)&&!/\.mp3$/.test(u.pathname)){e.respondWith(caches.open("rafiq-rt").then(c=>c.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok&&(res.type==="basic"||res.type==="cors"))c.put(r,res.clone());return res}))))}});
self.addEventListener("push",e=>{let d={};try{d=e.data?e.data.json():{}}catch(_){d={body:e.data?e.data.text():""}}
 e.waitUntil(Promise.all([
  self.registration.showNotification(d.title||"رفيق الذكر",{body:d.body||"",tag:d.tag||"rafiq",renotify:true,icon:"icon-192.png",badge:"icon-192.png",dir:"rtl",lang:"ar",vibrate:[200,100,200],data:{url:d.url||"./",go:d.go||"today"}}),
  d.say&&!d.mute?self.clients.matchAll({type:"window",includeUncontrolled:true}).then(l=>l.forEach(c=>c.postMessage({say:d.say}))):null]))});
self.addEventListener("notificationclick",e=>{e.notification.close();const d=e.notification.data||{};const url=d.url||"./";
 e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(list=>{for(const c of list){if(c.url.indexOf(self.registration.scope)===0&&"focus" in c){c.postMessage({go:d.go});return c.focus()}}return self.clients.openWindow(url)}))});
