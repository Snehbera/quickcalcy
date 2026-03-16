import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Calculator, CalculatorCategory } from '../models/calculator.model';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private readonly calculatorList: Calculator[] = [
    // Loan Calculators
    {
      id: 'emi',
      title: 'EMI Calculator',
      description: 'Calculate your Equated Monthly Installment for loans',
      category: 'Loan',
      icon: '🏛️',
      route: '/loan/emi'
    },
    {
      id: 'home-loan',
      title: 'Home Loan Calculator',
      description: 'Estimate your home loan payments & interest',
      category: 'Loan',
      icon: '🏠',
      route: '/loan/home-loan'
    },
    {
      id: 'car-loan',
      title: 'Car Loan Calculator',
      description: 'Calculate your auto loan payments easily',
      category: 'Loan',
      icon: '🚗',
      route: '/loan/car-loan'
    },

    // Investment Calculators
    {
      id: 'sip',
      title: 'SIP Calculator',
      description: 'Calculate returns on your Systematic Investment Plan',
      category: 'Investment',
      icon: '📈',
      route: '/investment/sip'
    },
    {
      id: 'fd',
      title: 'FD Calculator',
      description: 'Calculate maturity tracking and Fixed Deposit returns',
      category: 'Investment',
      icon: '🏦',
      route: '/investment/fd'
    },
    {
      id: 'rd',
      title: 'RD Calculator',
      description: 'Calculate returns on your Recurring Deposits',
      category: 'Investment',
      icon: '🔄',
      route: '/investment/rd'
    },

    // Tax Calculators
    {
      id: 'income-tax',
      title: 'Income Tax Calculator',
      description: 'Estimate your income tax liability',
      category: 'Tax',
      icon: '🧾',
      route: '/tax/income-tax'
    },
    {
      id: 'gst',
      title: 'GST Calculator',
      description: 'Calculate Goods and Services Tax added or removed',
      category: 'Tax',
      icon: '📊',
      route: '/tax/gst'
    },

    // Savings Calculators
    {
      id: 'retirement',
      title: 'Retirement Calculator',
      description: 'Plan your retirement corpus and savings goal',
      category: 'Savings',
      icon: '🏖️',
      route: '/savings/retirement'
    },
    {
      id: 'net-worth',
      title: 'Net Worth Calculator',
      description: 'Determine your current total net worth',
      category: 'Savings',
      icon: '💎',
      route: '/savings/net-worth'
    },

    // Utility Calculators
    {
      id: 'inflation',
      title: 'Inflation Calculator',
      description: 'Calculate the purchasing power over time',
      category: 'Utility',
      icon: '📉',
      route: '/utility/inflation'
    },
    {
      id: 'discount',
      title: 'Discount Calculator',
      description: 'Find out the savings and final price after discount',
      category: 'Utility',
      icon: '🏷️',
      route: '/utility/discount'
    }
  ];

  private calculatorsSubject = new BehaviorSubject<Calculator[]>(this.calculatorList);

  constructor() { }

  getAllCalculators(): Observable<Calculator[]> {
    return this.calculatorsSubject.asObservable();
  }

  getCalculatorsByCategory(): Observable<Map<CalculatorCategory, Calculator[]>> {
    return this.getAllCalculators().pipe(
      map(calculators => {
        const categoryMap = new Map<CalculatorCategory, Calculator[]>();
        calculators.forEach(calc => {
          if (!categoryMap.has(calc.category)) {
            categoryMap.set(calc.category, []);
          }
          categoryMap.get(calc.category)?.push(calc);
        });
        return categoryMap;
      })
    );
  }

  searchCalculators(query: string): Observable<Calculator[]> {
    return this.getAllCalculators().pipe(
      map(calculators => {
        if (!query || query.trim() === '') {
          return calculators;
        }
        const lowerQuery = query.toLowerCase();
        return calculators.filter(c => 
          c.title.toLowerCase().includes(lowerQuery) || 
          c.description.toLowerCase().includes(lowerQuery)
        );
      })
    );
  }

  getCalculatorById(id: string): Observable<Calculator | undefined> {
    return this.getAllCalculators().pipe(
      map(calculators => calculators.find(c => c.id === id))
    );
  }
}
