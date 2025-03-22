// Base64 encoding function
async function encodeBase64() {
    const inputText = document.getElementById('input-text').value;
    const outputElement = document.getElementById('output-text');
    const encodeButton = document.getElementById('encode-button');
    const encodeButtonText = encodeButton.querySelector('.button-text');
    const encodeSpinner = encodeButton.querySelector('.loading-spinner');

    // Show loading state
    encodeButton.disabled = true;
    encodeButtonText.style.display = 'none';
    encodeSpinner.style.display = 'inline-block';
    outputElement.value = 'Encoding...';

    try {
        const result = btoa(inputText);
        outputElement.value = result;
    } catch (error) {
        outputElement.value = 'Error encoding text: ' + error.message;
    } finally {
        // Reset button state
        encodeButton.disabled = false;
        encodeButtonText.style.display = 'inline-block';
        encodeSpinner.style.display = 'none';
    }
}

// Base64 decoding function
async function decodeBase64() {
    const inputText = document.getElementById('input-text').value;
    const outputElement = document.getElementById('output-text');
    const decodeButton = document.getElementById('decode-button');
    const decodeButtonText = decodeButton.querySelector('.button-text');
    const decodeSpinner = decodeButton.querySelector('.loading-spinner');

    // Show loading state
    decodeButton.disabled = true;
    decodeButtonText.style.display = 'none';
    decodeSpinner.style.display = 'inline-block';
    outputElement.value = 'Decoding...';

    try {
        const result = atob(inputText);
        outputElement.value = result;
    } catch (error) {
        outputElement.value = 'Error decoding text: Invalid Base64 format';
    } finally {
        // Reset button state
        decodeButton.disabled = false;
        decodeButtonText.style.display = 'inline-block';
        decodeSpinner.style.display = 'none';
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