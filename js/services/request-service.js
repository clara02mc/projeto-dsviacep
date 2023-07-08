 import RequestException from "./exceptions/request-exceptions.js";

export async function getJson(url){
    try{
    const response = await fetch(url);
    const jsonbody = await response.json()
    return jsonbody;
    }
    catch (e) {
        throw new RequestException(" Erro ao realizar requisição");
    }
} 