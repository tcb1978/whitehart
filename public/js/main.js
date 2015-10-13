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
        var timer = setTimeout(function(){
            $('#logo_slide').fadeOut('slow');
        }, 500);
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
            number : $("#mobileContactFormMessage").val()
        }).success(function(){
            alert('success!!!')
        }).error(function(){
            alert('error');
        });
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
            number : $("#desktopContactFormMessage").val()
        }).success(function(){
            alert('success!!!')
        }).error(function(){
            alert('error');
        });
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

    function isMobile(){
        var pattern = /(Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune)/i,
          ua = navigator.userAgent;
        return pattern.test(ua);
    }
});