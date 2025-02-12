var addAccordion = function () {
    var a = {};
    $.ajax({
        type: "get",
        url: "json/komunikaty.json",
        dataType: "json",
        success: function (d, c, e) {
            a = $.extend({}, d);
            d = $("#accordion");
            for (var f in a.komunikaty) c = $(document.createElement("h3")), e = $(document.createElement("div")), c.append(a.komunikaty[f].header), e.append(a.komunikaty[f].content), d.append(c), d.append(e);
            return d.accordion({
                heightStyle: "content",
                collapsible: !0
            })
        },
        error: function (a, c, e) {
            console.log("nie powiodlo sie z ajaxem poniewa\u017c >> " + c + " " + e);
            return "<p>Nie mo\u017cna pobra\u0107 danych przepraszamy.</p>"
        }
    })
},
    addTable = function () {
        var a = {}, d = [],
            c = ["Lp.", "Nazwa", "Data pocz\u0105tkowa", "Data ko\u0144cowa", "Opis"];
        $.ajax({
            type: "get",
            url: "json/projekty.json",
            dataType: "json",
            success: function (e, f, h) {
                a = $.extend({}, e);
                for (var g in a) d.push(a[g]);
                $("#myTable").jsGrid({
                    width: "100%",
                    height: "100%",
                    filtering: !0,
                    editing: !0,
                    sorting: !0,
                    inserting: !0,
                    paging: !1,
                    deleteConfirm: "Czy na pewno chcesz usun\u0105\u0107 rekord?",
                    data: d,
                    fields: [{
                        name: c[1],
                        type: "text",
                        width: "25%",
                        align: "center",
                        css: "jsGridCell",
                        headercss: "jsGridHeader"
                    }, {
                        name: c[2],
                        type: "text",
                        width: "20%",
                        align: "center",
                        css: "jsGridCell",
                        headercss: "jsGridHeader"
                    }, {
                        name: c[3],
                        type: "text",
                        width: "20%",
                        align: "center",
                        css: "jsGridCell",
                        headercss: "jsGridHeader"
                    }, {
                        name: c[4],
                        type: "text",
                        width: "25%",
                        align: "center",
                        css: "jsGridCell",
                        headercss: "jsGridHeader"
                    }, {
                        type: "control",
                        css: "jsGridCell"
                    }]
                })
            },
            error: function (a, c, d) {
                console.log("nie powiodlo sie z ajaxem poniewa\u017c >> " + c + " " + d);
                return "<p>Nie mo\u017cna pobra\u0107 danych przepraszamy.</p>"
            }
        })
    }, mm = window.matchMedia("(min-width:768px)"),
    MyModal = function (a, d, c, e, f) {
        this.buttonClose = {
            "class": "close",
            label: new Span("", "&times;", {
                "aria-hidden": "true"
            }),
            "data-dismiss": "modal",
            "aria-label": "Close"
        };
        this.modal_sizeClass = "modal-dialog ";
        "" != d && void 0 != d && (this.modal_sizeClass += d);
        this.modal = new Div("modal");
        this.myForm;
        this.modal.attr({
            role: "dialog",
            "aria-labelledby": "myModalLabel"
        });
        this.modal.attr("id", "myModal");
        "" != a && this.modal.addClass(a);
        this.modal_dialog = new Div(this.modal_sizeClass);
        this.modal_dialog.attr("role", "document");
        this.modal_dialog.css("z-index",
            "inherit");
        this.modal_content = new Div("modal-content");
        this.modal_header = new Div("modal-header");
        this.modal_title = new modalTitle("h3", c);
        this.modal_body = new Div("modal-body");
        this.modal_footer = new Div("modal-footer");
        this.buttonsArray = [];
        this.addBody = function (a) {
            void 0 != a && "" != a && this.modal_body.append(a)
        };
        this.addFooterButtons = function (a) {
            if ("object" == typeof a)
                for (b in a) {
                    var c = new BButton(a[b]);
                    this.buttonsArray[b] = c;
                    this.modal_footer.append(c)
                }
        };
        this.initModal = function () {
            this.addFooterButtons(f);
            this.modal_header.append(new BButton(this.buttonClose));
            this.modal_header.append(this.modal_title);
            this.modal_content.append(this.modal_header);
            "object" == typeof e ? this.addBody(this.myForm.initForm(e)) : this.addBody(e);
            this.modal_content.append(this.modal_body);
            this.modal_content.append(this.modal_footer);
            this.modal_dialog.append(this.modal_content);
            this.modal.append(this.modal_dialog);
            $("body").append(this.modal);
            $("#myModal").modal({
                backdrop: "static",
                show: !0
            });
            MyModal.prototype.singleton = 1
        };
        this.destroy =
            function (a) {
                $("#myModal").on("hidden.bs.modal", function (c) {
                    $("#myModal").remove();
                    MyModal.prototype.singleton = 0;
                    $(a).removeAttr("style")
                })
            };
        this.MyForm = function () {
            this.pattern = /^[\s\w 0-9a-zA-Z\u0105\u0107\u0119\u0142\u0144\u00f3\u015b\u017a\u017c\u0104\u0106\u0118\u0141\u0143\u00d3\u00d3\u015a\u0179\u017b_\-.:]*$/;
            this.form = $(document.createElement("form"));
            this.form.addClass("form-horizontal");
            this.input;
            this.inputLabel;
            this.inputCol;
            this.inputGroup;
            this.inputsArray = [];
            this.inputsGetVal = function () {
                for (var a =
                    document.forms[0].querySelectorAll("input"), c = [], d = 0; d < a.length; d++) c[a[d].getAttribute("id")] = a[d];
                return c
            };
            this.checkRequiredFields = function (a) {
                a = $("form").serializeArray();
                var c = this.inputsGetVal(),
                    d;
                for (d in c) {
                    var e = c[d];
                    "required" == e.getAttribute("required") && "" == e.value ? ($("#" + d).closest(".form-group").addClass("alert-danger"), a = void 0) : "text" != e.getAttribute("type") || this.pattern.test(e.value) ? $("#" + d).closest(".form-group").removeClass("alert-danger") : ($("#" + d).closest(".form-group").addClass("alert-danger"),
                        a = void 0)
                }
                if (void 0 != a && null != a) return a
            };
            this.createInput = function (a) {
                this.input = $(document.createElement("input"));
                this.inputLabel = $(document.createElement("label"));
                this.inputGroup = new Div("form-group");
                var c = "",
                    d;
                for (d in a) "label" == d ? this.inputLabel.append(a[d]) : "inputColClass" == d ? this.inputCol = new Div(a[d]) : "labelColClass" == d ? this.inputLabel.addClass("control-label " + a[d]) : "group" == d ? this.inputGroup.addClass(a[d]) : ("id" == d ? (c = a[d], this.input.attr(d, c), this.inputLabel.attr("for", c)) : this.input.attr(d,
                    a[d]), this.inputsArray[c] = this.input, this.inputCol.append(this.input));
                this.inputGroup.append(this.inputLabel);
                this.inputGroup.append(this.inputCol);
                return this.inputGroup
            };
            this.addInput = function (a) {
                if ("object" == typeof a)
                    for (var d in a) this.form.append(this.createInput(a[d]))
            };
            this.initForm = function (a) {
                this.addInput(a);
                return this.form
            }
        };
        this.myForm = new this.MyForm;
        this.initModal()
    };
