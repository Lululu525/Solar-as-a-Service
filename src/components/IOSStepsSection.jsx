
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stepTabs } from "../data";

export default function IOSStepsSection() {
  const [active, setActive] = useState("install");
  const navigate = useNavigate();
  const tab = useMemo(() => stepTabs.find((item) => item.id === active), [active]);

  return (
    <section className="section section-white">
      <div className="container steps-wrap">
        <div className="ios-tabs">
          <div
            className="ios-tabs-slider"
            style={{ transform: active === "install" ? "translateX(0)" : "translateX(calc(100% + 10px))" }}
          />
          {stepTabs.map((item) => (
            <button key={item.id} className="ios-tab" type="button" onClick={() => setActive(item.id)}>
              <span>{item.number}</span>{item.label}
            </button>
          ))}
        </div>

        <div className="steps-panel">
          <div className="steps-copy">
            <p className="steps-kicker">{tab.kicker}</p>
            <h2>{tab.title}</h2>
            <p className="steps-highlight">{tab.highlight}</p>
            {tab.paragraphs.map((paragraph) => (
              <p key={paragraph} className="steps-paragraph">{paragraph}</p>
            ))}
            <div className="steps-actions">
              <button className="steps-action-btn" type="button" onClick={() => navigate(tab.to)}>
                {tab.button} →
              </button>
            </div>
          </div>

          <div className="steps-visual">
            <img src={tab.image} alt={tab.title} />
          </div>
        </div>
      </div>
    </section>
  );
}
