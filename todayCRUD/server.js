
const fs = require('fs');

function createfile() {
    fs.writeFileSync('Data.txt', 'Hello From Server');
    console.log('File is Created');
}

function readFile() {
    const data = fs.readFileSync('Data.txt', 'utf-8');
    console.log(data);
}

function updateFile() {
    fs.appendFileSync('Data.txt', '\nHii, update this server');
    console.log('File is Updated');
}

function deletefile() {
    fs.unlinkSync('Data.txt');
    console.log('File is Deleted');
}

// Run only the function you need:
createfile();
readFile();
updateFile();
deletefile();
