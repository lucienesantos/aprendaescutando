greenzoneApp.controller("HolidaysController", ['$rootScope', '$scope', '$modal',
    '$http', '$ability', '$api', '$history', '$filter', '$messages', '$franchise',
    function($rootScope, $scope, $modal, $http, $ability, $api, $history, $filter, $messages, $franchise) {

        angular.extend(this, new BaseController($scope, $http, $ability, $history, $messages, $franchise, {
            links: Links.generate("feriados"),
            name: "Feriados",
            objectClassName: "Holiday",
            initialLoad: true,
            binds: {
                objects: "holidays",
                object: "holiday"
            },
            baseUrl: "/feriados",
            loadObjectById: function(id) {
                $api.getHolidayId(id).success(function(data) {
                    $scope.holiday = data;
                });
            },
            newObject: function() {
                return {};
            },
            salvaCallback: function() {
                $scope.changeView($scope.LIST);
                $messages.successMessage("Feriado cadastrado com sucesso");
            }
        }));

        $history.addListener($scope);

        $scope.onUrlViewChange = function(view) {

        };

        $scope.searchOptions = {
            applySearch: function() {
                $scope.loadAll();
            }
        };

        $scope.applyMasks = function() {
            Masks.applyAll();
        };

        $scope.visualizar = function(id) {
            $scope.holiday = this.findById(id);
            $scope.changeView($scope.REGISTER);
        };

        $scope.remover = function(id) {
            bootbox.confirm("Confirma remoÃ§Ã£o deste feriado? ", function(result) {
               if (result) {
                   $api.removeHoliday(id).success(function(data) {
                        $messages.successMessage(data.message);
                        $scope.loadAll();
                   });
               }
            });
        };

    }]);