import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

declare var $: any;
declare var jQuery: any;

@Component({
	selector: 'mr-data-tables',
	templateUrl: './data-tables.component.html',
	styleUrls: ['./data-tables.component.scss']
})
export class DataTablesComponent implements OnInit, AfterViewInit, OnDestroy {

	private _$instance: any;									// elemento table com instancia do datat-able
	private _$ele: any;											// elemento table sem a instancia do objeto data-table
	private _columns: DtColumns = new DtColumns(); 	            // configurações de colunas.
	private _columnsDef: DtColumnDefs = new DtColumnDefs();
	private _hasSetedData: boolean;
	private _autoStart: boolean;
	private _order: Array<Array<any>> = new Array<Array<any>>();

	private _modelOrders = ['asc', 'desc'];

	public hasError: boolean = false;
	public errors: DtErrors = new DtErrors();
	public loadingText: string = 'Loading';

	private callbackOnFilter;

	@Input() public individualSearch: boolean;
	@Input() public order: string;
	@Input() public dtClass: string;

	@Output()
	public select: EventEmitter<any> = new EventEmitter<any>();

	constructor(private ele: ElementRef) {
		this._autoStart = true;
		this._hasSetedData = false;
	}

	ngOnInit() {
		this._configureSortingDateUK();
		if (this.individualSearch !== undefined) {
			this.individualSearch = true;
		} else {
			this.individualSearch = false;
		}
		this._$ele = $(this.ele.nativeElement).find('table');
		this._getColumnDefs();
		this._getColumnNames();
	}

	ngAfterViewInit() {
		if (this._autoStart) {
			this.init();
		}
	}

	public init() {
		setTimeout(() => {
			// Configuração de ordenação
			if (this.order !== undefined) {
				this._defaultOrder();
			}

			this._$instance = this._$ele.DataTable({
				dom: '<"top"i>r<"content-table"t><"bottom"<"list-options"p>>',
				order: this._order,
				columns: this._columns.config(),
				columnDefs: this._columnsDef.config(),
				responsive: true,
				lengthMenu: [[25, 50, 100, 150], [25, 50, 100, 150]],
				initComplete: () => {
					// Verifica se deve ativiar o individua search
					if (this.individualSearch) {
						this._individualSearch();
					}
					this._addDimmer();
				},
				drawCallback: () => {
					const that = this;
					this._$ele.find('a').off('click');
					this._$ele.find('a').on('click', function () {
						try {
							const name = $(this).attr('name');
							const key = $(this).attr('key');

							that.select.emit({ name: name, key: key });
						} catch (e) {
							console.error(e);
						}
					});
				}
			});
		});
	}

	public startLoading() {
		$(this.ele.nativeElement).find('.ui.dimmer').addClass('active');
		$(this.ele.nativeElement).find('.ui.dropdown').addClass('disabled');
		$(this.ele.nativeElement).find('.paginate_button').each(function (e) {
			if ($(this).hasClass('disabled')) {
				$(this).addClass('old-disabled');
			} else {
				$(this).addClass('old-disabled');
			}
		});
	}

	public finishLoading() {
		$(this.ele.nativeElement).find('.ui.dimmer').removeClass('active');
		$(this.ele.nativeElement).find('.ui.dropdown').removeClass('disabled');

		$(this.ele.nativeElement).find('.paginate_button').each(function () {
			if (!$(this).hasClass('old-disabled')) {
				$(this).removeClass('disabled');
			} else {
				$(this).removeClass('old-disabled');
			}
		});
	}

	private _addDimmer() {
		$(this.ele.nativeElement).find('.content-table').append(() => {
			return $('<div class="ui inverted dimmer"><div class="ui text loader">' + this.loadingText + '</div></div>');
		});
	}

