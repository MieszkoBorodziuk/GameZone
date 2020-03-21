class Slider {
    constructor(elemSelector, sliderElem) {
        this.currentSlide = 0;
        this.sliderSelector = elemSelector;
        this.elem = null;
        this.slider = null;
        this.slides = null;
        this.prev = null;
        this.next = null;


        this.generateSlider();
        this.changeSlide(this.currentSlide);
    }


    generateSlider() {

        this.slider = document.querySelector(this.sliderSelector);
        this.slider.classList.add("slider");


        const slidesCnt = document.createElement("div");
        slidesCnt.classList.add("sliderContainer");

        this.slides = this.slider.children;

        while (this.slides.length) {
            this.slides[0].classList.add("SliderSlide");
            slidesCnt.appendChild(this.slides[0]);

        }

        this.slides = slidesCnt.querySelectorAll(".SliderSlide");
        this.slider.appendChild(slidesCnt);

        this.createPrevNext();
    }

    createPrevNext() {
        this.prev = document.createElement("button");
        this.prev.type = "button";
        this.prev.classList.add("sliderNav__BtnPrev");
        this.prev.addEventListener("click", () => this.slidePrev());

        this.next = document.createElement("button");
        this.next.type = "button";
        this.next.classList.add("sliderNav__BtnNext");
        this.next.addEventListener("click", () => this.slideNext());

        const nav = document.createElement("div");
        nav.classList.add("sliderNav");
        nav.appendChild(this.prev);
        nav.appendChild(this.next);
        this.slider.appendChild(nav);
    }

    slidePrev() {
        this.currentSlide--;
        if (this.currentSlide < 0) {
            this.currentSlide = this.slides.length - 1;
        }
        this.changeSlide(this.currentSlide);
    }

    slideNext() {
        this.currentSlide++;
        if (this.currentSlide >= this.slides.length) {
            this.currentSlide = 0;
        }
        this.changeSlide(this.currentSlide);
    }

    changeSlide(index) {

        this.slides.forEach(slide => {
            slide.classList.remove("SliderSlide--active");
            slide.setAttribute("aria-hidden", true);
        });


        this.slides[index].classList.add("SliderSlide--active");
        this.slides[index].setAttribute("aria-hidden", false);

        this.currentSlide = index;
    }


}
