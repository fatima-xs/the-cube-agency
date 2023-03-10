
const activateElements = document.querySelectorAll('.activate');

activateElements.forEach(element => {
    element.addEventListener('mouseover', function () {
        document.querySelectorAll('.filter').forEach(item => item.classList.add('filtered'))
    });
    element.addEventListener('mouseleave', function () {
        document.querySelectorAll('.filter').forEach(item => item.classList.remove('filtered'))
    });
});

//Slider
const slider = document.querySelector('.slideshow-container')
let holding = false;
let firstClickX;
let alreadyLeftScrolled;
let velocity;
let rafID;

slider.addEventListener('mousedown', e =>
{
    holding = true;
    //La position du premier x
    firstClickX = e.pageX - slider.offsetLeft;
    alreadyLeftScrolled = slider.scrollLeft;
    startTransition()
})
slider.addEventListener('mousemove', e =>
{
    if(!holding) return; //Ne pas activer l'animation si je passe sur le slider sans hold
    const x = e.pageX - slider.offsetLeft;
    const scrolled = (x - firstClickX) * 2;
    const prevScrolledLeft = slider.scrollLeft;
    slider.scrollLeft = alreadyLeftScrolled - scrolled;
    velocity =  slider.scrollLeft - prevScrolledLeft;
   

})

slider.addEventListener('mouseup', ()=>
{
    holding = false;
    startTransition()
})
slider.addEventListener('mouseleave', ()=>
{
    holding = false;
})

function startTransition()
{
    stopTransition()
    rafID = requestAnimationFrame(decreasingTransition)
}
function stopTransition()
{
    cancelAnimationFrame(rafID)
}
function decreasingTransition()
{
    slider.scrollLeft += velocity;
    velocity *= 0.95;
    if(Math.abs(velocity) > 0.5)
    {
        rafID =requestAnimationFrame
        (decreasingTransition)
    }
}

//Sur mobile 

slider.addEventListener('touchstart', e => {

  holding = true;
  // pageX => la largeur entre mon click et le DOCUMENT
  firstClickX = e.targetTouches[0].pageX - slider.offsetLeft;
  alreadyLeftScrolled = slider.scrollLeft;
  stopTransition()

})

slider.addEventListener('touchend', () => {
  holder = false;
  startTransition()
})

slider.addEventListener('touchmove', e => {

  if(!holding) return;
  const x = e.targetTouches[0].pageX - slider.offsetLeft;
  const scrolled = (x - firstClickX) * 2;
  const prevScrollLeft = slider.scrollLeft;
  slider.scrollLeft = alreadyLeftScrolled - scrolled;
  velocity = slider.scrollLeft - prevScrollLeft;

})


