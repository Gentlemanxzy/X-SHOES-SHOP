(function ($) {
 "use strict";

        //---------------------------------------------
        //Nivo slider
        //---------------------------------------------
             $('#nivoslider').nivoSlider({
                effect: 'random',
                slices: 15,
                boxCols: 8,
                boxRows: 4,
                animSpeed: 500,
                pauseTime: 5000,
                startSlide: 0,
                directionNav: true,
                controlNavThumbs: false,
                controlNav: false,		// 显示每张图片的按钮
                pauseOnHover: true,		// 鼠标停留 暂停切换
                manualAdvance: false
             });


})(jQuery);
