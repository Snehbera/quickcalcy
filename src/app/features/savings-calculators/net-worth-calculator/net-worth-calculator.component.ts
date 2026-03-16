import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculatorPageComponent } from '../../../pages/calculator-page/calculator-page.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { ResultCardComponent } from '../../../shared/components/result-card/result-card.component';
import { ChartDisplayComponent, ChartDataSeries } from '../../../shared/components/chart-display/chart-display.component';

@Component({
  selector: 'app-net-worth-calculator',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CalculatorPageComponent, 
    InputFieldComponent, 
    ResultCardComponent, 
    ChartDisplayComponent
  ],
  templateUrl: './net-worth-calculator.component.html'
})
export class NetWorthCalculatorComponent implements OnInit {
  // Assets
  cash: number = 50000;
  investments: number = 200000;
  realEstate: number = 5000000;
  otherAssets: number = 100000;

  // Liabilities
  loans: number = 1500000;
  creditCard: number = 20000;
  otherLiabilities: number = 0;

  totalAssets: number = 0;
  totalLiabilities: number = 0;
  netWorth: number = 0;
  chartData: ChartDataSeries[] = [];

  ngOnInit() {
    this.calculate();
  }

  calculate() {
    this.totalAssets = Number(this.cash) + Number(this.investments) + Number(this.realEstate) + Number(this.otherAssets);
    this.totalLiabilities = Number(this.loans) + Number(this.creditCard) + Number(this.otherLiabilities);
    this.netWorth = this.totalAssets - this.totalLiabilities;
    this.updateChart();
  }

  private updateChart() {
    this.chartData = [
      { name: 'Assets', value: this.totalAssets, color: '#4F46E5' },
      { name: 'Liabilities', value: this.totalLiabilities, color: '#EF4444' }
    ];
  }
}
