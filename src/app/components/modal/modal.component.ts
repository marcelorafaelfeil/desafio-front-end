import { Component, OnInit, Input, ContentChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { OnDestroy } from '@angular/core';

declare var $: any;

@Component({
	selector: 'mr-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

	private instance: any;
	private _$ele: any;

	@Input() public size = '';
	@Input() public name = '';
	@Input() public scroller: string;
	@Input() public full: string;
	@Input() public basic: string;
	@Input() public multiple: string;
	@Input() public closable: boolean;
	@Input() public inverted: string;
	@Input() public blur: string;
	@Input() public actived: boolean;
	@Input() public dontCloseOnHide: boolean;
	@Input() public dontCloseOnApprove: boolean;
	@Input() public dontCloseOnDeny: boolean;
	@Input() private options;

	// callbacks
	@Output() public onShow: EventEmitter<any> = new EventEmitter();
	@Output() public onVisible: EventEmitter<any> = new EventEmitter();
	@Output() public onHide: EventEmitter<any> = new EventEmitter<any>();
	@Output() public onHidden: EventEmitter<any> = new EventEmitter();
	@Output() public onApprove: EventEmitter<any> = new EventEmitter<any>();
	@Output() public onDeny: EventEmitter<any> = new EventEmitter<any>();

	private arrSizes = ['mini', 'tiny', 'small', 'large'];

	public classModal: string;

	constructor(private ele: ElementRef) {
		this.options = {
			allowMultiple: false,
			closable: false,
			inverted: false,
			blurring: false,
			onShow: () => {
				this.onShow.emit();
			},
			onVisible: () => {
				this.onVisible.emit();
			},
			onHide: ($element: any) => {
				this.onHide.emit($element);
				return !this.dontCloseOnHide;
			},
			onHidden: () => {
				this.onHidden.emit();
			},
			onApprove: ($element: any) => {
				this.onApprove.emit($element);
				return !this.dontCloseOnApprove;
			},
			onDeny: ($element: any) => {
				this.onDeny.emit($element);
				return !this.dontCloseOnDeny;
			}
		};
	}

	ngOnInit() {
		try {
			if (this.size !== undefined && this.size !== '') {
				if (this.arrSizes.indexOf(this.size) >= 0) {
					this.classAppend(this.size);
				} else {
					throw new Error('O tamanho do modal, é inválido.');
				}
			}
			if (this.scroller !== undefined) {
				 this.classAppend('longer');
			}
			if (this.full !== undefined) {
				this.classAppend('fullscreen');
			}
			if (this.basic !== undefined) {
				this.classAppend('basic');
			}

			if (this.closable !== undefined) {
				this.options.closable = true;
			}
			if (this.multiple !== undefined) {
				this.options.allowMultiple = true;
			}
			if (this.inverted !== undefined) {
				this.options.inverted = true;
			}
			if (this.blur !== undefined) {
				this.options.blurring = true;
			}
			if (this.actived !== undefined) {
				this.classAppend('actived');
			}

			this.dontCloseOnHide = (this.dontCloseOnHide !== undefined || this.dontCloseOnHide === true);
			this.dontCloseOnApprove = (this.dontCloseOnApprove !== undefined || this.dontCloseOnApprove === true);
			this.dontCloseOnDeny = (this.dontCloseOnDeny !== undefined || this.dontCloseOnDeny === true);

			this._$ele = $(this.ele.nativeElement).find('.ui.modal');
			this.instance = this._$ele.modal(this.options);
		} catch (e) {
			console.error('Não foi possível instanciar o modal.');
		}
	}

	private classAppend(value: string): void {
		this.classModal += (this.classModal !== '') ? ' ' + value : value;
	}

	public getInstance() {
		return this.instance;
	}

	public openModal() {
		this.instance.modal(this.options).modal('show');
	}

	public closeModal(_fn?) {
		this.instance.modal('hide', () => {
			if (_fn !== undefined) {
				return _fn();
			}
		});
	}

	public setOnApprove(_fn): void {
		this.options.onApprove = _fn;
	}

	public getName() {
		return this.name;
	}

	public approveLoading() {
		this._$ele.find('.ui.cancel.button').addClass('disabled');
		this._$ele.find('.ui.approve.button, .ui.ok.button').addClass('loading');
	}

	public approveLoadingFinish() {
		this._$ele.find('.ui.cancel.button').removeClass('disabled');
		this._$ele.find('.ui.approve.button, .ui.ok.button').removeClass('loading');
	}

	public denyLoading() {
		this._$ele.find('.ui.cancel.button').addClass('loading');
		this._$ele.find('.ui.approve.button, .ui.ok.button').addClass('disabled');
	}

	public denyLoadingFinish() {
		this._$ele.find('.ui.cancel.button').removeClass('loading');
		this._$ele.find('.ui.approve.button, .ui.ok.button').removeClass('disabled');
	}

	public refresh() {
		this._$ele.modal('refresh');
	}

	ngOnDestroy() {
		this.instance.parent().remove();
	}

	public destroy() {
		this.instance.modal('destroy');
		this.instance.parent().remove();
	}
}
