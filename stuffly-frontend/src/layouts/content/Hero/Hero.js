import React, { useState } from "react";
import "./Hero.css";

function Hero(props) {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="h">
        <div class="hero">
          <div class="hero__inner">
            <h1 class="hero__title">Stuffly®</h1>
            <p class="hero__tagline">
              Organisir barang-barangmu dengan mudah disini!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
