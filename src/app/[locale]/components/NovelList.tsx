// import { Table } from "flowbite-react";
import { useTranslations } from "next-intl";
// import { useEffect, useState } from "react";

export default async function NovelList() {
  const t = useTranslations("NovelList");

  const apiUrl = "https://directus.keyframeai.top";

  // 最新的 15条
  const novelListResponse = await fetch(`${apiUrl}/items/datas?limit=15&sort[]=-date_updated`);
  const novelListData = await novelListResponse.json();
  const novelList = novelListData.data;

  const handleWaiting = () => {
    console.log('waiting');
  }

  return (
    <section id="novel-hot-list">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
        <div className="mb-8 text-center md:mb-12 lg:mb-16">
          <h2 className="text-3xl font-bold md:text-5xl text-[#ffffff]">
            {t("NovelListTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[#c9fd02]">
            {t("NovelListDescription")}
            <div className="text-[#636262]">
              最后一次数据更新时间：{new Date(novelList[0].date_created).toLocaleString()}
            </div>
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-[#1a1a1a] border-b border-gray-700">
                  <th className="text-[#ffffff]">{t("Nickname")}</th>
                  <th className="text-[#ffffff]">{t("Description")}</th>
                  <th className="text-[#ffffff]">{t("Like")}</th>
                  <th className="text-[#ffffff]">{t("Comment")}</th>
                  <th className="text-[#ffffff]">{t("Collect")}</th>
                  <th className="text-[#ffffff]">{t("Share")}</th>
                  <th className="text-[#ffffff]">{t("Action")}</th>
                </tr>
              </thead>
              <tbody>
                {novelList.map((item: any) =>
                  <tr key={item.id} className="bg-[#131313] hover:bg-[#1a1a1a] border-b border-gray-700">
                    <td className="text-[#636262]">{item.nickname}</td>
                    <td className="text-[#636262]">{item.description?.slice(0, 30)}{item.description?.length > 30 ? '...' : ''}</td>
                    <td className="text-[#636262]">{item.topic_like}</td>
                    <td className="text-[#636262]">{item.topic_comment}</td>
                    <td className="text-[#636262]">{item.topic_collect}</td>
                    <td className="text-[#636262]">{item.topic_share}</td>
                    <td className="flex items-center gap-2">
                      <a href={item.topic_link} target="_blank" rel="noopener noreferrer nofollow" className="font-medium text-[#c9fd02] hover:underline">
                        {t('Link')}
                      </a>
                      <a href="javascript:alert('正在开发，马上就来！')" className="font-medium text-[#c9fd02] hover:underline">{t('Detail')}</a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-center text-[#636262] py-2"><a href="javascript:alert('正在开发，马上就来！')" className="text-[#c9fd02]">{t('Show More')}</a></p>
      </div>
    </section>
  );
}