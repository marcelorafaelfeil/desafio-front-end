import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Guests } from '../models/Guets.model';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { FormGroup } from '@angular/forms';

@Injectable()
export class GuestsService {

	constructor(
		private _http: HttpClient
	) { }

	public getGuests(): Observable<Array<Guests>> {
		return this._http.get(environment.api.guests.list)
		.map((res: Response) => {
			if (res['data']) {
				const guests: Array<Guests> = new Array();

				for ( let i = 0; i < res['data'].length; i++) {
					const d = res['data'][i];
					const guest: Guests = new Guests();

					guest.id = d['id'];
					guest.name = d['name'];
					guest.document = d['document'];
					guest.amount = d['amount'];

					guests.push(guest);
				}

				return guests;
			} else {
				throw new Error('Erro ao ler retorno.');
			}
		});
	}

	public newGuest(guest: FormGroup): Observable<Guests> {
		let params: HttpParams = new HttpParams();
		params = params.append('name', guest.get('name').value);
		params = params.append('document', guest.get('document').value);
		params = params.append('phone', guest.get('phone').value);

		return this._http.post(environment.api.guests.insert, params).map((res: Response) => {
			if ( res['success'] ) {
				const data: Guests = new Guests;

				data.name = guest.get('name').value;
				data.document = guest.get('document').value;
				data.phone = guest.get('phone').value;
				return data;
			} else {
				throw new Error('Erro ao ler retorno da requisição');
			}
		});
	}
}
