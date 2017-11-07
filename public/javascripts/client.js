var main = function (items) {
    "use strict";

    function buildItemEl(item) {
        var $viewButton = $("<button>").text("view").on("click", function() {
            $.ajax({
                url: '/items/' + item.id,
                type: 'GET',
                success: function(item) {
                    alert("Item: " + item.name);
                }
            });
        });
        var $deleteButton = $("<button>").text("X").on("click", function() {
            $.ajax({
                url: '/items/' + item.id,
                type: 'DELETE',
                success: function(result) {
                    $("#item-" + item.id).remove();
                }
            });
        });
        var $listEl = $("<li>")
            .attr("id", "item-" + item.id)
            .text(item.name + " - " + item.quantity)
            .append($viewButton)
            .append($deleteButton);
        return $listEl;
    } 

    var $itemList = $("<ul>").attr("id", "items");
    items.forEach(function(item) {
        $itemList.append(buildItemEl(item));
    });
    $("#itemContainer").html($itemList);
    $("#addNewItem").on("click", function() {
        var newName = $("input[name='newItemName']").val();
        var newQuantity = $("input[name='newItemQuantity']").val();
        var newItem = {
            name: newName,
            quantity: newQuantity
        }
        $.ajax({
            url: "/items",
            type: "POST",
            data: JSON.stringify(newItem),
            contentType: "application/json",
            success: function(newItem, status) {
                $itemList.append(buildItemEl(newItem));
            }
        });
    });
};

$(document).ready(function () {
    $.getJSON("/items", function (items) {
        console.log(items);
        main(items);
    });
});
