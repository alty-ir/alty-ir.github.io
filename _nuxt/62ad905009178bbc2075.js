(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{170:function(t,e,l){"use strict";var n={name:"Parallax",data:function(){return{styles:{},debounceTimeout:6}},mounted:function(){var t=this;window.addEventListener("scroll",(function(){window.innerWidth>991&&t.checkForParallax(window.scrollY)}))},methods:{handleScroll:function(t){var e=t/3;this.styles={transform:"translate3d(0, ".concat(e,"px,0)")}},checkForParallax:function(t){var e,l,n,d,o=this;(e=function(){return o.handleScroll(t)},l=this.debounceTimeout,function(){var t=this,o=arguments;clearTimeout(d),d=setTimeout((function(){d=null,n||e.apply(t,o)}),l),n&&!d&&e.apply(t,o)})()}}},d=l(8),component=Object(d.a)(n,(function(){var t=this.$createElement;return(this._self._c||t)("div",{style:this.styles},[this._t("default")],2)}),[],!1,null,"51d0d7c7",null);e.a=component.exports},183:function(t,e,l){"use strict";l.r(e);var n={components:{Parallax:l(170).a},data:function(){return{header:"/img/bg7.jpg",teamImg1:"/img/faces/avatar.jpg",teamImg2:"/img/faces/christian.jpg",teamImg3:"/img/faces/kendall.jpg",name:null,email:null,message:null}},computed:{headerStyle:function(){return{backgroundImage:"url(".concat(this.header,")")}}}},d=l(8),component=Object(d.a)(n,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"wrapper"},[l("parallax",{staticClass:"section page-header header-filter",style:t.headerStyle},[l("div",{staticClass:"container"},[l("div",{staticClass:"md-layout"},[l("div",{staticClass:"md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"},[l("h1",{staticClass:"title"},[t._v("Your Story Starts With Us.")]),t._v(" "),l("h4",[t._v("\n            Every landing page needs a small description after the big bold\n            title, that's why we added this text here. Add here all the\n            information that can make you or your product create the first\n            impression.\n          ")]),t._v(" "),l("br"),t._v(" "),l("md-button",{staticClass:"md-success md-lg",attrs:{href:"https://www.youtube.com/watch?v=dQw4w9WgXcQ",target:"_blank"}},[l("i",{staticClass:"fas fa-play"}),t._v(" Watch video")])],1)])])]),t._v(" "),l("div",{staticClass:"main main-raised"},[l("div",{staticClass:"section"},[l("div",{staticClass:"container"},[t._m(0),t._v(" "),l("div",{staticClass:"features text-center"},[l("div",{staticClass:"md-layout"},[l("div",{staticClass:"md-layout-item md-medium-size-33 md-small-size-100"},[l("div",{staticClass:"info"},[l("div",{staticClass:"icon icon-info"},[l("md-icon",[t._v("chat")])],1),t._v(" "),l("h4",{staticClass:"info-title"},[t._v("Free Chat")]),t._v(" "),l("p",[t._v("\n                  Divide details about your product or agency work into parts.\n                  Write a few lines about each one. A paragraph describing a\n                  feature will be enough.\n                ")])])]),t._v(" "),l("div",{staticClass:"md-layout-item md-medium-size-33 md-small-size-100"},[l("div",{staticClass:"info"},[l("div",{staticClass:"icon icon-success"},[l("md-icon",[t._v("verified_user")])],1),t._v(" "),l("h4",{staticClass:"info-title"},[t._v("Verified Users")]),t._v(" "),l("p",[t._v("\n                  Divide details about your product or agency work into parts.\n                  Write a few lines about each one. A paragraph describing a\n                  feature will be enough.\n                ")])])]),t._v(" "),l("div",{staticClass:"md-layout-item md-medium-size-33 md-small-size-100"},[l("div",{staticClass:"info"},[l("div",{staticClass:"icon icon-danger"},[l("md-icon",[t._v("fingerprint")])],1),t._v(" "),l("h4",{staticClass:"info-title"},[t._v("Fingerprint")]),t._v(" "),l("p",[t._v("\n                  Divide details about your product or agency work into parts.\n                  Write a few lines about each one. A paragraph describing a\n                  feature will be enough.\n                ")])])])])])])]),t._v(" "),l("div",{staticClass:"section text-center"},[l("div",{staticClass:"container"},[l("h2",{staticClass:"title"},[t._v("Here is our team")]),t._v(" "),l("div",{staticClass:"team"},[l("div",{staticClass:"md-layout"},[l("div",{staticClass:"md-layout-item md-medium-size-33 md-small-size-100"},[l("div",{staticClass:"team-player"},[l("md-card",{staticClass:"md-card-plain"},[l("div",{staticClass:"md-layout-item md-size-50 mx-auto"},[l("img",{staticClass:"img-raised rounded-circle img-fluid",attrs:{src:t.teamImg1,alt:"Thumbnail Image"}})]),t._v(" "),l("h4",{staticClass:"card-title"},[t._v("\n                    Gigi Hadid\n                    "),l("br"),t._v(" "),l("small",{staticClass:"card-description text-muted"},[t._v("Model")])]),t._v(" "),l("md-card-content",[l("p",{staticClass:"card-description"},[t._v("\n                      You can write here details about one of your team\n                      members. You can give more details about what they do.\n                      Feel free to add some "),l("a",{attrs:{href:"#"}},[t._v("links")]),t._v(" for people\n                      to be able to follow them outside the site.\n                    ")])]),t._v(" "),l("md-card-actions",{staticClass:"text-center"},[l("md-button",{staticClass:"md-just-icon md-simple",attrs:{href:"javascript:void(0)"}},[l("i",{staticClass:"fab fa-twitter"})]),t._v(" "),l("md-button",{staticClass:"md-just-icon md-simple",attrs:{href:"javascript:void(0)"}},[l("i",{staticClass:"fab fa-instagram"})]),t._v(" "),l("md-button",{staticClass:"md-just-icon md-simple",attrs:{href:"javascript:void(0)"}},[l("i",{staticClass:"fab fa-facebook-square"})])],1)],1)],1)]),t._v(" "),l("div",{staticClass:"md-layout-item md-medium-size-33 md-small-size-100"},[l("div",{staticClass:"team-player"},[l("md-card",{staticClass:"md-card-plain"},[l("div",{staticClass:"md-layout-item md-size-50 mx-auto"},[l("img",{staticClass:"img-raised rounded-circle img-fluid",attrs:{src:t.teamImg2,alt:"Thumbnail Image"}})]),t._v(" "),l("h4",{staticClass:"card-title"},[t._v("\n                    Carla Hortensia\n                    "),l("br"),t._v(" "),l("small",{staticClass:"card-description text-muted"},[t._v("\n                      Designer\n                    ")])]),t._v(" "),l("md-card-content",[l("p",{staticClass:"card-description"},[t._v("\n                      You can write here details about one of your team\n                      members. You can give more details about what they do.\n                      Feel free to add some "),l("a",{attrs:{href:"#"}},[t._v("links")]),t._v(" for people\n                      to be able to follow them outside the site.\n                    ")])]),t._v(" "),l("md-card-actions",{staticClass:"text-center"},[l("md-button",{staticClass:"md-just-icon md-simple",attrs:{href:"javascript:void(0)"}},[l("i",{staticClass:"fab fa-twitter"})]),t._v(" "),l("md-button",{staticClass:"md-just-icon md-simple",attrs:{href:"javascript:void(0)"}},[l("i",{staticClass:"fab fa-linkedin"})])],1)],1)],1)]),t._v(" "),l("div",{staticClass:"md-layout-item md-medium-size-33 md-small-size-100"},[l("div",{staticClass:"team-player"},[l("md-card",{staticClass:"md-card-plain"},[l("div",{staticClass:"md-layout-item md-size-50 mx-auto"},[l("img",{staticClass:"img-raised rounded-circle img-fluid",attrs:{src:t.teamImg3,alt:"Thumbnail Image"}})]),t._v(" "),l("h4",{staticClass:"card-title"},[t._v("\n                    Kendall Jenner\n                    "),l("br"),t._v(" "),l("small",{staticClass:"card-description text-muted"},[t._v("Model")])]),t._v(" "),l("md-card-content",[l("p",{staticClass:"card-description"},[t._v("\n                      You can write here details about one of your team\n                      members. You can give more details about what they do.\n                      Feel free to add some "),l("a",{attrs:{href:"#"}},[t._v("links")]),t._v(" for people\n                      to be able to follow them outside the site.\n                    ")])]),t._v(" "),l("md-card-actions",{staticClass:"text-center"},[l("md-button",{staticClass:"md-just-icon md-simple",attrs:{href:"javascript:void(0)"}},[l("i",{staticClass:"fab fa-twitter"})]),t._v(" "),l("md-button",{staticClass:"md-just-icon md-simple",attrs:{href:"javascript:void(0)"}},[l("i",{staticClass:"fab fa-instagram"})]),t._v(" "),l("md-button",{staticClass:"md-just-icon md-simple",attrs:{href:"javascript:void(0)"}},[l("i",{staticClass:"fab fa-facebook-square"})])],1)],1)],1)])])])])]),t._v(" "),l("div",{staticClass:"section section-contacts"},[l("div",{staticClass:"container"},[l("div",{staticClass:"md-layout"},[l("div",{staticClass:"md-layout-item md-size-66 md-xsmall-size-100 mx-auto"},[l("h2",{staticClass:"text-center title"},[t._v("Work with us")]),t._v(" "),l("h4",{staticClass:"text-center description"},[t._v("\n              Divide details about your product or agency work into parts.\n              Write a few lines about each one and contact us about any\n              further collaboration. We will responde get back to you in a\n              couple of hours.\n            ")]),t._v(" "),l("form",{staticClass:"contact-form"},[l("div",{staticClass:"md-layout"},[l("div",{staticClass:"md-layout-item md-size-50"},[l("md-field",[l("label",[t._v("Your Name")]),t._v(" "),l("md-input",{attrs:{type:"text"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1)],1),t._v(" "),l("div",{staticClass:"md-layout-item md-size-50"},[l("md-field",[l("label",[t._v("Your Email")]),t._v(" "),l("md-input",{attrs:{type:"email"},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1)],1)]),t._v(" "),l("md-field",{attrs:{maxlength:"5"}},[l("label",[t._v("Your Message")]),t._v(" "),l("md-textarea",{model:{value:t.message,callback:function(e){t.message=e},expression:"message"}})],1),t._v(" "),l("br"),t._v(" "),l("div",{staticClass:"md-layout"},[l("div",{staticClass:"md-layout-item md-size-33 mx-auto text-center"},[l("md-button",{staticClass:"md-success"},[t._v("Send Message")])],1)])],1)])])])])])],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"md-layout"},[e("div",{staticClass:"md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center"},[e("h2",{staticClass:"title text-center"},[this._v("Let's talk product")]),this._v(" "),e("h5",{staticClass:"description"},[this._v("\n              This is the paragraph where you can write more details about\n              your product. Keep you user engaged by providing meaningful\n              information. Remember that by this time, the user is curious,\n              otherwise he wouldn't scroll to get here. Add a button if you\n              want the user to see more.\n            ")])])])}],!1,null,"0c131c50",null);e.default=component.exports}}]);