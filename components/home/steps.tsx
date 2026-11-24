import { steps } from "@/components/data/site";

export default function Steps() {
  return (
    <section style={{ paddingTop: 60 }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>How to start Ambulette service in <span className="gold">3 simple steps</span></h2>
          <div className="divider" />
        </div>
        <div className="steps">
          {steps.map((step, index) => (
            <div className="step reveal" key={step.title}>
              <div className="step-num">{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
