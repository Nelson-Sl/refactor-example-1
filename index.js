const plays = require('./plays.json');
const invoices = require('./invoices.json');

const amountFor = (aPerformance, perf) => {
    let result = 0;

    switch (aPerformance.type) {
        case "tragedy":
            result = 40000;
            if (perf.audience > 30) {
                result += 1000 * (perf.audience - 30);
            }
            break;

        case "comedy":
            result = 30000;
            if (perf.audience > 20) {
                result += 10000 + 500 * (perf.audience - 20);
            }
            break;
        default:
            throw new Error(`unknown type: ${aPerformance.type}`)
    }

    return result;
}

const playFor = (aPerformance) => {
    return plays[aPerformance.playID];
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
        let thisAmount = amountFor(playFor(perf), perf);

        //add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);
        //add extra credit for every ten comedy attendees
        if (playFor(perf).type === 'comedy') {
            volumeCredits += Math.floor(perf.audience / 5);
        }

        // print line for this order
        result += ` ${playFor(perf).name}: ${format(thisAmount / 100)} (#${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }

    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `Your earned ${volumeCredits} credits\n`
    return result;
}

console.log(printInvoice(invoices, plays));
