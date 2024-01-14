const fs = require('fs');
const readline = require('readline');
const xml2js = require('xml2js');

const txtFilePath = 'log.txt';
const xmlFilePath = 'temp.xml';

const emptyPositions = [];

const txtStream = readline.createInterface({
  input: fs.createReadStream(txtFilePath),
  output: process.stdout,
  terminal: false
});

txtStream.on('line', (line) => {
  if (line.includes('Empty spawn at position')) {
    const matches = line.match(/\(\s*(\d+)\s*\/\s*(\d+)\s*\/\s*(\d+)\s*\)/);
    if (matches) {
      const [_, x, y, z] = matches;
      emptyPositions.push({ x, y, z });
    }
  }
});

txtStream.on('close', () => {
  fs.readFile(xmlFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro:', err);
      return;
    }

    xml2js.parseString(data, (parseErr, result) => {
      if (parseErr) {
        console.error('Erro:', parseErr);
        return;
      }

    result.spawns.spawn = result.spawns.spawn.filter((spawn) => {
      const spawnPos = spawn.$;
      const positionExists = emptyPositions.some(position => 
        Number(spawnPos.centerx) === Number(position.x) &&
        Number(spawnPos.centery) === Number(position.y) &&
        Number(spawnPos.centerz) === Number(position.z)
      );
      return !positionExists;
    });
      const builder = new xml2js.Builder();
      const updatedXml = builder.buildObject(result);

      fs.writeFile(xmlFilePath, updatedXml, (writeErr) => {
        if (writeErr) {
          console.error('Erro:', writeErr);
          return;
        }
        console.log('Concluido.');
      });
    });
  });
});
