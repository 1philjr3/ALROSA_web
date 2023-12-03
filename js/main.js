const overlapGroupWrapper = document.querySelector('.box');
const overlap4 = document.querySelector('.img-2');

overlap4.addEventListener('mouseover', function() {
    overlapGroupWrapper.style.transform = 'rotate(25.3deg)';
});

overlap4.addEventListener('mouseout', function() {
    overlapGroupWrapper.style.transform = 'none';
});


