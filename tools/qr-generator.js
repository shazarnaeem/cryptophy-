document.addEventListener('DOMContentLoaded', () => {
    const qrContent = document.getElementById('qr-content');
    const qrSize = document.getElementById('qr-size');
    const qrColor = document.getElementById('qr-color');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const copyBtn = document.getElementById('copy-btn');
    const qrCanvas = document.getElementById('qr-canvas');

    // Initialize buttons as disabled
    downloadBtn.disabled = true;
    copyBtn.disabled = true;

    // Add copy button to input field
    const addCopyButton = (inputElement) => {
        const wrapper = inputElement.parentElement;
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-button input-copy';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        wrapper.appendChild(copyBtn);

        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(inputElement.value);
                copyBtn.classList.add('copied');
                setTimeout(() => copyBtn.classList.remove('copied'), 2000);
            } catch (error) {
                showError('Failed to copy text');
            }
        });
    };

    // Add copy button to input field
    addCopyButton(qrContent);

    // Show error message
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        const container = document.querySelector('.tool-container');
        container.insertBefore(errorDiv, container.firstChild);
        
        setTimeout(() => errorDiv.remove(), 3000);
    }

    // Generate QR code
    function generateQRCode() {
        const content = qrContent.value.trim();
        if (!content) {
            showError('Please enter content to generate QR code');
            return;
        }

        try {
            const size = parseInt(qrSize.value);
            if (isNaN(size) || size < 100 || size > 500) {
                showError('Invalid QR code size');
                return;
            }

            // Set canvas size
            qrCanvas.width = size;
            qrCanvas.height = size;

            // Clear previous QR code
            const ctx = qrCanvas.getContext('2d');
            ctx.clearRect(0, 0, size, size);

            const options = {
                width: size,
                height: size,
                color: {
                    dark: qrColor.value,
                    light: '#ffffff'
                },
                errorCorrectionLevel: 'H',
                margin: 1
            };

            // Generate QR code
            QRCode.toCanvas(qrCanvas, content, options, (error) => {
                if (error) {
                    console.error('QR Code generation error:', error);
                    showError('Error generating QR code. Please try again.');
                    return;
                }
                downloadBtn.disabled = false;
                copyBtn.disabled = false;
            });
        } catch (error) {
            console.error('QR Code generation error:', error);
            showError('Error generating QR code. Please try again.');
        }
    }

    // Download QR code
    function downloadQRCode() {
        try {
            const link = document.createElement('a');
            link.download = 'qr-code.png';
            link.href = qrCanvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            showError('Failed to download QR code');
        }
    }

    // Copy QR code to clipboard
    async function copyQRCode() {
        try {
            const blob = await new Promise(resolve => qrCanvas.toBlob(resolve, 'image/png'));
            await navigator.clipboard.write([
                new ClipboardItem({
                    [blob.type]: blob
                })
            ]);
            copyBtn.classList.add('copied');
            setTimeout(() => copyBtn.classList.remove('copied'), 2000);
        } catch (error) {
            showError('Failed to copy QR code');
        }
    }

    // Event listeners
    generateBtn.addEventListener('click', generateQRCode);
    downloadBtn.addEventListener('click', downloadQRCode);
    copyBtn.addEventListener('click', copyQRCode);
}); 