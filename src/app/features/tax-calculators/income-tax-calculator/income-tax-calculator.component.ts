import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculatorPageComponent } from '../../../pages/calculator-page/calculator-page.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { ResultCardComponent } from '../../../shared/components/result-card/result-card.component';
import { ChartDisplayComponent, ChartDataSeries } from '../../../shared/components/chart-display/chart-display.component';

@Component({
  selector: 'app-income-tax-calculator',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CalculatorPageComponent, 
    InputFieldComponent, 
    ResultCardComponent, 
    ChartDisplayComponent
  ],
  templateUrl: './income-tax-calculator.component.html'
})
export class IncomeTaxCalculatorComponent implements OnInit {
  annualIncome: number = 1000000;
  deductions: number = 150000;
  standardDeduction: number = 50000;

  taxableIncome: number = 0;
  totalTax: number = 0;
  chartData: ChartDataSeries[] = [];

  ngOnInit() {
    this.calculate();
  }

  calculate() {
    this.taxableIncome = Math.max(0, this.annualIncome - this.deductions - this.standardDeduction);
    this.totalTax = this.calculateSlabTax(this.taxableIncome);
    this.updateChart();
  }

  private calculateSlabTax(income: number): number {
    let tax = 0;
    
    // Simplified Indian Tax Slab (Old Regime style for example)
    if (income <= 250000) {
      tax = 0;
    } else if (income <= 500000) {
      tax = (income - 250000) * 0.05;
    } else if (income <= 1000000) {
      tax = (250000 * 0.05) + (income - 500000) * 0.20;
    } else {
      tax = (250000 * 0.05) + (500000 * 0.20) + (income - 1000000) * 0.30;
    }
    
    // Add 4% Cess
    return tax * 1.04;
  }

  private updateChart() {
    const netTakeHome = this.annualIncome - this.totalTax;
    this.chartData = [
      { name: 'Net Take Home', value: netTakeHome, color: '#4F46E5' },
      { name: 'Income Tax', value: this.totalTax, color: '#EF4444' }
    ];
  }
}
