# Avaliando eventos de long click com Cypress

Este repositório contém a implementação para o desafio proposto pela GreenMile. Originalmente o problema pede para que se avalie a aplicação disponível neste [link](https://codepen.io/choskim/pen/RLYebL). Esta aplicação possui uma implementação simples de um long click. Inicialmente a página possui um quadrado verde e quando o usuário pressiona o botão esquerdo do mouse por no mínimo 500 milisegundos, o quadrado aumenta de tamanho. A validação utilizando o cypress é executada para avaliar se o quadrado realmente aumenta após o longo clique. O problema principal para realizar essa validação neste [código](https://codepen.io/choskim/pen/RLYebL), é que a aplicação utiliza a biblioteca hammer.js para lidar com os eventos de clique, o problema é que como mencionado nesta [questão](https://github.com/cypress-io/cypress/issues/4286) do repositório oficial do cypress, o hammer.js que fica ouvindo o evento de click do botão, percebe que a ação simulada de clique do Cypress não é uma ação nativa e ignora o evento, dessa forma não tem como avaliar se o elemento alterou seu tamanho, visto que o evento de click não foi processado. Para solucionar esse problema proponho alterar o código fonte e modificar o uso da biblioteca hammer.js por apenas javascript, dado que para esta aplicação o uso da biblioteca hammer.js não é imprescindível, pondendo ser facilmente substituída. A modificação ocorre da seguinte maneira:

Antes utilizando hammer.js:
```
var square = document.querySelector('.square');

var manager = new Hammer.Manager(square);

var Press = new Hammer.Press({
  time: 500
});

manager.add(Press);

manager.on('press', function(e) {
  e.target.classList.toggle('expand');
});

```
Depos utilizando apenas javascript:
```
var square = document.querySelector('.square');

var pressTimer = 500;

square.addEventListener("mouseup", () => {
    
    clearTimeout(pressTimer);

})

square.addEventListener("mousedown", (e) => {

    if(e.which == 1) {//Para garantir que só o longo clique do botão esquerdo será considerado, caso o direito também seja, acrescente no if: || e.which == 3
    
        pressTimer = window.setTimeout(() => {

            e.target.classList.toggle('expand');
        
        },500);
    
    }

})

```


## Começando

As instruções fornecidas a seguir vão te ajudar a montar o ambiente necessário para que essa aplicação seja clonada/baixada e executada em sua máquina.


### Pré requisitos

Você precisa ter instalado o gerenciador de pacotes npm na sua máquina, para ajudar na instalação do cypress. Sua instalação pode ser executada seguindo o tutorial deste [link](https://phoenixnap.com/kb/install-node-js-npm-on-windows). 

### Installing

Após instalar o npm, clone este repositório:

```
git clone https://github.com/WillianaLeite/desafio-GreenMile.git

```
Ou se preferir faça o download em zip, e em seguida o extraia para o diretório de sua preferência.


Após obter o código completo, execute o seguinte código dentro da pasta do projeto:

```
npm install
```

Este comando irá instalar todas as dependências necessárias para essa aplicação funcionar, inclusive instala automaticamente o framework Cypress também. 

## Executando os testes

Para executar os testes, execute o seguinte código para abrir o cypress:

```
npm run cypress:open
```

Em seguida, execute o teste, clicando sobre o mesmo. Para modificar o arquivo de teste, observe que ele está localizado no diretório: cypress/integration/long_press_test.spec.js.


### Entendendo o arquivo de teste

Os dois testes desenvolvidos podem ser testados individualmente, isso ocorre devido ao reload() da página executado antes de cada teste na função beforeEach. 




```
before(()=>{

        //Executado apenas uma vez no início do grupo de teste atual, para evitar repetição de código.

        cy.visit('./src/index.html')

    })

    beforeEach(()=>{
        
        //Este detalhe garante que os testes possam ser exercutados individualmente, tornando os testes independentes.

        cy.reload()

    })
    

```

O primeiro teste verifica se as dimensões iniciais do objeto correspondem a 90px de largura por 90px de altura, este é o tamanho padrão do objeto antes de qualquer evento, logo após que a simulação do long click ocorre. Por fim outra verificação é feita nas dimensões do objeto, para analisar se ele realmente aumentou, essa verificação é realizada através da assertiva que analisa se o novo tamanho do objeto corresponde à 225px de largura por 225px de altura. 


```
it('Assertiva: tamanho inicial do square: 90x90  -> long click -> tamanho deve aumentar.', () => {
       
        //Validando se o tamanho anterior era realmente de 90x90. 
        cy.get('.square').should('have.css', 'width', '90px')
        cy.get('.square').should('have.css', 'height', '90px')
        
        //Simulando o Long Click, esse objeto passado como 2º parâmetro no trigger com atributo which: 1 garante que a simulação do click ocorrerá com o botão esquerdo
        cy.get('.square').trigger('mousedown',  { which: 1})
        
        //Pausa para tornar o teste visualmente mais agradável de acompanhar. Não interfere em nada no funcionamento, podendo ser excluído.
        cy.wait(700)
        
        //Validando se o tamanho do square realmente aumentou, através da assertiva que verifica se o novo tamanho do square possui dimensão 225x225.
        cy.get('.square').should('have.css', 'width', '225px')
        cy.get('.square').should('have.css', 'height', '225px')

    })
    
 ```
Para o segundo teste as mesmas etapas são verificadas mas com as dimensões contrárias, dessa vez devemos observar se o objeto depois de expandido e após do long click retorna ao seu tamanho original de 90px de largura por 90px de altura. 

```
    it('Assertiva: tamanho inicial do square: 225x225  -> long click -> tamanho deve diminuir.', () => {
        
        //Aumentando o tamanho do square, , esse objeto passado como 2º parâmetro no trigger com atributo which: 1 garante que a simulação do click ocorrerá com o botão esquerdo
        cy.get('.square').trigger('mousedown',  { which: 1})
        

        //Garantindo que o tamanho do square realmente aumentou.
        cy.get('.square').should('have.css', 'width', '225px')
        cy.get('.square').should('have.css', 'height', '225px')

        
        //Simulando o clique novamente, para analisar se o square irá diminuir, esse objeto passado como 2º parâmetro no trigger com atributo which: 1 garante que a simulação do click ocorrerá com o botão esquerdo 
        cy.get('.square').trigger('mousedown',  { which: 1})

        //Pausa para tornar o teste visualmente mais agradável de acompanhar. Não interfere em nada no funcionamento, podendo ser excluído.
        cy.wait(700)
        
        //Validando se o tamanho do square realmente diminuiu, através da assertiva que verifica se o novo tamanho do square possui dimensão 90x90.
        cy.get('.square').should('have.css', 'width', '90px')
        cy.get('.square').should('have.css', 'height', '90px')

    })   


```

Você deve obter esse resultado ao final de todos os testes. 

![alt text](https://github.com/WillianaLeite/desafio-GreenMile/blob/master/result_teste.PNG)


Observe que o quadrado está menor, pois esse é justamente o objetivo do último teste.


## Construído com

[Cypress](https://www.cypress.io/) - Framework de automação de testes

## Autora

[**Williana Leite**](https://github.com/WillianaLeite)

