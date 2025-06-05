import axios from "axios";
import { API_ENDPOINTS } from "../API/authAPI";
import axiosInstance from "../interceptor";
const token = localStorage.getItem('token');
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(API_ENDPOINTS.REGISTER, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error("Error in registerUser function:", error);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(API_ENDPOINTS.LOGIN, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    } catch (error) {
        console.error("Error in registerUser function:", error);
        throw error;
    }
};

export const addZips = async (data) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.GENERATE_ZIPS, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in function:", error);
        throw error;
    }
};

export const getAllZips = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_ZIPS, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response?.data?.zipRecords;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { categories: [], totalPages: 1 };
    }
};
export const downloadByIdZip = async (id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.DOWNLOAD_BYID_ZIPS(id), {
            headers: { Authorization: `Bearer ${token}` },
            responseType: 'blob', // 🔥 This ensures the response is treated as a file
        });

        // Create a blob and trigger download
        const blob = new Blob([response.data], { type: 'application/zip' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `patients_data_${id}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return response;
    } catch (error) {
        console.error("Error fetching zip file:", error);
        throw error;
    }
};

export const deleteZips = async (id) => {
    try {
        const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_ZIPS(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data?.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

export const addUser = async (userData) => {
    try {
        const token = localStorage.getItem("token"); // Token को localStorage से प्राप्त करें
        const response = await axios.post(API_ENDPOINTS.ADD_USER, userData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // यहां सुधार किया गया
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error in addUser function:", error);
        throw error.response?.data || { message: "Something went wrong" };
    }
};
// export const getAllUsers = async (search = "", page = 1) => {
//     try {
//         const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_USERS, {
//             params: { search, page, limit: 10 },
//             'Authorization': `Bearer ${token}`,
//         });

//         if (response?.data) {
//             return {
//                 users: response?.data,
//                 totalPages: response?.data.totalPages,
//             };
//         }
//         return { users: [], totalPages: 1 };
//     } catch (error) {
//         console.error("Error fetching categories:", error);
//         return { categousersries: [], totalPages: 1 };
//     }
// };



export const getAllUsers = async (search = "", page = 1, filters = {}) => {
  try {
    const token = localStorage.getItem("token"); // adjust if you store token differently

    const { sortBy = "", fromDate = "", toDate = "" } = filters;

    const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_USERS, {
      params: {
        search,
        page,
        limit: 10,
        sort: sortBy,
        fromDate,
        toDate,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.data) {
      return {
        users: response?.data,
        totalPages: response?.data.totalPages,
      };
    }

    return { users: [], totalPages: 1 };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [], totalPages: 1 };
  }
};


export const getAllUsersWithoutSearch = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_USERS, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });


        return response?.data
    } catch (error) {
        console.error("Error fetching categories:", error);

    }
};

export const deleteUser = async (id) => {
    try {
        const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_USER(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data?.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

export const getbyidUser = async (id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETBYID_USER(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data;
    } catch (error) {
        console.error("Error feching user:", error);
        throw error;
    }
};


export const updateByIDUser = async (id, userData,) => {
    try {
        const response = await axiosInstance.put(API_ENDPOINTS.UPDATEBYID_USER(id), userData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Ensure token is correctly passed
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in updateByIDUser function:", error);
        throw error;
    }
};


export const importUser = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.post(API_ENDPOINTS.IMPORT_USER, { users: data }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response?.data;
    } catch (error) {
        console.error("Error importing users:", error);
        throw error;
    }
};



export const addCategory = async (data) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.ADD_CATEGORY, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in function:", error);
        throw error;
    }
};



export const getAllCategory = async (search = "", page = 1) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETALL_CATEGORY, {
            headers: { Authorization: `Bearer ${token}` },
            params: { search, page, limit: 10 },
        });

        if (response?.data?.data) {
            return {
                categories: response?.data?.data,  // Changed 'users' to 'categories'
                totalPages: response?.data.totalPages,
            };
        }
        return { categories: [], totalPages: 1 };
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { categories: [], totalPages: 1 };
    }
};

export const getAllCategoryWithoutSearch = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETALL_CATEGORY, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response?.data?.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { categories: [], totalPages: 1 };
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_CATEGORY(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data?.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

export const getbyidCategory = async (id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETBYID_CATEGORY(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data?.data;
    } catch (error) {
        console.error("Error feching user:", error);
        throw error;
    }
};


export const updateByIDCategory = async (userData, id) => {
    try {
        const response = await axiosInstance.put(API_ENDPOINTS.UPDATEBYID_CATEGORY(id), userData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Ensure token is correctly passed
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in updateByIDUser function:", error);
        throw error;
    }
};

export const addMeasurements = async (data) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.ADD_MESUREMENT, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in function:", error);
        throw error;
    }
};

export const getAllMeasurements = async (search = "") => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETALL_MESUREMENT, {
            headers: { Authorization: `Bearer ${token}` },
            params: { search },
        });

        if (response?.data?.data) {
            return {
                categories: response?.data?.data,
                // totalPages: response?.data.totalPages,
            };
        }
        return { categories: [] };
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { categories: [] };
    }
};

export const deleteMeasurements = async (id, deleteEntireMeasurement) => {
    try {
        const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_MESUREMENT(id), {
            headers: { Authorization: `Bearer ${token}` },
            data: {

                deleteEntireMeasurement
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error deleting measurement:", error);
        throw error;
    }
};

export const deleteMeasurementsPArticular = async (id, measurementId) => {
    try {
        const response = await axios.delete(API_ENDPOINTS.DELETE_MESUREMENT(id), {
            headers: { Authorization: `Bearer ${token}` },
            data: { measurementId }, // Send measurementId as part of the request body
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting measurement:", error);
        throw error;
    }
};

export const getbyidMeasurements = async (id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GETBYID_MESUREMENT(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data;
    } catch (error) {
        console.error("Error feching user:", error);
        throw error;
    }
};

export const updateByIDMeasurements = async (userData, id) => {
    try {
        const response = await axiosInstance.put(API_ENDPOINTS.UPDATEBYID_MESUREMENT(id), userData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in updateByIDUser function:", error);
        throw error;
    }
};


export const getAllOrders = async (search = "", page = 1) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(API_ENDPOINTS.GETALL_ORDERS, {
            headers: { Authorization: `Bearer ${token}` },
            params: { search, page, limit: 10 }
        });

        if (response?.data?.orders) {
            return {
                users: response.data.orders,
                totalPages: response.data.totalPages
            };
        }
        return { users: [], totalPages: 1 };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { users: [], totalPages: 1 };
    }
};


export const updateByIDOrders = async (userData, id) => {
    try {
        const response = await axiosInstance.put(API_ENDPOINTS.UPDATEBYID_ORDERS(id), userData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Ensure token is correctly passed
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in updateByIDUser function:", error);
        throw error;
    }
};

export const getAllTask = async (fullName, page = 1) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_TASK, {
            params: { fullName, page, limit: 10 },

            Authorization: `Bearer ${token}`

        });

        if (response?.data) {
            return {
                tasks: response?.data,
                totalPages: response?.data.totalPages,
            };
        }
        return { tasks: [], totalPages: 1 };
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { tasks: [], totalPages: 1 };
    }
};

export const getAllTaskWithoutSearch = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_TASK, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
         return response?.data
   } catch (error) {
        console.error("Error fetching tasks:", error);

    }
};


export const getbyUserIdTask = async (id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GET_BY_USERID_TASK(id), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data;
    } catch (error) {
        console.error("Error feching user:", error);
        throw error;
    }
};

export const updateByIDTask = async (userData, id) => {
    try {
        const response = await axiosInstance.put(API_ENDPOINTS.UPDATE_BY_TASK(id), userData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Ensure token is correctly passed
            }
        });
        return response?.data;
    } catch (error) {
        console.error("Error in updateByIDUser function:", error);
        throw error;
    }
};