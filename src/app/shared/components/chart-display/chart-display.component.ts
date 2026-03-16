import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ChartDataSeries {
  name: string;
  value: number;
  color?: string;
}

@Component({
  selector: 'app-chart-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart-display.component.html',
  styleUrl: './chart-display.component.css'
})
export class ChartDisplayComponent {
  @Input() data: ChartDataSeries[] = [];
  @Input() title: string = '';

  get totalValue(): number {
    return this.data.reduce((sum, item) => sum + item.value, 0);
  }

  getPercentages(): { percentage: number, color: string }[] {
    const defaultColors = ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B'];
    const total = this.totalValue;
    
    if (total === 0) return [];

    return this.data.map((item, i) => ({
      percentage: (item.value / total) * 100,
      color: item.color || defaultColors[i % defaultColors.length]
    }));
  }

  getConicGradient(): string {
    const percentages = this.getPercentages();
    if (percentages.length === 0) return 'transparent';

    let currentAngle = 0;
    const gradientStops = percentages.map(p => {
      const start = currentAngle;
      currentAngle += (p.percentage / 100) * 360;
      return `${p.color} ${start}deg ${currentAngle}deg`;
    });

    return `conic-gradient(${gradientStops.join(', ')})`;
  }
}
