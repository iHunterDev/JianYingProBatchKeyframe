import Link from 'next/link'

export default function Navbar() {
  return (
    <section>
      <div className="h-auto bg-black text-white">
        <nav className="font-inter mx-auto h-auto w-full max-w-[1600px] lg:relative lg:top-0">
          <div className="flex flex-col px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-4 xl:px-20">
            <a href="#">
              {/* <img
                src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a26c_%5BA%5D--Navbar%20Brand.png"
                alt=""
                className="inline-block max-h-6"
              /> */}
            </a>
            <div className="mt-14 flex flex-col space-y-8 lg:mt-0 lg:flex lg:flex-row lg:space-x-1 lg:space-y-0">
              <Link className="font-inter rounded-lg hover:text-[#c9fd02] lg:px-6 lg:py-4" href="zh_CN">🇨🇳中文</Link>
              <Link className="font-inter rounded-lg hover:text-[#c9fd02] lg:px-6 lg:py-4" href="en_US">🇺🇸English (US)</Link>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
