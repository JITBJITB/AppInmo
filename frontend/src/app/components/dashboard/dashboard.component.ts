import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardService, KPIs, SalesByBroker } from '../../services/dashboard.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, NgxChartsModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    kpis: KPIs | null = null;
    salesByBroker: SalesByBroker[] = [];

    // Chart options
    view: [number, number] = [700, 400];
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Broker';
    showYAxisLabel = true;
    yAxisLabel = 'Ventas';
    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    constructor(private dashboardService: DashboardService) { }

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {
        this.dashboardService.getKPIs().subscribe(data => {
            this.kpis = data;
        });

        this.dashboardService.getSalesByBroker().subscribe(data => {
            this.salesByBroker = data;
        });
    }
}
