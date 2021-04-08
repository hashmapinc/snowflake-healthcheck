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
                target: "#hubspotForm"
          })
        }
      });
      // if the form is submitted, add a cookie to allow user to content page
      window.addEventListener('message', EventTarget => {
        if (EventTarget.data.type === 'hsFormCallback' && EventTarget.data.eventName === 'onFormSubmitted') {
          Cookies.set('_hs_form_submitted', md5("hubspot form submitted"), {path: '/'})
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
