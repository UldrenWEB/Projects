import React from "react";
import "../../styles/message.css";

const MensajesComponent = ({ infoMessage, userProperty }) => {
  const { fecha, imagen, contenido, usuario, isReceiving } = infoMessage;

  const verifyReceiving = usuario.toLowerCase() === userProperty.toLowerCase() ?? isReceiving;

  const hasImage = imagen && imagen.url;
  const hasDescription =
    imagen && imagen.descripcion && imagen.descripcion !== "image";

  return (
    <div className={`message-container ${!verifyReceiving ? "received" : "sent"}`}>
      <div className="message-info">
        <p>Fecha: {fecha}</p>
        <p>{!verifyReceiving ? "Recibiendo" : "Enviando"}</p>
        <p>to: {usuario}</p>
      </div>
      {hasImage && (
        <div className="message-content">
          <img src={imagen.url} alt="image" />
          {hasDescription && <p>{imagen.descripcion}</p>}
        </div>
      )}
      <p className="message-content">Contenido del mensaje: {contenido}</p>
    </div>
  );
};

export default MensajesComponent;
