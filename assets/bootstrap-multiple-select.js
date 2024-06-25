/*
* Criado por: Esdras Castro
* Data: 06/12/2017
*/
$.fn.BootstrapMultiselect = function(options){
    var c = this;
    var n = $(this).data('target');
    var referenceData = '';
    var currentChecked = [];

    if(options===undefined) {
        options = {
            optgroup  : false,
            reference : null,
            hAttrs    : [],
            sAttrs    : [],
            confirmAttr : [],
            limparAttr : [],
            container : 'body',
            checked   : false
        };
    } else {
        options.checked     = options.checked!==undefined?options.checked:-1;
        options.container   = options.container!==undefined?options.container:'body';
        options.optgroup    = options.optgroup!==undefined?options.optgroup:false;
        options.reference   = options.reference!==undefined?options.reference:null;
        options.hAttrs      = options.hAttrs!==undefined && options.hAttrs.length>0?options.hAttrs:[];
        options.sAttrs      = options.sAttrs!==undefined && options.sAttrs.length>0?options.sAttrs:[];
        options.confirmAttr = options.confirmAttr!==undefined && options.confirmAttr.length>0?options.confirmAttr:[];
        options.limparAttr  = options.limparAttr!==undefined && options.limparAttr.length>0?options.limparAttr:[];
    }

    if(n!==undefined) {
        n = n.replace('#', '');

        var m = '<div id="' + n + '" data-mobile="fullscreen" class="modal fade" tabindex="-1" role="dialog">\n' +
            '    <div class="modal-dialog" role="document">\n' +
            '        <div class="modal-content">\n' +
            '            <div class="modal-header">\n' +
            '                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span class="fa fa-close"></span></button>\n' +
            '                <h4 class="modal-title">' + ($(this).attr('title')?$(this).attr('title'):$(this).attr('placeholder')) + '</h4>\n' +
            '            </div>\n' +
            '            <div class="modal-body">\n' +
            '                <div class="row">\n' +
            '                    <div class="busca col-xs-12">\n' +
            '                        <div class="form-group">\n' +
            '                            <input type="search" class="form-control" placeholder="Filtrar resultados">\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <ul class="resultado">\n';
        $(this).children().each(function (k, v) {
            m += '                    <li class="col-xs-12 nopadding '+ (options.optgroup?'':'col-md-3') +'">\n' +
                '                        <div class="titulo">\n' +
                '                            <input id="h_' + n + '_' + k + '" '+ (options.optgroup?'':('value="'+ $(v).val() +'"')) +' class="filled-in" type="checkbox" '+ options.hAttrs.join(" ") +'>\n' +
                '                            <label for="h_' + n + '_' + k + '">' + (options.optgroup?$(v).attr('label'):$(v).text()) + '</label>\n' +
                '                        </div>\n';
            if(options.optgroup) {
                m +='                    <ul style="margin-left: 35px;">\n';
                $(v).children().each(function (i, vv) {
                    m += '                   <li class="col-xs-12 col-sm-6 col-md-4 col-lg-3">\n' +
                        '                        <input id="s_' + n + '_' + k + '_' + i + '" value="' + $(vv).val() + '" class="filled-in" type="checkbox" '+ options.sAttrs.join(" ") +'>\n' +
                        '                        <label for="s_' + n + '_' + k + '_' + i + '">' + $(vv).text() + '</label>\n' +
                        '                    </li>\n';
                });
                m += '                   </ul>\n';
            }
            m += '                    </li>\n';
        });
        m += '               </ul>\n' +
            '            </div>\n' +
            '            <div class="modal-footer">\n' +
            '                <button type="button" class="btn btn-link limpar" '+ options.limparAttr.join(" ") +'>Limpar</button>\n' +
            '                <button type="button" class="btn btn-site confirmar" data-dismiss="modal" '+ options.confirmAttr.join(" ") +'>Confirmar</button>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>';

        $(m).appendTo(options.container);

        $(  '<div class="form-group bootstrap-multiple-select bootstrap-multiple-select-'+ n +'" style="position:relative;">'+
            '   <input type="text" readonly class="form-control" id="input_'+ n +'" placeholder="'+ $(this).attr('placeholder') +'" data-toggle="modal" data-target="#'+ n +'" style="width: 100%">' +
            '   <i class="fa fa-caret-down select-icon" data-toggle="modal" data-target="#'+ n +'" style="position: absolute;top: 30%;right: 10px;"></i>'+
            '</div>'
        ).appendTo($(c).closest('div'));

        $(document).on('click', '#' + n + ' .confirmar', function () {
            var ck   = [];
            var text = '';
            var customText = '';
            var input= $('#input_' + n);
            var size = (input.width()/parseInt(input.css('font-size'))) + 10;
            currentChecked = [];

            $('#' + n).find('[type=checkbox]:checked').each(function (i, v) {
                if(options.optgroup) {
                    if($(v).attr('id').indexOf('h_' + n)===-1) {
                        currentChecked.push(v);
                        ck.push($(v).val());
                        if (text.length === 0) text = $(v).parent().find('label').text();
                        else text += ', ' + $(v).parent().find('label').text();
                    }
                } else {
                    ck.push($(v).val());
                    currentChecked.push(v);
                    if (text.length === 0) text = $(v).parent().find('label').text();
                    else text += ', ' + $(v).parent().find('label').text();
                }
            });

            customText = text;
            if(text.length > size)
                customText = text.substr(0, size) + '...';

            input.val(customText).attr('title', text);

            $(c).children().each(function (i, v) {
                if(options.optgroup) {
                    $(v).children().each(function (ii, vv) {
                        if ($.inArray($(vv).val(), ck) > -1) $(vv).prop('selected', true);
                        else $(vv).prop('selected', false);
                    });
                } else {
                    if ($.inArray($(v).val(), ck) > -1) $(v).prop('selected', true);
                    else $(v).prop('selected', false);
                }
            });
        }).on('change', '#' + n + ' [type=checkbox]', function(){
            if($(this).attr('id').indexOf('h_' + n)>-1){
                $(this).closest('li').find('ul [type=checkbox]').prop('checked', $(this).prop('checked'));
            } else {
                var checkeds = $(this).closest('ul').find('[type=checkbox]:checked');
                var totalcheckbox = $(this).closest('ul').find('[type=checkbox]');

                if(checkeds.length === totalcheckbox.length) {
                    $(this).closest('ul').closest('li').find('.titulo [type=checkbox]').prop('checked', true);
                } else {
                    $(this).closest('ul').closest('li').find('.titulo [type=checkbox]').prop('checked', false);
                }
            }
        }).on('click', '#' + n + ' .limpar', function () {
            $('#' + n).find('[type=checkbox]:checked').prop('checked', false);
        }).on('keyup', 'input[type=search]', function () {
            var digitado = $(this).val();
            $(this).closest('.modal-body').find('li').hide().filter(function () {
                var text = semAcentos($(this).text().trim().toLowerCase());
                var search = semAcentos(digitado.trim().toLowerCase());

                return text.indexOf(search) !== -1;
            }).show();
        }).on('hidden.bs.modal', '#' + n, function () {
            $('#' + n).find('[type=checkbox]:checked').prop('checked', false);
            if(currentChecked.length) {
                for(var i=0; i<currentChecked.length;i++){
                    $(currentChecked[i]).trigger('click');
                }
            }
        });

        $(c).prev('label').addClass('label-title');

        $(options.reference).on('change', function(){
            var selectedInput = $(this).find('option[value="'+this.value+'"]');
            var text = selectedInput.text().trim().split(', ');
            var checks = $('#' + n).find('[type=checkbox]');
            checks.closest('li').removeClass('hidden').css({display: 'block'});
            $('#input_' + n).val('');

            if(options.checked!==-1) checks.prop('checked', options.checked);
            checks.each(function(i, v){
                if($(v).next().text().indexOf(text[1]) === -1) {
                    $(v).closest('li').addClass('hidden');
                    if(options.checked!==-1) $(v).prop('checked', options.checked);
                }
            });
            $('#' + n + ' .confirmar').trigger('click');
        }).trigger('change');
    }
};