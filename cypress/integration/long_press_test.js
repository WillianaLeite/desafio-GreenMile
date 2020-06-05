/// <reference types="cypress" />

describe('Testando o long press', () => {

    before(()=>{

        //Executado apenas uma vez no início do grupo de teste atual, para evitar repetição de código.

        cy.visit('./src/index.html')

    })

    beforeEach(()=>{
        
        //Este detalhe garante que os testes possam ser exercutados individualmente, tornando os testes independentes.

        cy.reload()

    })
    
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

})
