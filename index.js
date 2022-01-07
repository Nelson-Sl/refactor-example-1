const plays = require('./plays.json');
const invoices = require('./invoices.json');

const renderPlainText = (data, plays) => {
    let result = `Statement for ${data.customer}\n`;

    for (let perf of data.performances) {
        // print line for each performance order
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (#${perf.audience} seats)\n`;
    }

    result += `Amount owed is ${usd(totalAmount())}\n`;
    result += `Your earned ${totalVolumeCredits()} credits\n`
    return result;

    function totalAmount() {
        let result = 0;
        for (let perf of data.performances) {
            result += amountFor(perf);
        }
        return result;
    }

    function totalVolumeCredits() {
        let result = 0;
        for(let perf of data.performances) {
            result += volumeCreditsFor(perf);
        }
        return result;
    }

    function volumeCreditsFor(aPerformance) {
        let result = 0;
        //add volume credits
        result += Math.max(aPerformance.audience - 30, 0);
        //add extra credit for every ten comedy attendees
        if ('comedy' === playFor(aPerformance).type) {
            result += Math.floor(aPerformance.audience / 5);
        }
        return result;
    }

    function usd(aNumber) {
        return Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        }).format(aNumber/100);
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }
}

function printInvoice(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances;
    return renderPlainText(statementData, plays);
}

console.log(printInvoice(invoices, plays));
