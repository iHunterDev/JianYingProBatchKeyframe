import { useTranslations } from "next-intl";

const FAQSection = () => {
  const t = useTranslations("Faq");
  console.log(t.raw("List"));
  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
        <div className="mb-8 text-center md:mb-12 lg:mb-16">
          <h2 className="text-3xl font-bold md:text-5xl text-[#ffffff]">
            {t("FaqTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[#c9fd02]">
            {t("FaqDescription")}
          </p>
        </div>
        {t.raw("List").map((item: {Question: string, Answer: string}) => {
          return <div className="mb-6 flex flex-col items-center" key={item.Question}>
            <div className="max-w-4xl rounded-xl bg-[#131313] p-8">
              <div className="flex cursor-pointer justify-between">
                <p className="mb-4 text-xl font-bold text-[#ffffff]">
                  {item.Question}
                </p>
              </div>
              <p className="text-[#636262]">{item.Answer}</p>
            </div>
          </div>;
        })}

        {/* <p className="text-center">Can’t find the answer you’re looking for? Reach out to our <a href="#">customer support team</a>.</p> */}
      </div>
    </section>
  );
};

export default FAQSection;
