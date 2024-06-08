import axios from 'axios'
const baseUrl = '/api/messages'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

/* Check if this is okay */
const addLike = (id) => {
  const request = axios.patch(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, addLike }