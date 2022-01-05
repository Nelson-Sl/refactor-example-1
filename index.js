const plays = require('./plays.json');
const invoices = require('./invoices.json');

const playFor = (aPerformance) => {
    return plays[aPerformance.playID];
}

const amountFor = (aPerformance) => {
    let result = 0;

    switch (playFor(aPerformance).type) {
        case "tragedy":
            result = 40000;
            if (aPerformance.audience > 30) {
                result += 1000 * (aPerformance.audience - 30);
            }
            break;

        case "comedy":
            result = 30000;
            if (aPerformance.audience > 20) {
                result += 10000 + 500 * (aPerformance.audience - 20);
            }
            break;
        default:
            throw new Error(`unknown type: ${playFor(aPerformance).type}`)
    }

    return result;
}

const volumeCreditsFor = (aPerformance) => {
    let result = 0;
    //add volume credits
    result += Math.max(aPerformance.audience - 30, 0);
    //add extra credit for every ten comedy attendees
    if ('comedy' === playFor(aPerformance).type) {
        result += Math.floor(aPerformance.audience / 5);
    }
    return result;
}

function printInvoice(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    }).format;


    for (let perf of invoice.performances) {
        volumeCredits += volumeCreditsFor(perf);
        // print line for each performance order
        result += ` ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (#${perf.audience} seats)\n`;
        totalAmount += amountFor(perf);
    }

    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `Your earned ${volumeCredits} credits\n`
    return result;
}

console.log(printInvoice(invoices, plays));
