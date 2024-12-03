// import { Table } from "flowbite-react";
import { useTranslations } from "next-intl";
// import { useEffect, useState } from "react";
import { headers } from 'next/headers';
import { useLocale } from "@/hooks/useLocale";

export default async function NovelList() {
  // 服务端获取当前语言
  const headersList = headers();
  const locale = headersList.get('x-next-intl-locale') || 'default';
  const { getLocalizedHref } = useLocale(locale);

  const t = useTranslations("NovelList");

  const apiUrl = "https://directus.keyframeai.top";

  // 最新的 15条
  const novelListResponse = await fetch(`${apiUrl}/items/datas?limit=30&sort[]=-hot_index&sort[]=-topic_created_time`);
  const novelListData = await novelListResponse.json();
  const novelList = novelListData.data;

  // 从novelList中获取最大的 date_created
  const maxDateCreated = novelList.reduce((max: Date, item: any) => {
    return new Date(max) > new Date(item.date_created) ? max : item.date_created;
  }, new Date(0));

  return (
    <section id="novel-hot-list">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
        <div className="mb-8 text-center md:mb-12 lg:mb-16">
          <h2 className="text-3xl font-bold md:text-5xl text-[#ffffff]">
            {t("NovelListTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[#c9fd02]">
            {t("NovelListDescription")}
          </p>
          <div className="text-[#636262]">
              最后一次数据更新时间：{new Date(maxDateCreated).toLocaleString()}
            </div>
        </div>

        <div className="overflow-x-auto rounded-lg">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-[#1a1a1a] border-b border-gray-700">
                  <th className="text-[#ffffff]">{t("Nickname")}</th>
                  <th className="text-[#ffffff]">{t("Description")}</th>
                  {/* <th className="text-[#ffffff]">{t("Like")}</th> */}
                  {/* <th className="text-[#ffffff]">{t("Comment")}</th> */}
                  {/* <th className="text-[#ffffff]">{t("Collect")}</th> */}
                  {/* <th className="text-[#ffffff]">{t("Share")}</th> */}
                  {/* <th className="text-[#ffffff]">{t("CreateTime")}</th> */}
                  <th className="text-[#ffffff]">{t("Hot Index")}</th>
                  <th className="text-[#ffffff]">{t("Action")}</th>
                </tr>
              </thead>
              <tbody>
                {novelList.map((item: any) =>
                  <tr key={item.id} className="bg-[#131313] hover:bg-[#1a1a1a] border-b border-gray-700">
                    <td className="text-[#636262]">{item.nickname}</td>
                    <td className="text-[#636262]">{item.description?.slice(0, 45)}{item.description?.length > 45 ? '...' : ''}</td>
                    {/* <td className="text-[#636262]">{item.topic_like}</td> */}
                    {/* <td className="text-[#636262]">{item.topic_comment}</td> */}
                    {/* <td className="text-[#636262]">{item.topic_collect}</td> */}
                    {/* <td className="text-[#636262]">{item.topic_share}</td> */}
                    {/* <td className="text-[#636262]">{item.topic_created_time ? new Date(item.topic_created_time).toLocaleString() : ''}</td> */}
                    <td className={`${item.hot_index > 5000 ? 'text-red-500' : item.hot_index > 3000 ? 'text-orange-500' : item.hot_index > 1000 ? 'text-yellow-500' : 'text-[#636262]'} font-bold`}>{item.hot_index}</td>
                    <td className="flex items-center gap-2">
                      <a href={item.topic_link} target="_blank" rel="noopener noreferrer nofollow" className="font-medium text-[#c9fd02] hover:underline">
                        {t('Link')}
                      </a>
                      <a href={getLocalizedHref(`/leaderboard/topic/${item.id}`)} className="font-medium text-[#c9fd02] hover:underline">
                        {t('Detail')}
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-center text-[#636262] py-2"><a href={getLocalizedHref("/leaderboard")} className="text-[#c9fd02]">{t('Show More')}</a></p>
      </div>
    </section>
  );
}