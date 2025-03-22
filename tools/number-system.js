document.addEventListener('DOMContentLoaded', () => {
    const numberInput = document.getElementById('number-input');
    const fromBase = document.getElementById('from-base');
    const toBase = document.getElementById('to-base');
    const convertBtn = document.getElementById('convert');
    const resultOutput = document.getElementById('result-output');
    const copyBtn = document.getElementById('copy-result');

    // Convert number from one base to another
    function convertNumber() {
        const number = numberInput.value.trim();
        const fromBaseValue = parseInt(fromBase.value);
        const toBaseValue = parseInt(toBase.value);

        if (!number) {
            showError('Please enter a number to convert');
            return;
        }

        try {
            // First convert to decimal (base 10)
            let decimal = parseInt(number, fromBaseValue);
            if (isNaN(decimal)) {
                throw new Error('Invalid number for the selected base');
            }

            // Then convert from decimal to target base
            let result = decimal.toString(toBaseValue).toUpperCase();
            
            // Add prefix based on target base
            switch(toBaseValue) {
                case 2:
                    result = '0b' + result;
                    break;
                case 8:
                    result = '0o' + result;
                    break;
                case 16:
                    result = '0x' + result;
                    break;
            }

            resultOutput.value = result;
        } catch (error) {
            showError(error.message || 'Invalid input for the selected base');
        }
    }

    // Copy result to clipboard
    function copyResult() {
        const result = resultOutput.value;
        if (!result) {
            showError('No result to copy');
            return;
        }

        navigator.clipboard.writeText(result)
            .then(() => {
                copyBtn.classList.add('copied');
                setTimeout(() => copyBtn.classList.remove('copied'), 2000);
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
    convertBtn.addEventListener('click', convertNumber);
    copyBtn.addEventListener('click', copyResult);
}); 