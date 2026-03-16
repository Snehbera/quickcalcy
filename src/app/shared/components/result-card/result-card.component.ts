import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-card.component.html',
  styleUrl: './result-card.component.css'
})
export class ResultCardComponent {
  @Input() title: string = '';
  @Input() value: number | string = 0;
  @Input() highlight: boolean = false;
  @Input() prefix: string = '';
  @Input() suffix: string = '';
}
