let id = 1; //var para id de armazenamento
let despesaList = []; //list geral das despesas adicionadas
let table = document.getElementById('tableInsert'); //tabela da pag 'consulta' (utilizando somente no contexto da pag)

//class create despesa
class Despesa{
    constructor(ano, mes, dia, tipo, desc, valor){

            this.ano = ano
            this.mes = mes
            this.dia = dia
            this.tipo = tipo
            this.desc = desc
            this.valor = valor
    }
}
//class para criar infra bd
class Bd{
    gravar(d){ //gravar no local storage
        //config modal
        let titModal = document.getElementById('tituloModal');
        let concept = document.getElementById('concept');
        let btnInfo = document.getElementById('btnInfo');
        let conteudo = document.getElementById('conteudoModal');
        //teste de gravação
        if(d.ano==""|| d.mes==""|| d.dia==""|| d.tipo==""|| d.desc==""|| d.valor==""){
        //instancia modal error
            $('#modalInfo').modal('show');
            concept.className = 'modal-header text-danger';
            titModal.innerHTML = 'Dados inválidos';
            btnInfo.className = 'btn btn-secondary btn-danger';
            conteudo.innerHTML = 'Todos os campos precisam estar preenchidos!';
            console.log('Não salvo');
        } else {
            //config id
            if(id != 0){
                id = localStorage.getItem("id");
                id++;
                console.log(id)
            }
            //gravar local storage
            d.id = id;
            localStorage.setItem(id, JSON.stringify(d));
            localStorage.setItem('id', id);
            console.log(id)
            //instancia modal success
            $('#modalInfo').modal('show');
            concept.className = 'modal-header text-success';
            titModal.innerHTML = 'Dados cadastrados com sucesso';
            btnInfo.className = 'btn btn-secondary btn-success';
            conteudo.innerHTML = 'Dados cadastrados no sistema com sucesso!';
            console.log('Salvo');
            //reset forms
            let ano = document.getElementById('ano');
            let mes = document.getElementById('mes');
            let dia = document.getElementById('dia');
            let tipo = document.getElementById('tipo');
            let desc = document.getElementById('descricao');
            let valor = document.getElementById('valor');
            ano.value = '';
            mes.value = '';
            dia.value = '';
            tipo.value = '';
            desc.value = '';
            valor.value = '';
        }
    }
    
    consultar(){
        //iniciar consulta.html recuperando todos os obj
        console.log(localStorage.getItem('id'))
        id = localStorage.getItem('id');
        for(let i = 1; i <= id; i++){
            let despesaItem = JSON.parse(localStorage.getItem(i));
            if(despesaItem == null){
                continue
            }
            //trocando value dos tipos
            switch(despesaItem.tipo){
                case '1': despesaItem.tipo = 'Alimentação';
                    break;
                case '2': despesaItem.tipo = 'Educação';
                    break;
                case '3': despesaItem.tipo = 'Lazer';
                    break;
                case '4': despesaItem.tipo = 'Saúde';
                    break;
                case '5': despesaItem.tipo = 'Transporte';
                    break;  
            }
            despesaList.push(despesaItem);
            bd.criar(despesaItem)
        }
        console.log(despesaList);
    }
    criar(des){
        let linha = table.insertRow();
        linha.insertCell(0).innerHTML = `${des.dia}/${des.mes}/${des.ano}`;
        linha.insertCell(1).innerHTML = des.tipo;
        linha.insertCell(2).innerHTML = des.desc;
        linha.insertCell(3).innerHTML = des.valor;
        let btn = document.createElement('button');
        btn.className = 'btn btn-danger';
        btn.innerHTML = '<i class="fas fa-times"></i>';
        btn.value = des.id ;
        btn.onclick = () => {
            localStorage.removeItem(btn.value);
            window.location.reload()
        }
        linha.insertCell(4).append(btn);
    }
    filtrar(desp){
        //comando de filter
        let despesaFiltroArr = desp;

        let ano = document.getElementById('ano');
        let mes = document.getElementById('mes');
        let dia = document.getElementById('dia');
        let tipo = document.getElementById('tipo');
        let desc = document.getElementById('descricao');
        let valor = document.getElementById('valor');
        //filter obj
        let despFilter = new Despesa(
            ano.value, 
            mes.value, 
            dia.value, 
            tipo.value, 
            desc.value, 
            valor.value,
        )
        switch(despFilter.tipo){
            case '1': despFilter.tipo = 'Alimentação';
                break;
            case '2': despFilter.tipo = 'Educação';
                break;
            case '3': despFilter.tipo = 'Lazer';
                break;
            case '4': despFilter.tipo = 'Saúde';
                break;
            case '5': despFilter.tipo = 'Transporte';
                break;  
        }
        //config do filter
        if(ano.value != ''){
            despesaFiltroArr = despesaFiltroArr.filter(d => d.ano == despFilter.ano);
        }
        if(mes.value != ''){
            despesaFiltroArr = despesaFiltroArr.filter(d => d.mes == despFilter.mes);
        }
        if(dia.value != ''){
            despesaFiltroArr = despesaFiltroArr.filter(d => d.dia == despFilter.dia);
        }
        if(tipo.value != ''){
            despesaFiltroArr = despesaFiltroArr.filter(d => d.tipo == despFilter.tipo);
        }
        if(desc.value != ''){
            despesaFiltroArr = despesaFiltroArr.filter(d => d.value == despFilter.value);
        }
        if(valor.value != ''){
            despesaFiltroArr = despesaFiltroArr.filter(d => d.valor == despFilter.valor);
        }
        table.innerHTML = '';
        
        despesaFiltroArr.forEach(d => {
            bd.criar(d)
            console.log('foi')
        });

    }
    
}
let bd = new Bd();

function filtro(){
    bd.filtrar(despesaList);
}

function cadastrarDespesas(){
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let desc = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        desc.value, 
        valor.value,
    )

    bd.gravar(despesa)
}

function consultando(){
    bd.consultar()
}
