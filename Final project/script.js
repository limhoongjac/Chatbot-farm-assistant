// Color Palette Generator

// Store the current palette colors and their locked status
let colors = [];
const DEFAULT_PALETTE_SIZE = 5;
const MAX_VISIBLE_COLORS = 30; // Maximum colors to show before pagination

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Generate initial palette
    generateRandomPalette();
    
    // Set up event listeners
    document.getElementById('generate-btn').addEventListener('click', generatePalette);
    document.getElementById('palette-size').addEventListener('change', updatePaletteSize);
    document.getElementById('color-mode').addEventListener('change', generatePalette);
    document.getElementById('export-btn').addEventListener('click', toggleExportOptions);
    
    // Set up export option buttons
    const exportButtons = document.querySelectorAll('.export-options button');
    exportButtons.forEach(button => {
        button.addEventListener('click', () => exportPalette(button.dataset.format));
    });
});

// Generate a palette based on the selected mode
function generatePalette() {
    const mode = document.getElementById('color-mode').value;
    
    switch(mode) {
        case 'monochromatic':
            generateMonochromaticPalette();
            break;
        case 'analogous':
            generateAnalogousPalette();
            break;
        case 'complementary':
            generateComplementaryPalette();
            break;
        default:
            generateRandomPalette();
    }
}

// Generate a random color palette
function generateRandomPalette() {
    const paletteSize = getPaletteSize();
    
    // Initialize colors array if empty or resize it
    if (colors.length !== paletteSize) {
        // Preserve locked colors when changing size
        const newColors = Array(paletteSize).fill().map((_, i) => {
            return colors[i] || { hex: getRandomHex(), locked: false };
        });
        colors = newColors;
    } else {
        // Update only unlocked colors
        colors = colors.map(color => {
            return color.locked ? color : { hex: getRandomHex(), locked: false };
        });
    }
    
    renderPalette();
}

// Generate a monochromatic color palette (variations of a single hue)
function generateMonochromaticPalette() {
    const paletteSize = getPaletteSize();
    const baseHSL = getBaseHSL();
    
    // Create variations with different lightness and saturation
    const newColors = [];
    for (let i = 0; i < paletteSize; i++) {
        if (colors[i] && colors[i].locked) {
            newColors.push(colors[i]);
        } else {
            const saturation = 70 + Math.random() * 30; // 70-100%
            const lightness = 20 + (i * 60 / paletteSize); // Distribute lightness
            const hex = hslToHex(baseHSL.h, saturation, lightness);
            newColors.push({ hex, locked: false });
        }
    }
    
    colors = newColors;
    renderPalette();
}

// Generate an analogous color palette (colors adjacent on the color wheel)
function generateAnalogousPalette() {
    const paletteSize = getPaletteSize();
    const baseHSL = getBaseHSL();
    const hueRange = 60; // Total range of hue variation
    
    const newColors = [];
    for (let i = 0; i < paletteSize; i++) {
        if (colors[i] && colors[i].locked) {
            newColors.push(colors[i]);
        } else {
            // Distribute hues evenly across the range
            const hueOffset = (i * hueRange / (paletteSize - 1)) - (hueRange / 2);
            const hue = (baseHSL.h + hueOffset + 360) % 360;
            const saturation = 70 + Math.random() * 30;
            const lightness = 40 + Math.random() * 20;
            const hex = hslToHex(hue, saturation, lightness);
            newColors.push({ hex, locked: false });
        }
    }
    
    colors = newColors;
    renderPalette();
}

// Generate a complementary color palette (colors opposite on the color wheel)
function generateComplementaryPalette() {
    const paletteSize = getPaletteSize();
    const baseHSL = getBaseHSL();
    
    const newColors = [];
    for (let i = 0; i < paletteSize; i++) {
        if (colors[i] && colors[i].locked) {
            newColors.push(colors[i]);
        } else {
            let hue;
            if (i < paletteSize / 2) {
                // First half: variations around the base hue
                hue = (baseHSL.h + (i * 15)) % 360;
            } else {
                // Second half: variations around the complementary hue
                const complementaryHue = (baseHSL.h + 180) % 360;
                hue = (complementaryHue + ((i - Math.floor(paletteSize / 2)) * 15)) % 360;
            }
            
            const saturation = 70 + Math.random() * 30;
            const lightness = 40 + Math.random() * 20;
            const hex = hslToHex(hue, saturation, lightness);
            newColors.push({ hex, locked: false });
        }
    }
    
    colors = newColors;
    renderPalette();
}

// Get a base HSL color for generating palettes
function getBaseHSL() {
    // Try to use an existing unlocked color as base
    const unlockedColors = colors.filter(color => !color.locked);
    
    if (unlockedColors.length > 0) {
        const baseColor = unlockedColors[Math.floor(Math.random() * unlockedColors.length)];
        return hexToHSL(baseColor.hex);
    }
    
    // If all colors are locked or no colors exist, create a random base
    return {
        h: Math.floor(Math.random() * 360),
        s: 80,
        l: 50
    };
}

// Update the palette size based on the select input
function updatePaletteSize() {
    generatePalette();
}

