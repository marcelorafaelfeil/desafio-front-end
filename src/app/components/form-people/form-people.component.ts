import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guests } from '../../models/Guets.model';
import { GuestsService } from '../../services/guests.service';

@Component({
	selector: 'app-form-people',
	templateUrl: './form-people.component.html',
	styleUrls: ['./form-people.component.scss']
})
export class FormPeopleComponent implements OnInit {

	@Output()
	public onComplete: EventEmitter<Guests> = new EventEmitter();
	@Output()
	public onError: EventEmitter<any> = new EventEmitter();
	@Output()
	public onCancel: EventEmitter<void> = new EventEmitter();

	public peopleForm: FormGroup;
	@Input()
	public loadingForm: boolean;
	public isSubmitted: boolean;

	constructor(
		private _fb: FormBuilder,
		private _guestSer: GuestsService
	) {
		this.loadingForm = false;
		this.isSubmitted = false;
	 }

	ngOnInit() {
		this.peopleForm = this._fb.group({
			name: ['', Validators.required],
			document: ['', Validators.required],
			phone: ['', Validators.required],
		});
	}

	public sendData() {
		this.isSubmitted = true;

		if (this.peopleForm.valid) {
			this.loadingForm = true;
			this._guestSer.newGuest(this.peopleForm).subscribe((res) => {
				if (res instanceof Guests) {
					this.onComplete.emit(res);
				} else {
					this.onError.emit(res);
				}

				this.loadingForm = false;
			});
		}
	}

	cancel() {
		this.onCancel.emit();
	}

}
