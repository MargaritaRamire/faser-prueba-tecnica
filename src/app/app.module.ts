import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Agrega esta línea
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule, // Agrega FormsModule aquí
		AppRoutingModule
	],
	providers: [AppService],
	bootstrap: [AppComponent]
})
export class AppModule { }


