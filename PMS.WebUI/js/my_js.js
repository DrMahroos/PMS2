/*global $*/
$(document).ready(function () {
    "use strict";
    $(".message1").click(function () {
        // $(".message1").children("#rdSms").prop("checked", true);
        //  $("#AM").children("#rdSms").prop("checked", true);
        // $(this).children("#rdSms").prop("checked", true);
        $(this).children(".mess-on").toggle();
        $(this).children(".mess-off").toggle();

        //rdSms1
    });

    $(".drop_list").hover(function () {
        $(this).children(".sub-menu").fadeToggle(1);

    });

    $(".budget_breakdown").click(function () {
        $("#Budgetbreak").slideToggle();
        $("#defination").slideToggle();

        
    });

    $(".btn-stage").click(function () {
        $("#stage .form-group").slideToggle();
        $("#offeritem .form-group").hide();
        $("#specification .form-group").hide();
        $("#custresp .form-group").hide();
        $("#custinformation .form-group").hide();
        $("#payment .form-group").hide();
    });
    $(".btn-offeritem").click(function () {
        $("#stage .form-group").hide();
        $("#offeritem .form-group").slideToggle();
        $("#specification .form-group").hide();
        $("#custresp .form-group").hide();
        $("#custinformation .form-group").hide();
        $("#payment .form-group").hide();
    });
    $(".btn-specification").click(function () {
        $("#stage .form-group").hide();
        $("#offeritem .form-group").hide();
        $("#specification .form-group").slideToggle();
        $("#custresp .form-group").hide();
        $("#custinformation .form-group").hide();
        $("#payment .form-group").hide();
    });
    $(".btn-custresp").click(function () {
        $("#stage .form-group").hide();
        $("#offeritem .form-group").hide();
        $("#specification .form-group").hide();
        $("#custresp .form-group").slideToggle();
        $("#custinformation .form-group").hide();
        $("#payment .form-group").hide();
    });
    $(".btn-custinformation").click(function () {
        $("#stage .form-group").hide();
        $("#offeritem .form-group").hide();
        $("#specification .form-group").hide();
        $("#custresp .form-group").hide();
        $("#custinformation .form-group").slideToggle();
        $("#payment .form-group").hide();
    });
    $(".btn-payment").click(function () {
        $("#stage .form-group").hide();
        $("#offeritem .form-group").hide();
        $("#specification .form-group").hide();
        $("#custresp .form-group").hide();
        $("#custinformation .form-group").hide();
        $("#payment .form-group").slideToggle();
    });
    $(".btn_bill").click(function () {
        $("#Bill_Items .form-group").slideToggle();
        $("#Outstanding_Production .form-group").hide();
    });
    $(".btn_outstanding").click(function () {
        $("#Bill_Items .form-group").hide();
        $("#Outstanding_Production .form-group").slideToggle();
    });
    $(".btn_offer").click(function () {
        $("#Offer_Items .form-group").slideToggle();
        $("#Item_Activity .form-group").hide();
        $("#Standard_Ratios .form-group").hide();
        $("#USED_Ratios .form-group").hide();
    });
    $(".btn_Item").click(function () {
        $("#Offer_Items .form-group").hide();
        $("#Item_Activity .form-group").slideToggle();
        $("#Standard_Ratios .form-group").hide();
        $("#USED_Ratios .form-group").hide();
    });
    $(".btn_Standard").click(function () {
        $("#Offer_Items .form-group").hide();
        $("#Item_Activity .form-group").hide();
        $("#Standard_Ratios .form-group").slideToggle();
        $("#USED_Ratios .form-group").hide();
    });
    $(".btn_used").click(function () {
        $("#Offer_Items .form-group").hide();
        $("#Item_Activity .form-group").hide();
        $("#Standard_Ratios .form-group").hide();
        $("#USED_Ratios .form-group").slideToggle();
    });
    $(".btn1").click(function () {
        $("#Material .form-group").slideToggle();
        $("#Labor .form-group").hide();
        $("#Equipment .form-group").hide();
    });
    $(".btn2").click(function () {
        $("#Labor .form-group").slideToggle();
        $("#Material .form-group").hide();
        $("#Equipment .form-group").hide();
    });

    $(".btn3").click(function () {
        $("#Equipment .form-group").slideToggle();
        $("#Material .form-group").hide();
        $("#Labor .form-group").hide();
    });


    $(".btn_parent").click(function () {
        $("#parentgrid .form-group").slideToggle();
        $("#parentchild .form-group").hide();
        $("#parentchildchild .form-group").hide();
    });

    $(".btn_child").click(function () {
        $("#parentgrid .form-group").hide();
        $("#parentchild .form-group").slideToggle();
        $("#parentchildchild .form-group").hide();
    });

    $(".btn_childChild").click(function () {
        $("#parentgrid .form-group").hide();
        $("#parentchild .form-group").hide();
        $("#parentchildchild .form-group").slideToggle();
    });

    $(".summary_btn").click(function () {
        $("#projectexpense .form-group").slideToggle();
        $("#projectdetial .form-group").hide();
    });

    $(".detial_btn").click(function () {
        $("#projectexpense .form-group").hide();
        $("#projectdetial .form-group").slideToggle();

    });
    
    $(".Activitybtn").click(function () {
        $("#activity .form-group").slideToggle();
    });

    $('.flat-toggle').on('click', function () {
        $(this).toggleClass('on');
    });

    $(".email1").click(function () {
        // $(this).children("#rdEmail").prop("checked", true);

        $(this).children(".email-on").toggle();
        $(this).children(".email-off").toggle();
    });

    $(".nothing").click(function () {
        //   $(this).children("#rdnon").prop("checked", true);
        //  $(this).children("#rdnon1").prop("checked", true);
        $(this).children(".no-on").toggle();
        $(this).children(".no-off").toggle();

    });

    $(".send_btn").click(function () {
        $(".yourdiv").css({ "opacity": "0.5" });
        $(".loading-pic").show();
    });

    $("#dir").click(function () {
        $("footer").animate({ "left": "0", "margin-left": "0px" });
        $("#dir").hide();

    });

    $("#dir_2").click(function () {
        $("footer").animate({ "left": "-85%", });
        $("#dir").fadeIn(3000);
    });

    $(".total .btn-danger").click(function () {
        $("#effects").animate({ "background-color": "#f5bab9" });
        $("#effects").fadeIn(4000);
        $("#effects").toggleClass('animate');
    });
    $(".total .btn-primary").click(function () {
        $("#effects").animate({ "background-color": "#bfdbf5" });
        $("#effects").fadeIn(4000);
        $("#effects").toggleClass('animate1');
    });

    $(".deleg-btn").click(function () {
        if ($("i.fa-angle-double-right").css('display') == 'none') {
            $("i.fa-angle-double-right").toggle();
            $("i.fa-angle-double-left").toggle();
        }
        else {
            $("i.fa-angle-double-left").toggle();
            $("i.fa-angle-double-right").toggle();
        }
    });
    $(".deleg-btn").click(function () {
        $(".delegation-slide").animate({ "width": "toggle", "left": "0" }, 1000);
    });

    $("#approve").click(function () {
        $(this).hide();
        $("#expired").show();
    });
    $("#expired").click(function () {
        $(this).hide();
        $("#approve").show();
    });

    $(".modal-open").click(function () {
        $('.modal').fadeOut();
    });

    $(".tooltip_icon").click(function () {
        $(".main_tooltip").slideToggle();

    });


    $(".main_tooltip, .yourdiv,#dir, footer, .favourite_icon, .color1 ").click(function () {
        $(".main_tooltip").slideUp();

    });
    $(".change_btn").click(function () {
        $(".user_1").slideUp();
        $(".user_2").slideDown();


    });
    $(".btn_back").click(function () {
        $(".user_1").slideDown();
        $(".user_2").slideUp();
    });

    $('.next').click(function (event) {
        $(".yourdiv")
            .animate({
                left: 25,
                opacity: .4,
            }, {
                duration: 'normal',
                easing: 'easeOutBounce'
            })
    });
    $('.next').click(function (event) {
        $(".yourdiv")
            .removeAttr("style")
            .animate({
                "left": "0",
                opacity: 1,
            })
    });

    $('.previous').click(function (event) {
        $(".yourdiv")
            .animate({
                right: 25,
                opacity: .4,
            }, {
                duration: 'normal',
                easing: 'easeOutBounce'

            })

    });

    $('.previous').click(function (event) {
        $(".yourdiv")
            .removeAttr("style")
            .animate({
                "right": "0",
                opacity: 1,
            })
    });


    $('.first').click(function () {
        $(".yourdiv").show("slide",
            { direction: "down" }, 700);



    });
    $('.last').click(function (event) {
        $(".yourdiv")
            .slideUp({
                duration: 'slow',
            })

    });
    $('.last').click(function () {
        $(".yourdiv")
            .slideDown({
                duration: 'slow',
            })


    });


    $(".first").click(function () {
        $(".yourdiv").hide("slide",
            { direction: "down" }, 700);
    });

    //e.stopPropagation();
    //return false;


    setTimeout(function () {
        $('.yourdiv').addClass('magictime slideUpRetourn');
    }, 0);

    setTimeout(function () {
        $('.yourdiv').removeClass('magictime slideUpRetourn');
    }, 800);

    setTimeout(function () {
        $('.header').show();
    }, 700);

    setTimeout(function () {
        $('.header').addClass('magictime foolishIn');
    }, 700);


    $(".btn_def").click(function () {
        $("#projectphase .form-group").slideToggle();
        $("#def_item .form-group").hide();
    });


    $(".btn_def_item").click(function () {
        $("#def_item .form-group").slideToggle();
        $("#projectphase .form-group").hide();
    });


    $(".projectphase").click(function () {
        $("#projectactivityphase .form-group").slideToggle();
        $("#Project_specification .form-group").hide();

    });


    $(".project_item_btn").click(function () {
        $("#Project_specification .form-group").slideToggle();
        $("#projectactivityphase .form-group").hide();

    });

    //$(".laborclass").click(function () {
    //    $("#laborsec .form-group").slideToggle();
    //    $("#laborssec .form-group").hide();
    //    $("#equipments .form-group").hide();
    //    $("#equipmentsec .form-group").hide();
    //    $("#worksecdule .form-group").hide();
    //    $("#materialSec .form-group").hide();

    //});


    //$(".equipmetclass").click(function () {
    //    $("#equipmentsec").slideToggle();
    //    $("#laborsec .form-group").slideUp();
    //    $("#laborssec .form-group").slideUp();
    //    $("#equipments .form-group").slideUp();
    //    $("#worksecdule .form-group").slideUp();
    //    $("#materialSec .form-group").slideUp();

    //});

    //$(".laborsclass").click(function () {
    //    $("#equipmentsec .form-group").hide();
    //    $("#laborssec .form-group").slideToggle();
    //    $("#equipments .form-group").hide();
    //    $("#laborsec .form-group").hide();
    //    $("#worksecdule .form-group").hide();
    //    $("#materialSec .form-group").hide();

    //});


    //$(".equipmentsclass").click(function () {
    //    $("#equipmentsec .form-group").hide();
    //    $("#equipments .form-group").slideToggle();
    //    $("#laborssec .form-group").hide();
    //    $("#laborsec .form-group").hide();
    //    $("#worksecdule .form-group").hide();
    //    $("#materialSec .form-group").hide();

    //});


    //$(".worksecdule").click(function () {
    //    $("#worksecdule .form-group").slideToggle();
    //    $("#equipmentsec .form-group").hide();
    //    $("#equipments .form-group").hide();
    //    $("#laborssec .form-group").hide();
    //    $("#laborsec .form-group").hide();
    //    $("#materialSec .form-group").hide();

    //});


    //$(".material_btn").click(function () {
    //    $("#materialSec .form-group").slideToggle();
    //    $("#worksecdule .form-group").hide();
    //    $("#equipmentsec .form-group").hide();
    //    $("#equipments .form-group").hide();
    //    $("#laborssec .form-group").hide();
    //    $("#laborsec .form-group").hide();
    //});



    $(".workactivitybtn").click(function () {
        $("#gridactivity .form-group").slideToggle();
        $("#equipmentclass .form-group").hide();
        $("#laborclass .form-group").hide();
        $("#labors .form-group").hide();
        $("#Equipment .form-group").hide();
        $("#Material .form-group").hide();
    });

    $(".laborclass").click(function () {
        $("#gridactivity .form-group").hide();
        $("#laborclass .form-group").slideToggle();
        $("#equipmentclass .form-group").hide();
        $("#labors .form-group").hide();
        $("#Equipment .form-group").hide();
        $("#Material .form-group").hide();

    });

    $(".Equipmentbtnclass").click(function () {
        $("#gridactivity .form-group").hide();
        $("#laborclass .form-group").hide();
        $("#equipmentclass .form-group").slideToggle();
        $("#labors .form-group").hide();
        $("#Equipment .form-group").hide();
        $("#Material .form-group").hide();

    });


    $(".Labors").click(function () {
        $("#gridactivity .form-group").hide();
        $("#laborclass .form-group").hide();
        $("#equipmentclass .form-group").hide();
        $("#labors .form-group").slideToggle();
        $("#Equipment .form-group").hide();
        $("#Material .form-group").hide();

    });
    $(".Equipment").click(function () {
        $("#gridactivity .form-group").hide();
        $("#laborclass .form-group").hide();
        $("#equipmentclass .form-group").hide();
        $("#labors .form-group").hide();
        $("#Equipment .form-group").slideToggle();
        $("#Material .form-group").hide();

    });


    $(".Materialbtn").click(function () {
        $("#gridactivity .form-group").hide();
        $("#laborclass .form-group").hide();
        $("#equipmentclass .form-group").hide();
        $("#labors .form-group").hide();
        $("#Equipment .form-group").hide();
        $("#Material .form-group").slideToggle();

    });

    
    
    


    $(".show_contract").click(function () {
        $("#contractsec").slideToggle();
        $("#serviceordersec").hide();
        $("#productionentry").hide();

    });


    $(".show_service").click(function () {
        $("#serviceordersec").slideToggle();
        $("#contractsec").hide();
        $("#productionentry").hide();

    });


    $(".product_entry").click(function () {
        $("#productionentry").slideToggle();
        $("#contractsec").hide();
        $("#serviceordersec").hide();
    });

    $(".byproject").click(function () {
        $("#byprojectsec").slideToggle();
        $("#byphasesec").hide();
        $("#byactivitysec").hide();
    });

    $(".product_labor").click(function () {
        $("#onproductionlabors").slideToggle();
        $("#onproductionequipment").hide();
        $("#onproductsec").hide();
    });

    $(".schedulegrid").click(function () {
        $("#secduleandservice .form-group").slideToggle();
        $("#requestseq .form-group").hide();
    });


    $(".btnlabor_asgin_labors").click(function () {
        $("#labors .form-group").slideToggle();
        $("#laborsclass .form-group").hide();
        $("#freelaborss .form-group").hide();
        $(".searchdate").hide();
    });

    $(".btnlabor_asgin_laborsclass").click(function () {
        $("#labors .form-group").hide();
        $("#laborsclass .form-group").slideToggle();
        $(".searchdate").hide();
        $("#freelaborss .form-group").hide();
    });
    
    $(".btnlabor_asgin_freelabors").click(function () {
        $("#labors .form-group").hide();
        $("#laborsclass .form-group").hide();
        $(".searchdate").fadeToggle();
        $("#freelaborss .form-group").slideToggle();

    });


    $(".btn-labor_requirment").click(function () {
        $("#laborrequirmentsec .form-group").slideToggle();
        $("#freelaborssec .form-group").hide();
        $(".searchdate").hide();
    });

    $(".btn-freelabor").click(function () {
        $("#laborrequirmentsec .form-group").hide();
        $("#freelaborssec .form-group").slideToggle();
    });

    $(".rquestgrid").click(function () {
        $("#requestseq .form-group").slideToggle();
        $("#secduleandservice .form-group").hide();
    });

    $(".Production_btn").click(function () {
        $("#production .form-group").slideToggle();
        $("#billitems .form-group").hide();
    });



    $(".Activty_btn").click(function () {
        $("#onproductsec").slideToggle();
        $("#onproductionlabors").hide();
        $("#onproductionequipment").hide();
    });


    $(".billitems_btn").click(function () {
        $("#billitems .form-group").slideToggle();
        $("#production .form-group").hide();
    });

    $(".production_equip_btn").click(function () {
        $("#onproductionequipment").slideToggle();
        $("#onproductionlabors").hide();
        $("#onproductsec").hide();
    });

    $(".byphase").click(function () {
        $("#byphasesec").slideToggle();
        $("#byprojectsec").hide();
        $("#byactivitysec").hide();
    });


    $(".byactivity").click(function () {
        $("#byactivitysec").slideToggle();
        $("#byprojectsec").hide();
        $("#byphasesec").hide();
    });


    $(".btn_laborlist").click(function () {
        $("#laborlistsec .form-group").slideToggle();
        $("#laborclass .form-group").hide();
    });

    $(".btn_laborrequirment").click(function () {
        $("#laborclass .form-group").slideToggle();
        $("#laborlistsec .form-group").hide();
    });


    $(".btnlaborequipment").click(function () {
        $("#Equipments .form-group").slideToggle();
        $("#Equipmentclassrequirment .form-group").hide();
        $("#freequipment .form-group").hide();
    });



    $(".btnlaborequipmentclass").click(function () {
        $("#Equipments .form-group").hide();
        $("#Equipmentclassrequirment .form-group").slideToggle();
        $("#freequipment .form-group").hide();
    });


    $(".progressbtn").click(function () {
        $("#projectprogress .form-group").slideToggle();
        $("#projectprocess .form-group").hide();
        $("#projectitem .form-group").hide();
        $("#projectprocessitem .form-group").hide();
    });

    $(".progresspricebtn").click(function () {
        $("#projectprogress .form-group").hide();
        $("#projectprocess .form-group").hide();
        $("#projectitem .form-group").slideToggle();
        $("#projectprocessitem .form-group").hide();
    });

    $(".byactivtiybtn").click(function () {
        $("#projectprogress .form-group").hide();
        $("#projectprocess .form-group").slideToggle();
        $("#projectitem .form-group").hide();
        $("#projectprocessitem .form-group").hide();
    });


    $(".byitembtn").click(function () {
        $("#projectprogress .form-group").hide();
        $("#projectprocess .form-group").hide();
        $("#projectitem .form-group").hide();
        $("#projectprocessitem .form-group").slideToggle();
    });


    $(".btnlaborfreeequipment").click(function () {
        $("#Equipments .form-group").hide();
        $("#Equipmentclassrequirment .form-group").hide();
        $("#freequipment .form-group").slideToggle();
        $(".searchdate").fadeToggle();
    });




    //$.widget("custom.combobox", {
    //    _create: function () {
    //        this.wrapper = $("<span>")
    //            .addClass("custom-combobox")
    //            .insertAfter(this.element);

    //        this.element.hide();
    //        this._createAutocomplete();
    //        this._createShowAllButton();
    //    },

    //    _createAutocomplete: function () {
    //        var selected = this.element.children(":selected"),
    //            value = selected.val() ? selected.text() : "";

    //        this.input = $("<input>")
    //            .appendTo(this.wrapper)
    //            .val(value)
    //            .attr("title", "")
    //            .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
    //            .autocomplete({
    //                delay: 0,
    //                minLength: 0,
    //                source: $.proxy(this, "_source")
    //            })
    //            .tooltip({
    //                classes: {
    //                    "ui-tooltip": "ui-state-highlight"
    //                }
    //            });

    //        this._on(this.input, {
    //            autocompleteselect: function (event, ui) {
    //                ui.item.option.selected = true;
    //                this._trigger("select", event, {
    //                    item: ui.item.option
    //                });
    //            },

    //            autocompletechange: "_removeIfInvalid"
    //        });
    //    },

    //    _createShowAllButton: function () {
    //        var input = this.input,
    //            wasOpen = false;

    //        $("<a>")
    //            .attr("tabIndex", -1)
    //            .attr("title", "Show All Items")
    //            .tooltip()
    //            .appendTo(this.wrapper)
    //            .button({
    //                icons: {
    //                    primary: "ui-icon-triangle-1-s"
    //                },
    //                text: false
    //            })
    //            .removeClass("ui-corner-all")
    //            .addClass("custom-combobox-toggle ui-corner-right")
    //            .on("mousedown", function () {
    //                wasOpen = input.autocomplete("widget").is(":visible");
    //            })
    //            .on("click", function () {
    //                input.trigger("focus");

    //                // Close if already visible
    //                if (wasOpen) {
    //                    return;
    //                }

    //                // Pass empty string as value to search for, displaying all results
    //                input.autocomplete("search", "");
    //            });
    //    },

    //    _source: function (request, response) {
    //        var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
    //        response(this.element.children("option").map(function () {
    //            var text = $(this).text();
    //            if (this.value && (!request.term || matcher.test(text)))
    //                return {
    //                    label: text,
    //                    value: text,
    //                    option: this
    //                };
    //        }));
    //    },

    //    _removeIfInvalid: function (event, ui) {

    //        // Selected an item, nothing to do
    //        if (ui.item) {
    //            return;
    //        }

    //        // Search for a match (case-insensitive)
    //        var value = this.input.val(),
    //            valueLowerCase = value.toLowerCase(),
    //            valid = false;
    //        this.element.children("option").each(function () {
    //            if ($(this).text().toLowerCase() === valueLowerCase) {
    //                this.selected = valid = true;
    //                return false;
    //            }
    //        });

    //        // Found a match, nothing to do
    //        if (valid) {
    //            return;
    //        }

    //        // Remove invalid value
    //        this.input
    //            .val("")
    //            .attr("title", value + " didn't match any item")
    //            .tooltip("open");
    //        this.element.val("");
    //        this._delay(function () {
    //            this.input.tooltip("close").attr("title", "");
    //        }, 2500);
    //        this.input.autocomplete("instance").term = "";
    //    },

    //    _destroy: function () {
    //        this.wrapper.remove();
    //        this.element.show();
    //    }
    //});

    //$(".combobox").combobox();
    $("#toggle").on("click", function () {
        $(".combobox").toggle();
    });

   

    $("#dir_11").click(function () {
        $("#footer_1").animate({ "left": "0", "margin-left": "0px" });
        $("#dir_11").hide();

        $("#footer_2").animate({ "left": "-85%", });
        $("#dir").fadeIn(3000);
    });

    $("#dir_22").click(function () {
        $("#footer_1").animate({ "left": "-85%", });
        $("#dir_11").fadeIn(3000);
    });

    //-----------------------------------------------------

    $("#dir").click(function () {
        $("#footer_2").animate({ "left": "0", "margin-left": "0px" });
        $("#dir").hide();

        $("#footer_1").animate({ "left": "-85%", });
        $("#dir_11").fadeIn(3000);

    });

    $("#dir_2").click(function () {
        $("#footer_2").animate({ "left": "-85%", });
        $("#dir").fadeIn(3000);

    });

    //-----------------------------------------------------

    //-----------------------------------------------------

    $("#dir_DEf").click(function () {
        $("#footer_3").animate({ "left": "0", "margin-left": "0px" });
        $("#dir_DEf").hide();
    });

    $("#dir_DEf2").click(function () {
        $("#footer_3").animate({ "left": "-85%", });
        $("#dir_DEf").fadeIn(3000);
    });

    //-----------------------------------------------------

    $(".total .btn-danger").click(function () {
        $("#effects").css({ "background-color": "#f5bab9" });
        $("#effects").fadeIn(4000);
        $("#effects").toggleClass('animate');
    });
    $(".total .btn-primary").click(function () {
        $("#effects").css({ "background-color": "#bfdbf5" });
        $("#effects").fadeIn(4000);
        $("#effects").toggleClass('animate1');
    });

    $(".deleg-btn").click(function () {
        if ($("i.fa-angle-double-right").css('display') == 'none') {
            $("i.fa-angle-double-right").toggle();
            $("i.fa-angle-double-left").toggle();
        }
        else {
            $("i.fa-angle-double-left").toggle();
            $("i.fa-angle-double-right").toggle();
        }
    });
    $(".deleg-btn").click(function () {
        $(".delegation-slide").animate({ "width": "toggle", "left": "0" }, 1000);
    });
    $(".deleg-btn2").click(function () {
        if ($("i.fa-angle-double-right").css('display') == 'none') {
            $("i.fa-angle-double-right").toggle();
            $("i.fa-angle-double-left").toggle();
        }
        else {
            $("i.fa-angle-double-left").toggle();
            $("i.fa-angle-double-right").toggle();
        }
    });
    $(".deleg-btn2").click(function () {
        $(".delegation-slide1").animate({ "width": "toggle", "left": "0" }, 1000);
        $(".delegation-slide2").hide();
    });
    $(".deleg-btn3").click(function () {
        if ($("i.fa-angle-double-right").css('display') == 'none') {
            $("i.fa-angle-double-right").toggle();
            $("i.fa-angle-double-left").toggle();
        }
        else {
            $("i.fa-angle-double-left").toggle();
            $("i.fa-angle-double-right").toggle();
        }
    });
    $(".deleg-btn3").click(function () {
        $(".delegation-slide2").animate({ "width": "toggle", "left": "0" }, 1000);
        $(".delegation-slide1").hide();
    });
    $("#approve").click(function () {
        $(this).hide();
        $("#expired").show();
    });
    $("#expired").click(function () {
        $(this).hide();
        $("#approve").show();
    });

    $(".modal-open").click(function () {
        $('.modal').fadeOut();
    });

    $(".tooltip_icon").click(function () {
        $(".main_tooltip").slideToggle();

    });


    $(".main_tooltip, .yourdiv,#dir, footer, .favourite_icon, .color1 ").click(function () {
        $(".main_tooltip").slideUp();

    });
    $(".change_btn").click(function () {
        $(".user_1").slideUp();
        $(".user_2").slideDown();


    });
    $(".btn_back").click(function () {
        $(".user_1").slideDown();
        $(".user_2").slideUp();
    });

    $('.next').click(function (event) {
        $(".yourdiv")
            .animate({
                left: 25,
                opacity: .4,
            }, {
                duration: 'normal',
                easing: 'easeOutBounce'
            })
    });


    $('.next').click(function (event) {
        $(".yourdiv")
            .removeAttr("style")
            .animate({
                "left": "0",
                opacity: 1,
            })
    });



    $('.previous').click(function (event) {
        $(".yourdiv")
            .animate({
                right: 25,
                opacity: .4,
            }, {
                duration: 'normal',
                easing: 'easeOutBounce'

            })

    });

    $('.previous').click(function (event) {
        $(".yourdiv")
            .removeAttr("style")
            .animate({
                "right": "0",
                opacity: 1,
            })
    });


    $('.first').click(function () {
        $(".yourdiv").show("slide",
            { direction: "down" }, 700);
    });
    $('.last').click(function (event) {
        $(".yourdiv")
            .slideUp({
                duration: 'slow',
            })

    });
    $('.last').click(function () {
        $(".yourdiv")
            .slideDown({
                duration: 'slow',
            })
    });


    $(".first").click(function () {
        $(".yourdiv").hide("slide",
            { direction: "down" }, 700);
    });

    //e.stopPropagation();
    //return false;


    setTimeout(function () {
        $('.yourdiv').addClass('magictime slideUpRetourn');
    }, 0);

    setTimeout(function () {
        $('.yourdiv').removeClass('magictime slideUpRetourn');
    }, 800);

    setTimeout(function () {
        $('.header').show();
    }, 700);

    setTimeout(function () {
        $('.header').addClass('magictime foolishIn');
    }, 700);



    $(".daily_static_info .box_settings .fa-minus").click(function () {
        $(".daily_static .dily_content").slideUp(500);
        $(this).fadeOut(1);
        $(".daily_static_info .box_settings .fa-plus").fadeIn(1);
    });

    $(".daily_static_info .box_settings .fa-plus").click(function () {
        $(".daily_static .dily_content").slideDown(500);
        $(this).fadeOut(1);
        $(".daily_static_info .box_settings .fa-minus").fadeIn(1);
    });



    $(".monthly_static .box_settings .fa-minus").click(function () {
        $(".monthly_static .dily_content").slideUp(500);
        $(this).fadeOut(1);
        $(".monthly_static .box_settings .fa-plus").fadeIn(1);
    });

    $(".monthly_static .box_settings .fa-plus").click(function () {
        $(".monthly_static .dily_content").slideDown(500);
        $(this).fadeOut(1);
        $(".monthly_static .box_settings .fa-minus").fadeIn(1);
    });



    $(".yearly_income .box_settings .fa-minus").click(function () {
        $(".yearly_income .chart_content").slideUp(500);
        $(this).fadeOut(1);
        $(".yearly_income .box_settings .fa-plus").fadeIn(1);
    });

    $(".yearly_income .box_settings .fa-plus").click(function () {
        $(".yearly_income .chart_content").slideDown(500);
        $(this).fadeOut(1);
        $(".yearly_income .box_settings .fa-minus").fadeIn(1);
    });



    $(".member_yearly .box_settings .fa-minus").click(function () {
        $(".member_yearly .chart_content").slideUp(500);
        $(this).fadeOut(1);
        $(".member_yearly .box_settings .fa-plus").fadeIn(1);
    });

    $(".member_yearly .box_settings .fa-plus").click(function () {
        $(".member_yearly .chart_content").slideDown(500);
        $(this).fadeOut(1);
        $(".member_yearly .box_settings .fa-minus").fadeIn(1);
    });
});




