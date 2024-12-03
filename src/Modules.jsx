import React from "react";
import { useNavigate } from "react-router-dom"; // Для навігації
import "./Modules.css";
import icon1 from "./images/icon-1.png";
import icon2 from "./images/icon-2.png";
import icon3 from "./images/icon-3.png";
import icon4 from "./images/icon-4.png";
import icon5 from "./images/icon-5.png";
import icon6 from "./images/icon-6.png";


function Modules() {


    const handleCardClick = (title) => {
        if (title === "Модуль моделювання") {
          navigate("/home"); // Перенаправлення на ./home
        }
      };


  const navigate = useNavigate(); 
  const cards = [
    { title: "Модуль аналізу вимог", icon: icon1 },
    { title: "Модуль проектування", icon: icon2 },
    { title: "Модуль моделювання", icon:  icon3 },
    { title: "Модуль конструювання та розробки", icon: icon4  },
    { title: "Модуль тестування", icon: icon5 },
    { title: "Модуль аналізу результатів", icon: icon6  },
  ];

   return (
    <div className="cards-wrapper">
      <div className="cards-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card"
            onClick={() => handleCardClick(card.title)} // Додаємо обробник кліку
          >
            <img src={card.icon} alt={card.title} className="card-icon" />
            <h3 className="card-title">{card.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Modules;
