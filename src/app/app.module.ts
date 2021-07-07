import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductsComponent } from './pages/products/products.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { OrderComponent } from './pages/order/order.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { AuthGuard } from './services/auth.guard';
import { RolePipe } from './share/role.pipe';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ModalModule } from './share/modal/modal.module';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProductsComponent,
    ContactComponent,
    AboutComponent,
    PageNotFoundComponent,
    OrderComponent,
    MyOrdersComponent,
    RolePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
