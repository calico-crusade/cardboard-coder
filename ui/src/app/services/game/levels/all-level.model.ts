import { Level } from "../level.model";

class AllLevels {
    levels: Level[] = [];

    get(id: string): Level | undefined {
        const source = this.levels.find(t => t.id === id);
        return JSON.parse(JSON.stringify(source));
    }
}

export const LEVELS = new AllLevels();
