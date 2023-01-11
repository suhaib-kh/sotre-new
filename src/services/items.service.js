
const fetchItems = async() => {
  return await fetch('https://6385ec80beaa6458266d44f1.mockapi.io/nemo/menu')
    .then((response) => response.json())
    .catch((error) => {
      alert(error.toString());
    });
};

// /**
//  * Real Fetching of single item
//  * @param {number} id 
//  */
const fetchItem = async (id) => {
  try {
    const response = await fetch(`https://6385ec80beaa6458266d44f1.mockapi.io/nemo/menu/${id}`);
    if (response.status === 200) {
      const item = await response.json();
      return item;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
//
const createItem =async (item) => {
  return await fetch('https://6385ec80beaa6458266d44f1.mockapi.io/nemo/menu/',
    {
      method: 'POST',
      body: JSON.stringify(item)
    })
    .then(async response => {
      if (response.status === 201) {
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.log(error);
      return false;
    });
};

/**
 * Real Deleting of single item
 * @param {number} id 
 */
const deleteItem = async (id) => {
  try {
    const response = await fetch(`https://6385ec80beaa6458266d44f1.mockapi.io/nemo/menu/${id}`,
      { method: 'DELETE' }
    );
    if (response) {
      return true;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const updateItem = async (item) => {
  return await fetch(`https://6385ec80beaa6458266d44f1.mockapi.io/nemo/menu/${item.id}`,
    {
      method: 'PUT',
      body: JSON.stringify(item)
    })
    .then(async response => {
      if (response) {
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.log(error);
      return false;
    });
};

export {
  fetchItem,
  fetchItems,
  createItem,
  updateItem,
  deleteItem
};