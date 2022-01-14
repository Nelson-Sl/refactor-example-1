const plays = require('./plays.json');
const invoices = require('./invoices.json');

const renderPlainText = (data, plays) => {
    let result = `Statement for ${data.customer}\n`;

    for (let perf of data.performances) {
        // print line for each performance order
        result += ` ${perf.play.name}: ${usd(perf.amount)} (#${perf.audience} seats)\n`;
    }

    result += `Amount owed is ${usd(data.totalAmount)}\n`;
    result += `Your earned ${totalVolumeCredits()} credits\n`
    return result;

    function totalVolumeCredits() {
        let result = 0;
        for(let perf of data.performances) {
            result += perf.volumeCredits;
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
}

function printInvoice(invoice, plays) {
    // Statement Data: the structure of data needed in program
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    console.log(JSON.stringify(statementData));
    return renderPlainText(statementData, plays);

    function enrichPerformance(aPerformance) {
        const result = Object.assign({}, aPerformance);
        result.play = playFor(result);
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditsFor(result);
        return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function amountFor(aPerformance) {
        let result = 0;
        switch (aPerformance.play.type) {
            case 'tragedy':
                result = 40000;
                if(aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case 'comedy':
                result = 30000;
                if(aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`unknown type: ${aPerformance.play.type}`)
        }
        return result;
    }

    function volumeCreditsFor(aPerformance) {
        let result = 0;
        //add volume credits
        result += Math.max(aPerformance.audience - 30, 0);
        //add extra credit for every ten comedy attendees
        if ('comedy' === aPerformance.play.type) {
            result += Math.floor(aPerformance.audience / 5);
        }
        return result;
    }

    function totalAmount(data) {
        let result = 0;
        for (let perf of data.performances) {
            result += perf.amount;
        }
        return result;
    }
}

console.log(printInvoice(invoices, plays));
