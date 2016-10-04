$(document).ready(function(){
// Как только будет загружен API и готов DOM, выполняем инициализацию
ymaps.ready(init);
var myMap;
function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map")
    myMap = new ymaps.Map('map', {
        // При инициализации карты, обязательно нужно указать
        // ее центр и коэффициент масштабирования
        center: [56.317222,44.002149],
        zoom: 13
    });


    myMap.geoObjects.events.add([
        'balloonopen'
    ], function (e) {
        var geoObject = e.get('target');
        myMap.panTo(geoObject.geometry.getCoordinates(), {
            delay: 0
        });
    });

    myPlacemarkOpera = new ymaps.Placemark([56.315695,44.017063], {
        name: 'САЛОН «ЧАРУЮЩИЕ САМОЦВЕТЫ»',
        address: 'ул. Большая Советская,24',
        number: '8-900-222-76-67',
        weekdays: 'пн-пт с 9.00 до 19.00 ',
        weekend: 'сб-вск с 10.00 до 20.00',
        pay: 'наличные, карта',
        way: 'маршрутка или автобус 125 до  остановки "Остановка" слева 4-х   этжное здание с нашей вывеской'

    }, {
        // Изображение иконки метки
        iconImageHref: 'img/map-poin-white.png',
        // Размеры изображения иконки
        iconImageSize: [43, 45],
        // смещение картинки
        iconImageOffset: [-16, -37],
        // Размеры содержимого балуна
        balloonContentSize: [595, 434],
        // Задаем макет балуна - пользовательская картинка с контентом
        balloonLayout: "default#imageWithContent",
        // Картинка балуна
        balloonImageHref: 'img/baloon-img.png',
        // Смещение картинки балуна
        balloonImageOffset: [-307, -227],
        // Размеры картинки балуна
        balloonImageSize: [615, 454],
        // Балун не имеет тени
        balloonShadow: false,
        //Выравнивание по умолчанию
        balloonAutoPan: false
    }),

        myPlacemarkDramma = new ymaps.Placemark([56.324117,44.00136], {
            name: 'САЛОН «ЧАРУЮЩИЕ САМОЦВЕТЫ»',
            address: 'ул. Большая Советская,24',
            number: '8-900-222-76-67',
            weekdays: 'пн-пт с 9.00 до 19.00 ',
            weekend: 'сб-вск с 10.00 до 20.00',
            pay: 'наличные, карта',
            way: 'маршрутка или автобус 125 до  остановки "Остановка" слева 4-х   этжное здание с нашей вывеской'

        }, {
            iconImageHref: 'img/map-poin-white.png',
            iconImageSize: [43, 45],
            iconImageOffset: [-16, -37],
            balloonContentSize: [595, 434],
            balloonLayout: "default#imageWithContent",
            balloonImageHref: 'img/baloon-img.png',
            balloonImageOffset: [-307, -227],
            balloonImageSize: [615, 454],
            balloonShadow: false,
            balloonAutoPan: false
        }),

        myPlacemarkKomedia = new ymaps.Placemark([56.320203,44.002321], {
            name: 'САЛОН «ЧАРУЮЩИЕ САМОЦВЕТЫ»',
            address: 'ул. Большая Советская,24',
            number: '8-900-222-76-67',
            weekdays: 'пн-пт с 9.00 до 19.00 ',
            weekend: 'сб-вск с 10.00 до 20.00',
            pay: 'наличные, карта',
            way: 'маршрутка или автобус 125 до  остановки "Остановка" слева 4-х   этжное здание с нашей вывеской'

        }, {
            iconImageHref: 'img/map-poin-white.png',
            iconImageSize: [43, 45],
            iconImageOffset: [-16, -37],
            balloonContentSize: [595, 434],
            balloonLayout: "default#imageWithContent",
            balloonImageHref: 'img/baloon-img.png',
            balloonImageOffset: [-307, -227],
            balloonImageSize: [615, 454],
            balloonShadow: false,
            balloonAutoPan: false
        }),

        // Создаем коллекцию, в которую будем добавлять метки
        myCollection = new ymaps.GeoObjectCollection();

    //Добавляем метки в коллекцию геообъектов.
    myCollection
        .add(myPlacemarkOpera)
        .add(myPlacemarkDramma)
        .add(myPlacemarkKomedia);

    // Создаем шаблон для отображения контента балуна
    var myBalloonLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="map-modal_left"><div class="map-modal_point"></div><div class="map-modal_img"><img src="img/modal-img-1.jpg" alt=""></div><div class="map-modal_img"><img src="img/modal-img-1.jpg" alt=""></div></div>' +
        '<div class="map-modal_right"><div class="map-modal_title">$[properties.name]</div><div class="map-modal_adress">$[properties.address]</div><div class="map-modal_contact"><div class="map-modal_item"><div class="map-modal-icon"><img src="img/modal-phone-icon.png" alt=""></div><div class="map-modal-text">$[properties.number]</div> <!--end item--></div><div class="map-modal_item"><div class="map-modal-icon"><img src="img/modal-clock-icon.png" alt=""></div><div class="map-modal-text"><p>$[properties.weekdays]</p><p>$[properties.weekend]</p></div> <!--end item--></div><div class="map-modal_item"><div class="map-modal-icon">оплата:</div><div class="map-modal-text">$[properties.pay]</div> <!--end item--></div><div class="map-modal_item"><div class="map-modal-icon">как пройти:</div><div class="map-modal-text"><p>$[properties.way]</p></div> <!--end item--></div>  </div>  </div>' +
        '<img id="close-balloon" src="img/map-modal-close.png" onclick="myMap.balloon.close()">'

    );
////
//      $('#close-balloon').on('click', function(){
//        myPlacemarkOpera.balloon.close()
//      });



    // Помещаем созданный шаблон в хранилище шаблонов. Теперь наш шаблон доступен по ключу 'my#theaterlayout'.
    ymaps.layout.storage.add('my#theaterlayout', myBalloonLayout);

    // Задаем наш шаблон для балунов геобъектов коллекции.
    myCollection.options.set({
        balloonContentBodyLayout:'my#theaterlayout',
        // Максимальная ширина балуна в пикселах
        balloonMaxWidth: 600
    });

    // Добавляем коллекцию геообъектов на карту.
    myMap.geoObjects.add(myCollection);




};
})();