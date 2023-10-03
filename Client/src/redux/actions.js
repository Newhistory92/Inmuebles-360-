import axios from "axios";
import {
  // 	GET_PROPERTIES,
  GET_PROPERTY_DETAIL,
  // 	CLEAN_DETAIL,
  // 	ADD_USER,
  // 	USER_LOGIN,
  // 	ADD_PROPERTY,
  // 	CLEAN_FILTERS,
  ERROR,
  SEARCH_PRODUCTO,
  LOAD_USER_POSTS,
  DELETE_POST,
  UPDATE_POST,
} from "./actions_types";

export const getProperty = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/properties");
      console.log("soy data", data);
      return dispatch({
        type: "GET_PROPERTY",
        payload: data,
      });
    } catch (error) {
      return {
        type: "ERROR",
        payload: error.message,
      };
    }
  };
};

export const getPropertyDetail = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/properties/${id}`);
    return dispatch({ type: GET_PROPERTY_DETAIL, payload: data });
  } catch (error) {
    return { type: ERROR, payload: error.message };
  }
};

export const createProperty = (values) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/properties",
        values
      );
      return dispatch({
        type: "CREATE_PROPERTY",
        payload: data,
      });
    } catch (error) {
      return {
        type: "ERROR",
        payload: error.message,
      };
    }
  };
};

export const searchProducto = (query) => {
  return async (dispatch) => {
    try {
      let response;
      if (!query) {
        // Si no se proporciona una ciudad, obtén todos los inmuebles
        response = await axios.get(`${URL}//`);
      } else {
        // Si se proporciona una ciudad, realiza la búsqueda por ciudades
        response = await axios.get(`${URL}/${query}`);
      }
      const inmuebles = response.data; // Cambio 'countries' a 'inmuebles'
      dispatch({
        type: SEARCH_PRODUCTO,
        payload: inmuebles, // Cambio 'countries' a 'inmuebles'
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: "City not found",
      });
    }
  };
};

export const loadUserPosts = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/posts?userId=${userId}`);
      dispatch({
        type: LOAD_USER_POSTS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al cargar las publicaciones del usuario:", error);
      dispatch({
        type: "ERROR",
        payload: "Error al cargar las publicaciones del usuario",
      });
    }
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      dispatch({
        type: DELETE_POST,
        payload: postId,
      });
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
      dispatch({
        type: "ERROR",
        payload: "Error al eliminar la publicación",
      });
    }
  };
};

export const updatePost = (postId, updatedData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/api/posts/${postId}`, updatedData);
      dispatch({
        type: UPDATE_POST,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al actualizar la publicación:", error);
      dispatch({
        type: "ERROR",
        payload: "Error al actualizar la publicación",
      });
    }
  };
};
/////////////////////////////

//   export const cleanDetail = () => {
//     return (dispatch) => {
//         return dispatch({
//           type: CLEAN_DETAIL,
//           payload: [],
//         });
//     };
//   }

//   export const addUser = (user) => async (dispatch) => {
//     try {
//       const { data } = await axios.post(`${URL}/users`, user);
//       dispatch({ type: ADD_USER, payload: data });
//     } catch (error) {
//       return { type: ERROR, payload: error.message };
//     }
//   };

//   export const userLogin = (user) => async (dispatch) => {
//     try {
//       const { data } = await axios.get(`${URL}/users`, user);
//       dispatch({ type: USER_LOGIN, payload: data });
//     } catch (error) {
//       return { type: ERROR, payload: error.message };
//     }
//   };

//   export const addProperty = (property) => async (dispatch) => {
//     try {
//       const { data } = await axios.post(`${URL}/properties`, property);
//       dispatch({ type: ADD_PROPERTY, payload: data });
//     } catch (error) {
//       return { type: ERROR, payload: error.message };
//     }
//   };
//   export const searchProducto = (query) => {

