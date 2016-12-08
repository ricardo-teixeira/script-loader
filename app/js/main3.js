function loadScripts(arr, callback){

  var pendingCount = arr.length;

  for (var i = 0; i < arr.length; i++) {
    var url = arr[i];
    var script = document.createElement("script")
    script.type = "text/javascript";

    function stateChange() {
      pendingCount--;
      if (callback) {
        callback(pendingCount);
      }
    }

    if (script.readyState){  //IE
      script.onreadystatechange = function(){
        if (script.readyState == "loaded" || script.readyState == "complete"){
          script.onreadystatechange = null;
          stateChange();
        }
      };
      document.write('<script src="' + url + '" defer></'+'script>');
    } else {  //Others
      script.onload = function(){
        stateChange();
      };
      script.src = url;
      document.getElementsByTagName("head")[0].appendChild(script);
    }
  }
}

var events = {
  events: {},
  on: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  off: function(eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      };
    }
  },
  emit: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function(fn) {
        fn(data);
      });
    }
  }
};

events.on('loadedscript', function (pending) {
  if (pending == 0) {
    console.log("jquery", window.jQuery);
    console.log("angular", window.angular);

    $('.jumbotron').fadeIn().find('h1').text("Scripts loaded successfully!");
    angular.element('.jumbotron').css({'background': 'green', 'color': 'white', 'margin-top': '25px'});
  }
})

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
var arrayScripts = [j, a];

loadScripts(arrayScripts, function (i) {
  events.emit('loadedscript', i);
});
