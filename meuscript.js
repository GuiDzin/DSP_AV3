
$(function() { // quando o documento estiver pronto/carregado
    
    // função para exibir pessoas na tabela
    function exibir_pessoas() {
        $.ajax({
            url: 'http://localhost:5000/listar_pessoas',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar, // chama a função listar para processar o resultado
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });
        function listar (pessoas) {
            // esvaziar o corpo da tabela
            $('#corpoTabelaPessoas').empty();
            // tornar visível a página de pessoas
            mostrar_conteudo("cadastroPessoas");      
            // percorrer a lista de pessoas retornadas; 
            for (var i in pessoas) { //i vale a posição no vetor
                lin = '<tr id="linha_'+pessoas[i].id+'">' + 
                '<td>' + pessoas[i].nome + '</td>' + 
                '<td>' + pessoas[i].cpf + '</td>' + 
                '<td>' + pessoas[i].email + '</td>' + 
                '<td><a href=# id="excluir_' + pessoas[i].id + '" ' + 
                  'class="excluir_pessoa"><img src="img/excluir.png" '+
                  'alt="Excluir pessoa" title="Excluir pessoa"></a>' + 
                '</td>' + 
                '</tr>';
                // adiciona a linha no corpo da tabela
                $('#corpoTabelaPessoas').append(lin);
            }
        }
    }

    // função que mostra um conteúdo e esconde os outros
    function mostrar_conteudo(identificador) {
        // esconde todos os conteúdos
        $("#cadastroPessoas").addClass('d-none');
        $("#conteudoInicial").addClass('d-none');
        $("#cadastroEstudantes").addClass('d-none');
        // torna o conteúdo escolhido visível
        $("#"+identificador).removeClass('d-none');      
    }

    // código para mapear o click do link Listar
    $(document).on("click", "#linkListarPessoas", function() {
        exibir_pessoas();
    });
    
    // código para mapear click do link Inicio
    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });

    // código para mapear click do botão incluir pessoa
    $(document).on("click", "#btIncluirPessoa", function() {
        //pegar dados da tela
        nome = $("#campoNome").val();
        cpf = $("#campoCPF").val();
        email = $("#campoEmail").val();
        // preparar dados no formato json
        var dados = JSON.stringify({ nome: nome, cpf: cpf, email: email });
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/incluir_pessoa',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: pessoaIncluida, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function pessoaIncluida (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("Pessoa incluída com sucesso!");
                // limpar os campos
                $("#campoNome").val("");
                $("#campoCPF").val("");
                $("#campoEmail").val("");
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("erro ao incluir dados, verifique o backend: ");
        }
    });

    // código a ser executado quando a janela de inclusão de pessoas for fechada
    $('#modalIncluirPessoa').on('hide.bs.modal', function (e) {
        // se a página de listagem não estiver invisível
        if (! $("#cadastroPessoas").hasClass('d-none')) {
            // atualizar a página de listagem
            exibir_pessoas();
        }
    });

    // a função abaixo é executada quando a página abre
    mostrar_conteudo("conteudoInicial");

    // código para os ícones de excluir pessoas (classe css)
    $(document).on("click", ".excluir_pessoa", function() {
        // obter o ID do ícone que foi clicado
        var componente_clicado = $(this).attr('id'); 
        // no id do ícone, obter o ID da pessoa
        var nome_icone = "excluir_";
        var id_pessoa = componente_clicado.substring(nome_icone.length);
        // solicitar a exclusão da pessoa
        $.ajax({
            url: 'http://localhost:5000/excluir_pessoa/'+id_pessoa,
            type: 'DELETE', // método da requisição
            dataType: 'json', // os dados são recebidos no formato json
            success: pessoaExcluida, // chama a função listar para processar o resultado
            error: erroAoExcluir
        });
        function pessoaExcluida (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // remover da tela a linha cuja pessoa foi excluída
                $("#linha_" + id_pessoa).fadeOut(1000, function(){
                    // informar resultado de sucesso
                    alert("Pessoa removida com sucesso!");
                });
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {
            // informar mensagem de erro
            alert("erro ao excluir dados, verifique o backend: ");
        }
    });

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // função para exibir disciplinas na tabela
    function exibir_disciplinas() {
        $.ajax({
            url: 'http://localhost:5000/listar_disciplinas',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar, // chama a função listar para processar o resultado
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });
        function listar (disciplinas) {
            // esvaziar o corpo da tabela
            $('#corpoTabelaDisciplinass').empty();
            // tornar visível a página de pessoas
            mostrar_conteudo("cadastroDisciplinas");      
            // percorrer a lista de disciplinas retornadas; 
            for (var i in disciplinas) { //i vale a posição no vetor
                lin = '<tr id="linha_'+disciplinas[i].id+'">' + 
                '<td>' + disciplinas[i].nome + '</td>' + 
                '<td>' + disciplinas[i].cargaHoraria + '</td>' + 
                '<td>' + disciplinas[i].ementa + '</td>' + 
                '<td><a href=# id="excluir_' + disciplinas[i].id + '" ' + 
                  'class="excluir_disciplina"><img src="img/excluir.png" '+
                  'alt="Excluir Disciplina" title="Excluir Disciplina"></a>' + 
                '</td>' + 
                '</tr>';
                // adiciona a linha no corpo da tabela
                $('#corpoTabelaDisciplinas').append(lin);
            }
        }
    }

    // função que mostra um conteúdo e esconde os outros
    function mostrar_conteudo(identificador) {
        // esconde todos os conteúdos
        $("#cadastroDisciplinas").addClass('d-none');
        $("#conteudoInicial").addClass('d-none');
        $("#cadastroEstudantes").addClass('d-none');
        // torna o conteúdo escolhido visível
        $("#"+identificador).removeClass('d-none');      
    }

    // código para mapear o click do link Listar
    $(document).on("click", "#linkListarDisciplinas", function() {
        exibir_disciplinas();
    });
    
    // código para mapear click do link Inicio
    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });

    // código para mapear click do botão incluir pessoa
    $(document).on("click", "#btIncluirDisciplina", function() {
        //pegar dados da tela
        nome = $("#campoNome").val();
        cargaHoraria = $("#campoCH").val();
        ementa = $("#campoEmenta").val();
        // preparar dados no formato json
        var dados = JSON.stringify({ nome: nome, cargaHoraria: cargaHoraria, ementa: ementa });
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/incluir_disciplina',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: disciplinaIncluida, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function disciplinaIncluida (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("Disciplina incluída com sucesso!");
                // limpar os campos
                $("#campoNome").val("");
                $("#campoCH").val("");
                $("#campoEmenta").val("");
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("erro ao incluir dados, verifique o backend: ");
        }
    });

    // código a ser executado quando a janela de inclusão de disciplina for fechada
    $('#modalIncluirDisciplina').on('hide.bs.modal', function (e) {
        // se a página de listagem não estiver invisível
        if (! $("#cadastroDisciplinas").hasClass('d-none')) {
            // atualizar a página de listagem
            exibir_disciplinas();
        }
    });

    // a função abaixo é executada quando a página abre
    mostrar_conteudo("conteudoInicial");

    // código para os ícones de excluir disciplina (classe css)
    $(document).on("click", ".excluir_disciplina", function() {
        // obter o ID do ícone que foi clicado
        var componente_clicado = $(this).attr('id'); 
        // no id do ícone, obter o ID da disciplina
        var nome_icone = "excluir_";
        var id_disciplina = componente_clicado.substring(nome_icone.length);
        // solicitar a exclusão da disciplina
        $.ajax({
            url: 'http://localhost:5000/excluir_disciplina/'+id_disciplina,
            type: 'DELETE', // método da requisição
            dataType: 'json', // os dados são recebidos no formato json
            success: disciplinaExcluida, // chama a função listar para processar o resultado
            error: erroAoExcluir
        });
        function disciplinaExcluida (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // remover da tela a linha cuja pessoa foi excluída
                $("#linha_" + id_pessoa).fadeOut(1000, function(){
                    // informar resultado de sucesso
                    alert("Disciplina removida com sucesso!");
                });
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {
            // informar mensagem de erro
            alert("erro ao excluir dados, verifique o backend: ");
        }
    });
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // função para exibir os Estudantes
    function exibir_estudantes() {
        $.ajax({
            url: 'http://localhost:5000/listar_estudantes',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar, // chama a função listar para processar o resultado
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });
        function listar (estudantes) {
            // esvaziar o corpo da tabela
            $('#corpoTabelaEstudantes').empty();
            // tornar visível a página de exames realizados
            mostrar_conteudo("cadastroEstudantes");      
            // percorrer a lista de exanes realizados retornados; 
            for (var i in estudantes) { //i vale a posição no vetor
                lin = '<tr id="linha_estudantes_'+estudantes[i].id+'">' + 
                '<td>' + estudantes[i].semestre + '</td>' +
                // dados da pessoa
                '<td>' + estudantes[i].pessoa.nome + '</td>' + 
                '<td>' + estudantes[i].pessoa.cpf + '</td>' + 
                '<td>' + estudantes[i].pessoa.email + '</td>' + 
                // dados da disciplina
                '<td>' + estudantes[i].disciplina.nome + '</td>' + 
                '<td>' + estudantes[i].disciplina.cargaHoraria + '</td>' + 
                '<td>' + estudantes[i].disciplina.ementa + '</td>' + 
                // dados do estudante
                '<td>' + estudantes[i].mediaFinal + '</td>' +
                '<td>' + estudantes[i].frequencia + '</td>' +
                '<td><a href=# id="excluir_estudante_' + estudantes[i].id + '" ' + 
                  'class="excluir_estudante"><img src="img/excluir.png" '+
                  'alt="Excluir estudante" title="Excluir estudante"></a>' + 
                '</td>' + 
                '</tr>';
                // adiciona a linha no corpo da tabela
                $('#corpoTabelaEstudantes').append(lin);
            }
        }
    }

    // código para mapear o click do link estudantes
    $(document).on("click", "#linkListarEstudantes", function() {
        exibir_estudantes();
    });
    
});