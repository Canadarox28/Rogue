import { Proficiency } from "./Proficiency";
import { AbilityScoreName } from "./AbilityScoreName";

export class Skill {
    constructor() {
        this.AbilityScore = AbilityScoreName.NA;
        this.Proficiency = Proficiency.None;
        this.MiscBonus = 0;
    }
    AbilityScore: AbilityScoreName;
    Proficiency: Proficiency;
    MiscBonus: number;
}
