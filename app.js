// CAROUSEL VARIABLES
const slideGroup = document.querySelector('.slides');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
let playPause = document.querySelector('.pause');
let slide = document.querySelectorAll('.slide');
let index = 0; //must not start on 0 or can't use backwards button
let intervalId;

// Clone images
const cloneOne = slide[0].cloneNode(true);
const cloneTwo = slide[1].cloneNode(true);
const cloneThree = slide[2].cloneNode(true);
const cloneFour = slide[3].cloneNode(true);
const cloneFive = slide[4].cloneNode(true);
const cloneSix = slide[5].cloneNode(true);
const cloneSeven = slide[6].cloneNode(true);

// Add clones to start and end of slide group
slideGroup.prepend(cloneFour, cloneFive, cloneSix, cloneSeven);
slideGroup.append(cloneOne, cloneTwo, cloneThree, cloneFour); 

slide = document.querySelectorAll('.slide'); 

// Set the slide width ie. amount to move
//why -slideWidth? bc moving left
const width = slide[0].clientWidth; 
// slideGroup.style.transform = `translateX(${-width * index}px)`; //this line is to set the first image we see as index 4

// Start automatic loop on page load
// no need for explicit return bc not block code in curly braces
// no need to do anon function inside setInterval bc nextSlide is in global scope
const startSlide = () => intervalId = setInterval(nextSlide, 2000); 
startSlide();
window.addEventListener('load', () => {
	console.log('worked')
})

// When click the arrows...
// Move to next slide
function nextSlide() {
	console.log('nextslide works')
	index >= slide.length - 4 ? false : index++; //return false means don't continue 
	slideGroup.style.transform = `translateX(${-width * index}px)`;//needs to be *index bc it signifies the position we are moving it to the left from the starting point. 
	slideGroup.style.transition = '1s'; 
}
// Move to previous slide
function prevSlide() {
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
	
function transitionEnd() {
	console.log('transitionend works')
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
}
slideGroup.addEventListener('transitionend', transitionEnd); //transitionend means each time it moves once. use transitionend bc used slideGroup.style.transition above

// When press play/pause button, start/stop and change icon
function playOrPause() {
	console.log('playpause works')
	if(!intervalId) {
		playPause.src = 'img/pause.png';
		return startSlide(); 
	} else {
		playPause.src = 'img/play.png';
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

