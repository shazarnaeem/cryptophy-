document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const morseInput = document.getElementById('morse-input');
    const textToMorseBtn = document.getElementById('text-to-morse');
    const morseToTextBtn = document.getElementById('morse-to-text');
    const morseOutput = document.getElementById('morse-output');
    const textOutput = document.getElementById('text-output');

    // Add copy buttons to input fields
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

    // Add copy buttons to input fields
    addCopyButton(textInput);
    addCopyButton(morseInput);

    // Morse code mapping
    const morseCode = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
        'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
        'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
        'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
        'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
        'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
        '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
        '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--',
        ' ': '/'
    };

    // Reverse mapping for decoding
    const reverseMorseCode = Object.entries(morseCode).reduce((acc, [key, value]) => {
        acc[value] = key;
        return acc;
    }, {});

    // Convert text to Morse code
    function textToMorse(text) {
        return text.toUpperCase()
            .split('')
            .map(char => morseCode[char] || char)
            .join(' ');
    }

    // Convert Morse code to text
    function morseToText(morse) {
        return morse.split(' ')
            .map(code => reverseMorseCode[code] || code)
            .join('');
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
    textToMorseBtn.addEventListener('click', () => {
        try {
            const text = textInput.value.trim();
            if (!text) {
                showError('Please enter text to convert');
                return;
            }

            const result = textToMorse(text);
            morseOutput.value = result;
        } catch (error) {
            showError('Error converting text to Morse code');
        }
    });

    morseToTextBtn.addEventListener('click', () => {
        try {
            const morse = morseInput.value.trim();
            if (!morse) {
                showError('Please enter Morse code to convert');
                return;
            }

            const result = morseToText(morse);
            textOutput.value = result;
        } catch (error) {
            showError('Error converting Morse code to text');
        }
    });
}); 