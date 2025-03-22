// ASCII art patterns
const asciiPatterns = {
    standard: {
        'A': [
            "  *  ",
            " * * ",
            "*****",
            "*   *",
            "*   *"
        ],
        'B': [
            "**** ",
            "*   *",
            "**** ",
            "*   *",
            "**** "
        ],
        'C': [
            " ****",
            "*    ",
            "*    ",
            "*    ",
            " ****"
        ],
        'D': [
            "**** ",
            "*   *",
            "*   *",
            "*   *",
            "**** "
        ],
        'E': [
            "*****",
            "*    ",
            "**** ",
            "*    ",
            "*****"
        ],
        'F': [
            "*****",
            "*    ",
            "**** ",
            "*    ",
            "*    "
        ],
        'G': [
            " ****",
            "*    ",
            "*  **",
            "*   *",
            " ****"
        ],
        'H': [
            "*   *",
            "*   *",
            "*****",
            "*   *",
            "*   *"
        ],
        'I': [
            "*****",
            "  *  ",
            "  *  ",
            "  *  ",
            "*****"
        ],
        'J': [
            "*****",
            "   * ",
            "   * ",
            "*  * ",
            " **  "
        ],
        'K': [
            "*   *",
            "*  * ",
            "***  ",
            "*  * ",
            "*   *"
        ],
        'L': [
            "*    ",
            "*    ",
            "*    ",
            "*    ",
            "*****"
        ],
        'M': [
            "*   *",
            "** **",
            "* * *",
            "*   *",
            "*   *"
        ],
        'N': [
            "*   *",
            "**  *",
            "* * *",
            "*  **",
            "*   *"
        ],
        'O': [
            " *** ",
            "*   *",
            "*   *",
            "*   *",
            " *** "
        ],
        'P': [
            "**** ",
            "*   *",
            "**** ",
            "*    ",
            "*    "
        ],
        'Q': [
            " *** ",
            "*   *",
            "*   *",
            "*  * ",
            " ** *"
        ],
        'R': [
            "**** ",
            "*   *",
            "**** ",
            "*  * ",
            "*   *"
        ],
        'S': [
            " ****",
            "*    ",
            " *** ",
            "    *",
            "**** "
        ],
        'T': [
            "*****",
            "  *  ",
            "  *  ",
            "  *  ",
            "  *  "
        ],
        'U': [
            "*   *",
            "*   *",
            "*   *",
            "*   *",
            " *** "
        ],
        'V': [
            "*   *",
            "*   *",
            "*   *",
            " * * ",
            "  *  "
        ],
        'W': [
            "*   *",
            "*   *",
            "* * *",
            "** **",
            "*   *"
        ],
        'X': [
            "*   *",
            " * * ",
            "  *  ",
            " * * ",
            "*   *"
        ],
        'Y': [
            "*   *",
            " * * ",
            "  *  ",
            "  *  ",
            "  *  "
        ],
        'Z': [
            "*****",
            "   * ",
            "  *  ",
            " *   ",
            "*****"
        ],
        ' ': [
            "     ",
            "     ",
            "     ",
            "     ",
            "     "
        ]
    },
    block: {
        'A': [
            " ███ ",
            "█   █",
            "█████",
            "█   █",
            "█   █"
        ],
        'B': [
            "████ ",
            "█   █",
            "████ ",
            "█   █",
            "████ "
        ],
        'C': [
            " ████",
            "█    ",
            "█    ",
            "█    ",
            " ████"
        ],
        'D': [
            "████ ",
            "█   █",
            "█   █",
            "█   █",
            "████ "
        ],
        'E': [
            "█████",
            "█    ",
            "████ ",
            "█    ",
            "█████"
        ],
        'F': [
            "█████",
            "█    ",
            "████ ",
            "█    ",
            "█    "
        ],
        'G': [
            " ████",
            "█    ",
            "█  ██",
            "█   █",
            " ████"
        ],
        'H': [
            "█   █",
            "█   █",
            "█████",
            "█   █",
            "█   █"
        ],
        'I': [
            "█████",
            "  █  ",
            "  █  ",
            "  █  ",
            "█████"
        ],
        'J': [
            "█████",
            "   █ ",
            "   █ ",
            "█  █ ",
            " ██  "
        ],
        'K': [
            "█   █",
            "█  █ ",
            "███  ",
            "█  █ ",
            "█   █"
        ],
        'L': [
            "█    ",
            "█    ",
            "█    ",
            "█    ",
            "█████"
        ],
        'M': [
            "█   █",
            "██ ██",
            "█ █ █",
            "█   █",
            "█   █"
        ],
        'N': [
            "█   █",
            "██  █",
            "█ █ █",
            "█  ██",
            "█   █"
        ],
        'O': [
            " ███ ",
            "█   █",
            "█   █",
            "█   █",
            " ███ "
        ],
        'P': [
            "████ ",
            "█   █",
            "████ ",
            "█    ",
            "█    "
        ],
        'Q': [
            " ███ ",
            "█   █",
            "█   █",
            "█  █ ",
            " ██ █"
        ],
        'R': [
            "████ ",
            "█   █",
            "████ ",
            "█  █ ",
            "█   █"
        ],
        'S': [
            " ████",
            "█    ",
            " ███ ",
            "    █",
            "████ "
        ],
        'T': [
            "█████",
            "  █  ",
            "  █  ",
            "  █  ",
            "  █  "
        ],
        'U': [
            "█   █",
            "█   █",
            "█   █",
            "█   █",
            " ███ "
        ],
        'V': [
            "█   █",
            "█   █",
            "█   █",
            " █ █ ",
            "  █  "
        ],
        'W': [
            "█   █",
            "█   █",
            "█ █ █",
            "██ ██",
            "█   █"
        ],
        'X': [
            "█   █",
            " █ █ ",
            "  █  ",
            " █ █ ",
            "█   █"
        ],
        'Y': [
            "█   █",
            " █ █ ",
            "  █  ",
            "  █  ",
            "  █  "
        ],
        'Z': [
            "█████",
            "   █ ",
            "  █  ",
            " █   ",
            "█████"
        ],
        ' ': [
            "     ",
            "     ",
            "     ",
            "     ",
            "     "
        ]
    },
    simple: {
        'A': [
            "  A  ",
            " A A ",
            "AAAAA",
            "A   A",
            "A   A"
        ],
        'B': [
            "BBBB ",
            "B   B",
            "BBBB ",
            "B   B",
            "BBBB "
        ],
        'C': [
            " CCCC",
            "C    ",
            "C    ",
            "C    ",
            " CCCC"
        ],
        'D': [
            "DDDD ",
            "D   D",
            "D   D",
            "D   D",
            "DDDD "
        ],
        'E': [
            "EEEEE",
            "E    ",
            "EEEE ",
            "E    ",
            "EEEEE"
        ],
        'F': [
            "FFFFF",
            "F    ",
            "FFFF ",
            "F    ",
            "F    "
        ],
        'G': [
            " GGGG",
            "G    ",
            "G  GG",
            "G   G",
            " GGGG"
        ],
        'H': [
            "H   H",
            "H   H",
            "HHHHH",
            "H   H",
            "H   H"
        ],
        'I': [
            "IIIII",
            "  I  ",
            "  I  ",
            "  I  ",
            "IIIII"
        ],
        'J': [
            "JJJJJ",
            "   J ",
            "   J ",
            "J  J ",
            " JJ  "
        ],
        'K': [
            "K   K",
            "K  K ",
            "KKK  ",
            "K  K ",
            "K   K"
        ],
        'L': [
            "L    ",
            "L    ",
            "L    ",
            "L    ",
            "LLLLL"
        ],
        'M': [
            "M   M",
            "MM MM",
            "M M M",
            "M   M",
            "M   M"
        ],
        'N': [
            "N   N",
            "NN  N",
            "N N N",
            "N  NN",
            "N   N"
        ],
        'O': [
            " OOO ",
            "O   O",
            "O   O",
            "O   O",
            " OOO "
        ],
        'P': [
            "PPPP ",
            "P   P",
            "PPPP ",
            "P    ",
            "P    "
        ],
        'Q': [
            " QQQ ",
            "Q   Q",
            "Q   Q",
            "Q  Q ",
            " QQ Q"
        ],
        'R': [
            "RRRR ",
            "R   R",
            "RRRR ",
            "R  R ",
            "R   R"
        ],
        'S': [
            " SSSS",
            "S    ",
            " SSS ",
            "    S",
            "SSSS "
        ],
        'T': [
            "TTTTT",
            "  T  ",
            "  T  ",
            "  T  ",
            "  T  "
        ],
        'U': [
            "U   U",
            "U   U",
            "U   U",
            "U   U",
            " UUU "
        ],
        'V': [
            "V   V",
            "V   V",
            "V   V",
            " V V ",
            "  V  "
        ],
        'W': [
            "W   W",
            "W   W",
            "W W W",
            "WW WW",
            "W   W"
        ],
        'X': [
            "X   X",
            " X X ",
            "  X  ",
            " X X ",
            "X   X"
        ],
        'Y': [
            "Y   Y",
            " Y Y ",
            "  Y  ",
            "  Y  ",
            "  Y  "
        ],
        'Z': [
            "ZZZZZ",
            "   Z ",
            "  Z  ",
            " Z   ",
            "ZZZZZ"
        ],
        ' ': [
            "     ",
            "     ",
            "     ",
            "     ",
            "     "
        ]
    }
};

