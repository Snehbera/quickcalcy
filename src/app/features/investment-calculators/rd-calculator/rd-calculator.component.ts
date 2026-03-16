import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculatorPageComponent } from '../../../pages/calculator-page/calculator-page.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { ResultCardComponent } from '../../../shared/components/result-card/result-card.component';
import { ChartDisplayComponent, ChartDataSeries } from '../../../shared/components/chart-display/chart-display.component';

@Component({
  selector: 'app-rd-calculator',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CalculatorPageComponent, 
    InputFieldComponent, 
    ResultCardComponent, 
    ChartDisplayComponent
  ],
  templateUrl: './rd-calculator.component.html'
})
export class RdCalculatorComponent implements OnInit {
  monthlyPayment: number = 5000;
  interestRate: number = 7;
  tenureYears: number = 5;

  maturityAmount: number = 0;
  interestEarned: number = 0;
  totalInvestment: number = 0;
  chartData: ChartDataSeries[] = [];

  ngOnInit() {
    this.calculate();
  }

  calculate() {
    if (this.monthlyPayment > 0 && this.interestRate > 0 && this.tenureYears > 0) {
      const R = this.monthlyPayment;
      const r = this.interestRate;
      const n = this.tenureYears * 12; // Total months
      
      this.totalInvestment = R * n;
      
      // Standard Formula for RD Maturity Amount
      // M = R * [(1 + i)^n - 1] / [1 - (1 + i)^(-1/3)]
      // where i = r / 400
      const i = r / 400;
      this.maturityAmount = R * (Math.pow(1 + i, n) - 1) / (1 - Math.pow(1 + i, -1 / 3));
      
      this.interestEarned = this.maturityAmount - this.totalInvestment;
    } else {
      this.totalInvestment = 0;
      this.maturityAmount = 0;
      this.interestEarned = 0;
    }

    this.updateChart();
  }

  private updateChart() {
    this.chartData = [
      { name: 'Total Investment', value: this.totalInvestment, color: '#4F46E5' },
      { name: 'Interest Earned', value: this.interestEarned, color: '#06B6D4' }
    ];
  }
}
