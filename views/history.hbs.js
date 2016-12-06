var history = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "    <script src=\"/highstock.js\"></script>\r\n    <script src=\"/exporting.js\"></script>\r\n";
  },"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    $(function () {\r\n        $.getJSON('/series?ticker="
    + escapeExpression(((helper = (helper = helpers.ticker || (depth0 != null ? depth0.ticker : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"ticker","hash":{},"data":data}) : helper)))
    + "', function (data) {\r\n            //data = $.parseJSON(data);\r\n            console.log(data);\r\n            // Create the chart\r\n            $('#highchart_container').highcharts('StockChart', {\r\n\r\n\r\n                rangeSelector: {\r\n                    selected: 1\r\n                },\r\n\r\n                title: {\r\n                    text: '"
    + escapeExpression(((helper = (helper = helpers.ticker || (depth0 != null ? depth0.ticker : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"ticker","hash":{},"data":data}) : helper)))
    + " Price Chart'\r\n                },\r\n\r\n                series: [{\r\n                    name: '"
    + escapeExpression(((helper = (helper = helpers.ticker || (depth0 != null ? depth0.ticker : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"ticker","hash":{},"data":data}) : helper)))
    + "',\r\n                    data: data,\r\n                    tooltip: {\r\n                        valueDecimals: 2\r\n                    }\r\n                }]\r\n            });\r\n        });\r\n\r\n    });\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "﻿<div class=\"container\">\r\n    <div id=\"highchart_container\" style=\"height: 400px; width: 600px\"></div>\r\n</div> <!-- /container -->\r\n\r\n";
  stack1 = ((helpers.section || (depth0 && depth0.section) || helperMissing).call(depth0, "script", {"name":"section","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.section || (depth0 && depth0.section) || helperMissing).call(depth0, "javascript", {"name":"section","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});