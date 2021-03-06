// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    var configuration = {
        basePath: '',
        frameworks: ['parallel', 'jasmine', '@angular-devkit/build-angular'],
        files: [
            "src/**/*.ts",
            {
                pattern: "src/**/*.spec.ts",
                included: false
            },
            {
                pattern: "src/app/test/**/*.ts",
                included: false
            }
        ],
        exclude: ['node_modules', 'coverage'],
        plugins: [
            require('karma-parallel'),
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        parallelOptions: {
            shardStrategy: 'round-robin'
        },
        reporters: ['progress', 'kjhtml'],
        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, 'coverage'), reports: ['html', 'lcovonly'],
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
