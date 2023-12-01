import * as csv from 'csv-writer';
import * as dayjs from 'dayjs';
import * as isToday from 'dayjs/plugin/isToday';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as os from 'os';
import * as path from 'path';

interface ExportFileRequest {
    date?: string;
    namePrefix?: string;
}

dayjs.extend(isToday);

admin.initializeApp();

const bucket = admin.storage().bucket();

const hasActivation = (data: any, name: string) => data.activations.some((activation: any) => activation.name === name);

const API_KEY = 'bfd1354d-fff9-4890-92eb-1639280add77';

export const exportFile = functions.https.onRequest(async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    if (req.headers['x-api-key'] !== API_KEY) {
        res.status(401).json({ error: 'Not authorized' });
        return;
    }

    const parameters = req.body as ExportFileRequest;

    try {
        const today = dayjs();
        const parameterDate = parameters.date && dayjs(parameters.date, 'YYYY-MM-DD');
        const dateToProcess =
            (parameterDate && parameterDate.isValid() && parameterDate) || dayjs(today).subtract(1, 'days');

        const collectionRef = admin.firestore().collection('users');
        const collectionSnapshot = await collectionRef.get();
        const collectionData = collectionSnapshot.docs.map((doc) => doc.data());

        const fileName = `${parameters.namePrefix || 'users'}_${dateToProcess.format('YYYYMMDD')}.csv`;
        const filePath = path.join(os.tmpdir(), fileName);

        const csvWriter = csv.createObjectCsvWriter({
            path: filePath,
            header: [...HEADERS.map((h) => ({ id: h, title: h }))],
        });

        const filteredCollection = collectionData.filter(
            (user) =>
                dayjs(user.createdAt.toDate()).isSame(dateToProcess, 'day') ||
                user.activations.some((activation: any) =>
                    dayjs(activation.createdAt.toDate()).isSame(dateToProcess, 'day')
                )
        );

        await csvWriter.writeRecords(
            filteredCollection.map((data) => ({
                Nome: data.name,
                FirstName: data.name.split(' ')[0],
                Email: data.email,
                Celular: data.phone.replace(/\D/g, ''),
                Cpf: data.document.replace(/\D/g, ''),
                Optin_Email: data.optins.includes('brand'),
                Optin_sms: data.optins.includes('brand'),
                Gira_Bowls: hasActivation(data, 'gira-bowls'),
                Botao_Tudo_de_Bowl: hasActivation(data, 'botao-tudo-de-bowl'),
                Escorregabowl: hasActivation(data, 'escorrega-bowl'),
                Reels_No_Seu_Ritmo: hasActivation(data, 'reels-no-seu-ritmo'),
                LLL: hasActivation(data, 'lll'),
                Fila_Adidas: hasActivation(data, 'fila-adidas'),
                Lektrek: hasActivation(data, 'fila-adidas'),
                Optin_Sadia: data.optins.includes('brand'),
                Optin_Tf4: data.optins.includes('tf4'),
                Optin_Adidas: data.optins.includes('brand-adidas'),
                Optin_Mercato: data.optins.includes('mercato'),
            }))
        );

        await bucket.upload(filePath, {
            destination: fileName,
            metadata: {
                contentType: 'text/csv',
            },
        });

        res.status(200).send(`CSV file saved to bucket: ${fileName}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while processing the request.');
    }
});

const HEADERS = [
    'Nome',
    'FirstName',
    'Email',
    'Celular',
    'Locale',
    'Cidade',
    'Estado',
    'Optin_Email',
    'Optin_sms',
    'Cpf',
    'RG',
    'Data_de_Nascimento',
    'Endereco',
    'CEP',
    'Gira_Bowls',
    'Botao_Tudo_de_Bowl',
    'Escorregabowl',
    'Reels_No_Seu_Ritmo',
    'LLL',
    'Fila_Adidas',
    'Lektrek',
    'Optin_Sadia',
    'Optin_Tf4',
    'Optin_Adidas',
    'Optin_Mercato',
];
