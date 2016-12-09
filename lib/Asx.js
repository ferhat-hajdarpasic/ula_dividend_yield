var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');
var accounting = require('accounting');
var parse = require('csv-parse');
var mongoose = require('mongoose');
var NodeCache = require("node-cache");
var stockCache = new NodeCache();
var dividendsCache = new NodeCache();

mongoose.connect('mongodb://ferhath:zeliha04@ds045097.mongolab.com:45097/ula_dividend_yield');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('Connected :-)');
});


var stockSchema = mongoose.Schema({
    _id: String, //ticker.toUppercase()
    ticker: String,
    priceHistory: [],
    priceHistoryLastUpdate: Date
});

var Stock = mongoose.model('Stock', stockSchema);

var getDividendsTableData = function () {
    var table = $("#dividends");
    var tableData = [];
    table.find('tr').each(function (rowIndex, r) {
        var cols = [];
        $(this).find('th,td').each(function (colIndex, c) {
            if (c.children[0]) {
                if (c.name.toLowerCase() === 'th') {
                    if (c.children[0].children) {
                        var text = c.children[0].children[0].data;
                        cols.push(text);
                    } else if (c.attribs.class === 'row') {
                        var text = c.children[1].children[0].data;
                        cols.push(text);
                    }
                } else if (c.name.toLowerCase() === 'td') {
                    var text = c.children[0].data;
                    cols.push(text);
                }
            }
        });
        tableData.push(cols);
    });
    return tableData;
};

var getOptionsTableData = function () {
    var table = $("#optionstable");
    var tableData = [];
    table.find('tr').each(function (rowIndex, r) {
        var cols = [];
        $(this).find('th,td').each(function (colIndex, c) {
            if (c.children[0]) {
                if (c.name.toLowerCase() === 'th') {
                    if (c.children[0].children) {
                        var text = c.children[0].children[0].data;
                        cols.push(text);
                    } else if (c.attribs.class === 'row') {
                        var text = c.children[1].children[0].data;
                        cols.push(text);
                    }
                } else if (c.name.toLowerCase() === 'td') {
                    var text = c.children[0].data;
                    cols.push(text);
                }
            }
        });
        tableData.push(cols);
    });
    return tableData;
};

var getPrice = function (body) {
    var start = "<td class=\"last\">";
    var remain = body.substring(body.indexOf(start) + start.length);
    resultingPrice = remain.substring(0, remain.indexOf("</td>")).trim();
    return resultingPrice;
};

var transformToDividendObject = function (tableData) {
    var temp = [];
    if (tableData.length > 0) {
        for (var i = 1; i < tableData.length; i++) {
            var row = tableData[i];
            var dividend = 1*accounting.toFixed(row[2].replace(/[cC]/, ''),2);
            var percentFranked = row[6].replace(/%/, '');
            var dividendIncome = 1*accounting.toFixed((1 * dividend + (3 * dividend * percentFranked) / (7 * 100)), 2);
            temp.push({
                code : row[0],
                companyName : row[1],
                dividend : dividend,
                exDividendDate : moment(row[3], "DD/MM/YYYY"),
                recordDate : moment(row[4], "DD/MM/YYYY"),
                datePayable : moment(row[5], "DD/MM/YYYY"),
                percentFranked : percentFranked,
                type : row[7],
                dividendIncome : dividendIncome
            });
        }
    }
    return temp;
};

var transformToOptionObject = function (tableData) {
    var temp = [];
    if (tableData.length > 0) {
        for (var i = 1; i < tableData.length; i++) {
            var row = tableData[i];
            temp.push({
                code: row[0],
                expiry: moment(row[1], "DD/MM/YYYY"),
                excercise: 1 * accounting.toFixed(row[2], 2),
                last: 1 * accounting.toFixed(row[6], 2)
            });
        }
    }
    return temp;
};

var yahoo = function (ticker, callback) {
    var today = moment();
   var csvUrl = 'http://real-chart.finance.yahoo.com/table.csv?s=' + ticker + '.AX&a=11&b=31&c=1998&d=' + today.month() + '&e=' + today.date() + '&f=' + today.year() + '&g=d&ignore=.csv';
    console.log(csvUrl);
    var x = request(csvUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parse(body, { comment: '#' }, function (err, output) {
                var series = [];
                for (var i = 1; i < output.length; i++) {
                    series.push({
                        date : moment(output[i][0], "YYYY-MM-DD"),
                        open : 1 * output[i][1],
                        high : 1 * output[i][2],
                        low : 1 * output[i][3],
                        close : 1 * output[i][4],
                        volume : 1 * output[i][5],
                        adjustedClose : 1 * output[i][6]
                    });
                }
                callback(series);
            });
        }
    });
};

