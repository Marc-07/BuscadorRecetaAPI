function iniciarApp(){

    const selectCategorias = document.querySelector("#categorias")
    selectCategorias.addEventListener("change", seleccionarCtegoria)

    const resultado = document.querySelector("#resultado");

    obtenerCategorias();
    function obtenerCategorias (){

        const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
        fetch(url)
            .then (respuesta => respuesta.json())
            .then (resultado => mostrarCategorias(resultado.categories))
    }

    function mostrarCategorias (categorias = []){
        categorias.forEach (categoria => {

            const {strCategory} = categoria;
            const option = document.createElement("OPTION")
            option.value = strCategory;
            option.textContent = strCategory;
            selectCategorias.appendChild(option)
        })
    }

    function seleccionarCtegoria(e){
        const categoria = e.target.value;
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`
        fetch(url)
            .then (respuesta => respuesta.json ())
            .then ( resultado => mostrarRecetas(resultado.meals))

    }

    function mostrarRecetas (recetas = []) {
       

        //Iterar en los resultados
        recetas.forEach ( receta => {
            const { idMeal, strMeal, strMealThumb} = receta;
            const recetaContenedor = document.createElement("DIV");
            recetaContenedor.classList.add("lg:w-1/4", "p-2");

            const recetaCard = document.createElement("DIV");
            recetaCard.classList.add("bg-white", "shadow-lg", "rounded-lg", "p-4", "mb-4")

            const recetaImagen = document.createElement("IMG");
            recetaImagen.classList.add("w-full", "h-40", "object-cover", "rounded-t-lg");
            recetaImagen.alt = `Imagen de la Receta ${strMeal}`;
            recetaImagen.src = strMealThumb;

            const recetaCardBody = document.createElement("DIV");
            recetaCardBody.classList.add("p-4", "space-y-2");

            const recetaHeading = document.createElement("H3");
            recetaHeading.classList.add("text-xl", "font-bold");
            recetaHeading.textContent = strMeal;

            const recetaButton = document.createElement ("BUTTON");
            recetaButton.classList.add("bg-orange-600", "hover:bg-orange-700", "text-white", "font-semibold", "py-2", "px-4", "w-full", "rounded", "mb-6");
            recetaButton.textContent = "Ver Receta";

            //Inyectar en el código HTML
            recetaCardBody.appendChild(recetaHeading);
            recetaCardBody.appendChild(recetaButton);

            recetaCard.appendChild(recetaImagen);
            recetaCard.appendChild(recetaCardBody);

            recetaContenedor.appendChild(recetaCard);
            
            resultado.appendChild(recetaContenedor);
        })

    }
}

document.addEventListener("DOMContentLoaded", iniciarApp);