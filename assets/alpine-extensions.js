const{mutateDom:mutateDom,initTree:initTree}=Alpine;Alpine.magic("fetchedSection",(()=>(e,t)=>async()=>await fetchSectionHTML(e,t))),Alpine.directive("html-if-set",((e,{expression:t},{effect:i,evaluateLater:n})=>{let o=n(t);function a(){return e._x_custom_initialHTML}i((()=>{let t;o((i=>{Boolean(i)?(t=i,a()||(e._x_custom_initialHTML=e.innerHTML)):a()&&(t=a()),t&&mutateDom((()=>{e.innerHTML=t,e._x_ignoreSelf=!0,initTree(e),delete e._x_ignoreSelf}))}))}))})),document.addEventListener("DOMContentLoaded",(()=>{Alpine.start()}));