var yahooDividendsOnly = function (ticker, callback) {
    var today = moment();
    var csvUrl = 'http://real-chart.finance.yahoo.com/table.csv?s=' + ticker + '.AX&a=11&b=31&c=1998&d=' + today.month() + '&e=' + today.date() + '&f=' + today.year() + '&g=v&ignore=.csv';
    console.log(csvUrl);
    var x = request(csvUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parse(body, { comment: '#' }, function (err, output) {
                var series = [];
                for (var i = 1; i < output.length; i++) {
                    series.push({
                        date : moment(output[i][0], "YYYY-MM-DD"),
                        dividendAmount : 1 * output[i][1]
                    });
                }
                callback(series);
            });
        }
    });
};

exports.dividends = function (ticker, callback) {
    var asx = 'http://www.asx.com.au/asx/markets/dividends.do?by=asxCodes&asxCodes=' + ticker + '&view=all';
    var x = request(asx, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            $ = cheerio.load(body);
            var dividends = transformToDividendObject(getDividendsTableData());
            callback(dividends);
        }
    });
};

//Jan+2017, Call
exports.options = function (ticker, month, type, callback) {
    var asx = 'http://www.asx.com.au/asx/markets/optionPrices.do?by=underlyingCode&underlyingCode=' + ticker + '&expiryDate=' + month + '&optionType=' + type;
    var x = request(asx, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            $ = cheerio.load(body);
            var options = transformToOptionObject(getOptionsTableData());
            callback(options);
        }
    });
};

exports.price = function (ticker, callback) {
    var asx = 'http://www.asx.com.au/asx/markets/equityPrices.do?by=asxCodes&asxCodes=' + ticker;
    var x = request(asx, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var resultingPrice = getPrice(body);
            callback(resultingPrice);
        }
    });
};

exports.termDepositRate = function (callback) {
    var KEY = 'termDepositRate';
    var termDepositRate = stockCache.get(KEY)[KEY];
    if (!termDepositRate) {
        var csvUrl = 'http://www.rba.gov.au/statistics/tables/csv/f4-data.csv';
        var x = request(csvUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                parse(body, { comment: '#' }, function (err, output) {
                    for (var i = output.length - 1; i >= 0; i--) {
                        if (output[i]) {
                            if (output[i][13]) {
                                console.log(output[1][13] + '=>' + output[i][13]);
                                callback(output[i]);
                                stockCache.set(KEY, output[i]);
                                break; /*Found last (most recent) value. Get out!*/
                            }
                        }
                    }
                });
            }
        });
    } else {
        callback(termDepositRate);
    }
};

exports.retailLandingRate = function (callback) {
    var KEY = 'retailLandingRate';
    var retailLandingRate = stockCache.get(KEY)[KEY];
    if (!retailLandingRate) {
        var csvUrl = 'http://www.rba.gov.au/statistics/tables/csv/f5-data.csv';
        var x = request(csvUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                parse(body, { comment: '#' }, function (err, output) {
                    for (var i = output.length - 1; i >= 0; i--) {
                        if (output[i]) {
                            if (output[i][19]) {
                                console.log(output[1][19] + '=>' + output[i][19]);
                                callback(output[i]);
                                stockCache.set(KEY, output[i]);
                                break; /*Found last (most recent) value. Get out!*/
                            }
                        }
                    }
                });
            }
        });
    } else {
        callback(retailLandingRate);
    }
};

exports.priceHistory = function (ticker_, callback) {
    var TICKER = ticker_.toUpperCase();
    var stock = stockCache.get(TICKER)[TICKER];
    if (!stock) {
        Stock.find({ _id: TICKER }, function (err, stocks) {
            var getFromYahoo = true;
            if (err) {
                console.error(err);
            } else {
                //console.log(stocks);
                if (stocks.length > 0) {
                    stock = stocks[0];
                    if (stock.priceHistoryLastUpdate) {
                        var todayDate = moment();
                        var lastUpdateDate = moment(stock.priceHistoryLastUpdate);
                        if (lastUpdateDate.isSame(todayDate, 'day')) {
                            callback(stock.priceHistory);
                            stockCache.set(TICKER, stock);
                            getFromYahoo = false;
                        }
                    }
                }
            }
            if (getFromYahoo) {
                var createIt = !stock;
                yahoo(TICKER, function (series) {
                    stock = new Stock({ _id: TICKER , 'ticker': TICKER, priceHistory: series , priceHistoryLastUpdate: new Date() });
                    Stock.findOneAndUpdate({ _id: TICKER}, stock.toObject(), {upsert:true}, function (err, stock) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(stock.priceHistoryLastUpdate);
                            stockCache.set(TICKER, stock);
                        }
                    });
                    callback(series);
                });
            }
        });
    } else {
        callback(stock.priceHistory);
    }
};

exports.dividendsHistory = function (ticker_, callback) {
    var TICKER = ticker_.toUpperCase();
    var dividends = dividendsCache.get(TICKER)[TICKER];
    if (!dividends) {
        yahooDividendsOnly(TICKER, function (series) {
            dividends = series;
            dividendsCache.set(TICKER, dividends);
            callback(dividends);
        });
    } else {
        callback(dividends);
    }
};
