function loadScripts (arr) {

  // var scripts = [
  //   'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.js',
  //   'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular.js'
  // ];
  var scripts = arr;
  var src;
  var script;
  var pendingScripts = [];
  var firstScript = document.scripts[0];

  // Watch scripts load in IE
  function stateChange() {
    // Execute as many scripts in order as we can
    var pendingScript;
    while (pendingScripts[0] && pendingScripts[0].readyState == 'loaded') {
      pendingScript = pendingScripts.shift();
      // avoid future loading events from this script (eg, if src changes)
      pendingScript.onreadystatechange = null;
      // can't just appendChild, old IE bug if element isn't closed
      firstScript.parentNode.insertBefore(pendingScript, firstScript);
    }
  }

  // loop through our script urls
  while (src = scripts.shift()) {
    if ('async' in firstScript) { // modern browsers
      script = document.createElement('script');
      script.async = false;
      script.src = src;
      document.head.appendChild(script);
    }
    else if (firstScript.readyState) { // IE<10
      // create a script and add it to our todo pile
      script = document.createElement('script');
      pendingScripts.push(script);
      // listen for state changes
      script.onreadystatechange = stateChange;
      // must set src AFTER adding onreadystatechange listener
      // else we’ll miss the loaded event for cached scripts
      script.src = src;
    }
    else { // fall back to defer
      document.write('<script src="' + src + '" defer></'+'script>');
    }
  }
}

var cookie = {
  set: function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  },
  get: function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length,c.length);
      }
    }
    return "";
  }
}

cookie.set("jquery", "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.js");
cookie.set("angular", "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular.js");

var j = cookie.get("jquery");
var a = cookie.get("angular");
var arrayScripts = [j, a]

loadScripts(arrayScripts);
