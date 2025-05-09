//ChatGPT was used to help generate a test for this
/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Circle Generator (from inline HTML)', () => {
  beforeEach(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../WebsiteStuff/circle_gen.html'), 'utf8');
    document.documentElement.innerHTML = html;

    const scriptMatches = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);

    if (scriptMatches) {
      scriptMatches.forEach(scriptTag => {
        const scriptContent = scriptTag.replace(/<script[^>]*>|<\/script>/gi, '');
        eval(scriptContent); 
      });
    }
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  test('generates a filled circle with radius 1', () => {
    document.getElementById('circle').checked = true;
    document.getElementById('fillType').value = 'filled';
    const radiusInput = document.getElementById('radius');
    radiusInput.value = 1;

    const generateBtn = document.getElementById('generate-btn');
    generateBtn.click();

    const output = document.getElementById('shape-output');
    
    expect(output.style.gridTemplateColumns).toBe('repeat(3, 20px)');
    
    const cells = output.querySelectorAll('.grid-cell');
    expect(cells.length).toBe(9);
    
    
    const expectedFilledIndices = [1, 3, 4, 5, 7]; 
    
    cells.forEach((cell, index) => {
      if (expectedFilledIndices.includes(index)) {
        expect(cell.classList.contains('filled')).toBe(true);
      } else {
        expect(cell.classList.contains('filled')).toBe(false);
      }
    });
  });

  test('generates a circle outline with radius 3', () => {
    
    document.getElementById('circle').checked = true;
    document.getElementById('fillType').value = 'outline';
    const radiusInput = document.getElementById('radius');
    radiusInput.value = 3;

    const generateBtn = document.getElementById('generate-btn');
    generateBtn.click();

    const output = document.getElementById('shape-output');
    
    expect(output.style.gridTemplateColumns).toBe('repeat(7, 20px)');
    
    const cells = output.querySelectorAll('.grid-cell');
    expect(cells.length).toBe(49);
    
    const outlinedCells = output.querySelectorAll('.outline');
    
    expect(outlinedCells.length).toBeGreaterThanOrEqual(10);
    expect(outlinedCells.length).toBeLessThanOrEqual(20);
  });

  test('generates an ellipse', () => {

    document.getElementById('ellipse').checked = true;
    document.getElementById('fillType').value = 'filled';
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    widthInput.value = 4;
    heightInput.value = 2;

    const generateBtn = document.getElementById('generate-btn');
    generateBtn.click();

    const output = document.getElementById('shape-output');
    
    expect(output.style.gridTemplateColumns).toBe('repeat(9, 20px)');

    const cells = output.querySelectorAll('.grid-cell');
    expect(cells.length).toBe(45);

    const filledCells = output.querySelectorAll('.filled');
    
    expect(filledCells.length).toBeGreaterThan(1);
  });
});
