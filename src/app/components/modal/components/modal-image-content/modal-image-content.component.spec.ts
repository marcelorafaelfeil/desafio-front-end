import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImageContentComponent } from './modal-image-content.component';

describe('ModalImageContentComponent', () => {
	let component: ModalImageContentComponent;
	let fixture: ComponentFixture<ModalImageContentComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ModalImageContentComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalImageContentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
