const fs = require('fs');

function cat(path) {
    try {
        const contents = fs.readFileSync(path, 'utf8');
        process.stdout.write(contents);
    } catch (err) {
        console.error(`Error reading ${path}:\n ${err}`);
        process.exit(1);
    }
}

// Get the path from command line arguments
const path = process.argv[2];

if (!path) {
    console.error('Usage: node step1.js <file-path>');
    process.exit(1);
}

cat(path);
