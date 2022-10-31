function carregarFuncionarios(){
    fetch('http://localhost:8080/funcionarios', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        response.json().then( c => console.table(c));

    });
}

carregarFuncionarios();