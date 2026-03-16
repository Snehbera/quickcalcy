export type CalculatorCategory = 
  | 'Loan'
  | 'Investment'
  | 'Tax'
  | 'Savings'
  | 'Utility';

export interface Calculator {
  id: string;
  title: string;
  description: string;
  category: CalculatorCategory;
  icon: string; // CSS class or SVG path/name
  route: string;
}

export interface ChartDataSeries {
  name: string;
  value: number;
  color?: string;
}
