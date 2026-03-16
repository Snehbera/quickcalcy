import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

// Loan Calculators
import { EmiCalculatorComponent } from './features/loan-calculators/emi-calculator/emi-calculator.component';
import { HomeLoanCalculatorComponent } from './features/loan-calculators/home-loan-calculator/home-loan-calculator.component';
import { CarLoanCalculatorComponent } from './features/loan-calculators/car-loan-calculator/car-loan-calculator.component';

// Investment Calculators
import { SipCalculatorComponent } from './features/investment-calculators/sip-calculator/sip-calculator.component';
import { FdCalculatorComponent } from './features/investment-calculators/fd-calculator/fd-calculator.component';
import { RdCalculatorComponent } from './features/investment-calculators/rd-calculator/rd-calculator.component';

// Tax Calculators
import { IncomeTaxCalculatorComponent } from './features/tax-calculators/income-tax-calculator/income-tax-calculator.component';
import { GstCalculatorComponent } from './features/tax-calculators/gst-calculator/gst-calculator.component';

// Savings Calculators
import { RetirementCalculatorComponent } from './features/savings-calculators/retirement-calculator/retirement-calculator.component';
import { NetWorthCalculatorComponent } from './features/savings-calculators/net-worth-calculator/net-worth-calculator.component';

// Utility Calculators
import { InflationCalculatorComponent } from './features/utility-calculators/inflation-calculator/inflation-calculator.component';
import { DiscountCalculatorComponent } from './features/utility-calculators/discount-calculator/discount-calculator.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'QuickCalcy - Minimal Calculators' },
  
  { path: 'loan/emi', component: EmiCalculatorComponent, title: 'EMI Calculator - QuickCalcy' },
  { path: 'loan/home-loan', component: HomeLoanCalculatorComponent, title: 'Home Loan Calculator - QuickCalcy' },
  { path: 'loan/car-loan', component: CarLoanCalculatorComponent, title: 'Car Loan Calculator - QuickCalcy' },
  
  { path: 'investment/sip', component: SipCalculatorComponent, title: 'SIP Calculator - QuickCalcy' },
  { path: 'investment/fd', component: FdCalculatorComponent, title: 'FD Calculator - QuickCalcy' },
  { path: 'investment/rd', component: RdCalculatorComponent, title: 'RD Calculator - QuickCalcy' },
  
  { path: 'tax/income-tax', component: IncomeTaxCalculatorComponent, title: 'Income Tax Calculator - QuickCalcy' },
  { path: 'tax/gst', component: GstCalculatorComponent, title: 'GST Calculator - QuickCalcy' },
  
  { path: 'savings/retirement', component: RetirementCalculatorComponent, title: 'Retirement Calculator - QuickCalcy' },
  { path: 'savings/net-worth', component: NetWorthCalculatorComponent, title: 'Net Worth Calculator - QuickCalcy' },

  { path: 'utility/inflation', component: InflationCalculatorComponent, title: 'Inflation Calculator - QuickCalcy' },
  { path: 'utility/discount', component: DiscountCalculatorComponent, title: 'Discount Calculator - QuickCalcy' },

  { path: '**', redirectTo: '' }
];
