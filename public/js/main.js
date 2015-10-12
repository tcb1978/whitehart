$(function(){
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    });

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
});