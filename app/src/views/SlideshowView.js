/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ViewSwapper = require('famous/views/Lightbox');
    var SlideView = require('views/SlideView');
    var Easing = require('famous/transitions/Easing');
    /*
     * @name SlideshowView
     * @constructor
     * @description
     */

    function SlideshowView() {
        View.apply(this, arguments);

        this.sizeModifier = new StateModifier({
            size: this.options.size,
            origin: [0.5, 0]
        });

        this.mainNode = this.add(this.sizeModifier);

        _createViewSwapper.call(this);
        _createSlides.call(this);
    }

    function _createViewSwapper() {
        this.viewSwapper = new ViewSwapper(this.options.viewSwapperOpts);
        this.mainNode.add(this.viewSwapper);
    }

    function _createSlides() {
        this.slides = [];
        this.currentIndex = 0;
        for (var i = 0; i < this.options.data.length; i++) {
            var slide = new SlideView({
                size: this.options.size,
                photoUrl: this.options.data[i]
            });

            this.slides.push(slide);

            //adding click listener
            //on click, calling .showNextSlide()
            console.log('heres THIS', this);
            slide.on('click', this.showNextSlide.bind(this));
        }
        this.showCurrentSlide();
    }

    SlideshowView.prototype = Object.create(View.prototype);
    SlideshowView.prototype.constructor = SlideshowView;

    SlideshowView.prototype.showCurrentSlide = function() {
        this.ready = false;
        var slide = this.slides[this.currentIndex];
        this.viewSwapper.show(slide, function() {
            this.ready = true;
            slide.fadeIn();
        }.bind(this));
    };

    SlideshowView.prototype.showNextSlide = function() {
        if (!this.ready) return;
        
        this.currentIndex++;
        console.log('this.currentIndex', this.currentIndex);
        //resets url array
        if (this.currentIndex === this.slides.length) this.currentIndex = 0;
        this.showCurrentSlide();
    };

    SlideshowView.DEFAULT_OPTIONS = {
        size: [450, 500],
        data: undefined,
        //where in/out animations happen
        viewSwapperOpts: {
            inOpacity: 1, 
            outOpacity: 0, 
            inOrigin: [0, 0],
            outOrigin: [0, 0], 
            showOrigin: [0, 0], 
            //Transform.thenMove() first applies  a transform then a
            //translation based on [x, y, z]
            inTransform: Transform.thenMove(Transform.rotateX(0.9), [0, -300, -300]), 
            outTransform: Transform.thenMove(Transform.rotateZ(0.7), [0, window.innerHeight, -1000]), 
            inTransition: { duration: 650, curve: 'easeOut' },
            outTransition: { duration: 500, curve: Easing.inCubic }
        }
    };

    module.exports = SlideshowView;
});
