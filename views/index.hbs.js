﻿var index = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "﻿<!DOCTYPE html>\r\n<html>\r\n<head>\r\n    <title>Golf score keeper</title>\r\n    <script src=\"http://www.google.com/jsapi\"></script>\r\n    <script>\r\n      google.load(\"jquery\", \"1.4.1\");\r\n    </script>\r\n</head>\r\n<body>\r\n    <form action=\"upload.html\" method=\"get\">\r\n        <div>\r\n            <input type=\"email\" placeholder=\"Enter your email address\" size=\"40\" />\r\n        </div>\r\n        <div>\r\n            <input type=\"text\" id=\"lat_field\" name=\"latitude\" />\r\n            <input type=\"text\" id=\"long_field\" name=\"longitude\" />\r\n        </div>\r\n        <script>\r\n        navigator.geolocation.getCurrentPosition(\r\n          function(pos) {\r\n            $(\"#lat_field\").val(pos.coords.latitude);\r\n            $(\"#long_field\").val(pos.coords.longitude);\r\n          }\r\n        );\r\n        </script>\r\n        <div>\r\n            <input type=\"submit\" value=\"Upload Score\" />\r\n        </div>\r\n    </form>\r\n</body>\r\n</html> ";
  },"useData":true});