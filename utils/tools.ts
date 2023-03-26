import { Pagination } from "../models/models";

// Funções de validação de CPF
export const ValidCPF = (strCPF: string) => {
    strCPF = String(strCPF).replace(/\D/g,'');
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;
  

    for (let i:number =1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
    for (let i:number = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

// Extrai limit e offset da requisicao
export const GetPagination = (query: any):Pagination => {
    var pag:Pagination = {
        limit: 10,
        offset: 0,
        count: 0
    }

    if(query.limit != null && query.limit != "") {
        pag.limit = parseInt(query.limit);
    }

    if(query.offset != null && query.offset != "") {
        pag.offset = parseInt(query.offset);
    }

    return pag;
}