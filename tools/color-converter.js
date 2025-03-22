document.addEventListener('DOMContentLoaded', () => {
    const colorInput = document.getElementById('color-input');
    const colorPicker = document.getElementById('color-picker');
    const colorFormat = document.getElementById('color-format');
    const convertBtn = document.getElementById('convert-color');
    const copyBtn = document.getElementById('copy-color');
    const colorResult = document.getElementById('color-result');
    const colorPreview = document.getElementById('color-preview');

    // Color conversion functions
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }

    function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }

    function hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        let r, g, b;

        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;

            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }

    function getNamedColor(r, g, b) {
        // Simple named color mapping (can be expanded)
        const namedColors = {
            '#000000': 'black',
            '#FFFFFF': 'white',
            '#FF0000': 'red',
            '#00FF00': 'lime',
            '#0000FF': 'blue',
            '#FFFF00': 'yellow',
            '#FF00FF': 'magenta',
            '#00FFFF': 'cyan',
            '#808080': 'gray',
            '#800000': 'maroon',
            '#008000': 'green',
            '#000080': 'navy',
            '#808000': 'olive',
            '#800080': 'purple',
            '#008080': 'teal'
        };

        const hex = rgbToHex(r, g, b);
        return namedColors[hex] || hex;
    }

    // Convert color to specified format
    function convertColor(color, format) {
        let rgb;
        
        // Parse input color
        if (color.startsWith('#')) {
            rgb = hexToRgb(color);
        } else if (color.startsWith('rgb')) {
            const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
            if (match) {
                rgb = {
                    r: parseInt(match[1]),
                    g: parseInt(match[2]),
                    b: parseInt(match[3])
                };
            }
        } else if (color.startsWith('hsl')) {
            const match = color.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%/i);
            if (match) {
                rgb = hslToRgb(
                    parseInt(match[1]),
                    parseInt(match[2]),
                    parseInt(match[3])
                );
            }
        } else {
            // Try named color
            const tempDiv = document.createElement('div');
            tempDiv.style.color = color;
            document.body.appendChild(tempDiv);
            const computedColor = window.getComputedStyle(tempDiv).color;
            document.body.removeChild(tempDiv);
            
            const match = computedColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (match) {
                rgb = {
                    r: parseInt(match[1]),
                    g: parseInt(match[2]),
                    b: parseInt(match[3])
                };
            }
        }

        if (!rgb) {
            throw new Error('Invalid color format');
        }

        // Convert to requested format
        switch (format) {
            case 'hex':
                return rgbToHex(rgb.r, rgb.g, rgb.b);
            case 'rgb':
                return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            case 'rgba':
                return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
            case 'hsl':
                const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
            case 'hsla':
                const hsla = rgbToHsl(rgb.r, rgb.g, rgb.b);
                return `hsla(${hsla.h}, ${hsla.s}%, ${hsla.l}%, 1)`;
            case 'name':
                return getNamedColor(rgb.r, rgb.g, rgb.b);
            default:
                return rgbToHex(rgb.r, rgb.g, rgb.b);
        }
    }

    // Update color preview
    function updatePreview(color) {
        colorPreview.style.backgroundColor = color;
        colorPreview.style.border = '1px solid #ddd';
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
    convertBtn.addEventListener('click', () => {
        try {
            const color = colorInput.value.trim();
            if (!color) {
                showError('Please enter a color code');
                return;
            }

            const result = convertColor(color, colorFormat.value);
            colorResult.value = result;
            updatePreview(result);
        } catch (error) {
            showError(error.message);
        }
    });

    colorPicker.addEventListener('input', (e) => {
        colorInput.value = e.target.value;
        convertBtn.click();
    });

    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(colorResult.value);
            copyBtn.classList.add('copied');
            setTimeout(() => copyBtn.classList.remove('copied'), 2000);
        } catch (error) {
            showError('Failed to copy color code');
        }
    });
}); 