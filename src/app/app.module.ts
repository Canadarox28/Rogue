import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { GameComponent } from './components/game/game.component';
import { CharacterCreationComponent } from './components/characterCreation/characterCreation.component';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        GameComponent,
        CharacterCreationComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
