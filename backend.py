from config import *
from modelo import Pessoa, Disciplina, EstudanteDaDisciplina

@app.route("/")
def inicio():
    return 'Sistema de cadastro de estudantes. '+\
        '<a href="/listar_pessoas">Operação listar</a>'

# Funções para classe Pessoa

@app.route("/listar_pessoas")
def listar_pessoas():
    # obter as pessoas do cadastro
    pessoas = db.session.query(Pessoa).all()
    # aplicar o método json que a classe Pessoa possui a cada elemento da lista
    pessoas_em_json = [ x.json() for x in pessoas ]
    # converter a lista do python para json
    resposta = jsonify(pessoas_em_json)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...

@app.route("/incluir_pessoa", methods=['post'])
def incluir_pessoa():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova pessoa
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    try: # tentar executar a operação
      nova = Pessoa(**dados) # criar a nova pessoa
      db.session.add(nova) # adicionar no BD
      db.session.commit() # efetivar a operação de gravação
    except Exception as e: # em caso de erro...
      # informar mensagem de erro
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

@app.route("/excluir_pessoa/<int:pessoa_id>", methods=['DELETE'])
def excluir_pessoa(pessoa_id):
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        # excluir a pessoa do ID informado
        Pessoa.query.filter(Pessoa.id == pessoa_id).delete()
        # confirmar a exclusão
        db.session.commit()
    except Exception as e:
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

#///////////////////////////////////////////////////////////////////////////////////////////

# Funções para classe Disciplina

@app.route("/listar_disciplinas")
def listar_disciplinas():
    # obter as disciplinas do cadastro
    disciplinas = db.session.query(Disciplina).all()
    # aplicar o método json que a classe Disciplina possui a cada elemento da lista
    disciplinas_em_json = [ x.json() for x in disciplinas ]
    # converter a lista do python para json
    resposta = jsonify(disciplinas_em_json)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...

@app.route("/incluir_disciplina", methods=['post'])
def incluir_disciplina():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova disciplina
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    try: # tentar executar a operação
      nova = Disciplina(**dados) # criar a nova disciplina
      db.session.add(nova) # adicionar no BD
      db.session.commit() # efetivar a operação de gravação
    except Exception as e: # em caso de erro...
      # informar mensagem de erro
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

@app.route("/excluir_disciplina/<int:disciplina_id>", methods=['DELETE'])
def excluir_disciplina(pessoa_id):
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        # excluir a disciplina do ID informado
        Disciplina.query.filter(Disciplina.id == disciplina_id).delete()
        # confirmar a exclusão
        db.session.commit()
    except Exception as e:
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

#///////////////////////////////////////////////////////////////////////////////////////////

#Funções para classe EstudanteDaDisciplina

@app.route("/listar_estudantes")
def listar_estudantes():
    # obter exames realizados
    estudantes = db.session.query(EstudanteDaDisciplina).all()
    # converter dados para json
    lista_jsons = [ x.json() for x in estudantes ]
    # converter a lista do python para json
    resposta = jsonify(lista_jsons)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

app.run(debug=True)