MyModal.prototype.singleton = 0;
var BButton = function (a) {
    this.body = $(document.createElement("button"));
    this.body.attr("type", "button");
    for (key in a) "class" == key ? this.body.addClass(a[key]) : "label" == key ? this.body.append(a[key]) : this.body.attr(key, a[key]);
    return this.body
}, HTag = function (a) {
    var d = "h1 h2 h3 h4 h5 h6".split(" "),
        c = {};
    return c = -1 != d.indexOf(a) ? $(document.createElement(d[d.indexOf(a)])) : $(document.createElement(d[4]))
}, modalTitle = function (a, d) {
    var c = "Modal title",
        e = {};
    "" != d && (c = d);
    e = new HTag(a);
    e.addClass("modal-title");
    e.append(c);
    return e
}, Span = function (a, d, c) {
    this.body = $(document.createElement("span"));
    "" != a && this.body.addClass(a);
    "" != d && "undefined" !== d && this.body.append(d);
    "" != c && "undefined" !== c && "object" === typeof c && this.body.attr(c);
    return this.body
}, groupSize, btnSize;
mm.matches ? (groupSize = "form-group-sm", btnSize = "btn-sm") : (groupSize = "form-group-lg", btnSize = "btn-lg");
var footerButtons = {
    buttonAnuluj: {
        "class": "btn btn-default " + btnSize,
        label: "Anuluj",
        "data-dismiss": "modal",
        "aria-label": "Anuluj"
    },
    buttonOk: {
        "class": "btn btn-primary " + btnSize,
        label: "Dodaj",
        "aria-label": "Dodaj"
    }
}, confirmDeleteButtons = {
    buttonAnuluj: {
        "class": "btn btn-default " + btnSize,
        label: "Anuluj",
        "data-dismiss": "modal",
        "aria-label": "Anuluj"
    },
    buttonOk: {
        "class": "btn btn-primary " + btnSize,
        label: "Ok",
        "data-dismiss": "modal",
        "aria-label": "Ok"
    }
}, myNewInputs = {
    title: {
        label: "Nazwa wydarzenia",
        inputColClass: "col-sm-6",
        labelColClass: "col-sm-5",
        group: groupSize,
        type: "text",
        maxlength: "30",
        "class": "form-control",
        id: "eventName",
        name: "eventName",
        placeholder: "Nazwa",
        required: "required"
    },
    startDate: {
        label: "Data pocz\u0105tkowa",
        inputColClass: "col-sm-4",
        labelColClass: "col-sm-5",
        group: groupSize,
        type: "date",
        "class": "form-control",
        id: "eventStartDate",
        name: "eventStartDate",
        placeholder: "Data pocz\u0105tkowa",
        required: "required"
    },
    endDate: {
        label: "Data ko\u0144cowa",
        inputColClass: "col-sm-4",
        labelColClass: "col-sm-5",
        group: groupSize,
        type: "date",
        "class": "form-control",
        id: "eventEndDate",
        name: "eventEndDate",
        placeholder: "Data ko\u0144cowa"
    },
    allDay: {
        label: "Wydarzenie ca\u0142odniowe",
        inputColClass: "col-sm-1",
        labelColClass: "col-sm-5",
        group: groupSize,
        type: "checkbox",
        "class": "form-control",
        id: "allDayEvent",
        name: "allDayEvent",
        checked: "checked"
    },
    startTime: {
        label: "Godzina rozpocz\u0119cia",
        inputColClass: "col-sm-3",
        labelColClass: "col-sm-5",
        group: groupSize,
        type: "time",
        "class": "form-control",
        id: "eventStartTime",
        name: "eventStartTime",
        placeholder: "Data pocz\u0105tkowa",
        disabled: "disabled"
    },
    endTime: {
        label: "Godzina zako\u0144czenia",
        inputColClass: "col-sm-3",
        labelColClass: "col-sm-5",
        group: groupSize,
        type: "time",
        "class": "form-control",
        id: "eventEndTime",
        name: "eventEndTime",
        placeholder: "Data ko\u0144cowa",
        disabled: "disabled"
    },
    description: {
        label: "Opis wydarzenia",
        inputColClass: "col-sm-7",
        labelColClass: "col-sm-5",
        group: groupSize,
        type: "text",
        maxlength: "160",
        "class": "form-control",
        id: "eventDescription",
        name: "eventDescription",
        placeholder: "Opis do 160 znak\u00f3w"
    }
}, myEditInputs = {
    title: {
        label: "Nazwa wydarzenia",
        inputColClass: "col-sm-6",
        labelColClass: "col-sm-5",
        group: groupSize,
        type: "text",
        maxlength: "30",
        "class": "form-control",
        id: "eventName",
        name: "eventName",
        placeholder: "Nazwa",
        required: "required"
    },
    startDate: {
        label: "Data pocz\u0105tkowa",
        inputColClass: "col-sm-4",
        labelColClass: "col-sm-5",
        group: groupSize,
        type: "date",
        "class": "form-control",
        id: "eventStartDate",
        name: "eventStartDate",
        placeholder: "Data pocz\u0105tkowa",
        required: "required"
    },
    endDate: {
        label: "Data ko\u0144cowa",
        inputColClass: "col-sm-4",
        labelColClass: "col-sm-5",
        group: groupSize,
        type: "date",
        "class": "form-control",
        id: "eventEndDate",
        name: "eventEndDate",
        placeholder: "Data ko\u0144cowa"
    },
    allDay: {
        label: "Wydarzenie ca\u0142odniowe",
        inputColClass: "col-sm-1",
        labelColClass: "col-sm-5",
        group: groupSize,
        type: "checkbox",
        "class": "form-control",
        id: "allDayEvent",
        name: "allDayEvent",
        checked: "checked"
    },
    startTime: {
        label: "Godzina rozpocz\u0119cia",
        inputColClass: "col-sm-3",
        labelColClass: "col-sm-5",
        group: groupSize,
        type: "time",
        "class": "form-control",
        id: "eventStartTime",
        name: "eventStartTime",
        placeholder: "Data pocz\u0105tkowa",
        disabled: "disabled"
    },
    endTime: {
        label: "Godzina zako\u0144czenia",
        inputColClass: "col-sm-3",
        labelColClass: "col-sm-5",
        group: groupSize,
        type: "time",
        "class": "form-control",
        id: "eventEndTime",
        name: "eventEndTime",
        placeholder: "Data ko\u0144cowa",
        disabled: "disabled"
    },
    description: {
        label: "Opis wydarzenia",
        inputColClass: "col-sm-7",
        labelColClass: "col-sm-5",
        group: groupSize,
        type: "text",
        maxlength: "160",
        "class": "form-control",
        id: "eventDescription",
        name: "eventDescription",
        placeholder: "Opis do 160 znak\u00f3w"
    }
}, Div = function (a) {
    this.body = $(document.createElement("div"));
    "" != a && this.body.addClass(a);
    this.addClass = function (a) {
        this.body.addClass(a)
    };
    return this.body
}, WidgetTitle = function (a, d) {
    var c = "",
        e = "Widget title";
    "" != d && (e = d);
    c = new HTag(a);
    c.addClass("widget-title ");
    c.text(e);
    return c
}, Button = function (a, d, c, e) {
    var f = $(document.createElement(a));
    "button" == a && (f.attr("type", "button"), f.addClass(c));
    "a" == a && f.attr("href", "#");
    a = $(document.createElement("i")).addClass(d);
    f.append(a);
    f.append(e);
    return f
}, ToolBar = function () {
    var a = new Div;
    a.addClass("widget-toolbar");
    return a
}, WidgetMenu = function () {
    var a = new Div;
    a.addClass("widget-menu");
    return a
}, DropDownMenu = function (a) {
    var d = $(document.createElement("ul"));
    d.addClass("dropdown-menu dropdown-light-blue dropdown-caret dropdown-closer dropdown-menu-left");
    var c = [],
        e = 0;
    $.each(a, function (a, h) {
        "" != h && (c[e] = $(document.createElement("li")), c[e].append($(document.createElement("a")).attr({
            href: "#",
            "data-toggle": "tab",
            name: h.name,
            value: h.value
        }).text(a)), d.append(c[e++]))
    });
    return d
}, StandardToolBar = function (a, d, c) {
    var e = new ToolBar;
    $.each(a, function (a, c) {
        if ("" != c.icon && void 0 != c.icon) {
            var g = new Button("a", c.icon, "", "");
            c.icon.substr(12, c.icon.length);
            g.attr("data-action", a.toLowerCase());
            if ("dropdown" == c.type) {
                var l = new WidgetMenu;
                g.attr("data-toggle", c.type);
                l.append(g);
                g = a.charAt(0).toUpperCase();
                g = new DropDownMenu(d["WB" + (g + a.substr(1, a.length)) + "List"]);
                $(g).find("a").addClass(a.toLowerCase());
                l.append(g);
                e.append(l)
            } else g.addClass("my" +
                a.toLowerCase()), e.append(g)
        }
    });
    return {
        b: e,
        c: void 0
    }
}, WidgetBody = function () {
    var a = new Div;
    a.addClass("widget-body");
    return a
}, WidgetHeader = function (a) {
    var d = new Div;
    d.addClass("widget-header " + a);
    return d
}, WidgetMain = function (a) {
    var d = new Div;
    d.addClass("widget-main ");
    d.append(a);
    return d
}, WidgetBox = function () {
    var a = new Div;
    a.addClass("widget-box ");
    return a
}, GridContainer = function () {
    this.body = new Div;
    this.body.addClass("container-fluid");
    this.container = new Div;
    this.container.addClass("row");
    this.colLeft =
        new Div;
    this.colLeft.addClass("col-xs-2 col-left");
    this.colMiddle = new Div;
    this.colMiddle.addClass("col-xs-7 col-middle");
    this.colRight = new Div;
    this.colRight.addClass("col-xs-3 col-right");
    this.addRowLeft = function (a) {
        this.colLeft.append(a)
    };
    this.addRowRight = function (a) {
        this.colRight.append(a)
    };
    this.addRowMiddle = function (a) {
        this.colMiddle.append(a)
    };
    this.container.append(this.colLeft);
    this.container.append(this.colMiddle);
    this.container.append(this.colRight);
    this.body.append(this.container);
    this.getContent =
        function () {
            return this.body
        }
}, MyWidget = function (a, d) {
    var c = new StandardToolBar(a.WBStdToolbar, a.WBMenuList, d),
        e = new StandardToolBar(a.WBStdToolbarLeft, a.WBMenuList, d);
    $(e.b).addClass("toolbar-left");
    var f = new WidgetTitle(a.WBTitleFormat, a.WBTitle),
        h = new WidgetBox;
    h.attr("id", d);
    h.addClass(a.WBColor);
    h.addClass(a.WBTransparent);
    h.addClass(a.WBBorder);
    h.addClass(a.WBFullscreen);
    var g = new WidgetMain(a.WBBodyRenderFunction);
    g.addClass(a.WBBodyPadding);
    var l = new WidgetHeader(a.WBHeader),
        m = new WidgetBody;
    m.append(g);
    l.append(e.c);
    l.append(e.b);
    l.append(f);
    l.append(c.c);
    l.append(c.b);
    h.append(l);
    h.append(m);
    return h
}, TDesktop = function (a, d) {
    this.MyDesktop = d;
    var c = {
        left: {},
        middle: {},
        right: {}
    }, e = {
        left: [],
        middle: [],
        right: []
    }, f = function () {
        $(".widget-container-col").sortable({
            connectWith: ".widget-container-col",
            items: "> .widget-box",
            handle: ace.vars.touch ? ".widget-header" : !1,
            cancel: ".fullscreen,#calendar,#myTable,a",
            opacity: .6,
            revert: !0,
            forceHelperSize: !0,
            placeholder: "widget-placeholder",
            forcePlaceholderSize: !0,
            zIndex: 1E3,
            tolerance: "pointer",
            start: function (a, c) {
                c.item.parent().css({
                    "min-height": c.item.height()
                })
            },
            update: function (a, c) {
                $(c.sender).css({
                    "min-height": "50px"
                });
                a.stopImmediatePropagation();
                var d = parseInt($("#calendar").css("width"));
                adjustCalendarToWidth(d)
            },
            deactivate: function (a, c) {
                c.item.css({
                    "z-index": "1000"
                })
            }
        })
    }, h = function () {
        var a = parseInt($(".col-left").css("width")),
            c = parseInt($(".col-right").css("width")),
            d = parseInt($(".col-middle").css("width")),
            e, f, g, h, l, m, n = a + c + d,
            q = function () {
                $(".col-left").resizable({
                    handles: "e",
                    minWidth: 31,
                    maxWidth: d + a - 31,
                    start: function (e, f) {
                        $(".container-fluid").css("width", n);
                        $(".row").css("width", n);
                        a = parseInt($(".col-left").css("width"));
                        c = parseInt($(".col-right").css("width"));
                        d = parseInt($(".col-middle").css("width"));
                        $(".col-right").css("width", c)
                    },
                    resize: function (c, g) {
                        $(".container-fluid").css("width", n);
                        $(".row").css("width", n);
                        l = g.size.width;
                        e = a - l;
                        f = d + e;
                        $(".col-middle").css("width", f);
                        var h = parseInt($("#calendar").css("width"));
                        adjustCalendarToWidth(h)
                    },
                    stop: function (e, f) {
                        myRefreshCalendar("");
                        a = parseInt($(".col-left").css("width"));
                        c = parseInt($(".col-right").css("width"));
                        d = parseInt($(".col-middle").css("width"));
                        $(".col-middle").resizable("destroy");
                        p();
                        var g = parseInt($("#calendar").css("width"));
                        adjustCalendarToWidth(g)
                    }
                });
                var g = new Span("ui-icon ui-icon-grip-dotted-vertical");
                $(".col-left>.ui-resizable-handle").append(g)
            }, p = function () {
                $(".col-middle").resizable({
                    handles: "e",
                    minWidth: 31,
                    maxWidth: d + c - 31,
                    start: function (e, f) {
                        $(".container-fluid").css("width", n);
                        $(".row").css("width", n);
                        a = parseInt($(".col-left").css("width"));
                        c = parseInt($(".col-right").css("width"));
                        d = parseInt($(".col-middle").css("width"))
                    },
                    resize: function (a, e) {
                        $(".container-fluid").css("width", n);
                        $(".row").css("width", n);
                        m = e.size.width;
                        g = d - m;
                        h = c + g;
                        $(".col-right").css("width", h);
                        var f = parseInt($("#calendar").css("width"));
                        adjustCalendarToWidth(f)
                    },
                    stop: function (e, f) {
                        myRefreshCalendar("");
                        a = parseInt($(".col-left").css("width"));
                        c = parseInt($(".col-right").css("width"));
                        d = parseInt($(".col-middle").css("width"));
                        $(".col-left").resizable("destroy");
                        q();
                        var g = parseInt($("#calendar").css("width"));
                        adjustCalendarToWidth(g)
                    }
                });
                var e = new Span("ui-icon ui-icon-grip-dotted-vertical");
                $(".col-middle>.ui-resizable-handle").append(e)
            };
        q();
        p()
    };
    if (1 != $.cookie("firstRun")) {
        console.log("First run!");
        localStorage.getItem("uklad") ? localStorage.removeItem("uklad") : localStorage.setItem("uklad", "");
        for (var g in this.MyDesktop.WidgetList) {
            mm.matches && (this.MyDesktop.WidgetList[g].WBHeader = "widget-header-small", this.MyDesktop.WidgetList[g].WBCollapsed = "", this.MyDesktop.WidgetList[g].WBStdToolbar.collapse.icon =
                "ace-icon fa fa-chevron-up");
            var l = '{"WBStyle":"' + this.MyDesktop.WidgetList[g].WBStyle + '","WBTitle":"' + this.MyDesktop.WidgetList[g].WBTitle + '","WBBorder":"' + this.MyDesktop.WidgetList[g].WBBorder + '","WBHeader":"' + this.MyDesktop.WidgetList[g].WBHeader + '","WB_X":"' + this.MyDesktop.WidgetList[g].WB_X + '","WB_Y":"' + this.MyDesktop.WidgetList[g].WB_Y + '","WBVisible":"' + this.MyDesktop.WidgetList[g].WBVisible + '","WBFullscreen":"' + this.MyDesktop.WidgetList[g].WBFullscreen + '","WBColor":"' + this.MyDesktop.WidgetList[g].WBColor +
                '","WBCollapsed":"' + this.MyDesktop.WidgetList[g].WBCollapsed + '","WBTransparent":"' + this.MyDesktop.WidgetList[g].WBTransparent + '"}';
            c.left[g] = {};
            c.left[g].y = -1;
            c.middle[g] = {};
            c.middle[g].y = -1;
            c.right[g] = {};
            c.right[g].y = -1; -1 != this.MyDesktop.WidgetList[g].WB_Y && (c[this.MyDesktop.WidgetList[g].WB_X][g].y = this.MyDesktop.WidgetList[g].WB_Y);
            localStorage.getItem(g) ? localStorage.removeItem(g) : localStorage.setItem(g, l)
        }
        localStorage.setItem("uklad", parseToString(c));
        $.cookie("firstRun", 1, {
            expires: 90,
            path: "/"
        })
    } else if (1 ==
        $.cookie("firstRun")) {
        console.log("To nie jest first run!");
        for (var m in this.MyDesktop.WidgetList) localStorage.getItem(m) && (l = $.parseJSON(localStorage.getItem(m)), this.MyDesktop.WidgetList[m].WBStyle = l.WBStyle, this.MyDesktop.WidgetList[m].WBTitle = l.WBTitle, this.MyDesktop.WidgetList[m].WBBorder = l.WBBorder, this.MyDesktop.WidgetList[m].WBHeader = l.WBHeader, this.MyDesktop.WidgetList[m].WBVisible = l.WBVisible, this.MyDesktop.WidgetList[m].WBFullscreen = l.WBFullscreen, this.MyDesktop.WidgetList[m].WBColor =
            l.WBColor, this.MyDesktop.WidgetList[m].WBCollapsed = l.WBCollapsed, this.MyDesktop.WidgetList[m].WBTransparent = l.WBTransparent)
    }
    c = new function (a) {
        var c = new Div;
        c.addClass("container-desktop");
        var d = new GridContainer,
            e;
        for (e in a) {
            if ("undefined" == a[e].Uklad) break;
            d.addRowLeft((new Div).addClass("widget-container-col row-xs-" + a[e].Uklad));
            d.addRowMiddle((new Div).addClass("widget-container-col row-xs-" + a[e].Uklad));
            d.addRowRight((new Div).addClass("widget-container-col row-xs-" + a[e].Uklad))
        }
        c.append(d.getContent());
        return c
    }(this.MyDesktop.DesktopTable);
    $(a).append(c);
    if (localStorage.uklad) {
        var c = $.parseJSON(localStorage.getItem("uklad")),
            q;
        for (q in c)
            for (var n in c[q]) -1 != c[q][n].y && (e[q][c[q][n].y] = n)
    }
    q = "left";
    for (var p in this.MyDesktop.WidgetList) n = new MyWidget(this.MyDesktop.WidgetList[p], p), $(n).attr("style", this.MyDesktop.WidgetList[p].WBStyle), "fullscreen" == this.MyDesktop.WidgetList[p].WBFullscreen.toLowerCase() && ($(n).addClass("fullscreen"), $(n).find(".widget-body").attr("id", "scrollContainer"), "true" ==
        this.MyDesktop.WidgetList[p].WBVisible && setHashPulpit("#" + this.MyDesktop.WidgetList[p].WBTitle)), "collapsed" == this.MyDesktop.WidgetList[p].WBCollapsed.toLowerCase() ? mm.matches && "WidgetBox05" != p && ($(n).addClass("collapsed"), $(n).find(".fa-chevron-up").addClass("fa-chevron-down").removeClass("fa-chevron-up")) : mm.matches || ($(n).removeClass("collapsed"), $(n).find(".fa-chevron-down").addClass("fa-chevron-up").removeClass("fa-chevron-down")), "true" == this.MyDesktop.WidgetList[p].WBTransparent.toLowerCase() &&
        $(n).addClass("transparent"), "border-light" == this.MyDesktop.WidgetList[p].WBBorder ? $(n).addClass("border-light") : "no-border" == this.MyDesktop.WidgetList[p].WBBorder && $(n).addClass("no-border"), "false" == this.MyDesktop.WidgetList[p].WBVisible && (console.log("odnotowano nie wyswietlac " + p), $(n).hide()), mm.matches && (-1 != $.inArray(p, e.left) ? q = "left" : -1 != $.inArray(p, e.middle) ? q = "middle" : -1 != $.inArray(p, e.right) && (q = "right"), f()), $(".col-" + q + ">.widget-container-col").append($(n)), $("#scrollContainer").perfectScrollbar();
    mm.matches && h();
    $(".widget-box").on("close.ace.widget", function (a) {
        setHashPulpit("#Pulpit");
        a.stopImmediatePropagation();
        a.preventDefault();
        var c = $(a.target).attr("id");
        if (localStorage.getItem(c)) {
            var d = $.parseJSON(localStorage.getItem(c));
            d.WBVisible = !1;
            localStorage.setItem(c, parseToString(d))
        }
        $(a.target).hide()
    });
    $(".widget-box").on("show.ace.widget", function (a) {
        a.stopImmediatePropagation();
        a = $(a.target).attr("id");
        if (localStorage.getItem(a)) {
            var c = $.parseJSON(localStorage.getItem(a));
            c.WBCollapsed =
                "";
            localStorage.setItem(a, parseToString(c))
        }
    });
    $(".widget-box").on("hide.ace.widget", function (a) {
        a.stopImmediatePropagation();
        a = $(a.target).attr("id");
        if (localStorage.getItem(a)) {
            var c = $.parseJSON(localStorage.getItem(a));
            c.WBCollapsed = "collapsed";
            localStorage.setItem(a, parseToString(c))
        }
    });
    $(".widget-box").on("fullscreen.ace.widget", function (a) {
        a.stopImmediatePropagation();
        "auto" == $("html").css("overflow-y") ? $("html").css("overflow-y", "hidden") : $("html").css("overflow-y", "auto");
        a = $(a.target);
        switch (a.attr("id")) {
            case "WidgetBox01":
                setHashPulpit(a.is(".fullscreen") ?
                    "#Pulpit" : linksHrefs[0]);
                break;
            case "WidgetBox02":
                setHashPulpit(a.is(".fullscreen") ? "#Pulpit" : linksHrefs[1]);
                break;
            case "WidgetBox03":
                setHashPulpit(a.is(".fullscreen") ? "#Pulpit" : linksHrefs[2]);
                break;
            case "WidgetBox04":
                setHashPulpit(a.is(".fullscreen") ? "#Pulpit" : linksHrefs[3]);
                break;
            case "WidgetBox05":
                setHashPulpit(a.is(".fullscreen") ? "#Pulpit" : linksHrefs[4]);
                break;
            case "WidgetBox06":
                setHashPulpit(a.is(".fullscreen") ? "#Pulpit" : linksHrefs[5])
        }
    });
    $(".widget-box").on("fullscreened.ace.widget", function (a) {
        a =
            $(a.target);
        var c = a.attr("id");
        if (localStorage.getItem(c)) {
            var d = $.parseJSON(localStorage.getItem(c));
            if ("WidgetBox05" == c) {
                var e = parseInt($("#calendar").css("width"));
                adjustCalendarToWidth(e)
            } else "WidgetBox02" == c && $("#myTable").jsGrid("refresh");
            a.is(".fullscreen") ? (mm.matches && ($(a).find(".widget-body").attr("id", "scrollContainer"), $("#scrollContainer").perfectScrollbar()), d.WBFullscreen = "fullscreen") : (mm.matches && ($("#scrollContainer").perfectScrollbar("destroy"), a.find(".widget-body").removeAttr("id")),
                d.WBFullscreen = "");
            localStorage.setItem(c, parseToString(d))
        }
    });
    $(".widget-box").on("shown.ace.widget", function (a) {
        a = $(a.target);
        var c = a.attr("id");
        "WidgetBox05" == c ? (a = parseInt($(a).css("width")), adjustCalendarToWidth(a)) : "WidgetBox02" == c && $("#myTable").jsGrid("refresh")
    });
    $("body").on("click", function (a) {
        $(a.target).parent().is("a[data-action=settings]") ? "false" === $(a.target).parent().attr("aria-expanded") || void 0 === $(a.target).parent().attr("aria-expanded") ? $(a.target).closest(".widget-box").css("overflow",
            "visible") : $(a.target).closest(".widget-box").css("overflow", "hidden") : $(".widget-box").css("overflow", "hidden")
    });
    $("a.settings").on("click.ace.widget", function (a) {
        a.preventDefault();
        a.stopImmediatePropagation();
        var c = $(a.target).closest(".widget-box").attr("id");
        if (localStorage.getItem(c)) {
            var d = $.parseJSON(localStorage.getItem(c)),
                e = $(a.target).attr("value"),
                f = $(a.target).attr("name");
            $(a.target).closest(".widget-box").find(".widget-title");
            "widget-header" == f ? ($(this).closest(".widget-box").find("." +
                f).attr("class", f + " " + e), d.WBHeader = e) : "widget-box" == f && ("transparent" == e ? ($(this).closest(".widget-box").toggleClass(e), d.WBTransparent = "true" == d.WBTransparent ? "" : "true") : "no-border" == e && ($(this).closest(".widget-box").toggleClass(e), d.WBBorder = "border-light" == d.WBBorder ? "no-border" : "border-light"));
            localStorage.setItem(c, parseToString(d))
        }
    })
}, setHashPulpit = function (a) {
    var d = window.location.hash;
    "" == d ? window.location.hash = a : d != a && (window.location.hash = a)
}, parseToString = function (a) {
    var d = "{";
    $.each(a,
        function (a, e) {
            d += ("object" === typeof a ? parseToString(a) : '"' + a + '"') + ":" + ("object" === typeof e ? parseToString(e) : '"' + e + '"') + ","
        });
    return d.substr(0, d.length - 1) + "}"
}, theme = "flick",
    currentLang = "pl",
    userEventsArray = [],
    insert = function (a, d, c) {
        var e = a.slice(0, c);
        return e = e + d + a.slice(c)
    };
