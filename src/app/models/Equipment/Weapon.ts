export class Weapon {
    constructor() {
        this.Name = "UNDEFINED";
        this.DamageDie = 0;
        this.IsRanged = false;
        this.Range = 0;
        this.RequiresAmmo = false;
        this.Ammo = 0;
        this.Properties = [];
    }
    public Name: string;
    public DamageDie: number;
    public IsRanged: boolean;
    public Range: number;
    public RequiresAmmo: boolean;
    public Ammo: number;
    public Properties: string[];
}
