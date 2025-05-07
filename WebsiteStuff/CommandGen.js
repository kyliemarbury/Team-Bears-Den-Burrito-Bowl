export function generateCommand(randomIds) {
    let command = "/give @a shulker_box[container=[";
    for (let i = 0; i < randomIds.length; i++) {
        command += `{slot:${i},item:{id:${randomIds[i]},Count:1}}`;
        if (i < randomIds.length - 1) command += ",";
    }
    command += "]]";
    return command;
}