const fs = require('fs');

const dir = 'public/sequence';
const files = fs.readdirSync(dir).filter(f => f.startsWith('frame_') && f.endsWith('.jpg'));

// custom sort by number
files.sort((a, b) => {
  const numA = parseInt(a.replace('frame_', '').replace('.jpg', ''));
  const numB = parseInt(b.replace('frame_', '').replace('.jpg', ''));
  return numA - numB;
});

let i = 0;
for (const f of files) {
  fs.renameSync(`${dir}/${f}`, `${dir}/temp_${i}.jpg`);
  i++;
}

i = 0;
for (const f of files) {
  fs.renameSync(`${dir}/temp_${i}.jpg`, `${dir}/frame_${i}.jpg`);
  i++;
}

console.log("Total frames:", files.length);
