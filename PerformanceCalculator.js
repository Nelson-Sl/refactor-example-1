export class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }

    getVolumeCredits() {
        return Math.max(this.performance.audience - 30, 0);
    }
}

export class TragedyCalculator extends PerformanceCalculator {
    getAmount() {
        let result = 40000;
        if(this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
        }
        return result;
    }
}

export class ComedyCalculator extends PerformanceCalculator {
    getAmount() {
        let result = 30000;
        if(this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        return result;
    }

    getVolumeCredits() {
        return super.getVolumeCredits() + Math.floor(this.performance.audience / 5);
    }
}
