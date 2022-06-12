import React, { useState } from "react";
import { Switch } from "react-router";

// appshell
import HeaderComponent from "../layouts/appshell/Header/Header";

// main
import Hero from "../layouts/content/Hero/Hero";
import Catalog from "../layouts/content/Catalog/Catalog";

function Router(props) {
  return (
    <main>
      <HeaderComponent />
      <Hero />
      <Catalog />
    </main>
  );
}

export default Router;