if (localStorage.getItem("calendar")) ustawienia = $.parseJSON(localStorage.getItem("calendar")), theme = ustawienia.CTheme, currentLang = ustawienia.CLang;
else {
    var ustawienia = {};
    ustawienia.CTheme = theme;
    ustawienia.CLang = currentLang;
    localStorage.setItem("calendar", parseToString(ustawienia))
}
ustawienia = null;
if (localStorage.getItem("userEvents")) {
    var tempUserEvents = $.parseJSON(localStorage.getItem("userEvents")),
        ev;
    for (ev in tempUserEvents) "length" != ev && userEventsArray.push(tempUserEvents[ev]);
    tempUserEvents = null
}
btnSize = mm.matches ? "btn-sm" : "btn-lg";
var eventFooterButtons = {
    buttonAnuluj: {
        "class": "btn btn-default " + btnSize,
        label: "Anuluj",
        "data-dismiss": "modal",
        "aria-label": "Anuluj"
    },
    buttonRemoveEvent: {
        "class": "btn btn-danger " + btnSize,
        label: "Usu\u0144",
        "aria-label": "Usu\u0144"
    },
    buttonOk: {
        "class": "btn btn-success " + btnSize,
        label: "Zmie\u0144",
        "aria-label": "Zmie\u0144"
    }
}, initCalendar = function (a) {
    $("#calendar").fullCalendar({
        theme: !0,
        lang: currentLang,
        allDay: !1,
        header: {
            left: "prev,next  today",
            center: "title",
            right: "month,agendaWeek,agendaDay"
        },
        aspectRatio: a,
        editable: !0,
        weekends: !0,
        weekNumbers: !0,
        eventLimit: !0,
        eventSources: [{
            events: function (a, c, e, f) {
                $.ajax({
                    type: "GET",
                    url: "cal/events.ics",
                    dataType: "text",
                    lazyFetching: !1,
                    success: function (a) {
                        var c = [],
                            d = 0;
                        a = a.split("\n");
                        var e = "",
                            q = "",
                            n = "";
                        $.each(a, function (a, f) {
                            val = f.split(":");
                            "BEGIN" == val[0] && "VEVENT" == val[1] && (e = n = q = "");
                            "DTSTART" == val[0] && (q = -1 == val[1].search("T") ? insert(insert(val[1], "-", 4), "-", 7) : insert(insert(insert(insert(val[1], "-", 4), "-", 7), ":", 13), ":", 16));
                            "DTEND" == val[0] && "" != val[1] && (n = -1 ==
                                val[1].search("T") ? insert(insert(val[1], "-", 4), "-", 7) : insert(insert(insert(insert(val[1], "-", 4), "-", 7), ":", 13), ":", 16));
                            "SUMMARY" == val[0] && (e = val[1]);
                            if ("END" == val[0] && "VEVENT" == val[1] && "" != q && "" != e) {
                                var h = "globalEvent-" + d++;
                                c.push({
                                    title: e,
                                    start: q,
                                    end: n,
                                    id: h,
                                    className: "global-event",
                                    description: "Globalne wydarzenie",
                                    editable: !1
                                })
                            }
                        });
                        f(c)
                    },
                    error: function (a, c, d) {
                        console.log("nie powiodlo sie z ajaxem bo >> " + c + " " + d)
                    }
                })
            }
        }, {
            events: userEventsArray
        }],
        eventDrop: function (a, c, e) {
            onEventChange(a, c, e)
        },
        eventResize: function (a,
            c, e) {
            onEventChange(a, c, e)
        },
        eventClick: function (a, c, e) {
            var f = a.id.split("-"),
                h = "",
                h = mm.matches ? "btn-sm" : "btn-lg";
            if ("globalEvent" != f[0]) {
                var g = [],
                    l = [];
                null != a.end && (g = a.end.format().split("T"));
                null != a.start && (l = a.start.format().split("T"));
                myEditInputs.title.value = a.title;
                myEditInputs.startDate.value = l[0];
                myEditInputs.endDate.value = g[0];
                myEditInputs.description.value = a.description;
                a.allDay ? (myEditInputs.startTime.disabled = "disabled", myEditInputs.endTime.disabled = "disabled", myEditInputs.allDay.checked =
                    "checked", myEditInputs.startTime.value = "", myEditInputs.endTime.value = "") : (myEditInputs.startTime.value = l[1], myEditInputs.endTime.value = g[1], delete myEditInputs.startTime.disabled, delete myEditInputs.endTime.disabled, delete myEditInputs.allDay.checked);
                f = mm.matches ? "" : "modal-lg";
                if (0 == MyModal.prototype.singleton) {
                    var m = new MyModal("fade", f, "Zmie\u0144 wydarzenie", myEditInputs, eventFooterButtons);
                    m.buttonsArray.buttonOk.on("click", function (f) {
                        changeEvent(a, c, e, m.myForm.checkRequiredFields($("#allDayEvent").prop("checked")))
                    });
                    m.buttonsArray.buttonRemoveEvent.on("click", function (c) {
                        removeEvent(a, m)
                    });
                    m.myForm.inputsArray.allDayEvent.on("click", function (a) {
                        $(a.target).prop("checked") ? ($("#eventStartTime").prop("disabled", !0), $("#eventEndTime").prop("disabled", !0), $("#eventStartTime").attr("value", ""), $("#eventEndTime").attr("value", "")) : ($("#eventStartTime").prop("disabled", !1), $("#eventEndTime").prop("disabled", !1), $("#eventStartTime").attr("value", l[1]), $("#eventEndTime").attr("value", g[1]))
                    });
                    m.destroy()
                }
            } else f = {
                buttonOk: {
                    "class": "btn btn-primary " + h,
                    "data-dismiss": "modal",
                    label: "ok",
                    "aria-label": "ok"
                }
            }, 0 == MyModal.prototype.singleton && (new MyModal("fade", "modal-sm", "Komunikat", "<p>Nie masz uprawnie\u0144 do modyfikacji tego wydarzenia!</p>", f)).destroy()
        },
        dayClick: function (a, c, e) {
            $(this).css("background-color", "rgba(188,255,188,0.9)");
            if (0 == MyModal.prototype.singleton) {
                var f = new MyModal("fade", mm.matches ? "" : "modal-lg", "Nowe wydarzenie", myNewInputs, footerButtons);
                $("#eventEndDate").attr("min", a.format());
                f.buttonsArray.buttonOk.on("click", function (a) {
                    addNewEvent(f.myForm.checkRequiredFields($("#allDayEvent").prop("checked")))
                });
                f.myForm.inputsArray.allDayEvent.on("click", function (a) {
                    $(a.target).prop("checked") ? ($("#eventStartTime").prop("disabled", !0), $("#eventEndTime").prop("disabled", !0)) : ($("#eventStartTime").prop("disabled", !1), $("#eventEndTime").prop("disabled", !1))
                });
                f.myForm.inputsArray.eventStartDate.on("change", function (a) {
                    $("#eventEndDate").attr("min", this.value)
                });
                f.destroy(this);
                $("#eventStartDate").val(a.format())
            }
        },
        eventMouseover: function (a, c, e) {
            if ("month" == e.name) {
                e = [];
                var f = [],
                    h = etime = edate = lasting = description =
                        "",
                    f = a.start.format().split("T");
                null != a.end && (e = a.end.format().split("T"), edate = "</br>Ko\u0144czy si\u0119</br>Dnia: <b>" + e[0] + "</b>", void 0 != e[1] && (etime = " o godzinie: <b>" + e[1] + "</b>", edate += etime));
                a.allDay ? lasting = "</br>Czas trwania: <b> ca\u0142y dzie\u0144.</b>" : void 0 != f[1] && void 0 != e[1] && (lasting = "</br>Czas trwania: " + eventLasting(a));
                void 0 != f[1] && (h = " o godzinie: <b>" + f[1] + "</b>");
                void 0 != a.description && (description = "</br>" + a.description);
                e = "Rozpoczyna si\u0119</br>Dnia: <b>" + f[0] + "</b>" +
                    h;
                e += edate + lasting + description;
                $(this).popover({
                    container: $("body"),
                    html: !0,
                    title: a.title,
                    content: e,
                    placement: getPosition(c)
                });
                $(this).popover("show")
            }
        },
        eventMouseout: function (a, c, e) {
            "month" == e.name && ($(this).popover("destroy"), $(".fc-row.fc-rigid").css("overflow", "hidden"), $(this).closest(".widget-box").css("overflow", "hidden"))
        }
    })
}, destroyCalendar = function () {
    $("#calendar").fullCalendar("destroy")
}, renderCalendar = function () {
    $("#calendar").fullCalendar("render")
}, myRefreshCalendar = function (a) {
    var d =
        1.35;
    "" != a && (d = a);
    $("#calendar").fullCalendar("option", "aspectRatio", d);
    $("#calendar").fullCalendar("render")
}, changeCallendarFontSize = function (a) {
    $(".fc").css("font-size", a + "em")
}, adjustCalendarToWidth = function (a) {
    mm.matches ? 500 <= a && 600 > a ? (changeCallendarFontSize(.9), myRefreshCalendar(1.25)) : 480 <= a && 500 > a ? (changeCallendarFontSize(.8), myRefreshCalendar(1.2)) : 410 <= a && 480 > a ? (changeCallendarFontSize(.75), myRefreshCalendar(1.15)) : 350 <= a && 410 > a ? (changeCallendarFontSize(.7), myRefreshCalendar(1.1)) : 325 <=
        a && 350 > a ? (changeCallendarFontSize(.7), myRefreshCalendar(1.05)) : 305 <= a && 325 > a ? (changeCallendarFontSize(.65), myRefreshCalendar(1)) : 250 <= a && 305 > a ? (changeCallendarFontSize(.6), myRefreshCalendar(1)) : 200 <= a && 250 > a ? (changeCallendarFontSize(.5), myRefreshCalendar(.95)) : 165 <= a && 200 > a ? (changeCallendarFontSize(.5), myRefreshCalendar(.8)) : 144 <= a && 165 > a ? (changeCallendarFontSize(.5), myRefreshCalendar(.7)) : 123 <= a && 144 > a ? (changeCallendarFontSize(.5), myRefreshCalendar(.6)) : 100 <= a && 123 > a ? (changeCallendarFontSize(.4),
            myRefreshCalendar(.6)) : 63 <= a && 100 > a ? (changeCallendarFontSize(.3), myRefreshCalendar(.3)) : 63 > a ? (changeCallendarFontSize(.2), myRefreshCalendar(.3)) : (changeCallendarFontSize(.95), myRefreshCalendar("")) : (changeCallendarFontSize(.45), myRefreshCalendar(1))
}, addNewEvent = function (a) {
    if (void 0 != a && null != a) {
        var d = {
            id: "userEvent-",
            title: "Wydarzenie",
            start: "20150707",
            end: "",
            url: "",
            className: "user-event",
            editable: !0,
            description: ""
        }, c;
        for (c in a) "eventName" == a[c].name && void 0 != a[c].value && "" != a[c].value && (d.title =
            a[c].value), "eventStartDate" == a[c].name && void 0 != a[c].value && "" != a[c].value && (d.start = a[c].value), "eventEndDate" == a[c].name && void 0 != a[c].value && "" != a[c].value && (d.end = a[c].value), "allDayEvent" == a[c].name && void 0 != a[c].value && "on" == a[c].value && (d.allDay = !0), "eventStartTime" == a[c].name && void 0 != a[c].value && "" != a[c].value && (d.start += "T" + a[c].value + ":00"), "eventEndTime" == a[c].name && void 0 != a[c].value && "" != a[c].value && (d.end += "T" + a[c].value + ":00"), "eventDescription" == a[c].name && void 0 != a[c].value && "" !=
            a[c].value && (d.description = a[c].value);
        localStorage.getItem("userEvents") ? (a = $.parseJSON(localStorage.getItem("userEvents")), c = a.length++, d.id += c, a["userEvent-" + c] = d) : (a = {
            length: 1
        }, d.id += 0, a["userEvent-0"] = d);
        void 0 != a && null != a && ($("#calendar").fullCalendar("renderEvent", d, !0), localStorage.setItem("userEvents", parseToString(a)), $("#myModal").trigger("hidden.bs.modal"))
    }
}, onEventChange = function (a, d, c) {
    d = {};
    localStorage.getItem("userEvents") ? (d = $.parseJSON(localStorage.getItem("userEvents")), c = d[a.id],
        c.start = null != a.start ? a.start.format() : "2015-01-01", null != a.end && (c.end = a.end.format())) : (d.length = 1, d["userEvent-0"] = {
            id: "userEvent-0",
            title: a.title,
            allDay: a.allDay,
            className: "user-event",
            description: a.description
        }, null != a.start && (d["userEvent-0"].start = a.start.format()), null != a.end && (d["userEvent-0"].end = a.end.format()));
    void 0 != d && localStorage.setItem("userEvents", parseToString(d))
}, changeEvent = function (a, d, c, e) {
    if (void 0 != e && null != e) {
        d = {};
        c = {
            id: "",
            title: "",
            start: "",
            end: "",
            url: "",
            className: "user-event",
            editable: !0,
            description: ""
        };
        for (var f in e) "eventName" == e[f].name && void 0 != e[f].value && "" != e[f].value && (a.title = c.title = e[f].value), "eventStartDate" == e[f].name && void 0 != e[f].value && "" != e[f].value && (a.start = c.start = e[f].value), "eventEndDate" == e[f].name && void 0 != e[f].value && "" != e[f].value && (a.end = c.end = e[f].value), "allDayEvent" == e[f].name && void 0 != e[f].value && "on" == e[f].value && (a.allDay = c.allDay = !0), "eventStartTime" == e[f].name && void 0 != e[f].value && "" != e[f].value && (a.start += "T" + e[f].value, c.start = a.start,
            a.allDay = !1), "eventEndTime" == e[f].name && void 0 != e[f].value && "" != e[f].value && (a.end += "T" + e[f].value, c.end = a.end), "eventDescription" == e[f].name && void 0 != e[f].value && "" != e[f].value && (a.description = c.description = e[f].value);
        localStorage.getItem("userEvents") ? (d = $.parseJSON(localStorage.getItem("userEvents")), c.id = a.id, d[a.id] = c) : (d.length = 1, a.id = "userEvent-0", c.id = a.id, d["userEvent-0"] = c);
        void 0 != d && null != d && ($("#calendar").fullCalendar("updateEvent", a), localStorage.setItem("userEvents", parseToString(d)),
            $("#myModal").trigger("hidden.bs.modal"))
    }
}, removeEvent = function (a, d) {
    $("#myModal").trigger("hidden.bs.modal");
    var c = {
        buttonAnuluj: {
            "class": "btn btn-default " + btnSize,
            label: "Anuluj",
            "data-dismiss": "modal",
            "aria-label": "Anuluj"
        },
        buttonRemoveEvent: {
            "class": "btn btn-danger " + btnSize,
            label: "Usu\u0144",
            "aria-label": "Usu\u0144"
        }
    }, e = "<p>Czy na pewno chcesz trwale usun\u0105\u0107 wydarzenie: <b>" + a.title + "</b>?</p>";
    0 == MyModal.prototype.singleton && (c = new MyModal("fade", "modal-sm", "Komunikat", e, c), c.buttonsArray.buttonRemoveEvent.on("click",
        function (c) {
            c = a.id;
            if (localStorage.getItem("userEvents")) {
                var d = $.parseJSON(localStorage.getItem("userEvents"));
                delete d[c];
                d.length--;
                0 < d.length ? localStorage.setItem("userEvents", parseToString(d)) : localStorage.removeItem("userEvents");
                $("#calendar").fullCalendar("removeEvents", c);
                $("#myModal").trigger("hidden.bs.modal")
            }
        }), c.destroy())
}, eventLasting = function (a) {
    var d = new Date(a.start.format());
    a = (new Date(a.end.format())).getTime() - d.getTime();
    d = Math.floor(a / 36E5);
    a = Math.round(d / 24);
    d = d % 24 ? d % 24 +
        "h" : "";
    return 1 <= a ? "<b>" + a + " dni " + d + "</b>." : "<b>" + d + "</b>."
}, getPosition = function (a) {
    a = a.clientY;
    var d = "";
    230 > a ? (d = "bottom", console.log("200 > " + a)) : (d = "top", console.log("200 < " + a));
    return d
}, myaspectRetio = 1.35,
    linksHrefs = "#Moja lista;#Moje projekty;#Alerty;#Komunikaty;#Kalendarz;#Karta pracy".split(";"),
    widgetsNames = "WidgetBox01 WidgetBox02 WidgetBox03 WidgetBox04 WidgetBox05 WidgetBox06".split(" ");
