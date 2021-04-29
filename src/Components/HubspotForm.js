import React from 'react';
import Cookies from 'js-cookie';
import md5 from 'md5';


class HubspotForm extends React.Component {
  // renders hubspot form for first time users
    constructor() {
      super();
      this.state = {
        optOutCookie: Cookies.get("__hs_cookie_cat_pref")
      };
    }
    componentDidMount() {
        // remove the opt-out cookie so the cookie banner is rendered with the hubspot form
        if (this.state.optOutCookie) {
          Cookies.remove('__hs_cookie_cat_pref');
        };
        const script = document.createElement('script');
        script.src = '//js.hsforms.net/forms/v2.js';
        document.body.appendChild(script);
      
        // load the embedded hubspot form
        script.addEventListener('load', () => {
          if(window.hbspt) {
            window.hbspt.forms.create({
                region: "na1",
                portalId: "4376150",
                formId: "b63e546a-9ed4-4cc9-92e8-4090d9a4f511",
                target: "#hubspotForm",
                // clearout hubspot integration
                onFormReady: function ($form) {
                  var clearout = window.clearout = window.clearout || [], 
                    opts = { 
                      app_token: "ad06b3f96dd1cdd1e5dd580597c43dd7:e9cd0eea3ab94a34beecf5f7c650a1cb83ac10d890e66130d6cc6ea5252e0478", 
                      mode: "ajax", 
                      api_url:"https://api.clearout.io"
                    };
                  // eslint-disable-next-line
                  clearout.push(["initialize", JSON.stringify(opts), $form]),
                  function () {
                    var t = document, e = t.createElement("script"), a = t.getElementsByTagName("script")[0];
                    // eslint-disable-next-line
                    e.type = "text/javascript", e.async = !0, e.src = "https://clearout.io/wp-content/co-js-widget/clearout_js_widget.js",
                    a.parentNode.insertBefore(e, a)
                  }();
                }
          })
        }
      });
      // if the form is submitted, add a cookie to allow user to content page
      window.addEventListener('message', EventTarget => {
        if (EventTarget.data.type === 'hsFormCallback' && EventTarget.data.eventName === 'onFormSubmitted') {
          Cookies.set('_hs_form_submitted', md5("hubspot form submitted"), {expires: 365, path: '/'})
        }
      })

    }
    
      render() {
        return (
            <div id="hubspotForm"></div>
            
      );
    }
  }

export default HubspotForm
