import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculatorPageComponent } from '../../../pages/calculator-page/calculator-page.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { ResultCardComponent } from '../../../shared/components/result-card/result-card.component';
import { ChartDisplayComponent, ChartDataSeries } from '../../../shared/components/chart-display/chart-display.component';

@Component({
  selector: 'app-inflation-calculator',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CalculatorPageComponent, 
    InputFieldComponent, 
    ResultCardComponent, 
    ChartDisplayComponent
  ],
  templateUrl: './inflation-calculator.component.html'
})
export class InflationCalculatorComponent implements OnInit {
  currentAmount: number = 100000;
  inflationRate: number = 6;
  tenureYears: number = 10;

  futureValue: number = 0;
  lossAmount: number = 0;
  multiplier: number = 0;
  chartData: ChartDataSeries[] = [];

  ngOnInit() {
    this.calculate();
  }

  calculate() {
    if (this.currentAmount > 0 && this.inflationRate > 0 && this.tenureYears > 0) {
      this.futureValue = this.currentAmount * Math.pow(1 + this.inflationRate / 100, this.tenureYears);
      this.lossAmount = this.futureValue - this.currentAmount;
      this.multiplier = this.futureValue / this.currentAmount;
    } else {
      this.futureValue = this.currentAmount;
      this.lossAmount = 0;
      this.multiplier = 1;
    }

    this.updateChart();
  }

  private updateChart() {
    this.chartData = [
      { name: 'Today\'s Value', value: this.currentAmount, color: '#4F46E5' },
      { name: 'Future Value', value: this.futureValue, color: '#06B6D4' }
    ];
  }
}
