import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculatorPageComponent } from '../../../pages/calculator-page/calculator-page.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { ResultCardComponent } from '../../../shared/components/result-card/result-card.component';
import { ChartDisplayComponent, ChartDataSeries } from '../../../shared/components/chart-display/chart-display.component';

@Component({
  selector: 'app-retirement-calculator',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CalculatorPageComponent, 
    InputFieldComponent, 
    ResultCardComponent, 
    ChartDisplayComponent
  ],
  templateUrl: './retirement-calculator.component.html'
})
export class RetirementCalculatorComponent implements OnInit {
  currentAge: number = 30;
  retirementAge: number = 60;
  currentSavings: number = 500000;
  monthlyContribution: number = 10000;
  returnRate: number = 10;

  totalCorpus: number = 0;
  totalContribution: number = 0;
  totalInterest: number = 0;
  chartData: ChartDataSeries[] = [];

  ngOnInit() {
    this.calculate();
  }

  calculate() {
    const yearsToRetire = Math.max(0, this.retirementAge - this.currentAge);
    const months = yearsToRetire * 12;

    if (months > 0) {
      const i = this.returnRate / 100 / 12;
      
      // Future value of existing savings
      const fvCurrent = this.currentSavings * Math.pow(1 + i, months);
      
      // Future value of monthly contributions
      const fvMonthly = this.monthlyContribution * ( (Math.pow(1 + i, months) - 1) / i ) * (1 + i);
      
      this.totalCorpus = fvCurrent + fvMonthly;
      this.totalContribution = this.currentSavings + (this.monthlyContribution * months);
      this.totalInterest = this.totalCorpus - this.totalContribution;
    } else {
      this.totalCorpus = this.currentSavings;
      this.totalContribution = this.currentSavings;
      this.totalInterest = 0;
    }

    this.updateChart();
  }

  private updateChart() {
    this.chartData = [
      { name: 'Total Contributions', value: this.totalContribution, color: '#4F46E5' },
      { name: 'Interest Earned', value: this.totalInterest, color: '#06B6D4' }
    ];
  }
}
