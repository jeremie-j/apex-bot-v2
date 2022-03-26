const BACKEND_URL = 'http://127.0.0.1:8000/'
const PREFIX = ''
import fetch from 'node-fetch'


export default async function request(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  body?: any,
  params?: any,
) {
  if (params !== null) {
    for (const [key, value] of Object.entries(params)) {
      if (value === null) {
        delete params[key]
      }
    }
  }


  const urlParams = new URLSearchParams(params)

  const resp = await fetch(`${BACKEND_URL}${PREFIX}${url}?${urlParams.toString()}`, { 'method': method, 'body': body, })



  // if (body !== undefined) {
  //   requestInit.body = body
  //   headers.append('content-type', 'application/json')
  // }
  // requestInit.headers = headers

  const data = await resp.json()
  if (resp.ok) return data
  else throw new Error("Error")
}