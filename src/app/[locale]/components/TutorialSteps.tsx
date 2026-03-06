type Step = {
  title: string;
  description: string;
};

type TutorialStepsProps = {
  steps: Step[];
};

export default function TutorialSteps({ steps }: TutorialStepsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
      {steps.map((step, index) => (
        <div key={index} className="relative flex flex-col gap-5 px-0 py-8 md:px-10 md:py-0 first:md:pl-0 last:md:pr-0">
          {/* Step number — large ghost */}
          <span className="font-display text-[80px] font-extrabold leading-none text-brand/10 select-none -mb-4">
            0{index + 1}
          </span>
          {/* Active dot */}
          <div className="flex items-center gap-3">
            <span className="block w-1.5 h-1.5 bg-brand flex-shrink-0" />
            <p className="font-display text-lg font-bold text-white">{step.title}</p>
          </div>
          <p className="text-sm text-white/40 leading-relaxed">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