$(".main_menu_user").click(function () {
    $(".user_info").slideToggle(1000);
    $(".notifcations").slideUp();

});





$(".notifcation").click(function () {
    $(".notifcations").slideToggle(1000);
    $(".user_info").slideUp();
});



//var typed2 = new Typed('#typed2', {
//    strings: ['Some &lt;i&gt;strings&lt;/i&gt; with', 'Some &lt;strong&gt;HTML&lt;/strong&gt;', 'Chars &amp;times; &amp;copy;'],
//    typeSpeed: 0,
//    backSpeed: 0,
//    fadeOut: true,
//    loop: true
//});



//var typed2 = new Typed('#typed2', {
//    strings: ['Some &lt;i&gt;strings&lt;/i&gt; with', 'Some &lt;strong&gt;HTML&lt;/strong&gt;', 'Chars &amp;times; &amp;copy;'],
//    typeSpeed: 0,
//    backSpeed: 0,
//    fadeOut: true,
//    loop: true
//});

//ragab

$(".1").slideToggle();
$(".2").slideToggle();
$(".3").slideToggle();
$(".4").slideToggle();
$(".5").slideToggle();
$(".6").slideToggle();
$(".7").slideToggle();
$(".8").slideToggle();
$(".9").slideToggle();
$(".10").slideToggle();

