import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalculatorService } from '../../core/services/calculator.service';
import { Calculator, CalculatorCategory } from '../../core/models/calculator.model';
import { CalculatorCardComponent } from '../../shared/components/calculator-card/calculator-card.component';
import { InputFieldComponent } from '../../shared/components/input-field/input-field.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CalculatorCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  searchQuery = '';
  searchResults: Calculator[] = [];
  categoriesMap = new Map<CalculatorCategory, Calculator[]>();
  categoriesList: CalculatorCategory[] = ['Loan', 'Investment', 'Tax', 'Savings', 'Utility'];

  constructor(private calcService: CalculatorService) {}

  ngOnInit() {
    this.calcService.getCalculatorsByCategory().subscribe(map => {
      this.categoriesMap = map;
    });
  }

  onSearchChange() {
    this.calcService.searchCalculators(this.searchQuery).subscribe(results => {
      this.searchResults = results;
    });
  }
}
