javascript:void(function(){ try {
  var settings = {
    /* all optional, attempted in this order: url, cookies, function, form */
    
    url: "http://www.reddit.com/login",
    
    cookies: {
      reddit_session: ""
    },
    
    form: {
      /* identify using name, id or function */
      id: "login_login",
      
      values: {
        user: "form-bookmarklet-test",
        passwd: "test-bookmark-form"
      },
      
      submit: true
    }
  };
  
  /* if a url is specified and it is not the current location then go there */
  if ("url" in settings) {
    var loc = String(window.location);
    
    if ((settings.url != loc) &&
        (settings.url + "?" != loc.substr(0, settings.url.length + 1))) {
      window.location = settings.url;
      return;
    };
  };
  
  /* if cookies are specified then we set them (expire with session) */
  if (settings.cookies) {
    for (key in settings.cookies) {
      document.cookie = key + "=" + settings.cookies[key];
    }
  };
  
  /* if a form is specified then it specified values are entered and the form
     is submitted submitted if form.submit is true */
  if (settings.form) {
    var form;
    
    if ("name" in settings.form) {
      form = document.getElementsByName(settings.form.name)[0];
    } else if ("id" in settings.form) {
      form = document.getElementById(settings.form.id);
    } else if ("function" in settings.form) {
      form = settings.form.function.call();
    } else {
      throw new Error("No form name, id or function provided for bookmarklet.");
    }
    
    for (name in settings.form.values) {
      form.elements[name] = settings.form.values[name];
    };
    
    if (settings.form.submit) {
      form.submit();
    };
  };
  
  /* if a function is provided then it is called */
  if (settings.function) {
    settings.function();
  };
} catch (error) { alert(String(error)); }}())
