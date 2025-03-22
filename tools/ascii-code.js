document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const asciiInput = document.getElementById('ascii-input');
    const asciiOutput = document.getElementById('ascii-output');
    const textOutput = document.getElementById('text-output');
    const convertToAsciiBtn = document.getElementById('convert-to-ascii');
    const convertToTextBtn = document.getElementById('convert-to-text');
    const copyAsciiBtn = document.getElementById('copy-ascii');
    const copyTextBtn = document.getElementById('copy-text');

    // Convert text to ASCII codes
    function convertToAscii() {
        const text = textInput.value;
        if (!text) {
            showError('Please enter some text to convert');
            return;
        }

        const asciiCodes = Array.from(text).map(char => char.charCodeAt(0));
        asciiOutput.value = asciiCodes.join(' ');
    }

    // Convert ASCII codes to text
    function convertToText() {
        const asciiCodes = asciiInput.value.trim();
        if (!asciiCodes) {
            showError('Please enter ASCII codes to convert');
            return;
        }

        try {
            const codes = asciiCodes.split(/\s+/).map(code => parseInt(code));
            if (codes.some(code => isNaN(code))) {
                throw new Error('Invalid ASCII codes');
            }
            const text = codes.map(code => String.fromCharCode(code)).join('');
            textOutput.value = text;
        } catch (error) {
            showError('Invalid ASCII codes. Please enter valid numbers separated by spaces.');
        }
    }

    // Copy ASCII codes to clipboard
    function copyAsciiCodes() {
        const asciiCodes = asciiOutput.value;
        if (!asciiCodes) {
            showError('No ASCII codes to copy');
            return;
        }

        navigator.clipboard.writeText(asciiCodes)
            .then(() => {
                copyAsciiBtn.classList.add('copied');
                setTimeout(() => copyAsciiBtn.classList.remove('copied'), 2000);
            })
            .catch(() => showError('Failed to copy to clipboard'));
    }

    // Copy text to clipboard
    function copyText() {
        const text = textOutput.value;
        if (!text) {
            showError('No text to copy');
            return;
        }

        navigator.clipboard.writeText(text)
            .then(() => {
                copyTextBtn.classList.add('copied');
                setTimeout(() => copyTextBtn.classList.remove('copied'), 2000);
            })
            .catch(() => showError('Failed to copy to clipboard'));
    }

    // Show error message
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        const container = document.querySelector('.tool-container');
        container.insertBefore(errorDiv, container.firstChild);
        
        setTimeout(() => errorDiv.remove(), 3000);
    }

    // Event listeners
    convertToAsciiBtn.addEventListener('click', convertToAscii);
    convertToTextBtn.addEventListener('click', convertToText);
    copyAsciiBtn.addEventListener('click', copyAsciiCodes);
    copyTextBtn.addEventListener('click', copyText);
}); 