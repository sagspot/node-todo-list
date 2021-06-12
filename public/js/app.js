const listItems = document.querySelector('.list-items').querySelectorAll('li');
const editBtns = document.querySelectorAll('.edit');
const deleteBtns = document.querySelectorAll('.delete');
const listForm = document.querySelector('.list-form');

listItems.forEach((listItem) => {
  const checkbox = listItem.querySelector('input');
  listItem.classList.contains('complete')
    ? (checkbox.checked = true)
    : (checkbox.checked = false);
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

    listForm.onsubmit = (e) => {
      e.preventDefault();
      const url = `/api/list/${id}`;
      if (!itemInput.value) {
        console.log('Please enter an item');
        return;
      }
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
        .then((response) => console.log(response.json()))
        .then(() => console.log(`Item updated`))
        .catch((err) => console.error(err));

      itemToUpdate.innerHTML = itemInput.value;
      listForm.querySelector('input[type="submit"]').value = 'Add Item';
      listForm.method = 'POST';
      itemInput.value = '';
    };
  });
});

// DELETE
deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener('click', (e) => {
    const id = e.currentTarget.dataset.id;
    const url = `/api/list/${id}`;

    fetch(url, { method: 'DELETE' })
      .then((response) => console.log(response.json()))
      .then(() => console.log(`Item deleted: (${id})`))
      .catch((err) => console.error(err));

    const removeItem = e.currentTarget.closest('.list-item');
    removeItem.remove();
  });
});
