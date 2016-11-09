$(document).ready(function(){
    
    prevent_a();
    go_main();
    sub_menu();
    rotate_green();
    rotate_blue();
    main_slide();
    main_slide02();
    lnb_menulist();
    report_tab();

});

// UI 버튼 튐 방지
function prevent_a() {
    $(document).on('click', 'a[href="#"]', function(e){
        e.preventDefault();
    });
}


// 키보드로 접근 시 '본문 바로가기' 실행
function go_main(){
    $('#skip-menu a').on('focus', function(){
        $(this).stop().animate({"top":0, "opacity":1});
    });
    $('#skip-menu a').on('click', function(){
        $(this).stop().animate({"top":"-30px", "opacity":0});
    });
    $('#skip-menu a').on('focusout', function(){
        $(this).stop().animate({"top":"-30px", "opacity":0});
    });
}

// submenu 나오게하기
function sub_menu(){
    var $subMenu = $('.s_menu .sub_menu');
    var num = 0;

    $subMenu.hide();
    $('.menu_bg').hide();

    $('.s_menu > ul > li > a').on('touchstart mouseenter focus', function(e){
        e.stopPropagation();
        $subMenu.stop().slideDown();
        $('.menu_bg').stop().slideDown();
        return false;
    });
    $('.header_bottom').on('mouseleave', function(e){
        e.stopPropagation();
        $subMenu.stop().slideUp();
        $('.menu_bg').stop().slideUp();
        return false;
    });
    $('li.m07 .sub_menu li:last-child').on('focusout', function(e){
        e.stopPropagation();
        $subMenu.stop().slideUp();
        $('.menu_bg').stop().slideUp();
        return false;
    });
}

// .main_con.green 움직이기
function rotate_green(){
    var isAnimate = false;
    var upClick = false;
    var downClick = false;
    
    $('.main_con.green ul.list a').on('mouseenter',function(){
        clearInterval(timerUp);
    });
    $('.main_con.green ul.list a').on('mouseleave',function(){
        timerUp = setInterval(rotateUp, 3000);
    });
    $('.main_con.green a.up').on('click', function(){
        clearInterval(timerUp);
        upClick = true;
        if(isAnimate){
            return
        }else{
            rotateUp();
            isAnimate = true;
        }
        return false;
    });
    $('.main_con.green a.down').on('click', function(){
        clearInterval(timerUp);
        downClick = true;
        if(isAnimate){
            return
        }else{
            rotateDown();
            isAnimate = true;
        }
        return false;
    });
    $('.main_con.green a.up').on('mouseleave', function(){
        if(upClick){
            timerUp = setInterval(rotateUp, 3000);
            upClick = false;
        }
        return false;
    });
    $('.main_con.green a.down').on('mouseleave', function(){
        if(downClick){
            timerUp = setInterval(rotateUp, 3000);
            downClick = false;
        }
        return false;
    });

    var timerUp = setInterval(rotateUp, 3000);

    function rotateUp(){
        $(".main_con.green ul.list").animate({top:-22},500,'easeOutQuart',function(){
            $(this).append($(".main_con.green ul.list li:first-child")); 
            $(this).css("top",0);
            isAnimate = false;
        });
    }
    function rotateDown(){
        $(".main_con.green ul.list").prepend($(".main_con.green ul.list li:last-child")); 
        $(".main_con.green ul.list").css("top",-22);
        $(".main_con.green ul.list").animate({top:0},500,function(){
            isAnimate = false;
        });
    }
}

