const listItems = document.querySelector('.list-items');
const editBtns = document.querySelectorAll('.edit');
const deleteBtns = document.querySelectorAll('.delete');
const listForm = document.querySelector('.list-form');
const alertDiv = document.getElementById('alert');

listForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const url = '/api/list';
  const [input] = e.currentTarget.querySelectorAll('input#name');

  const item = input.value;
  if (item === '') return alert('Please add an item', 'danger');

  if (e.currentTarget.method.toUpperCase() === 'POST') {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item }),
    })
      .then((res) => res.json())
      .then((data) => {
        const { item: newItem } = data;
        let li = document.createElement('li');
        li.classList.add(
          'list-item',
          newItem.status,
          'd-flex',
          'justify-content-between',
          'align-items-center',
          'mb-2'
        );
        li.innerHTML = `<div class='list-item--text'>
            <input type='checkbox' name='${newItem.status}' class='checkbox me-2' />
            <span class='item'>${newItem.item}</span>
          </div>
  
          <div class='btns'>
            <button data-id='${newItem.id}' class='fas fa-edit text-success edit'></button>
            <button data-id='${newItem.id}' class='fas fa-trash text-danger delete'></button>
          </div>`;

        listItems.appendChild(li);

        input.value = '';
        input.focus();
        alert('Item added', 'success');
      })
      .catch((err) => alert(err, 'danger'));
  }
});

// UPDATE
editBtns.forEach((editBtn) => {
  editBtn.addEventListener('click', (e) => {
    const item = e.currentTarget.closest('.list-item');

    listForm.querySelector('input[type="submit"]').value = 'Edit Item';
    listForm.method = 'PUT';
    const itemInput = listForm.querySelector('input[type="text"]');
    const itemToUpdate = item.querySelector('.item');
    itemInput.select();
    itemInput.value = itemToUpdate.innerHTML;
    const id = e.currentTarget.dataset.id;

    if ((listForm.method = 'PUT')) {
      listForm.onsubmit = (e) => {
        e.preventDefault();
        const url = `/api/list/${id}`;
        if (!itemInput.value) return console.log('Please enter an item');
        const updatedItem = {
          id,
          item: itemInput.value,
          status: item.classList.contains('complete') ? 'complete' : 'pending',
        };

        fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedItem),
        })
          .then((res) => res.json())
          .then((data) => alert('Item updated', 'success'))
          .catch((err) => alert(err, 'danger'));

        itemToUpdate.innerHTML = itemInput.value;
        listForm.querySelector('input[type="submit"]').value = 'Add Item';
        listForm.method = 'POST';
        itemInput.value = '';
      };
    }
  });
});

// DELETE
deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener('click', (e) => {
    const id = e.currentTarget.dataset.id;
    const url = `/api/list/${id}`;

    fetch(url, { method: 'DELETE' })
      .then((response) => console.log(response.json()))
      .then(() => alert('Item deleted', 'warning'))
      .catch((err) => alert(err, 'danger'));

    const removeItem = e.currentTarget.closest('.list-item');
    removeItem.remove();
  });
});

function alert(text, type) {
  alertDiv.classList.add('alert', `alert-${type}`);
  alertDiv.innerText = text;

  setTimeout(() => {
    alertDiv.className = '';
    alertDiv.innerText = '';
  }, 3000);
  return;
}
