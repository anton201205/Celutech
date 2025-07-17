const selector = document.getElementById("selector-categoria");
const celSection = document.getElementById("celulares-section");
const acceSection = document.getElementById("accesorios-section");

function categorias(){
    const seleccion = selector.value;
    switch (seleccion) {
        case "todos":
            celSection.style.display = "block";
            acceSection.style.display = "block";
            break;
        case "celulares":
            celSection.style.display = "block";
            acceSection.style.display = "none";
            break;
        case "accesorios":
            celSection.style.display = "none";
            acceSection.style.display = "block";
            break;
    }
}
