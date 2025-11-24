import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function minifyCSS(css) {
    return css
        .replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '') // Remove comments and whitespace
        .replace(/ {2,}/g, ' ') // Remove multiple spaces
        .replace(/ ([{:}]) /g, '$1') // Remove spaces around brackets and colons
        .replace(/([;:,]) /g, '$1') // Remove spaces after semicolons, colons and commas
        .replace(/ !/g, '!'); // Remove spaces before important
}

const inputFile = path.join(__dirname, 'classless.css');
const outputFile = path.join(__dirname, 'classless.min.css');

try {
    const data = await fs.readFile(inputFile, 'utf8');
    const minifiedCSS = minifyCSS(data);
    await fs.writeFile(outputFile, minifiedCSS, 'utf8');
    console.log('CSS minified successfully!');
} catch (err) {
    console.error('Error:', err);
}