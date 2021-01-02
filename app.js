// CAROUSEL VARIABLES
const carousel = document.querySelector('.carousel');
const slideGroup = document.querySelector('.slides');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
let playPause = document.querySelector('.pause');
let slide = document.querySelectorAll('.slide');
let index = 4; //must not start on 0 or can't use backwards button
// let playing = true; 
let intervalId;

//--------------------------------------------
// Clone images
const cloneZero = slide[0].cloneNode(true);
const cloneOne = slide[1].cloneNode(true);
const cloneTwo = slide[2].cloneNode(true);
const cloneThree = slide[3].cloneNode(true);
const cloneFour = slide[4].cloneNode(true);
const cloneFive = slide[5].cloneNode(true);
const cloneSix = slide[6].cloneNode(true);

// Add clones to start and end of slide group
slideGroup.prepend(cloneThree, cloneFour, cloneFive, cloneSix);
slideGroup.append(cloneZero, cloneOne, cloneTwo, cloneThree, cloneFour);

// Set the slide width ie. amount to move
//why -slideWidth? bc moving left
const width = slide[index].clientWidth; 
slideGroup.style.transform = `translateX(${-width * index}px)`; //this line is to set the first image we see as index 1

// Start automatic loop on page load
// no need for explicit return bc not block code in curly braces
// no need to do anon function inside setInterval bc nextSlide is in global scope
const startSlide = () => intervalId = setInterval(nextSlide, 2000); 
startSlide();

// When click the arrows...
// Move to next slide
function nextSlide() {
	slide = document.querySelectorAll('.slide');
	index >= slide.length - 4 ? false : index++; //return false means don't continue 
	slideGroup.style.transform = `translateX(${-width * index}px)`;//needs to be *index bc it signifies the position we are moving it to the left from the starting point. 
	slideGroup.style.transition = '1s'; 
}
// Move to previous slide
function prevSlide() {
	slide = document.querySelectorAll('.slide');
    index <= 0 ? false : index--; //false is to stop it from going off the carousel
	slideGroup.style.transform = `translateX(${-width * index}px)`;
	slideGroup.style.transition = '1s';
}
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

//However it will stop at the last slide, so...
//When loop ends, keep going
//Set ids for the clones to differentiate from the others, or loop doesnt work
cloneOne.id = 'clone1';
cloneFive.id = 'clone5';

slideGroup.addEventListener('transitionend', () => { //transitionend means each time it moves once. use transitionend bc used slideGroup.style.transition above
	slide = document.querySelectorAll('.slide'); //has to be defined again inside function, bc in global scope has only 7 slides. Bc prepend and append happened AFTER the first time 'slide' was assigned. 
	if(slide[index].id === 'clone1') {
		slideGroup.style.transition = 'ease-in';
        index = 3;
		slideGroup.style.transform = `translateX(${-width * index}px)`; 
	}
	if(slide[index].id === 'clone5') { //for when we click backwards and lands on lastClone.id
		slideGroup.style.transition = 'none';
         index = 7;
	 	slideGroup.style.transform = `translateX(${-width * index}px)`;
	}
});

// When press play/pause button, start/stop and change icon
function playOrPause() {
	if(!intervalId) {
		playPause.src = 'img/pause_.png';
		return startSlide(); 
	} else {
		playPause.src = 'img/play_.png';
		clearInterval(intervalId);
		intervalId = null;
	}
}
playPause.addEventListener('click', playOrPause)

// Play/pause button mouseover event
playPause.addEventListener('mouseout', () => playPause.style.opacity = '0');
playPause.addEventListener('mouseover', () => playPause.style.opacity = '1');

// Keyboard function
function onKeydown(e) {
	switch(e.key) {
		case 'ArrowLeft':
			prevSlide();
			break;
		case 'ArrowRight':
			nextSlide();
			break;
		case 32:
			e.preventDefault();
			playOrPause();
	}
}
document.addEventListener('keydown', onKeydown);


/* 
Things to clarify:

1. transitions put here bc in css doesn't work - why? could do it css way but would need to move most of it to css then, like having keyframe etc
2. lines 65 + 70 slideGroup.style.transform - if don't have this, slides scroll back to index 2? dont understand why. 
3. Why exactly do we need 'intervalId = null' line
4. why use const and let in different places
5. check which one is better, return startSlide or intervalId = startSlide()
6. understand why play pause button works with input but not button. 

Things to change:

1. Make the className into toggle method for the button image change


To add if have time: 

1. Make playpause button fade in and out more subtly
*/