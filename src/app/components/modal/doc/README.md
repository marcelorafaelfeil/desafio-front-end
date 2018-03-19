# Modal Component
Modal do tema semantic-ui, componentizado para Angular 4. Com este componente, será possível abrir e fechar modal mais fácilmente além de configurá-lo de maneira mais prática.

O modal conta com alguns components próprios desenvolvidos para facilitar o desenvolvimetno de novas aplicações que façam uso deste componente.

Para montar um modal normal, basta adicionar o seguinte código:

    <mr-modal>
        <modal-header>Título do modal</modal-header>
        <modal-content>Conteúdo do modal</modal-content>
        <modal-actions>
            <button class="ui button">Cancelar</button>
            <button class="ui button">Confirmar</button>
        </modal-actions>
    </mr-modal>

Para que o modal acima seja exibido, basta utilizar o seguinte código:
    
    import { ModalComponent } "../modules/semantic/components/modal/modal.component";
    ...
    @ViewChild(ModalComponent)
    public modalComp: ModalComponent;

    ngOnInit() {
        this.modalComp.openModal(); // para abrir
        this.modalComp.closeModal(); // para fechar
    }

Para abrir o modal através de um botão no HTML, basta importar o componente para o seu script e injetá-lo no código através do annotation _@ViewChild_ ou _@ViewChildren_ e chamá-lo no html da seguinte maneira:

    <button (click)="modalComp.openModal()">Abrir Modal</button>

## Parâmetros
O modal conta com alguns parâmetros que torna possível a configuração do modal direto no código HTML. A seguir, será explicado o funcionamento de cada parâmetro HTML e como implementá-lo via HTML.

### name
Dá um nome para o modal. Este parâmetro é utilizado caso haja mais de um modal, dessa forma, é possível localizar e manipular modais específicos.

    <mr-modal name="modal-confirmar-apagar"></mr-modal>

### closable
Define se o modal poderá ou não ser fechado. Padrão *true*. Caso *false* o usuário não poderá fechar o modal.

    <mr-modal closable="true"></mr-modal>

### size
O parâmetro size define o tamanho do modal que será exibido na tela. Os tamanhos disponíveis são: mini, tiny, small, large.

    <mr-modal size="small"></mr-modal>



### scroller
O parâmetro scroller adiciona uma barra de rolagem na div que contém o conteúdo do modal. Parâmetro pode ser utilizado caso haja muito conteúdo alocado dentro do modal.

    <mr-modal scroller></mr-modal>

### full
O parâmetro full, altera o tamanho do modal para fullscreen fazendo com que ocupe toda a tela.

    <mr-modal full></mr-modal>

### basic
O parâmetro basic exibe um modal mais clean, contendo apenas o fundo fullscreen do modal e o texto centralizado na tela. Para que seja possível utilizar este parâmetro, é necessário que o html esteja adaptado para este tipo de modal:

    <mr-modal basic size="small">
		<modal-icon-header icon="archive icon">
			Archive Old Messages
		</modal-icon-header>
		<modal-content>
			Your inbox is getting full, would you like us to enable automatic archiving of old messages?
			No
		</modal-content>
		<modal-actions>
			<a class="ui red basic cancel inverted button">
				<i class="remove icon"></i>
				No
			</a>
			<a class="ui green ok inverted button">
				<i class="checkmark icon"></i>
				Yes
			</a>
		</modal-actions>
	</mr-modal>

### multiple
Este parâmetro serve para habilitar a chamada de multiplos modais encima do modal ao qual o parâmetro foi utilizado.

    <mr-modal multiple></mr-modal>

### inverted
Este parâmetro faz com que a cor de fundo do modal seja invertida. Caso *true*, a cor de fundo do modal passará a ser branca.

    <mr-modal inverted></mr-modal>

### blur
O parâmetro blur, faz com que o fundo do modal fique desfocado ao exibir o modal. Este efeito depende muito do navegador do usuário e dependendo das configurações do computador, pode causar lentidão no efeito de abertura do modal.

    <mr-modal blur></mr-modal>

## Parâmetros TypeScript
Existem alguns parâmetros typescript que podem ser utilizados para manipular o modal. Dois dos parâmetros já foram utilizados nos exemplos acima. Além deles existem outros parâmetros que podem ser utilizados para retornar dados relevantes referente ao modal:

    this.compModal.getInstance(); // Retornar a instancia jQuery do modal
    this.compModal.getName(); // Retorna o nome do modal


## Callbacks
O component modal, dispõe de alguns eventos para o maior controle:

** **onShow**: É chamando quando o modal inicia a animação de exibição;
** **onVisible**: É chamado quando o modal finaliza a animação de exibição e já está sendo mostrado para o usuário.
** **onHide**: É chamado quando o modal inicia a animação de ocultação do modal. A função retorna *false* como parâmetro caso o modal não esteja oculto.
** **onHidden**: É chamado após o modal finalizar a animação de ocultação e já não estar mais sendo exibido para o usuário.
** **onApprove**: É chamado após o botão de aprovação ser acionado. A função retorna *falso* como parâmetro caso o modal não esteja oculto.
** **onDeny**: É chamado após o botão de reprovação ser acionado. A função retorna *falso* como parâmetro caso o modal não esteja oculto.

    <mr-modal (onShow)="funOnShow()" (onHide)="funOnShow($event)"></mr-modal>