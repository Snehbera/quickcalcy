import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculatorPageComponent } from '../../../pages/calculator-page/calculator-page.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { ResultCardComponent } from '../../../shared/components/result-card/result-card.component';
import { ChartDisplayComponent, ChartDataSeries } from '../../../shared/components/chart-display/chart-display.component';

@Component({
  selector: 'app-fd-calculator',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CalculatorPageComponent, 
    InputFieldComponent, 
    ResultCardComponent, 
    ChartDisplayComponent
  ],
  templateUrl: './fd-calculator.component.html'
})
export class FdCalculatorComponent implements OnInit {
  principal: number = 100000;
  interestRate: number = 7;
  tenureYears: number = 5;

  maturityAmount: number = 0;
  interestEarned: number = 0;
  chartData: ChartDataSeries[] = [];

  ngOnInit() {
    this.calculate();
  }

  calculate() {
    if (this.principal > 0 && this.interestRate > 0 && this.tenureYears > 0) {
      // Standard FD calculation assuming quarterly compounding
      const p = this.principal;
      const r = this.interestRate / 100;
      const t = this.tenureYears;
      const n = 4; // Quarterly compounding
      
      this.maturityAmount = p * Math.pow(1 + (r / n), n * t);
      this.interestEarned = this.maturityAmount - p;
    } else {
      this.maturityAmount = 0;
      this.interestEarned = 0;
    }

    this.updateChart();
  }

  private updateChart() {
    this.chartData = [
      { name: 'Invested Amount', value: this.principal, color: '#4F46E5' },
      { name: 'Interest Earned', value: this.interestEarned, color: '#06B6D4' }
    ];
  }
}
