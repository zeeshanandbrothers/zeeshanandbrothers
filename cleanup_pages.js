const fs = require('fs');
const path = require('path');

const targetPath = path.join('src', 'pages');

try {
    if (fs.existsSync(targetPath)) {
        fs.rmSync(targetPath, { recursive: true, force: true });
        console.log(`Successfully deleted ${targetPath}`);
    } else {
        console.log(`${targetPath} does not exist.`);
    }
} catch (err) {
    console.error(`Error deleting ${targetPath}:`, err);
}
