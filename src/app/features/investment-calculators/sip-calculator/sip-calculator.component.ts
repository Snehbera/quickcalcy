import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculatorPageComponent } from '../../../pages/calculator-page/calculator-page.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { ResultCardComponent } from '../../../shared/components/result-card/result-card.component';
import { ChartDisplayComponent, ChartDataSeries } from '../../../shared/components/chart-display/chart-display.component';

@Component({
  selector: 'app-sip-calculator',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CalculatorPageComponent, 
    InputFieldComponent, 
    ResultCardComponent, 
    ChartDisplayComponent
  ],
  templateUrl: './sip-calculator.component.html'
})
export class SipCalculatorComponent implements OnInit {
  monthlyInvestment: number = 5000;
  returnRate: number = 12;
  tenureYears: number = 10;

  totalInvestment: number = 0;
  estimatedReturns: number = 0;
  totalValue: number = 0;
  chartData: ChartDataSeries[] = [];

  ngOnInit() {
    this.calculate();
  }

  calculate() {
    if (this.monthlyInvestment > 0 && this.returnRate > 0 && this.tenureYears > 0) {
      const i = this.returnRate / 100 / 12;
      const n = this.tenureYears * 12;
      
      this.totalInvestment = this.monthlyInvestment * n;
      this.totalValue = this.monthlyInvestment * ( (Math.pow(1 + i, n) - 1) / i ) * (1 + i);
      this.estimatedReturns = this.totalValue - this.totalInvestment;
    } else {
      this.totalInvestment = 0;
      this.totalValue = 0;
      this.estimatedReturns = 0;
    }

    this.updateChart();
  }

  private updateChart() {
    this.chartData = [
      { name: 'Invested Amount', value: this.totalInvestment, color: '#4F46E5' },
      { name: 'Estimated Returns', value: this.estimatedReturns, color: '#06B6D4' }
    ];
  }
}
