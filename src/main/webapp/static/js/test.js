webpackJsonp([17, 38], {
    0: function (e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        var a = n(1352), o = i(a);
        n(1357), M.util.addI18n("signup", {"zh-CN": n(1362), "zh-TW": n(1363)}), $(document).ready(function () {
            $('[data-toggle="tooltip-error"]').tooltip({
                trigger: "manual",
                placement: "right",
                html: !0,
                container: ".main",
                template: '<div class="tooltip tooltip-error" role="tooltip"><div class="tooltip-arrow tooltip-arrow-border"></div><div class="tooltip-arrow tooltip-arrow-bg"></div><div class="tooltip-inner"></div></div>'
            }), $("form#new_user").find("input[data-toggle=tooltip-error]").tooltip("show");
            var e = M.util.v(document.getElementsByClassName("js-geetest-captcha")[0], Vue.extend(o["default"]), {data: {product: "popup"}});
            e.$on("geetestInitialized", function () {
                e.geetest.bindOn(".js-send-code-button")
            }), e.$on("captchaSuccessed", function () {
                var t = "CN", n = document.getElementById("user_mobile_number").value,
                    i = $("input[name=force_user_nonexist]").val(), a = {
                        id: e.captcha.id,
                        validation: {
                            challenge: e.validate.geetest_challenge,
                            gt: e.captcha.gt,
                            validate: e.validate.geetest_validate,
                            seccode: e.validate.geetest_seccode
                        }
                    };
                request.post(Routes.mobile_phone_send_code_path()).set("Accept", "application/json").send({
                    mobile_number: n,
                    iso_code: t,
                    force_user_nonexist: i
                }).send({captcha: a}).end(function (t, n) {
                    n.ok && !t ? (M.flash.success(n.body.message), M.util.countdown($(".js-send-code-button")).run()) : (M.flash.error(n.body.message), e.refreshCaptcha())
                })
            }), $("form#new_user").on("click", ".js-send-code-button", function () {
                var t = $("#user_mobile_number");
                0 === t.val().length && (M.util.displayInputTooltip(t, i18next.t("signup:mobile_number")), window.Geetest && e.geetest.hide())
            }), $("[data-action=switch-overseas-signup]").click(function (e) {
                var t = [$(".js-sign-up-container .js-normal"), $(".js-sign-up-container .js-overseas")], n = t[0],
                    i = t[1], a = i.is(":visible");
                a ? (n.removeClass("hide"), i.addClass("hide"), $(e.currentTarget).html(i18next.t("signup:oversea_mobile_number") + '<i class="iconfont ic-link"></i>')) : (n.addClass("hide"), i.removeClass("hide"), $(e.currentTarget).html(i18next.t("signup:mobile_or_email") + '<i class="iconfont ic-link"></i>')), $('input[name="user[mobile_number]"]').tooltip("hide"), $("input[name=oversea]").val(!a)
            }), $("form#new_user").on("keyup", 'input[name="user[mobile_number]"],input[name="user[oversea_mobile_number]"]', function (e) {
                0 !== e.currentTarget.value.length && ($(".js-security-number").removeClass("hide"), $("input[name=security_number]").val("true"))
            }), $("[data-action=choose-country]").siblings("ul").find("li").click(function (e) {
                var t = $(e.currentTarget).data("calling-code"), n = $(e.currentTarget).data("country-code");
                $(".js-overseas-number>span").html("+" + t + '<i class="iconfont ic-show"></i>'), $("#user_mobile_number_country_code").val(n)
            }), $("form#new_user").on("focus", "#user_nickname, #user_mobile_number, #user_password, #sms_code", function (e) {
                $(e.currentTarget).tooltip("hide")
            }), $("form#new_user").on("blur", "#user_nickname", function (e) {
                var t = $(e.currentTarget);
                t.val().length > 0 && request.post("/check_nickname").set("Accept", "application/json").send({nickname: t.val()}).end(function (e, n) {
                    n.ok && !e || M.util.displayInputTooltip(t, n.body.error[0].message)
                })
            }), $("form#new_user").on("blur", "#user_mobile_number,#user_oversea_mobile_number", function (e) {
                var t = $(e.currentTarget);
                if (t.val().length > 0) {
                    var n = $("#user_mobile_number_country_code").val();
                    request.post("/check_mobile_number").set("Accept", "application/json").send({mobile_number: t.val()}).send({mobile_number_country_code: n}).end(function (e, n) {
                        n.ok && !e && (n.body.ok || M.util.displayInputTooltip(t, i18next.t("signup:mobileNumberExist")))
                    })
                }
            }), $("form#new_user").on("submit", function () {
                var e = $("#user_nickname");
                if (0 === e.val().length)return M.util.displayInputTooltip(e, i18next.t("signup:nickname")), !1;
                var t = [$(".js-normal"), $(".js-overseas")], n = t[0], i = t[1];
                if (i.is(":visible")) {
                    var a = i.find("#user_mobile_number");
                    if (0 === a.val().length)return M.util.displayInputTooltip(a, i18next.t("signup:mobile_number")), !1
                } else {
                    var o = n.find("#user_mobile_number");
                    if (0 === o.val().length)return M.util.displayInputTooltip(o, i18next.t("signup:mobile_number")), !1
                }
                var s = $("#user_password");
                if (s.val().length < 6)return M.util.displayInputTooltip(s, i18next.t("signup:password")), !1;
                var r = $('input[name="sms_code"]');
                return 0 !== r.val().length || (M.util.displayInputTooltip(r, i18next.t("signup:sms_code_blank")), !1)
            })
        })
    }, 1352: function (e, t, n) {
        var i, a;
        i = n(1353);
        var o = n(1356);
        a = i = i || {}, "object" != typeof i["default"] && "function" != typeof i["default"] || (a = i = i["default"]), "function" == typeof a && (a = a.options), a.render = o.render, a.staticRenderFns = o.staticRenderFns, e.exports = i
    }, 1353: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), M.util.addI18n("geetest", {
            "zh-CN": n(1354),
            "zh-TW": n(1355)
        }), t["default"] = {
            name: "GeetestCaptcha", data: function () {
                return {product: "float", captcha: {}, validate: {}, geetest: null}
            }, computed: {
                challenge: function () {
                    return this.validate.geetest_challenge || this.captcha.challenge
                }, canDisplayGeetest: function () {
                    return !!window.Geetest
                }, config: function () {
                    return {
                        challenge: this.captcha.challenge,
                        success: 1,
                        gt: this.captcha.gt,
                        product: this.product,
                        lang: "zh-cn",
                        https: !1
                    }
                }
            }, created: function () {
                this.canDisplayGeetest && this.requestCaptcha()
            }, methods: {
                refreshCaptcha: function () {
                    this.geetest.refresh()
                }, requestCaptcha: function () {
                    var e = this;
                    request.get(Routes.new_captcha_path()).set("Accept", "application/json").end(function (t, n) {
                        !t && n.ok && (e.captcha = n.body, e.initGeetest())
                    })
                }, initGeetest: function () {
                    var e = this;
                    this.geetest = new window.Geetest(this.config), this.geetest.appendTo("#geetest-area"), this.$emit("geetestInitialized"), this.geetest.onSuccess(function () {
                        e.validate = e.geetest.getValidate(), e.$emit("captchaSuccessed")
                    })
                }
            }
        }, e.exports = t["default"]
    }, 1354: function (e, t) {
        e.exports = {
            geetest_exception: "验证码控件异常",
            look_detail: "请<a href='javascript:window.location.reload()'>刷新网页</a>重试，或<a href='http://www.jianshu.com/p/3cb4c632dff0' target='_blank'>点击</a>查看详情"
        }
    }, 1355: function (e, t) {
        e.exports = {
            geetest_exception: "驗證碼控件異常",
            look_detail: "請<a href='javascript:window.location.reload()'>刷新網頁</a>重試，或<a href='http://www.jianshu.com/p/3cb4c632dff0' target='_blank'>點擊</a>查看詳情"
        }
    }, 1356: function (e, t) {
        e.exports = {
            render: function () {
                var e = this, t = e.$createElement, n = e._self._c || t;
                return n("div", [e.canDisplayGeetest ? n("div", {staticClass: "captcha"}, [n("input", {
                    attrs: {
                        name: "captcha[validation][challenge]",
                        autocomplete: "off",
                        type: "hidden"
                    }, domProps: {value: e.challenge}
                }), e._v(" "), n("input", {
                    attrs: {name: "captcha[validation][gt]", autocomplete: "off", type: "hidden"},
                    domProps: {value: e.captcha.gt}
                }), e._v(" "), n("input", {
                    attrs: {name: "captcha[validation][validate]", autocomplete: "off", type: "hidden"},
                    domProps: {value: e.validate.geetest_validate}
                }), e._v(" "), n("input", {
                    attrs: {name: "captcha[validation][seccode]", autocomplete: "off", type: "hidden"},
                    domProps: {value: e.validate.geetest_seccode}
                }), e._v(" "), n("input", {
                    attrs: {name: "captcha[id]", autocomplete: "off", type: "hidden"},
                    domProps: {value: e.captcha.id}
                }), e._v(" "), n("div", {
                    staticClass: "geetest",
                    attrs: {id: "geetest-area"}
                })]) : n("div", {staticClass: "slide-error"}, [n("i", {staticClass: "iconfont ic-error"}), n("span", [e._v(e._s(e.$t("geetest:geetest_exception")))]), e._v(" "), n("div", {domProps: {innerHTML: e._s(e.$t("geetest:look_detail"))}})])])
            }, staticRenderFns: []
        }
    }, 1357: function (e, t) {
    }, 1362: function (e, t) {
        e.exports = {
            nickname: "请输入昵称",
            nicknameExist: "昵称已经被使用",
            mobile_number: "请输入正确的手机号",
            mobileNumberExist: "手机号已经被使用",
            password: "密码不能少于6个字符",
            sms_code_blank: "请输入验证码",
            oversea_mobile_number: "海外手机号注册",
            mobile_or_email: "手机注册"
        }
    }, 1363: function (e, t) {
        e.exports = {
            nickname: "請輸入暱稱",
            nicknameExist: "暱稱已經被使用",
            mobile_number: "請輸入正確的手機號",
            mobileNumberExist: "手機號已經被使用",
            password: "密碼不能少於6個字符",
            sms_code_blank: "請輸入驗證碼",
            oversea_mobile_number: "海外手機號註冊",
            mobile_or_email: "手機註冊"
        }
    }
});
//# sourceMappingURL=entry-200e42243a579e2572ef.js.map