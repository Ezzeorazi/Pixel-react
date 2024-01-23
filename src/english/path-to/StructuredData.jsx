import React from 'react';

const StructuredData = ({ language }) => {
  const isEnglish = language === 'en';

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": isEnglish ? "Pixel Maker - Web Development and Marketing Agency" : "Pixel Maker - Agencia de Marketing y Desarrollo Web",
    "alternateName": "PixelMaker",
    "url": "https://pixelmaker.com.ar/",
    "logo": "https://pixelmaker.com.ar/img/logo%20pixel%20maker.png",
    "image": "https://pixelmaker.com.ar/img/logo%20pixel%20maker.png",
    "telephone": "+54 341 380 4322",
    "email": "contacto@pixelmaker.com.ar",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Callao 1457",
      "addressLocality": "Rosario",
      "postalCode": "2000",
      "addressCountry": "Argentina"
    },
    "sameAs": [
      "https://www.instagram.com/pixelmakerdevs/",
      "https://www.linkedin.com/company/pixel-maker/",
      "https://www.facebook.com/pixelmakerweb"
    ],
    "description": isEnglish ? "PixelMaker is a digital design agency in Argentina, specialized in web development, graphic design, and digital marketing. Transform your brand with us!" : "PixelMaker es una agencia de diseño digital en Argentina, especializada en desarrollo web, diseño gráfico y marketing digital. ¡Transforma tu marca con nosotros!",
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(data)}
    </script>
  );
};

export default StructuredData;
