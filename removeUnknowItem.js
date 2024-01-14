const fs = require('fs');
const path = require('path');
const readline = require('readline');

const arquivoLog = 'log.txt';
const pastaMonstros = './monsters';

fs.readFile(arquivoLog, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro:', err);
      return;
    }
  
    const itensComErro = data.match(/Unknown loot item "(.*?)"/g);
    if (!itensComErro) {
      console.log('Nenhum item.');
      return;
    }
  
    itensComErro.forEach(item => {
      const itemName = item.match(/Unknown loot item "(.*?)"/)[1];
  
      fs.readdir(pastaMonstros, (err, files) => {
        if (err) {
          console.error('Erro:', err);
          return;
        }
  
        files.forEach(file => {
          if (file.endsWith('.xml')) {
            const filePath = path.join(pastaMonstros, file);
  
            try {
              const fileData = fs.readFileSync(filePath, 'utf8');
  
              const regex = new RegExp(`<item name="${itemName}"[^>]*\\/?>\\s*`, 'g');
              const newData = fileData.replace(regex, '');
  
              fs.writeFileSync(filePath, newData, 'utf8');
              console.log(`Item "${itemName}" removido do ${file}`);
            } catch (err) {
              console.error('Erro:', err);
            }
          }
        });
      });
    });
  });