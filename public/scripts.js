const modalOverlay = document.querySelector('.modal__overlay');//pegando referencia do modal
const cards        = document.querySelectorAll('.card'); //pegando as referencias dos cards
const btnClose     = document.querySelector('.close_modal');

for(let card of cards){
    card.addEventListener("click", function(){
        let video_id = card.getAttribute('id');
        window.location.href=`/video?id=${video_id}`;

    })
}



