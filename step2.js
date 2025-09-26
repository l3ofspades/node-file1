const fs = require('fs');
const axios = require('axios');

function cat(path) {
    try {
        const contents = fs.readFileSync(path, 'utf8');
        process.stdout.write(contents);
    } catch (err) {
        console.error(`Error reading ${path}:\n ${err}`);
        process.exit(1);
    }       
}

async function webCat(url) {
    try {
        const response = await axios.get(url);
        process.stdout.write(response.data);
    } catch (err) {
        console.error(`Error fetching ${url}:\n ${err}`);
        process.exit(1);
    }
}

if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    webCat(pathOrUrl);
} else {
    cat(pathOrUrl);
}