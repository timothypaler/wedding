/* Light, material responses and small interactions around the native-scroll invitation. */
(() => {
 'use strict';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)');
 const root=document.documentElement,body=document.body,stage=document.querySelector('#cover-stage');
 const clamp=(value,min=0,max=1)=>Math.min(max,Math.max(min,value));
 let lightFrame=0,openingFrame=0,openingStart=0,openingDuration=7200,lightX=.5,lightY=.4;
 function paintLight(){
  lightFrame=0;
  stage.style.setProperty('--glass-light-x',`${(lightX*100).toFixed(2)}%`);
  stage.style.setProperty('--glass-light-y',`${(lightY*100).toFixed(2)}%`);
  stage.style.setProperty('--brass-light-angle',`${(76+lightX*28).toFixed(2)}deg`);
 }
 function queueLight(){if(!lightFrame)lightFrame=requestAnimationFrame(paintLight);}
 addEventListener('pointermove',event=>{
  if(reduced.matches||!fine.matches||!body.classList.contains('is-closed'))return;
  const rect=stage.getBoundingClientRect();
  lightX=clamp((event.clientX-rect.left)/rect.width);lightY=clamp((event.clientY-rect.top)/rect.height);queueLight();
 },{passive:true});
 function clearOpening(){cancelAnimationFrame(openingFrame);openingFrame=0;root.style.setProperty('--opening-cast','0');}
 function openingLight(now){
  const progress=clamp((now-openingStart)/openingDuration),arc=Math.sin(Math.PI*progress);
  root.style.setProperty('--opening-cast',(arc*.24).toFixed(4));
  root.style.setProperty('--cast-x',`${(-55+progress*110).toFixed(2)}px`);
  root.style.setProperty('--cast-angle',`${(-8+progress*16).toFixed(2)}deg`);
  root.style.setProperty('--opening-progress',progress.toFixed(4));
  lightX=.18+progress*.7;lightY=.28+arc*.3;paintLight();
  if(progress<1&&body.classList.contains('is-opening')&&!document.hidden)openingFrame=requestAnimationFrame(openingLight);
  else clearOpening();
 }
 addEventListener('invitation:opening',event=>{
  clearOpening();if(reduced.matches)return;
  openingStart=performance.now();openingDuration=event.detail.duration;openingFrame=requestAnimationFrame(openingLight);
 });
 addEventListener('invitation:opened',clearOpening);
 addEventListener('invitation:replay',()=>{clearOpening();root.style.setProperty('--opening-progress','0');lightX=.5;lightY=.4;queueLight();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)clearOpening();else if(body.classList.contains('is-opening')&&!reduced.matches)openingFrame=requestAnimationFrame(openingLight);});
 reduced.addEventListener('change',()=>{if(reduced.matches)clearOpening();});
 addEventListener('pagehide',()=>{clearOpening();cancelAnimationFrame(lightFrame);});
 paintLight();

 const pins=[...document.querySelectorAll('.venue-pin')];
 function chooseVenue(pin,focus=false){
  for(const item of pins){const selected=item===pin;item.setAttribute('aria-selected',String(selected));item.tabIndex=selected?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!selected;}
  document.querySelector('.venue-explorer').dataset.selected=pin.dataset.venue;
  const panel=document.getElementById(pin.getAttribute('aria-controls'));
  if(!reduced.matches)panel.animate([{opacity:.4,transform:'translateY(7px)'},{opacity:1,transform:'none'}],{duration:450,easing:'cubic-bezier(.2,.7,.2,1)'});
  if(focus)pin.focus({preventScroll:true});
 }
 pins.forEach((pin,index)=>{
  pin.addEventListener('click',()=>chooseVenue(pin));
  pin.addEventListener('keydown',event=>{
   let next=index;
   if(['ArrowRight','ArrowDown'].includes(event.key))next=(index+1)%pins.length;
   else if(['ArrowLeft','ArrowUp'].includes(event.key))next=(index+pins.length-1)%pins.length;
   else if(event.key==='Home')next=0;else if(event.key==='End')next=pins.length-1;else return;
   event.preventDefault();chooseVenue(pins[next],true);
  });
 });

 document.querySelectorAll('.photo-gallery .picture-frame').forEach(frame=>{
  const light=document.createElement('span');light.className='frame-light';light.setAttribute('aria-hidden','true');frame.append(light);
  let rect,raf=0,x=.5,y=.5;
  function paint(){raf=0;frame.style.setProperty('--frame-rx',`${((.5-y)*3).toFixed(2)}deg`);frame.style.setProperty('--frame-ry',`${((x-.5)*4).toFixed(2)}deg`);frame.style.setProperty('--frame-light-x',`${(x*100).toFixed(1)}%`);}
  frame.addEventListener('pointerenter',()=>{rect=frame.getBoundingClientRect();});
  frame.addEventListener('pointermove',event=>{if(reduced.matches||!fine.matches)return;rect=rect||frame.getBoundingClientRect();x=clamp((event.clientX-rect.left)/rect.width);y=clamp((event.clientY-rect.top)/rect.height);if(!raf)raf=requestAnimationFrame(paint);},{passive:true});
  frame.addEventListener('pointerleave',()=>{cancelAnimationFrame(raf);raf=0;rect=null;frame.style.setProperty('--frame-rx','0deg');frame.style.setProperty('--frame-ry','0deg');frame.style.setProperty('--frame-light-x','50%');});
 });
})();
