// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    var configuration = {
        basePath: '',
        frameworks: ['jasmine', '@angular/cli'],
        files: [
            "src/**/*.ts",
            {
                pattern: "src/**/*.spec.ts",
                included: false
            }
        ],
        exclude: ['node_modules', 'coverage'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular/cli/plugins/karma')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        angularCli: {
            environment: 'dev'
        },
        reporters: ['progress', 'kjhtml'],
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true,
            thresholds: {
                statements: 50,
                lines: 50,
                branches: 50,
                functions: 50
            }
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browserNoActivityTimeout: 30000,
        browsers: ['ChromeDebugging'],
        customLaunchers: {
            ChromeDebugging: {
                base: 'Chrome',
                flags: ['--remote-debugging-port=9333']
            },
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox']
            }
        },
        singleRun: false
    };

    if (process.env.TRAVIS) {
        configuration.browsers = ['ChromeHeadlessNoSandbox'];
    }

    config.set(configuration);
};
