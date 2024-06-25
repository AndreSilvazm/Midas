app.controller('chatController', function($scope,$http,$location) {
    $scope.invited = false;
    $scope.chatForm = {};
    $scope.imobiliaria = 0;
    $scope.php_session = 0;
    $scope.checkChat = function(codigo_imobiliaria, configChat, chatGlobalBotCodigo, configTawkto){
        var data = 'imobiliaria=' + codigo_imobiliaria;
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        var path_chat = (window.location.protocol == 'https:' ||  document.location.protocol == 'https:') ? 'https://'+$location.host()+':8443' : 'http://'+$location.host()+':8080';
        const fazFetchImobiliariaNaoTemplate = !(codigo_imobiliaria >= 99901 && codigo_imobiliaria <= 99999);
        if(codigo_imobiliaria >= 99901 && codigo_imobiliaria <= 99999){
            path_chat= 'http://prod10.sitemidas.com.br:8080';
        }
        if (fazFetchImobiliariaNaoTemplate) {
            $http.post(path_chat + '/atendimento/chat/retornaStatusChat.asp', data).then(function(response){
                $scope.chatOnline = response.data.retorno;
                if($scope.chatOnline == true){
                    $scope.chatConvite();
                }else{
                    if (configChat == '3'){
                        if(configTawkto == ''){
                            //Caso o cliente tenha configurado o chat TWAK.TO, a chamada da secretária virtual é feita pelo widget
                            //caminho: \modulos\site\views\partials\seo_partials\tawk_chat.volt
                            carregaChat();
                        }
                    }
                    if (configChat == '4') $(body).append('<script src="https://globalbot.ai/init/1/'+chatGlobalBotCodigo+'"></script>');
                }
            });
        }else{
            if (configChat == '3'){
                if(configTawkto == ''){
                    //Caso o cliente tenha configurado o chat TWAK.TO, a chamada da secretária virtual é feita pelo widget
                    //caminho: \modulos\site\views\partials\seo_partials\tawk_chat.volt
                    carregaChat();
                }
            }
            if (configChat == '4') $(body).append('<script src="https://globalbot.ai/init/1/'+chatGlobalBotCodigo+'"></script>');
        }
    };

    $scope.$watch('invited', function  (newV, oldV) {
        if($scope.invited) {
            $(".frame-chat-convidado").slideDown();
            $("[name=form1]").on('submit', function(e) {
                var x = window.open('','Popup_Window','toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=475,height=520,left=312,top=50');
                this.target = 'Popup_Window';
            });
        }
    });

    $scope.chatConvite = function () {

        var timeToCheck = 5 * 1000; // 20s
        var index = 1;
        var whileChat = setInterval(function () {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            if($scope.chatOnline){
                var path_chat = (window.location.protocol == 'https:' ||  document.location.protocol == 'https:') ? 'https://'+$location.host()+':8443' : 'http://'+$location.host()+':8080';
                $http.post(path_chat + '/admin/chat_convite.asp?i=' + $scope.imobiliaria + '&php_session=' + $scope.php_session).then(function(response){
                    if(response.data == '1'){
                        $scope.invited = true;
                        clearInterval(whileChat);
                    }
                    index++;
                });
            }
        }, timeToCheck * index);
    };

    $scope.rejeitaConvite = function() {
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        var path_chat = (window.location.protocol == 'https:' ||  document.location.protocol == 'https:') ? 'https://'+$location.host()+':8443' : 'http://'+$location.host()+':8080';
        $http.post(path_chat + '/atendimento/chat/funConvida.asp?recusar=1&php_session=' + $scope.php_session).then(function(response){
            $(".frame-chat-convidado").slideUp();
        });
    }
});
