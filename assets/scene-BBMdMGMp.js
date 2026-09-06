const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/postfx-Dt5hJ9Xn.js","assets/three-C37LD9ZS.js"])))=>i.map(i=>d[i]);
import{n as e,t}from"./index-9QVBJbbb.js";import{A as n,C as r,D as i,L as a,M as o,N as s,O as c,P as l,R as u,S as d,T as f,_ as p,a as m,b as h,c as g,f as _,g as v,h as y,i as b,j as x,m as S,n as C,o as w,p as T,r as E,t as D,u as O,v as k,w as A,y as j,z as M}from"./three-C37LD9ZS.js";function N(){let e=e=>typeof matchMedia==`function`&&matchMedia(e).matches,t=e(`(prefers-reduced-motion: reduce)`),n=e(`(pointer: coarse)`),r=!1;try{let e=document.createElement(`canvas`);r=!!(e.getContext(`webgl2`)||e.getContext(`webgl`))}catch{r=!1}let i=navigator.hardwareConcurrency||4,a=navigator.deviceMemory||8,o=window.innerWidth<720,s=`mid`;o||i<=4||a<=4?s=`low`:i>=8&&(window.devicePixelRatio||1)>=1.5&&(s=`high`);let c=Math.min(window.devicePixelRatio||1,s===`low`?1.25:2),l={low:6e3,mid:14e3,high:24e3}[s];return{webgl:r,reducedMotion:t,coarse:n,tier:s,dpr:c,particles:l,bloom:s!==`low`&&!t}}var P=`vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

uniform float uTime;
uniform float uAmp;
uniform float uMorph;
uniform float uHotT;
uniform float uPixelRatio;
uniform float uSize;
uniform vec3 uHot;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform sampler2D uContrib;

attribute float aRand;
attribute float aWeek;
attribute float aDay;

varying vec3 vColor;
varying float vAlpha;

void main() {
  
  float c = texture2D(uContrib, vec2((aWeek + 0.5) / 53.0, (aDay + 0.5) / 7.0)).r;
  vec3 dir = normalize(position);

  
  
  float n = snoise(dir * 2.2 + vec3(0.0, uTime * 0.12, uTime * 0.07));
  float spike = c * (0.5 + 0.5 * sin(uTime * 1.8 + aWeek * 0.45 + aRand * 6.2831));
  float radial = 1.0 + uAmp * (0.10 * n + 0.42 * spike);
  vec3 spherePos = position * radial;

  
  float wx = (aWeek / 52.0 - 0.5) * 6.0;
  float wz = (aDay / 6.0 - 0.5) * 1.4;
  float wave = c * (0.6 + 0.6 * sin(uTime * 1.6 + aWeek * 0.25 + aRand * 2.0)) * uAmp;
  vec3 planePos = vec3(wx, -1.35 + wave * 1.1 + 0.03 * n, wz);

  float m = smoothstep(0.0, 1.0, uMorph);
  vec3 p = mix(spherePos, planePos, m);

  
  float d = distance(p, uHot);
  float ripple = exp(-d * 2.5) * sin(uHotT * 7.0 - d * 9.0) * uHotT;
  p += dir * 0.18 * ripple;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  float sizeBoost = 0.55 + 1.6 * c + 0.3 * aRand;
  gl_PointSize = uSize * uPixelRatio * sizeBoost * (6.0 / -mv.z);

  vColor = mix(uColorA, uColorB, clamp(c * 1.4 + 0.15 * n, 0.0, 1.0));
  vAlpha = (0.28 + 0.72 * c) * (0.7 + 0.3 * aRand);
}`,F=`uniform float uOpacity;

varying vec3 vColor;
varying float vAlpha;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float a = smoothstep(0.5, 0.08, d);
  a *= a;
  gl_FragColor = vec4(vColor * (0.6 + 0.8 * a), a * vAlpha * uOpacity);
}`,I=53,L=7,R=1.6;function z(e){let t=new Float32Array(e*3),n=new Float32Array(e),r=new Float32Array(e),i=new Float32Array(e),a=Math.PI*(3-Math.sqrt(5));for(let o=0;o<e;o+=1){let s=1-o/(e-1)*2,c=Math.sqrt(1-s*s),l=a*o,u=Math.cos(l)*c,d=Math.sin(l)*c;t.set([u*R,s*R,d*R],o*3),n[o]=Math.random();let f=(Math.atan2(d,u)+Math.PI)/(2*Math.PI),p=Math.acos(s)/Math.PI;r[o]=Math.min(52,Math.floor(f*I)),i[o]=Math.min(6,Math.floor(p*L))}let o=new b;return o.setAttribute(`position`,new E(t,3)),o.setAttribute(`aRand`,new E(n,1)),o.setAttribute(`aWeek`,new E(r,1)),o.setAttribute(`aDay`,new E(i,1)),o.computeBoundingSphere(),o}function B(e){let t=new Uint8Array(1484),n=e?.days||[],r=Math.max(1,e?.peak||0);if(n.length){let e=new Date(`${n[0].d}T00:00:00Z`).getUTCDay();n.forEach((n,i)=>{let a=i+e,o=Math.floor(a/7),s=a%7;if(o>=I)return;let c=Math.sqrt(n.c/r),l=(s*I+o)*4;t[l]=Math.round(c*255),t[l+3]=255})}let i=new g(t,I,L,f,a);return i.magFilter=j,i.minFilter=j,i.generateMipmaps=!1,i.needsUpdate=!0,i}function V(e){let t=z(e.particles),n={uTime:{value:0},uAmp:{value:e.reducedMotion?.35:.9},uMorph:{value:0},uHot:{value:new M(99,99,99)},uHotT:{value:0},uPixelRatio:{value:e.dpr},uSize:{value:e.tier===`low`?2.2:1.9},uOpacity:{value:1},uColorA:{value:new w(`#22d3ee`)},uColorB:{value:new w(`#a78bfa`)},uContrib:{value:B(null)}},i;try{i=new x({uniforms:n,vertexShader:P,fragmentShader:F,transparent:!0,depthWrite:!1,blending:2})}catch{i=new A({size:.02,color:2282478,transparent:!0,opacity:.7})}let a=new r(t,i);a.frustumCulled=!1;let o=new O;o.add(a);let s=n.uAmp.value;return{object:o,uniforms:n,setCalendar(e){let t=n.uContrib.value;n.uContrib.value=B(e),t?.dispose()},ripple(e){n.uHot.value.copy(e),n.uHotT.value=1},update(t,r,i){n.uTime.value=t;let a=1-Math.exp(-r*3);n.uMorph.value+=(i.morph-n.uMorph.value)*(e.reducedMotion?1:a),s=(e.reducedMotion?.35:.9)*i.amp,n.uAmp.value+=(s-n.uAmp.value)*a,n.uHotT.value*=Math.exp(-r*1.4);let c=n.uMorph.value;e.reducedMotion||(o.rotation.y+=r*.045*(1-c));let l=Math.round(o.rotation.y/(Math.PI*2))*Math.PI*2;o.rotation.y+=(l-o.rotation.y)*a*c},dispose(){t.dispose(),i.dispose(),n.uContrib.value?.dispose()}}}var H=`attribute float aAngle;
attribute float aLevel;

uniform float uHead;

varying float vGlow;
varying float vLevel;
varying float vY;

void main() {
  
  float d = abs(mod(aAngle - uHead + 3.14159265, 6.28318531) - 3.14159265);
  vGlow = exp(-d * d * 60.0);
  vLevel = aLevel;
  vY = position.y;

  vec4 local = vec4(position, 1.0);
  
  local.y *= 1.0 + vGlow * 0.35;
  gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * local;
}`,U=`uniform vec3 uColorLow;
uniform vec3 uColorHigh;
uniform vec3 uColorHot;
uniform float uOpacity;

varying float vGlow;
varying float vLevel;
varying float vY;

void main() {
  vec3 c = mix(uColorLow, uColorHigh, vLevel);
  c = mix(c, uColorHot, vGlow);
  
  c *= 0.7 + 0.4 * vY + 0.45 * vGlow;
  float a = uOpacity * (0.35 + 0.65 * vLevel + vGlow);
  gl_FragColor = vec4(c, clamp(a, 0.0, 1.0));
}`,W=2.45,G=-1.2,K=371;function q(e){let t=new C(.026,1,.026);t.translate(0,.5,0),t.setAttribute(`aAngle`,new T(new Float32Array(K),1)),t.setAttribute(`aLevel`,new T(new Float32Array(K),1));let n={uHead:{value:0},uOpacity:{value:.15},uColorLow:{value:new w(`#1e3a5f`)},uColorHigh:{value:new w(`#22d3ee`)},uColorHot:{value:new w(`#f0abfc`)}},r=new x({uniforms:n,vertexShader:H,fragmentShader:U,transparent:!0,depthWrite:!0}),i=new S(t,r,K);i.count=0,i.frustumCulled=!1;let a=new p(new o(.05,12,12),new k({color:15772668,transparent:!0,opacity:.9}));a.visible=!1;let s=new O;s.add(i,a);let c=[],l=e.reducedMotion?.08:.32,u=new h;function d(e){c=(e?.days||[]).slice(-371);let n=Math.max(1,e?.peak||0),r=c.length,o=t.getAttribute(`aAngle`),s=t.getAttribute(`aLevel`);if(c.forEach((e,t)=>{let a=t/r*Math.PI*2,c=Math.sqrt(e.c/n),l=.04+.85*c;u.position.set(Math.cos(a)*W,G,Math.sin(a)*W),u.rotation.set(0,-a,0),u.scale.set(1,l,1),u.updateMatrix(),i.setMatrixAt(t,u.matrix),o.setX(t,a),s.setX(t,c)}),i.count=r,i.instanceMatrix.needsUpdate=!0,o.needsUpdate=!0,s.needsUpdate=!0,r){let e=(r-1)/r*Math.PI*2,t=c[r-1];a.position.set(Math.cos(e)*W,-1.16+.85*Math.sqrt(t.c/n)+.1,Math.sin(e)*W),a.visible=!0}}return{object:s,mesh:i,dayAt(e){return c[e]||null},update(e,t,r){n.uHead.value=(n.uHead.value+t*l*(.4+.6*r.ring))%(Math.PI*2);let i=1-Math.exp(-t*3);n.uOpacity.value+=(r.ring-n.uOpacity.value)*i,a.material.opacity=.5+.5*Math.sin(e*3.2);let o=1+.35*Math.sin(e*3.2);a.scale.setScalar(o*(.6+.4*r.ring))},setSpeed(e){l=e},setCalendar:d,dispose(){t.dispose(),r.dispose(),a.geometry.dispose(),a.material.dispose()}}}function J(){let e=document.createElement(`canvas`);e.width=64,e.height=64;let t=e.getContext(`2d`),n=t.createRadialGradient(32,32,0,32,32,32);n.addColorStop(0,`rgba(255,255,255,1)`),n.addColorStop(.35,`rgba(255,255,255,0.35)`),n.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=n,t.fillRect(0,0,64,64);let r=new m(e);return r.colorSpace=c,r}function Y(e,t){let n=new O,r=J(),i=new _(.07,2),a=[],o=null,c=new M;function u(){for(let e of a)n.remove(e.pivot),e.core.material.dispose(),e.sprite.material.dispose(),e.orbit.geometry.dispose(),e.orbit.material.dispose(),e.label.remove();a.length=0}function d(e){u(),e.slice(0,9).forEach((e,o)=>{let c=new w(e.languageColor||`#8b949e`),u=new p(i,new k({color:c,transparent:!0,opacity:1})),d=new s(new l({map:r,color:c,transparent:!0,opacity:.55,blending:2,depthWrite:!1})),f=.42+.16*Math.log1p(e.stars||0);d.scale.setScalar(f);let m=2.15+.22*o,h=[];for(let e=0;e<=96;e+=1){let t=e/96*Math.PI*2;h.push(new M(Math.cos(t)*m,0,Math.sin(t)*m))}let g=new v(new b().setFromPoints(h),new y({color:9417727,transparent:!0,opacity:.08})),_=new O;_.rotation.set(.35+o*.28,o*.9,.1*o),_.add(g,u,d),n.add(_);let x=document.createElement(`div`);x.className=`label`,x.style.setProperty(`--dot`,e.languageColor||`#8b949e`),x.textContent=e.language?`${e.name} · ${e.language}`:e.name,t.append(x),a.push({name:e.name,core:u,sprite:d,orbit:g,pivot:_,label:x,radius:m,phase:o*2.399,speed:.16/(1+o*.18),scale:1,angle:o*2.399})})}function f(t,n){let r=e.reducedMotion?t.phase:t.phase+n*t.speed;t.angle=r,t.core.position.set(Math.cos(r)*t.radius,0,Math.sin(r)*t.radius),t.sprite.position.copy(t.core.position)}return{object:n,meshes:()=>a.map(e=>e.core),nameOf(e){return a.find(t=>t.core===e)?.name||null},worldPositionOf(e){let t=a.find(t=>t.name===e);return t?t.core.getWorldPosition(c.clone()):null},setHot(e){o=e;for(let t of a)t.label.classList.toggle(`hot`,t.name===e)},getHot:()=>o,setRepos:d,update(e,t,n,r,i){let s=1-Math.exp(-t*6),l=i===`work`,u=window.innerWidth,d=window.innerHeight,p=l?document.getElementById(`repos`)?.getBoundingClientRect():null;for(let t of a){f(t,e);let i=t.name===o?1.7:1;t.scale+=(i-t.scale)*s,t.core.scale.setScalar(t.scale);let a=t.name===o?1:n.nodes;t.core.material.opacity+=(a-t.core.material.opacity)*s,t.sprite.material.opacity+=(a*.45-t.sprite.material.opacity)*s,t.orbit.material.opacity+=(n.nodes*.12-t.orbit.material.opacity)*s,t.core.getWorldPosition(c).project(r);let m=(c.x*.5+.5)*u,h=(-c.y*.5+.5)*d,g=c.z<1&&Math.abs(c.x)<1.1&&Math.abs(c.y)<1.1;g&&p&&t.name!==o&&(g=!(m>p.left-20&&m<p.right+20&&h>p.top-20&&h<p.bottom+20)),t.label.style.transform=`translate3d(${m.toFixed(1)}px, ${(h-28).toFixed(1)}px, 0) translateX(-50%)`,t.label.classList.toggle(`show`,g&&(l||t.name===o))}},dispose(){u(),i.dispose(),r.dispose()}}}var X=[`hero`,`now`,`work`,`live`,`highlights`,`activity`,`stack`,`contact`],Z={hero:{pos:[0,.2,5.4],look:[0,0,0],side:1,morph:0,ring:.07,nodes:.35,amp:1},now:{pos:[1.6,.9,4.6],look:[.3,.1,0],side:1,morph:.35,ring:.07,nodes:.5,amp:.8},work:{pos:[0,2.6,6.8],look:[0,0,0],side:0,morph:0,ring:.12,nodes:1,amp:.7},live:{pos:[-2.4,-1.2,6.4],look:[0,.8,0],side:0,morph:.1,ring:.1,nodes:.6,amp:.85},highlights:{pos:[2.6,1.4,5.2],look:[-.2,.2,0],side:0,morph:.5,ring:.1,nodes:.4,amp:.9},activity:{pos:[0,6.8,.6],look:[0,-1.2,0],side:0,morph:1,ring:1,nodes:.15,amp:1},stack:{pos:[-2.6,.4,4.8],look:[0,0,0],side:1,morph:.2,ring:.1,nodes:.3,amp:.9},contact:{pos:[0,-.6,6.6],look:[0,.4,0],side:0,morph:0,ring:.2,nodes:.4,amp:.6}},Q=e=>e*e*(3-2*e),$=(e,t,n)=>e+(t-e)*n;function ee(e,t,n=X){let r=new M().fromArray(Z.hero.pos),i=new M,a=new M,o=new M,s={morph:0,ring:.12,nodes:.35,amp:1},c=new u,l=!0,d=n.filter(e=>Z[e]);function f(e){return Z[d[Math.max(0,Math.min(d.length-1,e))]]}function p(){let e=window.innerWidth,t=e<720;return{side:e>900?-1.15:0,zoom:t?1.5:e<1e3?1.2:1,lift:t?.7:0}}function m(e){let n=Math.floor(e),r=t.reducedMotion?Math.round(e-n):Q(Math.min(1,Math.max(0,e-n))),i=f(n),c=f(n+1),{side:l,zoom:u,lift:d}=p();o.set($(i.look[0]+i.side*l,c.look[0]+c.side*l,r),$(i.look[1]+i.side*d,c.look[1]+c.side*d,r),$(i.look[2],c.look[2],r)),a.set($(i.pos[0],c.pos[0],r),$(i.pos[1],c.pos[1],r),$(i.pos[2],c.pos[2],r)),a.sub(o).multiplyScalar(u).add(o),s.morph=$(i.morph,c.morph,r),s.ring=$(i.ring,c.ring,r),s.nodes=$(i.nodes,c.nodes,r),s.amp=$(i.amp,c.amp,r)}return{state:s,setOrder(e){d=e.filter(e=>Z[e])},setPointer(e,t){c.set(e,t)},update(n,s){m(n);let u=l||t.reducedMotion?1:1-Math.exp(-s*3.2);l=!1,r.lerp(a,u),i.lerp(o,u),e.position.copy(r),!t.reducedMotion&&!t.coarse&&(e.position.x+=c.x*.25,e.position.y+=c.y*.15),e.lookAt(i)}}}function te(e){let t=e,n=[];function r(){n=t.map(e=>e.offsetTop+e.offsetHeight/2),n.length&&(n[0]=Math.min(n[0],window.innerHeight/2))}r();let i=0,a=()=>{cancelAnimationFrame(i),i=requestAnimationFrame(r)};return window.addEventListener(`resize`,a),window.addEventListener(`orientationchange`,a),`ResizeObserver`in window&&new ResizeObserver(a).observe(document.body),setTimeout(r,600),{measure:r,setPanels(e){t=e,r()},progress(){let e=window.scrollY+window.innerHeight*.5,t=n.length;if(!t||e<=n[0])return 0;if(e>=n[t-1])return t-1;let r=0;for(;r<t-2&&e>=n[r+1];)r+=1;let i=Math.max(1,n[r+1]-n[r]);return r+Math.max(0,Math.min(1,(e-n[r])/i))}}}async function ne(r,a,o){let s=N();if(!s.webgl)return null;let l;try{l=new D({canvas:r,antialias:s.tier!==`low`,powerPreference:`high-performance`,alpha:!1,stencil:!1})}catch(e){return console.warn(`WebGLRenderer failed`,e),null}l.setPixelRatio(s.dpr),l.setSize(window.innerWidth,window.innerHeight,!1),l.outputColorSpace=c,l.toneMapping=4,l.toneMappingExposure=1.15,l.setClearColor(329485,1);let f=new n,p=new d(45,window.innerWidth/window.innerHeight,.1,100),m=document.getElementById(`labels`),h=document.getElementById(`tooltip`),g=V(s),_=q(s),v=Y(s,m);f.add(g.object,_.object,v.object);let y=()=>X.map(e=>document.querySelector(`[data-scene="${e}"]`)).filter(e=>e&&!e.hidden),b=te(y()),x=ee(p,s,y().map(e=>e.dataset.scene));function S(){let e=y();b.setPanels(e),x.setOrder(e.map(e=>e.dataset.scene))}let C=null;if(s.bloom)try{let{createComposer:e}=await t(async()=>{let{createComposer:e}=await import(`./postfx-Dt5hJ9Xn.js`);return{createComposer:e}},__vite__mapDeps([0,1]));C=e(l,f,p)}catch(e){console.warn(`Bloom unavailable, rendering without post-processing.`,e)}function w(e,t){g.setCalendar(e.calendar),_.setCalendar(e.calendar),v.setRepos(t||[])}w(a,o);let T=document.body.dataset.section||`hero`;document.addEventListener(`section:change`,e=>{T=e.detail.name});let E=new i,O=new u(-10,-10),k=!1,A=null;function j(t,n){let r=v.getHot();if(n){if(r===t)return;v.setHot(t);let n=v.worldPositionOf(t);n&&g.ripple(n),e(t,!0)}else(r===t||t==null)&&(v.setHot(null),e(r,!1))}document.addEventListener(`repo:hover`,e=>j(e.detail.name,e.detail.on));function M(e){O.set(e.clientX/window.innerWidth*2-1,-(e.clientY/window.innerHeight)*2+1),k=!0,x.setPointer(O.x,O.y)}window.addEventListener(`pointermove`,M,{passive:!0}),window.addEventListener(`pointerleave`,()=>{k=!1});function P(){if(!k)return;E.setFromCamera(O,p);let e=E.intersectObjects(v.meshes(),!1),t=e.length?v.nameOf(e[0].object):null;if(t)r.style.cursor=`pointer`,v.getHot()!==t&&j(t,!0);else{r.style.cursor=``;let e=v.getHot();e&&!document.querySelector(`.repo[data-repo="${CSS.escape(e)}"]:hover, .repo[data-repo="${CSS.escape(e)}"]:focus-within`)&&j(e,!1)}if(T===`activity`&&_.mesh.count){let e=E.intersectObject(_.mesh,!1),t=e.length?_.dayAt(e[0].instanceId):null;t&&t!==A?(A=t,h.textContent=`${t.d} · ${t.c} contribution${t.c===1?``:`s`}`,h.hidden=!1):!t&&A&&(A=null,h.hidden=!0),t&&(h.style.left=`${(O.x+1)/2*window.innerWidth}px`,h.style.top=`${(1-O.y)/2*window.innerHeight}px`)}else A&&(A=null,h.hidden=!0)}window.addEventListener(`click`,t=>{if(t.target!==r)return;E.setFromCamera(O,p);let n=E.intersectObjects(v.meshes(),!1);if(!n.length)return;let i=v.nameOf(n[0].object);j(i,!0),e(i,!0,{scroll:!0}),document.querySelector(`.repo[data-repo="${CSS.escape(i)}"] a`)?.focus({preventScroll:!0})});function F(){let e=window.innerWidth,t=window.innerHeight;p.aspect=e/t,p.updateProjectionMatrix(),l.setSize(e,t,!1),C?.setSize(e,t)}let I=0;window.addEventListener(`resize`,()=>{cancelAnimationFrame(I),I=requestAnimationFrame(F)});let L=!0,R=performance.now(),z=0,B=0;function H(e){if(!L)return;let t=Math.min(.05,(e-R)/1e3);R=e,z+=t*(s.reducedMotion?.3:1),x.update(b.progress(),t);let n=x.state;g.update(z,t,n),_.update(z,t,n),v.update(z,t,n,p,T),(B+=1)%2==0&&P(),C?C.render():l.render(f,p),requestAnimationFrame(H)}return requestAnimationFrame(H),document.addEventListener(`visibilitychange`,()=>{let e=!document.hidden;e&&!L?(L=!0,R=performance.now(),requestAnimationFrame(H)):e||(L=!1)}),{setData:w,measure:S,highlight:j,caps:s,destroy(){L=!1,C?.dispose(),g.dispose(),_.dispose(),v.dispose(),l.dispose()}}}export{ne as createScene};