const overlapGroupWrapper = document.querySelector('.header-img');
const overlap4 = document.querySelector('.overlap_catalog');

overlap4.addEventListener('mouseover', function() {
    overlapGroupWrapper.style.transform = 'rotate(21.3deg)';
});

overlap4.addEventListener('mouseout', function() {
    overlapGroupWrapper.style.transform = 'none';
});

