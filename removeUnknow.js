const fs = require('fs');
const xml2js = require('xml2js');

const removeTagsFromXML = (filePath) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Erro:', err);
      return;
    }

    xml2js.parseString(data, (err, result) => {
      if (err) {
        console.error('Erro:', err);
        return;
      }

      result.items.item.forEach(item => {
        if (item.attribute) {
          item.attribute = item.attribute.filter(attr => 
            attr.$.key !== 'wrapableTo' && 
            attr.$.key !== 'lootType' && 
            attr.$.key !== 'imbuingSlots' && 
            attr.$.key !== 'bed-type' && 
            attr.$.key !== 'criticalchance' &&
            attr.$.key !== 'criticaldamage' &&
            attr.$.key !== 'carpet' &&
            attr.$.key !== 'skillcriticalchance' &&
            attr.$.key !== 'skillcriticaldamage' &&
            attr.$.key !== 'skilllifechance' &&
            attr.$.key !== 'skilllifeamount' &&
            attr.$.key !== 'skillmanachance' &&
            attr.$.key !== 'skillmanaamount' &&
            attr.$.key !== 'magiclevelHoly' &&
            attr.$.key !== 'magiclevelFire' &&
            attr.$.key !== 'magiclevelDeath' &&
            attr.$.key !== 'capacityPercent' &&
            attr.$.key !== 'capacity' &&
            attr.$.key !== 'magiclevelHealing' &&
            attr.$.key !== 'magiclevelIce' &&
            attr.$.key !== 'magiclevelEarth' &&
            attr.$.key !== 'magiclevelEnergy' &&
            attr.$.key !== 'absorbPercentFire' &&
            attr.$.key !== 'loottype'
          );
        }
      });

      const builder = new xml2js.Builder();
      const xml = builder.buildObject(result);

      fs.writeFile('novo.xml', xml, (err) => {
        if (err) {
          console.error('Erro:', err);
          return;
        }
        console.log('Concluido.');
      });
    });
  });
};

removeTagsFromXML('temp.xml');
