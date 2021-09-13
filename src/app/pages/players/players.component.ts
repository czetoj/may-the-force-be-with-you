import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/services/character.service';
import { SimulateService } from 'src/app/services/simulate.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
  animations: []
})
export class PlayersComponent implements OnInit {

  charactersList: Character[] = [];
  char: Character = new Character();
  index: number = 0;

  lightCharacter: Character = new Character();
  darkCharacter: Character = new Character();

  buttonActive: boolean = false;
  lightYes: boolean = false;
  darkYes: boolean = false;

  constructor(
    private router: Router,
    private characterService: CharacterService,
    private simulateService: SimulateService,
  ) {
    this.characterService.get().subscribe(
      characters => {
        this.charactersList = characters.characters;
        this.char = this.charactersList[0]
      },
      err => console.error(err)
    );
  }

  ngOnInit(): void {
  }

  leftPagination(): void {
    this.buttonActive = false;
    this.index--;
    if (this.index < 0) {
      this.index = this.charactersList.length - 1
    }
    this.char = this.charactersList[this.index]
  }

  rightPagination(): void {
    this.buttonActive = false;
    this.index++;
    if (this.index > this.charactersList.length) {
      this.index = 0;
    }
    this.char = this.charactersList[this.index];
  }

  selectCharacter(char: Character): void {

    if (char.side === "LIGHT" && !this.lightYes) {
      this.lightCharacter = char;
      this.lightYes = true;
      this.buttonActive = true;
    } else if (char.side === "DARK" && !this.darkYes) {
      this.darkCharacter = char;
      this.darkYes = true;
      this.buttonActive = true;
    } else {
      this.buttonActive = false;
      alert("Csak ellenkező csapatban lévő karakterek harcolhatnak egymással!");
    }
  }

  simulate(): void {

    const ids = {
      dark: this.darkCharacter.id,
      light: this.lightCharacter.id
    };

    this.simulateService.selectedCharacters = [
      this.darkCharacter,
      this.lightCharacter
    ];

    this.simulateService.create(ids).subscribe(
      simulationId => {
        this.simulateService.simulationId = simulationId;
        this.router.navigate(['/simulate']);
      },
      err => console.error(err)
    )
  }
}
