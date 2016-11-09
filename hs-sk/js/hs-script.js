$(function(){
    prevent_a();
    // main_slide();

// 키보드로 접근 시 '본문 바로가기' 실행
    $('.skip-menu a').on('focus', function(){
        $(this).stop().animate({"top":0, "opacity":1});
    });
    $('.skip-menu a').on('click', function(){
        $(this).stop().animate({"top":"-30px", "opacity":0});
    });
    $('.skip-menu a').on('focusout', function(){
        $(this).stop().animate({"top":"-30px", "opacity":0});
    });

// 모바일에서 메뉴(gnb) 왼쪽에서 나오게하기
    var $gnb = $('.gnb');

    $('header a.menu').on('click', function(){
        $('header').prepend("<div id='menu-cover'></div>");
        $('body').addClass('no-scroll');
        $gnb.stop().animate({
            'right': '0px',
            'opacity': 1
        },400,'easeOutQuart');
        return false;
    });
    $('header p.menu-close').on('click', function(){
        $('#menu-cover').remove();
        $('body').removeClass('no-scroll');
        $gnb.stop().animate({
            'right': '-80%',
            'opacity': 0
        },300,'easeOutQuart',function(){
            $gnb.css("opacity","1");
        });
        return false;
    });

// 데스크톱, 태블릿 submenu 나오게하기
    var $subMenu = $('.gnb .sub-menu');
    var num = 0;

    $subMenu.hide();
    $('.sub-bg').hide();

    $('header .gnb > ul > li> a').on('touchstart mouseenter focus', function(e){
        if($(window).width()>640){
            e.stopPropagation();
            $subMenu.stop().slideDown();
            $('.sub-bg').stop().slideDown();
            return false;
        }
    });
    $('.header-bottom').on('mouseleave', function(e){
        if($(window).width()>640){
            e.stopPropagation();
            $subMenu.stop().slideUp();
            $('.sub-bg').stop().slideUp();
            return false;
        }
    });
    $('.gnb .sub-menu.sm03 li:last-child').on('focusout', function(e){
        if($(window).width()>640){
            e.stopPropagation();
            $subMenu.stop().slideUp();
            $('.sub-bg').stop().slideUp();
            return false;
        }
    });

// 모바일 submenu 나오게하기
    $('header .gnb > ul > li> a').on('click', function(e){
        if($(window).width()<641){
            e.stopPropagation();
            $subMenu.stop().slideUp('fast');
            $(this).next().stop().slideToggle();
        }
    });

// 태블릿, 데스크톱에서 브라우저 사이즈 변경 시 서브메뉴 안보이게 함(오류방지) 
    $(window).resize(function(){
        if($(window).width()>640){
            $subMenu.hide();
            $('header').css({'position': 'fixed'});
            $('header .gnb').css({'height': '30px'});
        }
    });

// 모바일에서 메뉴 스크롤 되도록 포지션 속성을 바꿔줌 
    $('header .menu').on('click', function(e){
        $(document).scrollTop('0');
        $('header').css({'position': 'static'});
    });
    $('header .menu-close').on('click', function(e){
        $('header').css({'position': 'fixed'});
    });

// main-visual 슬라이드 
    var num_visual = $('body.main .main-visual-slider li').length; //슬라이드되는 갯수
    var visual_now = 1;
    var visual_next = 2; 
    var visual_interval = setInterval(function(){
        show_visual(visual_next);
    }, 5000);

    function show_visual(n){
        $('body.main .main-visual-slider li:eq('+(visual_now-1)+')') //처음 슬라이드
            .stop().animate({'opacity':0,'left':'-50%'}, 1000, function(){
            $(this).css({'display':'none','left':'50%'});
        });
        $('body.main .main-visual-slider li:eq('+(n-1)+')').css({'display':'block', 'opacity':0,'left':'50%'})
            .stop().animate({'opacity':1,'left':0},1000, function(){
            $(this).css({});
        });

        $('body.main .indicator li').removeClass('on');
        $('body.main .indicator li:eq('+(n-1)+')').addClass('on');
        visual_now = n; 
        if(n+1>num_visual){
            visual_next = 1;
        }else{
            visual_next = n+1;
        }
    }

    var indiPlay = 0; // 정지버튼 눌러졌나 테스트
    $('body.main ul.indicator li:not(.play) a').on('click', function(){
        var index = $('body.main ul.indicator li').index($(this).parent());
        show_visual(index+1);
        if(indiPlay == 0){
            $('body.main .indicator li.play').addClass('on');
        }else{
            $('body.main .indicator li.play').removeClass('on');
        }
    });

    $('body.main .indicator li.play a').on('click', function(e){ // 정지하기 재생하기 버튼
        if( $(this).hasClass('on') ) {
            visual_interval = setInterval(function(){show_visual(visual_next);},5000);
            $('body.main .indicator li.play').removeClass('on');
            indiPlay = 1;
        } else {
            clearInterval(visual_interval);
            $('body.main .indicator li.play').addClass('on');
            indiPlay = 0;
        }
        $(this).toggleClass('on');
    });


});


// UI 버튼 튐 방지
function prevent_a() {
    $(document).on('click', 'a[href="#"]', function(e){
        e.preventDefault();
    });
}