// Generate ASCII art
async function generateAsciiArt() {
    const inputText = document.getElementById('input-text').value.toUpperCase();
    const outputElement = document.getElementById('output-text');
    const generateButton = document.getElementById('generate-button');
    const generateButtonText = generateButton.querySelector('.button-text');
    const generateSpinner = generateButton.querySelector('.loading-spinner');
    const style = document.querySelector('input[name="style"]:checked').value;

    // Show loading state
    generateButton.disabled = true;
    generateButtonText.style.display = 'none';
    generateSpinner.style.display = 'inline-block';
    outputElement.textContent = 'Generating...';

    try {
        const patterns = asciiPatterns[style];
        const lines = Array(5).fill('');
        
        // Generate ASCII art line by line
        inputText.split('').forEach(char => {
            const pattern = patterns[char] || patterns[' '];
            pattern.forEach((line, i) => {
                lines[i] += line + ' ';
            });
        });

        // Join lines and trim extra spaces
        const result = lines.map(line => line.trim()).join('\n');
        outputElement.textContent = result;
    } catch (error) {
        outputElement.textContent = 'Error generating ASCII art: ' + error.message;
    } finally {
        // Reset button state
        generateButton.disabled = false;
        generateButtonText.style.display = 'inline-block';
        generateSpinner.style.display = 'none';
    }
}

// Copy to clipboard function
async function copyToClipboard() {
    const outputText = document.getElementById('output-text').textContent;
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