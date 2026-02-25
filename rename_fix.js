const fs = require('fs');
const path = require('path');

const files = [
    'src/pages/HomePage.jsx',
    'src/pages/LoadCalculator.jsx'
];

files.forEach(f => {
    try {
        const fullPath = path.resolve(f);
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            console.log(`Deleted ${fullPath}`);
        } else {
            console.log(`${fullPath} does not exist.`);
        }
    } catch (err) {
        console.error(`Error deleting ${f}:`, err);
    }
});
