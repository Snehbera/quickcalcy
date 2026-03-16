import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-calculator-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './calculator-page.component.html',
  styleUrl: './calculator-page.component.css'
})
export class CalculatorPageComponent {
  @Input() title: string = 'Calculator';
  @Input() description: string = '';
  @Input() category: string = '';
}
