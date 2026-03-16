import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculatorPageComponent } from '../../../pages/calculator-page/calculator-page.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { ResultCardComponent } from '../../../shared/components/result-card/result-card.component';
import { ChartDisplayComponent, ChartDataSeries } from '../../../shared/components/chart-display/chart-display.component';

@Component({
  selector: 'app-gst-calculator',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CalculatorPageComponent, 
    InputFieldComponent, 
    ResultCardComponent, 
    ChartDisplayComponent
  ],
  templateUrl: './gst-calculator.component.html'
})
export class GstCalculatorComponent implements OnInit {
  amount: number = 10000;
  gstRate: number = 18;
  isExclusive: boolean = true;

  netAmount: number = 0;
  gstAmount: number = 0;
  totalAmount: number = 0;
  chartData: ChartDataSeries[] = [];

  ngOnInit() {
    this.calculate();
  }

  calculate() {
    if (this.amount > 0 && this.gstRate > 0) {
      if (this.isExclusive) {
        // Exclusive: Base Amount + GST
        this.netAmount = this.amount;
        this.gstAmount = (this.amount * this.gstRate) / 100;
        this.totalAmount = this.netAmount + this.gstAmount;
      } else {
        // Inclusive: Total Amount - GST
        this.totalAmount = this.amount;
        this.netAmount = (this.totalAmount * 100) / (100 + this.gstRate);
        this.gstAmount = this.totalAmount - this.netAmount;
      }
    } else {
      this.netAmount = 0;
      this.gstAmount = 0;
      this.totalAmount = 0;
    }

    this.updateChart();
  }

  private updateChart() {
    this.chartData = [
      { name: 'Net Amount', value: this.netAmount, color: '#4F46E5' },
      { name: 'GST Amount', value: this.gstAmount, color: '#F59E0B' }
    ];
  }
}
