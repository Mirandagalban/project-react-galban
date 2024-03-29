import { useState, useContext } from "react";
import "./checkout.css";
import { CartContext } from "../../context/CartContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [user, setUser] = useState({});
  const [validateEmail, setValidateEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const { cart, total, clear } = useContext(CartContext);

  const datosComprador = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const finalizarCompra = (e) => {
    e.preventDefault();
    if (user.name && !user.phone) {
      alert("Por favor, complete los campos");
    } else {
      let order = {
        user,
        item: cart,
        total: total(),
        date: serverTimestamp(),
      };
      const sales = collection(db, "orders");
      addDoc(sales, order)
        .then((res) => {
          Swal.fire({
            title: "Desea realizar la compra?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si!",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                "¡Compra realizada!",
                "Gracias por confiar en nosotros"
              );
              setOrderId(res.id);
              clear();
            }
          });
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      {orderId !== "" ? (
        <div className="order-checkout">
          <h3>¡Felicitaciones su orden fue realizada con exito!</h3>
          <h5>Su id de compra es {orderId}</h5>
          <Link to="/" className="btn btn-checkout">
            Volver al inicio
          </Link>
        </div>
      ) : (
        <>
          <div className="bienvenido-form" id="form">
            <h2>¡Hola! ¿Terminamos la compra? </h2>
            <p>
              Te invitamos a llenar el formulario con tus datos para finalizar
              la compra.
            </p>
          </div>
          <section className="formulario">
            <form className="formulario-body" onSubmit={finalizarCompra}>
              <input
                onChange={datosComprador}
                className="formulario-elements"
                type="text"
                name="nombre y apellido"
                id="nombre y apellido"
                placeholder="Ingresar nombre y apellido"
                required
              />
              <input
                onChange={datosComprador}
                className="formulario-elements"
                type="number"
                name="telefono"
                id="telefono"
                placeholder="+54911"
              />
              <input
                onChange={datosComprador}
                className="formulario-elements"
                type="email"
                name="email"
                id="email"
                placeholder="Ingresar email"
                required
              />
              <input
                onChange={(e) => setValidateEmail(e.target.value)}
                className="formulario-elements"
                type="emailVerficacion"
                name="emailVerificacion"
                id="emailVerificacion"
                placeholder="Volver a ingresar email"
                required
              />
              <button
                className="btn-registro"
                type="submit"
                disabled={validateEmail !== user.email}
              >
                Finalizar compra
              </button>
            </form>
          </section>
        </>
      )}
    </div>
  );
};

export default Checkout;
