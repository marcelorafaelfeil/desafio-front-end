import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'modal-icon-header',
	templateUrl: './modal-icon-header.component.html',
	styleUrls: ['./modal-icon-header.component.scss']
})
export class ModalIconHeaderComponent implements OnInit {

	@Input() public icon: string;

	constructor() { }

	ngOnInit() {
	}

}
