import { Component, OnInit, ViewChild } from '@angular/core';
import { Guests } from '../../models/Guets.model';
import { DataTablesComponent } from '../data-tables/data-tables.component';
import { GuestsService } from '../../services/guests.service';

@Component({
	selector: 'app-queries',
	templateUrl: './queries.component.html',
	styleUrls: ['./queries.component.scss']
})
export class QueriesComponent implements OnInit {

	@ViewChild(DataTablesComponent)
	private _dt: DataTablesComponent;

	public listOfGuests: Array<Guests> = new Array();
	public loadingQueries: boolean;

	constructor(
		private _guesSer: GuestsService
	) {
		this.loadingQueries = true;
		this._guesSer.getGuests().subscribe((res: Array<Guests>) => {
			this.listOfGuests = res;
			this._dt.init();
			this.loadingQueries = false;
		});
	}

	ngOnInit() {

		this._dt.autoStart(false);

		const guests: Guests = new Guests;


	}

	public addGuest(guest: Guests) {
		this.listOfGuests.push(guest);
		this._dt.redraw();
	}

}
