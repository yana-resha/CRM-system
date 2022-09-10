<h1>Система управления контактными данными клиентов</h1>
<h2>Инструкция для запуска проекта</h2>
<p>Для запуска проекта локально склонируйте данный репозиторий, откройте в терминале папку crm-backend и выполните команды
<strong>node index</strong></p>
<p>Далее откройте в папке crm-frontened файл index.html</p>
<h2>Описание проекта</h2>
<p>В системе реализованы следущие задачи:</p>
<ul>
  <li>Просмотр списка людей в виде таблицы</li>
  <li> Добавление нового клиента</li>
  <li>Изменение информации о существующем клиенте</li>
</ul>
<p>Интерфейс представляет из себя единственную страницу, на которой располагается
таблица клиентов, кнопка для добавления нового клиента, а также шапка с логотипом
компании и строкой поиска клиентов.</p>
<p>Таблица со списком людей имеет следующие колонки:</p>
<ul>
  <li>ID</li>
  <li>ФИО</li>
  <li>Дата и время создания</li>
  <li>Дата и время последнего изменения</li>
  <li>Контакты</li>
  <li>Действия (кнопки изменить/удалить)</li>
</ul>
<p>Таблица строиться на основе данных из API (crm-backend).</p>
<p>Также в системе реализованы поиск и сортировка контактов</p>