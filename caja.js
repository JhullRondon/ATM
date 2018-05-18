//traer del html la caja de texto y boton
var texto = document.getElementById("texto");
var botoncito = document.getElementById("boton");
botoncito.addEventListener("click", Clickeo);
// traer del html el parafo dond estaran los billetes
var resultado = document.getElementById("resultado");


var TEN = 3;
var TWENTY = 2;
var FIFTY = 1;
var CIEN = 0;


var imagenes = [];
imagenes[100] = "100.png";
imagenes[50] = "50.png";
imagenes[20] = "20.png";
imagenes[10] = "10.png";


var caja = [];
caja.push(new Billete(100, 100)); //posicion [0]
caja.push(new Billete(50, 100)); //posicion [1]
caja.push(new Billete(20, 10)); //posicion [2]
caja.push(new Billete(10, 2)); //posicion [3]

var retiro= [];

function Retirar(dinero)
{
    var division;    
    var papel = 0;

    retiro = [];
    for(var b of caja)  // crea el array retiro y divide los billetes entre los existentes
    {
        
        division = Math.floor(dinero / b.valor);
        if (division > b.cantidad)
        {
            papel = b.cantidad;
        }
        else
        {
            papel = division;            
        }

        retiro.push(new Billete(b.valor, papel));
        dinero = dinero - (papel*b.valor);
        b.cantidad = b.cantidad - papel;
    }

    console.log(caja);

    if (dinero == 10 && caja[TWENTY].cantidad>5)// casos especiales dond no hay billetes de 10
    {
        if (retiro[CIEN].cantidad >= 1)// si hay algun billete de 100 entre los que se quiere retirar
        {
            retiro[CIEN].cantidad = retiro[CIEN].cantidad - 1;
            retiro[TWENTY].cantidad = retiro[TWENTY].cantidad + 5;  
            caja[TWENTY].cantidad = caja[TWENTY].cantidad -5;
            
            if (caja[FIFTY].cantidad >= 1)// verifica que haya billetes de 50 antes de hacer el arreglo
            {
                retiro[TWENTY].cantidad = retiro[TWENTY].cantidad - 2;
                caja[TWENTY].cantidad = caja[TWENTY].cantidad +2;
                retiro[FIFTY].cantidad++;
                caja[FIFTY].cantidad--;
                dinero = 0;                                
            }
            else // no hay billetes para hacer el arreglo
            {
                msjError();
            }            

        }
        else if(retiro[FIFTY].cantidad >= 2)// si no hay billetes de 100 lo intenta con 2 de 50
        {
            retiro[FIFTY].cantidad = retiro[FIFTY].cantidad - 2;
            caja[FIFTY].cantidad = caja[FIFTY].cantidad +2;
            retiro[TWENTY].cantidad = retiro[TWENTY].cantidad + 5;  
            caja[TWENTY].cantidad = caja[TWENTY].cantidad -5;
            if (caja[FIFTY]>=1)// confirma que aun queden billetes de 50 en caja
            {
                retiro[TWENTY].cantidad = retiro[TWENTY].cantidad - 2;
                caja[TWENTY].cantidad = caja[TWENTY].cantidad +2;
                retiro[FIFTY].cantidad++;
                caja[FIFTY].cantidad--;
                dinero = 0;
            }
            else // no hay  suficientes billetes de 50
            {
                msjError();
            } 
        }else if (retiro[FIFTY].cantidad == 1) //caso cuando la cantidad no pasa de 100
        {
            retiro[FIFTY].cantidad--;
            caja[FIFTY].cantidad++;
            retiro[TWENTY].cantidad = retiro[TWENTY].cantidad + 3;
            caja[TWENTY].cantidad = caja[TWENTY].cantidad -3;
            dinero = 0;

        }
        else{
            msjError();
        }     
    }
    if (dinero == 0)// efectua el retiro con exito
    {
        resultado.innerHTML = " ";// innerHTML escribe sobre una etiqueta del html
        for (var r of retiro)
        {
            for ( var i=0;i<r.cantidad;i++)
            {
                resultado.innerHTML = resultado.innerHTML + "<img src=" + r.imagen.src + " />";
            }  
            resultado.innerHTML = resultado.innerHTML + "<br />";        
        }
    } 
    else
    {
        resultado.innerHTML = " ";
        msjError();
    }

}
