import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculatorPageComponent } from '../../../pages/calculator-page/calculator-page.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { ResultCardComponent } from '../../../shared/components/result-card/result-card.component';
import { ChartDisplayComponent, ChartDataSeries } from '../../../shared/components/chart-display/chart-display.component';

@Component({
  selector: 'app-emi-calculator',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CalculatorPageComponent, 
    InputFieldComponent, 
    ResultCardComponent, 
    ChartDisplayComponent
  ],
  templateUrl: './emi-calculator.component.html'
})
export class EmiCalculatorComponent {
  principal: number = 500000;
  interestRate: number = 8.5;
  tenureYears: number = 5;

  get emi(): number {
    if (!this.principal || !this.interestRate || !this.tenureYears) return 0;
    const r = this.interestRate / 12 / 100;
    const n = this.tenureYears * 12;
    return (this.principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  get totalPayment(): number {
    return this.emi * this.tenureYears * 12;
  }

  get totalInterest(): number {
    return this.totalPayment - this.principal;
  }

  get chartData(): ChartDataSeries[] {
    return [
      { name: 'Principal Amount', value: this.principal, color: '#4F46E5' },
      { name: 'Total Interest', value: this.totalInterest, color: '#06B6D4' }
    ];
  }
}
