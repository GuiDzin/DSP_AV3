from config import *

class Pessoa(db.Model):
    #Atributos da classe Pessoa
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    cpf = db.Column(db.Integer)
    email = db.Column(db.String(254))
    
    #Método para imprimir em texto
    def __str__(self):
        return f'Id {self.id}: {self.nome}, CPF: {self.cpf}, {self.email}.'
    
    #Método de expressão da classe em Json
    def json(self):
        return{
            "id": self.id,
            "nome": self.nome,
            "CPF": self.cpf,
            "email": self.email,
        }    
     
class Disciplina(db.Model):
    #Atributos da classe Disciplina
     id = db.Column(db.Integer, primary_key=True)
     nome = db.Column(db.String(254))
     cargaHoraria = db.Column(db.String(254))
     ementa = db.Column(db.String(254))
    
    #Método para imprimir em texto
     def __str__(self):
        return f'Id {self.id}: {self.nome}, {self.cargaHoraria} horas, Ementa: {self.ementa}.'
    
    #Método de expressão da classe em Json
     def json(self):
        return{
            "id": self.id,
            "nome": self.nome,
            "carga horaria": self.cargaHoraria,
            "ementa": self.ementa
        }
        
class EstudanteDaDisciplina(db.Model):
     #Atributos da classe Disciplina
     id = db.Column(db.Integer, primary_key=True)
     semestre = db.Column(db.String(254))
     mediaFinal = db.Column(db.Float)
     frequencia = db.Column(db.Float)
     #Atributo de chave estrangeira
     pessoa_id = db.Column(db.Integer, db.ForeignKey(Pessoa.id), nullable=False)
     disciplina_id = db.Column(db.Integer, db.ForeignKey(Disciplina.id), nullable=False)
    #Atributo de relacionamento
     pessoa = db.relationship("Pessoa")
     disciplina = db.relationship("Disciplina")
    
    #Método para imprimir em texto
     def __str__(self):
        return f'Id {self.id}: {self.semestre}, pessoa {self.pessoa_id}, {self.pessoa}, disciplina {self.disciplina_id}, {self.disciplina}, media Final: {self.mediaFinal}, frequencia: {self.frequencia} %.'
    
    #Método de expressão da classe em Json
     def json(self):
        return{
            "id": self.id,
            "semestre": self.semestre,
            "pessoa_id": self.pessoa_id,
            "Pessoa": self.pessoa.json(),
            "disciplina_id": self.disciplina_id,
            "Disciplina": self.disciplina.json(),
            "media final": self.mediaFinal,
            "frequência" : self.frequencia            
        }
    
if __name__ == "__main__":
    
    #Apagar arquivo, se houver
    if os.path.exists(arquivobd):
        os.remove(arquivobd)
        
    #Criar tabela
    db.create_all()
    
    #Teste das classes
    p1 = Pessoa(nome = "Anna", cpf = "000-000-000-01", email = "anna@gmail.com")
    d1 = Disciplina(nome = "Matemática Aplicada ", cargaHoraria = "60:00 horas", ementa = "Aplicação matemática nas Industrias...")
    p2 = Pessoa(nome = "João", cpf = "000-000-000-21", email = "joao@gmail.com")
    d2 = Disciplina(nome = "Português ", cargaHoraria = "50:00 horas", ementa = "Língua Portuguesa...")
    p3 = Pessoa(nome = "Maria", cpf = "000-000-200-71", email = "maria@gmail.com")
    d3 = Disciplina(nome = "Geografia", cargaHoraria = "55:00 horas", ementa = "Geografia Global...")
    e1 = EstudanteDaDisciplina(semestre = "1° semestre", pessoa = p1, disciplina = d1, mediaFinal = 5.9, frequencia = 85.9)
    
    #Persistir
    db.session.add(p1)
    db.session.add(d1)
    db.session.add(p2)
    db.session.add(d2)
    db.session.add(p3)
    db.session.add(d3)
    db.session.add(e1)
    db.session.commit()
    
    #Exibir
    print(p1)
    print(p1.json())
    print(d1)
    print(d1.json())
    print(e1)
    print(e1.json())