	private _individualSearch() {
		const thatDT = this;
		this._$instance.columns().every(function (e) {
			const that = this;
			$('input', this.footer()).on('keyup change', function () {
				if (that.search() !== this.value) {

					// busca os dados no lsp
					thatDT.callbackOnFilter(this, that, e);

					that
						.search(this.value)
						.draw();
				}
			});
		});
	}

	public onFilter(_fn) {
		this.callbackOnFilter = _fn;
	}

	private _defaultOrder() {
		try {
			const name = this.order.split(' ')[0];
			const dir = this.order.split(' ')[1].toLowerCase();
			const key = this._columns.search(name);

			if (this._modelOrders.indexOf(dir) >= 0) {
				const order: Array<any> = [key, dir];

				this._order.push(order);
			} else {
				throw new Error('A ordem "' + dir + '" é inválida.');
			}
		} catch (e) {
			const message = 'Erro ao executar configuração de ordenação.';
			if (e instanceof Error) {
				this.errors.append(message, e.message);
			} else {
				this.errors.append(message, JSON.stringify(e));
			}
			console.error(e);
		}
	}

	private _getColumnDefs() {
		try {
			const $ths = $(this._$ele).find('thead').find('th');

			for (let i = 0; i < $ths.length; i++) {
				// busca sortingType
				if ($($ths[i]).attr('sortingType') !== undefined) {
					this._columnsDef.add(i, { type: $($ths[i]).attr('sortingType') });
				}
				// busca sortingType
				if ($($ths[i]).attr('dt-class') !== undefined) {
					this._columnsDef.add(i, { className: $($ths[i]).attr('dt-class') });
				}
			}
		} catch (e) {
			const message = 'Erro ao montar as definições de colunas.';
			if (e instanceof Error) {
				this.errors.append(message, e.message);
			} else {
				this.errors.append(message, JSON.stringify(e));
			}

			console.error(e);
		}
	}

	private _getColumnNames() {
		try {
			const tr = this._$ele.find('thead').find('tr')[0];
			const ths = $(tr).find('th');
			for (let i = 0; i < ths.length; i++) {
				if (ths[i].getAttribute('name') !== undefined && ths[i].getAttribute('name') !== '' && ths[i].getAttribute('name') !== null) {
					this._columns.add(ths[i].getAttribute('name'));
				} else {
					this._columns.add('col_' + i);
					if (this._hasSetedData) {
						throw new Error('Há colunas sem nome. Por favor, defina nome para todas as colunas.');
					}
				}
			}
		} catch (e) {
			const message = 'Erro interno ao capturar nome de colunas.';
			if (e instanceof Error) {
				this.errors.append(message, e.message);
			} else {
				this.errors.append(message, JSON.stringify(e));
			}
			console.error(e);
		}
	}

	public clearData(force = false): void {
		this._$instance.clear().draw();
		if (force) {
			this._$ele.find('tbody tr').remove();
		}
	}

	public autoStart(v: boolean): void {
		this._autoStart = v;
	}

	public setData(data: Array<any>): void {
		this._$instance.rows.add(data).draw();
		this._hasSetedData = true;
	}

	// configura a ordenação por data dd/mm/yyyy
	private _configureSortingDateUK() {
		jQuery.extend(jQuery.fn.dataTableExt.oSort, {
			'date-uk-pre': function (a) {
				if (a == null || a === '') {
					return 0;
				}
				const ukDatea = a.split('/');
				return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
			},

			'date-uk-asc': function (a, b) {
				return ((a < b) ? -1 : ((a > b) ? 1 : 0));
			},

			'date-uk-desc': function (a, b) {
				return ((a < b) ? 1 : ((a > b) ? -1 : 0));
			}
		});
	}

	public ngOnDestroy() {
		if (this._$instance !== undefined) {
			this._$instance.destroy();
		}
	}

	public destroy() {
		if (this._$instance !== undefined) {
			this._$instance.destroy();
		}
	}

	public redraw() {
		setTimeout(() => {
			this._$instance.rows().invalidate().draw(false);
		});
	}