setHashPulpit("#Pulpit");
$("document").ready(function () {
    var a = function (a) {
        if (localStorage.getItem(a)) {
            "auto" == $("html").css("overflow-y") && $("html").css("overflow-y", "hidden");
            var d = "#" + a,
                f = $.parseJSON(localStorage.getItem(a));
            $(d).is(".collapsed") && ($(d).removeClass("collapsed"), $(d).find(".fa-chevron-down").addClass("fa-chevron-up").removeClass("fa-chevron-down"), "none" == $(d).find(".widget-body").css("display") && $(d).find(".widget-body").css("display", "block"));
            if ("none" == $(d).css("display")) $(d).show(), "#WidgetBox05" ==
                d && (destroyCalendar(), initCalendar(myaspectRetio), d = parseInt($("#calendar").css("width")), adjustCalendarToWidth(d)), f.WBVisible = !0;
            else {
                $.each(widgetsNames, function (a, c) {
                    if (localStorage.getItem(c)) {
                        var d = $.parseJSON(localStorage.getItem(c));
                        d.WBFullscreen = "";
                        localStorage.setItem(c, parseToString(d))
                    }
                });
                $(".widget-box").removeClass("fullscreen");
                $(d).addClass("fullscreen");
                var h = parseInt($("#calendar").css("width"));
                adjustCalendarToWidth(h);
                $(".widget-box").find(".widget-body").is("#scrollContainer") &&
                    (console.log("is scrollContainer"), $("#scrollContainer").perfectScrollbar("destroy"), $(".widget-body").removeAttr("id"));
                $(d).find(".widget-body").attr("id", "scrollContainer");
                $("#scrollContainer").perfectScrollbar();
                f.WBFullscreen = "fullscreen"
            }
            localStorage.setItem(a, parseToString(f))
        } else console.log("Nie ma localStorage->" + a), alert("Nie ma localStorage->" + a)
    };
    $("#navbar-main>ul>li>a").on("click", function (c) {
        c = $(c.target).attr("href");
        mm.matches || ($(".navbar-toggle").removeClass("collapsed"), $(".navbar-collapse").removeClass("in"));
        c == linksHrefs[0] ? a(widgetsNames[0]) : c == linksHrefs[1] ? (a(widgetsNames[1]), $("#myTable").jsGrid("refresh")) : c == linksHrefs[2] ? a(widgetsNames[2]) : c == linksHrefs[3] ? a(widgetsNames[3]) : c == linksHrefs[4] ? a(widgetsNames[4]) : c == linksHrefs[5] && a(widgetsNames[5])
    });
    $(".navbar-brand").on("click", function (a) {
        linkHref = $(a.target).attr("href");
        locationHash = location.hash;
        name = widgetsNames[$.inArray(locationHash, linksHrefs)];
        idName = "#" + name;
        "hidden" == $("html").css("overflow-y") && $("html").css("overflow-y", "auto");
        if (localStorage.getItem(name)) {
            var d =
                $.parseJSON(localStorage.getItem(name));
            "collapsed" === d.WBCollapsed && ($(idName).addClass("collapsed"), $(idName).find(".fa-chevron-down").addClass("fa-chevron-down").removeClass("fa-chevron-up"), "block" == $(idName).find(".widget-body").css("display") && $(idName).find(".widget-body").css("display", "none"));
            if ("#Pulpit" == linkHref && $(".widget-box").is(".fullscreen"))
                if ($(".widget-box").removeClass("fullscreen"), d.WBFullscreen = "", $("#scrollContainer").perfectScrollbar("destroy"), $(".widget-body").removeAttr("id"),
                    "WidgetBox05" === name) {
                    var f = parseInt($("#calendar").css("width"));
                    adjustCalendarToWidth(f)
                } else "WidgetBox02" === name && $("#myTable").jsGrid("refresh");
            localStorage.setItem(name, parseToString(d))
        }
        a.stopPropagation()
    });
    (function () {
        var a, e;
        $.ajax({
            type: "GET",
            url: "json/myalerts.json",
            dataType: "json",
            success: function (f, h, g) {
                a = $.extend({}, f);
                e = new Div;
                for (k in a) e.append((new d(a[k].type, a[k].content)).get())
            },
            error: function (a, c, d) {
                console.log("nie powiodlo sie z ajaxem poniewa\u017c >> " + c + " " + d)
            }
        }).then(function () {
            var a;
            $.ajax({
                type: "GET",
                url: "json/desktop.json",
                dataType: "json",
                success: function (c, d, l) {
                    a = $.extend({}, c);
                    for (var m in a.WidgetList) "WidgetBox04" != m && "WidgetBox03" != m && "WidgetBox05" != m && (a.WidgetList[m].WBBodyRenderFunction = function () {
                        return "<h5>Hello World</h5>"
                    });
                    a.WidgetList.WidgetBox04.WBBodyRenderFunction = function () {
                        return "<div id='accordion'></div>"
                    };
                    a.WidgetList.WidgetBox02.WBBodyRenderFunction = function () {
                        return "<div id='myTable'></div>"
                    };
                    a.WidgetList.WidgetBox03.WBBodyRenderFunction = function () {
                        return e.html()
                    };
                    a.WidgetList.WidgetBox05.WBBodyRenderFunction = function () {
                        return "<div id='calendar'></div>"
                    };
                    TDesktop("body", a);
                    initCalendar(myaspectRetio);
                    c = parseInt($("#calendar").css("width"));
                    adjustCalendarToWidth(c);
                    addAccordion();
                    addTable()
                },
                error: function (a, c, d) {
                    console.log("nie powiodlo sie z ajaxem bo >> " + c + " " + d)
                }
            })
        })
    })();
    var d = function (a, d) {
        if ("" != d) {
            this.body = new Div;
            this.body.addClass("alert alert-dismissible");
            switch (a.toLowerCase()) {
                case "r":
                    this.body.addClass("alert-danger");
                    break;
                case "g":
                    this.body.addClass("alert-success");
                    break;
                case "b":
                    this.body.addClass("alert-info");
                    break;
                case "y":
                    this.body.addClass("alert-warning");
                    break;
                default:
                    this.body.addClass("alert-info")
            }
            this.body.append(d);
            this.get = function () {
                return this.body
            }
        }
    }
});