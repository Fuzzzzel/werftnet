// const convertLcovToCoveralls = require('./node_modules/coveralls/lib/convertLcovToCoveralls.js')
var TRAVIS_JOB_ID = process.env.TRAVIS_JOB_ID || 'unknown';
var fs = require('fs');
var path = require('path');
const lcovParse = require('lcov-parse');
const coverallsPhp = require('./../build/logs/coveralls-upload.json')
const sendToCoveralls = require('./node_modules/coveralls/lib/sendToCoveralls')

var detailsToCoverage = function (length, details) {
    var coverage = new Array(length);
    details.forEach(function (obj) {
        coverage[obj.line - 1] = obj.hit;
    });
    return coverage;
};

var detailsToBranches = function (details) {
    var branches = [];
    details.forEach(function (obj) {
        ['line', 'block', 'branch', 'taken'].forEach(function (key) {
            branches.push(obj[key] || 0);
        });
    });
    return branches;
};

var convertLcovFileObject = function (file, filepath) {
    var rootpath = filepath;
    filepath = path.resolve(rootpath, file.file);
    var source = fs.readFileSync(filepath, 'utf8');
    var lines = source.split("\n");
    var coverage = detailsToCoverage(lines.length, file.lines.details);
    var branches = detailsToBranches(file.branches.details);
    return {
        name: path.relative(rootpath, path.resolve(rootpath, file.file)).split(path.sep).join("/"),
        source: source,
        coverage: coverage,
        branches: branches
    };
};

var cleanFilePath = function (file) {
    if (file.indexOf('!') > -1) {
        var regex = /^(.*!)(.*)$/g;
        var matches = regex.exec(file);
        return matches[matches.length - 1];
    }

    return file;
};

var convertLcovToCoveralls = function (input, options, cb) {
    var filepath = options.filepath || '';
    filepath = path.resolve(process.cwd(), filepath);
    lcovParse(input, function (err, parsed) {
        if (err) {
            throw err
        }
        var postJson = {
            source_files: []
        };
        if (options.git) {
            postJson.git = options.git;
        }
        if (options.run_at) {
            postJson.run_at = options.run_at;
        }
        if (options.service_name) {
            postJson.service_name = options.service_name;
        }
        if (options.service_job_id) {
            postJson.service_job_id = options.service_job_id;
        }
        if (options.service_pull_request) {
            postJson.service_pull_request = options.service_pull_request;
        }
        if (options.repo_token) {
            postJson.repo_token = options.repo_token;
        }
        if (options.parallel) {
            postJson.parallel = options.parallel;
        }
        if (options.service_pull_request) {
            postJson.service_pull_request = options.service_pull_request;
        }
        parsed.forEach(function (file) {
            file.file = cleanFilePath(file.file);
            var currentFilePath = path.resolve(filepath, file.file);
            if (fs.existsSync(currentFilePath)) {
                postJson.source_files.push(convertLcovFileObject(file, filepath));
            }
        });
        return cb(postJson);
    });
};


cb = function (coverallsNode) {
    var coverallsMerged = coverallsPhp;
    for(var i = 0; i < coverallsNode.source_files.length; i++) {
        coverallsNode.source_files[i] = coverallsNode.source_files[i].replace('src/app/', '/wn-frontend/src/app/';
    }
    coverallsMerged.source_files = coverallsPhp.source_files.concat(coverallsNode.source_files);
    var json = JSON.stringify(coverallsMerged);
    fs.writeFile('./../build/logs/coverall-merged.json', json, 'utf8', function() { });
    sendToCoveralls(coverallsMerged, function(err, response, body) {
        console.log('Build information sent to coveralls');
        console.log('Service name: ' + coverallsMerged.service_name);
        console.log('Job ID: ' + coverallsMerged.service_job_id);
        if (body) {
            console.log('Response:');
            console.log(body);
        }
        if (err) {
            console.log(err);
            throw err;
        }
    });
}

convertLcovToCoveralls('./coverage/lcov.info', {}, cb);