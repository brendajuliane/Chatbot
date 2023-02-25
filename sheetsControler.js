const { google } = require('googleapis');
const keys = require('./config/sheetsCredentials.json');

const spreadsheetId = 'sheetsID';
const sheetName = 'Registros';

// Configuração da autenticação
const authClient = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

class sheetsController {

    insertRegister(register, callback) {
        const { category, value, description } = register;
        const date = new Date();
        const newRow = [category, value, date, description];

        // Autoriza a conexão com a API do Google Sheets
        authClient.authorize(async (err, tokens) => {
            if (err) {
                console.log(err);
                return false;
            }

            console.log('Conexão bem sucedida!');

            // Inicializa o cliente da API do Google Sheets
            const sheets = google.sheets({ version: 'v4', auth: authClient });            

            try {
                // Obtém informações da planilha
                const res = await sheets.spreadsheets.get({ spreadsheetId });
                console.log(`Nome da planilha: ${res.data.properties.title}`);

                // Obtém o ID da planilha com o nome especificado
                const sheet = res.data.sheets.find(sheet => sheet.properties.title === sheetName);
                const sheetId = sheet.properties.sheetId;

                // Adiciona a nova linha à planilha
                const response = await sheets.spreadsheets.values.append({
                    spreadsheetId,
                    range: `${sheetName}!A:D`,
                    valueInputOption: 'USER_ENTERED',
                    resource: {
                        values: [newRow]
                    }
                });

                console.log(`${response.data.updates.updatedCells} células atualizadas.`);
                callback();

            } catch (err) {
                console.error(err);
            }
        });
    }
}

module.exports = new sheetsController();