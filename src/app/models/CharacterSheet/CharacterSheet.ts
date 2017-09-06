import { AbilityScore } from "./AbilityScore";
import { Skill } from "./Skill";
import { EngineService } from "../../services/engine.service";
import { Proficiency } from "./Proficiency";
import { AbilityScoreName } from "./AbilityScoreName";
import { Weapon } from "../Equipment/Weapon";
import { Armour } from "../Equipment/Armour";

export class CharacterSheet {
    constructor(private engine: EngineService) {
        this.CharacterName = "";
        this.PlayerName = "";
        this.Level = 1;
        this.AbilityScores = {};
        this.Skills = {};
        this.Weapons = [];
        this.Armour = {
            Name: 'Unarmoured',
            AC: 10,
            MaxDexterityToAC: -1,
            MinStrength: 0,
            StealthPenalty: false,
            Type: 0
        };
        this.Items = [];
        this.Feats = [];
    }
    public CharacterName: string;
    public PlayerName: string;
    public Level: number;
    public AbilityScores: { [Score: number]: number };
    public Skills: { [Skill: string]: Skill };

    public Weapons: Weapon[]
    public Armour: Armour;
    public Items: string[];
    public Feats: string[];



    public Skill(skillName: string): number {
        var skill: Skill = this.Skills[skillName];
        if (skill === undefined) {
            console.log("ERROR: Skill " + skillName + " not found!");
            // display onscreen somehow
            return -999;
        }

        var abilityScore: number = this.AbilityScores[skill.AbilityScore];
        if (skill === undefined) {
            console.log("ERROR: Ability Score " + skill.AbilityScore + " not found!");
            // display onscreen somehow
            return -999;
        }

        var abilityMod = this.engine.Modifier(abilityScore);
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

    public AC() {
        var ac = this.Armour.AC;
        if (this.Armour.MaxDexterityToAC >= 0) {
            ac += Math.min(this.engine.Modifier(this.AbilityScores[AbilityScoreName.Dexterity]), this.Armour.MaxDexterityToAC);
        }
        else {
            ac += this.engine.Modifier(this.AbilityScores[AbilityScoreName.Dexterity]);
        }
        return ac;
    }

    public Initiative() {
        var initiative = this.engine.Modifier(this.AbilityScores[AbilityScoreName.Dexterity]);
        if (this.Feats.indexOf('Alert') > 0) {
            initiative += 5;
        }
        return initiative;
    }
}
