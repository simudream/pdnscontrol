/*
 * Note: function added by scopeBinder should use 'this' to get the current scope.
 */
function showPopup($scope, $compile, template, scopeBinder) {
  "use strict";
  var popupTemplate = "<div data-reveal='' class='reveal-modal'><div ng-include src=\"'" + templateUrl(template) + "'\"></div></div>";
  var popupScope = $scope.$new();
  scopeBinder(popupScope);
  var popupLinker = $compile(popupTemplate);
  var popupElement = popupLinker(popupScope);
  popupScope.$on("finished", function() {
    $(popupElement).foundation('reveal', 'close');
    popupScope.$destroy();
    popupElement.remove();
  });
  popupScope.close = function() {
    popupScope.$emit("finished");
  };
  document.body.appendChild(popupElement[0]);
  $(popupElement).foundation({'reveal': {close_on_background_click: false}}); // init reveal settings
  $(popupElement).foundation('reveal', 'open');
}
