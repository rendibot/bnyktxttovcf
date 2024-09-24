// Fungsi untuk membaca beberapa file TXT dan mengonversi nomor dengan urutan dimulai dari 1 untuk setiap file
function convertTxtToVcf() {
    const fileInput = document.getElementById('txtFiles');
    const outputContainer = document.getElementById('outputContainer');
    outputContainer.innerHTML = ''; // Kosongkan output sebelumnya

    if (fileInput.files.length === 0) {
        alert('Tidak ada file yang diunggah.');
        return;
    }

    Array.from(fileInput.files).forEach(file => {
        const reader = new FileReader();

        reader.onload = function(event) {
            const text = event.target.result;
            const lines = text.split(/\r?\n/); // Pisahkan file per baris
            let vcfContent = '';
            let startCollecting = false; // Untuk melacak apakah kita harus mulai mengumpulkan nomor setelah label ditemukan
            let contactIndex = 1; // Mulai dari 1 untuk setiap file

            // Dapatkan label pencarian dari input pengguna
            const labelToFind = document.getElementById(`labelName_${file.name}`).value.trim();
            const contactNameBase = document.getElementById('contactName').value.trim(); // Nama kontak dasar dari input pengguna

            if (!contactNameBase) {
                alert('Harap masukkan nama kontak dasar.');
                return;
            }

            // Loop melalui setiap baris
            lines.forEach((line) => {
                const trimmedLine = line.trim();

                // Jika label pencarian tidak dimasukkan, langsung mulai mengonversi nomor
                if (!labelToFind) {
                    startCollecting = true;
                }

                // Jika baris ini cocok dengan label yang dicari, mulai kumpulkan nomor di bawahnya
                if (trimmedLine.includes(labelToFind)) {
                    startCollecting = true;
                    return; // Lanjutkan ke baris berikutnya
                }

                // Jika kita mulai mengumpulkan nomor dan baris ini adalah nomor telepon
                if (startCollecting && trimmedLine !== '' && !isNaN(trimmedLine)) {
                    const contactName = `${contactNameBase} ${contactIndex}`; // Nama kontak dengan urutan yang di-reset setiap file
                    vcfContent += `BEGIN:VCARD\nVERSION:3.0\nFN:${contactName}\nTEL:${trimmedLine}\nEND:VCARD\n\n`;
                    contactIndex++; // Naikkan urutan kontak untuk nomor berikutnya dalam file ini
                }
            });

            // Buat div output untuk file yang diproses
            const fileOutput = document.createElement('div');
            fileOutput.classList.add('file-output');
            fileOutput.innerHTML = `
                <h3>Nama File Asal: ${file.name}</h3>
                <textarea rows="10">${vcfContent}</textarea>
                <label for="vcfFileName_${file.name}">Masukkan nama file VCF (opsional, kosongkan untuk menggunakan nama file TXT):</label>
                <input type="text" id="vcfFileName_${file.name}" placeholder="Nama File VCF">
                <button onclick="downloadVCF('${file.name}', \`${vcfContent}\`)">Generate VCF</button>
            `;
            outputContainer.appendChild(fileOutput);
        };

        reader.readAsText(file);
    });
}

// Fungsi untuk mengunduh file VCF
function downloadVCF(fileName, vcfContent) {
    const vcfFileNameInput = document.getElementById(`vcfFileName_${fileName}`).value;
    const vcfFileName = vcfFileNameInput || fileName.replace('.txt', ''); // Gunakan nama file asli jika tidak ada input nama

    const blob = new Blob([vcfContent], { type: 'text/vcard' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${vcfFileName}.vcf`;
    link.click();
}

document.getElementById('txtFiles').addEventListener('change', function() {
    const outputContainer = document.getElementById('outputContainer');
    outputContainer.innerHTML = ''; // Kosongkan output sebelumnya

    Array.from(this.files).forEach(file => {
        const fileOutput = document.createElement('div');
        fileOutput.classList.add('file-output');
        fileOutput.innerHTML = `
            <h3>Nama File Asal: ${file.name}</h3>
            <label for="labelName_${file.name}">Masukkan label pencarian (opsional, kosongkan untuk mengonversi semua nomor):</label>
            <input type="text" id="labelName_${file.name}" placeholder="Label Pencarian">
        `;
        outputContainer.appendChild(fileOutput);
    });
});