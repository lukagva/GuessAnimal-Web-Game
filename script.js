let playAudio = document.querySelector('.play-button');
let restartIcon = document.querySelector('.restart-img-icon');
let restartButton = document.querySelector(".restart-button");
let visualAudio = document.querySelector('.waveContainer');
let animalButtons = document.getElementsByClassName('animalImg');
let popUp = document.querySelector(".popUp");
let animalContainer = document.querySelector('.animalContainer');
let scoreDisplay = document.querySelector('.score-display');
let audioList = ['monkeyAudio','horseAudio','eagleAudio','elephantAudio','turkeyAudio','tigerAudio'];
let correctAnswerSound = document.getElementById('correct-effect-sound');
let wrongAswerSound = document.getElementById('cartoon-slip-sound');
let imgList = ['images/monkey.png','images/eagle.png','images/elephant.png','images/turkey.png','images/horse.png','images/tiger.png'];
let indexOfList;
let correntScore = document.querySelector('.correntScore');
let game = true;
let scoreChange = true;
let rightAnswer;
let idAudio;
let score = 0;



restartIcon.addEventListener('ckick',rotateIcon());

function rotateIcon(){
    setTimeout(() => {
        restartIcon.classList.add('restart-rotate');
    },4000);    
    restartIcon.classList.remove('restart-rotate');

}

loadGame();
function loanAudioImgList(){
}
function loadGame(){
    idAudio = getRandomId();
    putAnimalImgRandomly();
    playAudioButt();
    clickedAnimal();
}

restartButton.addEventListener('click',()=>{
    for (let index = 0; index < animalButtons.length; index++) {
        animalButtons[index].parentNode.classList.remove('rigt-answered-div');
        animalButtons[index].id = 'animal'+index;
    }
     score = 0;
     scoreDisplay.textContent = `${score}`;

     imgList = ['images/monkey.png','images/eagle.png','images/elephant.png','images/turkey.png','images/horse.png','images/tiger.png'];
     audioList = ['monkeyAudio','horseAudio','eagleAudio','elephantAudio','turkeyAudio','tigerAudio'];
    loadGame();
});

function getRandomId(){
    if(audioList.length > 0){
        indexOfList = Math.floor(Math.random() * audioList.length);
        rightAnswer = audioList[indexOfList].substring(0,audioList[indexOfList].length - 5);
        console.log(rightAnswer);
        return audioList[indexOfList]; 
    }
}
function getAudioLength(audioId){
    let audioLenght = document.getElementById(audioId).duration;
    return audioLenght * 1000;
}

function playAudioButt(){
    playAudio.addEventListener('click',function(){
        if (game === true && audioList.length > 0) {
            visualAudio.style.display = 'flex'
            idAudio = getRandomId();
            game = false;
            scoreChange = false;
            const monnn = getAudioLength(idAudio);
            document.getElementById(idAudio).volume = 0.05;
            document.getElementById(idAudio).play();
            setTimeout(() => {
                console.log('bob');
                visualAudio.style.display = 'none';
                game = true;
                scoreChange = true;
            },monnn);
        }
        if (!audioList.length > 0) {
            blurEffect();
        }
    });
}

function clickedAnimal(){
    for (let index = 0; index < animalButtons.length; index++) {
        animalButtons[index].addEventListener('click',(event)=> { 
            let s = document.getElementById(event.target.id).src;
            console.log(s);
            let fileName = s.split(/[\\\/]/).pop();
            let returnedItem = fileName.substr(0,fileName.length-4);
            if(rightAnswer === returnedItem){
                correctAnswerSound.volume = 0.05;
                correctAnswerSound.play();
                audioList.splice(indexOfList,1);
                document.getElementById(rightAnswer).parentNode.classList.add('rigt-answered-div');
                score++;
                scoreDisplay.textContent = `${score}`;
                correntScore.textContent = `You guessed an animal POINT  ${score}`;
                rightAnswer = null;
            }else if (rightAnswer != returnedItem && scoreChange === true && rightAnswer!=null){
                score--;
                wrongAswerSound.volume = 0.05;
                wrongAswerSound.play();
                document.getElementById(rightAnswer).src = 'images/Hole-PNG-Free-Download.png';
                scoreDisplay.textContent = `${score}`;
                audioList.splice(indexOfList,1);
                console.log('wrong');
                scoreChange = false;
                rightAnswer = null;
            }
        }) 
    }
}


function putAnimalImgRandomly(){
    let indeImg;
    function getRandomImg(){
        indeImg = Math.floor(Math.random() * imgList.length);
        return imgList[indeImg];
    }
    for (let index = 0; index < 6; index++) {
        document.getElementById('animal'+index).src = getRandomImg();
        let s =document.getElementById('animal'+index).src;
        let fileName = s.split(/[\\\/]/).pop();
        let newId = fileName.substr(0,fileName.length-4);
        let filename = document.getElementById('animal'+index).src
        document.getElementById('animal'+index).id = newId
        let fileExt = filename.split(/[\\\/]/).pop();
        let returnedItem = fileExt.substr(0,fileExt.length-4);
        console.log(returnedItem);
        imgList.splice(indeImg,1);
    }
}

function blurEffect(){
       setTimeout(()=>{
        animalContainer.classList.remove("blurred");
        popUp.style.display = 'none';
        },2000)
    animalContainer.classList.add("blurred");
    popUp.style.display = 'block';
    }











