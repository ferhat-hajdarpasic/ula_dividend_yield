var main = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "﻿<!DOCTYPE html>\r\n<!--[if lt IE 7]>      <html class=\"no-js lt-ie9 lt-ie8 lt-ie7\"> <![endif]-->\r\n<!--[if IE 7]>         <html class=\"no-js lt-ie9 lt-ie8\"> <![endif]-->\r\n<!--[if IE 8]>         <html class=\"no-js lt-ie9\"> <![endif]-->\r\n<!--[if gt IE 8]><!-->\r\n<html class=\"no-js\">\r\n<!--<![endif]-->\r\n<head>\r\n    <meta charset=\"utf-8\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">\r\n    <title>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</title>\r\n    <meta name=\"description\" content=\"\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\r\n    <link rel=\"stylesheet\" href=\"css/bootstrap.min.css\">\r\n    <style>\r\n    </style>\r\n    <link rel=\"stylesheet\" href=\"css/bootstrap-theme.min.css\">\r\n    <link rel=\"stylesheet\" href=\"css/main.css\">\r\n    <link rel=\"stylesheet\" href=\"css/sticky-footer.css\">\r\n    <script src=\"js/vendor/modernizr-2.6.2-respond-1.1.0.min.js\"></script>\r\n    ";
  stack1 = lambda(((stack1 = (depth0 != null ? depth0._sections : depth0)) != null ? stack1.head : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n    ";
  stack1 = lambda(((stack1 = (depth0 != null ? depth0._sections : depth0)) != null ? stack1.styleRef : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n    ";
  stack1 = lambda(((stack1 = (depth0 != null ? depth0._sections : depth0)) != null ? stack1.style : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n</head>\r\n<body>\r\n    <div class=\"container-fluid\">\r\n        <!--[if lt IE 7]>\r\n            <p class=\"browsehappy\">You are using an <strong>outdated</strong> browser. Please <a href=\"http://browsehappy.com/\">upgrade your browser</a> to improve your experience.</p>\r\n        <![endif]-->\r\n        ";
  stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"body","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n    <footer class=\"footer\">\r\n        <div class=\"container\">\r\n            <p class=\"text-muted\" style=\"text-align:center\">© whitespider.js 2014</p>\r\n        </div>\r\n    </footer>\r\n    <script src=\"//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js\"></script>\r\n    <script>window.jQuery || document.write('<script src=\"js/vendor/jquery-1.11.1.min.js\"><\\/script>')</script>\r\n    <script src=\"js/vendor/bootstrap.min.js\"></script>\r\n    <script src=\"js/main.js\"></script>\r\n    ";
  stack1 = lambda(((stack1 = (depth0 != null ? depth0._sections : depth0)) != null ? stack1.script : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n    <script>\r\n        ";
  stack1 = lambda(((stack1 = (depth0 != null ? depth0._sections : depth0)) != null ? stack1.javascript : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n    </script>\r\n    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->\r\n    <script>\r\n        (function (b, o, i, l, e, r) {\r\n            b.GoogleAnalyticsObject = l; b[l] || (b[l] =\r\n            function () { (b[l].q = b[l].q || []).push(arguments) }); b[l].l = +new Date;\r\n            e = o.createElement(i); r = o.getElementsByTagName(i)[0];\r\n            e.src = '//www.google-analytics.com/analytics.js';\r\n            r.parentNode.insertBefore(e, r)\r\n        }(window, document, 'script', 'ga'));\r\n        ga('create', 'UA-XXXXX-X'); ga('send', 'pageview');\r\n    </script>\r\n</body>\r\n\r\n</html>\r\n";
},"useData":true});