
/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
const baseUrl = "https://platzi-avo.vercel.app";

const appNode = document.querySelector('#app');

//Intl (internalización): web api para darle formato a fechas y a monedas
const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat("en-EN", { 
        style: "currency", 
        currency: "USD",   
    }).format(price);
    
    return newPrice;
};

//Fetch: web api
//1. Conectarnos al servidor
window.fetch(`${baseUrl}/api/avo`)
    //2. Procesar la respuesta, y convertirla en JSON
    .then((respuesta) => respuesta.json())
    //JSON -> Data -> Renderizar info browser
    .then(respuestaJSON => {
        const todosLosItems = [];
        respuestaJSON.data.forEach(item => {//data es un array que está dentro de respuestaJSON
            //crear una imagen
            const image = document.createElement('img');
            image.src = `${baseUrl}${item.image}`; //Concatenamos ${baseUrl}, que tiene una url, a ${item.image}, que trae una url incompleta hacia imagenes en un servidor.

            //crear un elemento para titulo
            const title = document.createElement('h2');
            title.textContent = item.name;

            //FORMA 1 DE USAR CSS
            image.style.width = '150px'; //También puede ser title.style = 'width: 200px'

            //FORMA 1 DE USAR CSS: usando clases
            title.className = 'card-title'; //Creandole una clase al elemento h2 (title) y agregando los estilos desde un documento css

            //crear un elemento para precio
            const price = document.createElement('div');
            price.textContent = formatPrice(item.price); //Imprime en el div precio el valor que trae la propiedad precio que está en un objeto (item) que está dentro de un array (data)
            price.className = 'card-price';

            const text = document.createElement('div');
            text.append(title, price);

            const container = document.createElement('div');
            container.className = 'card-container';
            container.append(image, text); //Agregamos 3 elementos al div llamado container
            todosLosItems.push(container);
        });
        appNode.append(...todosLosItems);
    });
;


//OTRA FORMA: async/await
/*
async function fetchData() {
  const response = await fetch(url),
  data = await response.json(),
  allItems = [];

  data.data.forEach((item) => {
    // create image
    const image = document.createElement("img");
    // create title
    const title = document.createElement("h2");
    // create price
    const price = document.createElement("div");

    const container = document.createElement("div");
    container.append(image, title, price);

    allItems.push(container);
  });

  document.body.append(...allItems)
}

fetchData();*/



