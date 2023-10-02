const initialState = {
  userPosts: [], // Un array para almacenar las publicaciones del usuario actual
};

const postsReducer = (state = initialState, action) => {
  let updatedUserPosts; // Declarar la variable fuera del bloque
  let updatedIndex;     // Declarar la variable fuera del bloque

  switch (action.type) {
    case 'LOAD_USER_POSTS':
      return {
        ...state,
        userPosts: action.payload, // Actualiza el estado con las publicaciones del usuario
      };
    // Otros casos y reducciones de acciones relacionadas con las publicaciones
    case 'DELETE_POST':
      // Filtra las publicaciones del usuario para eliminar la que tiene el ID especificado
      updatedUserPosts = state.userPosts.filter((post) => post.id !== action.payload);
      return {
        ...state,
        userPosts: updatedUserPosts,
      };

    case 'UPDATE_POST':
      // Encuentra la publicación actualizada en el array de publicaciones del usuario
      updatedIndex = state.userPosts.findIndex((post) => post.id === action.payload.id);
      // Reemplaza la publicación antigua con la actualizada en el array de publicaciones del usuario
      state.userPosts[updatedIndex] = action.payload;
      return { ...state };
    default:
      return state;
  }
};

export default postsReducer;



/* import {
  FETCH_USER_PROPERTIES_SUCCESS,
  UPDATE_PROPERTY_SUCCESS,
  DELETE_PROPERTY_SUCCESS,
} from "./actions";

const initialState = {
  userProperties: [], // El estado inicial contiene una lista vacía de propiedades del usuario.
  user: {
    email: "",
    name: "",
    lastName: "",
    country: "",
    city: "",
    address: "",
    phoneNumber: "",
  },
  payment: {
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  },
};

const userReducer = (state = initialState, action) => {
  let updatedPropertiesUpdate; // Declara las variables fuera del switch
  let updatedPropertiesDelete;
  switch (action.type) {
    case "UPDATE_USER":
      // Simulamos la actualización del usuario en el estado de Redux
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case "UPDATE_PAYMENT":
      // Simulamos la actualización de la información de pago en el estado de Redux
      return {
        ...state,
        payment: { ...state.payment, ...action.payload },
      };

      case FETCH_USER_PROPERTIES_SUCCESS: // Cuando se recibe la acción de éxito para obtener propiedades del usuario.
      return { ...state, userProperties: action.userProperties }; // Actualiza el estado con las nuevas propiedades obtenidas.

    case UPDATE_PROPERTY_SUCCESS:
      // Encuentra la propiedad actualizada en la lista de propiedades y reemplázala con los datos actualizados.
      updatedPropertiesUpdate = state.userProperties.map((property) =>
        property.id === action.updatedProperty.id
          ? action.updatedProperty
          : property
      );
      return { ...state, userProperties: updatedPropertiesUpdate };

    case DELETE_PROPERTY_SUCCESS:
      // Filtra la propiedad eliminada de la lista de propiedades.
      updatedPropertiesDelete = state.userProperties.filter(
        (property) => property.id !== action.deletedPropertyId
      );
      return { ...state, userProperties: updatedPropertiesDelete };

    default:
      return state; // En otros casos, devuelve el estado actual sin cambios.
  }
};

export default userReducer;
 */

// reducers/postsReducer.js
