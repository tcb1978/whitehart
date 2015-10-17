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

    }

    function initDesktopUI(){
        $('body').addClass('desktop');
        var swiper = new Swiper('.swiper-container', {
            //pagination: '.swiper-pagination',
            speed : 1000,
            paginationClickable: true,
            direction : 'vertical',
            effect : 'coverflow',
            keyboardControl : true
        });

        var timer = setTimeout(function(){
            swiper.slideNext(null, 1000);
        }, 2000);

        $('#contactUsButton').on('click', function(e){
            e.preventDefault();
            swiper.slideNext(null, 1000);
        });
    }

    $('#desktopSubmitButton').on('click', onDesktopFormSubmit);
    $('#mobileSubmitButton').on('click', onMobileFormSubmit);

    function onMobileFormSubmit(e){
        e.preventDefault();
        if(!formIsValid('mobileContactForm')){
            return;
        }
        $.post('/contact', {
            email : $('#mobileContactFormEmail').val(),
            name : $('#mobileContactFormName').val(),
            message : $("#mobileContactFormMessage").val(),
            number : $("#mobileContactFormNumber").val()
        }).success(onMessageSent)
          .error(onMessageError);
    }

    function onDesktopFormSubmit(e){
        e.preventDefault();
        if(!formIsValid('desktopContactForm')){
            return;
        }
        $.post('/contact', {
            email : $('#desktopContactFormEmail').val(),
            name : $('#desktopContactFormName').val(),
            message : $("#desktopContactFormMessage").val(),
            number : $("#desktopContactFormNumber").val()
        }).success(onMessageSent)
          .error(onMessageError);
    }

    function formIsValid(formId){
        var $form = $('#' + formId),
            $inputs = $form.find('input[type=text]:required'),
            $email = $form.find('input[type=email]:required'),
            $textarea = $form.find('textarea:required'),
            invalidFields = [];

        $('.has-error').removeClass('has-error');

        $inputs.each(function(){
            var $this = $(this);
            console.log()
            if($this.val().length === 0){
                invalidFields.push($this.id);
                $this.closest('.form-group').addClass('has-error');
            }
        });

        $textarea.each(function(){
            var $this = $(this);
            if($this.val().length === 0){
                invalidFields.push($this.id);
                $this.closest('.form-group').addClass('has-error');
            }
        });

        $email.each(function(){
            var $this = $(this);
            if($this.val().length === 0 || !validEmail($this.val())){
                invalidFields.push($this.id);
                $this.closest('.form-group').addClass('has-error');
            }
        });

        function validEmail(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        }

        setTimeout(function(){
            $('.has-error').removeClass('has-error');
        }, 3000);

        return invalidFields.length === 0;
    }

    function onMessageSent(){
        $('#thank_you_message').fadeIn('slow');
        $('#main').fadeOut('slow');
    }

    function onMessageError(){
        $('.message-error').removeClass('hidden').show();
        setTimeout(function(){
            $('.message-error').fadeOut('slow');
        }, 3000)
    }

    function isMobile(){
        var pattern = /(Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune)/i,
          ua = navigator.userAgent;
        return pattern.test(ua);
    }
});