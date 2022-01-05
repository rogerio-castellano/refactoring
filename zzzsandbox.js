const teste = valor => 
{
    const fator = 10;
    const teste2 = valor =>
    {
        return valor * fator;
    }
    return teste2(valor) + 1;
}

console.log(teste(1));
