import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculatorPageComponent } from '../../../pages/calculator-page/calculator-page.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { ResultCardComponent } from '../../../shared/components/result-card/result-card.component';
import { ChartDisplayComponent, ChartDataSeries } from '../../../shared/components/chart-display/chart-display.component';

@Component({
  selector: 'app-home-loan-calculator',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CalculatorPageComponent, 
    InputFieldComponent, 
    ResultCardComponent, 
    ChartDisplayComponent
  ],
  templateUrl: './home-loan-calculator.component.html'
})
export class HomeLoanCalculatorComponent implements OnInit {
  homeValue: number = 5000000;
  downPayment: number = 1000000;
  interestRate: number = 8.5;
  tenureYears: number = 20;

  loanAmount: number = 0;
  emi: number = 0;
  totalInterest: number = 0;
  totalPayment: number = 0;
  chartData: ChartDataSeries[] = [];

  ngOnInit() {
    this.calculate();
  }

  calculate() {
    this.loanAmount = Math.max(0, this.homeValue - this.downPayment);
    
    if (this.loanAmount > 0 && this.interestRate > 0 && this.tenureYears > 0) {
      const r = this.interestRate / 12 / 100;
      const n = this.tenureYears * 12;
      
      this.emi = (this.loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      this.totalPayment = this.emi * n;
      this.totalInterest = this.totalPayment - this.loanAmount;
    } else {
      this.emi = 0;
      this.totalInterest = 0;
      this.totalPayment = 0;
    }

    this.updateChart();
  }

  private updateChart() {
    this.chartData = [
      { name: 'Principal Amount', value: this.loanAmount, color: '#4F46E5' },
      { name: 'Total Interest', value: this.totalInterest, color: '#06B6D4' }
    ];
  }
}