//     return async (dispatch) => {
//         try {
//           let response;
//           if (!query) {
//             // Si no se proporciona una ciudad, obtén todos los inmuebles
//             response = await axios.get(`${URL}//`);
//           } else {
//             // Si se proporciona una ciudad, realiza la búsqueda por ciudades
//             response = await axios.get(`${URL}/${query}`);
//           }
//           const inmuebles = response.data;
//           dispatch({
//             type: SEARCH_PRODUCTO,
//             payload: countries,
//           });
//         } catch (error) {
//           dispatch({
//             type: ERROR,
//             payload: 'Ciudad not found',
//           });
//         }
//       };
//     };

//   export const createInmueble = (inmuebleData) => {
//     return async (dispatch) => {
//         try {
//           const response = await axios.post(`${URL}//`);
//           dispatch({
//             type: CREATE_PRODUCTO,
//             payload: response.data,
//           });
//         } catch (error) {
//           dispatch({
//             type: ERROR,
//             payload: 'Error creating Inmueble',
//           });
//         }
//       };
//     }

//   export const orderByUbicacion = (ubicacion) => {
//     return {

//       type: ORDER_BY_UBICACION,
//         payload: ubicacion,
//     };
// }

//   export const filterByPrecio = (minPrice, maxPrice) =>{
//     return{
//     type: FILTER_BY_PRECIO,
//     payload: { minPrice, maxPrice },
//   };
//   }

//   export const setCurrentPage = (page) => {
//     return{
//   type: SET_CURRENT_PAGE,
//   payload: page,
//   };
// }

//   export const filterByPileta = (pileta) => {
//     return{
//     type: FILTER_BY_PILETA,
//     payload: pileta,
//     }
//   };

//   export const filterByFondo = (fondo) => {
//     return{
//     type: FILTER_BY_FONDO,
//     payload: fondo,
//   }};

//   export const orderByResena = (puntuacion) => {
//     return{
//     type: ORDER_BY_RESENA,
//     payload: puntuacion,
//   }
// };

//   export const filterByCategoria = (casa, departamento) => {
//     return{
//     type: FILTER_BY_CATEGORIA,
//     payload: { casa, departamento },
//   }
// };
/////////////////////////

// import axios from "axios";
// import {
// 	GET_PROPERTIES,
// 	GET_PROPERTY_DETAIL,
// 	CLEAN_DETAIL,
// 	ADD_USER,
// 	USER_LOGIN,
// 	ADD_PROPERTY,
// 	CLEAN_FILTERS,
// 	ERROR,
// } from "./actions_types";

// const URL = "http://localhost:3001";

// export const getProperties = () => async (dispatch) => {
// 	try {
// 		const { data } = await axios.get(`${URL}/properties`);
// 		dispatch({ type: GET_PROPERTIES, payload: data });
// 	} catch (error) {
// 		return { type: ERROR, payload: error.message };
// 	}
// };

// export const getPropertyDetail = (id) => async (dispatch) => {
// 	try {
// 		const { data } = await axios.get(`${URL}/properties/${id}`);
// 		dispatch({ type: GET_PROPERTY_DETAIL, payload: data });
// 	} catch (error) {
// 		return { type: ERROR, payload: error.message };
// 	}
// };

// export const cleanDetail = () => (dispatch) => {
// 	dispatch({ type: CLEAN_DETAIL });
// };

// export const addUser = (user) => async (dispatch) => {
// 	try {
// 		const { data } = await axios.post(`${URL}/users`, user);
// 		dispatch({ type: ADD_USER, payload: data });
// 	} catch (error) {
// 		return { type: ERROR, payload: error.message };
// 	}
// };

// export const userLogin = (user) => async (dispatch) => {
// 	try {
// 		const { data } = await axios.get(`${URL}/users`, user);
// 		dispatch({ type: USER_LOGIN, payload: data });
// 	} catch (error) {
// 		return { type: ERROR, payload: error.message };
// 	}
// };

// export const addProperty = (property) => async (dispatch) => {
// 	try {
// 		const { data } = await axios.post(`${URL}/properties`, property);
// 		dispatch({ type: ADD_PROPERTY, payload: data });
// 	} catch (error) {
// 		return { type: ERROR, payload: error.message };
// 	}
// };

// export const cleanFilters = () => (dispatch) => {
// 	dispatch({ type: CLEAN_FILTERS });
// };
