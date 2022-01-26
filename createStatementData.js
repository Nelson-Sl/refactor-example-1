import {PerformanceCalculator} from "./PerformanceCalculator.js";

export default function createStatementData(invoices, plays) {
    // Statement Data: the structure of data needed in program
    const statementData = {};
    statementData.customer = invoices.customer;
    statementData.performances = invoices.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;

    function createPerformanceCalculator(aPerformance) {
        return new PerformanceCalculator(aPerformance, playFor(aPerformance));
    }

    function enrichPerformance(aPerformance) {
        const calculator = createPerformanceCalculator(aPerformance);
        const result = Object.assign({}, aPerformance);
        result.play = playFor(result);
        result.amount = calculator.getAmount();
        result.volumeCredits = calculator.getVolumeCredits();
        return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function totalAmount(data) {
        return data.performances.reduce((total, p) => total + p.amount, 0);
    }

    function totalVolumeCredits(data) {
        return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
    }
}