// .main_con.blue 움직이기
function rotate_blue(){
    var isAnimate = false;
    var upClick = false;
    var downClick = false;
    
    $('.main_con.blue ul.list a').on('mouseenter',function(){
        clearInterval(timerUp);
    });
    $('.main_con.blue ul.list a').on('mouseleave',function(){
        timerUp = setInterval(rotateUp, 3000);
    });
    $('.main_con.blue a.up').on('click', function(){
        clearInterval(timerUp);
        upClick = true;
        if(isAnimate){
            return
        }else{
            rotateUp();
            isAnimate = true;
        }
        return false;
    });
    $('.main_con.blue a.down').on('click', function(){
        clearInterval(timerUp);
        downClick = true;
        if(isAnimate){
            return
        }else{
            rotateDown();
            isAnimate = true;
        }
        return false;
    });
    $('.main_con.blue a.up').on('mouseleave', function(){
        if(upClick){
            timerUp = setInterval(rotateUp, 3000);
            upClick = false;
        }
        return false;
    });
    $('.main_con.blue a.down').on('mouseleave', function(){
        if(downClick){
            timerUp = setInterval(rotateUp, 3000);
            downClick = false;
        }
        return false;
    });

    var timerUp = setInterval(rotateUp, 3000);

    function rotateUp(){
        $(".main_con.blue ul.list").animate({top:-22},500,'easeOutQuart',function(){
            $(this).append($(".main_con.blue ul.list li:first-child")); 
            $(this).css("top",0);
            isAnimate = false;
        });
    }
    function rotateDown(){
        $(".main_con.blue ul.list").prepend($(".main_con.blue ul.list li:last-child")); 
        $(".main_con.blue ul.list").css("top",-22);
        $(".main_con.blue ul.list").animate({top:0},500,function(){
            isAnimate = false;
        });
    }
}

// .main_slide 슬라이드 
function main_slide(){
    var num_slide = $('.main_slide ul.con > li').length; //슬라이드되는 갯수
    var slide_now = 1;
    var slide_next = 2; 
    var slide_interval = setInterval(function(){
        show_slide(slide_next);
    }, 4000);
    var isAnimate = false;  
    var rightClick = false; 
    var leftClick = false;

    function show_slide(n){
        $('.main_slide ul.con > li:eq('+(slide_now-1)+')') //처음 슬라이드
            .stop().animate({'left':'-110%'}, 1000, 'easeOutQuart', function(){
            $(this).css({'display':'none','left':'110%'});
        });
        $('.main_slide ul.con > li:eq('+(n-1)+')').css({'display':'block', 'left':'110%'})
            .stop().animate({'left':0},1000, 'easeOutQuart', function(){
            $(this).css({});
        });

        slide_now = n; 

        if(n+1>num_slide){
            slide_next = 1;
        }else{
            slide_next = n+1;
        }
    }

    function show_slideleft(n){
        $('.main_slide ul.con > li:eq('+(slide_now-1)+')') //처음 슬라이드
            .stop().animate({'left': '110%'}, 1000, 'easeOutQuart', function(){
            $(this).css({'display':'none','left':'110%'});
        });
        $('.main_slide ul.con > li:eq('+(n-1)+')').css({'display':'block', 'left':'-110%'})
            .stop().animate({'left':0},1000, 'easeOutQuart', function(){
            $(this).css({});
        });

        slide_now = n; 

        if(n+1>num_slide){
            slide_next = 1;
        }else{
            slide_next = n+1;
        }
    }

    $('.main_slide ul.con > li a').on('mouseenter',function(){
        clearInterval(slide_interval);
    });
    $('.main_slide ul.con > li a').on('mouseleave',function(){
        slide_interval = setInterval(function(){
            show_slide(slide_next);
        }, 4000);
    });

    $('.main_slide .nav_s a.right').on('click', function(){
        clearInterval(slide_interval);
        show_slide(slide_next);
        rightClick = true;
    });
    $('.main_slide .nav_s a.left').on('click', function(){
        clearInterval(slide_interval);
        show_slideleft(slide_next);
        leftClick = true;
    });
    $('.main_slide .nav_s a.right').on('mouseleave', function(){
        if(rightClick){
            slide_interval = setInterval(function(){
                show_slide(slide_next);
            }, 4000);
            rightClick = false;
        }
        return false;
    });
    $('.main_slide .nav_s a.left').on('mouseleave', function(){
        if(leftClick){
            slide_interval = setInterval(function(){
                show_slide(slide_next);
            }, 4000);
            leftClick = false;
        }
        return false;
    });

}

