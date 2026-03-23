import { Routes } from '@angular/router';
import { MainComponent } from './features/main/main.component';
import { HistoryComponent } from './features/main/history/history/history.component';

export const routes: Routes = [
    { path: 'render', component: MainComponent },
    { path: '', redirectTo: '/render', pathMatch: 'full' },
    { path: 'history', component: HistoryComponent }
];