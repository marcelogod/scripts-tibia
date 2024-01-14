const fs = require('fs');
const xml2js = require('xml2js');

fs.readFile('temp.xml', 'utf-8', (err, data) => {
    if (err) {
        console.error('Erro:', err);
        return;
    }

    xml2js.parseString(data, (err, result) => {
        if (err) {
            console.error('Erro:', err);
            return;
        }

        result.spawns.spawn.forEach(spawn => {
            spawn.npc = undefined;
        });

        const builder = new xml2js.Builder();
        const xml = builder.buildObject(result);

        fs.writeFile('novo.xml', xml, (err) => {
            if (err) {
                console.error('Erro:', err);
            } else {
                console.log('Concluido');
            }
        });
    });
});
