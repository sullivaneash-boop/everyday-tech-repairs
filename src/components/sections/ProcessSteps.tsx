const STEPS = [
  {
    title: "Tell us about your device",
    text: "Fill out the short repair request with what you have and what's going wrong. Photos help but aren't required.",
  },
  {
    title: "We review your request",
    text: "We read every inquiry and get back to you by phone or email to talk through the problem and your options.",
  },
  {
    title: "You decide what's next",
    text: "Sending a request doesn't commit you to anything. If the repair makes sense for you, we'll arrange the details together.",
  },
];

export function ProcessSteps() {
  return (
    <ol className="mt-10 grid gap-6 md:grid-cols-3">
      {STEPS.map((step, i) => (
        <li key={step.title} className="relative rounded-[var(--radius-card)] bg-navy-soft p-6">
          <span aria-hidden="true" className="font-heading text-5xl font-extrabold italic leading-none text-cyan">
            {i + 1}
          </span>
          <h3 className="mt-4 text-xl text-white">
            <span className="sr-only">Step {i + 1}: </span>
            {step.title}
          </h3>
          <p className="mt-2 text-muted-on-navy">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
