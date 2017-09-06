import { Component } from '@angular/core';
import { Proficiency } from '../../models/CharacterSheet/Proficiency';
import { Skill } from "../../models/CharacterSheet/Skill";
import { CharacterSheet } from "../../models/CharacterSheet/CharacterSheet";
import { AbilityScoreName } from "../../models/CharacterSheet/AbilityScoreName";
import { AbilityScore } from "../../models/CharacterSheet/AbilityScore";
import { EngineService } from "../../services/engine.service";

@Component({
    selector: 'character-creation',
    templateUrl: './characterCreation.component.html',
    providers: [EngineService]
})
export class CharacterCreationComponent {
    constructor(private engine: EngineService) {
        this.character.abilityScores = [
            {
                Name: AbilityScoreName.Strength,
                Value: 8
            },
            {
                Name: AbilityScoreName.Dexterity,
                Value: 8
            },
            {
                Name: AbilityScoreName.Constitution,
                Value: 8
            },
            {
                Name: AbilityScoreName.Intelligence,
                Value: 8
            },
            {
                Name: AbilityScoreName.Wisdom,
                Value: 8
            },
            {
                Name: AbilityScoreName.Charisma,
                Value: 8
            }
        ];
        
        this.character.skills = [
            {
                Name: 'Acrobatics',
                AbilityScore: AbilityScoreName.Dexterity,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            },
            {
                Name: 'Athletics',
                AbilityScore: AbilityScoreName.Strength,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            },
            {
                Name: 'Deception',
                AbilityScore: AbilityScoreName.Charisma,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            },
            {
                Name: 'Insight',
                AbilityScore: AbilityScoreName.Wisdom,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            },
            {
                Name: 'Intimidation',
                AbilityScore: AbilityScoreName.Charisma,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            },
            {
                Name: 'Investigation',
                AbilityScore: AbilityScoreName.Intelligence,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            },
            {
                Name: 'Perception',
                AbilityScore: AbilityScoreName.Wisdom,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            },
            {
                Name: 'Performance',
                AbilityScore: AbilityScoreName.Charisma,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            },
            {
                Name: 'Persuasion',
                AbilityScore: AbilityScoreName.Charisma,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            },
            {
                Name: 'Sleight of Hand',
                AbilityScore: AbilityScoreName.Dexterity,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            },
            {
                Name: 'Stealth',
                AbilityScore: AbilityScoreName.Dexterity,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            }
        ]
    }
    // TODO: Look up point buy rules (DMG sitting right next to you)
    public character: CharacterSheet = new CharacterSheet(this.engine);
    AbilityScoreName = AbilityScoreName;
    Proficiency = Proficiency;

    public totalPointBuyRemaining: number = 30; // <- not that
    public skillsTotal: number = 4;

    public Modifier(score: number): string {
        var mod = this.engine.Modifier(score);
        if (mod > 0) {
            return "+" + mod;
        }
        return mod.toString();
    }

    public AbilityScoreDecrease(score: AbilityScore) {
        score.Value = score.Value - 1;
    }

    public AbilityScoreIncrease(score: AbilityScore) {
        score.Value = score.Value + 1;
    }

    public ProficiencyChanged(event: any, skill: Skill)
    {
        if (event.target.checked && this.RemainingSkills() > 0) {
            skill.Proficiency = Proficiency.Proficiency;
        }
        else {
            skill.Proficiency = Proficiency.None;
        }
    }

    public RemainingSkills() {
        return this.skillsTotal - this.character.skills.filter(skill => {
            return skill.Proficiency == Proficiency.Proficiency;
        }).length;
    }

    public Keys(obj: any): string[] {
        return Object.keys(obj);
    }
}
