// Animação de ao clicar na opção esqueceu a senha ou login
$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});


