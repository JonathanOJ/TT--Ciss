import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./pages/register/register.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { InputMaskModule } from "primeng/inputmask";
import { ToastModule } from "primeng/toast";
import { NisFormatPipe } from './nis-format.pipe';

@NgModule({
  declarations: [AppComponent, RegisterComponent, NisFormatPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputMaskModule,
    ToastModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
