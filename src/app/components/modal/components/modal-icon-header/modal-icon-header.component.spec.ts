import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIconHeaderComponent } from './modal-icon-header.component';

describe('ModalIconHeaderComponent', () => {
	let component: ModalIconHeaderComponent;
	let fixture: ComponentFixture<ModalIconHeaderComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ModalIconHeaderComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalIconHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
