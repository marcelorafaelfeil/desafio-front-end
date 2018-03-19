import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import localeFr from '@angular/common/locales/pt';
import { SemanticModule } from 'ng5-semantic-ui';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NewCheckInComponent } from './components/new-check-in/new-check-in.component';
import { QueriesComponent } from './components/queries/queries.component';
import { DataTablesComponent } from './components/data-tables/data-tables.component';
import { registerLocaleData } from '@angular/common';
import { GuestsService } from './services/guests.service';
import { ModalComponent } from './components/modal/modal.component';
import { ModalHeaderComponent } from './components/modal/components/modal-header/modal-header.component';
import { ModalActionsComponent } from './components/modal/components/modal-actions/modal-actions.component';
import { ModalContentComponent } from './components/modal/components/modal-content/modal-content.component';
import { ModalIconHeaderComponent } from './components/modal/components/modal-icon-header/modal-icon-header.component';
import { ModalImageContentComponent } from './components/modal/components/modal-image-content/modal-image-content.component';
import { FormPeopleComponent } from './components/form-people/form-people.component';
import { ReactiveFormsModule } from '@angular/forms';

registerLocaleData(localeFr, 'pt');

@NgModule({
	declarations: [
		AppComponent,
		DataTablesComponent,
		NewCheckInComponent,
		QueriesComponent,
		ModalComponent,
		ModalHeaderComponent,
		ModalActionsComponent,
		ModalContentComponent,
		ModalIconHeaderComponent,
		ModalImageContentComponent,
		FormPeopleComponent
	],
	imports: [
		BrowserModule,
		SemanticModule,
		HttpClientModule,
		ReactiveFormsModule
	],
	providers: [
		{provide: LOCALE_ID, useValue: 'pt'},
		GuestsService
	],
	bootstrap: [AppComponent],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
