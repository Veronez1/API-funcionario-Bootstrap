carregarClientes();

document.getElementById("formCadastroCliente").addEventListener("submit", function(event){
    event.preventDefault();

    let tipoMetodo = "POST";
    let idCliente = document.getElementById("inputId").value;
    if(idCliente !== ""){
        tipoMetodo = "PUT";
    }
    fetch('http://localhost:8080/clientes', {
        method: tipoMetodo,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            id: idCliente,
            nome: document.getElementById("inputNome").value, 
            email: document.getElementById("inputEmail").value, 
            telefone: document.getElementById("inputTelefone").value, 
            cpf: document.getElementById("inputCpf").value, 
            dataNascimento: document.getElementById("inputDataNascimento").value
        })
    }).then( response => {
        if(!response.ok){
            throw new Error(response);
        }
        carregarClientes();
        document.getElementById("formCadastroCliente").reset();
    }).catch( error => {
        console.log(error);
        alert("Houve um erro. Favor verificar o log.");
    });
});

function carregarClientes(){
    fetch('http://localhost:8080/clientes', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(!response.ok){
            throw new Error(response);
        }
        return response.json();
    }).then( content => {
        let table = document.getElementById("tabelaClientes");
        let tbody = table.getElementsByTagName("tbody")[0];
        tbody.innerHTML = "";
        content.forEach( c => {
            let row = tbody.insertRow();
            let cellId = row.insertCell();
            let cellNome = row.insertCell();
            let cellEmail = row.insertCell();
            let cellAcoes = row.insertCell();
            cellId.innerHTML = c.id;
            cellNome.innerHTML = c.nome;
            cellEmail.innerHTML = c.email;
            cellAcoes.innerHTML = htmlBotaoApagarCliente(c.id) + htmlBotaoEditarCliente(c.id);
        });
    }).catch( error => {
        console.log(error);
        alert("Houve um erro. Favor verificar o log.");
    });
}

function apagarCliente(id){
    fetch('http://localhost:8080/clientes/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(!response.ok){
            throw new Error(response);
        }
        carregarClientes();
    }).catch( error => {
        console.log(error);
        alert("Houve um erro. Favor verificar o log.");
    });
}

function htmlBotaoApagarCliente(id){
    return `<button class="btn btn-danger" onclick="apagarCliente(${id})">Apagar</button>`;
}

function editarCliente(id){
    fetch('http://localhost:8080/clientes/'+id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(!response.ok){
            throw new Error(response);
        }
        return response.json();
    }).then( content =>{
        document.getElementById("inputId").value = content.id;
        document.getElementById("inputNome").value = content.nome;
        document.getElementById("inputEmail").value = content.email;
        document.getElementById("inputTelefone").value = content.telefone;
        document.getElementById("inputCpf").value = content.cpf;
        document.getElementById("inputDataNascimento").value = new Date(content.dataNascimento).toISOString().split("T")[0];
    }).catch( error => {
        console.log(error);
        alert("Houve um erro. Favor verificar o log.");
    });
}

function htmlBotaoEditarCliente(id){
    return `<button class="btn btn-primary" onclick="editarCliente(${id})">Editar</button>`;
}

