import { AppMaterialModule } from './app-material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderComponent } from './order/order.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';




import { Safe } from './safe';

import { AdminBookService, UploadImageService, LoginService, CartService,
  CheckoutService,
  OrderService,
  PaymentService,
  ShippingService,
  UserService} from './services';



  import {
    BookStoreService,
    MasterDetailComponent,
    ListComponent,
    AddBookDialogComponent,
    BooksContainerComponent
  } from './books';
  import {LoginComponent} from './login';

  const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: 'books', component: BooksContainerComponent },
  {path: 'registration', component: UserRegistrationComponent },
  {path: 'login', component: LoginComponent},
  {path: 'myAccount',component: MyAccountComponent},
  {path: 'myProfile',component: MyProfileComponent  },
  {path: 'shoppingCart',component: ShoppingCartComponent },
  {path: 'checkout',component: OrderComponent},
  {path: 'orderSummary',component: OrderSummaryComponent}

  ];





  @NgModule({
    declarations: [
    AppComponent,
    Safe,
    MasterDetailComponent,
    ListComponent,
    AddBookDialogComponent,
    BooksContainerComponent,
    UserRegistrationComponent,
    LoginComponent,
    MyAccountComponent,
    MyProfileComponent,
    ShoppingCartComponent,
    OrderComponent,
    OrderSummaryComponent
    ],
    imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppMaterialModule,
    RouterModule.forRoot(routes)
    ],
    providers: [BookStoreService, AdminBookService, UploadImageService, LoginService,CartService,
    CheckoutService,OrderService,PaymentService,ShippingService,UserService],
    entryComponents: [AddBookDialogComponent],
    bootstrap: [AppComponent]
  })
  export class AppModule {
  }
