let galleryImages = document.querySelectorAll('.gallery-img');
let getLatestOpenImg;
let windowWidth = window.innerWidth;

if (galleryImages) {
    galleryImages.forEach(function (image, index) {
        image.onclick = function () {
            let getElementCss = window.getComputedStyle(image);
            let getFullImageUrl = getElementCss.getPropertyValue('background-image');
            let getImageUrlPosition = getFullImageUrl.split('/images/thumbs');
            // console.log(getImageUrlPosition);
            let setNewImageUrl = getImageUrlPosition[1].replace('")', '');
            // console.log(setNewImageUrl);
            getLatestOpenImg = index + 1;

            //When image thumb is click this creates a div for the full size image
            let container = document.body;
            let newImgWindow = document.createElement('div');
            container.appendChild(newImgWindow);
            //this is link to the closing of the image function
            newImgWindow.setAttribute('class', 'img-window');
            newImgWindow.setAttribute('onclick', 'closeImg()')

            let newImg = document.createElement('img');
            newImgWindow.appendChild(newImg);
            newImg.setAttribute('src', 'images/' + setNewImageUrl);
            newImg.setAttribute('id', 'current-img');


            newImg.onload = function () {

                //This is for placing the buttons
                //The - 80 is in px
                let imgWidth = this.width;
                let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80;

                //Next image button
                let newNextBtn = document.createElement('a');
                let btnNextText = document.createTextNode('Next');
                newNextBtn.appendChild(btnNextText);
                container.appendChild(newNextBtn);
                newNextBtn.setAttribute('class', 'img-btn-next');
                newNextBtn.setAttribute('onclick', 'changeImg(1)');
                newNextBtn.style.cssText = "right: " + calcImgToEdge + "px;";

                //Previous image button
                let newPrevBtn = document.createElement('a');
                let btnPrevText = document.createTextNode('Prev');
                newPrevBtn.appendChild(btnPrevText);
                container.appendChild(newPrevBtn);
                newPrevBtn.setAttribute('class', 'img-btn-prev');
                newPrevBtn.setAttribute('onclick', 'changeImg(0)');
                newPrevBtn.style.cssText = "left: " + calcImgToEdge + "px;";

            }
        }
    });
}

//Close image func
function closeImg() {
    document.querySelector('.img-window').remove();
    document.querySelector('.img-btn-next').remove();
    document.querySelector('.img-btn-prev').remove()
}

//Next button and previous button function
function changeImg(changeDirection) {
    document.querySelector('#current-img').remove();
    let getImgWindow = document.querySelector('.img-window');
    let newImg = document.createElement('img');
    getImgWindow.appendChild(newImg);

    let calcNewImg;
    if (changeDirection === 1) {
        calcNewImg = getLatestOpenImg + 1;
        if (calcNewImg > galleryImages.length) {
            calcNewImg = 1;
        }
    } else if (changeDirection === 0) {
        calcNewImg = getLatestOpenImg - 1;
        if (calcNewImg < 1) {
            calcNewImg = galleryImages.length;
        }
    }
    newImg.setAttribute('src', 'images/img' + calcNewImg + '.jpg');
    newImg.setAttribute('id', 'current-img');

    getLatestOpenImg = calcNewImg;

    newImg.onload = function () {
        let imgWidth = this.width;
        let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80;

        let nextBtn = document.querySelector('.img-btn-next');
        nextBtn.style.cssText = "right: " + calcImgToEdge + "px;";


        let prevBtn = document.querySelector('.img-btn-prev');
        prevBtn.style.cssText = "left: " + calcImgToEdge + "px;";
    }
}
