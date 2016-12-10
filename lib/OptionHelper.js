var moment = require('moment');
var accounting = require('accounting');

exports.compute = function (option, price) {
    var NO_OF_CONTRACTS = 10;
    var commission = accounting.toFixed(34.95 + (0.35 / 100) * (Math.max(100 * NO_OF_CONTRACTS * price - 10000, 0)), 2);
    var netPay = accounting.toFixed(100 * NO_OF_CONTRACTS * option.last - commission, 2);
    var daysHoldingPosition = option.expiry.diff(moment.now, 'days');
    var investmentReturn = accounting.toFixed(((netPay) / (100 * NO_OF_CONTRACTS * price)) * (365 / daysHoldingPosition), 4);

    option.price = price;
    option.noOfContracts = NO_OF_CONTRACTS;
    option.commission = commission;
    option.netPay = netPay;
    option.daysHoldingPosition = daysHoldingPosition;
    option.return = investmentReturn;
    return option;
};
