document.addEventListener("shopify:section:load",(e=>{e.target.querySelector(".splide")&&e.target.querySelectorAll(".splide").forEach((e=>{makeSlideshow(e)}))})),document.addEventListener("shopify:section:unload",(e=>{e.target.querySelector(".splide")&&e.target.querySelectorAll(".splide").forEach((e=>{destroySlideshow(e)}))})),document.addEventListener("shopify:block:select",(e=>{const t=e.target,o=e.target.closest(".splide");if(!o)return;const s=Array.from(t.closest(".splide__list").children).indexOf(t);window.slideshows[o.id].go(s)})),document.addEventListener("shopify:section:select",(e=>{e.target.querySelector('[x-data="ThemeSection_Sidebar"]')&&Alpine.store("modals").open("nav")})),document.addEventListener("shopify:section:deselect",(e=>{e.target.querySelector('[x-data="ThemeSection_Sidebar"]')&&Alpine.store("modals").close("nav")}));