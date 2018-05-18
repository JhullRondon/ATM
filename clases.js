class Billete
{
    constructor(v, c)
    {
        this.imagen = new Image();
        this.valor = v;
        this.cantidad = c;

        this.imagen.src = imagenes[this.valor];
    }
}


function Clickeo()
{
    var dinero = parseInt(texto.value);

    if (dinero%10==0 && dinero>=10 && dinero <=500)
    {
        Retirar(dinero);
    }
    else
    {
        alert("Error en la cantidad ingresada");
        texto.value = "";
    }
}

function msjError()
{
    alert("No se puede Retirar esa cantidad, intente otro monto.");
    texto.value = "";
}

