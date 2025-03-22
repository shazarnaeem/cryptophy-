// Hash Generator Function
async function generateHash() {
    const algorithm = document.getElementById('hash-algorithm').value;
    const text = document.getElementById('hash-input').value;
    const outputElement = document.getElementById('hash-output');
    const button = document.getElementById('generate-button');
    const buttonText = button.querySelector('.button-text');
    const loadingSpinner = button.querySelector('.loading-spinner');

    // Show loading state
    button.disabled = true;
    buttonText.style.display = 'none';
    loadingSpinner.style.display = 'inline-block';
    outputElement.value = 'Generating hash...';

    try {
        // Convert text to Uint8Array
        const encoder = new TextEncoder();
        const data = encoder.encode(text);

        // Generate hash based on selected algorithm
        let hash;
        switch(algorithm) {
            case 'sha256':
                hash = await crypto.subtle.digest('SHA-256', data);
                break;
            case 'sha512':
                hash = await crypto.subtle.digest('SHA-512', data);
                break;
            case 'sha1':
                hash = await crypto.subtle.digest('SHA-1', data);
                break;
            case 'md5':
                // Note: MD5 is not supported by Web Crypto API as it's considered cryptographically broken
                outputElement.value = 'MD5 is not supported as it is cryptographically broken';
                return;
        }

        // Convert hash to hex string
        const hashArray = Array.from(new Uint8Array(hash));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        outputElement.value = hashHex;
    } catch (error) {
        outputElement.value = 'Error generating hash: ' + error.message;
    } finally {
        // Reset button state
        button.disabled = false;
        buttonText.style.display = 'inline-block';
        loadingSpinner.style.display = 'none';
    }
} 