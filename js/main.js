/*Theme Name: Ayan One Page Creative HTML5 Template
  Author: Murtaxa
  Version: 1.0
*/

$(function(){
    /*  Menu item highlighting */
    "use strict"; 
    // Preloader
    $('#preloader').css('display', 'none');
    jQuery(window).scroll(function () {
        if (jQuery(window).scrollTop() > 100) {
            jQuery("#navigation").css("background-color","#3f51b5");
            jQuery("#navigation").addClass("animated-nav");
        } else {
            jQuery("#navigation").css("background-color","transparent");
            jQuery("#navigation").removeClass("animated-nav");
        }
    });

    $("#nav").onePageNav({
        filter: ":not(.external)",
        scrollSpeed: 950,
        scrollThreshold: 1
    });

    // Slider Height
    var slideHeight = $(window).height();
    $("#home-carousel .carousel-inner .item, #home-carousel .video-container").css("height",slideHeight);

    $(window).resize(function(){"use strict";
        $("#home-carousel .carousel-inner .item, #home-carousel .video-container").css("height",slideHeight);
    });

    // portfolio filtering
    $("#projects").mixItUp();
    //fancybox

    $(".fancybox").fancybox({
        padding: 0,

        openEffect : "elastic",
        openSpeed  : 650,

        closeEffect : "elastic",
        closeSpeed  : 550,
    });

    /* Facts count */
    $(".fact-item").appear(function () {
        $(".fact-item [data-to]").each(function () {
            var e = $(this).attr("data-to");
            $(this).delay(6e3).countTo({
                from: 50,
                to: e,
                speed: 3e3,
                refreshInterval: 50
            })
        })
    });

    // blog-carousel
    $("#blog #blog-carousel").owlCarousel({
         loop: true,
         margin: 30,
         autoplay: true,
         nav: false,
         dots: false,
         responsive: {
             0: {
                 items: 1
             },
             300: {
                 items: 1
             },
             600: {
                 items: 2
             },
             900: {
                 items: 3
             },
             1200: {
                 items: 3
             }
         }
     });
    //Smooth scroll 
    $(function() {
        $('a[href*="#"]:not([data-slide])').on('click', function() {
            if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
                if (target.length) {
                    $("html, body").animate({
                        scrollTop: target.offset().top
                    }, 600);
                    return false;
                }
            }
        });
    });
});

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var config = {
    databaseURL: "https://reachya-d82fd.firebaseio.com"
};
otherApp = firebase.initializeApp(config, "website" + Math.random().toString());

function sendMessage(){
    var name = $("#name").val();
    var email = $("#email").val();
    var msg = $("#message").val();
    var d = new Date();
    var day = d.getDate();
    var month = monthNames[d.getMonth()];

    var data = {
        day: day,
        month: month,
        isNew: true,
        name: name,
        email: email,
        txt: msg
    };

    otherApp.database().ref('messages').push(data).then(function(){
        $("#name").val("");
        $("#email").val("");
        $("#message").val("");
        document.getElementById("success").innerHTML = "<div class=\"alert alert-success fade in\">\
                                        <a href=\"#\" class=\"close\" style=\"margin-top:-5px\" data-dismiss=\"alert\">&times;</a>\
                                        <strong>Success!</strong> Your message has been sent successfully.\
                                    </div>";
    });
}