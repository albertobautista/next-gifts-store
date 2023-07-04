import bcrypt from "bcryptjs";

interface SeedProduct {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: TSize[];
  slug: string;
  tags: string[];
  title: string;
  type: TTypes;
  gender: TGender;
}

export type TSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";

type TTypes =
  | "shirts"
  | "pants"
  | "hoodies"
  | "hats"
  | "jerseys"
  | "shorts"
  | "socks"
  | "shoes"
  | "accessories"
  | "caps"
  | "other";
type TGender = "men" | "women" | "kids" | "unisex";

interface SeedUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "client";
  picture: string;
}

interface SeedData {
  products: SeedProduct[];
  users: SeedUser[];
}

export const initialData: SeedData = {
  products: [
    {
      description:
        "El Short Under Armour Launch 7inch 2IN1 es ideal para los corredores que se comprometen a conseguir sus objetivos semana tras semana. Son ligeros para que estés concentrado solamente en tu entrenamiento, color negro con el logotipo UA reflectante para que salgas a correr por las noches.",
      images: ["short1.png", "short2.png"],
      inStock: 7,
      price: 75,
      sizes: ["S", "M", "L"],
      slug: "short_under_armour_launch_7inch_2in1",
      type: "shorts",
      tags: ["short"],
      title: "Short Under Armour Launch 7inch 2IN1",
      gender: "men",
    },
    {
      description:
        "Prepárate para nuevos retos con el Short Nike Dri-FIT Stride que te brindará un enorme estilo y comodidad durante todas tus carreras. Fue fabricado con al menos un 75% de materiales reciclados. ",
      images: ["shortNike1.jpeg", "shortNike2.jpeg", "shortNike3.jpeg"],
      inStock: 30,
      price: 769,
      sizes: ["M", "L"],
      slug: "short_nike_dri-fit_stride",
      type: "shorts",
      tags: ["short", "nike"],
      title: "Short Nike Dri-FIT Stride",
      gender: "men",
    },
    {
      description:
        "Lleva a cabo todo tipo de carreras con el Short adidas Own the Run que es una perfecta elección para empezar tu día con el pie derecho, esta prenda es muy sencilla de combinar y sin duda se convertirá en tu favorita. Fue hecho con un poliéster reciclado que es sumamente suave con tu piel. ",
      images: ["shortAdidas1.jpeg", "shortAdidas2.jpeg", "shortAdidas3.jpeg"],
      inStock: 50,
      price: 899,
      sizes: ["L"],
      slug: "short_adidas_own_the_run",
      type: "shorts",
      tags: ["short", "nike"],
      title: "Short adidas Own the Run",
      gender: "men",
    },
    {
      description:
        "Completa tu outfit de running con la Playera Puma Cloudspun, esta prenda te brindará un gran estilo que te resultará muy sencillo de combinar con todo lo que ya tienes en tu armario. En cuanto al diseño es de color negro con el logotipo Puma Cat descansando en el pecho. ",
      images: ["hoodiePuma1.jpeg", "hoodiePuma2.jpeg"],
      inStock: 120,
      price: 839,
      sizes: ["M", "L"],
      slug: "playera_puma_cloudspun",
      type: "hoodies",
      tags: ["sudaderas", "puma"],
      title: "Playera Puma Cloudspun",
      gender: "men",
    },
    {
      description:
        "La Sudadera Under Armour Streaker es una perfecta opción para cuando suena tu alarma ponértela y salir a conseguir todos los kilómetros que te propongas, es una excelente idea para llevar como primera o segunda capa cuando la temperatura sea baja. Te dará un gran estilo con tus prendas de running favoritas. ",
      images: ["hoodieUnder1.png", "hoodieUnder2.png"],
      inStock: 15,
      price: 1299,
      sizes: ["L"],
      slug: "sudadera_under_armour_streaker",
      type: "hoodies",
      tags: ["sudaderas", "under", "armour"],
      title: "Sudadera Under Armour Streaker",
      gender: "men",
    },
    {
      description:
        "Muévete con libertad al usar el Pantalón Nike Dri-FIT Run Division Challenger, esta prenda sin duda alguna será tu favorita gracias a la comodidad y estilo que está lista para ofrecerte.",
      images: [
        "pantsNike1.jpeg",
        "pantsNike2.jpeg",
        "pantsNike3.jpeg",
        "pantsNike4.jpeg",
      ],
      inStock: 25,
      price: 989,
      sizes: ["L"],
      slug: "pantalon_nike_dri-fit_run_division_challenger",
      type: "pants",
      tags: ["pants", "nike"],
      title: "Pantalón Nike Dri-FIT Run Division Challenger",
      gender: "men",
    },
    {
      description:
        "El colorido Pantalón Nike A.I.R. Hola Lou llegará a tu armario para convertirse en uno de tus favoritos, su diseño abstracto resaltará entre el resto y combinarlo con todo lo que tengas en mente será una tarea muy sencilla. Su tejido elástico te permitirá moverte con libertad. ",
      images: ["pantsANike1.jpeg", "pantsANike2.jpeg", "pantsANike3.jpeg"],
      inStock: 89,
      price: 1319,
      sizes: ["L"],
      slug: "pantalon_nike_a_i_r_hola_lou",
      type: "pants",
      tags: ["pants", "nike"],
      title: "Pantalón Nike A.I.R. Hola Lou",
      gender: "men",
    },
    {
      description:
        "El Pantalón adidas Run Icon es una perfecta elección para correr, sin embargo, es versátil y se adaptará de manera perfecta a cualquier otro entrenamiento que forme parte de tu rutina. Cuenta con la tecnología AEROREADY que tiene como objetivo eliminar la humedad de tu cuerpo en todo momento, el sudor ya no será un distractor.",
      images: ["pantsAdidas1.jpeg", "pantsAdidas2.jpeg"],
      inStock: 0,
      price: 1799,
      sizes: ["L", "XL", "XXL"],
      slug: "pantalon_adidas_run_icon",
      type: "pants",
      tags: ["pants", "adidas"],
      title: "Pantalón adidas Run Icon",
      gender: "men",
    },
    {
      description:
        "Representa a tu país en el terreno de juego usando el Jersey adidas Selección Nacional de México Local Mundial 2022 Authentic, esta misma playera será usada por los jugadores aztecas en esta nueva Copa del Mundo que será celebrada en Qatar.jersey",
      images: [
        "jerseyMexico1.jpeg",
        "jerseyMexico2.jpeg",
        "jerseyMexico3.jpeg",
        "jerseyMexico4.jpeg",
      ],
      inStock: 33,
      price: 1619,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      slug: "jersey_adidas_seleccion_nacional_de_méxico_local_mundial_2022_authentic",
      type: "jerseys",
      tags: ["jersey", "adidas", "mexico"],
      title: "Jersey adidas Selección Nacional de México Local",
      gender: "men",
    },
    {
      description:
        "En los días de Champions League lucirás genial al llevar puesto el Jersey Jordan Paris Saint-Germain Cuarto 22/23; esta nueva camiseta del cuadro parisino también es ideal para practicar el deporte que tanto te apasiona. ",
      images: [
        "jerseyJordan1.jpeg",
        "jerseyJordan2.jpeg",
        "jerseyJordan3.jpeg",
      ],
      inStock: 23,
      price: 1079,
      sizes: ["M", "L", "XL"],
      slug: "jersey_jordan_paris_saint-germain",
      type: "jerseys",
      tags: ["jersey", "jordan", "psg"],
      title: "Jersey Jordan Paris Saint-Germain ",
      gender: "men",
    },
    {
      description:
        "Acompaña a la Xavineta en cada uno de sus partidos con el Jersey Nike FC Barcelona Cuarto 22/23, esta nueva equipación está inspirada en la bandera Senyera. ",
      images: [
        "jerseyBarcelona1.jpeg",
        "jerseyBarcelona2.jpeg",
        "jerseyBarcelona3.jpeg",
        "jerseyBarcelona4.jpeg",
        "jerseyBarcelona5.jpeg",
      ],
      inStock: 23,
      price: 1079,
      sizes: ["M", "L", "XL"],
      slug: "jersey_nike_fc_barcelona_cuarto",
      type: "jerseys",
      tags: ["jersey", "nike", "barcelona"],
      title: "Jersey Nike FC Barcelona Cuarto",
      gender: "men",
    },
    {
      description:
        "En esta temporada los dirigidos por Massimiliano Alegri buscarán volver a tomar el dominio de Italia con el Jersey adidas Juventus Local 22/23 Authentic, sin duda te encantará. ",
      images: ["jerseyJuventus1.jpeg", "jerseyJuventus2.jpeg"],
      inStock: 13,
      price: 1559,
      sizes: ["L", "XL"],
      slug: "jersey_adidas_juventus_local",
      type: "jerseys",
      tags: ["jersey", "adidas", "juventus"],
      title: "Jersey adidas Juventus Local",
      gender: "men",
    },
    {
      description:
        "Emociónate cada que encesten los Toros con esta playera de básquetbol Nike NBA Chicago Bulls Zach LaVine. Elaborada especialmente para darte una estética fresca y relajada mientras la rompes en la cancha o apoyas a tus jugadores favoritos. Tú decides como portarla, con un estilo casual o un estilo deportivo.",
      images: ["shirtBulls1.jpeg", "shirtBulls2.jpeg", "shirtBulls3.jpeg"],
      inStock: 67,
      price: 559,
      sizes: ["S", "M", "L", "XL"],
      slug: "playera_nike_nba_chicago_bulls_zach_lavine",
      type: "shirts",
      tags: ["shirts", "nike", "bulls"],
      title: "Playera Nike NBA Chicago Bulls Zach LaVine",
      gender: "men",
    },
    {
      description:
        "Deslumbra con tu frescura con esta playera casual adidas Badge Of Sport Stencil. Creada con un estampado icónico y reconocible en donde sea. Tú decides como combinarla, con un estilo casual o un estilo deportivo.",
      images: ["shirtAdidas1.jpeg", "shirtAdidas2.jpeg", "shirtAdidas3.jpeg"],
      inStock: 7,
      price: 799,
      sizes: ["S", "M", "L", "XL"],
      slug: "playera_adidas_badge_of_sport_stencil",
      type: "shirts",
      tags: ["shirts", "adidas"],
      title: "Playera adidas Badge Of Sport Stencil",
      gender: "men",
    },
    {
      description:
        "Deslumbra con tu frescura con esta playera casual adidas Badge Of Sport Stencil. Creada con un estampado icónico y reconocible en donde sea. Tú decides como combinarla, con un estilo casual o un estilo deportivo.",
      images: ["shirtPuma1.jpeg", "shirtPuma2.jpeg", "shirtPuma3.jpeg"],
      inStock: 70,
      price: 699,
      sizes: ["S", "M", "L"],
      slug: "playera_puma_essentials",
      type: "shirts",
      tags: ["shirts", "puma"],
      title: "Playera Puma Essentials",
      gender: "men",
    },
    {
      description:
        "La Gorra Nike Dri-FIT Legacy 91 unisex fue diseñada especialmente para arduos entrenamientos. En cuanto a diseño lleva el logotipo bordado al frente y el Swoosh de Nike en un lateral. Complementa tu outfit con la gorra en una tonalidad completamente en blanco, siendo perfecta para el día a día. .",
      images: ["capNikeWhite1.jpeg", "capNikeWhite.jpeg", "capNikeWhite3.jpeg"],
      inStock: 120,
      price: 549,
      sizes: ["S", "M"],
      slug: "gorra_nike_dri-fit_legacy_91",
      type: "caps",
      tags: ["gorras", "nike"],
      title: "Gorra Nikecap Dri-FIT Legacy 91",
      gender: "unisex",
    },
    {
      description:
        "Muéstrate con la última tendencia en el estilo urbano con esta Gorra Casual Nike Sportswear Classic 99, diseñada para que estés cómodo y protegido 24/7. Te fascinará su ajuste elástico.",
      images: ["capNikeRed1.jpeg", "capNikeRed2.jpeg"],
      inStock: 120,
      price: 649,
      sizes: ["M"],
      slug: "gorra_nike_sportswear_classic_99",
      type: "caps",
      tags: ["gorras", "nike"],
      title: "Gorra Nike Sportswear Classic 99",
      gender: "unisex",
    },
    {
      description:
        "La Gorra adidas 3 Franjas Unisex es el accesorio que puedes llevar a cualquier deporte en tu vida, el logotipo al frente con las 3 líneas para resaltar la pasión por el deporte en todo el mundo y afrontar de la mejor forma esta nueva temporada del año.",
      images: [
        "capAdidasBlue1.jpeg",
        "capAdidasBlue2.jpeg",
        "capAdidasBlue3.jpeg",
      ],
      inStock: 180,
      price: 349,
      sizes: ["M"],
      slug: "gorra_adidas_3_franjas",
      type: "caps",
      tags: ["gorras", "adidas"],
      title: "Gorra adidas 3 Franjas",
      gender: "unisex",
    },
    {
      description:
        "Al usar la gorra 9TWENTY Los Angeles Dodgers Washed de New Era, todos te identificarán como un seguidor leal de los Dodgers, ya que resalta su escudo bordado en la parte frontal. Su estructura se adapta con comodiad y sus ojales mejoran la ventilación, así puedes disfrutar del partido y del día. El cierre trasero ajustable con correa y hebilla aporta un ajuste a la medida.",
      images: [
        "capNewEraBlue1.jpeg",
        "capNewEraBlue2.jpeg",
        "capNewEraBlue3.jpeg",
      ],
      inStock: 30,
      price: 599,
      sizes: ["S", "M"],
      slug: "gorra_new_era_9twenty_los_angeles_dodgers_washed_caballeros",
      type: "caps",
      tags: ["gorras", "new", "era"],
      title: "Gorra New Era 9TWENTY Los Angeles Dodgers Washed Caballeros",
      gender: "unisex",
    },
    {
      description:
        "Al usar la gorra 9TWENTY Los Angeles Dodgers Washed de New Era, todos te identificarán como un seguidor leal de los Dodgers, ya que resalta su escudo bordado en la parte frontal. Su estructura se adapta con comodiad y sus ojales mejoran la ventilación, así puedes disfrutar del partido y del día. El cierre trasero ajustable con correa y hebilla aporta un ajuste a la medida.",
      images: ["capNewEraRed1.jpeg", "capNewEraRed2.jpeg"],
      inStock: 56,
      price: 599,
      sizes: ["S", "M"],
      slug: "gorra_new_era_new_york_yankees_scarlet_9twenty",
      type: "caps",
      tags: ["gorras", "new", "era", "yankees"],
      title: "Gorra New Era New York Yankees Scarlet 9TWENTY",
      gender: "unisex",
    },
  ],
  users: [
    {
      name: "Admin",
      email: "admin@gmail.com",
      password: bcrypt.hashSync("123456"),
      role: "admin",
      picture:
        "https://res.cloudinary.com/deykexyle/image/upload/v1688346692/emptyProfilePicture_rsj2gy.png",
    },
    {
      name: "Client",
      email: "client@gmail.com",
      password: bcrypt.hashSync("123456"),
      role: "client",
      picture:
        "https://res.cloudinary.com/deykexyle/image/upload/v1688346692/emptyProfilePicture_rsj2gy.png",
    },
  ],
};
