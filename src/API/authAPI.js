
// export const API_BASE_URL = "http://51.21.132.172:5000/api"; 
export const API_BASE_URL =  "http://localhost:8000/api/admin"; 
export const API_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/register`,
  LOGIN: `${API_BASE_URL}/login`,
  GENERATE_ZIPS:`${API_BASE_URL}/genrate-files`,
  GET_ALL_ZIPS: `${API_BASE_URL}/get-all-zips`,
  DOWNLOAD_BYID_ZIPS:(zipID)=>`${API_BASE_URL}/downloadZip/${zipID}`,
  DELETE_ZIPS:(zipID)=>`${API_BASE_URL}/delete-zip/${zipID}`,

  ADD_USER:`${API_BASE_URL}/add-user`,
  GET_ALL_USERS: `${API_BASE_URL}/get-all-users`,
  DELETE_USER:(id)=>`${API_BASE_URL}/delete-users/${id}`,
  GETBYID_USER:(id)=>`${API_BASE_URL}/getbyid-users/${id}`,
  UPDATEBYID_USER:(id)=>`${API_BASE_URL}/update-users/${id}`,
  IMPORT_USER: `${API_BASE_URL}/import`,
  EXPORT_USER: `${API_BASE_URL}/export`,

  GET_ALL_TASK: `${API_BASE_URL}/getuser-task`,
  GET_BY_USERID_TASK:(userId)=>`${API_BASE_URL}/getbyid-task/${userId}`,
  //update Task
  UPDATE_BY_TASK:(id)=>`${API_BASE_URL}/update-task/${id}`,
};
