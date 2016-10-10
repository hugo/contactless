export const getContacts = (API_HOST, authService) => () => {
  return fetch(`${API_HOST}/contacts`, {
    headers: {
      'Authorization': `Bearer ${authService.getToken()}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}

export const saveContact = (API_HOST, authService) => (contact) => {
  return fetch(`${API_HOST}/contacts/add`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authService.getToken()}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: contact.toJSON()
  }).then(res => res.json())
}

export const deleteContact = (API_HOST, authService) => (id, etag) => {
  return fetch(`${API_HOST}/contacts/delete`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${authService.getToken()}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ uri: id, etag })
  })//.then(res => res.json())
}

export default {
  getContacts,
  deleteContact,
  saveContact
}
