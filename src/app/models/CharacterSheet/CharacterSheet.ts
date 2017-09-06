import { AbilityScore } from "./AbilityScore";
import { Skill } from "./Skill";
import { EngineService } from "../../services/engine.service";
import { Proficiency } from "./Proficiency";

export class CharacterSheet {
    constructor(private engine: EngineService) {
        this.characterName = "";
        this.playerName = "";
        this.abilityScores = [];
        this.skills = [];
    }
    public characterName: string;
    public playerName: string;
    public abilityScores: AbilityScore[];
    public skills: Skill[];



    public Skill(skillName: string): number {
        var skill: Skill = undefined;
        this.skills.forEach(item => {
            if (item.Name === skillName) {
                skill = item;
            }
        });
        if (skill === undefined) {
            console.log("ERROR: Skill " + skillName + " not found!");
            // display onscreen somehow
            return -999;
        }

        var abilityScore: AbilityScore = undefined;
        this.abilityScores.forEach(item => {
            if (item.Name === skill.AbilityScore) {
                abilityScore = item;
            }
        });
        if (skill === undefined) {
            console.log("ERROR: Ability Score " + skill.AbilityScore + " not found!");
            // display onscreen somehow
            return -999;
        }

        var abilityMod = this.engine.Modifier(abilityScore.Value);
        var proficiencyBonus: number;
        switch (skill.Proficiency) {
            case Proficiency.Proficiency:
                proficiencyBonus = 2; // tood: formula to scale by level
                break;
            case Proficiency.Expertise:
                proficiencyBonus = 2 * 2; // tood: formula to scale by level
                break;
            default:
                proficiencyBonus = 0;
                break;
        }
        return abilityMod + proficiencyBonus + skill.MiscBonus
    }
}
