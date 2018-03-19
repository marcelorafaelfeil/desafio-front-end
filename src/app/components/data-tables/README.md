# DataTables
Componente angular para criação de tabelas dinâmicas utilizan o plugin datatables.

O plugin DataTables, foi adaptado para ser utilizado com TypeScript. Dessa forma, é possível utilizar o conceito de objetos para carregar dados dinâmicos na tabela.

## Dados dinâmicos
Para passar dados dinâmicos para o DataTablesComponent, é relativemente simples. Basta montar a estrutura da tabela utilizando a variável com os dados conforme o exemplo abaixo:

    <!-- Consideremos que a variável employees seja um array com vários registros -->
    <mr-data-tables>
        <thead>
            <th>Cadastro</th>
            <th>Nome</th>
            <th>Data de Desligamento</th>
        </thead>
        <tbody>
            <tr *ngFor="let emp of employees">
                <td>{{emp.numCad}}</td>
                <td>{{emp.nomFun}}</td>
                <td>{{emp.datDes}}</td>
            </tr>
        </tbody>
    </mr-data-tables>

## Dados dinâmicos com setData
A primeira coisa necessária, é montar a estrutura da tabela no HTML nomeando a tag **th** com o nome dos campos que serão carregados no corpo da tabela. Para isso, segue o exemplo do código abaixo:

home.html

    <mr-data-tables>
        <thead>
            <th name="numCad">Cadastro</th>
            <th name="nomFun">Nome</th>
            <th name="datDes">Data de Desligamento</th>
        </thead>
        <tbody></tbody>
    </mr-datatables>

O componente DataTable, disponibiliza o método *setData* para carregar dados na tabela diretamente no TypeScript. Para isso, segue o exemplo de uma implementação TypeScript:

home.ts

    import { DataTablesComponent } from './../../../modules/mr/components/data-tables/data-tables.component';
    import { Employee } from '../models/employee.model';

    /* ... */

    @Component({
        selector: 'home-page',
        templateUrl: './home.html',
        styleUrls: ['./home.scss']
    })
    export class HomePage implements OnInit {
        @ViewChild(DataTablesComponent)
        private dt: DataTablesComponent; // retorna os métodos do DataTablesComponent

        constructor() {}

        ngOnInit() {
            // Os dados abaixo poderiam ter sido retornados de um serviço
            let employees: Array<Employee> = new Array<Employee>();

            let emp1 = new Employee();
            emp1.numCad = 29359;
            emp1.nomFun = 'César Igor Davi Mendes';
            emp1.datDes = '10/10/2017';

            let emp2 = new Employee();
            emp2.numCad = 9859;
            emp2.nomFun = 'Iago Lorenzo Barbosa';
            emp2.datDes = '24/11/2017';

            let emp3 = new Employee();
            emp3.numCad = 3589768;
            emp3.nomFun = 'Helena Flávia Beatriz Campos';
            emp3.datDes = '10/04/2016';

            employees.push(emp1);
            employees.push(emp2);
            employees.push(emp3);

            // Seta os dados no componente DataTables
            this.dt.setData(employees);
        }
    }

Você deve ter notado que foi utilizado a classe *Employee* para mapear os dados, em seguida eu criei um array de objetos Employee o qual foi passado como parâmetro para o DataTablesComponent. Qualquer array de objeto pode ser passado como parâmetro para o setData. O importante é que o nome dos setters e getters, seja iguais aos nomes informados no **th** das colunas do DataTablesComponent no HTML. Para entender mais, veja um exemplo da classe Employee:

employee.model.ts

    export class Employee {
        private _numEmp: number;
        private _tipCol: number;
        private _numCad: number;
        private _nomFun: string;
        private _datDes: string;

        set numEmp(v: number) {
            this._numEmp = v;
        }

        set tipCol(v: number) {
            this._tipCol = v;
        }

        set numCad(v: number) {
            this._numCad = v;
        }

        set nomFun(v: string) {
            this._nomFun = v;
        }

        set datDes(v: string) {
            this._datDes = v;
        }

        get numEmp(): number {
            return this._numEmp;
        }

        get tipCol(): number {
            return this._tipCol;
        }

        get numCad(): number {
            return this._numCad;
        }

        get nomFun(): string {
            return this._nomFun;
        }

        get datDes(): string {
            return this._datDes;
        }
    }

Como você pode notar, o nome dos getters e setters *numCad, nomFun e datDes* tem os mesmos nomes passado como parâmetro name das colunas do DataTablesComponent.

## Language
Por padrão, o data-tables baixa em seu repositório de plugins, a pasta i18n com vários arquivos json de tradução para o componente. Porém, todos esses arquivos possuem comentários em seu topo fazendo com que o arquivo cause erros no componente. Isso ocorre por que arquivos json não suportam comentários. Sendo assim, há a necessidade de editar o arquivo que será utilizado e remover as linhas comentadas.