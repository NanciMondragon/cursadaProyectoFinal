

function iniciarApp(){

    const selectCategorias = document.querySelector('#categorias');
    selectCategorias.addEventListener('change', seleccionarCategoria)

    const resultado = document.querySelector('#resultado');
    

    obtenerCategorias();

    function obtenerCategorias(){
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php'
        fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarCategorias(resultado.categories))
    }


    function mostrarCategorias(categorias = []) {
        categorias.forEach( categoria => {
            const { strCategory } = categoria
            const option = document.createElement('OPTION');
            option.value = strCategory
            option.textContent = strCategory
            selectCategorias.appendChild(option);
        });
    }

    function seleccionarCategoria(e) {
        const categoria = e.target.value;
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;
        fetch(url) 
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarRecetas(resultado.meals))

    } 

    function mostrarRecetas(recetas = []){
       
        recetas.forEach(receta => {

            const { idMeal, strMeal, strMealThumb } = receta
        
            const recetaContenedor = document.createElement('div');
            recetaContenedor.classList.add('col-md-4');
            
            const recetaCard = document.createElement('div');
            recetaCard.classList.add('card', 'mb-4');

            const recetaImagen = document.createElement('img');
            recetaImagen.classList.add('card-img-top');
            recetaImagen.alt = `Receta ${strMeal}`;
            recetaImagen.src = strMealThumb;

            const recetaCardBody = document.createElement('div');
            recetaCardBody.classList.add('card-body');

            const recetaHeading = document.createElement('h3');
            recetaHeading.classList.add('card-title', 'mb-3');
            recetaHeading.textContent = strMeal;

            const recetaButton = document.createElement('button');
            recetaButton.classList.add('btn', 'btn-danger', 'w-100');
            recetaButton.textContent = "Visualizar Receta";

            recetaCardBody.appendChild(recetaHeading);
            recetaCardBody.appendChild(recetaButton);

            recetaCard.appendChild(recetaImagen);
            recetaCard.appendChild(recetaCardBody);

            recetaContenedor.appendChild(recetaCard);

            resultado.appendChild(recetaContenedor);
            
            
           

        })

    }
}

document.addEventListener('DOMContentLoaded', iniciarApp);