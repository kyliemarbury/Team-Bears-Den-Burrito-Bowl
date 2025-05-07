import { generateCommand } from '../WebsiteStuff/CommandGen.js';

test('generateCommand returns a string', () => {
    const ids = ["minecraft:stone", "minecraft:oak_planks"];
    const command = generateCommand(ids);
    expect(typeof command).toBe("string");
});

test('generateCommand includes correct number of slots', () => {
    const ids = ["minecraft:stone", "minecraft:oak_planks", "minecraft:glass"];
    const command = generateCommand(ids);
    expect(command).toContain("slot:0");
    expect(command).toContain("slot:1");
    expect(command).toContain("slot:2");
});

test('generateCommand ends with correct closing brackets', () => {
    const ids = ["minecraft:stone"];
    const command = generateCommand(ids);
    expect(command.endsWith("]]")).toBe(true);
});

test('generateCommand builds correct format', () => {
    const ids = ["minecraft:stone", "minecraft:dirt"];
    const expected = "/give @a shulker_box[container=[{slot:0,item:{id:minecraft:stone,Count:1}},{slot:1,item:{id:minecraft:dirt,Count:1}}]]";
    const command = generateCommand(ids);
    expect(command).toBe(expected);
});