export class Guests {
    private _id: number;
    private _name: string;
    private _document: string;
    private _amount: number;
    private _phone: string;

    set id(id: number) {
        this._id = id;
    }

    set name(name: string ) {
        this._name = name;
    }

    set document(document: string ) {
        this._document = document;
    }

    set amount(amount: number) {
        this._amount = amount;
    }

    set phone(phone: string) {
        this._phone = phone;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get document(): string {
        return this._document;
    }

    get amount(): number {
        return this._amount;
    }

    get phone(): string {
        return this._phone;
    }

}
