const blockImg = document.querySelector(".picture");
const fileBtn = document.querySelector(".filter__form-btn");
const filterImg = document.querySelectorAll(".filter-img");

let fileUpload = false;//для проверки загруженнего изображения

const  waitingStr = "<span class='red'>Waiting for you image...</span>";

function onFileBtnClick() {
    //создаем ссылку на изображение из массива файлов,
    //загруженных через input
    let url = window.URL.createObjectURL(fileBtn.files[0]);

    blockImg.style.backgroundImage = "url("+url+")";
    blockImg.style.backgroundColor = "transparent";

    if ( blockImg.innerText.length > 0 ) {
        blockImg.innerText = "";
        fileUpload = true;
    }
}
/*
 функция принимает имя фильтра.
 в строку переписываются значения свойства filter и
 проверяется есть ли там уже переденное значение.
 если есть - удаляем, если нет - добавляем
*/
function applyFilter(nameFilter, el){

    let filterStr = blockImg.style.filter;
    const pos = filterStr.indexOf(nameFilter);

    if ( pos >= 0 ){
        filterStr = filterStr.replace(nameFilter,"");
    }
    else{
        filterStr += " " + nameFilter;
    }
    blockImg.style.filter = filterStr;
    blockImg.style["-webkit-filter"] = filterStr;

    el.classList.toggle("border");
}
//загружаем изображение
fileBtn.addEventListener("change",onFileBtnClick);
//применяем фильтр
filterImg.forEach(el => el.addEventListener( "click",  function () {
        fileUpload ? applyFilter(el.title, el) : blockImg.innerHTML = waitingStr
    })
);