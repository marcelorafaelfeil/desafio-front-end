import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActionsComponent } from './modal-actions.component';

describe('ActionsComponent', () => {
	let component: ModalActionsComponent;
	let fixture: ComponentFixture<ModalActionsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ModalActionsComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalActionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
