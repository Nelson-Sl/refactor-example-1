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

module.exports = amountFor;
