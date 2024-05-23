
const codesAwardaded = [1996, 1997, 1998];

let animating = false;

var arm = document.querySelector('#start-game');
arm.addEventListener('click', function () {
    if (animating) {
        return;
    }

    animating = true;

    document.querySelectorAll('.column').forEach(function (column) {
        column.classList.remove('winner-column');
    });

    var promotionCode = document.getElementById("code-input").value;
    if (promotionCode.length <= 0) {
        alert("DEVE SER INFORMADO UM CÓDIGO PROMOCIONAL")
        animating = false;
        return;
    }

    if (codesAwardaded.includes(parseInt(promotionCode)))
        spinSlot(true);
    else
        spinSlot(false);

    document.getElementById("code-input").value = '';
});

function spinSlot(awarded) {
    var intervalId = setInterval(function () {
        animateColumns();
    }, 200);

    setTimeout(function () {
        clearInterval(intervalId);

        if (awarded) {
            var columns = document.querySelectorAll('.column');
            columns.forEach(function (column) {
                column.innerHTML = '<img src="' + "estacio_logo.png" + '" alt="">';
            });

            document.querySelectorAll('.column').forEach(function (column) {
                column.classList.add('winner-column');
            });

            abrirModal(true);
        }
        else
            abrirModal(false);

        animating = false;

    }, 4000);
}

function randomImage() {
    var images = ['chapeu.png', 'estacio_logo.png', 'caderno.png', 'diploma.png'];
    return images[Math.floor(Math.random() * images.length)];
}

function animateColumns() {
    var columns = document.querySelectorAll('.column');
    var randomImg = randomImage();
    columns.forEach(function (column) {
        var newImage = randomImage();
        column.innerHTML = '<img src="' + newImage + '" alt="">';
    });
}

function abrirModal(awarded) {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    var modalImage = document.getElementById('modal-image');
    if (awarded == true)
        modalImage.src = "GANHOU.png";
    else
        modalImage.src = "PERDEU.png";
}

// Função para fechar o modal
function fecharModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";

    document.querySelectorAll('.column').forEach(function (column) {
        column.classList.remove('winner-column');
    });

    document.getElementById("modalOverlay").classList.remove("active");
}

window.onclick = function (event) {
    console.log(event)
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        fecharModal();
    }
}