// .main_slide02 슬라이드 
function main_slide02(){
    var num_slide = $('.main_slide02 ul.con > li').length; //슬라이드되는 갯수
    var slide_now = 1;
    var slide_next = 2; 
    var slide_interval = setInterval(function(){
        show_slide(slide_next);
    }, 4000);
    var isAnimate = false;  
    var rightClick = false; 
    var leftClick = false;

    function show_slide(n){
        $('.main_slide02 ul.con > li:eq('+(slide_now-1)+')') //처음 슬라이드
            .stop().animate({'left':'-110%'}, 1000, 'easeOutQuart', function(){
            $(this).css({'display':'none','left':'110%'});
        });
        $('.main_slide02 ul.con > li:eq('+(n-1)+')').css({'display':'block', 'left':'110%'})
            .stop().animate({'left':0},1000, 'easeOutQuart', function(){
            $(this).css({});
        });

        slide_now = n; 

        if(n+1>num_slide){
            slide_next = 1;
        }else{
            slide_next = n+1;
        }
    }

    function show_slideleft(n){
        $('.main_slide02 ul.con > li:eq('+(slide_now-1)+')') //처음 슬라이드
            .stop().animate({'left': '110%'}, 1000, 'easeOutQuart', function(){
            $(this).css({'display':'none','left':'110%'});
        });
        $('.main_slide02 ul.con > li:eq('+(n-1)+')').css({'display':'block', 'left':'-110%'})
            .stop().animate({'left':0},1000, 'easeOutQuart', function(){
            $(this).css({});
        });

        slide_now = n; 

        if(n+1>num_slide){
            slide_next = 1;
        }else{
            slide_next = n+1;
        }
    }

    $('.main_slide02 ul.con > li a').on('mouseenter',function(){
        clearInterval(slide_interval);
    });
    $('.main_slide02 ul.con > li a').on('mouseleave',function(){
        slide_interval = setInterval(function(){
            show_slide(slide_next);
        }, 4000);
    });

    $('.main_slide02 .nav_s a.right').on('click', function(){
        clearInterval(slide_interval);
        show_slide(slide_next);
        rightClick = true;
    });
    $('.main_slide02 .nav_s a.left').on('click', function(){
        clearInterval(slide_interval);
        show_slideleft(slide_next);
        leftClick = true;
    });
    $('.main_slide02 .nav_s a.right').on('mouseleave', function(){
        if(rightClick){
            slide_interval = setInterval(function(){
                show_slide(slide_next);
            }, 4000);
            rightClick = false;
        }
        return false;
    });
    $('.main_slide02 .nav_s a.left').on('mouseleave', function(){
        if(leftClick){
            slide_interval = setInterval(function(){
                show_slide(slide_next);
            }, 4000);
            leftClick = false;
        }
        return false;
    });

}

// sub page에서 #lnb 의 .menulist나오게 하기 
function lnb_menulist(){
    $('#lnb .menulist').hide();
    $('#lnb > li > a.on').on('touchstart mouseenter focus', function(e){
        e.stopPropagation();
        $('#lnb .menulist').stop().slideDown();
        return false;
    });
    $('#lnb > li.on').on('mouseleave', function(e){
        e.stopPropagation();
        $('#lnb .menulist').stop().slideUp();
        return false;
    });
    $('#lnb .menulist li:last-child').on('focusout', function(e){
        e.stopPropagation();
        $('#lnb .menulist').stop().slideUp();
        return false;
    });
}

// subpage report_tab 주제별, 메뉴별 나오게하기
function report_tab(){
    $('body.sub aside .report_tab02').css('display','none');

    $('body.sub aside .divide a.divide01').on('click', function(e){
        e.stopPropagation();
        $('body.sub aside .divide li:first-child').addClass('on');
        $('body.sub aside .divide li:last-child').removeClass('on');
        $('body.sub aside .report_tab02').css('display','none');
        $('body.sub aside .report_tab01').css('display','block');
        return false;
    });
    $('body.sub aside .divide a.divide02').on('click', function(e){
        e.stopPropagation();
        $('body.sub aside .divide li:first-child').removeClass('on');;
        $('body.sub aside .divide li:last-child').addClass('on');
        $('body.sub aside .report_tab01').css('display','none');
        $('body.sub aside .report_tab02').css('display','block');
        return false;
    });
    
}