$(function(){

    if(isMobile()){
        initMobileUI();
    }else{
        initDesktopUI();
    }

    function initMobileUI(){
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
        $('body').addClass('mobile');
        $('#mobileContactForm').find('form').on('submit', onMobileFormSubmit);

        function onMobileFormSubmit(e){
            e.preventDefault();
            $.post('/contact', {
                email : $('#mobileContactFormEmail').val(),
                name : $('#mobileContactFormName').val(),
                message : $("#mobileContactFormMessage").val(),
                number : $("#mobileContactFormMessage").val()
            }).success(function(){
                alert('success!!!')
            }).error(function(){
                alert('error');
            });
        }
    }


    function initDesktopUI(){

        var timer = setTimeout(function(){
            $('#logo_slide').fadeOut('slow');
        }, 1000);

        function onDesktopFormSubmit(e){
            e.preventDefault();
            $.post('/contact', {
                email : $('#mobileContactFormEmail').val(),
                name : $('#mobileContactFormName').val(),
                message : $("#mobileContactFormMessage").val(),
                number : $("#mobileContactFormMessage").val()
            }).success(function(){
                alert('success!!!')
            }).error(function(){
                alert('error');
            });
        }
    }


    function isMobile(){
        var pattern = /(Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune)/i,
          ua = navigator.userAgent;
        return pattern.test(ua);
    }
});