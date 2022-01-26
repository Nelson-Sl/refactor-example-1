import {PerformanceCalculator} from "./PerformanceCalculator.js";

export default function createStatementData(invoices, plays) {
    // Statement Data: the structure of data needed in program
    const statementData = {};
    statementData.customer = invoices.customer;
    statementData.performances = invoices.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;

    function enrichPerformance(aPerformance) {
        const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));
        const result = Object.assign({}, aPerformance);
        result.play = playFor(result);
        result.amount = calculator.getAmount();
        result.volumeCredits = volumeCreditsFor(result);
        return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
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
        return data.performances.reduce((total, p) => total + p.amount, 0);
    }

    function totalVolumeCredits(data) {
        return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
    }
}