// Get the current palette size from the select input
function getPaletteSize() {
    return parseInt(document.getElementById('palette-size').value);
}

// Render the color palette to the DOM
function renderPalette() {
    const paletteContainer = document.getElementById('color-palette');
    paletteContainer.innerHTML = '';
    
    // Add pagination controls if needed
    const paletteSize = colors.length;
    
    // Create a grid container for better organization of many colors
    const gridContainer = document.createElement('div');
    gridContainer.className = 'color-grid';
    paletteContainer.appendChild(gridContainer);
    
    // Render all colors
    colors.forEach((color, index) => {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        
        // Create the color display area
        const colorDisplay = document.createElement('div');
        colorDisplay.className = 'color-display';
        colorDisplay.style.backgroundColor = color.hex;
        
        // Create the lock icon
        const lockIcon = document.createElement('div');
        lockIcon.className = 'lock-icon';
        lockIcon.innerHTML = color.locked ? 
            '<i class="fas fa-lock"></i>' : 
            '<i class="fas fa-lock-open"></i>';
        
        lockIcon.addEventListener('click', () => toggleLock(index));
        
        // Create the color info section
        const colorInfo = document.createElement('div');
        colorInfo.className = 'color-info';
        
        const hexValue = document.createElement('div');
        hexValue.className = 'color-hex';
        hexValue.textContent = color.hex.toUpperCase();
        
        const rgbValue = document.createElement('div');
        rgbValue.className = 'color-rgb';
        const rgb = hexToRgb(color.hex);
        rgbValue.textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
        
        // Assemble the swatch
        colorInfo.appendChild(hexValue);
        colorInfo.appendChild(rgbValue);
        swatch.appendChild(colorDisplay);
        swatch.appendChild(lockIcon);
        swatch.appendChild(colorInfo);
        
        // Add click event to copy the color code
        colorDisplay.addEventListener('click', () => {
            copyToClipboard(color.hex);
            showCopiedMessage(colorDisplay, 'Copied!');
        });
        
        gridContainer.appendChild(swatch);
    });
    
    // Add color count indicator if there are many colors
    if (paletteSize > 10) {
        const countIndicator = document.createElement('div');
        countIndicator.className = 'color-count';
        countIndicator.textContent = `Total colors: ${paletteSize}`;
        paletteContainer.insertBefore(countIndicator, paletteContainer.firstChild);
    }
}

// Toggle the lock state of a color
function toggleLock(index) {
    colors[index].locked = !colors[index].locked;
    renderPalette();
}

// Toggle the export options visibility
function toggleExportOptions() {
    const exportOptions = document.getElementById('export-options');
    const currentDisplay = exportOptions.style.display;
    exportOptions.style.display = currentDisplay === 'none' ? 'flex' : 'none';
}

// Export the palette in different formats
function exportPalette(format) {
    let exportText = '';
    
    switch(format) {
        case 'hex':
            exportText = colors.map(color => color.hex.toUpperCase()).join(', ');
            break;
        case 'rgb':
            exportText = colors.map(color => {
                const rgb = hexToRgb(color.hex);
                return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            }).join(', ');
            break;
        case 'css':
            exportText = colors.map((color, i) => {
                return `--color-${i + 1}: ${color.hex.toUpperCase()};`;
            }).join('\n');
            break;
    }
    
    copyToClipboard(exportText);
    showCopiedMessage(document.getElementById('export-btn'), 'Palette copied!');
}

// Helper function to copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

// Show a temporary message when something is copied
function showCopiedMessage(element, message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'absolute';
    notification.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    notification.style.color = 'white';
    notification.style.padding = '8px 12px';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s';
    
    // Position the notification near the element
    const rect = element.getBoundingClientRect();
    notification.style.top = `${rect.top - 40}px`;
    notification.style.left = `${rect.left + rect.width / 2 - 50}px`;
    
    document.body.appendChild(notification);
    
    // Show and then hide the notification
    setTimeout(() => {
        notification.style.opacity = '1';
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 1500);
    }, 10);
}

// Generate a random hex color
function getRandomHex() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Convert hex color to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Convert hex color to HSL
function hexToHSL(hex) {
    const rgb = hexToRgb(hex);
    return rgbToHSL(rgb.r, rgb.g, rgb.b);
}

// Convert RGB to HSL
function rgbToHSL(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0; // achromatic
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

// Convert HSL to hex
function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    
    let r, g, b;
    
    if (h >= 0 && h < 60) {
        [r, g, b] = [c, x, 0];
    } else if (h >= 60 && h < 120) {
        [r, g, b] = [x, c, 0];
    } else if (h >= 120 && h < 180) {
        [r, g, b] = [0, c, x];
    } else if (h >= 180 && h < 240) {
        [r, g, b] = [0, x, c];
    } else if (h >= 240 && h < 300) {
        [r, g, b] = [x, 0, c];
    } else {
        [r, g, b] = [c, 0, x];
    }
    
    r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    b = Math.round((b + m) * 255).toString(16).padStart(2, '0');
    
    return `#${r}${g}${b}`;
}