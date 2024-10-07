jQuery(document).ready(function ($) {
    gsap.registerPlugin(ScrollTrigger);
    let sections = gsap.utils.toArray(".networks-card");
    if(sections.length > 0) {
        gsap.to(sections, {
            xPercent: -120 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".networks",
                pin: true,
                start: "top 20%",
                scrub: 1,
                pinSpacing: true,
                // markers: {startColor: "blue", endColor: "blue", fontSize: "12px"}, // add this, it work, but delete it, it doesn't work
                snap: 1,
                end: () => "+=" + document.querySelector(".networks-right-block").offsetWidth
            }
        });
    }


    const tl = gsap.timeline( {

        scrollTrigger: {
            trigger: ".networks",
            ease: "power1",
            start: "top 20%",
            end: () => "+=300 40%",
            scrub: true,
            toggleActions: "play reverse play reverse",
        }

    });

    tl
        .to('.left-block-fade', { opacity: 1, duration: 0.2 })
        .to('.left-block-fade', { opacity: 0, duration: 0.2 }, 0.5)


    const boxes = gsap.utils.toArray('.block-up');
    if (boxes.length > 0) {
        boxes.forEach(box => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: box,
                    toggleClass: "animate",
                    once: true,

                }
            })
                .from(box, {
                    yPercent: 80,
                    duration: 1,
                });
        });
    }


    $('.hero-link').click(function () {
        $('html, body').animate({
            scrollTop: $("#networks").offset().top
        });

    })

    $('.hero-link-mobile').click(function () {
        $('html, body').animate({
            scrollTop: $("#networks-mobile").offset().top
        });

    })


    $('a').on('click', function (e) {
        let target = this.hash;
        let $target = $(target);

        if($('body').hasClass('page-template-networks') || $('body').hasClass('single-networks')) {
            if (target) {
                e.preventDefault();
                console.log($target)
                window.location.href="/";
            }
        }

        if($target.length) {
            e.preventDefault();
            $('.header-navigation').toggleClass('menu-open');
            $('body').toggleClass('overflow');
            $('.burger-menu').toggleClass('menu-open');
            $('html, body').animate({
                'scrollTop': $target.offset().top
            }, 900, 'swing', function () {
                window.location.hash = target;
            });
        }

    });




    $('.burger-menu').click(function(){
        $(this).toggleClass('menu-open');
        $('.header-navigation').toggleClass('menu-open');
        $('body').toggleClass('overflow');
    })

    $(window).on('resize', function () {
        if ($(window).width() >= 1024) {
            if ($('.burger-menu').hasClass('menu-open')) {
                $('.burger-menu').toggleClass('menu-open');
                $('.burger-menu').fadeToggle();
                $('.header-navigation').toggleClass('menu-open');
                $('body').css('overflow-y', 'auto');
            }
        }
    });

    const firstSlider = new Swiper('.slider-wrapper-top',{
        slidesPerView: 'auto',
        loop: true,
        speed: 4000,
        spaceBetween: 20,
        allowTouchMove: false,
        autoplay: {
            delay: false,
            disableOnInteraction: false
        },
    });

    const secondSlider = new Swiper('.slider-wrapper-bottom',{
        slidesPerView: 'auto',
        loop: true,
        speed: 4000,
        allowTouchMove: false,
        spaceBetween: 20,
        autoplay: {
            delay: false,
            disableOnInteraction: false,
        },
    });



    let titlesNetwork = [];
    $('.network-title').each(function(){
        titlesNetwork.push($(this).text());
    })


    if(titlesNetwork.length > 0) {
        const autoCompleteJS = new autoComplete({
            placeHolder: "Search",
            data: {
                src: titlesNetwork,
                cache: true,
            },
            resultItem: {
                highlight: true
            },
            events: {
                input: {
                    selection: (event) => {
                        const selection = event.detail.selection.value;
                        autoCompleteJS.input.value = selection;
                    }
                }
            }
        });
    }



    $('#autoComplete').on('keyup click keypress blur change input', function(){
        let val = $(this).val();
        $('.network-title').each(function(){
            if(!$(this).text().toLowerCase().includes(val.toLowerCase())) {
                $(this).parent().addClass('hidden');
            }else if (val == '') {
                $(this).parent().removeClass('hidden');
            } else {
                $(this).parent().removeClass('hidden');
            }
        })

    })




    $('.copy-image-wrapp').click(function (){
        copyToClipboard($(this).prev())
        
         $(this).next('.copy-popup').fadeIn();

        setTimeout(()=> {
            $(this).next('.copy-popup').fadeOut();
        },1000)
    })

    function copyToClipboard(element) {
        let $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
    }

    if ($(window).width() > 1024) {
        $('.steps-wrapper .step').click(function () {
            const id = $(this).data('id');

            $(id).addClass('active');
            $(id).siblings().removeClass('active');

            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            console.log($(this).offset().top -20)
            $('html, body').animate({
                scrollTop: $(this).offset().top - 20
            });
        })
    }


    $(window).on('resize', function () {
        if ($(window).width() >= 1024) {
            if ($('.mobile-menu_btn').hasClass('active')) {
                $('.mobile-menu_btn').toggleClass('active');
                $('.mobile-menu').fadeToggle();
                $('.header').toggleClass('menu-opened');
                $('html').css('overflow-y', 'auto');
            }
        }
    });
    
        $(window).scroll(function() {
        let section = $(".three-cards").offset();
        let position = $(".to-top").offset();

        if (section.top >= position.top) {
            $('.to-top').addClass('hidden_btn');
        } else {
            $('.to-top').removeClass('hidden_btn');
        }
    });


   $('.to-top').click(function (){
        window.scrollTo({ top: 0, behavior: 'smooth' });
    })

})
