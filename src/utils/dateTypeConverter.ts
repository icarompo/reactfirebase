export const convertDateIn = (dateString: String | undefined) => {//Converte a data para o formato do banco de dados

    if (dateString === undefined) {
      return "";
    }
    const dateParts = dateString.split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    return `${day}/${month}/${year}`;
  };

export  const convertDateOut = (dateString: String | undefined) => {//Converte a data para o formato do input do tipo date

    if (dateString === undefined) {
      return "";
    }
    const dateParts = dateString.split("/");
    const year = dateParts[2];
    const month = dateParts[1];
    const day = dateParts[0];
    return `${year}-${month}-${day}`;
  };