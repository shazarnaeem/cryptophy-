document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const encodedInput = document.getElementById('encoded-input');
    const encodeBtn = document.getElementById('encode-btn');
    const decodeBtn = document.getElementById('decode-btn');
    const encodedOutput = document.getElementById('encoded-output');
    const decodedOutput = document.getElementById('decoded-output');

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
    addCopyButton(encodedInput);

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
    encodeBtn.addEventListener('click', () => {
        try {
            const text = textInput.value.trim();
            if (!text) {
                showError('Please enter text to encode');
                return;
            }

            const result = encodeURIComponent(text);
            encodedOutput.value = result;
        } catch (error) {
            showError('Error encoding text');
        }
    });

    decodeBtn.addEventListener('click', () => {
        try {
            const encoded = encodedInput.value.trim();
            if (!encoded) {
                showError('Please enter encoded URL to decode');
                return;
            }

            const result = decodeURIComponent(encoded);
            decodedOutput.value = result;
        } catch (error) {
            showError('Error decoding URL. Please check if the input is properly encoded.');
        }
    });
}); 