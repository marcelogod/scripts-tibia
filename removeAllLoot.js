const fs = require('fs');
const path = require('path');
const { parseString, Builder } = require('xml2js');

const pastaPrincipal = './monster';

function removeTagLootDoArquivo(caminhoDoArquivo) {
    fs.readFile(caminhoDoArquivo, 'utf-8', (err, data) => {
        if (err) {
            console.error('Erro:', err);
            return;
        }

        parseString(data, (parseErr, result) => {
            if (parseErr) {
                console.error('Erro:', parseErr);
                return;
            }

            if (result.monster && result.monster.loot) {
                delete result.monster.loot;
            }

            const builder = new Builder();
            const xml = builder.buildObject(result);

            fs.writeFile(caminhoDoArquivo, xml, (writeErr) => {
                if (writeErr) {
                    console.error('Erro:', writeErr);
                } else {
                    console.log(`Loot removeido: ${caminhoDoArquivo}`);
                }
            });
        });
    });
}

function removeTagLootDasPastas(caminhoDaPasta) {
    fs.readdir(caminhoDaPasta, (err, arquivos) => {
        if (err) {
            console.error('Erro:', err);
            return;
        }

        arquivos.forEach((arquivo) => {
            const caminhoCompleto = path.join(caminhoDaPasta, arquivo);
            fs.stat(caminhoCompleto, (statErr, stats) => {
                if (statErr) {
                    console.error('Erro:', statErr);
                    return;
                }
                if (stats.isDirectory()) {
                    removeTagLootDasPastas(caminhoCompleto);
                } else if (arquivo.endsWith('.xml')) {
                    removeTagLootDoArquivo(caminhoCompleto);
                }
            });
        });
    });
}

removeTagLootDasPastas(pastaPrincipal);
