const slideContainer = document.querySelector('.carousel');
const slideGroup = document.querySelector('.slides');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const playPause = document.querySelector('.pause');
let slides = document.querySelectorAll('.slide');
let index = 1; //bc 0 is clone of last slide
let intervalId; 
let playing;

// Clone first and last image
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

// Set ids for new clones
firstClone.id = 'first-clone'; 
lastClone.id = 'last-clone';

// Place clones at start and end of slide group
slideGroup.append(firstClone);
slideGroup.prepend(lastClone);

// Set slide width and distance to move
const slideWidth = slides[index].clientWidth;
slideGroup.style.transform = `translateX(${-slideWidth * index}px)`;

// Function to start moving
const startSlide = () => {
	playing = true;
	return intervalId = setInterval(() => { 
		nextSlide();
	}, 2000);
};

// Redefine slides bc length has changed
slides = document.querySelectorAll('.slide');

// When css transition ends, keep going
slideGroup.addEventListener('transitionend', () => {
	if(slides[index].id === firstClone.id) {
		slideGroup.style.transition = 'none';
		index = 1;
		slideGroup.style.transform = `translateX(${-slideWidth * index}px)`;
	}
	if(slides[index].id === lastClone.id) {
		slideGroup.style.transition = 'none';
		index = slides.length - 2;
		slideGroup.style.transform = `translateX(${-slideWidth * index}px)`;
	}
});

// Function to move to next slide
const nextSlide = () => {
	if(index >= slides.length - 1) return;
	index++;
	slideGroup.style.transform = `translateX(${-slideWidth * index}px)`;
	slideGroup.style.transition = '.8s';
}

// FUNCTION FOR MOVING TO PREVIOUS SLIDE
const prevSlide = () => {
	if(index <= 0) return;
	index--;
	slideGroup.style.transform = `translateX(${-slideWidth * index}px)`;
	slideGroup.style.transition = '.7s';
}

// WHEN CLICK THE ARROWS, MOVE TO NEXT OR PREVIOUS SLIDES
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// START AUTOMATIC SLIDESHOW 
startSlide();

// PLAY PAUSE BUTTON - slideshow start/stop
function playOrPause() {
	if(!intervalId) {
		intervalId = startSlide(); 
		playPause.src = 'img/pause.png';
		console.log('started');
	} else {
		clearInterval(intervalId);
		intervalId = null;
		playPause.src = 'img/play.png';
		console.log('stopped');
	}
}
playPause.addEventListener('click', playOrPause);

// PLAY PAUSE BUTTON - mouseover event
slideContainer.addEventListener('mouseout', () => {
	playPause.style.display = 'none';
})
slideContainer.addEventListener('mouseover', () => {
	playPause.style.display = 'block';
})

// Keyboard function
function onKeydown(e) {
	switch(e.keyCode) {
		case 37:
			prevSlide();
			break;
		case 39:
			nextSlide();
			break;
		case 32:
			e.preventDefault();
			playOrPause();
	}
}
document.addEventListener('keydown', onKeydown);
