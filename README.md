# CRM-system
+ function createRowAndCell - функция создания таблицы клиентов, которая берет аргументом объект с клиентом
+ function createModalWindowToDelete - функция создания модального окна для удаления клиента, аргументом берет объект клиента который нужно удалить 
+ function createModalWindow - функция создания модального окна для изменения клиента (аргументом берет объект клиента), или для создания нового клиента (если в аргумент передан пустой объект)
+ function createInputContact - функция для вывода в модальном окне заполненные списки контактов клиента (в случае изменения клиента, когда в модальном окне для изменения передан объект клиента)
+ function postNewClient - функция для создания объекта нового клиента (значения принимаются из модального окна заполненного пользователем), чтобы в дальнейшем отправить объект на сервер и добавить его в таблицу
+ async function workCRM - функция в которой запускается сервер, создается, сортируется таблица, а также где таблица взаимодействует с остальным интерфейсом страницы (добавление новых клиентов, поиск запроса в поле для ввода)


доп.задания к дипломному проекту пока не реализованы
