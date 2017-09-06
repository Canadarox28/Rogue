export class Armour {
    constructor() {
        this.Name = "UNDEFINED";
        this.Type = 0;
        this.AC = 10;
        this.MinStrength = 0;
        this.MaxDexterityToAC = -1;
        this.StealthPenalty = false;
    }
    public Name: string;
    public Type: number;
    public AC: number;
    public MinStrength: number;
    public MaxDexterityToAC: number;
    public StealthPenalty: boolean;
}
