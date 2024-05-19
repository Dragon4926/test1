document.getElementById('generateBtn').addEventListener('click', async () => {
  const rollNumber = document.getElementById('rollNumber').value;
  const url = `http://localhost:3000/scan?rollNumber=${rollNumber}`;

  const response = await fetch('/generateQR', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  const data = await response.json();
  document.getElementById('qrCode').src = data.qrCode;
});
