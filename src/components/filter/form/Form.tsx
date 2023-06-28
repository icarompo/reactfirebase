import "./modal.styles.css"

type ProcessFormProps = {
  handleLocateClick: () => void;
  handleClearClick: () => void;
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setNewProcesso: (value: string) => void;
  setNewAno: (value: string) => void;
  setNewAssunto: (value: string) => void;
  setNewData: (value: string) => void;
  setNewDataDecisao: (value: string) => void;
  setNewDias: (value: string) => void;
  setNewAssessor: (value: string) => void;
  setNewEntidade: (value: string) => void;
  setNewVinculado: (value: string) => void;
  setNewConselheiro: (value: string) => void;
  setNewOrgaoJulgador: (value: string) => void;
  setNewEncaminhamento: (value: string) => void;
  setNewDefinicao: (value: string) => void;
  setNewMeta: (value: string) => void;
  setNewPrioridade: (value: string) => void;
  newProcesso: string;
  newAno: string;
  newAssunto: string;
  newData: string;
  newDataDecisao: string;
  newDias: string;
  newAssessor: string;
  newEntidade: string;
  newVinculado: string;
  newConselheiro: string;
  newOrgaoJulgador: string;
  newEncaminhamento: string;
  newDefinicao: string;
  newMeta: string;
  newPrioridade: string;
};

function ProcessForm(props: ProcessFormProps) {
  return (
    <div className="column">
    <div className="row">{/*PROCESSO*/}
      <label className="label" htmlFor="proc">
        Processo:
      </label>
      <input onChange={(event) => {props.setNewProcesso(event.target.value);}}
      className="formRow" type="number" placeholder="Processo..." />
    </div>
    <div className="row">{/*ANO*/}
      <label className="label" htmlFor="ano">
        Ano:
      </label>
      <input onChange={(event) => {props.setNewAno(event.target.value);}} 
      className="formRow" type="number" placeholder="Ano..." value={props.newAno}/>
    </div>
    <div className="row">{/*ASSUNTO*/}
      <label className="label" htmlFor="assunto">
        Assunto:
      </label>
      <input onChange={(event) => {props.setNewAssunto(event.target.value);}}
      className="formRow" type="text"  placeholder="Assunto..." value={props.newAssunto}/>
    </div>
    <div className="row">{/*DATA INSERÇÃO*/}
      <label className="label" htmlFor="data">
        Data de inserção:
      </label>
      <input onChange={(event) => {props.setNewData(event.target.value);}}
      className="formRow" type="date" placeholder="Data de inserção..." value={props.newData}/>
    </div>
    <div className="row">{/*DATA DECISÃO*/}
      <label className="label" htmlFor="datadecisao">
        Data de decisão:
      </label>
      <input onChange={(event) => {props.setNewDataDecisao(event.target.value);}}
      className="formRow" type="date" placeholder="Data de decisão..." value={props.newDataDecisao}/>
    </div>
    <div className="row">{/*DIAS*/}
      <label className="label" htmlFor="dias">
        Dias:
      </label>
      <input onChange={(event) => {props.setNewDias(event.target.value);}}
      className="formRow" type="number" placeholder="Dias..." value={props.newDias}/>
    </div>
    <div className="row">{/*ASSESSOR*/}
      <label className="label" htmlFor="assessor">
        Assessor:
      </label>
      <input onChange={(event) => {props.setNewAssessor(event.target.value);}}
      className="formRow" type="number" placeholder="Assessor..." value={props.newAssessor}/>
    </div>
    <div className="row">{/*ENTIDADE*/}
      <label className="label" htmlFor="entidade">
        Entidade:
      </label>
      <input onChange={(event) => {props.setNewEntidade(event.target.value);}} 
      className="formRow" type="text" placeholder="Entidade..." value={props.newEntidade}/>
    </div>
    <div className="row">{/*VINCULADO*/}
      <label className="label" htmlFor="vinculado">
        Vinculado:
      </label>
      <input onChange={(event) => {props.setNewVinculado(event.target.value);}} 
      className="formRow" type="text" placeholder="Vinculado..." value={props.newVinculado}/>
    </div>
    <div className="row">{/*CONSELHEIRO*/}
      <label className="label" htmlFor="conselheiro">
        Conselheiro:
      </label>
      <input onChange={(event) => {props.setNewConselheiro(event.target.value);}} 
      className="formRow" type="text" placeholder="Conselheiro.." value={props.newConselheiro}/>
    </div>
    <div className="row">{/*ÓRGAO JULGADOR*/}
      <label className="label" htmlFor="julgador">
        Órgão Julgador:
      </label>
      <input onChange={(event) => {props.setNewOrgaoJulgador(event.target.value);}}
      className="formRow" type="text" placeholder="Órgão Julgador..." value={props.newOrgaoJulgador}/>
    </div>
    <div className="row">{/*ENCAMINHAMENTO*/}
      <label className="label" htmlFor="encaminhamento">
        Encaminhamento:
      </label>
      <input onChange={(event) => {props.setNewEncaminhamento(event.target.value);}} 
      className="formRow" type="text" placeholder="Encaminhamento..." value={props.newEncaminhamento}/>
    </div>


    <div className="row">{/*DEFINIÇÃO*/}
      <label className="label" htmlFor="definicao">
        Definição:
      </label>

      <select
          className="select"
          onChange={(event) => {props.setNewDefinicao(event.target.value);}}
       >          
          <option value="sim">Finalizados</option>
          <option value="TRAMIT.">Tramitando</option>
          <option value="sobrest">Sobrestado</option>
          <option value="relatoria">Relatoria</option>
        </select>

    </div>


    <div className="row">{/*META*/}
      <label className="label" htmlFor="meta">
        Meta:
      </label>
      <input onChange={(event) => {props.setNewMeta(event.target.value);}} 
      className="formRow" type="text" placeholder="Meta..." value={props.newMeta}/>
    </div>
    <div className="row">{/*PRIORIDADE*/}
      <label className="label" htmlFor="prioridade">
        Prioridade:
      </label>
      <select
          className="select"
          onChange={(event) => {props.setNewPrioridade(event.target.value);}}
        >
          <option value={props.newPrioridade}>Alta</option>
          <option value={props.newPrioridade}>Média</option>
          <option value={props.newPrioridade}>Baixa</option>
        </select>


    </div>
  </div>
    );
}

export default ProcessForm;