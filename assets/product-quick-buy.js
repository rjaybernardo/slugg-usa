window.ThemeSection_ProductQuickBuy=({product:t,variant:e,featuredMediaID:i})=>({productRoot:null,product:t,current_variant:e,featured_media_id:i,current_media_id:i,loading:!1,quantity:"1",options:[],optionHandles:[],addedToCart:!1,get currentVariantId(){return this.current_variant?this.current_variant.id:null},get currentVariantAvailable(){return this.current_variant?this.current_variant.available:null},get current_price(){return this.current_variant.price},formatMoney:t=>formatMoney(t,theme.moneyFormat),init(){this.productRoot=this.$root,this.$refs.productForm&&this.$refs.productForm.addEventListener("submit",this.submitForm.bind(this)),this.getOptions()},mainSelectorChange(){const t=ShopifyProduct.getVariantFromId(this.product,parseInt(this.$refs.singleVariantSelector.value));this.updateVariant(t)},optionChange(){this.getOptions();const t=ShopifyProduct.getVariantFromOptionArray(this.product,this.options);this.updateVariant(t)},updateVariant(t){this.current_variant=t,this.current_variant&&this.current_variant.featured_media&&(this.current_media_id=this.current_variant.featured_media.id)},getOptions(){this.options=[],this.optionHandles=[],this.$root.querySelectorAll("[data-single-option-selector]").forEach((t=>{if("SELECT"===t.nodeName){const e=t.value;this.options.push(e),this.optionHandles.push(t.options[t.selectedIndex].dataset.handle)}else if(t.checked){const e=t.value;this.options.push(e),this.optionHandles.push(t.dataset.handle)}}))},submitForm(t){t.preventDefault(),this.loading=!0,liveRegion(window.theme.strings.loading);const e=new FormData(this.$root.querySelector(".quick-buy-product-form"));let i="modal"===theme.settings.cart_type;const r=fetchConfigDefaults("javascript");i&&(e.append("sections","cart-items,cart-footer,cart-item-count"),e.append("sections_url",window.location.pathname)),r.body=e,r.headers["X-Requested-With"]="XMLHttpRequest",delete r.headers["Content-Type"],fetch(`${theme.routes.cart_add_url}`,r).then((t=>t.json())).then((t=>{this.loading=!1,this.addedToCart=!0,i&&document.body.dispatchEvent(new CustomEvent("shapes:modalcart:afteradditem",{bubbles:!0,detail:{response:t}})),document.querySelector('[data-show-on-add="true"]')||this.$refs.added&&this.$nextTick((()=>this.$refs.added.focus()))})).catch((t=>{t.json().then((t=>{this.loading=!1,alert(t.description)}))}))}});