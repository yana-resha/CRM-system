
(() => {

    

  function onDelete(obj) {
    removeID = obj.id;
    const response = fetch(`http://localhost:3000/api/clients/${removeID}`, {
      method: 'DELETE',
    });
  }


  function createInputContact () {
    const contactFlexContainer = document.createElement('div');
    contactFlexContainer.classList.add('contact-row')
    let choiceSelect = document.createElement('select');
    
    const choiseValueArray = ['Email', 'Телефон',  'Facebook', 'VK', 'Другое'];
    for (let i of choiseValueArray) {
      const choiseList = document.createElement('option');
      choiseList.textContent = i;
      choiceSelect.append(choiseList);
    }
    const contactInput = document.createElement('input');
    contactInput.classList.add('input');

    const btnContactDelete = document.createElement('button');
    btnContactDelete.classList.add('btn-input-delete');
    const contactDeleteContext = document.createElement('div');
    contactDeleteContext.classList.add('btn-contact-delete');
    contactDeleteContext.innerHTML = '&#8855;';
    btnContactDelete.append(contactDeleteContext);
    tippy(btnContactDelete, {content: 'Удалить контакт', theme: 'my-theme',});
    btnContactDelete.addEventListener('click', (e) => {
      !(e.preventDefault())
      contactFlexContainer.remove()
    })

    choiceSelect.addEventListener('change', () => {
      if (choiceSelect.value !== 'Телефон') {
        Inputmask({"mask": "", greedy:false,  definitions: {
          '*': {
            validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
            casing: "lower"},
          }}).mask(contactInput);
      }

      else if (choiceSelect.value === 'Телефон') {
        Inputmask({"mask": "+7(999)999-99-99"}).mask(contactInput);
      };
    })
    contactFlexContainer.append( choiceSelect, contactInput, btnContactDelete);

    
    return {contactFlexContainer, choiceSelect, contactInput}
  }

  function createModalWindow (obj) {
    // создаю само модальное окно с фоном
    const opacityHidden = 'modal-window-opacity';
    const modalBackground = document.createElement('div');
    modalBackground.classList.add('modal-background');
    const modalWindow = document.createElement('div');
    modalWindow.classList.add('modal-window');
    const modalCloseBtn = document.createElement('button');
    modalCloseBtn.innerHTML = '	&#215;';
    modalCloseBtn.classList.add('modal-close-btn');
    modalWindow.append(modalCloseBtn)
    
    modalCloseBtn.addEventListener('click', () => {
      modalBackground.classList.remove(opacityHidden);
      modalWindow.classList.remove(opacityHidden);
      modalBackground.remove();
      modalWindow.remove();
    });
    modalBackground.addEventListener('click', () => {
      modalBackground.classList.remove(opacityHidden);
      modalWindow.classList.remove(opacityHidden);
      modalBackground.remove();
      modalWindow.remove();
    });   
    const modalFlexContent = document.createElement('div');
    modalFlexContent.classList.add('change-content');
    const modalTitle = document.createElement('h1');
    modalFlexContent.append(modalTitle)
    modalTitle.classList.add('modal-title','modal-title-change');
    modalTitle.textContent = 'Новый клиент';
    const modalID = document.createElement('span');
    modalID.classList.add('modal-id');
    const errorText = document.createElement('span');
    errorText.classList.add('error')
    const modalSaveBtn = document.createElement('button');
    modalSaveBtn.classList.add('modal-delete-btn', 'to-change-table');
    modalSaveBtn.textContent = 'Сохранить';
    const modalDelBtn = document.createElement('button');
    modalDelBtn.classList.add('modal-cancel-btn');
    modalDelBtn.textContent = 'Удалить клиента';
    //форма, инпуты с контактом
    const form = document.createElement('form');
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container')
    const surnameForm = document.createElement('div');
    const surnameLabel = document.createElement('label');
    surnameLabel.textContent = 'Фамилия*'
    const surnameInput = document.createElement('input');
    surnameInput.type = 'text';
    
    surnameForm.append(surnameLabel, surnameInput);
    const nameForm = document.createElement('div');
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Имя*'
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    
    nameForm.append(nameLabel, nameInput);
    const lastnameForm = document.createElement('div');
    const lastnameLabel = document.createElement('label');
    lastnameLabel.textContent = 'Отчество'
    const lastnameInput = document.createElement('input');
    lastnameInput.type = 'text';
    lastnameForm.append(lastnameLabel, lastnameInput);
    nameForm.classList.add('input-name');
    surnameForm.classList.add('input-name');
    lastnameForm.classList.add('input-name');
    const contactForm = document.createElement('div');
    contactForm.classList.add('contact-container');
    const addBtn = document.createElement('button');
    addBtn.classList.add('add-btn');
    addBtn.innerHTML = `<span class="plus">+</span> Добавить контакт`;
    
    addBtn.addEventListener('click', (e) => {
      !e.preventDefault();
      const todoContact = createInputContact();
      const choices = new Choices(todoContact.choiceSelect);
      contactForm.insertBefore(todoContact.contactFlexContainer, addBtn);

      if (contactForm.children.length >= 11) {
        addBtn.classList.add('display-close');
      };
      Array.from(document.getElementsByClassName('btn-input-delete')).forEach(btn => {
        btn.addEventListener('click', () => {
          if (contactForm.children.length < 11) {
            addBtn.classList.remove('display-close');
          };
        });
      });
    });

    // if (contactForm.children.length < 2) {
    //   modalWindow.classList.add('scale')
    // }
    modalFlexContent.append(form);
    
    if (Object.keys(obj).length > 0) {
      modalTitle.textContent = 'Изменить данные';
      modalID.textContent = `ID: ${obj.id}`;
      modalTitle.append(modalID)
      surnameInput.value = obj.surname;
      nameInput.value = obj.name;
      lastnameInput.value = obj.lastName;
      modalFlexContent.append(modalDelBtn);
      
      // создаю имеющиеся контакты
      obj.contacts.forEach(i => {
        function putContact () {
          const contactFlexContainer = document.createElement('div');
          contactFlexContainer.classList.add('contact-row')
          const choiceSelect = document.createElement('select');
          choiceSelect.classList.add('select');
          choiceSelect.disabled = true;
          const choiseList = document.createElement('option');
          choiseList.textContent = i.type;
          choiceSelect.append(choiseList);
          const contactInput = document.createElement('input');
          contactInput.classList.add('input')
          contactInput.value = i.value;
          if (i.type === 'Телефон') {
            var im = new Inputmask("+7(999)-999-99-99");
            im.mask(contactInput);
          }
          if (i.type !== 'Телефон') {
            contactInput.value = i.value.substr(8);
          }
          const btnContactDelete = document.createElement('button');
          btnContactDelete.classList.add('btn-input-delete');
          const contactDeleteContext = document.createElement('div');
          contactDeleteContext.classList.add('btn-contact-delete');
          contactDeleteContext.innerHTML = '&#8855;';
          btnContactDelete.append(contactDeleteContext);
          tippy(btnContactDelete, {content: 'Удалить контакт', theme: 'my-theme',});
          
          contactFlexContainer.append(choiceSelect, contactInput, btnContactDelete);
          contactForm.append(contactFlexContainer);
          // при клике на кнопку удалить рядом с инпутом удаляю этот контейнер и этот объект из массива с контактами
          btnContactDelete.addEventListener('click', (e) => {
            !e.preventDefault()
            obj.contacts.splice(i, 1);
            contactFlexContainer.remove()
          });
          return {choiceSelect}
        }
      const todoContact = putContact();
      const choices = new Choices(todoContact.choiceSelect);
      })
    }

    Array.from(document.getElementsByClassName('btn-input-delete')).forEach(btn => {
      btn.addEventListener('click', () => {
        if (contactForm.children.length < 11) {
          addBtn.classList.remove('display-close');
        };
      });
    });
    modalDelBtn.addEventListener('click', () => {
      modalBackground.classList.remove(opacityHidden);
      modalWindow.classList.remove(opacityHidden);
    });
    
    
    inputContainer.append(surnameForm, nameForm, lastnameForm);
    contactForm.append(addBtn);
    form.append(inputContainer, contactForm, errorText, modalSaveBtn);
    modalWindow.append(modalFlexContent)
    document.body.append(modalBackground);
    document.body.append(modalWindow);
      
    return {modalBackground, modalWindow, modalFlexContent, form, modalSaveBtn, modalDelBtn, surnameInput, nameInput, lastnameInput, errorText};
  }


  function createModalWindowToDelete (obj) {
    const opacityHidden = 'modal-window-opacity';
    // делаю модальное окно на кнопку удалить которое открывается из таблицы
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-background', opacityHidden);
    const modalForm = document.createElement('div');
    modalForm.classList.add('modal-window', opacityHidden);
    const modalCloseBtn = document.createElement('button');
    modalCloseBtn.innerHTML = '	&#215;';
    modalCloseBtn.classList.add('modal-close-btn');
    const modalFlexContent = document.createElement('div');
    modalFlexContent.classList.add('modal-flex-content');
    const modalTitle = document.createElement('h1');
    modalTitle.classList.add('modal-title');
    modalTitle.textContent = 'Удалить клиента';
    const modalText = document.createElement('p');
    modalText.classList.add('modal-text');
    modalText.textContent = 'Вы действительно хотите удалить данного клиента?';
    const modalDeleteBtn = document.createElement('button');
    modalDeleteBtn.classList.add('modal-delete-btn');
    modalDeleteBtn.textContent = 'Удалить';
    const modalCancelBtn = document.createElement('button');
    modalCancelBtn.classList.add('modal-cancel-btn');
    modalCancelBtn.textContent = 'Отмена';
    modalFlexContent.append(modalTitle, modalText, modalDeleteBtn, modalCancelBtn)
    modalForm.append(modalCloseBtn, modalFlexContent)
    document.body.append(modalContainer)
    document.body.append(modalForm)
    modalCancelBtn.addEventListener('click', () => {
      modalContainer.classList.remove(opacityHidden);
      modalForm.classList.remove(opacityHidden)
    })
    modalContainer.addEventListener('click', () => {
      modalContainer.classList.remove(opacityHidden);
      modalForm.classList.remove(opacityHidden)
    })
    modalCloseBtn.addEventListener('click', () => {
      modalContainer.classList.remove(opacityHidden)
      modalForm.classList.remove(opacityHidden)
    })
    modalDeleteBtn.addEventListener('click', () => {
      onDelete(obj);
      modalContainer.classList.remove(opacityHidden)
      modalForm.classList.remove(opacityHidden)
      
    });
    return {modalContainer, modalForm, modalDeleteBtn}
  }

  function createRowAndCell (obj, array = []) {
    const opacityHidden = 'modal-window-opacity';
    const $tableBody = document.getElementById('table-body'); 
    let row = document.createElement('tr');
    row.classList.add('row-style');
    const cellID = document.createElement('td');
    const cellName = document.createElement('td');
    cellName.classList.add('cell-name');
    const cellCreateClient = document.createElement('td');
    const cellChangeClient = document.createElement('td');
    cellCreateClient.classList.add('cell-time');
    cellChangeClient.classList.add('cell-time');
    const cellContact = document.createElement('td');
    cellContact.classList.add('cell-contact')
    const cellAction = document.createElement('td');
    cellAction.classList.add('cell-action');
    const actionContainer = document.createElement('div');
    actionContainer.classList.add('action-flex-container');
    
    // создаю кнопки удалить изменить для ячейки действия
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('table-clients__cell-btn', 'delete');
    deleteBtn.innerHTML = '<img src="img/deleteBtn.png"> Удалить';
    const changeBtn = document.createElement('button');
    changeBtn.classList.add('table-clients__cell-btn', 'change');
    changeBtn.innerHTML = '<img src="img/changeBtn.png">Изменить';
    actionContainer.append(changeBtn, deleteBtn)
    cellAction.append(actionContainer);
    function cellContent (object) {
      // функция верни id клиента
      function getID () {
        return object.id
      }
      cellID.textContent = getID();

      function getFIO () {
        return object.surname + ' ' + object.name + ' ' + object.lastName
      }

      cellName.textContent = getFIO();
      
      // делаю вывод данных даты создания как на макете 
      function getCreatingDate () {
        const createDate = new Date(object.createdAt).toLocaleDateString();
        const createTime = new Date(object.createdAt).toLocaleTimeString().slice(0,-3);
        return {createDate, createTime}
      }
      cellCreateClient.innerHTML = '<div class="time">' + getCreatingDate().createDate + '<span class="time-style">' + getCreatingDate().createTime + '</span>'  + '</div>';
      // делаю вывод данных даты создания как на макете 
      function getChangingDate () {
        const changeDate = new Date(object.updatedAt).toLocaleDateString();
        const changeTime = new Date(object.updatedAt).toLocaleTimeString().slice(0,-3);
        return {changeDate, changeTime}
      }
      cellChangeClient.innerHTML = '<div class="time">' + getChangingDate().changeDate + '<span class="time-style">' + getChangingDate().changeTime + '</span>' + '</div>';


      const contactBtnContainer = document.createElement('div');
      contactBtnContainer.classList.add('contact-btn-container');
      cellContact.append(contactBtnContainer)
      // создаю кнопки и всплывающие подсказки для ячейки контакты
      
      const openBtn = document.createElement('button');
      openBtn.classList.add('open-btn');
      const faVK = '<i class="fa fa-vk" aria-hidden="true"></i>';
      const faFB = '<i class="fa fa-facebook" aria-hidden="true"></i>';
      const faPhone = '<i class="fa fa-phone" aria-hidden="true"></i>';
      const faMail = '<i class="fa fa-envelope" aria-hidden="true"></i>';
      const faAnother = '<i class="fa fa-user-circle" aria-hidden="true"></i>';
      // заполняю ячейку контакты кнопками с контактами и тултипами
      if (object.contacts.length > 0) {
        object.contacts.forEach(el => {
          const contactBtn = document.createElement('button');
          contactBtn.classList.add('contact-btn')
          contactBtnContainer.append(contactBtn);

          function contentTooltip () {
            el.type === ('Телефон' || 'Другое')? content = `${el.type}: ${el.value}`:content = `${el.type}: ${el.value.substr(8)}`;
            return content
          }

          tippy(contactBtn, {content: contentTooltip(), theme: 'my-theme',});

          el.type === 'VK'
          ?contactBtn.innerHTML = faVK
          :el.type === 'Facebook'
          ?(contactBtn.innerHTML = faFB, contactBtn.classList.add('fb-icon'))
          :el.type === 'Телефон'
          ?contactBtn.innerHTML = faPhone
          :el.type === 'Email'
          ?contactBtn.innerHTML = faMail
          :contactBtn.innerHTML = faAnother;

          if (object.contacts.length > 4) {
            const contactBtn = Array.from(contactBtnContainer.querySelectorAll('.contact-btn'));
            for (let i in contactBtn) {
              if (i > 3) {
                contactBtn[i].classList.add('display-close')
              }
            }
            contactBtnContainer.append(openBtn);
            openBtn.textContent = `+${object.contacts.length - 4}`;
          };
          openBtn.addEventListener('click', () => {
            openBtn.classList.add('close')
            const x = Array.from(document.querySelectorAll('.display-close'))
            x.forEach(btn => {
              btn.classList.remove('display-close')
            })
          })
        });
      }
    }

    const textContentCell = cellContent(obj);
    // при нажатии на кнопку удалить подключаю функцию создания модального окна и удаляю строку в случае нажатия на кнопку удалить в мод окне
    deleteBtn.addEventListener('click', () => {
      const deleteModal = createModalWindowToDelete(obj);
      deleteModal.modalDeleteBtn.addEventListener('click', () => {
        row.remove();
        const indexObjInArray = array.indexOf(obj);
        array.splice(indexObjInArray, 1);
        
      })
    });
    changeBtn.addEventListener('click', async () => {
      const response = await fetch(`http://localhost:3000/api/clients/${obj.id}`)
      const clientById = await response.json();
      const modalChange = createModalWindow(clientById);
      modalChange.modalBackground.classList.add('modal-window-opacity');
      modalChange.modalWindow.classList.add('modal-window-opacity');
      
      modalChange.modalDelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const modalWindowToDelete = createModalWindowToDelete(obj);
        modalWindowToDelete.modalDeleteBtn.addEventListener('click', () => {
          row.remove();
          const indexObjInArray = array.indexOf(obj);
          array.splice(indexObjInArray, 1);
        })
      })
      modalChange.modalSaveBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const changeClient = postNewClient(modalChange)
        const response = await fetch(`http://localhost:3000/api/clients/${obj.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(changeClient.newObj)
        });
        const data = await response.json();
        let errorBody = [];
      if ((response.status === 422) || (response.status === 404) || (response.status === 500)) {
        
        data.errors.forEach((e) => {
          errorBody.push(e.message);
        })
      
        modalChange.errorText.textContent = errorBody.join(', ');
      }
      else if (response.status === 200 || response.status === 201) {
          const сhangeResponse = await fetch(`http://localhost:3000/api/clients/${data.id}`);
          const changeData = await сhangeResponse.json();
          modalChange.modalBackground.classList.remove(opacityHidden);
          modalChange.modalWindow.classList.remove(opacityHidden);
          modalChange.modalBackground.remove();
          modalChange.modalWindow.remove();
          Array.from(cellContact.children).forEach(el => el.remove());
          const changeTextContentCell = cellContent(changeData);
          const indexObjInArray = array.indexOf(obj);
          array.splice(indexObjInArray, 1, changeData);
      }
      else {
        modalChange.errorText.textContent = 'Что-то пошло не так...'
      }; 
    })   
   })
    row.append(cellID, cellName, cellCreateClient, cellChangeClient, cellContact ,cellAction);
    $tableBody.prepend(row)
    
  }

  // функция для передачи нового клиента в базу данных
  function postNewClient (modalWindow) {
    const newObj = {}; 
    const contactSelectInWindow = Array.from(document.getElementsByTagName('select'));
    const contactInputInWindow = Array.from(document.getElementsByClassName('input'));
      // создаю объект из полей ввода
    
    newObj.surname = modalWindow.surnameInput.value;
    newObj.name = modalWindow.nameInput.value;
    newObj.lastName = modalWindow.lastnameInput.value;
    newObj.contacts = [];
    for (let i = 0; i < contactSelectInWindow.length; ++i) {
      const objContact = {};
      objContact.type = contactSelectInWindow[i].value;
      
      if (objContact.type !== 'Телефон') {
        objContact.value =`https//:${contactInputInWindow[i].value}`;
      }
      else {
        objContact.value = contactInputInWindow[i].value;
      };
      newObj.contacts.push(objContact)
    }
    
    return {newObj}
  }



  async function workCRM () {
    const $btnSortArrayID = document.querySelector('.id-btn');
    const $btnSortArrayFullname = document.querySelector('.fullname');
    const $btnSortCreateData = document.querySelector('.create-btn');
    const $btnSortChangesData = document.querySelector('.changes-btn');
    const $allSortBtn = Array.from(document.querySelectorAll('.table-clients__sort-btn'));
    const $searchForm = document.querySelector('.header__search-form');
    const $searchInput = document.querySelector('.header__serch');


    const $createClientBtn = document.querySelector('.table-clients__btn-create-client');
    const opacityHidden = 'modal-window-opacity';
    const $tableBody = document.getElementById('table-body'); 
    const response = await fetch('http://localhost:3000/api/clients');
    const data = await response.json();
    // создаю массив для сортировки и уже из этого массива создаю таблицу, так как сортировка у нас идет сразу по умолчанию
    let sortArray = data.slice();
    
    // сразу ставлю сортировку по id по умолчанию
    
    sortArray.sort(function (a, b) {
        return b.id - a.id;
      });
    sortArray.forEach(obj => {
      const todoRowInTable = createRowAndCell(obj, sortArray);
    })

    // сортировка по id 
    $btnSortArrayID.addEventListener('click', () => {
      $allSortBtn.forEach(btn => {
        if (btn !== $btnSortArrayID) {
          btn.classList.remove('min')
        }
      });
      $btnSortArrayID.classList.toggle('min');
      Array.from($tableBody.children).forEach(row => row.remove());
      if ($btnSortArrayID.classList.contains('min') === true) {
        sortArray.sort(function (a, b) {
          return a.id - b.id;
        });
        sortArray.forEach(obj => {
          const todoRowInTable = createRowAndCell(obj, sortArray);
        })
      }
      else if ($btnSortArrayID.classList.contains('min') === false) {
        sortArray.sort(function (a, b) {
        return b.id - a.id;
        });
        sortArray.forEach(obj => {
          const todoRowInTable = createRowAndCell(obj, sortArray);
        })
      };
    })

    // сортировка по фио
    $btnSortArrayFullname.addEventListener('click', () => {
      $allSortBtn.forEach(btn => {
        if (btn !== $btnSortArrayFullname) {
          btn.classList.remove('min')
        }
      });
      $btnSortArrayFullname.classList.toggle('min');
      Array.from($tableBody.children).forEach(row => row.remove());
      if ($btnSortArrayFullname.classList.contains('min') === true) {
        //по возрастанию
        sortArray.sort(function (a, b) {
          nameA = `${a.surname} ${a.name}  ${a.lastName}`.toLocaleLowerCase();
          nameB = `${b.surname} ${b.name} ${b.lastName}`.toLocaleLowerCase();
          if (nameA > nameB) {
            return -1
          }
          else if (nameA < nameB) {
            return 1
          }
           return 0 // Никакой сортировки
          })
          // добавляю массив в таблицу
          sortArray.forEach(obj => {
            const todoRowInTable = createRowAndCell(obj);
          })
      }
      else if ($btnSortArrayFullname.classList.contains('min') === false) {
        // по убыванию
        sortArray.sort(function (a, b) {
          nameA = `${a.surname} ${a.name} ${a.lastName}`.toLocaleLowerCase();
          nameB = `${b.surname} ${b.name} ${b.lastName}`.toLocaleLowerCase();
          if (nameA < nameB) {
            return -1
          }
          else if (nameA > nameB) {
            return 1
          }
           return 0 // Никакой сортировки
          })
          // добавляю массив в таблицу
        sortArray.forEach(obj => {
          const todoRowInTable = createRowAndCell(obj);
        })
      };
    })

    // сортировка по дате создания клиента
    $btnSortCreateData.addEventListener('click', () => {
      $allSortBtn.forEach(btn => {
        if (btn !== $btnSortCreateData) {
          btn.classList.remove('min')
        }
      });
      $btnSortCreateData.classList.toggle('min');
      Array.from($tableBody.children).forEach(row => row.remove());
      if ($btnSortCreateData.classList.contains('min') === true) {
        sortArray.sort(function (a, b) {
          dateA =  new Date(a.createdAt);
          dateB = new Date(b.createdAt); 
          return dateA - dateB;
        })
        sortArray.forEach(obj => {
          const todoRowInTable = createRowAndCell(obj);
        })
      }
      else if ($btnSortCreateData.classList.contains('min') === false) {
        sortArray.sort(function (a, b) {
          dateA =  new Date(a.createdAt)
          dateB = new Date(b.createdAt)
          return dateB - dateA;
        })
        sortArray.forEach(obj => {
          const todoRowInTable = createRowAndCell(obj);
        })
      };
    });
    // сортировка по дате изменения клиента

    $btnSortChangesData.addEventListener('click', () => {
      $allSortBtn.forEach(btn => {
        if (btn !== $btnSortChangesData) {
          btn.classList.remove('min')
        }
      });
      $btnSortChangesData.classList.toggle('min');
      Array.from($tableBody.children).forEach(row => row.remove());
      if ($btnSortChangesData.classList.contains('min') === true) {
        sortArray.sort(function (a, b) {
          dateA =  new Date(a.updatedAt);
          dateB = new Date(b.updatedAt); 
          return dateA - dateB;
        })
        sortArray.forEach(obj => {
          const todoRowInTable = createRowAndCell(obj);
        })
      }
      else if ($btnSortChangesData.classList.contains('min') === false) {
        sortArray.sort(function (a, b) {
          dateA =  new Date(a.updatedAt)
          dateB = new Date(b.updatedAt)
          return dateB - dateA;
        })
        sortArray.forEach(obj => {
          const todoRowInTable = createRowAndCell(obj);
        })
      };
    });

    async function searchIncludes (searchString) {

      const getSearchResponse = await fetch(`http://localhost:3000/api/clients?search=${searchString}`);
      const searchResponse = await getSearchResponse.json();
      // console.log(searchResponse);
      sortArray = searchResponse.slice();
      Array.from($tableBody.children).forEach(row => row.remove());
      sortArray.forEach(obj => {
        const todoRowInTable = createRowAndCell(obj);
      })
    }

    // searchForm.addEventListener('submit', (e) => {
      // e.preventDefault();
      $searchInput.addEventListener('input', () => {
        let searchString = String($searchInput.value);
        let runSearch = searchIncludes(searchString);
      })

    $createClientBtn.addEventListener('click', async () => {
      const nullObj = {};
      const modalNewClient = createModalWindow(nullObj);
      modalNewClient.modalBackground.classList.add(opacityHidden);
      modalNewClient.modalWindow.classList.add(opacityHidden);
      modalNewClient.modalSaveBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const newClient = postNewClient(modalNewClient);
        const response = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClient.newObj)
        });
        const data = await response.json();
        let errorBody = [];
        if ((response.status === 422) || (response.status === 404) || (response.status === 500)) {
          data.errors.forEach((e) => {
            errorBody.push(e.message);
          })
          modalNewClient.errorText.textContent = errorBody.join(', ');
        }
        else if (response.status === 200 || response.status === 201) {
          const responseWithNewClient = await fetch(`http://localhost:3000/api/clients/${data.id}`);
          const newData = await responseWithNewClient.json();    
          
          const createNewClientInTable = createRowAndCell(newData, sortArray)
          sortArray.push(newData);

          modalNewClient.modalBackground.classList.remove(opacityHidden);
          modalNewClient.modalWindow.classList.remove(opacityHidden);
          modalNewClient.modalBackground.remove();
          modalNewClient.modalWindow.remove();
        
        }
        else {
          modalNewClient.errorText.textContent = 'Что-то пошло не так...'
          
        };
       })

      })


    }

  document.addEventListener('DOMContentLoaded', () => {
    workCRM();
  })  
})();


