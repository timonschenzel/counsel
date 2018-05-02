module.exports = class DotReporter extends Reporter
{
    constructor()
    {
        super();

        this.testsExecuted = 0;

        this.testsPerLine = 24;
    }

    afterEachFailedTest(testName, results, failuresCount)
    {
        super.afterEachFailedTest(testName, results, failuresCount);

        this.appendLog(counsel.serviceProviders.chalk.red('x'));
    }

    afterEachPassedTest(testName, results)
    {
        super.afterEachPassedTest(testName, results);

        this.appendLog(counsel.serviceProviders.chalk.green('.'));
    }

    afterEachTest(testName, results, failuresCount)
    {
        super.afterEachTest(testName, results, failuresCount);

        if (! this.fullRun) {
            return;
        }

        this.testsExecuted++;

        if (this.testsExecuted == this.testsPerLine) {
            this.testsExecuted = 0;

            this.appendLog(`  ${this.testsCountWithSpace()} / ${this.totalTests} (${this.progressWithSpace()}%)\n  `);
        }
    }

    afterTest()
    {
        if (this.fullRun && this.testsExecuted > 0) {
            let spaceLeft = '';
            let spacesLeft = this.testsPerLine - this.testsExecuted;

            if (spacesLeft > 0) {
                spaceLeft = ' '.repeat(spacesLeft);
            }

            this.appendLog(`${spaceLeft}  ${this.testsCount} / ${this.totalTests} (100%)\n`);
        }

        super.afterTest();
    }

    progressWithSpace()
    {
        let space = ' '.repeat(3 - this.progress.toString().length);

        return `${space}${this.progress}`;
    }

    testsCountWithSpace()
    {
        let space = ' '.repeat(this.totalTests.toString().length - this.testsCount.toString().length);

        return `${space}${this.testsCount}`;
    }
}
