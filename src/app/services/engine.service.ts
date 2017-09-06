import {Injectable} from '@angular/core';
import { CharacterSheet } from "../models/CharacterSheet/CharacterSheet";
@Injectable()
export class EngineService {
    public Modifier(score: number): number {
        return Math.floor((score - 10) / 2);
    }
}
