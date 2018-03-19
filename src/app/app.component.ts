import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalComponent } from './components/modal/modal.component';
import { QueriesComponent } from './components/queries/queries.component';

declare var toastr: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'app';

	@ViewChild(ModalComponent)
	public modalCmp: ModalComponent;
	@ViewChild(QueriesComponent)
	private _queriesCmp: QueriesComponent;

	constructor() {

	}

	ngOnInit() {
	}

	public onInsertPeople($evt) {
		this.modalCmp.closeModal();
		toastr.success('Pessoa cadastrada com sucesso.');
	}
}
