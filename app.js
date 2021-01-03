// CAROUSEL VARIABLES
// CAROUSEL VARIABLES
const slideContainer = document.querySelector('.carousel');
const slideGroup = document.querySelector('.slides');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const interval = 3250;
const playPause = document.querySelector('.pause');
let slides = document.querySelectorAll('.slide');
let index = 1; //bc 0 is clone of last slide
let intervalId; 
let playing;

// CLONE FIRST AND LAST CAROUSEL IMAGE
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

// SET IDS FOR THESE TWO CLONES
firstClone.id = 'first-clone'; 
lastClone.id = 'last-clone';

// PLACE CLONES AT START AND END OF SLIDES GROUP
slideGroup.append(firstClone);
slideGroup.prepend(lastClone);

// SET SLIDE WIDTH
const slideWidth = slides[index].clientWidth;

// SET THE DISTANCE OF THE IMAGE MOVING HORIZONTALLY
slideGroup.style.transform = `translateX(${-slideWidth * index}px)`;

// FUNCTION TO START SLIDESHOW
const startSlide = () => {
	playing = true;
	return intervalId = setInterval(() => { // WHY DO I HAVE TO RETURN IT FOR IT TO WORK? //is this example of a closure?
		moveToNextSlide();
	}, interval);
};

// GET ALL OF THE SLIDES
slides = document.querySelectorAll('.slide');

// WHEN THE CSS TRANSITION ENDS, KEEP GOING
slideGroup.addEventListener('transitionend', () => {
	// slides = getSlides();
	if (slides[index].id === firstClone.id) {
		slideGroup.style.transition = 'none';
		index = 1;
		slideGroup.style.transform = `translateX(${-slideWidth * index}px)`;
	}
	if (slides[index].id === lastClone.id) {
		slideGroup.style.transition = 'none';
		index = slides.length - 2;
		slideGroup.style.transform = `translateX(${-slideWidth * index}px)`;
	}
});

// FUNCTION FOR MOVING TO NEXT SLIDE
const moveToNextSlide = () => {
	// slides = getSlides();
	if (index >= slides.length - 1) return;
	index++;
	slideGroup.style.transform = `translateX(${-slideWidth * index}px)`;
	slideGroup.style.transition = '.8s';
}

// FUNCTION FOR MOVING TO PREVIOUS SLIDE
const moveToPrevSlide = () => {
	// slides = getSlides();
	if (index <= 0) return;
	index--;
	slideGroup.style.transform = `translateX(${-slideWidth * index}px)`;
	slideGroup.style.transition = '.7s';
}

// WHEN CLICK THE ARROWS, MOVE TO NEXT OR PREVIOUS SLIDES
nextBtn.addEventListener('click', moveToNextSlide);
prevBtn.addEventListener('click', moveToPrevSlide);

// START AUTOMATIC SLIDESHOW 
startSlide();

// PLAY PAUSE BUTTON - slideshow start/stop
playPause.addEventListener('click', () => {
	if(!intervalId) {
		intervalId = startSlide(); // WHY DO I HAVE TO SPECIFY SLIDE ID = STARTSLIDE. WHY CAN'T IT JUST BE STARTSLIDE(). 
		playPause.src = 'img/pause.png';
		console.log('started');
	} else {
		clearInterval(intervalId);
		intervalId = null;
		playPause.src = 'img/play.png';
		console.log('stopped');
	}
});

// PLAY PAUSE BUTTON - mouseover event
slideContainer.addEventListener('mouseout', () => {
	playPause.style.display = 'none';
})
slideContainer.addEventListener('mouseover', () => {
	playPause.style.display = 'block';
})

// KEYBOARD FUNCTION
document.onkeydown = function (event) {
	event = event || window.event;
	switch (event.keyCode) {
		case 37:
			leftArrowPressed();
			break;
		case 39:
			rightArrowPressed();
			break;
	}
}

function leftArrowPressed() {
	moveToPrevSlide();
}
function rightArrowPressed() {
	moveToNextSlide();
}