$(".btn_subscribe_child1").click(function () {
    $(".1").slideToggle();
    $(".btn_subscribe_child1 .fa-minus").fadeToggle(1);
    $(".btn_subscribe_child1 .fa-plus").fadeToggle(1);
});

$(".btn_subscribe_child2 ").click(function () {
    $(".2").slideToggle();
    $(".btn_subscribe_child2 .fa-minus").fadeToggle(1);
    $(".btn_subscribe_child2 .fa-plus").fadeToggle(1);
});


$(".btn_subscribe_child3 ").click(function () {
    $(".3").slideToggle();
    $(".btn_subscribe_child3 .fa-minus").fadeToggle(1);
    $(".btn_subscribe_child3 .fa-plus").fadeToggle(1);
});


$(".btn_subscribe_child4 ").click(function () {
    $(".4").slideToggle();
    $(".btn_subscribe_child4 .fa-minus").fadeToggle(1);
    $(".btn_subscribe_child4 .fa-plus").fadeToggle(1);
});

$(".btn_subscribe_child5 ").click(function () {
    $(".5").slideToggle();
    $(".btn_subscribe_child5 .fa-minus").fadeToggle(1);
    $(".btn_subscribe_child5 .fa-plus").fadeToggle(1);
});

$(".btn_subscribe_child6 ").click(function () {
    $(".6").slideToggle();
    $(".btn_subscribe_child6 .fa-minus").fadeToggle(1);
    $(".btn_subscribe_child6 .fa-plus").fadeToggle(1);
});

$(".btn_subscribe_child7 ").click(function () {
    $(".7").slideToggle();
    $(".btn_subscribe_child7 .fa-minus").fadeToggle(1);
    $(".btn_subscribe_child7 .fa-plus").fadeToggle(1);
});

$(".btn_subscribe_child8 ").click(function () {
    $(".8").slideToggle();
    $(".btn_subscribe_child8 .fa-minus").fadeToggle(1);
    $(".btn_subscribe_child8 .fa-plus").fadeToggle(1);
});

$(".btn_subscribe_child9 ").click(function () {
    $(".9").slideToggle();
    $(".btn_subscribe_child9 .fa-minus").fadeToggle(1);
    $(".btn_subscribe_child9 .fa-plus").fadeToggle(1);
});

$(".btn_subscribe_child10 ").click(function () {
    $(".10").slideToggle();
    $(".btn_subscribe_child10 .fa-minus").fadeToggle(1);
    $(".btn_subscribe_child10 .fa-plus").fadeToggle(1);
});

