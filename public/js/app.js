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

editBtns.forEach((editBtn) => {
  editBtn.addEventListener('click', (e) => {
    const item = e.currentTarget.closest('.list-item');

    listForm.querySelector('input[type="submit"]').value = 'Edit Item';
    listForm.method = 'PUT';
    const itemInput = listForm.querySelector('input[type="text"]');
    itemInput.value = item.querySelector('.item').innerHTML;

    const updatedItem = {
      id: e.currentTarget.dataset.id,
      item: itemInput.value,
      status: item.classList.contains('complete') ? 'complete' : 'pending',
    };

    listForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('form submited');
      console.log(updatedItem);
    });
  });
});

const xhr = new XMLHttpRequest();

// deleteBtns.forEach((deleteBtn) => {
//   deleteBtn.addEventListener('click', (e) => {
//     const id = e.currentTarget.dataset.id;
//     const url = `/delete/${id}`;
//     xhr.open('DELETE', url, true);
//     xhr.onreadystatechange = () => {
//       if (xhr.readyState == 4 && xhr.status == 200) {
//         console.log(xhr.responseText);
//       }
//     };
//   });
// });
