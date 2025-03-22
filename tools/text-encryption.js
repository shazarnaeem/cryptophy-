// Show/hide options based on selected algorithm
document.getElementById('encryption-algorithm').addEventListener('change', function() {
    const algorithm = this.value;
    const keyContainer = document.getElementById('key-input-container');
    const railFenceOptions = document.getElementById('rail-fence-options');
    const columnarOptions = document.getElementById('columnar-options');

    // Reset all options visibility
    keyContainer.style.display = 'block';
    railFenceOptions.style.display = 'none';
    columnarOptions.style.display = 'none';

    // Show relevant options based on algorithm
    switch(algorithm) {
        case 'railfence':
            keyContainer.style.display = 'none';
            railFenceOptions.style.display = 'block';
            break;
        case 'columnar':
            columnarOptions.style.display = 'block';
            break;
        case 'rot13':
        case 'atbash':
            keyContainer.style.display = 'none';
            break;
    }
});

// Encryption function
async function encryptText() {
    const algorithm = document.getElementById('encryption-algorithm').value;
    const text = document.getElementById('input-text').value;
    const outputElement = document.getElementById('output-text');
    const encryptButton = document.getElementById('encrypt-button');
    const encryptButtonText = encryptButton.querySelector('.button-text');
    const encryptSpinner = encryptButton.querySelector('.loading-spinner');

    // Show loading state
    encryptButton.disabled = true;
    encryptButtonText.style.display = 'none';
    encryptSpinner.style.display = 'inline-block';
    outputElement.value = 'Encrypting...';

    try {
        let result;
        switch(algorithm) {
            case 'caesar':
                const shift = parseInt(document.getElementById('key').value) || 3;
                result = caesarCipher(text, shift);
                break;
            case 'vigenere':
                const key = document.getElementById('key').value;
                result = vigenereCipher(text, key);
                break;
            case 'aes':
                result = await aesEncrypt(text);
                break;
            case 'rot13':
                result = rot13(text);
                break;
            case 'atbash':
                result = atbash(text);
                break;
            case 'railfence':
                const rails = parseInt(document.getElementById('rails').value) || 2;
                result = railFenceCipher(text, rails);
                break;
            case 'columnar':
                const columnarKey = document.getElementById('columnar-key').value;
                result = columnarTransposition(text, columnarKey);
                break;
        }
        outputElement.value = result;
    } catch (error) {
        outputElement.value = 'Error encrypting text: ' + error.message;
    } finally {
        // Reset button state
        encryptButton.disabled = false;
        encryptButtonText.style.display = 'inline-block';
        encryptSpinner.style.display = 'none';
    }
}

// Decryption function
async function decryptText() {
    const algorithm = document.getElementById('encryption-algorithm').value;
    const text = document.getElementById('input-text').value;
    const outputElement = document.getElementById('output-text');
    const decryptButton = document.getElementById('decrypt-button');
    const decryptButtonText = decryptButton.querySelector('.button-text');
    const decryptSpinner = decryptButton.querySelector('.loading-spinner');

    // Show loading state
    decryptButton.disabled = true;
    decryptButtonText.style.display = 'none';
    decryptSpinner.style.display = 'inline-block';
    outputElement.value = 'Decrypting...';

    try {
        let result;
        switch(algorithm) {
            case 'caesar':
                const shift = parseInt(document.getElementById('key').value) || 3;
                result = caesarCipher(text, -shift);
                break;
            case 'vigenere':
                const key = document.getElementById('key').value;
                result = vigenereCipher(text, key, true);
                break;
            case 'aes':
                result = await aesDecrypt(text);
                break;
            case 'rot13':
                result = rot13(text); // ROT13 is its own inverse
                break;
            case 'atbash':
                result = atbash(text); // Atbash is its own inverse
                break;
            case 'railfence':
                const rails = parseInt(document.getElementById('rails').value) || 2;
                result = railFenceCipher(text, rails, true);
                break;
            case 'columnar':
                const columnarKey = document.getElementById('columnar-key').value;
                result = columnarTransposition(text, columnarKey, true);
                break;
        }
        outputElement.value = result;
    } catch (error) {
        outputElement.value = 'Error decrypting text: ' + error.message;
    } finally {
        // Reset button state
        decryptButton.disabled = false;
        decryptButtonText.style.display = 'inline-block';
        decryptSpinner.style.display = 'none';
    }
}

// Helper Functions
function caesarCipher(text, shift) {
    return text.split('').map(char => {
        if (char.match(/[a-zA-Z]/)) {
            const code = char.charCodeAt(0);
            const base = code >= 97 ? 97 : 65;
            return String.fromCharCode(((code - base + shift + 26) % 26) + base);
        }
        return char;
    }).join('');
}

function vigenereCipher(text, key, decrypt = false) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    key = key.toUpperCase();
    text = text.toUpperCase();

    for (let i = 0; i < text.length; i++) {
        if (text[i].match(/[A-Z]/)) {
            const textIndex = alphabet.indexOf(text[i]);
            const keyIndex = alphabet.indexOf(key[i % key.length]);
            let newIndex;
            
            if (decrypt) {
                newIndex = (textIndex - keyIndex + 26) % 26;
            } else {
                newIndex = (textIndex + keyIndex) % 26;
            }
            
            result += alphabet[newIndex];
        } else {
            result += text[i];
        }
    }
    
    return result;
}

