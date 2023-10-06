import("./createProperty.css");
import React from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { createProperty } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import fondo from "../../assets/img/loginRegister.jpg";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png"


export default function CreateProperty() {
  const user = useSelector((state) => state.user);
  let dates = [];
  const dispatch = useDispatch();

  const uploadImagesToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file[0]);
    try {
      const { data } = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
    }
  };

  function generateDatesInRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1); 
    }
    return dates;
  }

  const initialValues = {
    title: "",
    description: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
    bedrooms: 0,
    bathrooms: 0,
    price: 0,
    type: "casa",
    availableDates: {
      startDate: "",
      endDate: "",
    },
    images: [],
    amenities: {
      covered_area: 0,
      garage: false,
      antique: 0,
      grill: false,
      heating: false,
    },
    additional: {
      swimmingpool: false,
      terrace: false,
      dining_room: false,
      washing_machine: false,
      internet_wifi: false,
      refrigerator: false,
      microwave: false,
      coffee_maker: false,
      patio: false,
      balcony_patio: false,
    },
    owner: "651459f5da45532a97080dee", // CAMBIAR A "user._id" cuando este terminado el login
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const {
      title,
      additional,
      address,
      amenities,
      bathrooms,
      bedrooms,
      description,
      images,
      owner,
      price,
      type,
    } = values;
    const newProperty = {
      title,
      additional,
      address,
      amenities,
      availableDays: dates,
      bathrooms,
      bedrooms,
      description,
      images,
      owner,
      price,
      type,
    };
    console.log("soy la info a mandar", newProperty);

    dispatch(createProperty(newProperty));
    setSubmitting(false);
  };

   const validationSchema = Yup.object().shape({
        title: Yup.string()
          .required("El título es requerido")
          .min(5, "Título muy corto, debe tener al menos 5 caracteres"),
        description: Yup.string().required("La descripción es requerida"),
        address: Yup.object().shape({
          street: Yup.string().required("La calle es requerida"),
          city: Yup.string().required("La ciudad es requerida"),
          state: Yup.string().required("El estado es requerido"),
          zipcode: Yup.number().required("El código postal es requerido"),
        images: Yup.array().required("Debe agregar 5 imágenes al menos").test("is-images-length", "Debe agregar al menos 5 imágenes", (images) => {
          return images && images.length === 5
        }),   
      
        bedrooms: Yup.number()
.required("El número de habitaciones es requerido")
          .min(0)
          .max(10),
        bathrooms: Yup.number()
          .required("El número de baños es requerido")
          .min(0)
          .max(10),
        price: Yup.number().required("El precio es requerido").min(1).max(100000),
    
        availableDates: Yup.object().shape({
          startDate: Yup.date().required("Fecha de inicio requerida"),
          endDate: Yup.date()
            .required("Fecha de finalización requerida")
            .min(
              Yup.ref("startDate"),
              "La fecha de finalización debe ser posterior a la fecha de inicio"
            ),
        }),
      }),
    });

  return (

    
    <div
      className="min-h-screen w-screen flex items-center justify-center bg-fuchsia-900"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex justify-end items-center absolute top-0 left-0 px-6 py-6  ">
  <img
    src={logo}
    alt="Logo"
    className="w-auto h-16 "
  />

</div>
<Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className="bg-white rounded-lg p-6 shadow-lg my-10">
            <h1 className="text-5xl font-semibold text-left mb-4 text-gray-700">
              Register your property
            </h1>
            <Link to="/">
              <button className="block bg-fuchsia-900 text-white px-4 py-2 rounded-full hover:bg-fuchsia-600 mb-2">
                Home
              </button>
            </Link>
          {/* TITULO DE LA PUBLICACION */}
            <div className="block text-left text-gray-700">
              <label htmlFor="title">Title:</label>
              <Field
                type="text"
                name="title"
                className="mt-1 p-2 w-full rounded-full border,color:red"
              />
              <ErrorMessage name="title" 
              component="div" 
              className="text-red-600 text-sm"
              />
            </div>
           {/* DESCRIPCION */}
            <div className="block text-left text-gray-700">
              <label htmlFor="description">Description:</label>
              <Field
                as="textarea"
                name="description"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage name="description" 
              component="div"
              className="text-red-600 text-sm"
              />


            </div>
            {/* DIRECCION */}
            <div className="block text-left text-gray-700">
              <label htmlFor="Address" className="block">
                Address:
              </label>
              <label htmlFor="address.street">Street:</label>
              <Field
                type="text"
                name="address.street"
                className="mt-1 p-2 w-full rounded-full border "
              />
              <ErrorMessage name="address.street" component="div"
                className="text-red-600 text-sm" />
            
              <label htmlFor="address.city">City:</label>
              <Field
                type="text"
                name="address.city"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage name="address.city" 
              component="div"
              className="text-red-600 text-sm" />

              <label htmlFor="address.state">State:</label>
              <Field
                type="text"
                name="address.state"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage name="address.state" component="div"
                className="text-red-600 text-sm"/>

              <label htmlFor="address.zipcode">Zipcode:</label>
              <Field
                type="number"
                name="address.zipcode"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage name="address.zipcode" component="div"
               className="text-red-600 text-sm" />
            </div>

            {/* CANT DE CAMAS */}
            <div className="block text-left text-gray-700">
              <label htmlFor="bedrooms">Bedrooms:</label>
              <Field
                type="number"
                name="bedrooms"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage name="bedrooms" component="div"
               className="text-red-600 text-sm" />
         
            </div>
          {/* CANT DE BANOS */}
            <div className="block text-left text-gray-700">
              <label htmlFor="bathrooms">Bathrooms:</label>
              <Field
                type="number"
                name="bathrooms"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage name="bathrooms" component="div"
               className="text-red-600 text-sm"/>
            </div>
            {/* PRECIO */}
            <div className="block text-left text-gray-700">
              <label htmlFor="price">Price:</label>
              <Field
                type="number"
                name="price"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage name="price" component="div"  className="text-red-600 text-sm"/>
            </div>
         {/* TIPO(CASA-DEPTO-PH) */}
            <div className="block text-left text-gray-700">
              <label htmlFor="type">Type:</label>
              <Field
                as="select"
                name="type"
                className="mt-1 p-2 w-full rounded-full border"
              >
                <option value="house">HOUSE</option>
                <option value="depto">APPARTMENT</option>
                <option value="ph">PH</option>
              </Field>
            </div>
           {/* COMODIDADES(METROS2-ANTIGUEDAD-GARAGE-GRILL-CALEFACCION) */}
            <div>
              <p>Amenities</p>


              <label htmlFor="amenities.covered_area">Covered_area:</label>
 <Field
  type="number"
  name="amenities.covered_area"
  className="mt-1 p-2 w-full rounded-full border text-black"
/>
              <ErrorMessage name="amenities.covered_area" component="div" className="text-red-600 text-sm" />
              <label htmlFor="amenities.antique">Antique:</label>
              <Field
  type="number"
  name="amenities.antique"
  className="mt-1 p-2 w-full rounded-full border text-black"
/>
        <div>
  <ErrorMessage name="amenities.antique" component="div" />
  <label style={{ display: "block" }}>


  <div>
  <p>Additional</p>
  <label style={{ display: "block", marginBottom: "10px" }}>
    <Field type="checkbox" name="amenities.garage" />
    Garage
  </label>
  <label style={{ display: "block", marginBottom: "10px" }}>
    <Field type="checkbox" name="amenities.grill" />
    Grill
  </label>
  <label style={{ display: "block", marginBottom: "10px" }}>
    <Field type="checkbox" name="amenities.heating" />
    Heating
  </label>
</div>


    <Field type="checkbox" name="additional.swimmingpool" />
    Swimming Pool
  </label>
  <label style={{ display: "block", marginBottom: "10px" }}>
    <Field type="checkbox" name="additional.terrace" />
    Terrace
  </label>
  <label style={{ display: "block", marginBottom: "10px" }}>
    <Field type="checkbox" name="additional.dining_room" />
    Dining_Room
  </label>
  <label style={{ display: "block", marginBottom: "10px" }}>
    <Field type="checkbox" name="additional.washing_machine" />
    Washing_Machine
  </label>
  <label style={{ display: "block", marginBottom: "10px" }}>
    <Field type="checkbox" name="additional.internet_wifi" />
    Internet_Wifi
  </label>
  <label style={{ display: "block", marginBottom: "10px" }}>
    <Field type="checkbox" name="additional.refrigerator" />
    Refrigerator
  </label>
  <label style={{ display: "block", marginBottom: "10px" }}>
    <Field type="checkbox" name="additional.microwave" />
    Microwave
  </label>
  <label style={{ display: "block", marginBottom: "10px" }}>
    <Field type="checkbox" name="additional.coffee_maker" />
    Coffee_Maker
  </label>
  <label style={{ display: "block", marginBottom: "10px" }}>
    <Field type="checkbox" name="additional.patio" />
    Patio
  </label>
  <label style={{ display: "block", marginBottom: "15px" }}>
    <Field type="checkbox" name="additional.balcony_patio" />
    Balcony_Patio
  </label>
</div>
</div>
{/* FECHAS */}
<div className="block text-left text-gray-700">
  <div>
    <label htmlFor="availableDates.startDate">Fecha de inicio:</label>
    <Field name="availableDates.startDate" type="date" />
    <ErrorMessage name="availableDates.startDate" component="div" />
  </div>

  <div className="mt-4">
    <label htmlFor="availableDates.endDate">Fecha de finalizacion:</label>
    <Field
      name="availableDates.endDate"
      type="date"
      onChange={(event) => {
        const endDateValue = event.target.value;
        setFieldValue("availableDates.endDate", endDateValue);
        const startDateValue = values.availableDates.startDate;

        if (startDateValue && endDateValue) {
          const startDate = new Date(startDateValue);
          const endDate = new Date(endDateValue);
          dates = generateDatesInRange(startDate, endDate);
          console.log(dates);
        }
      }}
    />
    <ErrorMessage name="availableDays.endDate" component="div" />
  </div>
</div>
          IMAGENES
          <Dropzone
  onDrop={async (acceptedFiles) => {
                if (values.images.length + acceptedFiles.length <= 5) {
                  const uploadImageUrl = await uploadImagesToCloudinary(
                    acceptedFiles
                  );
                  console.log("soy la devolucion del back", uploadImageUrl);
                  const newImages = [...values.images, uploadImageUrl];
                  setFieldValue("images", newImages);
                } else {
                  alert("No puedes subir más de 5 imágenes."); // PASAR ALERT A INGLES
                }
              }}
              accept="image/*"
              multiple={false}
              className="dropzone"
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  <div className="image-container"> {/* Agrega la clase "image-container" aquí */}
                    {values.images &&
                      values.images.map(
                        (e) =>
                          e &&
                          e.imageUrl && (
                            <img
                              style={{ maxWidth: "10em", maxHeight: "10em" }}
                              key={e.imageUrl}
                              src={e.imageUrl}
                              alt={e.imageUrl}
                            />
                          )
                      )}
                  </div>
                  {!values.images && (
                    <p className="text-black">
                      Arrastra y suelta archivos aquí o haz clic para
                      seleccionar (máximo 5 imágenes)
                    </p>
                  )}
                </div>
              )}
            </Dropzone>
            <button
              type="submit"
              disabled={isSubmitting}
              className="block bg-fuchsia-900 text-white px-4 py-2 rounded-full hover:bg-fuchsia-600 mb-2"
            >
              Create Property
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
