type Step = {
  title: string;
  description: string;
};

type TutorialStepsProps = {
  steps: Step[];
};

export default function TutorialSteps({ steps }: TutorialStepsProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      {steps.map((step, index) => (
        <div key={index} className="grid grid-cols-1 gap-4 rounded-xl bg-surface p-8">
          <div className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-brand">
            <p className="text-xl font-bold">{index + 1}</p>
          </div>
          <p className="text-xl font-semibold text-white">{step.title}</p>
          <p className="text-sm text-muted">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
