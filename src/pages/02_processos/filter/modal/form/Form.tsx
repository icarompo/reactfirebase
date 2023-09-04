import "./modal.styles.css";

type ProcessFormProps = {
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
  setNewJulgador: (value: string) => void;
  //aguardando
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
  newJulgador: string;
  //aguardando
};

function ProcessForm(props: ProcessFormProps) {
  return (
    <>
      {/*ANO*/}

      <input
        onChange={(event) => {
          props.setNewAssunto(event.target.value);
        }}
        className="input-form"
        type="text"
        placeholder="Assunto..."
        value={props.newAssunto}
      />

      <input
        onChange={(event) => {
          props.setNewData(event.target.value);
        }}
        className="input-form"
        type="date"
        placeholder="Data de inserção..."
        value={props.newData}
      />

      <input
        onChange={(event) => {
          props.setNewDataDecisao(event.target.value);
        }}
        className="input-form"
        type="date"
        placeholder="Data de decisão..."
        value={props.newDataDecisao}
      />

      <input
        onChange={(event) => {
          props.setNewDias(event.target.value);
        }}
        className="input-form"
        type="number"
        placeholder="Dias..."
        value={props.newDias}
      />

      <select
        className="input-form"
        value={props.newAssessor}
        onChange={(event) => {
          props.setNewAssessor(event.target.value);
        }}
      >
        <option value=""></option>
        <option value="1">1 - Sandro</option>
        <option value="2">2 - Sônia</option>
        <option value="3">3 - Leidivon</option>
        <option value="4">4 - Hermes</option>
        <option value="5">5 - Mário</option>
        <option value="6">6 - Abel</option>
        <option value="7">7 - Luane</option>
        <option value="8">8 - Jaqueline</option>
        <option value="9">9 - Leda</option>
        <option value="10">10 - Marcelo</option>
      </select>

      <input
        onChange={(event) => {
          props.setNewEntidade(event.target.value);
        }}
        className="input-form"
        type="text"
        placeholder="Entidade..."
        value={props.newEntidade}
      />

      <input
        onChange={(event) => {
          props.setNewVinculado(event.target.value);
        }}
        className="input-form"
        type="text"
        placeholder="Vinculado..."
        value={props.newVinculado}
      />

      <input
        onChange={(event) => {
          props.setNewConselheiro(event.target.value);
        }}
        className="input-form"
        type="text"
        placeholder="Conselheiro.."
        value={props.newConselheiro}
      />

      <input
        onChange={(event) => {
          props.setNewOrgaoJulgador(event.target.value);
        }}
        className="input-form"
        type="text"
        placeholder="Órgão Julgador..."
        value={props.newOrgaoJulgador}
      />

      <input
        onChange={(event) => {
          props.setNewEncaminhamento(event.target.value);
        }}
        className="input-form"
        type="text"
        placeholder="Encaminhamento..."
        value={props.newEncaminhamento}
      />

      <input
        onChange={(event) => {
          props.setNewJulgador(event.target.value);
        }}
        className="input-form"
        type="text"
        placeholder="Julgador..."
        value={props.newJulgador}
      />

      <select
        className="input-form"
        value={props.newDefinicao}
        onChange={(event) => {
          props.setNewDefinicao(event.target.value);
        }}
      >
        <option value=""></option>
        <option value="sim">Finalizados</option>
        <option value="TRAMIT.">Tramitando</option>
        <option value="sobrest">Sobrestado</option>
        <option value="relatoria">Relatoria</option>
      </select>

      <select
        className="input-form"
        value={props.newMeta}
        onChange={(event) => {
          props.setNewMeta(event.target.value);
        }}
      >
        <option value=""></option>
        <option value="sim">Sim</option>
        <option value="nao">Não</option>
      </select>

      <select
        className="input-form"
        value={props.newPrioridade}
        onChange={(event) => {
          props.setNewPrioridade(event.target.value);
        }}
      >
        <option value=""></option>
        <option value="alta">Alta</option>
        <option value="media">Média</option>
        <option value="baixa">Baixa</option>
      </select>
    </>
  );
}

export default ProcessForm;
