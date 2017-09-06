import { Component, Output, EventEmitter } from '@angular/core';
import { Proficiency } from '../../models/CharacterSheet/Proficiency';
import { Skill } from "../../models/CharacterSheet/Skill";
import { CharacterSheet } from "../../models/CharacterSheet/CharacterSheet";
import { AbilityScoreName } from "../../models/CharacterSheet/AbilityScoreName";
import { EngineService } from "../../services/engine.service";
import { Weapon } from "../../models/Equipment/Weapon";

@Component({
    selector: 'character-creation',
    templateUrl: './characterCreation.component.html',
    providers: [EngineService]
})
export class CharacterCreationComponent {
    // Todo:
    // Feats
    constructor(private engine: EngineService) {
        this.character.AbilityScores[AbilityScoreName.Strength] = 9;
        this.character.AbilityScores[AbilityScoreName.Dexterity] = 9;
        this.character.AbilityScores[AbilityScoreName.Constitution] = 9;
        this.character.AbilityScores[AbilityScoreName.Intelligence] = 9;
        this.character.AbilityScores[AbilityScoreName.Wisdom] = 9;
        this.character.AbilityScores[AbilityScoreName.Charisma] = 9;
    
        this.character.Skills['Acrobatics'] =
            {
                AbilityScore: AbilityScoreName.Dexterity,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            };
        this.character.Skills['Athletics'] =
            {
                AbilityScore: AbilityScoreName.Strength,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            };
        this.character.Skills['Deception'] =
            {
                AbilityScore: AbilityScoreName.Charisma,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            };
        this.character.Skills['Insight'] =
            {
                AbilityScore: AbilityScoreName.Wisdom,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            };
        this.character.Skills['Intimidation'] =
            {
                AbilityScore: AbilityScoreName.Charisma,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            }
        this.character.Skills['Investigation'] =
            {
                AbilityScore: AbilityScoreName.Intelligence,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            };
        this.character.Skills['Perception'] =
            {
                AbilityScore: AbilityScoreName.Wisdom,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            }
        this.character.Skills['Performance'] =
            {
                AbilityScore: AbilityScoreName.Charisma,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            };
        this.character.Skills['Persuasion'] =
            {
                AbilityScore: AbilityScoreName.Charisma,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            };
        this.character.Skills['Sleight of Hand'] =
            {
                AbilityScore: AbilityScoreName.Dexterity,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            };
        this.character.Skills['Stealth'] =
            {
                AbilityScore: AbilityScoreName.Dexterity,
                Proficiency: Proficiency.None,
                MiscBonus: 0
            };

        this.equipmentChoice1 = [
            {
                Name: 'Rapier',
                DamageDie: 8,
                IsRanged: false,
                Range: 0,
                RequiresAmmo: false,
                Ammo: 0,
                Properties: [
                    'light'
                ]
            },
            {
                Name: 'Short Sword',
                DamageDie: 6,
                IsRanged: false,
                Range: 0,
                RequiresAmmo: false,
                Ammo: 0,
                Properties: [
                    'light'
                ]
            }
        ];
        this.equipmentChoice2 = [
            {
                Name: 'Shortbow',
                DamageDie: 8,
                IsRanged: true,
                Range: 120,
                RequiresAmmo: true,
                Ammo: 20,
                Properties: [

                ]
            },
            {
                Name: 'Short Sword',
                DamageDie: 6,
                IsRanged: false,
                Range: 0,
                RequiresAmmo: false,
                Ammo: 0,
                Properties: [
                    'light'
                ]
            }
        ];

        this.character.Weapons = [
            this.equipmentChoice1[0],
            this.equipmentChoice2[0],
            {
                Name: 'Dagger',
                DamageDie: 4,
                IsRanged: true,
                Range: 20,
                RequiresAmmo: true,
                Ammo: 1,
                Properties: [
                    'light',
                    'thrown'
                ]
            },
            {
                Name: 'Dagger',
                DamageDie: 4,
                IsRanged: true,
                Range: 20,
                RequiresAmmo: true,
                Ammo: 1,
                Properties: [
                    'light',
                    'thrown'
                ]
            }
        ];

        this.character.Armour = {
            Name: "Leather",
            AC: 11,
            MaxDexterityToAC: -1,
            Type: 1,
            MinStrength: 0,
            StealthPenalty: false
        };

        this.character.Items = [
            "Thieves' tools"
        ]
    }
    @Output() onPageSelect: EventEmitter<string> = new EventEmitter<string>()

