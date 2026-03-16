import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculatorPageComponent } from '../../../pages/calculator-page/calculator-page.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { ResultCardComponent } from '../../../shared/components/result-card/result-card.component';
import { ChartDisplayComponent, ChartDataSeries } from '../../../shared/components/chart-display/chart-display.component';

@Component({
  selector: 'app-discount-calculator',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CalculatorPageComponent, 
    InputFieldComponent, 
    ResultCardComponent, 
    ChartDisplayComponent
  ],
  templateUrl: './discount-calculator.component.html'
})
export class DiscountCalculatorComponent implements OnInit {
  originalPrice: number = 1000;
  discountPercentage: number = 20;

  finalPrice: number = 0;
  savings: number = 0;
  chartData: ChartDataSeries[] = [];

  ngOnInit() {
    this.calculate();
  }

  calculate() {
    if (this.originalPrice > 0 && this.discountPercentage > 0) {
      this.savings = (this.originalPrice * this.discountPercentage) / 100;
      this.finalPrice = this.originalPrice - this.savings;
    } else {
      this.savings = 0;
      this.finalPrice = this.originalPrice;
    }

    this.updateChart();
  }

  private updateChart() {
    this.chartData = [
      { name: 'Final Price', value: this.finalPrice, color: '#4F46E5' },
      { name: 'Savings', value: this.savings, color: '#10B981' }
    ];
  }
}
