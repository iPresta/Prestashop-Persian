/*
 * dmartl.js
 * DM Auto RTL - Auto RTL all inline style in page using jquery
 * Autor: Danoosh Miralayi
 * Website: presta-shop.ir
 * License: MIT
 * Find it here: https://github.com/Danoosh/DM-Auto-RTL
 */

$(document).ready(function () {
    $('[style]').each(function (index) {
        var styles_old = $(this).attr('style');
        styles_old = styles_old.split(';');
        var styles = {};
        var s = '';
        var i = '';
        var v = '';
        for (var x = 0, l = styles_old.length; x < l; x++) {
            s = styles_old[x].split(':');
            i = $.trim(s[0]);
            styles[makeGeneralRTL(i)] = makeValueRTL(i, $.trim(s[1]));
        }
        $(this).removeAttr("style");
        $(this).css(styles);
    });
});
function makeGeneralRTL(index) {
    var res = index.replace(/right/g, "rtemp");
    res = res.replace(/left/g, "right");
    res = res.replace(/rtemp/g, "left");
    return res;
}
function makeValueRTL(property, value) {
    if (property.match(/text-align|float/)) {
        return makeGeneralRTL(value);
    }
	if (property.match(/^background(-position)?$/))
		return value.replace(/^((?!#\((.*)\)).)*$/, ' ') + makeGeneralRTL(value.replace(/(\s)?url\((.*)\)(\s)?/, ''));
    if (property.match(/margin|padding/) && value.match(/(\S*) (\S*) (\S*) (\S*)/))
        return value.replace(/(\S*) (\S*) (\S*) (\S*)/, "$1 $4 $3 $2");
    return value;
}
/* End dmartl.js */

//tiny mce editor overrides
function tinySetup(config)
{
    if(!config)
        config = {};
	if (typeof config['editor_selector'] != 'undefined')
		config['selector'] = '.'+config['editor_selector'];

//    safari,pagebreak,style,table,advimage,advlink,inlinepopups,media,contextmenu,paste,fullscreen,xhtmlxtras,preview
    default_config_rtl = {
        plugins : "colorpicker link image paste pagebreak table contextmenu filemanager table code media autoresize textcolor directionality",
        toolbar1 : "code,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,formatselect,|,blockquote,colorpicker,pasteword,|,bullist,numlist,|,outdent,indent,|,link,unlink,|,cleanup,|,media,image,|, ltr, rtl",
        language: iso,
		content_css : window.tinyMCEPreInit.base+"/skins/prestashop/rtl.css",
    }

    $.each(default_config_rtl, function(index, el)
    {
        if (config[index] === undefined )
            config[index] = el;
    });

    tinyMCE.init(config);

};

//fix panel heading action buttons tooltip position
$(document).ready(function () {
	var data_p_left = $('.panel-heading-action span[data-placement="left"]');
	var data_p_right = $('.panel-heading-action span[data-placement="right"]');
	data_p_left.each(function (){
		this.setAttribute('data-placement','right');
    });
	data_p_right.each(function (){
		this.setAttribute('data-placement','left');
	});
});