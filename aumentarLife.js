const fs = require('fs');
const xml2js = require('xml2js');

const folderPath = './monsters/';

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Erro:', err);
    return;
  }

  files.forEach((file) => {
    if (file.endsWith('.xml')) {
      const filePath = folderPath + file;

      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          console.error('Erro', filePath, ':', err);
          return;
        }

        xml2js.parseString(data, (err, result) => {
          if (err) {
            console.error('Erro', filePath, ':', err);
            return;
          }

          const monster = result.monster;

          if (monster && monster.health && monster.health[0]) {
            const health = monster.health[0];
            if (health.$.now && health.$.max) {
              const currentHealth = parseInt(health.$.now);
              const maxHealth = parseInt(health.$.max);

              const newCurrentHealth = currentHealth * 2;
              const newMaxHealth = maxHealth * 2;

              health.$.now = newCurrentHealth.toString();
              health.$.max = newMaxHealth.toString();

              const builder = new xml2js.Builder();
              const updatedXML = builder.buildObject(result);

              fs.writeFile(filePath, updatedXML, (err) => {
                if (err) {
                  console.error('Erro:', filePath, ':', err);
                } else {
                  console.log('Vida:', newCurrentHealth, '/', newMaxHealth, 'em', filePath);
                }
              });
            }
          }
        });
      });
    }
  });
});
