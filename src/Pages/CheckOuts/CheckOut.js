import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/Authprovider/Authprovider";
import useTitle from "../../hooks/useTitle";

const CheckOut = () => {
  const { title, _id, price, description, img } = useLoaderData();
  const { user } = useContext(AuthContext);
  useTitle("CheckOut");

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || "Unregisterd";
    const phone = form.phone.value;
    const message = form.message.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      petaint: name,
      email,
      phone,
      message,
    };

    fetch("https://dr-helal-server.vercel.app/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          alert("Your Revew Succcess Fully");
          form.reset();
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div className="card lg:card-side bg-base-100 my-10">
        <figure className="w-1/2">
          <img src={img} alt="Album" className="rounded-2xl" />
        </figure>
        <div className="card-body w-1/2">
          <h3 className="text-5xl text-center card-title">{title}</h3>
          <h2 className="text-xl">{description}</h2>
          <h2 className="text-orange-500 text-2xl font-bold">Charg: ${price}</h2>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <h2 className="text-2xl text-center">This is Your Revew Page</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
          <input name="firstName" type="text" placeholder="First Name" className="input w-full input-bordered rounded-md" required />
          <input name="lastName" type="text" placeholder="Last Name" className="input w-full input-bordered rounded-md" required />
          <input name="phone" type="text" placeholder="Your Phone" className="input w-full input-bordered rounded-md" required />
          <input name="email" type="text" defaultValue={user?.email} placeholder="Your Email" className="input w-full input-bordered rounded-md" required readOnly />
        </div>
        <textarea name="message" className="textarea textarea-bordered h-24 w-full rounded-md" placeholder="Your Massage" required></textarea>
        <input className="btn rounded-md mb-8" type="submit" value="Confirm" />
      </form>
    </div>
  );
};

export default CheckOut;
