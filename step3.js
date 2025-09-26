const fs = require('fs');
const axios = require('axios');

function handleOutput(text, out) {
    if (out) {
        try {
            fs.writeFileSync(out, text, 'utf8');
        } catch (err) {
            console.error(`Error writing to ${out}:\n ${err}`);
            process.exit(1);
        }
    } else {
        process.stdout.write(text);
    }   
}

function cat(path, out) {
    try {
        const contents = fs.readFileSync(path, 'utf8');
        handleOutput(contents, out);
    } catch (err) {
        console.error(`Error reading ${path}:\n ${err}`);
        process.exit(1);
    }
}

async function webCat(url, out) {
    try {
        const response = await axios.get(url);
        handleOutput(response.data, out);
    } catch (err) {
        console.error(`Error fetching ${url}:\n ${err}`);
        process.exit(1);
    }
}

let out;
let pathOrUrl;

if (process.argv[2] === '--out') {
    out = process.argv[3];
    pathOrUrl = process.argv[4];
}

if (!pathOrUrl) {
    console.error('Usage: node step3.js [--out <file-path>] <path-or-url>');
    process.exit(1);
}

if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    webCat(pathOrUrl, out);
} else {
    cat(pathOrUrl, out);
}