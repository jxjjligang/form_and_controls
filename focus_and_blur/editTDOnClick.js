let table = document.getElementById('bagua-table');
let btnOK, btnCancel;
let editingTD;
table.onclick = function (event) {
    let td = event.target.closest('TD');
    if (!td || editingTD)
        return;

    editingTD = td;
    let div = document.createElement('div');
    div.style.position = 'fixed';
    let text = document.createElement('textarea');
    text.textContent = td.innerHTML;
    div.insertAdjacentElement('beforeend', text);

    let tdRect = td.getBoundingClientRect();
    text.style.width = tdRect.width + 'px';
    text.style.height = tdRect.height + 'px';
    text.style.left = tdRect.left + 'px';
    text.style.top = tdRect.top + 'px';

    let divBtns = document.createElement('div');
    div.insertAdjacentElement('beforeend', divBtns);
    createButton();
    divBtns.insertAdjacentElement('beforeend', btnOK);
    divBtns.insertAdjacentElement('beforeend', btnCancel);
    td.replaceWith(div);
    btnOK.onclick = onOK;
    btnCancel.onclick = onCancel;

    function onCancel(event) {
        div.replaceWith(editingTD);
        editingTD = null;
    }

    function onOK(event) {
        editingTD.innerHTML = text.value;
        div.replaceWith(editingTD);
        editingTD = null;
    }
}

function createButton() {
    if (!btnOK) {
        btnOK = document.createElement('input');
        btnOK.type = 'button';
        btnOK.value = 'OK';
    }

    if (!btnCancel) {
        btnCancel = document.createElement('input');
        btnCancel.type = 'button';
        btnCancel.value = 'Cancel';
    }
}
