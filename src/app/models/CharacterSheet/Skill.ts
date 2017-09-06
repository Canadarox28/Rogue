import { Proficiency } from "./Proficiency";
import { AbilityScoreName } from "./AbilityScoreName";

export class Skill {
    constructor() {
        this.Name = "UNDEFINED";
        this.AbilityScore = AbilityScoreName.NA;
        this.Proficiency = Proficiency.None;
        this.MiscBonus = 0;
    }
    Name: string;
    AbilityScore: AbilityScoreName;
    Proficiency: Proficiency;
    MiscBonus: number;
}
