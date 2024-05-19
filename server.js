const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));

app.post('/generateQR', async (req, res) => {
  const { url } = req.body;
  try {
    const qrCode = await QRCode.toDataURL(url);
    res.json({ qrCode });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

app.get('/scan', (req, res) => {
  const rollNumber = parseInt(req.query.rollNumber, 10);
  let pdfFile;

  if (rollNumber >= 1 && rollNumber <= 11) {
    pdfFile = 'set1.pdf';
  } else if (rollNumber >= 12 && rollNumber <= 22) {
    pdfFile = 'set2.pdf';
  } else {
    pdfFile = 'general.pdf';
  }

  const pdfPath = path.join(__dirname, 'pdfs', pdfFile);
  res.sendFile(pdfPath);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
