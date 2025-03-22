// Convert text to binary
function textToBinary(text) {
    return text.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
}

// Convert text to hexadecimal
function textToHex(text) {
    return text.split('').map(char => {
        return char.charCodeAt(0).toString(16).padStart(2, '0').toUpperCase();
    }).join(' ');
}

// Convert binary to text
function binaryToText(binary) {
    return binary.split(' ').map(byte => {
        return String.fromCharCode(parseInt(byte, 2));
    }).join('');
}

// Convert hexadecimal to text
function hexToText(hex) {
    return hex.split(' ').map(byte => {
        return String.fromCharCode(parseInt(byte, 16));
    }).join('');
}

// Main conversion function
async function convertBinaryHex() {
    const inputText = document.getElementById('input-text').value;
    const outputElement = document.getElementById('output-text');
    const convertButton = document.getElementById('convert-button');
    const convertButtonText = convertButton.querySelector('.button-text');
    const convertSpinner = convertButton.querySelector('.loading-spinner');
    const conversionType = document.querySelector('input[name="conversion-type"]:checked').value;

    // Show loading state
    convertButton.disabled = true;
    convertButtonText.style.display = 'none';
    convertSpinner.style.display = 'inline-block';
    outputElement.value = 'Converting...';

    try {
        let result;
        switch(conversionType) {
            case 'text-to-binary':
                result = textToBinary(inputText);
                break;
            case 'text-to-hex':
                result = textToHex(inputText);
                break;
            case 'binary-to-text':
                result = binaryToText(inputText);
                break;
            case 'hex-to-text':
                result = hexToText(inputText);
                break;
        }
        outputElement.value = result;
    } catch (error) {
        outputElement.value = 'Error converting text: ' + error.message;
    } finally {
        // Reset button state
        convertButton.disabled = false;
        convertButtonText.style.display = 'inline-block';
        convertSpinner.style.display = 'none';
    }
}

// Copy to clipboard function
async function copyToClipboard() {
    const outputText = document.getElementById('output-text').value;
    const copyButton = document.getElementById('copy-button');
    const copyIcon = copyButton.querySelector('i');

    if (!outputText) {
        return;
    }

    try {
        await navigator.clipboard.writeText(outputText);
        
        // Visual feedback
        copyIcon.className = 'fas fa-check';
        copyButton.classList.add('copied');
        
        // Reset after 2 seconds
        setTimeout(() => {
            copyIcon.className = 'fas fa-copy';
            copyButton.classList.remove('copied');
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
} 