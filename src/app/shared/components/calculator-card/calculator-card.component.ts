import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Calculator } from '../../../core/models/calculator.model';

@Component({
  selector: 'app-calculator-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './calculator-card.component.html',
  styleUrl: './calculator-card.component.css'
})
export class CalculatorCardComponent {
  @Input() calculator!: Calculator;
}
