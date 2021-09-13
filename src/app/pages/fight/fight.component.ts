import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/character';
import { SimulateService } from 'src/app/services/simulate.service';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss']
})
export class FightComponent implements AfterViewInit {

  characters: Character[] = [];
  winner: Character = new Character();
  gameOver: boolean = false;
  interval: any;

  darkCharacter: Character = new Character();
  lightCharacter: Character = new Character();

  @ViewChild('darkBar', { read: ElementRef }) darkBar!: ElementRef;
  @ViewChild('darkPercent', { read: ElementRef }) darkPercent!: ElementRef;
  @ViewChild('lightBar', { read: ElementRef }) lightBar!: ElementRef;
  @ViewChild('lightPercent', { read: ElementRef }) lightPercent!: ElementRef;
  @ViewChild('darkChar', { read: ElementRef }) darkChar!: ElementRef;
  @ViewChild('lightChar', { read: ElementRef }) lightChar!: ElementRef;
  @ViewChild('versus', { read: ElementRef }) versus!: ElementRef;
  @ViewChild('winnerChar', { read: ElementRef }) winnerChar!: ElementRef;



  constructor(
    private router: Router,
    private simulateService: SimulateService,
  ) { }


  ngAfterViewInit(): void {

    this.winnerChar.nativeElement.style = 'display: none;'

    this.characters = this.simulateService.selectedCharacters;

    this.characters.forEach(char => {
      if (char.side === "LIGHT") {
        this.lightCharacter = char;
      } else {
        this.darkCharacter = char;
      }
    });

    const timeout = setTimeout(() => {
      this.darkBar.nativeElement.style = 'width: 100%';
      this.lightBar.nativeElement.style = 'width: 100%';
      clearTimeout(timeout);
    }, 1000);

    this.interval = setInterval(() => {

      if (parseInt(this.darkPercent.nativeElement.innerText) > 0 && parseInt(this.lightPercent.nativeElement.innerText) > 0) {
        this.fight();

      } else {
        clearInterval(this.interval);
        this.gameOver = true;
        this.darkChar.nativeElement.style = 'animation: darkCharOut 5s linear;';
        this.lightChar.nativeElement.style = 'animation: lightCharOut 5s linear;';
        this.versus.nativeElement.style = 'animation: versusOut 5s linear;';

        setTimeout(() => {
          this.darkChar.nativeElement.style = 'visibility: hidden;'
          this.lightChar.nativeElement.style = 'visibility: hidden;'
          this.versus.nativeElement.style = 'display: none;'
          this.winnerChar.nativeElement.style = 'animation: winnerIn 5s linear'
        }, 5000)

        if (parseInt(this.darkPercent.nativeElement.innerText) > 0) {
          this.winner = this.darkCharacter;
        } else {
          this.winner = this.lightCharacter;
        }
      }
    }, 1000);
  }

  fight(): void {
    if (Math.random() < 0.5) {
      const percent = Math.floor(Math.random() * 50);

      const currentBar = parseInt(this.darkBar.nativeElement.style.width);
      const currentPercent = parseInt(this.darkPercent.nativeElement.innerText);

      if (currentPercent - percent < 0) {
        this.darkBar.nativeElement.style = 'width: 0';
        this.darkPercent.nativeElement.innerText = '0%';
      } else {
        this.darkBar.nativeElement.style = `width: ${currentBar - percent}%`;
        this.darkPercent.nativeElement.innerText = `${currentPercent - percent}%`
      }
    } else {
      const percent = Math.floor(Math.random() * 50);

      const currentBar = parseInt(this.lightBar.nativeElement.style.width);
      const currentPercent = parseInt(this.lightPercent.nativeElement.innerText);

      if (currentPercent - percent < 0) {
        this.lightBar.nativeElement.style = 'width: 0%';
        this.lightPercent.nativeElement.innerText = '0%';
      } else {
        this.lightBar.nativeElement.style = `width: ${currentBar - percent}%`;
        this.lightPercent.nativeElement.innerText = `${currentPercent - percent}%`
      }
    }
  }

  playAgain(): void {
    this.router.navigate(['/characters']);
  }

}
