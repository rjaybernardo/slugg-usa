window.ThemeSection_AgeCheck=e=>({authenticated:!1,mode:e.mode,date_format:e.date_format,minimum_age:e.minimum_age,redirect_url:e.redirect_url,month:"",day:"",year:"",date:"",get fullDate(){return`${this.month}/${this.day}/${this.year}`},mounted(){null===this.redirect_url&&(this.redirect_url="https://www.google.com"),"dob"===this.mode&&(this.date=new Date,this.setUpDOB())},approveEntry(){this.authenticated=!0},denyEntry(){window.location=this.redirect_url},checkInput(e){switch(e){case"day":return parseInt(this.day)>0&&parseInt(this.day)<32;case"month":return parseInt(this.month)>0&&parseInt(this.month)<13;case"year":return parseInt(this.year)<this.date.getFullYear()&&parseInt(this.year)>1900}return!0},checkAge(){let e=Math.round(this.date.getTime()/1e3),t=Math.round(new Date(`${this.fullDate}`).getTime()/1e3);Math.floor((e-t)/31536e3)>parseInt(this.minimum_age)?this.approveEntry():this.denyEntry()},setUpDOB(){"dd-mm-yyyy"===this.date_format?this.$refs.day.focus():this.$refs.month.focus(),this.$el.getElementsByClassName("dob-form")[0].onkeyup=e=>{if("9"==(e.keyCode||e.which))return!1;var t=e.srcElement||e.target,r=parseInt(t.attributes.maxlength.value,10),i=t.value.length;if(i>=r){if(!this.checkInput(t.getAttribute("name")))return t.value="",!1;for(var n=t.closest(".input-grid-item");(n=n.nextElementSibling)&&null!=n;){let e=n.querySelector("input");if(null!==e){e.focus();break}}}else if(0===i)for(var a=t.closest(".input-grid-item");(a=a.previousElementSibling)&&null!=a;){let e=a.querySelector("input");if(null!==e){e.focus();break}}this.checkInput("day")&&this.checkInput("month")&&this.checkInput("year")&&this.checkAge()}}});