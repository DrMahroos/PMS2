var TreeColumns = /** @class */ (function () {
    function TreeColumns() {
    }
    return TreeColumns;
}());
var TreeViwe = /** @class */ (function () {
    function TreeViwe() {
        this.settings = GetSystemEnvironment();
    }
    TreeViwe.prototype.SearchTreeView = function (source, elementId, SelectedValueElement, ReturnLeaf) {
        if (ReturnLeaf === void 0) { ReturnLeaf = true; }
        var tv = new TreeViwe();
        if (source == null) {
            MessageBox.Show("Search not available, Please call your app administrator", "Search");
            return;
        }
        var tree = document.getElementById(elementId);
        $('#' + elementId).empty();
        var input = DocumentActions.GetElementById("searchCode");
        $(".modal-footer #btnSearch").on('click', function () {
            var value = $(".modal-footer #searchCode").val();
            var thisParents;
            if (tv.settings.ScreenLanguage == "ar")
                thisParents = source.filter(function (ee) { return ee.Code.match(value) || ee.nameAr.match(value); });
            else
                thisParents = source.filter(function (ee) { return ee.Code.match(value) || ee.nameEn.match(value); });
            $('.selectedLi').removeClass("selectedLi");
            if (thisParents.length > 0) {
                var thisLi = tree.children.namedItem(thisParents[0].Id.toString());
                thisLi.className = "selectedLi";
            }
        });
        var parents = source.filter(function (f) {
            return f.parentId == null;
        });
        // root
        for (var i = 0; i < parents.length; i++) {
            var node = document.createElement("li");
            if (tv.settings.ScreenLanguage == "ar")
                node.textContent = parents[i].Code.toString() + " " + parents[i].nameAr;
            else
                node.textContent = parents[i].Code.toString() + " " + parents[i].nameEn;
            node.id = parents[i].Id.toString();
            node.title = parents[i].Code.toString();
            node.className += "treeParentLi rootColor";
            node.style.marginRight = "35px";
            node.style.cursor = "pointer";
            node.style.fontSize = "16";
            node.style.fontWeight = "bold";
            tree.insertAdjacentElement("beforeend", node);
        }
        for (var i = 0; i < tree.children.length; i++) {
            var li = tree.children[i];
            this.AddTreeViewItem(li, source);
        }
        if (ReturnLeaf) {
            $(".treeParentLi").click(function (e) {
                var idSelected = Number(e.target.id);
                if ($("." + idSelected).css("display") != "none")
                    $("." + idSelected).css("display", "none");
                else
                    $("." + idSelected).css("display", "");
                var value = source.filter(function (em) { return em.Id == idSelected; });
                $('#' + SelectedValueElement).text(value[0].Code + "  " + value[0].nameAr + "  " + value[0].nameEn);
                if (tv.settings.ScreenLanguage == "ar") {
                    $('#txt_treeCode').val(value[0].Code);
                    $('#txt_treeName').val(value[0].nameAr);
                }
                else {
                    $('#txt_treeCode').val(value[0].Code);
                    $('#txt_treeName').val(value[0].nameEn);
                }
                return idSelected.toString();
            });
        }
        else {
            $(".treeParentLi").click(function (e) {
                var idSelected = e.target.id;
                if ($("." + idSelected).css("display") != "none")
                    $("." + idSelected).css("display", "none");
                else
                    $("." + idSelected).css("display", "");
                return ""; //idSelected;
            });
        }
    };
    TreeViwe.prototype.AddTreeViewItem = function (li, source) {
        var settings = GetSystemEnvironment();
        var id = Number(li.id);
        var list = source.filter(function (ee) { return ee.parentId == id; });
        for (var i = 0; i < list.length; i++) {
            var node = document.createElement("li");
            if (settings.ScreenLanguage == "ar")
                node.textContent = list[i].Code.toString() + " " + list[i].nameAr;
            else
                node.textContent = list[i].Code.toString() + " " + list[i].nameEn;
            node.style.display = "none";
            node.id = list[i].Id;
            node.title = list[i].Code.toString();
            var list2 = source.filter(function (ee) { return ee.parentId == list[i].Id; });
            if (list2.length == 0)
                // leaf
                node.className = "leafColor treeChildLi " + li.id;
            else
                // parent
                node.className = "parentColor treeChildLi " + li.id;
            var margin = (Number(li.style.marginRight.replace("px", "")) + 10).toString();
            node.style.marginRight = margin + "px";
            li.insertAdjacentElement("beforeend", node);
        }
        for (var i = 0; i < li.children.length; i++) {
            var lli = li.children[i];
            this.AddTreeViewItem(lli, source);
        }
    };
    TreeViwe.prototype.CreateTreeView = function (actionMethod, controllerName, elementId, SelectedValueElement) {
        var _this = this;
        Ajax.CallAsync({
            url: Url.Action(actionMethod, controllerName),
            success: function (d) {
                var source = JSON.parse(d.result);
                console.log(source);
                if (source == null) {
                    MessageBox.Show("Search not available, Please call your app administrator", "Search");
                    return;
                }
                var tree = document.getElementById(elementId);
                var parents = source.filter(function (f) {
                    return f.parentId == null;
                });
                // root
                for (var i = 0; i < parents.length; i++) {
                    var node = document.createElement("li");
                    node.textContent = parents[i].Code.toString() + " " + parents[i].nameAr;
                    node.id = parents[i].Id.toString();
                    node.title = parents[i].Code.toString();
                    node.className += "treeParentLi rootColor";
                    node.style.marginRight = "35px";
                    node.style.cursor = "pointer";
                    node.style.fontSize = "16";
                    node.style.fontWeight = "bold";
                    tree.insertAdjacentElement("beforeend", node);
                }
                for (var i = 0; i < tree.children.length; i++) {
                    var li = tree.children[i];
                    _this.AddTreeViewItem(li, source);
                }
                $(".treeParentLi").click(function (e) {
                    var idSelected = e.target.id;
                    if ($("." + idSelected).css("display") != "none")
                        $("." + idSelected).css("display", "none");
                    else
                        $("." + idSelected).css("display", "");
                    $('#' + SelectedValueElement).text(idSelected);
                    return idSelected;
                });
            }
        });
    };
    return TreeViwe;
}());
//# sourceMappingURL=TreeView.js.map