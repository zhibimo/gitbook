define([
    "jQuery",
    "QRCode"
], function($, QRCode) {
    var types = {
        "wechat": function($el) {
            $("#wechat_qrcode").empty();
            new QRCode("wechat_qrcode", {
              text: location.href,
              width: 230,
              height: 230,
              colorDark : "#222",
              colorLight : "#eee"
            });

            // TODO: generate current url QR and show.
            $("#wechat_mask").show().off('click').on('click', function() {
              $("#wechat_mask").hide()
            });

            $("#wechat_qrcode_wrapper > span").off('click').on('click', function() {
              $("#wechat_mask").hide()
            });
        },
        "twitter": function($el) {
            window.open("http://twitter.com/home?status="+encodeURIComponent($("title").text()+" "+location.href))
        },
        "facebook": function($el) {
            window.open("http://www.facebook.com/sharer/sharer.php?s=100&p[url]="+encodeURIComponent(location.href))
        },
        "google-plus": function($el) {
            window.open("https://plus.google.com/share?url="+encodeURIComponent(location.href))
        },
        "weibo": function($el) {
            window.open("http://service.weibo.com/share/share.php?content=utf-8&url="+encodeURIComponent(location.href)+"&title="+encodeURIComponent($("title").text() + " #知笔墨#"))
        },
        "instapaper": function($el) {
            window.open("http://www.instapaper.com/text?u="+encodeURIComponent(location.href));
        },
        "vk": function($el) {
            window.open("http://vkontakte.ru/share.php?url="+encodeURIComponent(location.href));
        }
    };


    // Bind all sharing button
    var init = function() {
        $(document).on("click", "a[data-sharing],button[data-sharing]", function(e) {
            if (e) e.preventDefault();
            var type = $(this).data("sharing");

            types[type]($(this));
        })
    };

    return {
        init: init
    };
});
