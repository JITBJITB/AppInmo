import { Routes } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { HomeComponent } from './components/home/home.component';
import { InventoryViewComponent } from './components/inventory-view/inventory-view.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { SalesWizardComponent } from './components/sales-wizard/sales-wizard.component';
import { SalesDetailComponent } from './components/sales-detail/sales-detail.component';
import { CommissionsListComponent } from './components/commissions-list/commissions-list.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'projects', component: ProjectListComponent },
    { path: 'inventory/:id', component: InventoryViewComponent },
    { path: 'clients', component: ClientListComponent },
    { path: 'clients/new', component: ClientFormComponent },
    { path: 'clients/:id', component: ClientDetailComponent },
    { path: 'sales/new', component: SalesWizardComponent },
    { path: 'sales/:id', component: SalesDetailComponent },
    { path: 'commissions', component: CommissionsListComponent },
    { path: 'dynamic-inventory', loadComponent: () => import('./components/inventory/building-viewer/building-viewer.component').then(m => m.BuildingViewerComponent) }
];
