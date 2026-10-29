(() => {
'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const clamp=value=>Math.max(0,Math.min(1,value));
const chapters=[...document.querySelectorAll('.chapter')];
for(const [index,chapter] of chapters.entries()){
 if(chapter.classList.contains('cinematic'))continue;
 const flowers=document.createElement('div');flowers.className='floral-surround composition-'+(index%3);flowers.setAttribute('aria-hidden','true');
 flowers.innerHTML='<div class="floral-depth floral-back"><span class="floral-corner floral-left"></span><span class="floral-corner floral-right"></span></div><div class="floral-depth floral-front"><span class="floral-bouquet bouquet-upper"></span><span class="floral-bouquet bouquet-lower"></span></div>';
 chapter.prepend(flowers);
}
// One restrained reveal per editorial group; no repeated cover or ornamental overlays.
const selectors=['.story-images','.venue-art','.photo-gallery > button','.attire-illustration','.closing-monogram'];
const elements=[];
for(const selector of selectors){
 document.querySelectorAll(selector).forEach((element,index)=>{
  element.classList.add('editorial-reveal');
  element.style.setProperty('--reveal-delay',`${Math.min(index*.1,.3)}s`);
  elements.push(element);
 });
}
// Text enters in short, lightly staggered groups while the document scroll stays native.
const groupCounts=new Map();
const textElements=document.querySelectorAll('#pages h1,#pages h2,#pages h3,#pages p,#pages .scroll-cue,#pages .photo-label,#pages .cinematic-photo-note,#pages .time,#pages .palette > span,#pages .countdown,#pages .outlined,#pages .text-button,#pages summary,.masthead .top-links a,.masthead > .text-button,.site-footer > span,.site-footer > button');
for(const element of textElements){
 if(element.closest('.story-images,.photo-gallery > button,.rsvp form,.cinematic-type'))continue;
 const group=element.closest('.chapter-heading,.welcome-content,.timeline > div,.story-copy,.place-details > div,.attire-sheet,.rsvp-sheet,.closing-sheet,.cinematic-type,.accordions details')||element.parentElement;
 const index=groupCounts.get(group)||0;groupCounts.set(group,index+1);
 element.classList.add('editorial-reveal','text-pop');
 element.style.setProperty('--reveal-delay',`${element.closest('.welcome')?Math.min(index*.13,1.1):Math.min(index*.065,.2)}s`);
 elements.push(element);
}
elements.push(...document.querySelectorAll('.timeline > div'));
const replyForm=document.querySelector('#rsvp-form');replyForm.classList.add('editorial-reveal','text-pop');elements.push(replyForm);
const photoRecords=[];
for(const image of document.querySelectorAll('.story-main,.story-small,.photo-gallery img')){
 const frame=document.createElement('div');frame.className='picture-frame';
 const viewport=document.createElement('div');viewport.className='photo-viewport';
 image.before(frame);frame.append(viewport);viewport.append(image);
 for(const position of ['tl','tr','bl','br']){const ornament=document.createElementNS('http://www.w3.org/2000/svg','svg');ornament.setAttribute('class','frame-engraving engraving-'+position);ornament.setAttribute('viewBox','0 0 50 50');ornament.setAttribute('aria-hidden','true');ornament.innerHTML='<use href="#frame-engraving"></use>';frame.append(ornament);}
 const plate=document.createElement('span');plate.className='frame-monogram';plate.setAttribute('aria-hidden','true');plate.innerHTML='<svg viewBox="0 0 200 240"><use href="#suite-crest"></use></svg>';frame.append(plate);
 if(image.classList.contains('story-main')){frame.classList.add('story-main-frame');viewport.classList.add('story-viewport');}
 else if(image.classList.contains('story-small'))frame.classList.add('story-small-frame');
 else frame.classList.add('gallery-frame');
 photoRecords.push({image,viewport,top:0,height:0});
}
let revealObserver;
function observe(){
 revealObserver?.disconnect();
 if(!document.body.classList.contains('is-open'))return;
 if(reduced.matches||!('IntersectionObserver' in window)){elements.forEach(el=>el.classList.add('editorial-visible'));return;}
 revealObserver=new IntersectionObserver(entries=>{
  for(const entry of entries){
   if(entry.isIntersecting){entry.target.classList.add('editorial-visible');revealObserver.unobserve(entry.target);}
  }
 },{rootMargin:'0px 0px -4% 0px',threshold:.04});
 elements.forEach(el=>revealObserver.observe(el));
}
// Optical movement is confined to photographs within fixed masks.
// Text stays in document flow, with no blur, rotation or section-sized movement.
let raf=0,measureNeeded=true,vh=0,documentHeight=0;
let sectionRecords=[];
const cinematic=document.querySelector('.cinematic-scene'),cinemaChapter=document.querySelector('#together'),cinemaSlides=[...document.querySelectorAll('.cinema-slide')];
let cinemaTop=0,cinemaHeight=0,cinemaRun=1,cinemaStickyTop=0;
const smooth=value=>{const p=clamp(value);return p*p*(3-2*p);};
// A small, reusable set of blossoms travels only through the outer margins.
const flowerLayer=document.createElement('div');flowerLayer.className='falling-flowers';flowerLayer.setAttribute('aria-hidden','true');flowerLayer.inert=true;
const fallingFlowers=Array.from({length:10},(_,index)=>{
 const flower=document.createElement('span');flower.className='falling-flower '+(index%3===0?'whole-blossom':'rose-petal');
 if(index%3===0)flower.innerHTML='<svg viewBox="0 0 40 40" focusable="false"><g fill="currentColor" stroke="#874452bb" stroke-width=".85"><ellipse cx="20" cy="12" rx="6" ry="10"/><ellipse cx="20" cy="12" rx="6" ry="10" transform="rotate(72 20 20)"/><ellipse cx="20" cy="12" rx="6" ry="10" transform="rotate(144 20 20)"/><ellipse cx="20" cy="12" rx="6" ry="10" transform="rotate(216 20 20)"/><ellipse cx="20" cy="12" rx="6" ry="10" transform="rotate(288 20 20)"/></g><circle cx="20" cy="20" r="3" fill="#c6a15d"/></svg>';
 flowerLayer.append(flower);return {flower,seed:(index*.173)%1,side:index%2,speed:.64+(index%4)*.12};
});document.body.append(flowerLayer);
function paintFlowers(y){
 const phone=innerWidth<700;
 fallingFlowers.forEach(({flower,seed,side,speed},index)=>{
  if(phone&&index>=6)return;
  const phase=((y/Math.max(vh*1.35,1)*speed+seed)%1+1)%1;
  const edge=(phone?2:3)+(index%3)*(phone?1.6:2.6),sway=Math.sin(phase*Math.PI*2+index)*(phone?5:12);
  const x=(side?innerWidth*(1-edge/100):innerWidth*edge/100)+sway;
  const size=(index%3===0?28:19)*(phone?.8:1);
  flower.style.width=`${size}px`;flower.style.height=`${size}px`;
  flower.style.transform=`translate3d(${(x-size/2).toFixed(1)}px,${(phase*(vh+70)-35).toFixed(1)}px,0) rotate(${(index*39+phase*190).toFixed(1)}deg) rotateY(${(Math.sin(phase*6+index)*45).toFixed(1)}deg)`;
  flower.style.opacity=(smooth(phase/.12)*smooth((1-phase)/.16)*.9).toFixed(3);
 });
}
function measure(){
 vh=innerHeight;const y=scrollY;
 sectionRecords=chapters.map(chapter=>({chapter,top:chapter.getBoundingClientRect().top+y,height:chapter.offsetHeight}));
 for(const photo of photoRecords){const rect=photo.viewport.getBoundingClientRect();photo.top=rect.top+y;photo.height=rect.height;}
 if(cinematic){
  cinemaTop=cinemaChapter.getBoundingClientRect().top+y;
  cinemaHeight=cinematic.offsetHeight;
  cinemaStickyTop=parseFloat(getComputedStyle(cinematic).top)||0;
  cinemaRun=Math.max(1,cinemaChapter.offsetHeight-cinemaHeight);
 }
 documentHeight=document.documentElement.scrollHeight;measureNeeded=false;
}
function render(){
 raf=0;if(measureNeeded)measure();
 if(!document.body.classList.contains('is-open')||reduced.matches)return;
 const y=scrollY;paintFlowers(y);
 for(const record of sectionRecords){
  const top=record.top-y;
  if(top>vh*1.2||top+record.height<0)continue;
  const progress=clamp((vh*1.02-top)/(vh*.52));
  const eased=progress*progress*(3-2*progress);
  // The section is fully opaque before its heading reaches the reading area.
  record.chapter.style.setProperty('--chapter-opacity',(.78+.22*eased).toFixed(4));
  record.chapter.dataset.transitionProgress=eased.toFixed(3);
  const passage=clamp((vh-top)/(vh+record.height))-.5;
  record.chapter.style.setProperty('--floral-back-y',`${(passage*(innerWidth<700?10:18)).toFixed(2)}px`);
  record.chapter.style.setProperty('--floral-front-y',`${(passage*(innerWidth<700?28:56)).toFixed(2)}px`);
  if(record.chapter.matches('.rsvp,.farewell')){const dusk=clamp((vh-top)/(vh*.85));record.chapter.style.setProperty('--evening',dusk.toFixed(3));record.chapter.dataset.evening=dusk.toFixed(3);}

 }
 const travel=innerWidth<700?5:9;
 for(const photo of photoRecords){
  const top=photo.top-y;
  if(top>vh||top+photo.height<0)continue;
  const passage=clamp((vh-top)/(vh+photo.height));
  photo.image.style.setProperty('--photo-offset',`${((passage-.5)*travel*2).toFixed(2)}px`);
 }
 if(cinematic){
  // The timeline belongs to the containing chapter, not the moving image rect.
  // Both reveals finish during its sticky interval; the final photo holds before exit.
  const progress=clamp((y-(cinemaTop-cinemaStickyTop))/cinemaRun);
  const second=smooth((progress-.20)/.16),third=smooth((progress-.58)/.16);
  [1,second,third].forEach((reveal,index)=>{cinemaSlides[index].style.opacity='1';cinemaSlides[index].style.clipPath=index===0?'none':`inset(0 0 0 ${((1-reveal)*100).toFixed(3)}%)`;});
  cinematic.dataset.photoPosition=(second+third).toFixed(3);
  cinematic.dataset.sceneProgress=progress.toFixed(3);
 }
 document.documentElement.style.setProperty('--reading-progress',clamp(y/Math.max(1,documentHeight-vh)).toFixed(4));
}
function queue(){if(!raf)raf=requestAnimationFrame(render);}
addEventListener('scroll',queue,{passive:true});
addEventListener('resize',()=>{measureNeeded=true;queue();},{passive:true});
addEventListener('load',()=>{measureNeeded=true;queue();},{once:true});
new ResizeObserver(()=>{measureNeeded=true;queue();}).observe(document.querySelector('#pages'));
let wasOpen=false;
function syncReveals(){
 const isOpen=document.body.classList.contains('is-open');
 if(isOpen&&!wasOpen){wasOpen=true;observe();}
 else if(!isOpen&&wasOpen){wasOpen=false;revealObserver?.disconnect();elements.forEach(el=>el.classList.remove('editorial-visible'));}
 queue();
}
addEventListener('invitation:unveil',()=>{document.querySelectorAll('.welcome .text-pop').forEach(el=>el.classList.add('editorial-visible'));});
new MutationObserver(syncReveals).observe(document.body,{attributes:true,attributeFilter:['class']});
reduced.addEventListener('change',()=>{observe();queue();});
addEventListener('focusin',e=>{const element=e.target.closest('.editorial-reveal');if(element)element.classList.add('editorial-visible');});
document.body.classList.add('editorial-motion');syncReveals();
})();
