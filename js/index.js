document.getElementById("form-cadastro").addEventListener("submit", e => {
    
    const dados = e.target.querySelectorAll("#formGroupExampleInput");


    fetch('http://localhost:8080/funcionarios', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: "",
            nome: dados[0].value,
            cargo: dados[1].value,
            salario: dados[2].value
        })
    }).then(response => {
        console.log(response);
        

    }).catch(error => {
        console.log(error);
        alert("Houve um erro. Favor verificar o log CADASTRO.");
    });
    $('#cadastrarModal').modal('hide')
    carregarFuncionarios();


});
carregarFuncionarios();


document.getElementById("confirm").addEventListener("show.bs.modal", function (e) {
    var button = e.relatedTarget;
    var teste = button.getAttribute('data-id');
    console.log("id do botão --> "+teste);
    document.getElementById('btn-excluir-modal').addEventListener("click", function (e){    
        apagarFuncionarios(teste);
        carregarFuncionarios();
        $('#confirm').modal('hide')
    })
});


function carregarFuncionarios() {
        fetch('http://localhost:8080/funcionarios', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();

        }).then(content => {
            let table = document.getElementById("tabelaFuncionarios");
            let tbody = table.getElementsByTagName("tbody")[0];
            tbody.innerHTML = "";
            content.forEach(c => {
                let row = tbody.insertRow();
                let cellId = row.insertCell();
                let cellNome = row.insertCell();
                let cellCargo = row.insertCell();
                let cellSalario = row.insertCell();
                let cellEdit = row.insertCell();
                let cellExcluir = row.insertCell();
                cellId.innerHTML = c.id;
                cellNome.innerHTML = c.nome;
                cellCargo.innerHTML = c.cargo;
                cellSalario.innerHTML = c.salario;
                cellEdit.innerHTML = htmlBotaoEditarFuncionario(c.id);
                cellExcluir.innerHTML = htmlBotaoExcluirFuncionario(c.id);
            });

        });
    }


function htmlBotaoEditarFuncionario(id) {
        return `<button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#editarModal" data-id="${id}">Editar</button>`;
    }
function htmlBotaoExcluirFuncionario(id) {
        return `<button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#confirm" data-id ="${id}" >Excluir</button>`;
    }



function apagarFuncionarios(id) {
    fetch('http://localhost:8080/funcionarios/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error(response);
        }
        carregarFuncionarios();
    })
}

function editarFuncionarios(id) {
    fetch('http://localhost:8080/funcionarios/' + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error(response);
        }
        return response.json();
    }).then(content => {
        document.getElementById("inputId").value = content.id;
        document.getElementById("inputNome").value = content.nome;
        document.getElementById("inputCargo").value = content.nome;
        document.getElementById("inputSalario").value = content.nome;
    }).catch(error => {
        console.log(error);
        alert("Houve um erro. Favor verificar o log. EDITAR");
    });
}