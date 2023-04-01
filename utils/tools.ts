import { Pagination } from "../models/models";

export const ValidCPFCNPJ = (strCPFCNPJ: string) => {
    strCPFCNPJ = String(strCPFCNPJ).replace(/\D/g,'');
    if(strCPFCNPJ.length == 11) return ValidCPF(strCPFCNPJ);
    else if(strCPFCNPJ.length == 14) return ValidCNPJ(strCPFCNPJ);
    else return false;
}

// Funções de validação de CPF
export const ValidCPF = (strCPF: string) => {
    strCPF = String(strCPF).replace(/\D/g,'');
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000" ||
        strCPF == "11111111111" ||
        strCPF == "22222222222" ||
        strCPF == "33333333333" ||
        strCPF == "44444444444" ||
        strCPF == "55555555555" ||
        strCPF == "66666666666" ||
        strCPF == "77777777777" ||
        strCPF == "88888888888" ||
        strCPF == "99999999999") return false;

  

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

// Funções de validação de CNPJ
export const ValidCNPJ = (cnpj: string) => {
    cnpj = cnpj.replace(/[^\d]+/g,'');

    if(cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
        
    // Valida DVs
    let tamanho:number = cnpj.length - 2
    let numeros:string = cnpj.substring(0,tamanho);
    let digitos:string = cnpj.substring(tamanho);
    let soma:number = 0;
    let pos:number = tamanho - 7;
    for (let i:number = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2)
            pos = 9;
    }
    let resultado:number = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != parseInt(digitos.charAt(0)))
        return false;
        
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i:number = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != parseInt(digitos.charAt(1)))
          return false;
          
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