/**
 * @jest-environment jsdom
 */

Object.assign(navigator, {
    clipboard: {
      writeText: jest.fn()
    }
  });
// Mocking the clipboard API for testing


const fs = require('fs');
const path = require('path');

describe('Palette Generator - In-game command test', () => {
  beforeEach(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../WebsiteStuff/palette.html'), 'utf8');
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

  test('generates valid /give command for non-flammable blocks', () => {
    const generateBtn = document.getElementById('test-Palette-button');
    const colorPicker = document.getElementById('color-picker');
    const blockCountInput = document.getElementById('block-count');
    const flammabilityCheck = document.getElementById('Flammability-check');

    colorPicker.value = '#ff0000';
    blockCountInput.value = 3;
    flammabilityCheck.checked = true;

    // Mock CSV data and MatchColor for this test
    const fakeCsvData = [
      ['Red Block', 'ff0000', 'red_block.png', 'false', 'minecraft:red_block'],
      ['Red Wool', 'ff0000', 'red_wool.png', 'false', 'minecraft:red_wool'],
      ['Red Wood', 'ff0000', 'red_wood.png', 'true', 'minecraft:red_wood']
    ];

    // Inject mock
    global.MatchColor = (a, b, tolerance) => true;
    global.parse = async () => fakeCsvData;

    return parse().then(() => {
      generateBtn.click();
      const commandText = navigator.clipboard.writeText.mock.calls[0][0];

      // Check format
      expect(commandText.startsWith('/give @a shulker_box[container=[')).toBe(true);
      expect(commandText.endsWith(']]')).toBe(true);

      // Check non-flammable items only
      expect(commandText).toContain('minecraft:red_block');
      expect(commandText).toContain('minecraft:red_wool');
      expect(commandText).not.toContain('minecraft:red_wood');
    });
  });
});