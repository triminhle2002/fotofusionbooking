import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";

const Chatbot = (props) => {
  useEffect(() => {
    var chatbox = document.getElementById("fb-customer-chat");
    chatbox.setAttribute("page_id", "227739294418179");
    chatbox.setAttribute("attribution", "biz_inbox");

    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: "v18.0",
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);
  return (
    <div>
      <div id="fb-root"></div>
      <div id="fb-customer-chat" class="fb-customerchat"></div>
    </div>
  );
};

Chatbot.propTypes = {};

export default Chatbot;
