import React from "react";

export const Map = () => {
  return (
    <>
      <section className="my-12">
        <h2 className="items-center justify-center flex flex-wrap  mt-5  text-2xl">
          アクセス
        </h2>

        <div className="items-center justify-center flex flex-wrap  my-5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.4196995895195!2d139.71783801517142!3d35.666666438378215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b3eb5a3fcc3%3A0xa2fa829c2ecb4a37!2z44OZ44Or44OG5Y2X6Z2S5bGxLeKFoA!5e0!3m2!1sja!2sjp!4v1666788131821!5m2!1sja!2sjp"
            width="400"
            height="300"
            style={{ border: "0" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  );
};
