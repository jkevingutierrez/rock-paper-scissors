import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material';

import { DialogModule } from '@progress/kendo-angular-dialog';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { GameComponent } from './game/game.component';
import { ConfigComponent } from './config/config.component';

import { GameService } from './services/game/game.service';
import { MovementService } from './services/movement/movement.service';
import { ParameterService } from './services/parameter/parameter.service';
import { RankingComponent } from './ranking/ranking.component';

const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'game', redirectTo: '', pathMatch: 'full' },
  { path: 'game/:id', component: GameComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'ranking', component: RankingComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ConfigComponent,
    IndexComponent,
    RankingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    DialogModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    GameService,
    MovementService,
    ParameterService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