    // TODO: Look up point buy rules (DMG sitting right next to you)
    public character: CharacterSheet = new CharacterSheet(this.engine);
    AbilityScoreName = AbilityScoreName;
    Proficiency = Proficiency;

    public totalPointBuyPoints: number = 27; // <- not that
    public skillsTotal: number = 4;
    public expertiseTotal: number = 2;
    public abilityScoreMaxValue: number = 16;
    public abilityScoreMinValue: number = 9;

    public equipmentChoice1: Weapon[];
    public equipmentChoice2: Weapon[];

    public Modifier(score: number): string {
        var mod = this.engine.Modifier(score);
        if (mod > 0) {
            return "+" + mod;
        }
        return mod.toString();
    }

    public AbilityScoreDecrease(score: AbilityScoreName) {
        this.character.AbilityScores[score] = this.character.AbilityScores[score] - 1;
    }

    public AbilityScoreIncrease(score: AbilityScoreName) {
        this.character.AbilityScores[score] = this.character.AbilityScores[score] + 1;
        var newTotal = this.CalculatePointBuy();
        if (newTotal < 0) {
            this.AbilityScoreDecrease(score);
        }
    }

    public CalculatePointBuy() {
        var totalCost = 0;
        var abilityScoreNames = Object.keys(this.character.AbilityScores);
        abilityScoreNames.forEach(ability => {
            totalCost += this.PointBuyValue(this.character.AbilityScores[ability]);
        });
        return this.totalPointBuyPoints - totalCost;
    }

    private PointBuyValue(score: number): number {
        // Scaled up by 1 because human
        if (score <= 9) {
            return 0;
        }
        if (score <= 14) {
            return score - 9;
        }
        if (score === 15) {
            return 7;
        }
        if (score === 16) {
            return 9;
        }
    }

    public IncreaseProficiency(skill: Skill) {
        if (skill.Proficiency === Proficiency.None) {
            if (this.RemainingSkills() > 0) {
                skill.Proficiency = Proficiency.Proficiency;
            }
        }
        else {
            if (skill.Proficiency === Proficiency.Proficiency) {
                if (this.RemainingExpertise() > 0) {
                    skill.Proficiency = Proficiency.Expertise;
                }
            }
        }
    }

    public DecreaseProficiency(skill: Skill) {
        if (skill.Proficiency === Proficiency.Expertise) {
            skill.Proficiency = Proficiency.Proficiency;
        }
        else {
            if (skill.Proficiency === Proficiency.Proficiency) {
                skill.Proficiency = Proficiency.None;
            }
        }
    }

    public RemainingSkills() {
        return this.skillsTotal - Object.keys(this.character.Skills).filter(skill => {
            return this.character.Skills[skill].Proficiency != Proficiency.None;
        }).length;
    }

    public RemainingExpertise() {
        return this.expertiseTotal - Object.keys(this.character.Skills).filter(skill => {
            return this.character.Skills[skill].Proficiency == Proficiency.Expertise;
        }).length;
    }

    public MainMenu() {
        if (confirm("Return to main menu? All unsaved changes will be lost!")) {
            this.onPageSelect.emit("menu");
        }
    }

    public EncodeCharacter() {
        return JSON.stringify(this.character);
    }

    public Keys(obj: any): string[] {
        return Object.keys(obj);
    }
}