async function aesEncrypt(text) {
    const key = document.getElementById('key').value;
    if (!key) {
        // Generate a random key if none provided
        const randomKey = crypto.getRandomValues(new Uint8Array(32));
        const keyString = Array.from(randomKey).map(b => b.toString(16).padStart(2, '0')).join('');
        document.getElementById('key').value = keyString;
        return 'AES key generated: ' + keyString + '\nPlease save this key for decryption!';
    }

    // Convert text and key to Uint8Array
    const encoder = new TextEncoder();
    const textData = encoder.encode(text);
    const keyData = encoder.encode(key);

    // Generate IV
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // Import key
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        'AES-GCM',
        false,
        ['encrypt']
    );

    // Encrypt
    const encryptedData = await crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        cryptoKey,
        textData
    );

    // Convert to base64
    const encryptedArray = new Uint8Array(encryptedData);
    const ivArray = new Uint8Array(iv);
    const combined = new Uint8Array(ivArray.length + encryptedArray.length);
    combined.set(ivArray);
    combined.set(encryptedArray, ivArray.length);
    return btoa(String.fromCharCode.apply(null, combined));
}

async function aesDecrypt(text) {
    const key = document.getElementById('key').value;
    if (!key) {
        return 'Please provide the encryption key';
    }

    try {
        // Convert base64 to Uint8Array
        const combined = new Uint8Array(atob(text).split('').map(c => c.charCodeAt(0)));
        const iv = combined.slice(0, 12);
        const encryptedData = combined.slice(12);

        // Convert key to Uint8Array
        const encoder = new TextEncoder();
        const keyData = encoder.encode(key);

        // Import key
        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            keyData,
            'AES-GCM',
            false,
            ['decrypt']
        );

        // Decrypt
        const decryptedData = await crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            cryptoKey,
            encryptedData
        );

        // Convert to text
        const decoder = new TextDecoder();
        return decoder.decode(decryptedData);
    } catch (error) {
        return 'Error: Invalid key or encrypted text';
    }
}

function rot13(text) {
    return text.split('').map(char => {
        if (char.match(/[a-zA-Z]/)) {
            const code = char.charCodeAt(0);
            const base = code >= 97 ? 97 : 65;
            return String.fromCharCode(((code - base + 13) % 26) + base);
        }
        return char;
    }).join('');
}

function atbash(text) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const reverse = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
    return text.toUpperCase().split('').map(char => {
        const index = alphabet.indexOf(char);
        return index !== -1 ? reverse[index] : char;
    }).join('');
}

function railFenceCipher(text, rails, decrypt = false) {
    if (rails < 2) return text;
    
    if (decrypt) {
        // Create the rail pattern
        const pattern = [];
        let currentRail = 0;
        let direction = 1;
        
        for (let i = 0; i < text.length; i++) {
            pattern[i] = currentRail;
            currentRail += direction;
            if (currentRail === rails - 1 || currentRail === 0) direction *= -1;
        }
        
        // Create the rail arrays
        const railArrays = Array(rails).fill().map(() => []);
        let currentIndex = 0;
        
        // Fill the rail arrays
        for (let i = 0; i < text.length; i++) {
            railArrays[pattern[i]].push(text[i]);
        }
        
        // Read the text in the correct order
        let result = '';
        currentRail = 0;
        direction = 1;
        
        for (let i = 0; i < text.length; i++) {
            result += railArrays[currentRail].shift();
            currentRail += direction;
            if (currentRail === rails - 1 || currentRail === 0) direction *= -1;
        }
        
        return result;
    } else {
        // Create the rail pattern
        const pattern = [];
        let currentRail = 0;
        let direction = 1;
        
        for (let i = 0; i < text.length; i++) {
            pattern[i] = currentRail;
            currentRail += direction;
            if (currentRail === rails - 1 || currentRail === 0) direction *= -1;
        }
        
        // Create the rail arrays
        const railArrays = Array(rails).fill().map(() => []);
        
        // Fill the rail arrays
        for (let i = 0; i < text.length; i++) {
            railArrays[pattern[i]].push(text[i]);
        }
        
        // Combine the rails
        return railArrays.flat().join('');
    }
}

function columnarTransposition(text, key, decrypt = false) {
    // Remove spaces and convert to uppercase
    text = text.replace(/\s/g, '').toUpperCase();
    key = key.toUpperCase();
    
    // Create the key order
    const keyOrder = key.split('').map((char, index) => ({
        char: char,
        index: index
    })).sort((a, b) => a.char.localeCompare(b.char));
    
    // Calculate column lengths
    const columns = key.length;
    const rows = Math.ceil(text.length / columns);
    
    if (decrypt) {
        // Create the matrix
        const matrix = Array(rows).fill().map(() => Array(columns).fill(''));
        
        // Fill the matrix with the encrypted text
        let textIndex = 0;
        for (let i = 0; i < columns; i++) {
            const colIndex = keyOrder[i].index;
            for (let j = 0; j < rows; j++) {
                if (textIndex < text.length) {
                    matrix[j][colIndex] = text[textIndex++];
                }
            }
        }
        
        // Read the matrix row by row
        return matrix.map(row => row.join('')).join('');
    } else {
        // Create the matrix
        const matrix = Array(rows).fill().map(() => Array(columns).fill(''));
        
        // Fill the matrix with the text
        let textIndex = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (textIndex < text.length) {
                    matrix[i][j] = text[textIndex++];
                }
            }
        }
        
        // Read the matrix column by column according to the key order
        let result = '';
        for (let i = 0; i < columns; i++) {
            const colIndex = keyOrder[i].index;
            for (let j = 0; j < rows; j++) {
                result += matrix[j][colIndex];
            }
        }
        
        return result;
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