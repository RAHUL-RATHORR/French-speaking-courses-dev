
import fs from 'fs';

const content = fs.readFileSync('c:/Users/new user/Downloads/French-speaking-courses-dev/src/components/Footer.tsx', 'utf8');
const openDivs = (content.match(/<div/g) || []).length;
const closeDivs = (content.match(/<\/div>/g) || []).length;
const openSpans = (content.match(/<span/g) || []).length;
const closeSpans = (content.match(/<\/span>/g) || []).length;

console.log(`Divs: ${openDivs} open, ${closeDivs} closed`);
console.log(`Spans: ${openSpans} open, ${closeSpans} closed`);
