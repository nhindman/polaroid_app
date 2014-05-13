/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var SlideshowView = require('views/SlideshowView');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');

    /*
     * @name AppView
     * @constructor
     * @description
     */

    function AppView() {
        View.apply(this, arguments);

        _createCamera.call(this);
        _createSlideshow.call(this);
    }

    function _createSlideshow() {
        var slideshowView = new SlideshowView({
            size: [this.options.slideWidth, this.options.slideHeight],
            data: this.options.data
        });

        var slideshowModifier = new StateModifier({
            origin: [0.5, 0], 
            transform: Transform.translate(0, this.options.slidePosition, 0)
        });

        var slideshowContainer = new ContainerSurface({
            properties: {
                overflow: 'hidden'
            }
        });

        this.add(slideshowModifier).add(slideshowContainer);
        slideshowContainer.add(slideshowView);
        slideshowContainer.context.setPerspective(1000);
    }

    function _createCamera() {
        var camera = new ImageSurface({
            size: [this.options.cameraWidth, true], 
            content: 'content/images/camera.png', 
            properties: {
                width: '100%'
            }
        });

        var cameraModifier = new StateModifier({
            origin: [0.5, 0], 
            transform: Transform.behind
        });

        this.add(cameraModifier).add(camera);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
        // it's a good idea to add a property in the default even 
        // if it's undefined
        data: undefined,
        cameraWidth: 0.6 * window.innerHeight
    };

    AppView.DEFAULT_OPTIONS.slideWidth = 0.75 * AppView.DEFAULT_OPTIONS.cameraWidth;
    AppView.DEFAULT_OPTIONS.slideHeight = AppView.DEFAULT_OPTIONS.slideWidth + 40;
    AppView.DEFAULT_OPTIONS.slidePosition = 0.67 * AppView.DEFAULT_OPTIONS.cameraWidth;

    module.exports = AppView;
});