	public redrawDOM() {
		// já que não teve um programador com culhão. Eu vou criar!
		setTimeout(() => {
			const $trs = this._$ele.find('tbody tr');
			const dtCmp = this;
			const data: Array<any> = new Array();

			$trs.each(function (e) {
				const $tr = $(this);
				const totalColumns = $tr.find('td').length;
				const cols: any = {};

				dtCmp._columns.config().forEach((c, index) => {
					const $td = $($tr.find('td')[index]);
					cols[c['data']] = $td.html();
				});
				data.push(cols);
			});
			this.setData(data);
		});
	}

	public removeRow(selector: string) {
		try {
			this._$instance.row($(selector)).remove().draw();
		} catch (e) {
			console.error(e);
		}
	}
}

export class DtColumn {
	private _data: string;

	set data(v: string) {
		this._data = v;
	}

	get data(): string {
		return this._data;
	}
}

export class Defs {
	private _targets: number;
	private _type: string;

	public set targets(v: number) {
		this._targets = v;
	}

	public set type(v: string) {
		this._type = v;
	}

	public get targets(): number {
		return this._targets;
	}

	public get type(): string {
		return this._type;
	}
}

class DtColumns {
	private _columns: Array<DtColumn> = new Array<DtColumn>();

	public add(name: string) {
		const col: DtColumn = new DtColumn();

		col.data = name;
		return this._columns.push(col);
	}

	public search(name): number {
		for (let i = 0; i < this._columns.length; i++) {
			if (this._columns[i].data === name) {
				return i;
			}
		}
		return -1;
	}

	public set(name: string, config: any) {
		const i: number = this.search(name);
		if (i >= 0) {
			for (const k of config) {
				this._columns[i][k] = config[k];
			}
		}
	}

	public config(): Array<object> {
		const config: Array<object> = new Array<Object>();

		for (let i = 0; i < this._columns.length; i++) {
			for (const k in this._columns[i]) {
				if (k.substr(0, 1) !== '_') {
					const obj: object = new Object();
					obj[k] = this._columns[i][k];
					config.push(obj);
				}
			}
		}

		return config;
	}
}

class DtColumnDefs {
	private _columns: Array<Defs> = Array<Defs>();

	public set(key: number, config: any) {
		try {
			const def = new Defs();
			def.targets = key;
			for (const k of config) {
				def[k] = config[k];
			}
			this._columns.push(def);
		} catch (e) {
			throw new Error(e);
		}
	}

	public add(key: number, config: any) {
		try {
			const i = this.search(key);

			if (i >= 0) {
				for (const k of config) {
					this._columns[i][k] = config[k];
				}
			} else {
				const def: Defs = new Defs();

				def.targets = key;
				for (const k of config) {
					def[k] = config[k];
				}

				this._columns.push(def);
			}
		} catch (e) {
			throw new Error(e);
		}
	}

	public search(key: number): number {
		for (let i = 0; i < this._columns.length; i++) {
			if (this._columns[i].targets === key) {
				return i;
			}
		}
		return -1;
	}

	public config() {
		const conf: Array<any> = new Array<any>();

		for (let i = 0; i < this._columns.length; i++) {
			const col = this._columns[i];
			const c: any = {};

			c[i] = col[i];


			conf.push(c);
		}

		return conf;
	}
}

class DtError {
	private _message: string;
	private _details: string;

	set message(v: string) {
		this._message = v;
	}

	set details(v: string) {
		this._details = v;
	}

	get message(): string {
		return this._message;
	}

	get details(): string {
		return this._details;
	}
}

class DtErrors {
	private _errors: Array<DtError> = new Array<DtError>();

	public append(message: string, details: string) {
		const err = new DtError();
		err.message = message;
		err.details = details;
		this._errors.push(err);
	}

	public has(): boolean {
		return (this._errors.length > 0);
	}

	public getErrors(): Array<DtError> {
		return this._errors;
	}
}
