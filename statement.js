import createStatementData from './createStatementData.js';

const renderPlainText = (data) => {
    let result = `Statement for ${data.customer}\n`;

    for (let perf of data.performances) {
        // print line for each performance order
        result += ` ${perf.play.name}: ${usd(perf.amount)} (#${perf.audience} seats)\n`;
    }

    result += `Amount owed is ${usd(data.totalAmount)}\n`;
    result += `Your earned ${data.totalVolumeCredits} credits\n`
    return result;

    function usd(aNumber) {
        return Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        }).format(aNumber/100);
    }
}

export default function plainTextStatement(invoices, plays) {
    return renderPlainText(createStatementData(invoices, plays));
}


