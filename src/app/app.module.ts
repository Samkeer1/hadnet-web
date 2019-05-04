import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

/**
 * Firebase Setup
 */
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { BusinessListingsComponent } from './components/business-listings/business-listings.component';
import { LoginComponent } from './components/login/login.component';
import { IsThisBlackOwnedComponent } from './components/is-this-black-owned/is-this-black-owned.component';
import {WebcamModule} from 'ngx-webcam';
import {FormsModule} from '@angular/forms';
import { BusinessListingItemComponent } from './components/business-listing-item/business-listing-item.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { HomeSelectedBusinessComponent } from './components/home-selected-business/home-selected-business.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BusinessListingsComponent,
    HomeViewComponent,
    LoginComponent,
    IsThisBlackOwnedComponent,
    BusinessListingItemComponent,
    MapViewComponent,
    HomeSelectedBusinessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    WebcamModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

