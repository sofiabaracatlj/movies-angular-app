import { Routes } from '@angular/router';
import { CatalogPageComponent } from './components/catalog-page/catalog-page.component';
import { RankedPageComponent } from './components/ranked-page/ranked-page.component';
import { FavoritePageComponent } from './components/favorite-page/favorite-page.component';

export const routes: Routes = [
    {path: '', component: CatalogPageComponent,},
    {path: 'ranking', component: RankedPageComponent},
    {path: 'lista-de-desejos', component: FavoritePageComponent}
];
