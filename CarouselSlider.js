import {Slide} from "./Slide.js";

export class Slider {
    constructor(elemSelector) {
        this.currentSlide = 0;
        this.sliderSelector = elemSelector;
        this.slider = null;
        this.slides = null;
        this.prev = null;
        this.next = null;

        this.generateSlider();
        this.changeSlide(this.currentSlide);
    }

    createHTMLElement(type, className) {
        const elem = document.createElement(type);
        elem.classList.add(className);
        return elem;
    }

    generateSlide(slide) {
        const bg = this.createHTMLElement('div', "SliderSlide");
        bg.style.backgroundImage = "url(" + slide.bgImage + ")";
        const logo = this.createHTMLElement('img', "SliderLogo");
        logo.src = slide.logoImage;
        const title = this.createHTMLElement('h2', "SliderTitle");
        title.textContent = slide.title;

        bg.appendChild(logo);
        bg.appendChild(title);

        return bg;

    }

    generateSlider() {
        const tab = [new Slide("img/Widok1.jpg", "img/logo.png", "Super partia kurwo!!!"),
            new Slide("img/Widok2.jpg", "img/logo.png", "Super partia kurwo!!!"),
            new Slide("img/Widok3.jpg", "img/logo.png", "Super partia kurwo!!!"),
            new Slide("img/Widok4.jfif", "img/logo.png", "Super partia kurwo!!!"),
            new Slide("img/Widok5.jpg", "img/logo.png", "Super partia kurwo!!!")];


        this.slider = document.querySelector(this.sliderSelector);
        this.slider.classList.add("slider");


        const slidesCnt = document.createElement("div");
        slidesCnt.classList.add("sliderContainer");


        tab.forEach(e => {
            const slide = this.generateSlide(e);
            slidesCnt.appendChild(slide);
        });


        this.slider.appendChild(slidesCnt);
        this.slides = slidesCnt.querySelectorAll(".SliderSlide");
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
